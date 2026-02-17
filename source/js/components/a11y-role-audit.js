/**
 * Dev-only A11y Role Audit (lightweight)
 *
 * 목적:
 * - role fallback 사용 힌트
 * - role 컨텍스트 유효성(row/listitem) 힌트
 * - landmark 과잉/이름 누락 힌트
 *
 * 주의: 빌드/런타임을 막지 않고 console 경고만 출력.
 */

const KNOWN_ROLES = new Set([
  'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 'columnheader',
  'combobox', 'complementary', 'contentinfo', 'dialog', 'feed', 'figure', 'form', 'grid', 'gridcell',
  'heading', 'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'menu', 'menubar', 'menuitem',
  'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'region',
  'row', 'rowgroup', 'rowheader', 'search', 'searchbox', 'separator', 'slider', 'spinbutton', 'status',
  'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree',
  'treegrid', 'treeitem',
]);

const LANDMARK_ROLES = ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search'];

const normalizeRoleTokens = (raw) =>
  (raw || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => token.toLowerCase());

const hasAccessibleName = (el) =>
  el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.hasAttribute('title');

const auditRoleFallback = () => {
  const fallbackHints = [];

  document.querySelectorAll('[role]').forEach((el) => {
    const tokens = normalizeRoleTokens(el.getAttribute('role'));
    if (tokens.length < 2) return;

    const [primary, ...fallback] = tokens;
    const isPrimaryKnown = KNOWN_ROLES.has(primary);

    if (!isPrimaryKnown && fallback.some((r) => KNOWN_ROLES.has(r))) {
      fallbackHints.push({
        type: 'fallback-in-use',
        primary,
        fallback,
        node: el,
      });
      return;
    }

    if (isPrimaryKnown) {
      fallbackHints.push({
        type: 'fallback-unreachable',
        primary,
        fallback,
        node: el,
      });
    }
  });

  return fallbackHints;
};

const auditRoleContext = () => {
  const invalidRows = Array.from(document.querySelectorAll('[role="row"], tr')).filter((el) => {
    const host = el.closest('[role="rowgroup"], [role="grid"], [role="table"], [role="treegrid"], table, thead, tbody, tfoot');
    return !host;
  });

  const invalidListItems = Array.from(document.querySelectorAll('[role="listitem"], li')).filter((el) => {
    const host = el.closest('[role="list"], ul, ol');
    return !host;
  });

  return { invalidRows, invalidListItems };
};

const auditLandmarkDensity = () => {
  const issues = [];

  const checkMany = (selector, label) => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length <= 1) return;

    const unnamed = nodes.filter((el) => !hasAccessibleName(el));
    if (!unnamed.length) return;

    issues.push({ label, total: nodes.length, unnamed: unnamed.length, nodes: unnamed });
  };

  checkMany('nav, [role="navigation"]', 'navigation landmark');
  checkMany('aside, [role="complementary"]', 'complementary landmark');

  LANDMARK_ROLES.forEach((role) => {
    checkMany(`[role="${role}"]`, `role="${role}" landmark`);
  });

  return issues;
};

export const initA11yRoleAudit = () => {
  const params = new URLSearchParams(window.location.search);
  const enabledByQuery = params.get('a11y-role-audit') === '1';
  const enabledByAttr = document.documentElement.dataset.a11yRoleAudit === 'true';

  if (!enabledByQuery && !enabledByAttr) return;

  const fallbackHints = auditRoleFallback();
  const { invalidRows, invalidListItems } = auditRoleContext();
  const landmarkIssues = auditLandmarkDensity();

  const summary = {
    roleFallbackHints: fallbackHints.length,
    invalidRowContext: invalidRows.length,
    invalidListItemContext: invalidListItems.length,
    landmarkIssues: landmarkIssues.length,
  };

  // eslint-disable-next-line no-console
  console.groupCollapsed('[a11y role-audit] summary');
  // eslint-disable-next-line no-console
  console.table(summary);

  if (fallbackHints.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y role-audit] role fallback 힌트', fallbackHints);
  }
  if (invalidRows.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y role-audit] row 컨텍스트 유효성 점검 필요', invalidRows);
  }
  if (invalidListItems.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y role-audit] listitem 컨텍스트 유효성 점검 필요', invalidListItems);
  }
  if (landmarkIssues.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y role-audit] landmark 과잉/이름 누락 힌트', landmarkIssues);
  }

  // eslint-disable-next-line no-console
  console.info('[a11y role-audit] 실행 조건: ?a11y-role-audit=1 또는 <html data-a11y-role-audit="true">');
  // eslint-disable-next-line no-console
  console.groupEnd();
};
