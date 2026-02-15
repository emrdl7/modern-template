#!/usr/bin/env node
/*
  WCAG contrast checker for design tokens.
  - Reads SCSS $colors map from source/css/scss/_variables.scss
  - Checks a small curated set of foreground/background pairs
  - Exits non-zero if any pair fails minimum ratio

  References:
  - WCAG 2.x contrast ratio: (L1 + 0.05) / (L2 + 0.05)
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
  const args = { tokens: DEFAULT_TOKENS_PATH };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tokens' && argv[i + 1]) {
      args.tokens = path.resolve(process.cwd(), argv[i + 1]);
      i++;
      continue;
    }
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

function main() {
  const args = parseArgs(process.argv);
  const tokensPath = args.tokens;

  const scss = fs.readFileSync(tokensPath, 'utf8');
  const colors = extractColorsFromScss(scss);

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

  // Output
  console.log(`\nWCAG contrast check: ${path.relative(REPO_ROOT, tokensPath)}\n`);
  for (const r of results) {
    const status = r.ok ? 'PASS' : 'FAIL';
    console.log(`${status}  ${r.label}  =>  ${formatRatio(r.ratio)} (min ${r.min}:1)`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} contrast check(s) failed:`);
    for (const f of failures) console.error(`- ${f.label}: ${f.error}`);
    console.error('\nFix tokens or adjust the check list in scripts/check-contrast.js');
    process.exit(1);
  }

  console.log('\nAll contrast checks passed.');
}

main();
