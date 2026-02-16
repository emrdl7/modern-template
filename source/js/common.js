/**
 * Common JavaScript
 * 모든 페이지에서 공통으로 사용하는 스크립트
 */

import { initMobileMenu, initStickyHeader, initSmoothScroll } from './modules/navigation.js';
import { initModal, initTabs } from './modules/ui.js';
import { initFormValidation } from './modules/form.js';

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
};

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}