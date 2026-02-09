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
    const currentScroll = window.pageYOffset;

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
          behavior: 'smooth'
        });

        // 접근성: 포커스 이동
        target.focus();

        // 히스토리 업데이트
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
};
