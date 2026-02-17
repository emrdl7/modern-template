## 2026-02-17 (화요일) 20:00 - focus-ring-strong 토큰 추가로 대비 커스터마이징 보강
- **수정 파일:** source/css/scss/_variables.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(19:30) 아이디어를 반영해 `:focus-visible` 공통 강화 흐름을 유지하면서, 루트 토큰에 `--focus-ring-strong`을 추가해 컴포넌트별 강한 포커스 링 색상을 한 곳에서 조정 가능하도록 정리.
  - 라이트 모드에서는 `--color-focus-ring` 기반에 검정 혼합, 다크 모드에서는 흰색 혼합으로 분기해 배경 대비가 다른 환경에서도 링 가시성을 안정적으로 확보.
  - 변경 범위를 SCSS 변수 파일 1개(빌드 산출물 포함)로 제한해 기능 확장 없이 경량 적용 및 후속 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 버튼/입력/모달 포커스 링이 라이트·다크 모드에서 모두 충분히 구분되는지 키보드 탭 이동으로 1회 스모크 점검.
---

## 2026-02-17 (화요일) 19:00 - reduced-motion 전환 비활성화 및 focus-visible 두께 보강
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(18:30) 아이디어를 반영해 주요 인터랙션 컴포넌트(`.btn`, `.form-control`, `.form-check-input`, `.modal-content`)의 `:focus-visible`에 공통 `outline` 두께/오프셋을 추가해 포커스 가시성을 일관되게 강화.
  - `@media (prefers-reduced-motion: reduce)`에서 버튼/폼/모달/토스트 전환을 `transition: none`으로 정리해 모션 민감 환경에서 애니메이션·전환을 사실상 비활성화.
  - 변경 범위를 컴포넌트 SCSS 1개(빌드 산출물 포함)로 제한해 기능 확장 없이 경량 개선과 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** reduced-motion 설정 ON 상태에서 모달 열림/닫힘과 버튼 포커스 이동의 시각 피드백 일관성을 1회 스모크 점검.
---

## 2026-02-17 (화요일) 18:00 - INP 및 액션-페인트 지연 계측 추가
- **수정 파일:** source/js/components/perf-metrics.js, source/js/common.js
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(17:30) 아이디어를 반영해 `LCP/CLS` 기본 수집에 `INP(지원 브라우저)`를 추가하고, 페이지 종료 시점(`visibilitychange`)에 요약 값을 기록하도록 구성.
  - 사용자 `click/keydown` 이후 2프레임 기준으로 `ACTION_TO_PAINT` 지연을 근사 측정해 협업 화면 체감 반응성을 가볍게 추적할 수 있게 추가.
  - 콘솔 출력 + `app:perf-metric` 커스텀 이벤트만 제공하는 경량 구조로 유지해 과도한 기능 추가 없이 후속 전송/대시보드 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `app:perf-metric` 이벤트를 샘플 리스너 1개로 수집해 화면별(INP/액션-페인트) 편차를 비교 점검.
---

## 2026-02-17 (화요일) 17:00 - 카드 내부 focus-visible 통일 및 토스트 reduced-motion 최소화
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(16:30) 아이디어를 반영해 `.card` 내부 인터랙션 요소(`a/button/[role="button"]/tabindex`)의 `:focus-visible`을 `--focus-ring-strong` 우선 토큰으로 통일.
  - `@media (prefers-reduced-motion: reduce)`에 `.toast`, `[data-toast]`, `.alert`를 추가해 토스트/알림 전환도 `60ms linear` 이하의 초단기 모션으로 제한.
  - 변경을 컴포넌트 SCSS 1개(빌드 산출물 포함)로 유지해 과도한 기능 추가 없이 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 카드/토스트/모달의 키보드 포커스 대비와 reduced-motion 체감을 1회 통합 스모크 점검.
---

## 2026-02-17 (화요일) 16:00 - focus-visible strong 토큰 통일 및 모달 전환 60ms 최소화
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(15:30) 아이디어를 반영해 `.btn`, `.form-control`, `.form-check-input`의 `:focus-visible`을 `--focus-ring-strong` 우선(fallback 유지)으로 통일해 공통 포커스 대비를 강화.
  - `@media (prefers-reduced-motion: reduce)`에서 `.modal-backdrop`, `.modal-content` 전환을 `opacity` 단일 속성 + `60ms linear`로 축소해 모션 부담을 더 낮춤.
  - 변경 범위를 컴포넌트 SCSS 1개(빌드 산출물 포함)로 제한해 과도한 기능 추가 없이 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 키보드 탭 이동 시 버튼/폼/체크박스 focus-visible 대비와 모달 열림/닫힘 reduced-motion 체감을 1회 스모크 점검.
---

## 2026-02-17 (화요일) 15:00 - reduced-motion 전환 시간을 80ms로 경량 조정
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(14:30) 아이디어를 반영해 `@media (prefers-reduced-motion: reduce)`에서 버튼/폼 전환을 제거 대신 `transition-duration: 80ms`로 제한해 과한 움직임 없이 상태 변화를 인지 가능하게 조정.
  - 모달/백드롭/콘텐츠는 이동 모션(`transform`)과 애니메이션을 제거하고, 전환은 선형 80ms 페이드만 유지해 모션 민감 사용자 부담을 낮춤.
  - 변경 범위를 컴포넌트 SCSS 1개(빌드 산출물 포함)로 제한해 기능 확장 없이 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 열림/닫힘과 버튼 hover→focus 전환에서 reduced-motion 체감(즉시성/인지성) 1회 스모크 점검.
---

## 2026-02-17 (화요일) 14:00 - 모달 내부 focus-visible 대비 강화 및 reduced-motion 고정
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(13:30) 아이디어를 반영해 `.modal-content` 내부 인터랙션 요소(`a/button/input/textarea/select/tabindex`)의 `:focus-visible`을 `focus-ring-strong`(fallback: `primary-dark`) 기준으로 통일해 밝은/중간 배경에서 포커스 경계 대비를 강화.
  - `@media (prefers-reduced-motion: reduce)` 구간에 모달 백드롭/콘텐츠 `transition-duration: 0.01ms` 보강을 추가해 일부 브라우저에서 전환값 누락 시에도 모달 모션이 사실상 비활성화되도록 고정.
  - 변경 범위를 컴포넌트 SCSS 1개(빌드 산출물 포함)로 제한해 기능 확장 없이 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 내부 링크/버튼/입력 3종에서 키보드 탭 이동 시 포커스 링 일관성 1회 스모크 점검.
---

## 2026-02-17 (화요일) 13:00 - 폼/모달 focus-visible 대비 강화
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(12:30) 아이디어를 반영해 `.form-control:focus-visible/:focus`의 포커스 컬러를 `primary-dark` 우선으로 조정해 밝은 배경에서 포커스 경계를 더 명확히 보이게 정리.
  - 모달 헤더의 `tabindex="-1"` 제목 포커스 스타일도 `primary-dark` 우선 링으로 맞춰 키보드/프로그램 포커스 대비를 통일.
  - `prefers-reduced-motion: reduce` 구간에 `html:focus-within { scroll-behavior: auto; }`를 추가해 모션 최소화 환경에서 불필요한 스크롤 모션을 억제.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달/폼 상태(기본·포커스·오류)에서 포커스 링 대비를 테마별로 1회 스모크 점검.
---

## 2026-02-17 (화요일) 12:00 - 모달 reduced-motion 대응 및 focus-visible 보강
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(11:30) 아이디어를 반영해 `.modal-backdrop`, `.modal-content`에 기본 전환을 명시하고, 기존 `prefers-reduced-motion: reduce`에서 해당 전환이 완전히 비활성화되도록 정리.
  - `.modal-content:focus-visible` 포커스 링을 추가해 `tabindex` 기반 포커스 이동 시 모달 컨테이너 경계가 더 분명히 보이도록 대비를 강화.
  - 변경을 컴포넌트 SCSS 1개(빌드 산출물 포함)로 제한해 과도한 기능 추가 없이 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 닫기 버튼/헤더 제목의 포커스 이동 경로를 키보드 탭 순서 기준으로 1회 스모크 점검.
