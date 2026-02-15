#!/usr/bin/env node
/*
  lint:a11y

  Gates:
  1) Non-text contrast matrix (WCAG 2.1 1.4.11) via scripts/check-contrast.js --nontext
  2) Prevent accidental removal of focus indicators:
     - Disallow `outline none/0` declarations (including no-space variants).

  Why:
  - WCAG 1.4.11 (Non-text Contrast): essential UI boundaries/indicators need 3:1.
  - WCAG 2.4.7 (Focus Visible): removing outline is a common regression.
*/

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'reports',
]);

const ALLOW_EXT = new Set([
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.html',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
]);

const PATTERN = /\boutline\s*:\s*(0|none)\b/i;

async function *walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      yield *walk(full);
      continue;
    }
    if (!ent.isFile()) continue;
    const ext = path.extname(ent.name).toLowerCase();
    if (!ALLOW_EXT.has(ext)) continue;
    yield full;
  }
}

function isProbablyBinary(buf) {
  // If there are NUL bytes in first chunk, treat as binary.
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0) return true;
  }
  return false;
}

async function checkFile(filePath) {
  const fh = await fsp.open(filePath, 'r');
  try {
    const { buffer, bytesRead } = await fh.read({ length: 4096, position: 0, buffer: Buffer.alloc(4096) });
    const head = buffer.subarray(0, bytesRead);
    if (isProbablyBinary(head)) return [];
  } finally {
    await fh.close();
  }

  const text = await fsp.readFile(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (PATTERN.test(line)) {
      hits.push({ lineNo: i + 1, line: line.trimEnd() });
    }
  }
  return hits;
}

function runNonTextContrastCheck() {
  // Keep it lightweight: reuse scripts/check-contrast.js --nontext.
  // This catches regressions where essential UI boundaries (borders/focus/icons tokens) lose 3:1 contrast.
  const script = path.join(ROOT, 'scripts', 'check-contrast.js');
  const res = spawnSync(process.execPath, [script, '--nontext'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  return res.status === 0;
}

(async () => {
  // 1) Non-text contrast gate (WCAG 1.4.11)
  if (!runNonTextContrastCheck()) {
    console.error('\nlint:a11y FAIL — non-text contrast checks failed (WCAG 1.4.11)');
    process.exit(1);
  }

  // 2) Static scan: prevent accidental removal of focus indicators
  const violations = [];
  for await (const filePath of walk(ROOT)) {
    const rel = path.relative(ROOT, filePath);
    const hits = await checkFile(filePath);
    for (const h of hits) {
      violations.push({ file: rel, lineNo: h.lineNo, line: h.line });
    }
  }

  if (violations.length === 0) {
    console.log('lint:a11y OK (no forbidden outline declarations found)');
    process.exit(0);
  }

  console.error('lint:a11y FAIL — do not remove focus indicators via outline none/0');
  for (const v of violations) {
    console.error(`- ${v.file}:${v.lineNo}: ${v.line}`);
  }
  process.exit(1);
})();
