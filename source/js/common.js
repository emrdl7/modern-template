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

  // a11y: 개발 중 실수(랜드마크 이름 누락)만 조용히 힌트
  initA11yLandmarkHints();
};

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}