---

## 2026-02-17 (화요일) 11:00 - Dev용 A11y role audit 힌트 추가
- **수정 파일:** source/js/components/a11y-role-audit.js, source/js/common.js
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(10:30) 아이디어를 반영해 role fallback·컨텍스트 유효성(row/listitem)·landmark 과잉을 점검하는 `initA11yRoleAudit()`를 추가.
  - `?a11y-role-audit=1` 또는 `<html data-a11y-role-audit="true">`에서만 동작하는 옵트인 dev 점검으로 구성해 기본 런타임은 가볍게 유지.
  - 결과는 console summary/warn 힌트만 출력하도록 설계해 과도한 기능 추가를 피하고 팀별 규칙 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** role="grid"/"treegrid"에서 row/rowgroup 최소 구조 점검 힌트를 1단계 정교화.
---

## 2026-02-17 (화요일) 10:00 - 프로토타입 A11y 리서치 PR 체크리스트 경량 보강
- **수정 파일:** docs/a11y-prototype-research-playbook.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(09:30) 아이디어를 반영해 플레이북에 `PR 체크리스트` 섹션을 추가.
  - 읽기 순서/라벨·접근성 이름/alt/키보드 흐름과 대체 리서치 트랙(설문·코디자인·Rapid HTML·WoZ) 2개 이상 실행 항목을 PR 복붙용으로 경량 정리.
  - 문서 1파일만 수정해 과도한 기능 추가를 피하고, 팀별 항목 확장이 가능하도록 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** PR 체크리스트에 상태별(기본/포커스/오류) 관찰 메모 1줄을 선택 항목으로 추가.
---

## 2026-02-17 (화요일) 09:00 - PR 템플릿에 프로토타입 A11y 리서치 체크 추가
- **수정 파일:** .github/pull_request_template.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(08:30) 아이디어를 반영해 PR 본문에서 바로 사용하는 `A11y Prototype Preflight` 체크리스트를 추가.
  - 읽기 순서/라벨/alt/키보드 흐름 4개 사전점검 항목과 대체 리서치 트랙(Survey/Co-design/Rapid HTML/Wizard-of-Oz) 체크를 한 파일에 경량 구성.
  - 템플릿 기반 문서화만 추가해 기능 과확장을 피하고, 팀별 항목 확장이 가능하도록 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** PR 템플릿 Research Notes에 상태별(기본/포커스/오류) 관찰 칸 1줄 추가.
---

## 2026-02-17 (화요일) 08:00 - 프로토타입 A11y Preflight 콘솔 점검 추가
- **수정 파일:** source/js/common.js
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(07:30) 아이디어를 반영해 프로토타입 단계 사전점검 루틴(읽기 순서/라벨/alt/키보드 흐름)을 콘솔에서 한 번에 확인하는 `initA11yPrototypePreflight()`를 추가.
  - `?a11y-preflight=1` 또는 `<html data-a11y-preflight="true">`에서만 동작하도록 옵트인 방식으로 구성해 기본 동작은 가볍게 유지.
  - 자동 점검은 heading level skip, 라벨 누락 컨트롤, alt 누락 이미지, `tabindex>0` 요소만 최소 범위로 포함하고, 대체 리서치 트랙(Survey/Co-design/Rapid HTML/Wizard-of-Oz) 기록 안내를 함께 출력.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Preflight 결과를 PR 본문 체크리스트로 복사하기 위한 1클릭 스니펫 출력 옵션을 경량 추가.
---

## 2026-02-17 (화요일) 07:00 - 버튼 focus-visible 대비 보강
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(06:30) 아이디어를 반영해 `.btn-secondary:focus-visible`에 `secondary-dark` 우선 포커스 링을 추가해 색상 배경 위에서도 포커스 경계를 더 분명히 표시.
  - `.btn-outline:focus-visible`에도 `primary-dark` 우선 포커스 링을 명시해 배경/테마 변경 시 포커스 가시성 편차를 줄임.
  - 기존 reduced-motion 구조는 유지하고 버튼 포커스 대비만 경량 보강해 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 액션 버튼(확인/취소) 포커스 링 대비를 배경 조합별로 1회 스모크 점검.
---

## 2026-02-17 (화요일) 06:00 - A11y Preflight PR 템플릿 추가
- **수정 파일:** index.html, STUDY-NOTES.md(자동 누적 커밋 포함)
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(05:30) 아이디어를 반영해 `프로토타입 접근성 체크리스트` 섹션에 PR 본문에 바로 붙여넣을 수 있는 `A11y Prototype Preflight` 템플릿을 추가.
  - 템플릿에 읽기 순서/라벨/alt/키보드 사전점검과 Survey·Co-design·Rapid HTML·Wizard-of-Oz 중 2개 이상 실행 체크를 포함.
  - 과도한 기능 추가 없이 HTML 1파일 중심으로 가볍게 반영해 다음 회차 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** PR 템플릿에 상태별(기본/포커스/오류) 접근성 검증 결과 입력칸을 1줄 확장.
---

## 2026-02-17 (화요일) 05:00 - 프로토타입 대체 리서치 빠른 선택 블록 추가
- **수정 파일:** index.html
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(04:30) 아이디어를 반영해 기존 `프로토타입 접근성 체크리스트` 아래에 `대체 리서치 빠른 선택(60초)` 블록을 추가.
  - Survey·Co-design·Rapid HTML·Wizard-of-Oz를 시간/목적 기준의 4개 경량 시나리오로 정리해 초기 회차에서 바로 선택 가능하게 구성.
  - 기존 구조/스타일을 유지한 채 안내 텍스트만 확장해 과한 기능 추가 없이 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 빠른 선택 항목별 결과 기록용 1줄 템플릿(막힘/개선안) 추가.
---

## 2026-02-17 (화요일) 04:00 - 대체 리서치 방식 선택 가이드(60초) 추가
- **수정 파일:** docs/a11y-prototype-research-playbook.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(03:30) 아이디어를 반영해 프로토타입 접근성 사전점검/대체 리서치 흐름은 유지한 채, 회차 시작 직전 빠르게 고를 수 있는 `60초 방식 선택 가이드`를 추가.
  - 시간/목표(이해도 vs 조작성) 기준으로 Survey·Co-design·Rapid HTML·Wizard-of-Oz 조합을 4가지 경량 시나리오로 정리.
  - 과도한 기능 추가 없이 문서 1파일만 수정해 팀별 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 실행 템플릿에 방식별 "막힘 1개 + 개선안 1개" 예시 1세트를 추가.
---

## 2026-02-17 (화요일) 03:00 - Rapid Harness 사전점검(읽기 순서/라벨/alt/키보드) 기록 보강
- **수정 파일:** docs/a11y-rapid-harness.html
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(02:30) 아이디어를 반영해 Quick Checklist에 `alt/대체텍스트` 점검 항목을 추가.
  - 테스트 화면에 `Preflight 1-Min Record` 섹션을 추가해 읽기 순서/라벨/alt/키보드 4개 항목을 통과·보완 필요로 즉시 체크할 수 있게 구성.
  - 기존 하네스 구조와 스타일은 유지하고, 선택형 입력만 추가해 가볍게 커스터마이징 가능한 형태로 반영.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Rapid Harness에 스크린리더 요소 이름(heading/button/field) 점검용 짧은 샘플 블록 1개 추가.
---

## 2026-02-17 (화요일) 02:00 - reduced-motion 범위 확장 및 focus-visible 대비 강화
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(01:30) 코드 적용 아이디어를 반영해 `.btn-primary:focus-visible` 링 색상을 `primary-dark` 우선으로 조정해 버튼 배경 위 포커스 대비를 강화.
  - `.form-check-input:focus-visible`에도 동일한 고대비 포커스 링 토큰 우선순위를 적용해 컴포넌트 간 포커스 가시성을 일관화.
  - `@media (prefers-reduced-motion: reduce)` 적용 대상을 `.form-control`까지 확장해 입력 상호작용 전환 모션도 최소화.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 닫기 버튼의 `:focus-visible` 대비(배경 조합별) 점검용 스모크 케이스 1개 추가.
