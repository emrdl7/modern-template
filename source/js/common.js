/**
 * Common JavaScript
 * 모든 페이지에서 공통으로 사용하는 스크립트
 */

// ==========================================================================
// 모바일 메뉴 토글
// ==========================================================================
const initMobileMenu = () => {
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

// ==========================================================================
// 스크롤 시 헤더 고정
// ==========================================================================
const initStickyHeader = () => {
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

// ==========================================================================
// 스무스 스크롤 (앵커 링크)
// ==========================================================================
const initSmoothScroll = () => {
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

// ==========================================================================
// 폼 유효성 검사
// ==========================================================================
const initFormValidation = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // 브라우저 기본 유효성 검사 사용
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      form.classList.add('was-validated');
    });
  });
};

// ==========================================================================
// 모달
// ==========================================================================
const initModal = () => {
  // 모달 열기
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        
        // 접근성: 첫 번째 포커스 가능한 요소로 포커스 이동
        const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
      }
    });
  });
  
  // 모달 닫기
  document.querySelectorAll('[data-modal-close]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = trigger.closest('.modal');
      
      if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // 배경 클릭 시 닫기
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.modal');
      if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.is-active');
      if (activeModal) {
        activeModal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  });
};

// ==========================================================================
// 탭
// ==========================================================================
const initTabs = () => {
  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 모든 탭 비활성화
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('is-active');
        });
        
        // 모든 패널 숨김
        panels.forEach(p => p.hidden = true);
        
        // 선택된 탭 활성화
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('is-active');
        
        // 해당 패널 표시
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = false;
      });
      
      // 키보드 네비게이션
      tab.addEventListener('keydown', (e) => {
        let newIndex;
        
        if (e.key === 'ArrowRight') {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = tabs.length - 1;
        }
        
        if (newIndex !== undefined) {
          e.preventDefault();
          tabs[newIndex].focus();
          tabs[newIndex].click();
        }
      });
    });
  });
};

// ==========================================================================
// 이미지 레이지 로딩 (Intersection Observer)
// ==========================================================================
const initLazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback: 즉시 로드
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
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
  initLazyLoad();
  
  console.log('✅ Common JavaScript initialized');
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
window.AppUtils = {
  // Debounce
  debounce: (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle
  throttle: (func, limit = 300) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
