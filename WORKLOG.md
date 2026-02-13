# 작업 로그 (WORKLOG)

## 2026-02-13 (금)
- **주제:** CSS in 2026 (LogRocket) & JS 모듈화
- **활동:**
  - 최신 CSS 트렌드 (`appearance: base-select`, `sibling-index`, `attr`) 학습 및 요약.
  - `modern-template`의 인라인 다크모드 스크립트를 `modules/theme.js`로 분리 (ES Module).
  - `localStorage` 연동으로 새로고침 후에도 테마 상태 유지 기능 추가.
  - `index.html`에 다크모드 전용 CSS 스타일 추가.
- **결과:** 코드 구조 개선 및 사용자 경험 향상 (테마 유지).

## 2026-02-13 (금) - 추가 작업
- **주제:** Web Vitals (LCP, CLS) 측정
- **활동:**
  - `PerformanceObserver` API를 활용한 성능 측정 모듈 (`source/js/modules/web-vitals.js`) 작성.
  - 외부 라이브러리 없이 Native API로 LCP, CLS 지표를 콘솔에 실시간 로깅하도록 구현.
  - `source/js/common.js` 엔트리 포인트에 해당 모듈 연동.
  - `STUDY-NOTES.md`에 Web Vitals 관련 이론(LCP, CLS 개념) 추가.
- **결과:** 개발 시 페이지 로딩 성능 및 레이아웃 안정성을 즉시 확인할 수 있는 기반 마련.