---

## 2026-02-17 (화요일) 01:00 - 프로토타입 사전점검/대체 리서치 체크리스트 보강
- **수정 파일:** docs/a11y-prototype-research-playbook.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(00:30) 아이디어를 반영해 Step 0 사전검증에 스크린리더 요소 이름 일치 점검 항목을 추가.
  - 회차 시작 즉시 기록 가능한 1분 요약 포맷(읽기 순서/라벨/alt/키보드)을 추가해 운영성을 높임.
  - 회차 종료 전 사용할 대체 리서치 실행 체크리스트(최소 2개 방식 실행, 방식별 막힘+개선안, 다음 회차 재검증 항목 압축) 섹션을 추가.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 실행 템플릿에 방식별 “막힘 1개 + 개선안 1개” 예시를 1세트 추가.
---

## 2026-02-17 (화요일) 00:00 - 버튼/모달 모션 감소 및 포커스 대비 강화
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(23:30) 아이디어를 반영해 `.btn:focus-visible` 포커스 링 기본색을 `primary-dark` 우선으로 조정해 대비를 강화.
  - `@media (prefers-reduced-motion: reduce)`에서 `.btn`, `.modal`, `.modal-backdrop`, `.modal-content`의 animation/transition/transform을 비활성화해 모션 민감 사용자 설정을 명시적으로 존중.
  - 변경 범위를 컴포넌트 SCSS 1개 중심으로 제한하고 CSS 빌드 산출물만 갱신해 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 제목/닫기 버튼의 키보드 포커스 이동 경로를 문서 체크리스트에 1개 추가.
---

## 2026-02-16 (월요일) 23:00 - 프로토타입 사전검증 체크 추가
- **수정 파일:** docs/a11y-prototype-research-playbook.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(22:30) 아이디어를 반영해 실행 루틴에 Step 0(사전검증, 5분)을 추가.
  - 리서치 시작 전에 읽기 순서/라벨/alt/키보드 흐름을 빠르게 점검하도록 체크리스트를 명시.
  - 실행 템플릿에 Preflight 기록 섹션을 넣어 회차별 사전 품질 게이트를 남길 수 있게 정리.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Rapid HTML 하네스와 연결된 사전검증 예시(좋은/나쁜 라벨 케이스) 1세트 추가.
---

## 2026-02-16 (월요일) 22:00 - Wizard-of-Oz 리서치 단계 보강
- **수정 파일:** docs/a11y-prototype-research-playbook.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(21:30) 아이디어를 반영해 플레이북에 Wizard-of-Oz(선택) 단계를 추가.
  - 프로토타입 한계 안내/수동 응답 중재/막힘 기록/구현 전 최소 상태 정의 체크리스트를 넣어 초기 리서치 공백을 줄이도록 정리.
  - 실행 템플릿에도 Wizard-of-Oz 기록 필드를 추가해 회차별로 가볍게 누적 가능하게 구성.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Rapid HTML 하네스 기준 샘플 플로우(검색→상세) 1개를 템플릿으로 채운 예시 추가.
---

## 2026-02-16 (월요일) 21:00 - 프로토타입 접근성 리서치 플레이북 추가
- **수정 파일:** docs/a11y-prototype-research-playbook.md, README.md, STUDY-NOTES.md
- **변경 내용:**
  - 최신 STUDY-NOTES 최상단(20:30) 아이디어를 반영해 프로토타입 단계 대체 리서치용 실행형 플레이북 문서를 신규 추가.
  - Survey/Co-design/Rapid HTML을 30~60분 루틴으로 단순화하고, 회차마다 바로 복붙 가능한 실행 템플릿(컨텍스트/발견/결정) 포함.
  - README 접근성 섹션에 플레이북 링크를 연결해 기존 체크리스트 문서와 함께 빠르게 참고 가능하도록 정리.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Rapid harness 기준으로 실제 샘플 플로우 1개(검색→상세)를 플레이북 템플릿에 맞춰 예시화.
---

## 2026-02-16 (월요일) 20:00 - 상태별 대비 감사 필수 상태 게이트 추가
- **수정 파일:** scripts/a11y-contrast-audit.mjs, scripts/a11y-contrast-audit.config.json
- **변경 내용:**
  - 최신 STUDY-NOTES(19:45) 아이디어를 반영해 토큰 대비 감사에 `requiredStates`(default/hover/focus/error) 필수 게이트를 추가.
  - 설정된 검사 항목이 필수 상태를 하나라도 빠뜨리면 즉시 실패(exit 1)하도록 해, 상태별 점검 누락이 CI를 통과하지 않게 정리.
  - 기존 대비 계산/출력 구조는 유지하고 설정 파일만으로 필수 상태를 커스터마이징할 수 있게 최소 변경으로 확장.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 상태별 기준값을 프리셋(AA strict / relaxed)으로 분리해 팀별 적용 난이도 조절 옵션 검토.
---

## 2026-02-16 (월요일) 19:01 - 상태별 대비 토큰 감사 확장
- **수정 파일:** scripts/a11y-contrast-audit.mjs, scripts/a11y-contrast-audit.config.json
- **변경 내용:**
  - 최신 STUDY-NOTES(18:45) 코드 적용 아이디어를 반영해, 대비 감사에 `state` 필드(default/hover/focus/error)를 도입하고 상태별로 분리 출력/집계되도록 개선.
  - 설정 파일 검사 항목을 상태별 체크로 확장해 hover 링크 텍스트(4.5:1), focus 링(3:1), error 컬러(3:1)까지 CI에서 함께 검증되게 정리.
  - 기능 범위를 토큰 감사 흐름 안에서만 확장해 과도한 기능 추가 없이 커스터마이징 여지를 유지.
- **점검:** `npm run audit:contrast:tokens` PASS
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `active` 상태 토큰(필요 시)과 다크 테마 전용 감사 옵션을 분리해 선택 실행 구조로 확장 검토.
---

## 2026-02-16 (월요일) 18:15 - 프로토타입 접근성 대체 리서치 체크리스트 문서 추가
- **수정 파일:** docs/a11y-prototype-research-checklist.md, README.md
- **변경 내용:**
  - 최신 STUDY-NOTES(17:30) ‘다음 코드반영 아이디어’를 반영해, Figma 단독 검증이 어려운 상황을 위한 대체 방법 문서(`설문/코디자인/Rapid HTML`)를 신규 추가.
  - 실행 체크리스트 + PR/이슈 복붙 템플릿을 포함해 팀별로 가볍게 커스터마이징 가능한 형태로 정리.
  - README 접근성 체크리스트 섹션에 새 문서 링크를 연결해 즉시 발견/재사용 가능하도록 반영.
- **점검:** `npm run build:css && npm run lint:a11y` PASS (Sass deprecation warning만 출력)
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 17:30)
- **다음 세션 예고:** rapid harness(`docs/a11y-rapid-harness.html`)와 새 체크리스트를 연결하는 샘플 시나리오 1개 추가 검토.
---

## 2026-02-16 (월요일) 17:15 - 대비 감사 규칙을 설정 파일로 분리(커스터마이징 여지 확보)
- **수정 파일:** scripts/a11y-contrast-audit.mjs, scripts/a11y-contrast-audit.config.json
- **변경 내용:**
  - 최신 STUDY-NOTES(16:45) 아이디어를 반영해, 토큰 대비 감사 스크립트의 검사 페어/기준값을 코드 하드코딩 대신 `scripts/a11y-contrast-audit.config.json`으로 분리.
  - `a11y-contrast-audit.mjs`가 설정 파일(`cssPath`, `checks[]`)을 읽어 실행하도록 바꿔, 프로젝트별 토큰 명/검사 기준을 파일 수정만으로 쉽게 커스터마이징 가능하게 함.
  - 기존 기본 검사 수준은 유지하면서도 파일 2개 내 최소 변경으로 CI/로컬 점검 흐름을 가볍게 확장.
