/**
 * Scroll Animation Module
 * Intersection Observer를 사용하여 스크롤 시 요소에 애니메이션 효과 적용
 */

export const initScrollAnim = () => {
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% 보일 때 트리거
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 한 번만 실행하고 관찰 중단
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.anim-on-scroll');
  elements.forEach(el => observer.observe(el));
};
