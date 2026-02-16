#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const configPath = resolve(process.cwd(), 'scripts/a11y-contrast-audit.config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const cssPath = resolve(process.cwd(), config.cssPath || 'source/css/main.css');
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

const checks = Array.isArray(config.checks) ? config.checks : [];
if (!checks.length) {
  console.error('❌ checks 설정이 비어 있습니다. scripts/a11y-contrast-audit.config.json 확인 필요');
  process.exit(1);
}

const requiredStates = Array.isArray(config.requiredStates)
  ? config.requiredStates
  : ['default', 'hover', 'focus', 'error'];

const failures = [];
const summaryByState = new Map();
const stateSet = new Set();
console.log('🔎 a11y contrast token audit');
console.log(`- css: ${config.cssPath || 'source/css/main.css'}`);
console.log(`- checks: ${checks.length}개`);
console.log(`- required states: ${requiredStates.join(', ')}`);

for (const check of checks) {
  const fg = resolveVar(check.fg);
  const bg = resolveVar(check.bg);
  const state = check.state || 'default';
  stateSet.add(state);

  if (!summaryByState.has(state)) summaryByState.set(state, { total: 0, failed: 0 });
  summaryByState.get(state).total += 1;

  if (!fg || !bg) {
    const msg = `[${state}] ${check.id || `${check.fg}-${check.bg}`}: 토큰 해석 실패`;
    failures.push(msg);
    summaryByState.get(state).failed += 1;
    continue;
  }

  const ratio = contrast(fg, bg);
  const min = Number(check.min ?? (check.kind === 'text' ? 4.5 : 3));
  const ok = ratio >= min;
  const line = `${ok ? '✅' : '❌'} [${state}] [${check.kind || 'ui'}] ${check.id || '-'} ${check.fg}(${fg}) / ${check.bg}(${bg}) = ${ratio.toFixed(2)} (기준 ${min}:1)`;
  console.log(line);
  if (!ok) {
    failures.push(line);
    summaryByState.get(state).failed += 1;
  }
}

console.log('\n상태별 요약');
for (const [state, stat] of summaryByState.entries()) {
  const pass = stat.total - stat.failed;
  console.log(`- ${state}: ${pass}/${stat.total} 통과`);
}

const missingStates = requiredStates.filter((state) => !stateSet.has(state));
if (missingStates.length) {
  const msg = `❌ 필수 상태 누락: ${missingStates.join(', ')}`;
  console.error(msg);
  failures.push(msg);
}

if (failures.length) {
  console.error(`\n실패: ${failures.length}건`);
  process.exit(1);
}

console.log('\n통과: 모든 토큰 대비 기준 충족');
