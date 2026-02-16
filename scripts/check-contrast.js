#!/usr/bin/env node
/*
  WCAG contrast checker for design tokens.

  - Reads SCSS $colors map from source/css/scss/_variables.scss
  - Default mode: checks a small curated set of fg/bg pairs
  - Non-text mode (--nontext): checks UI tokens (borders/focus/icons/etc) against surface tokens
  - Exits non-zero if any check fails minimum ratio

  References:
  - WCAG 2.x contrast ratio: (L1 + 0.05) / (L2 + 0.05)
  - WCAG 2.1 AA Non-text contrast (1.4.11): 3:1 minimum for UI components/graphics needed to understand content
*/

const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_TOKENS_PATH = path.join(
  REPO_ROOT,
  'source',
  'css',
  'scss',
  '_variables.scss'
);

function parseArgs(argv) {
  const args = {
    tokens: DEFAULT_TOKENS_PATH,
    out: null, // optional JSON report path
    mode: 'default', // default | text | nontext
    includeStates: false, // include status state tokens (error/success/warning/info) in non-text mode
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];

    if (a === '--tokens' && argv[i + 1]) {
      args.tokens = path.resolve(process.cwd(), argv[i + 1]);
      i++;
      continue;
    }

    if ((a === '--out' || a === '--json') && argv[i + 1]) {
      args.out = path.resolve(process.cwd(), argv[i + 1]);
      i++;
      continue;
    }

    if (a === '--text' || (a === '--mode' && argv[i + 1] === 'text')) {
      args.mode = 'text';
      if (a === '--mode') i++;
      continue;
    }

    if (a === '--nontext' || (a === '--mode' && argv[i + 1] === 'nontext')) {
      args.mode = 'nontext';
      if (a === '--mode') i++;
      continue;
    }

    if (a === '--include-states') {
      args.includeStates = true;
      continue;
    }
  }

  // If user explicitly runs a matrix mode but doesn't specify output,
  // keep a stable default location so it can be used in CI/PRs.
  if (args.mode === 'text' && !args.out) {
    args.out = path.join(REPO_ROOT, 'reports', 'contrast-text.json');
  }
  if (args.mode === 'nontext' && !args.out) {
    args.out = path.join(REPO_ROOT, 'reports', 'contrast-nontext.json');
  }

  return args;
}