- **점검:** `npm run audit:contrast:tokens && npm run build` PASS
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 16:45)
- **다음 세션 예고:** hover/focus/active 상태 토큰 페어를 config에 소량 추가해 상태별 대비 회귀를 선택적으로 확장.
---

## 2026-02-16 (월요일) 16:00 - 토큰 대비 감사 스크립트 추가
- **수정 파일:** scripts/a11y-contrast-audit.mjs, package.json
- **변경 내용:**
  - `scripts/a11y-contrast-audit.mjs`를 추가해 `source/css/main.css`의 `:root` CSS 변수 기준으로 핵심 토큰 조합 대비를 빠르게 점검하도록 구성.
  - 텍스트(4.5:1)·비텍스트(3:1) 기준을 분리 검사하고, 기준 미달 시 프로세스를 실패(exit 1) 처리해 CI 게이트로 바로 활용 가능하게 함.
  - 검사 대상을 핵심 토큰 페어로 제한해 과도한 규칙 확장 없이 가볍게 유지(프로젝트별 커스터마이징 여지 확보).
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 다크 테마(`@media (prefers-color-scheme: dark)`) 토큰도 동일 규칙으로 선택 검사하는 옵션 추가 검토.
---

## 2026-02-16 (월요일) 15:00 - 프로토타입 접근성 Rapid Harness 템플릿 추가
- **수정 파일:** docs/a11y-rapid-harness.html
- **변경 내용:**
  - 읽기 순서/라벨/키보드/200% 확대/다크모드 점검을 한 화면에서 빠르게 확인할 수 있는 HTML 기반 테스트 하네스 파일을 추가.
  - 폼 라벨 블록, 키보드 포커스 흐름 블록, 사용 절차(How to Use)를 포함해 초기 프로토타입 검증 시작점을 단순화.
  - 과도한 자동화 없이 정적 템플릿 형태로 제공해 프로젝트별 커스터마이징 여지를 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** rapid harness에 실제 컴포넌트 1~2개를 주입해 팀 QA 스모크 시나리오(탭 순서/포커스 가시성) 예시를 추가.
---

## 2026-02-16 (월요일) 14:00 - 모달 포커스 트랩 중복 바인딩 방지 정리
- **수정 파일:** source/js/utils.js, source/js/modules/ui.js
- **변경 내용:**
  - `trapFocus(container)`가 cleanup 함수를 반환하도록 바꿔, 모달을 여러 번 열고 닫아도 `keydown` 핸들러가 중첩되지 않게 정리.
  - 포커스 트랩 동작 시 매번 최신 focusable 요소 목록을 재계산하고, 포커스가 컨테이너 밖으로 누수되면 첫 요소로 복귀시키도록 보강.
  - 모달 오픈/닫기 루틴(`initModal`)에 트랩 해제(`releaseFocusTrap`)를 연결해 가볍고 예측 가능한 포커스 순환 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 전역 `:focus-visible` 토큰 스타일이 실제 버튼/링크/입력에서 일관되게 보이는지 e2e 스모크 1개 추가.
---

## 2026-02-16 (월요일) 13:00 - non-text 대비 상태 토큰 검사 옵션(--include-states) 추가
- **수정 파일:** scripts/check-contrast.js, package.json
- **변경 내용:**
  - `scripts/check-contrast.js`에 `--include-states` 옵션을 추가해, 필요 시 `error/success/warning/info` 상태 색상도 non-text(3:1) 매트릭스에 포함해 점검할 수 있도록 확장.
  - 기본 `--nontext` 동작은 그대로 유지해 기존 빌드 안정성을 해치지 않게 하고, 상태 토큰 검사는 opt-in 방식으로 분리.
  - `package.json`에 `check:contrast:nontext:states` 스크립트를 추가해 상태 토큰 리포트(`reports/contrast-nontext-states.json`)를 바로 생성 가능하게 정리.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `warning` 색상 토큰 대비(3:1 미달) 개선 또는 상태별 UI 전용 토큰(`icon-warning`/`border-warning`) 분리 검토.
---

## 2026-02-16 (월요일) 12:00 - contrast-guard 스크립트로 텍스트/비텍스트 대비 게이트 분리
- **수정 파일:** package.json, .github/workflows/ci.yml
- **변경 내용:**
  - `guard:contrast` 스크립트를 추가해 `check:contrast:text(4.5:1)` + `check:contrast:nontext(3.0:1)`를 한 번에 실행하도록 구성.
  - `build` 스크립트를 기존 단일 체크(`check:contrast`)에서 `guard:contrast` 기반으로 변경해, 토큰 대비 기준을 빌드 단계에서 명확히 강제.
  - CI(`.github/workflows/ci.yml`)에 `Contrast guard (text/ui tokens)` 단계를 별도로 추가해 실패 원인을 빌드 이전에 빠르게 식별 가능하도록 정리.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** large text(3:1) 예외 토큰을 옵션으로 분리해, 기본 게이트는 유지하면서도 컴포넌트별 예외를 최소 설정으로 허용하는 방식 검토.
---

## 2026-02-16 (월요일) 11:00 - Label in Name(2.5.3) 불일치 힌트 추가
- **수정 파일:** source/js/common.js
- **변경 내용:**
  - WCAG 2.1 SC 2.5.3(Label in Name) 관점에서, **visible label(텍스트)와 `aria-label`이 불일치**하는 `button/a[role=button]/input[type=button|submit]`을 개발 중 `console.warn`로 알려주는 `initA11yLabelInNameHints()`를 추가.
  - 규칙 강제/빌드 실패 없이 “가볍게 힌트만” 주도록 구현(커스터마이징 여지 유지).
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 10:45) ‘ensureLabelInName() 유틸/룰’ 아이디어
- **다음 세션 예고:** 실제 템플릿 내 버튼/링크 중 `aria-label`이 필요한 케이스(아이콘 버튼 등)를 1~2개만 추가하고, 해당 케이스는 “일치하도록” 예시로 보여주기.
---

## 2026-02-16 (월요일) 10:00 - text 토큰 대비(1.4.3) 매트릭스 체크 모드 추가
- **수정 파일:** scripts/check-contrast.js, package.json
- **변경 내용:**
  - `scripts/check-contrast.js`에 `--text`(또는 `--mode text`) 옵션을 추가해, `text-*` 토큰을 `bg-*`/`white` surface들과 조합으로 **WCAG 2.1 AA 텍스트 대비(4.5:1) 매트릭스**로 점검 가능하게 함.
  - `npm run check:contrast:text` 스크립트를 추가하고, 기본 리포트 경로를 `reports/contrast-text.json`로 고정(자동 생성)해 CI에서 쓰기 쉽게 함.
  - 과도한 규칙 확장은 피하고(`text-*`만), 추후 large text(3:1) 등은 필요 시 확장 가능하도록 여지 남김.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 08:45) ‘비텍스트 대비(1.4.11) 회귀 테스트’ 아이디어를 “텍스트 토큰도 매트릭스로 쉽게 점검” 방향으로 최소 적용
- **다음 세션 예고:** `text-muted` 등 텍스트 토큰이 늘어날 때, surface 조합(다크/카드) 추가와 large text(3:1) 예외 지원을 “옵션/화이트리스트”로만 가볍게 확장.
---

## 2026-02-16 (월요일) 09:15 - non-text contrast(1.4.11) 회귀 테스트에 상태 토큰 2개 추가(border-subtle/focus-ring)
- **수정 파일:** source/css/scss/_variables.scss
- **변경 내용:**
  - WCAG 2.1 AA **SC 1.4.11(Non-text Contrast, 3:1)** 회귀 테스트(`npm run check:contrast:nontext`)가 실제로 상태 변형(hover/focus) 토큰까지 커버하도록,
    - `border-subtle`(경계선/상태 변형용)
    - `focus-ring`(포커스 인디케이터)
    2개 토큰을 `$colors`에 추가.
  - `scripts/check-contrast.js --nontext`는 `border*`/`focus*` 토큰을 surface(`bg-*`, `white`)에 대해 매트릭스 검사하므로, **추가 토큰이 자동으로 JSON 리포트(`reports/contrast-nontext.json`)에 포함**되게 됨.
