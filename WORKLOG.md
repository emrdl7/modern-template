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
