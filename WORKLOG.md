# 작업 로그 (WORKLOG)

## 2026-02-13 (금) 22:25 - 런타임 테마(CSS 변수) 컬러 토큰 실사용 반영
- **주제:** CSS 변수(--color-*) 기반 테마 토큰을 실제 UI에 반영 (다크모드/커스텀 범용성 강화)
- **활동:**
  - `source/css/scss/_base.scss`: body/링크/토글 등 핵심 색상을 `var(--color-*)` 우선으로 변경(fallback 포함)
  - `source/css/scss/_components.scss`: 버튼/카드/폼 입력 등 컴포넌트 색상도 `var(--color-*)` 소비하도록 변경
  - 폼 focus 스타일을 box-shadow → outline 기반으로 통일(다크모드에서 일관 + 접근성)
  - `main.css`, `sub.css` 컴파일 반영
- **커밋:** 8abbe91
- **결과:** 다크모드 토글(data-theme/prefers-color-scheme) 시 색 토큰이 실제로 적용되며, 프로젝트별 커스터마이징도 CSS 변수 오버라이드만으로 쉬워짐.

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