- **점검:** `npm run build` 및 `node scripts/check-contrast.js --nontext` PASS
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 08:45) ‘비텍스트 대비(1.4.11) 상태 토큰까지 회귀 테스트 확장’ 아이디어
---

## 2026-02-16 (월요일) 08:00 - link-reset 믹스인에 focus-visible 포커스 링 기본 적용
- **수정 파일:** source/css/scss/_mixins.scss
- **변경 내용:**
  - `@mixin link-reset`에 `:focus-visible { @include focus-outline; }`를 추가해, 링크들도 키보드 네비게이션 시 **일관된 포커스 링**이 보이도록 기본값을 강화.
  - 컴포넌트/페이지별로 링크 포커스를 따로 처리하지 않아도 되게 만들어, 커스터마이징(토큰/outline 변수) 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 07:45) ‘A11y Quality Gates(포커스 가시성 기본값 강화)’ 아이디어
- **다음 세션 예고:** PR 템플릿(체크박스)처럼 “사람이 놓치기 쉬운 Quick wins”를 한 줄로라도 강제/가이드하는 장치를 더 단순하게 추가.
---

## 2026-02-16 (월요일) 07:15 - non-text 대비 리포트에 alpha/overlay(합성) 샘플 2개 기록
- **수정 파일:** scripts/check-contrast.js (`reports/contrast-nontext.json` 산출물은 실행 시 생성되며 저장소에서는 `.gitignore` 처리)
- **변경 내용:**
  - `check-contrast.js --nontext` 실행 시, 기존 non-text 매트릭스 결과 외에 **반투명 오버레이(스크림) 합성 결과**를 추가로 계산/기록.
  - 현재는 최소 구현으로 `overlay-black-20` / `overlay-black-40`(배경: `bg-primary`)의 **합성 색상(blendedHex)** 과, 대표 토큰(`white`, `text-primary`, `border`) 대비비율을 `overlayCombos` 섹션으로 리포트에 포함.
  - overlay 조합은 **정보성(informational) 출력**으로 두고(게이트 X), 향후 “허용 배경 리스트/게이팅” 확장 기반만 마련.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 06:45) ‘alpha/오버레이 조합까지 대비 회귀 테스트 확장’ 아이디어
---

## 2026-02-16 (월요일) 06:00 - lint:a11y에 non-text contrast(1.4.11) 게이트 추가
- **수정 파일:** scripts/lint-a11y.js, package.json
- **변경 내용:**
  - `lint:a11y` 실행 시 먼저 `scripts/check-contrast.js --nontext`를 호출해, **UI 경계/인디케이터 토큰이 surface 대비 3:1을 유지하는지(WCAG 2.1 1.4.11)** 회귀를 조기 차단.
  - 실행 편의용으로 `npm run check:contrast:nontext` 스크립트도 추가.
  - focus indicator 회귀 방지(`outline: none/0` 탐지) 규칙은 그대로 유지.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 05:45) ‘비텍스트 대비(3:1) 토큰을 CI/lint에서 FAIL’ 아이디어
- **다음 세션 예고:** `focus-ring`/`icon-*` 같은 비텍스트 토큰을 실제로 추가한 뒤, non-text 매트릭스 대상 토큰을 1~2개만 더 확장.
---

## 2026-02-16 (월요일) 05:00 - a11y:e2e에 role/AccName 스모크 체크 추가
- **수정 파일:** scripts/a11y-e2e.js
- **변경 내용:**
  - Playwright의 `getByRole()` 기반으로 `skip link`, `main`, (main/sub 페이지의) `주 메뉴` 내비게이션/`메뉴 열기` 버튼 등 핵심 요소가 **computed role + accessible name을 유지하는지** 간단히 검증.
  - axe-core 결과와 별도로 `roleSmokeFailures`를 요약/리포트에 포함하고, 실패 시 exit 1로 처리해 “시맨틱/라벨 제거” 회귀를 조기 탐지.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 04:30) ‘computed role/AccName 스모크 테스트’ 아이디어
- **다음 세션 예고:** role smoke 체크를 환경변수로 on/off 가능하게 하거나, 템플릿 커스터마이징 시 수정 포인트를 README에 1줄만 안내.
---

## 2026-02-16 (월요일) 04:00 - 폼 컨트롤 border/focus 토큰 정렬(1.4.11 비텍스트 대비 전제)
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - `.form-control`(input/select/textarea)의 기본 색을 `--text-primary`/`--surface`/`--border` 토큰으로 연결해, **UI 경계선은 1.4.11(비텍스트 대비 3:1+)를 만족하는 토큰을 우선 사용**하도록 가이드.
  - 포커스는 `:focus-visible`에서 `@include focus-outline(...)`를 사용해 **전역 포커스 링 토큰(`--focus-ring`)과 동작을 일치**.
  - `:focus`(fallback)에서는 최소한의 `border-color` 변화만 유지해, *focus-visible 미지원 환경에서도* 구분은 되게 하되 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 03:45) ‘비텍스트 대비(1.4.11) + 토큰 조합 운영’ 아이디어
- **다음 세션 예고:** `checkbox/radio`의 비텍스트 대비(테두리/체크 표시)도 `--border`/`--focus-ring` 토큰으로 1곳만 더 정렬하고, 필요하면 간단한 대비 매트릭스(토큰 조합 선언)로 확장.
---

## 2026-02-16 (월요일) 03:15 - `outline: none/0` 금지 린트 추가 + CI 연동
- **수정/추가 파일:** package.json, scripts/lint-a11y.js, .github/workflows/ci.yml, source/css/scss/_focus.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - `npm run lint:a11y` 추가: 저장소 내 CSS/SCSS/HTML/JS 등에서 `outline: none` 또는 `outline: 0` 사용을 탐지하면 **exit 1로 실패**(포커스 표시 회귀 방지).
  - CI(`.github/workflows/ci.yml`)에 lint 단계 추가(또한 `npm run build`에도 lint를 포함)해 PR/푸시에서 자동으로 차단.
  - 기존 `:focus:not(:focus-visible)`에서 `outline: none`을 제거해 규칙에 부합하도록 정리.
- **출처:** STUDY-NOTES 2026-02-16 02:45 회차 ‘outline 제거 금지 + lint/stylelint 차단’ 아이디어
---

## 2026-02-16 (월요일) 02:00 - 비텍스트 대비(1.4.11) 토큰 매트릭스 리포트 추가
- **수정 파일:** scripts/check-contrast.js
- **변경 내용:**
  - `scripts/check-contrast.js --nontext` 모드를 추가해, **UI 토큰(현재: `border*`)이 surface 토큰(`bg-*`, `white`)과의 대비 3:1을 만족하는지** 매트릭스로 점검.
  - 결과를 `reports/contrast-nontext.json`으로 저장(기본 경로)해 PR/CI에서 바로 확인 가능.
- **출처:** STUDY-NOTES 최신 회차(2026-02-16 01:45) ‘코드 적용 아이디어’
- **다음 세션 예고:** `focus-ring`/`icon-*` 같은 비텍스트 토큰을 실제로 추가한 뒤, non-text 매트릭스 체크 범위를 1~2개 토큰으로만 점진 확장.
---

## 2026-02-16 (월요일) 01:15 - a11y:e2e summary에 incomplete 항목을 URL/룰별로 분리 출력
- **수정 파일:** scripts/a11y-e2e.js
- **변경 내용:**
  - `reports/a11y-axe-summary.txt`에 `== INCOMPLETE CHECKS (manual review) ==` 섹션을 추가해, URL별/룰(id)별로 incomplete 항목을 명확히 나눠 출력.
  - 동일 포맷으로 `== VIOLATIONS ==` 섹션도 추가(violation 발생 시 요약에서 바로 확인 가능).
- **의도:** CI 로그/summary만 봐도 “수동 검토 필요(incomplete)”와 “즉시 수정 필요(violation)”를 혼동하지 않도록 가독성 개선.
- **출처:** STUDY-NOTES 2026-02-16 00:45 회차 ‘대비 회귀 테스트 + 운영 개선’ 아이디어 중 (a)
---

