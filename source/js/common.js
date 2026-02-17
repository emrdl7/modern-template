/**
 * Common JavaScript
 * 모든 페이지에서 공통으로 사용하는 스크립트
 */

import { initMobileMenu, initStickyHeader, initSmoothScroll } from './modules/navigation.js';
import { initModal, initTabs } from './modules/ui.js';
import { initFormValidation } from './modules/form.js';
import { initA11yRoleAudit } from './components/a11y-role-audit.js';

// =====================================================================
// A11y helpers (lightweight, non-blocking)
// =====================================================================

/**
 * Landmark/nav가 여러 개 있을 때 accessible name(aria-label/labelledby)이
 * 누락되면 스크린리더 탐색성이 급격히 떨어질 수 있어, 개발 중 힌트(warn)만 제공.
 *
 * - 빌드/런타임을 막지 않는다.
 * - 커스터마이징 여지를 위해 “규칙 강제”가 아니라 “힌트”로만 동작한다.
 */
const initA11yLandmarkHints = () => {
  const hasAccName = (el) =>
    el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.hasAttribute('title');

  const checkMany = (selector, label) => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length <= 1) return;

    const unnamed = nodes.filter((el) => !hasAccName(el));
    if (unnamed.length === 0) return;

    // eslint-disable-next-line no-console
    console.warn(
      `[a11y] ${label}가 ${nodes.length}개입니다. 중복 landmark는 aria-label/aria-labelledby로 구분하는 것을 권장합니다. (누락 ${unnamed.length}개)`,
      unnamed,
    );
  };

  // nav/aside는 특히 “여러 개”가 쉽게 생겨서 힌트를 주는 편이 안전하다.
  checkMany('nav', '<nav>');
  checkMany('aside', '<aside>');
};

/**
 * WCAG 2.1 SC 2.5.3(Label in Name) 힌트:
 * 화면에 보이는 라벨(visible text)이 있는 컨트롤에 aria-label을 붙일 때,
 * 그 aria-label이 visible label을 포함하지 않으면 음성 입력(Voice Control)
 * 사용자가 “보이는 대로 말해도” 조작이 안 되는 문제가 생길 수 있다.
 *
 * - 빌드/런타임을 막지 않는다.
 * - 규칙 강제 대신, 개발 중 console.warn 힌트만 제공한다.
 */
const initA11yLabelInNameHints = () => {
  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();

  const getVisibleText = (el) => normalize(el.textContent);

  const candidates = Array.from(document.querySelectorAll('button, a[role="button"], input[type="button"], input[type="submit"]'));

  const problems = candidates
    .map((el) => {
      const ariaLabel = el.getAttribute('aria-label');
      if (!ariaLabel) return null;

      // input[type=button|submit]은 value가 “보이는 라벨” 역할
      const visible = el instanceof HTMLInputElement ? normalize(el.value) : getVisibleText(el);
      if (!visible) return null;

      const aria = normalize(ariaLabel);
      if (!aria.includes(visible)) return { el, visible, ariaLabel };

      return null;
    })
    .filter(Boolean);

  if (problems.length === 0) return;

  // eslint-disable-next-line no-console
  console.warn(
    `[a11y] Label in Name 힌트: visible label과 aria-label이 불일치하는 컨트롤이 있습니다. (총 ${problems.length}개)`,
    problems,
  );
};

/**
 * 프로토타입 단계 접근성 사전점검(Preflight)
 *
 * 체크 항목(가벼운 자동 점검):
 * - 읽기 순서(heading level skip)
 * - 라벨(폼 컨트롤과 label 연결)
 * - alt(의미 이미지 alt 누락)
 * - 키보드 흐름(tabindex>0 사용)
 *
 * 실행 조건(옵트인):
 * - URL 쿼리: ?a11y-preflight=1
 * - 또는 <html data-a11y-preflight="true">
 */
const initA11yPrototypePreflight = () => {
  const params = new URLSearchParams(window.location.search);
  const enabledByQuery = params.get('a11y-preflight') === '1';
  const enabledByAttr = document.documentElement.dataset.a11yPreflight === 'true';
  if (!enabledByQuery && !enabledByAttr) return;

  const headingLevels = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingSkips = [];
  let prev = 0;

  headingLevels.forEach((h) => {
    const current = Number(h.tagName.replace('H', ''));
    if (prev !== 0 && current - prev > 1) {
      headingSkips.push({ from: prev, to: current, node: h });
    }
    prev = current;
  });

  const controls = Array.from(document.querySelectorAll('input, select, textarea'))
    .filter((el) => el.type !== 'hidden' && !el.disabled);

  const unlabeledControls = controls.filter((el) => {
    const id = el.getAttribute('id');
    const hasForLabel = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
    const hasWrappedLabel = !!el.closest('label');
    const hasAriaName = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby');
    return !(hasForLabel || hasWrappedLabel || hasAriaName);
  });

  const imagesMissingAlt = Array.from(document.querySelectorAll('img')).filter((img) => !img.hasAttribute('alt'));

  const positiveTabindex = Array.from(document.querySelectorAll('[tabindex]')).filter((el) => {
    const value = Number(el.getAttribute('tabindex'));
    return Number.isFinite(value) && value > 0;
  });

  const summary = {
    headingSkips: headingSkips.length,
    unlabeledControls: unlabeledControls.length,
    imagesMissingAlt: imagesMissingAlt.length,
    positiveTabindex: positiveTabindex.length,
  };

  // eslint-disable-next-line no-console
  console.groupCollapsed('[a11y preflight] prototype review summary');
  // eslint-disable-next-line no-console
  console.table(summary);

  if (headingSkips.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y preflight] Heading level skip 발견', headingSkips);
  }
  if (unlabeledControls.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y preflight] 라벨 없는 form control 발견', unlabeledControls);
  }
  if (imagesMissingAlt.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y preflight] alt 속성 없는 img 발견', imagesMissingAlt);
  }
  if (positiveTabindex.length) {
    // eslint-disable-next-line no-console
    console.warn('[a11y preflight] tabindex>0 요소 발견(탭 순서 왜곡 가능)', positiveTabindex);
  }

  // eslint-disable-next-line no-console
  console.info('[a11y preflight] 대체 리서치 트랙: Survey / Co-design / Rapid HTML / Wizard-of-Oz 중 2개 이상을 PR 코멘트에 기록하세요.');
  // eslint-disable-next-line no-console
  console.groupEnd();
};

// ==========================================================================
// 초기화
// ==========================================================================
const init = () => {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initFormValidation();
  initModal();
  initTabs();

  // a11y: 개발 중 실수(랜드마크 이름 누락 / label-in-name 불일치)만 조용히 힌트
  initA11yLandmarkHints();
  initA11yLabelInNameHints();
  initA11yPrototypePreflight();
  initA11yRoleAudit();
};

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}