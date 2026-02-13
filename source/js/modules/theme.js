/**
 * Theme Management Module
 * 다크모드/라이트모드 토글 및 상태 관리 (localStorage + System Preference)
 */

const THEME_KEY = 'modern-template-theme';
const DARK_CLASS = 'dark';

/**
 * 테마 초기화
 */
export const initTheme = () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;

  // 1. 저장된 테마 불러오기 또는 시스템 설정 확인
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  // 2. 초기 상태 적용
  applyTheme(isDark);

  // 3. 버튼 이벤트 리스너 등록
  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
    // 상태 저장
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  });

  // 4. 시스템 설정 변경 감지 (사용자가 명시적으로 설정하지 않은 경우에만 반영)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches);
      isDark = e.matches;
    }
  });
};

/**
 * 테마 적용 헬퍼 함수
 * @param {boolean} isDark 
 */
const applyTheme = (isDark) => {
  const body = document.body;
  const toggleBtn = document.getElementById('darkModeToggle');

  if (isDark) {
    body.dataset.theme = 'dark';
    toggleBtn.setAttribute('aria-pressed', 'true');
    toggleBtn.textContent = '☀️ 라이트모드';
  } else {
    body.dataset.theme = 'light';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.textContent = '🌙 다크모드';
  }
};