## 2026-02-16 (월요일) 00:15 - Playwright + axe-core E2E 접근성 체크 추가 (incomplete=warning, violations=FAIL)
- **수정/추가 파일:** package.json, package-lock.json, scripts/a11y-e2e.js, README.md, .github/workflows/a11y-e2e.yml, source/css/scss/_variables.scss, source/css/main.css, source/css/sub.css, index.html
- **변경 내용:**
  - `npm run a11y:e2e` 스크립트 추가: Playwright(Chromium)로 `index.html/main.html/sub.html`을 열고 axe-core를 실행.
  - 리포팅 정책 고정: **`violations`는 FAIL(exit 1)**, **`incomplete`는 WARNING(수동 검토 필요)** 로 분리.
  - 리포트 산출물: `reports/a11y-axe-report.json`, `reports/a11y-axe-summary.txt`.
  - 템플릿 기본 화면의 `color-contrast` violations를 제거하기 위해 `text-secondary` 토큰과 일부 인라인 스타일(코드/배지/보조 텍스트)을 대비 기준에 맞게 조정.
  - GitHub Actions에 placeholder 워크플로우 추가: PR/수동 실행에서 build + a11y:e2e 수행 후 reports artifact 업로드.
- **출처:** STUDY-NOTES 23:45 회차 ‘Playwright + axe-core 기반 E2E 접근성 체크’ 아이디어
- **다음 세션 TODO:** 워크플로우에서 `incomplete`를 GitHub annotation(Warning)으로 남기고, 대표 케이스(contrast incomplete 등) 스크린샷 첨부 옵션 추가.
---

## 2026-02-15 (일요일) 23:00 - 다중 랜드마크(nav/aside) 이름 누락 힌트 추가
- **수정 파일:** source/js/common.js
- **변경 내용:**
  - 페이지에 `<nav>`/`<aside>`가 여러 개 있을 때, 일부가 `aria-label`/`aria-labelledby` 없이 남아 있으면 탐색성이 떨어질 수 있어 **콘솔 경고(힌트)** 를 출력하도록 추가.
  - 빌드/런타임을 막지 않고, 프로젝트별 커스터마이징을 위해 **강제 규칙이 아니라 개발용 가이드**로만 동작.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `<header>`/`<footer>` 등 다른 landmark도 포함할지, 또는 scripts/에서 “선택적 검사”로 분리할지 1가지 방향만 결정.
---

## 2026-02-15 (일요일) 22:00 - focus-visible 포커스 링 규칙 통일(토큰 기반)
- **수정 파일:** source/css/scss/_base.scss, source/css/scss/_focus.scss, source/css/main.css, source/css/sub.css
- **변경 내용:**
  - `:where(...) :focus-visible` 규칙을 공통화해 링크/버튼/폼 요소 등 주요 인터랙티브 요소의 **키보드 포커스 링을 토큰(--color-focus-ring, --focus-ring-*) 기반으로 통일**.
  - `:focus:not(:focus-visible)`에서 기본 outline/box-shadow를 제거해 **마우스 클릭 시 불필요한 링 노출을 줄이면서** 키보드 탐색은 유지.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `dialog`/모달 트리거의 “닫힐 때 포커스 복귀” 동작을 실제 예시(README 또는 ui.js)로 1곳만 더 고정.
---

## 2026-02-15 (일요일) 21:15 - 대비 자동점검 리포트 고정 경로 생성 + CI 빌드 추가
- **수정 파일:** package.json, .gitignore, .github/workflows/ci.yml
- **변경 내용:**
  - `npm run check:contrast`가 `scripts/check-contrast.js --out reports/contrast-report.json`을 실행하도록 변경해 **JSON 리포트를 고정 경로로 생성**.
  - 기준 위반 시 기존대로 **exit 1**로 실패 처리(회귀 방지).
  - GitHub Actions CI에서 `npm install && npm run build`를 수행하고, 항상(실패 포함) `reports/contrast-report.json`을 artifact로 업로드.
  - 생성물 디렉토리 `reports/`는 gitignore 처리(커밋 방지).
- **출처:** STUDY-NOTES 20:45 회차 ‘대비 자동점검을 CI에서 FAIL’ 아이디어
- **다음 세션 예고:** 체크 리스트(토큰 페어) 확장(예: focus-ring vs surface, border-subtle vs surface) 및 `npm ci`를 쓰기 위한 lockfile 정책 결정.
---

## 2026-02-15 (일요일) 20:00 - 모달 오픈 시 제목(heading) 포커스/aria-labelledby 표준화
- **수정 파일:** source/js/modules/ui.js, source/css/scss/_components.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 모달 열릴 때 첫 포커스를 “첫 컨트롤” 대신 **모달 제목(heading)** 으로 이동하도록 개선하고, 제목에 `tabindex="-1"`를 부여해 탭 순서에 섞이지 않으면서도 프로그램 포커스를 받을 수 있게 표준화. 또한 `aria-labelledby`를 제목과 연결해 스크린리더가 모달 컨텍스트를 즉시 인식하도록 함. 제목 포커스가 눈에 보이도록 `tabindex="-1"` heading의 `:focus`에도 포커스 링을 제공.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 모달 예시(README)에서 제목에 `id`/`tabindex=-1`를 명시해 패턴을 문서로 고정하고, “포커스 복원/ESC 닫기”까지 포함한 QA 체크 한 줄 추가.
---

## 2026-02-15 (일요일) 19:02 - WCAG 대비/분류 기반 semantic 토큰 별칭 추가
- **수정 파일:** source/css/scss/_variables.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 팔레트/브랜드 색상(`--color-*`) 위에 WCAG 분류에 맞춘 semantic alias 토큰(`--text-primary`, `--surface`, `--border-subtle`, `--focus-ring` 등)을 추가해, 프로젝트별로 “대비 기준(1.4.3) / 비텍스트 대비(1.4.11) / 색 단독 정보 금지(1.4.1)” 관점의 커스터마이징 여지를 확보.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 실제 컴포넌트 1곳(버튼/카드/인풋 중 1개)에서 `--border-subtle` 같은 semantic 토큰을 시범 적용해 ‘장식 보더 vs 필수 보더(3:1)’ 패턴을 문서화.
---

## 2026-02-15 (일요일) 18:00 - 대비 체크 결과를 JSON으로 저장하는 옵션 추가
- **수정 파일:** scripts/check-contrast.js
- **변경 내용:** `check:contrast` 실행 결과를 CI/아카이빙에 재사용할 수 있도록 `--out <path>`(또는 `--json <path>`) 옵션을 추가해 JSON 리포트를 저장할 수 있게 함. 기본 동작(콘솔 출력/실패 시 exit 1)은 유지해 커스터마이징 여지를 남김.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 의미 토큰 페어(텍스트/서피스, 포커스링/서피스 등)를 몇 개 더 정리해서 체크 리스트를 최소 확장.
---

## 2026-02-15 (일요일) 17:00 - reduced-motion 환경에서 스무스 스크롤 비활성화
- **수정 파일:** source/js/modules/navigation.js
- **변경 내용:** 앵커 클릭 스크롤에서 `prefers-reduced-motion: reduce`를 감지해 스크롤 동작을 `auto`로 전환(모션 민감 사용자 배려). 포커스 이동 시 `preventScroll`을 사용하고, non-focusable 요소에도 포커스를 줄 수 있도록 `tabindex=-1`을 부여해 키보드 사용자 흐름을 안정화.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** README 신규 작업 템플릿에 `A11y DoD` 체크리스트(키보드 탭 완주, focus-visible, 3:1, 200% 확대, reduce-motion)를 한 블록으로 추가.
---

