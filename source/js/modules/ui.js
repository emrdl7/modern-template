/**
 * UI Components - 모달, 탭
 */
import { trapFocus } from "../utils.js";

// 모달
export const initModal = () => {
  let lastFocusedElement = null;
  let releaseFocusTrap = null;

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

    // 중복 바인딩 방지: 이전 트랩 정리 후 새로 연결
    releaseFocusTrap?.();
    releaseFocusTrap = trapFocus(modal);

    // 접근성: 모달 오픈 시 제목(heading)에 먼저 포커스 제공
    // - heading에 tabindex="-1"를 부여하면 탭 순서에 끼지 않으면서도 프로그램 포커스를 받을 수 있다.
    // - 제목 포커스가 없으면 스크린리더/키보드 사용자가 “어디로 들어왔는지”를 놓치기 쉽다.
    const title = modal.querySelector(
      ".modal-header h1, .modal-header h2, .modal-header h3, .modal-header h4, .modal-header h5, .modal-header h6",
    );

    if (title) {
      // aria-labelledby 연결(없을 때만)
      if (!title.id) title.id = `modal-title-${modal.id || ""}-${Date.now()}`;
      if (!modal.hasAttribute("aria-labelledby")) {
        modal.setAttribute("aria-labelledby", title.id);
      }

      // 프로그램 포커스용 tabindex
      if (!title.hasAttribute("tabindex")) title.setAttribute("tabindex", "-1");

      title.focus();
      return;
    }

    // fallback: 첫 번째 포커스 가능한 요소로 이동
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) focusable.focus();
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-active");
    modal.removeAttribute("aria-modal");
    document.body.style.overflow = "";

    releaseFocusTrap?.();
    releaseFocusTrap = null;

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
