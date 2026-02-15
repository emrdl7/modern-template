/**
 * Navigation - 모바일 메뉴, 스티키 헤더, 스무스 스크롤
 */

// 모바일 메뉴 토글
export const initMobileMenu = () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.getElementById('nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('is-active');
  });

  // ESC 키로 메뉴 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-active')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-active');
      toggle.focus();
    }
  });

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-active');
    }
  });
};

// 스크롤 시 헤더 고정
export const initStickyHeader = () => {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // 스크롤 다운: 헤더 숨김
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('is-hidden');
    }
    // 스크롤 업: 헤더 표시
    else {
      header.classList.remove('is-hidden');
    }

    // 스크롤 위치에 따라 배경색 추가
    if (currentScroll > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  });
};

// 스무스 스크롤 (앵커 링크)
export const initSmoothScroll = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // 빈 해시나 #만 있는 경우 무시
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // 헤더 높이 계산 (고정 헤더인 경우)
        const header = document.getElementById('header');
        const offset = header ? header.offsetHeight : 0;

        const targetPosition = target.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: scrollBehavior
        });

        // 접근성: 포커스 이동(스크롤 중복 방지)
        // NOTE: non-focusable 요소에도 포커스를 줄 수 있도록 tabindex를 부여(커스터마이징 여지 위해 유지)
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });

        // 히스토리 업데이트
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
};