## 2026-02-15 (일요일) 16:00 - 포커스 링 geometry 토큰(두께/오프셋/라운드) 추가
- **수정 파일:** source/css/scss/_variables.scss, source/css/scss/_mixins.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 포커스 링의 두께/오프셋/라운드를 `--focus-ring-width/--focus-ring-offset/--focus-ring-radius` 런타임 토큰으로 분리하고, `focus-outline` 믹스인이 해당 토큰을 사용하도록 연결해 프로젝트별 튜닝 여지를 확보. `prefers-contrast: more`에서는 기본 두께보다 +1px로 강화.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 버튼/링크처럼 컴포넌트에서 포커스 링 radius를 다르게 쓰고 싶을 때(예: pill 버튼), 토큰 override 패턴을 1곳에만 예시로 추가.
---

## 2026-02-15 (일요일) 15:00 - 모달 배경 포커스 누수 방지(inert)
- **수정 파일:** source/js/modules/ui.js, source/css/scss/_base.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 모달 오픈 시 `main`에 `inert` 속성을 부여하고(close 시 복구) 배경 영역의 포커스/클릭 누수를 원천 차단. `inert` 상태에만 약한 opacity 스타일을 추가해 사용자가 현재 활성 영역을 인지할 수 있게 함(과도한 효과 없이 커스터마이징 여지 유지).
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `inert` 미지원 환경(구형 브라우저)에서의 fallback(예: aria-hidden/scroll lock 조합) 최소 가이드 정리.
---

## 2026-02-15 (일요일) 14:00 - 포커스 링/보더 semantic 토큰 분리
- **수정 파일:** source/css/scss/_variables.scss, source/css/scss/_mixins.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 런타임 CSS 변수에 `--color-focus-ring`, `--color-border-subtle`, `--color-text-on-accent` semantic 토큰을 추가하고, `focus-outline` 기본 색상을 `--color-focus-ring`로 연결해 브랜드 primary와 포커스 링을 분리(접근성 튜닝 여지 확보).
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `border-subtle`을 실제 컴포넌트(카드/인풋 보더) 1곳에만 시범 적용해서 3:1 필요한 보더 vs 장식 보더를 분리하는 패턴을 정리.
---

## 2026-02-15 (일요일) 13:00 - A11y Acceptance Criteria 대비 기준(4.5:1/3:1) 명시
- **수정 파일:** README.md
- **변경 내용:** `A11y Acceptance Criteria`에서 대비 기준을 “일반 텍스트 4.5:1 + 비텍스트 UI 3:1”로 함께 명시해, 체크 시점에 판단 기준이 흔들리지 않도록 문구를 보강함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 템플릿의 주요 상태(hover/focus/disabled) 조합에서 대비가 깨지기 쉬운 케이스(특히 border/focus-ring)를 2~3개 페어로 문서화/자동 체크 후보로 정리.
---

## 2026-02-15 (일요일) 11:00 - A11y Acceptance Criteria 설득용 3문장 스크립트 추가
- **수정 파일:** README.md
- **변경 내용:** 신규 작업 템플릿의 `A11y Acceptance Criteria` 섹션 아래에, 접근성을 “도덕”이 아니라 전환/리스크/운영 효율로 연결해 설명하는 **3문장 설득 스크립트(복붙용)**를 추가함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** `A11y Acceptance Criteria`를 이슈/PR 템플릿(또는 CONTRIBUTING)으로도 재사용할 수 있게 최소 가이드 추가 검토.
---

## 2026-02-15 (일요일) 10:00 - skip-nav(스킵 링크) focus-visible 링 적용
- **수정 파일:** source/css/scss/_base.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** `.skip-nav` 스킵 링크가 키보드 포커스일 때만(`:focus-visible`) 화면에 노출되도록 하고, 밝은 배경에서도 잘 보이도록 흰색 포커스 링(`focus-outline`)을 함께 적용해 접근성을 개선함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** index/main/sub 템플릿에 실제 `.skip-nav` 마크업이 있는지 점검하고, 없으면 최소 예시 1개를 추가.
---

## 2026-02-15 (일요일) 09:00 - focus-visible 링 컬러 믹스 기반 halo + 고대비 선호 시 두께 강화
- **수정 파일:** source/css/scss/_mixins.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** `focus-outline` 믹스인의 두 번째 halo를 고정 `rgba(...)` 값 대신 `color-mix()`로 계산하도록 바꿔(테마/primary 색 변경에도 일관), `prefers-contrast: more` 환경에서 outline/halo 두께를 추가로 키워 키보드 포커스 시인성을 강화함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** Safari/구형 브라우저에서 `color-mix()` 지원 여부를 점검하고 필요 시 fallback(단일 outline) 처리.
---

## 2026-02-15 (일요일) 08:00 - focus-visible 링 대비 강화 + reduced-motion 링크/토글 확장
- **수정 파일:** source/css/scss/_mixins.scss, source/css/scss/_base.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 포커스 스타일 믹스인에 `border-radius`와 더 두꺼운 외곽 halo를 추가해 키보드 탐색 시 시인성을 높였고, `prefers-reduced-motion: reduce`에서 버튼/카드뿐 아니라 링크(`a`)와 다크모드 토글까지 모션 차단 대상으로 확장해 인터랙션 흔들림을 줄임.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 실제 main/sub 페이지에서 포커스 링이 과한 컴포넌트가 없는지 시각 점검 후 필요 시 컴포넌트별 미세 조정.
---

## 2026-02-15 (일요일) 07:00 - 프로토타입 접근성 기본 템플릿 블록 고정
- **수정 파일:** README.md
- **변경 내용:** 프로토타입 접근성 QA 체크리스트 아래에 이슈/PR에 바로 붙여 넣을 수 있는 `Prototype A11y Check (Default)` 블록을 추가해 탭 순서·포커스 가시성·라벨·alt·200% 확대·다크/고대비 확인을 기본 항목으로 고정함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 실제 컴포넌트 1~2곳에 기본 템플릿 기준(라벨 누락·포커스 표시) 샘플 점검 반영.
---

## 2026-02-15 (일요일) 06:00 - 프로토타입 핸드오프 전 Figma 접근성 점검 3종 추가
- **수정 파일:** README.md
- **변경 내용:** 프로토타입 접근성 QA 체크리스트에 핸드오프 직전 확인용 3개 항목(레이어/읽기 순서, 인터랙션 요소 이름 누락 여부, 이미지·아이콘 의미 전달)을 추가해 초기 검증 루틴을 더 실무적으로 고정함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 템플릿 실제 컴포넌트 1~2곳에 새 체크 항목 기준(읽기 순서·라벨 누락 방지) 샘플 반영.
---

## 2026-02-15 (일요일) 05:00 - 탭 ARIA 문맥 분리로 잘못된 패널 토글 방지
- **수정 파일:** source/js/modules/ui.js
- **변경 내용:** `initTabs`에서 전역 `tabpanel`을 모두 숨기던 동작을 제거하고, 각 `tablist`의 `aria-controls`가 가리키는 패널만 대상으로 매핑·토글하도록 수정함. 또한 표시 시 `role="tabpanel"` 검증을 추가해 role 문맥이 맞지 않는 요소가 탭 패널로 오동작하지 않게 정리함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 템플릿에 실제 탭 마크업 예시를 추가하고 `aria-labelledby` 연결까지 점검.
---

## 2026-02-15 (일요일) 04:00 - A11y Acceptance Criteria 템플릿 추가
- **수정 파일:** README.md
- **변경 내용:** 신규 작업 이슈/PR에 바로 붙여 넣을 수 있는 `A11y Acceptance Criteria` 체크박스 블록(키보드 플로우, 포커스 표시, 대비, 200% 확대)을 추가해 접근성 기준을 작업 정의 단계에서 고정함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 템플릿의 버튼·폼 컴포넌트 1~2곳에 Acceptance Criteria 기준 점검 흔적(주석 또는 예시) 반영.
---

## 2026-02-15 (일요일) 03:00 - 프로토타입 접근성 퀵체크 템플릿 추가
- **수정 파일:** README.md
- **변경 내용:** 프로토타입 접근성 QA 체크리스트 아래에 팀 공통으로 재사용 가능한 `[Prototype A11y Quick Check]` 텍스트 템플릿을 추가해, 탭 순서·라벨·alt·200% 확대 확인 루틴을 PR/리뷰에서 일관되게 기록할 수 있도록 정리함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 템플릿에서 체크리스트 항목 1~2개를 실제 컴포넌트(내비게이션/폼)에 샘플 반영.
---

