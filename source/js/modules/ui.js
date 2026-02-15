/**
 * UI Components - 모달, 탭
 */
import { trapFocus } from "../utils.js";

// 모달
export const initModal = () => {
  let lastFocusedElement = null;

  // `inert` 지원 브라우저에서는 모달 오픈 시 배경 영역의 포커스/클릭 누수를 원천 차단
  const getInertRoot = () =>
    document.querySelector("main") ||
    document.querySelector('[role="main"]') ||
    document.getElementById("main");

  const openModal = (modal) => {
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.classList.add("is-active");
    document.body.style.overflow = "hidden";

    const inertRoot = getInertRoot();
    if (inertRoot && !inertRoot.hasAttribute("inert")) {
      inertRoot.setAttribute("inert", "");
      inertRoot.dataset.inertByModal = "true";
    }

    trapFocus(modal);

    // 접근성: 첫 번째 포커스 가능한 요소로 포커스 이동
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) focusable.focus();
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-active");
    modal.removeAttribute("aria-modal");
    document.body.style.overflow = "";

    const inertRoot = getInertRoot();
    if (inertRoot?.dataset?.inertByModal === "true") {
      inertRoot.removeAttribute("inert");
      delete inertRoot.dataset.inertByModal;
    }

    // 트리거 버튼으로 포커스 복원
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  // 모달 열기
  document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      lastFocusedElement = trigger;
      const modalId = trigger.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);
      if (modal) openModal(modal);
    });
  });

  // 모달 닫기
  document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = trigger.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  // 배경 클릭 시 닫기
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", () => {
      const modal = backdrop.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.is-active");
      if (activeModal) closeModal(activeModal);
    }
  });
};

// 탭
export const initTabs = () => {
  document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    // 현재 tablist가 실제로 제어하는 패널만 매핑 (role 문맥 분리)
    const panels = tabs
      .map((tab) => tab.getAttribute("aria-controls"))
      .filter(Boolean)
      .map((panelId) => document.getElementById(panelId))
      .filter((panel) => panel?.getAttribute("role") === "tabpanel");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();

        // 모든 탭 비활성화
        tabs.forEach((t) => {
          t.setAttribute("aria-selected", "false");
          t.classList.remove("is-active");
        });

        // 이 tablist의 패널만 숨김
        panels.forEach((p) => (p.hidden = true));

        // 선택된 탭 활성화
        tab.setAttribute("aria-selected", "true");
        tab.classList.add("is-active");

        // 해당 패널 표시
        const panelId = tab.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        if (panel?.getAttribute("role") === "tabpanel") panel.hidden = false;
      });

      // 키보드 네비게이션
      tab.addEventListener("keydown", (e) => {
        let newIndex;

        if (e.key === "ArrowRight") {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          newIndex = 0;
        } else if (e.key === "End") {
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
