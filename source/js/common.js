/**
 * Common JavaScript
 * 모든 페이지에서 공통으로 사용하는 스크립트
 */

import { initMobileMenu, initStickyHeader, initSmoothScroll } from './modules/navigation.js';
import { initModal, initTabs } from './modules/ui.js';
import { initFormValidation } from './modules/form.js';
import { initLazyLoad } from './modules/lazyLoad.js';
import { initTheme } from './modules/theme.js';
import { initWebVitals } from './modules/web-vitals.js';
import { initScrollAnim } from './modules/scroll-anim.js';
import { debounce, throttle } from './utils.js';

// ==========================================================================
// 초기화
// ==========================================================================
const init = () => {
  initTheme();
  initWebVitals();
  initScrollAnim();
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initFormValidation();
  initModal();
  initTabs();
  initLazyLoad();
};

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================================================
// 유틸리티 함수 export (필요시 사용)
// ==========================================================================
window.AppUtils = { debounce, throttle };