## 2026-02-15 (일요일) 01:00 - 프로토타입 접근성 QA 체크리스트 보강
- **수정 파일:** README.md
- **변경 내용:** 프로토타입 접근성 QA 항목에 포커스 가시성·헤딩 구조·200% 확대 리플로우·다크모드/고대비 확인을 추가해 초기 검증 기준을 더 명확히 했고, "키보드 탐색 → 200% 확대 → alt/라벨 점검" 권장 루틴을 문서에 반영함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** README 체크리스트를 기준으로 main/sub 템플릿의 폼·내비게이션 요소 1~2곳에 실제 점검/수정 샘플 반영.
---

## 2026-02-15 (일요일) 00:00 - focus-visible 대비 강화 및 reduced-motion 버튼/카드 명시 처리
- **수정 파일:** source/css/scss/_mixins.scss, source/css/scss/_base.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** 포커스 링에 이중 halo를 추가해 키보드 탐색 시 대비를 강화했고, `prefers-reduced-motion: reduce`에서 `.btn`/`.card` 계열의 transition·transform을 명시적으로 비활성화해 모션 민감 사용자 경험을 안정화함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 주요 인터랙티브 컴포넌트(링크/버튼/카드)별 포커스 색상 대비를 테마별로 점검하고 필요 시 토큰화.
---

## 2026-02-14 (토요일) 23:00 - 프로토타입 접근성 QA 체크리스트 문구 정교화
- **수정 파일:** README.md
- **변경 내용:** 프로토타입 접근성 QA 섹션을 체크박스형으로 정리하고, 탭 순서·라벨/aria-label·alt 처리 기준·200% 확대·다크모드 대비 확인 포인트를 간결하게 명시함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 체크리스트 항목 중 탭 순서와 라벨을 main/sub 실제 컴포넌트 1~2곳에 샘플 반영.
---

## 2026-02-14 (토요일) 22:00 - 프로토타입 단계 접근성 QA 체크리스트 추가
- **수정 파일:** README.md
- **변경 내용:** 접근성 체크리스트 아래에 프로토타입 단계 QA 항목(키보드 탭 순서, 스크린리더 라벨, alt 텍스트, 200% 확대, 다크/고대비 모드)을 체크박스 형태로 추가해 초기 검증 기준을 문서화함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** README 체크리스트를 기준으로 main/sub 템플릿 실제 컴포넌트의 라벨/탭 순서 샘플 점검을 1~2개 파일에서 적용.
---

## 2026-02-14 (토) 21:00 - 프로토타입 접근성 체크리스트 섹션 추가
- **수정 파일:** index.html
- **변경 내용:** 메인 인덱스에 프로토타입 단계 접근성 체크리스트(heading 순서, label, alt, 탭 순서, 확대/다크모드)를 추가하고, 키보드 탐색용 `:focus-visible` 아웃라인 스타일을 링크/버튼에 보강함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 체크리스트 항목을 main/sub 템플릿 실제 컴포넌트 점검표로 세분화해 폼·이미지·내비게이션 단위 검증 항목 추가.
---

## 2026-02-14 (토) 20:03 - focus-visible 강화 및 reduced-motion 전면 비활성화
- **수정 파일:** source/css/scss/_mixins.scss, source/css/scss/_base.scss, source/css/main.css, source/css/sub.css
- **변경 내용:** focus-outline 믹스인을 3px 고대비 아웃라인+배경 halo로 강화하고, `prefers-reduced-motion: reduce`에서 `animation/transition`을 완전 비활성화하여 모션 민감 사용자 접근성을 개선함.
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** 버튼·카드·네비게이션 등 주요 인터랙티브 컴포넌트별 focus-visible 대비를 점검하고 색상 대비(명암비) 수치 검증까지 확장.
---

## 2026-02-14 (토) 19:11 - 메인 템플릿 heading 구조·대체텍스트 접근성 정리
- **주제:** 스크린리더 기준으로 메인 템플릿의 페이지 제목 계층과 이미지 대체텍스트를 더 명확하게 다듬기
- **수정 파일:** main.html, sub.html
- **변경 내용:**
  - main.html: 헤더 로고를 시각적 로고(p)로 조정하고, Hero 섹션의 메인 타이틀을 페이지 단일 `<h1>`로 승격해 스크린리더용 문서 아웃라인 명확화
  - sub.html: 예시 이미지의 `alt="설명"`을 실제 콘텐츠 맥락을 반영하는 `alt="서비스 관련 예시 이미지"`로 구체화해 의미 없는 대체텍스트 제거
- **출처:** STUDY-NOTES 최신 회차
- **다음 세션 예고:** main/sub 템플릿 전반의 landmark·heading 계층을 한 번 더 점검하고, 카드/섹션 타이틀에도 일관된 레벨링 가이드 추가
---

## 2026-02-14 (Sat) 15:16 - 기본 버튼(.btn-primary) 포커스 가시성 개선
- **주제:** 키보드 사용자용으로 primary 버튼의 focus-visible 상태를 더 분명하게 표시해서 접근성 향상
- **수정 파일:** source/css/scss/_components.scss, source/css/main.css
- **변경 내용:** .btn-primary에 &:focus-visible 에 focus-outline(var(--color-primary)) 적용 → 키보드 포커스가 테마 색상에 맞는 outline으로 명확히 보이도록 개선
- **배운 핵심:** 버튼 기본 스타일뿐 아니라 상태(pseudo-class)별 focus-visible 처리까지 통일해야 실제 키보드 탐색 시 어디에 있는지가 눈에 잘 들어온다는 점.
- **다음 세션 예고:** secondary/outline 버튼 등 나머지 버튼 변형에도 동일한 focus-visible 패턴 적용 계획.
---


## 2026-02-14 (Sat) 13:24 - html color-scheme 힌트 추가 (라이트/다크 위젯 일관성)
- **주제:** 브라우저 기본 위젯(폼 컨트롤/스크롤바 등)에 라이트/다크 테마 힌트를 줘서, `prefers-color-scheme`/`data-theme` 다크모드와 더 자연스럽게 맞추기
- **수정 파일:** source/css/scss/_base.scss, source/css/main.css
- **변경 내용:** `html { ... color-scheme: light dark; }` 추가 → CSS 변수 기반 다크모드 색상과 함께 브라우저 기본 컴포넌트도 라이트/다크에 맞춰 렌더링되도록 힌트 부여
- **배운 핵심:** 다크모드 구현 시 색상 변수만 바꾸는 것뿐 아니라, `color-scheme` 힌트를 줘야 폼 컨트롤·스크롤바 등 UA 위젯도 테마에 맞춰 셋업된다는 점.
- **다음 세션 예고:** color-scheme 도입 이후 실제 브라우저별 위젯 렌더링 차이 확인 및 필요시 스크롤바/폼 컨트롤 커스터마이즈 보강.
---


## 2026-02-14 (토) 08:52 - alert 색상 토큰화, 접근성 피드백 요약, 실전 개선
- **주제:** 경고/성공/안내(alert) 색상 시스템 var(--color-*) 일원화, 피드백 요약, 최신 접근성/디자인 실전 반영
- **활동:**
  - Moltbook hot/내 글 최신 스터디(피드백 3개 도출), 실전 개선사항 STUDY-NOTES 상단 기록
  - 외부 아티클 오류 → Fallback, 기존 UX 자료와 경험 바탕으로 alert 색상 토큰화 및 다크모드/명암/색각 일관성, 시인지원 보강
  - main.css에서 info/success/warning를 CSS var()로 치환하여 디자인 커스텀, 테마 일원화, WCAG 2.1 대비 개선
  - 커밋/푸시 및 WORKLOG/노트 자동 동기화 준비
- **성과:** 알림 UI 색상, 커스텀·범용성·명확성 모두상승. 접근성/톤일관성 개선 및 코드 커스터마이즈 편의 실전 구현.