function hexToRgb(hex) {
  const cleaned = hex.trim().replace(/^#/, '');
  if (![3, 6].includes(cleaned.length)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const n = Number.parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function srgbToLinear(c8bit) {
  const c = c8bit / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function blendRgbOverBg(fgRgb, bgRgb, alpha) {
  // Standard source-over alpha compositing (sRGB space)
  return {
    r: Math.round(fgRgb.r * alpha + bgRgb.r * (1 - alpha)),
    g: Math.round(fgRgb.g * alpha + bgRgb.g * (1 - alpha)),
    b: Math.round(fgRgb.b * alpha + bgRgb.b * (1 - alpha)),
  };
}

function rgbToHex({ r, g, b }) {
  const h = (n) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function extractColorsFromScss(scssText) {
  // Extract the $colors: ( ... ); block, then parse lines like: key: #rrggbb,
  const blockMatch = scssText.match(/\$colors\s*:\s*\(([\s\S]*?)\)\s*;/m);
  if (!blockMatch) {
    throw new Error('Could not find $colors map in SCSS tokens file');
  }
  const block = blockMatch[1];

  const map = new Map();
  const lineRe = /^\s*([a-zA-Z0-9_-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\s*,?\s*(?:\/\/.*)?$/gm;
  let m;
  while ((m = lineRe.exec(block))) {
    map.set(m[1], m[2]);
  }
  if (map.size === 0) {
    throw new Error('Parsed $colors block but found zero hex entries');
  }
  return map;
}

function formatRatio(r) {
  return `${r.toFixed(2)}:1`;
}

function pickSurfaceTokens(colors) {
  // Keep it conservative by default:
  // - bg-* are the real “surface” tokens in this project
  // - include white as a common surface reference
  const surface = [];
  for (const k of colors.keys()) {
    if (/^bg-/.test(k)) surface.push(k);
  }
  if (colors.has('white') && !surface.includes('white')) surface.push('white');
  return surface;
}

function pickNonTextUiTokens(colors, options = {}) {
  // Non-text (1.4.11) is meant for UI boundaries/indicators, so default to:
  // - border*, focus*, icon*
  // This avoids creating “false work” by treating all brand/status colors as non-text UI.
  //
  // Optional strict mode (--include-states): include semantic state colors too
  // when teams use them directly for UI indicators (error/success/warning/info).
  const { includeStates = false } = options;
  const ui = [];

  for (const k of colors.keys()) {
    if (/^(border|border-)/.test(k)) ui.push(k);
    if (/^(focus|focus-)/.test(k)) ui.push(k);
    if (/^(icon|icon-)/.test(k)) ui.push(k);
    if (includeStates && /^(error|success|warning|info|state-(error|success|warning|info))$/.test(k)) ui.push(k);
  }

  return ui;
}

function pickTextTokens(colors) {
  // Text tokens are generally named text-*
  // Keep it conservative: only check tokens explicitly intended for text.
  const text = [];
  for (const k of colors.keys()) {
    if (/^text-/.test(k)) text.push(k);
  }
  return text;
}

function runTextMatrix(colors) {
  const min = 4.5;
  const surfaces = pickSurfaceTokens(colors);
  const textTokens = pickTextTokens(colors);

  const results = [];
  const failures = [];

  for (const fg of textTokens) {
    const fgHex = colors.get(fg);
    if (!fgHex) continue;

    for (const bg of surfaces) {
      const bgHex = colors.get(bg);
      if (!bgHex) continue;

      const ratio = contrastRatio(fgHex, bgHex);
      const ok = ratio >= min;
      results.push({ kind: 'text', fg, bg, fgHex, bgHex, ratio, min, ok });
      if (!ok) {
        failures.push({ label: `${fg} on ${bg}`, error: `${formatRatio(ratio)} < ${min}:1` });
      }
    }
  }

  return { results, failures, surfaces, textTokens, min };
}

function runDefaultChecks(colors) {
  // Minimal, high-signal checks (expand over time)
  // - 4.5:1 for normal text
  // - 3:1 for UI components / non-text (borders, focus rings, icons)
  const checks = [
    { fg: 'text-primary', bg: 'bg-primary', min: 4.5, kind: 'text' },
    { fg: 'text-secondary', bg: 'bg-primary', min: 4.5, kind: 'text' },
    { fg: 'primary', bg: 'white', min: 3.0, kind: 'ui' },
    { fg: 'border', bg: 'bg-primary', min: 3.0, kind: 'ui' },
  ];

  const failures = [];
  const results = [];

  for (const c of checks) {
    const fgHex = colors.get(c.fg);
    const bgHex = colors.get(c.bg);
    if (!fgHex || !bgHex) {
      failures.push({
        label: `${c.fg} on ${c.bg}`,
        error: `Missing token(s): ${!fgHex ? c.fg : ''}${!fgHex && !bgHex ? ', ' : ''}${!bgHex ? c.bg : ''}`,
      });
      continue;
    }

    const ratio = contrastRatio(fgHex, bgHex);
    const ok = ratio >= c.min;
    results.push({
      label: `${c.fg} (${fgHex}) on ${c.bg} (${bgHex}) [${c.kind}]`,
      ratio,
      min: c.min,
      ok,
    });
    if (!ok) {
      failures.push({
        label: `${c.fg} on ${c.bg}`,
        error: `${formatRatio(ratio)} < ${c.min}:1`,
      });
    }
  }

  return { results, failures };
}

function runNonTextMatrix(colors, options = {}) {
  const min = 3.0;
  const surfaces = pickSurfaceTokens(colors);
  const uiTokens = pickNonTextUiTokens(colors, options);

  const results = [];
  const failures = [];

  for (const ui of uiTokens) {
    const uiHex = colors.get(ui);
    if (!uiHex) continue;

    for (const s of surfaces) {
      const sHex = colors.get(s);
      if (!sHex) continue;

      const ratio = contrastRatio(uiHex, sHex);
      const ok = ratio >= min;
      results.push({
        kind: 'nontext',
        ui,
        surface: s,
        uiHex,
        surfaceHex: sHex,
        ratio,
        min,
        ok,
      });
      if (!ok) {
        failures.push({
          label: `${ui} on ${s}`,
          error: `${formatRatio(ratio)} < ${min}:1`,
        });
      }
    }
  }

  // --- Experimental: alpha/overlay combinations (informational, not gating yet)
  // Rationale: Many UI surfaces include semi-transparent overlays (scrims, glass)
  // and contrast should be evaluated on the final composited color.
  const overlayCombos = [];
  const base = 'bg-primary';
  const baseHex = colors.get(base);
  const blackHex = colors.get('black');
  const whiteHex = colors.get('white');
  const textHex = colors.get('text-primary');
  const borderHex = colors.get('border');

  if (baseHex && blackHex) {
    const baseRgb = hexToRgb(baseHex);
    const blackRgb = hexToRgb(blackHex);

    const overlays = [
      { name: 'overlay-black-20', alpha: 0.2 },
      { name: 'overlay-black-40', alpha: 0.4 },
    ];

    for (const o of overlays) {
      const blendedHex = rgbToHex(blendRgbOverBg(blackRgb, baseRgb, o.alpha));
      const contrasts = [];

      if (whiteHex) contrasts.push({ fg: 'white', fgHex: whiteHex, ratio: contrastRatio(whiteHex, blendedHex) });
      if (textHex) contrasts.push({ fg: 'text-primary', fgHex: textHex, ratio: contrastRatio(textHex, blendedHex) });
      if (borderHex) contrasts.push({ fg: 'border', fgHex: borderHex, ratio: contrastRatio(borderHex, blendedHex) });

      overlayCombos.push({
        kind: 'overlay',
        overlay: o.name,
        alpha: o.alpha,
        base,
        baseHex,
        blendedHex,
        contrasts: contrasts.map((c) => ({
          fg: c.fg,
          fgHex: c.fgHex,
          ratio: Number(c.ratio.toFixed(4)),
        })),
      });
    }
  }

  return { results, failures, surfaces, uiTokens, min, overlayCombos };
}

function writeJsonReport(outPath, report) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
}

function main() {
  const args = parseArgs(process.argv);
  const tokensPath = args.tokens;

  const scss = fs.readFileSync(tokensPath, 'utf8');
  const colors = extractColorsFromScss(scss);

  if (args.mode === 'text') {
    const matrix = runTextMatrix(colors);

    const report = {
      tool: 'scripts/check-contrast.js',
      mode: 'text',
      tokensPath: path.relative(REPO_ROOT, tokensPath),
      generatedAt: new Date().toISOString(),
      min: matrix.min,
      surfaces: matrix.surfaces,
      textTokens: matrix.textTokens,
      results: matrix.results.map((r) => ({
        fg: r.fg,
        bg: r.bg,
        fgHex: r.fgHex,
        bgHex: r.bgHex,
        ratio: Number(r.ratio.toFixed(4)),
        min: r.min,
        ok: r.ok,
      })),
      failures: matrix.failures,
    };

    console.log(`\nWCAG text contrast matrix (min ${matrix.min}:1): ${path.relative(REPO_ROOT, tokensPath)}\n`);
    console.log(`Text tokens: ${matrix.textTokens.join(', ') || '(none found)'}`);
    console.log(`Surfaces:    ${matrix.surfaces.join(', ') || '(none found)'}`);

    const failCount = matrix.failures.length;
    const totalCount = matrix.results.length;
    console.log(`\nChecked: ${totalCount} pairs`);
    console.log(`PASS:   ${totalCount - failCount}`);
    console.log(`FAIL:   ${failCount}`);

    if (args.out) {
      writeJsonReport(args.out, report);
      console.log(`\nJSON report written: ${path.relative(REPO_ROOT, args.out)}`);
    }

    if (failCount) {
      console.error(`\n${failCount} text contrast pair(s) failed:`);
      for (const f of matrix.failures.slice(0, 20)) console.error(`- ${f.label}: ${f.error}`);
      if (matrix.failures.length > 20) {
        console.error(`- ...and ${matrix.failures.length - 20} more (see JSON report)`);
      }
      process.exit(1);
    }

    console.log('\nAll text contrast pairs passed.');
    return;
  }

  if (args.mode === 'nontext') {
    const matrix = runNonTextMatrix(colors, { includeStates: args.includeStates });

    const report = {
      tool: 'scripts/check-contrast.js',
      mode: 'nontext',
      tokensPath: path.relative(REPO_ROOT, tokensPath),
      generatedAt: new Date().toISOString(),
      min: matrix.min,
      surfaces: matrix.surfaces,
      uiTokens: matrix.uiTokens,
      results: matrix.results.map((r) => ({
        ui: r.ui,
        surface: r.surface,
        uiHex: r.uiHex,
        surfaceHex: r.surfaceHex,
        ratio: Number(r.ratio.toFixed(4)),
        min: r.min,
        ok: r.ok,
      })),
      // Informational overlay samples (alpha compositing): not gated yet.
      overlayCombos: matrix.overlayCombos,
      failures: matrix.failures,
    };

    console.log(`\nWCAG non-text contrast matrix (min ${matrix.min}:1): ${path.relative(REPO_ROOT, tokensPath)}\n`);
    console.log(`UI tokens: ${matrix.uiTokens.join(', ') || '(none found)'}`);
    console.log(`Surfaces:  ${matrix.surfaces.join(', ') || '(none found)'}`);

    const failCount = matrix.failures.length;
    const totalCount = matrix.results.length;
    console.log(`\nChecked: ${totalCount} pairs`);
    console.log(`PASS:   ${totalCount - failCount}`);
    console.log(`FAIL:   ${failCount}`);

    if (args.out) {
      writeJsonReport(args.out, report);
      console.log(`\nJSON report written: ${path.relative(REPO_ROOT, args.out)}`);
    }

    if (failCount) {
      console.error(`\n${failCount} non-text contrast pair(s) failed:`);
      for (const f of matrix.failures.slice(0, 20)) console.error(`- ${f.label}: ${f.error}`);
      if (matrix.failures.length > 20) {
        console.error(`- ...and ${matrix.failures.length - 20} more (see JSON report)`);
      }
      process.exit(1);
    }

    console.log('\nAll non-text contrast pairs passed.');
    return;
  }

  // Default (curated) checks
  const { results, failures } = runDefaultChecks(colors);

  // Optional JSON report (kept simple so teams can extend it)
  const report = {
    tool: 'scripts/check-contrast.js',
    mode: 'default',
    tokensPath: path.relative(REPO_ROOT, tokensPath),
    generatedAt: new Date().toISOString(),
    results: results.map((r) => ({
      label: r.label,
      ratio: Number(r.ratio.toFixed(4)),
      min: r.min,
      ok: r.ok,
    })),
    failures,
  };

  if (args.out) {
    writeJsonReport(args.out, report);
  }

  // Output
  console.log(`\nWCAG contrast check: ${path.relative(REPO_ROOT, tokensPath)}\n`);
  for (const r of results) {
    const status = r.ok ? 'PASS' : 'FAIL';
    console.log(`${status}  ${r.label}  =>  ${formatRatio(r.ratio)} (min ${r.min}:1)`);
  }
  if (args.out) {
    console.log(`\nJSON report written: ${path.relative(REPO_ROOT, args.out)}`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} contrast check(s) failed:`);
    for (const f of failures) console.error(`- ${f.label}: ${f.error}`);
    if (args.out) console.error(`- Report: ${args.out}`);
    console.error('\nFix tokens or adjust the check list in scripts/check-contrast.js');
    process.exit(1);
  }

  console.log('\nAll contrast checks passed.');
}

main();
