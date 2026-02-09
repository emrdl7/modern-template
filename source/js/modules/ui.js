/**
 * UI Components - 모달, 탭
 */

// 모달
export const initModal = () => {
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

// 탭
export const initTabs = () => {
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
