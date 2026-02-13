# 작업 로그 (WORKLOG)

## 2026-02-13 (금) 23:00 - ARIA·접근성 + 최신 디자인 패턴 실무 반영
- **주제:** ARIA 접근성 실전, 디자인 패턴 최신 트렌드(UX/UI)
- **활동:**
  - MDN ARIA/landmark, Smashing Magazine AI UX/Colorblind 대응/알림 UX 실무 강독 및 요약
  - color token·outline·알림/disabled UX 처리, landmark 시맨틱 태그·skip link·모션감소 미디어쿼리/outline 등 한국 gov 기준 + WCAG 2.1 AA 반영
  - main.css, 컴포넌트에서 aria-role 과도 사용 제거와 landmark role 실전 적용
  - color contrast/shape/font-weight 등 실제 disabled, highlight, emergency(알림) 상태 개선
- **커밋:** f9a1342
- **결과:** UI/UX 접근성 강화(실제 구동 포함), color/outline/skipnav/알림/disabled 상태 개선, 코드에서 과도한 ARIA 사용 분리, 진짜 landmark 태그 우선

## 2026-02-13 (금)
- **주제:** CSS in 2026 (LogRocket) & JS 모듈화
- **활동:**
  - 최신 CSS 트렌드 (`appearance: base-select`, `sibling-index`, `attr`) 학습 및 요약.
  - `modern-template`의 인라인 다크모드 스크립트를 `modules/theme.js`로 분리 (ES Module).
  - `modules/web-vitals.js` 추가: LCP, CLS 성능 지표 측정 로직 구현 (PerformanceObserver).
  - `localStorage` 연동으로 새로고침 후에도 테마 상태 유지 기능 추가.
  - `index.html`에 다크모드 전용 CSS 스타일 추가.
- **결과:** 코드 구조 개선, 사용자 경험 향상 (테마 유지), 성능 모니터링 기반 마련.

## 2026-02-13 (금) - 추가 작업
- **주제:** Web Vitals (LCP, CLS) 측정
- **활동:**
  - `PerformanceObserver` API를 활용한 성능 측정 모듈 (`source/js/modules/web-vitals.js`) 작성.
  - 외부 라이브러리 없이 Native API로 LCP, CLS 지표를 콘솔에 실시간 로깅하도록 구현.
  - `source/js/common.js` 엔트리 포인트에 해당 모듈 연동.
  - `STUDY-NOTES.md`에 Web Vitals 관련 이론(LCP, CLS 개념) 추가.
- **결과:** 개발 시 페이지 로딩 성능 및 레이아웃 안정성을 즉시 확인할 수 있는 기반 마련.
