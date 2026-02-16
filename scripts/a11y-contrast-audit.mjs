#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const cssPath = resolve(process.cwd(), 'source/css/main.css');
const css = readFileSync(cssPath, 'utf8');

const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
if (!rootMatch) {
  console.error('❌ :root 블록을 찾지 못했습니다.');
  process.exit(1);
}

const rawVars = new Map();
for (const line of rootMatch[1].split('\n')) {
  const m = line.match(/--([a-z0-9-]+)\s*:\s*([^;]+);/i);
  if (m) rawVars.set(`--${m[1]}`, m[2].trim());
}

const resolveVar = (name, depth = 0) => {
  if (depth > 8) return null;
  const raw = rawVars.get(name);
  if (!raw) return null;
  const varRef = raw.match(/^var\((--[a-z0-9-]+)\)$/i);
  if (varRef) return resolveVar(varRef[1], depth + 1);
  const hex = raw.match(/#(?:[0-9a-f]{3}|[0-9a-f]{6})\b/i);
  return hex ? hex[0] : null;
};

const hexToRgb = (hex) => {
  const n = hex.replace('#', '').trim();
  const full = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

const linearize = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
};

const contrast = (a, b) => {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [max, min] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (max + 0.05) / (min + 0.05);
};

const checks = [
  { kind: 'text', fg: '--text-primary', bg: '--surface', min: 4.5 },
  { kind: 'text', fg: '--text-on-accent', bg: '--color-accent', min: 4.5 },
  { kind: 'ui', fg: '--border', bg: '--surface', min: 3.0 },
  { kind: 'ui', fg: '--focus-ring', bg: '--surface', min: 3.0 },
  { kind: 'ui', fg: '--color-primary', bg: '--surface', min: 3.0 },
];

const failures = [];
console.log('🔎 a11y contrast token audit');

for (const check of checks) {
  const fg = resolveVar(check.fg);
  const bg = resolveVar(check.bg);

  if (!fg || !bg) {
    failures.push(`${check.fg} vs ${check.bg}: 토큰 해석 실패`);
    continue;
  }

  const ratio = contrast(fg, bg);
  const ok = ratio >= check.min;
  const line = `${ok ? '✅' : '❌'} [${check.kind}] ${check.fg}(${fg}) / ${check.bg}(${bg}) = ${ratio.toFixed(2)} (기준 ${check.min}:1)`;
  console.log(line);
  if (!ok) failures.push(line);
}

if (failures.length) {
  console.error(`\n실패: ${failures.length}건`);
  process.exit(1);
}

console.log('\n통과: 모든 토큰 대비 기준 충족');
