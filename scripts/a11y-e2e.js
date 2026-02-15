#!/usr/bin/env node

/**
 * E2E accessibility check (axe-core) powered by Playwright.
 *
 * Policy:
 * - Any axe `violations` => FAIL (exit 1)
 * - Any axe `incomplete` => WARNING only (exit 0)
 *   (common for color-contrast on complex backgrounds/overlays)
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const { chromium } = require('playwright');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(PROJECT_ROOT, 'reports');

function ensureReportsDir() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.woff2':
      return 'font/woff2';
    case '.woff':
      return 'font/woff';
    case '.ttf':
      return 'font/ttf';
    default:
      return 'application/octet-stream';
  }
}

function safeResolveFromRoot(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const clean = decoded.split('?')[0].split('#')[0];
  const rel = clean.replace(/^\//, '');
  const abs = path.resolve(PROJECT_ROOT, rel);
  if (!abs.startsWith(PROJECT_ROOT + path.sep) && abs !== PROJECT_ROOT) {
    return null;
  }
  return abs;
}

function createStaticServer() {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);
      const filePath = safeResolveFromRoot(url.pathname === '/' ? '/index.html' : url.pathname);
      if (!filePath) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', contentTypeFor(filePath));
      fs.createReadStream(filePath).pipe(res);
    } catch (e) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  return server;
}

async function runAxeOnPage(page, axeSource, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });

  // Ensure the document is ready.
  await page.waitForFunction(() => document.readyState === 'complete');

  const result = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    });
  });

  return result;
}

function summarize(resultsByUrl) {
  const summary = {
    urls: Object.keys(resultsByUrl).length,
    violations: 0,
    incomplete: 0,
    passes: 0,
  };

  for (const url of Object.keys(resultsByUrl)) {
    const r = resultsByUrl[url];
    summary.violations += (r.violations || []).length;
    summary.incomplete += (r.incomplete || []).length;
    summary.passes += (r.passes || []).length;
  }

  return summary;
}

(async () => {
  ensureReportsDir();

  const pages = (process.env.A11Y_PAGES || 'index.html,main.html,sub.html')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const port = Number(process.env.A11Y_PORT || 4173);

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));

  const baseUrl = `http://127.0.0.1:${port}`;

  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const resultsByUrl = {};

  try {
    for (const p of pages) {
      const url = `${baseUrl}/${p.replace(/^\//, '')}`;
      // eslint-disable-next-line no-console
      console.log(`[a11y:e2e] axe run: ${url}`);
      resultsByUrl[url] = await runAxeOnPage(page, axeSource, url);
    }
  } finally {
    await page.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const outJson = path.join(REPORTS_DIR, 'a11y-axe-report.json');
  fs.writeFileSync(outJson, JSON.stringify({ generatedAt: new Date().toISOString(), resultsByUrl }, null, 2));

  const s = summarize(resultsByUrl);

  function listChecks(kind) {
    const lines = [];
    const urls = Object.keys(resultsByUrl);

    for (const url of urls) {
      const checks = (resultsByUrl[url] && resultsByUrl[url][kind]) || [];
      if (!Array.isArray(checks) || checks.length === 0) continue;

      lines.push(`- URL: ${url} (${checks.length})`);
      for (const c of checks) {
        const id = c.id || '(no id)';
        const impact = c.impact || 'unknown';
        const nodes = Array.isArray(c.nodes) ? c.nodes.length : 0;
        const help = c.help ? ` — ${c.help}` : '';
        lines.push(`  - ${id} | impact: ${impact} | nodes: ${nodes}${help}`);
      }
    }

    return lines;
  }

  const summaryLines = [
    `A11Y E2E (axe-core + Playwright)`,
    `URLs: ${s.urls}`,
    `Violations: ${s.violations}`,
    `Incomplete (manual review): ${s.incomplete}`,
    `Passes: ${s.passes}`,
    `Report: ${path.relative(PROJECT_ROOT, outJson)}`,
  ];

  const incompleteLines = listChecks('incomplete');
  if (incompleteLines.length > 0) {
    summaryLines.push('', '== INCOMPLETE CHECKS (manual review) ==', ...incompleteLines);
  }

  const violationLines = listChecks('violations');
  if (violationLines.length > 0) {
    summaryLines.push('', '== VIOLATIONS ==', ...violationLines);
  }

  const outTxt = path.join(REPORTS_DIR, 'a11y-axe-summary.txt');
  fs.writeFileSync(outTxt, summaryLines.join('\n') + '\n');

  // eslint-disable-next-line no-console
  console.log(summaryLines.join('\n'));

  if (s.incomplete > 0) {
    // eslint-disable-next-line no-console
    console.warn(`\n[a11y:e2e] WARNING: axe returned incomplete checks. These are NOT treated as failures.`);
    // eslint-disable-next-line no-console
    console.warn(`[a11y:e2e] Review: reports/a11y-axe-report.json (look at resultsByUrl[*].incomplete)`);
  }

  if (s.violations > 0) {
    // eslint-disable-next-line no-console
    console.error(`\n[a11y:e2e] FAIL: axe violations detected.`);
    process.exitCode = 1;
  }
})();
