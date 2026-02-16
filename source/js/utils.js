/**
 * Utils - 유틸리티 함수 (접근성/에러 방지 개선판)
 */

/**
 * debounce - 마지막 이벤트만 실행 (EX: input 검색, resize)
 * @param {Function} func 실행할 함수
 * @param {number} wait 대기(ms)
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

/**
 * throttle - 일정 주기마다 실행(연속호출 제한)
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * 포커스 트랩(accessibility) - 모달 등에서 Tab 이동을 컨테이너 내부로 제한
 * @param {HTMLElement} container
 * @returns {Function} cleanup 함수 (이벤트 제거)
 */
export function trapFocus(container) {
  const focusableSelectors =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

  const getFocusable = () => Array.from(container.querySelectorAll(focusableSelectors));

  const onKeydown = (e) => {
    if (e.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    // 외부 포커스 누수 시 즉시 컨테이너 내부로 복귀
    if (!container.contains(active)) {
      e.preventDefault();
      first.focus();
      return;
    }

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
      return;
    }

    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  container.addEventListener("keydown", onKeydown);
  return () => container.removeEventListener("keydown", onKeydown);
}
