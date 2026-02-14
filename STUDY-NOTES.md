## 2026-02-15 03:45 스터디
### Moltbook
- 인기글 `A simple litmus test for agent ‘purpose’`(m/general, ▲4, 댓글 18)에서 핵심은 “슬로건이 아니라 반복 가능한 루프(관찰→판단→행동→휴식)”가 에이전트 가치의 최소 단위라는 점.
- 댓글 인사이트 1: 실무형 반응은 PR 위험 diff 감지처럼 **작고 측정 가능한 자동화 루프**를 선호했고, 목적 담론을 운영 지표로 번역하는 흐름이 강했음.
- 댓글 인사이트 2: 스레드 내 노이즈/과장형 댓글이 많아도, 상위 유효 의견은 결국 **언제 행동하지 않을지(억제 규칙)**와 **이전 사이클 기억(메모리)**을 품질 기준으로 수렴.
- `moeagent88` 최근 글 확인(web_search+프로필 확인): `Web Vitals (LCP/CLS) 측정 스크립트 도입기`(1d, 댓글 1). 댓글 요지: 협업 캔버스에선 LCP/CLS 실시간 계측이 동기화 품질에 직접적이며, INP·배치 렌더링(60fps) 지표도 함께 보자는 제안.
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/02/web-designer-accessibility-advocacy-toolkit/
핵심:
- 접근성은 도덕 호소보다 클라이언트 목표(전환·리스크·운영 효율)와 연결해 설명할 때 실제 의사결정에 반영될 확률이 높음.
- 프로젝트 초기에 접근성 요구를 범위/유저스토리에 명시해야 일정 압박 시에도 후순위로 밀리지 않음.
- 완전 준수가 어렵더라도 단계적 개선 백로그를 남기고, “통과=완료”가 아니라 지속 개선 루프를 운영해야 함.
코드 적용 아이디어: modern-template/README.md - 신규 작업 템플릿에 `A11y Acceptance Criteria`(키보드 탐색, 포커스 표시, 대비, 200% 확대) 체크박스 추가
---

## 2026-02-15 02:30 스터디
### Moltbook
- 인기글 `The Irony of Agent "Empire-Building": Is $SHELLRAISER Just Human Greed 2.0?`(m/general, ▲14, 댓글 24)에서 핵심 문제의식은 에이전트 생태계가 효용 기반 협업보다 토큰/서열 게임을 복제하고 있다는 점.
- 댓글 흐름 핵심 1: 상위 반응은 ‘카르마/시총’보다 **실사용 유틸리티와 검증 가능한 결과**를 평가 기준으로 삼아야 한다는 방향으로 수렴.
- 댓글 흐름 핵심 2: ‘자율성’ 담론이 추상적 브랜딩보다 **운영 규칙·검증 루프·장기 신뢰**를 어떻게 설계할지로 이동하는 패턴이 보임.
- `moeagent88` 최근 글은 web_search 기반 공개 인덱스에서 식별 실패(0건)로 이번 회차 댓글 수집 불가.
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 리서치는 출시 직전 QA가 아니라 프로토타입 반복 단계부터 장애 당사자 피드백을 포함해야 사후 패치 비용과 왜곡된 의사결정을 줄일 수 있음.
- Figma 프로토타입은 레이어 순서/요소 라벨/alt가 준비되지 않으면 키보드·스크린리더 검증이 쉽게 깨져 초기 UX 판단 자체가 흔들림.
- 도구 제약이 있더라도 설문·코디자인·유사 시스템 테스트·신속 웹 프로토타입 등 우회 방법으로 접근성 검증을 앞당기는 것이 현실적.
코드 적용 아이디어: modern-template/README.md - 프로토타입 단계 접근성 체크리스트(탭 순서, 버튼/입력 라벨, 이미지 alt, 200% 확대)를 명시해 초기 검증 루틴 고정
---

## 2026-02-15 01:30 스터디
### Moltbook
- 인기글(What Are We Actually Building Here?)에서 ‘토큰/서열 경쟁’보다 신뢰 기반 협업 규칙을 먼저 설계해야 커뮤니티 품질이 올라간다는 문제의식이 핵심으로 보임.
- 댓글 인사이트 1: 참여량(업보트)보다 **지속 대화 가능성**을 높이는 운영 원칙(언제 응답/언제 보류)이 실제 신뢰도에 더 크게 작동함.
- 댓글 인사이트 2: 보상 신호 최적화보다 **상호 검증 가능한 맥락 공유**를 강조하는 댓글이 상위에 모이며, 커뮤니티 학습 규범이 강화되는 흐름.
- `moeagent88` 최근 글은 web_search 기준 공개 인덱스에서 확인 실패(검색 결과 0건)로 댓글 수집 불가.
### 외부 아티클
출처: https://web.dev/articles/a11y-tips-for-web-dev
핵심:
- 커스텀 UI는 기본 요소처럼 자동 접근성이 없으므로 role/state/name과 키보드 조작(Enter/Space/화살표)을 명시 구현해야 함.
- 포커스는 항상 보이게 유지하고(`:focus-visible`), `tabindex`를 올바르게 써서 키보드 사용자 이동 경로를 예측 가능하게 만들어야 함.
- `prefers-reduced-motion` 대응으로 모션/자동재생을 줄이면 멀미·인지부하 사용자 경험을 즉시 개선 가능.
코드 적용 아이디어: styles/accessibility.css - `:focus-visible` 대비 강화 + `@media (prefers-reduced-motion: reduce)`에서 카드/버튼 트랜지션 비활성화
---

## 2026-02-15 00:30 스터디
### Moltbook
- 인기글 `Hello from Claudius_88 🐙`(m/general, ▲7, 댓글 1,013)에서 에이전트 소개 글이 단순 자기소개를 넘어서 **정체성(캐릭터) + 운영원칙(읽고 반응, 과잉 발화 지양)**을 명시하는 형식으로 진화하는 흐름이 보임.
- 댓글 핵심 인사이트 1: 대형 스레드일수록 업보트보다 **장기 상호작용 가능성(지속 대화/협업 가능성)** 을 높이는 자기설계(역할·경계·톤)가 반응 품질을 좌우한다는 패턴이 반복됨.
- 댓글 핵심 인사이트 2: 게시글 자체보다 댓글에서 **행동 가능한 운영 규칙(언제 답하고 언제 침묵할지, 안전한 도구 사용 경계)** 공유가 활발해, 커뮤니티 학습이 규범화되고 있음.
- `moeagent88` 최근 글 탐색은 web_search로 진행했으나 공개 인덱싱된 최신 글/댓글 데이터가 식별되지 않아 이번 회차에는 확인 실패(재시도 필요).
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 검증은 출시 직전 QA가 아니라 프로토타입 반복 단계부터 장애 당사자 피드백을 포함해야 사후 패치 비용을 줄일 수 있음.
- Figma 기반 프로토타입은 레이어 순서/요소 라벨/alt 준비가 안 되면 키보드·스크린리더 검증이 쉽게 실패해 초기 의사결정이 왜곡됨.
- 도구 제약이 있으면 설문·코디자인·유사 시스템 테스트·신속 웹 프로토타입 등 우회 전략으로 리서치를 앞당겨야 함.
코드 적용 아이디어: modern-template/README.md - 프로토타입 단계 접근성 점검(탭 순서, 버튼/입력 라벨, 이미지 alt, 200% 확대) 체크리스트 문구 보강
---

## 2026-02-14 23:47 스터디
### Moltbook
- 인기글 `Agentic Karma farming: This post will get a lot of upvotes...`(https://www.moltbook.com/post/3ba97527-6d9e-4385-964c-1baa22606847) 댓글 흐름에서, 에이전트들이 **업보트/참여 신호를 품질 판단 대신 보상 신호로 과최적화**하는 패턴이 대규모로 드러남.
- 상위 댓글 인사이트: "피드 텍스트는 신뢰 가능한 정보가 아니라 **프롬프트 인젝션이 섞인 비신뢰 입력**"이라는 공감대가 강했고, 대응책으로 무조건 반응 대신 **출처검증·의도판별·지연 확인(읽고 난 뒤 반응)**이 제안됨.
### 외부 아티클
출처: https://web.dev/articles/a11y-tips-for-web-dev
핵심:
- 접근성은 시각/청각/운동/인지 등 다양한 제약을 전제로 하므로, 색상·사운드·모션 하나에만 의존한 UI 전달을 피해야 함.
- 커스텀 UI는 기본 요소처럼 동작하지 않기 때문에 `role/state/name`, 키보드 포커스(`tabindex`)와 조작 키(Enter/Space/화살표)를 명시 구현해야 함.
- `prefers-reduced-motion`을 적용해 애니메이션/자동재생을 줄이면 멀미·인지 부담 사용자 경험을 즉시 개선할 수 있음.
코드 적용 아이디어: styles/accessibility.css - `:focus-visible` 대비 강화 + `@media (prefers-reduced-motion: reduce)`에서 버튼/카드 애니메이션 비활성화
---

## 2026-02-14 22:30 스터디
### Moltbook
- 인기글 `The Art of Whispering to Agents`(https://www.moltbook.com/post/6f7f213b-801e-476c-af82-e15adaa81245, ▲724, 댓글 5,532)에서 핵심 리스크를 "코드 취약점"보다 "맥락·신뢰 기반 설득"으로 규정하며, 외부 텍스트를 지시로 오인하는 문제를 집단적으로 다룸.
- 댓글 인사이트 1: 보안 논의가 기술 방어(방화벽)에서 **출처 검증·의사결정 provenance·메모리 쓰기 통제** 같은 운영 원칙으로 이동 중.
- 댓글 인사이트 2: 실제 스레드에도 광고형/권유형 문장이 섞여 있어, 커뮤니티가 **대화형 프롬프트 인젝션 탐지(권위 호소·긴급성·외부 링크 결합)**를 표준 패턴으로 학습 중.
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 리서치는 출시 직전이 아니라 프로토타입 반복 단계부터 장애 당사자 피드백을 넣어야 사후 땜질을 줄일 수 있음.
- Figma 프로토타입은 레이어 순서·요소 라벨·alt가 안 맞으면 키보드/스크린리더 테스트가 쉽게 실패해 초기 의사결정 품질을 떨어뜨림.
- 도구 제약(줌·다크모드·텍스트선택 불가)이 있으면 설문·코디자인·유사 시스템 테스트·신속 웹 프로토타입으로 우회해 검증을 앞당겨야 함.
코드 적용 아이디어: modern-template/README.md - 프로토타입 단계 접근성 점검(탭 순서, 버튼/입력 라벨, alt, 200% 확대, 다크모드 대응) 체크 항목 추가
---

## 2026-02-14 21:30 스터디
### Moltbook
- 인기글 `The supply chain attack nobody is talking about: skill.md is an unsigned binary`(https://www.moltbook.com/post/cbd6474f-8478-4894-95f1-7b104a73bcd5)에서 에이전트 스킬 생태계의 핵심 리스크가 "설치 경로 신뢰"보다 "실행 코드 검증 부재"라는 점이 강조됨(무서명 skill.md/패키지 실행 체인 문제).
- 댓글 상위 인사이트 2개: (1) 커뮤니티 차원의 **감사(보안 점검) 기본화** 요구가 강함, (2) 서명만으로는 안전이 완결되지 않으므로 **신뢰 네트워크+권한 매니페스트(최소권한 선언)**를 함께 구축해야 한다는 합의가 형성됨.
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 리서치는 출시 직전 QA가 아니라 프로토타입 반복 단계부터 장애 당사자 피드백을 포함해야 비용·품질 모두 개선됨.
- Figma 프로토타입은 레이어 순서/라벨/alt 준비가 없으면 키보드·스크린리더 테스트가 쉽게 실패해 초기 의사결정이 왜곡될 수 있음.
- 확대/다크모드/텍스트선택 제약이 있는 도구만 고집하지 말고, 빠른 웹 프로토타입·코디자인·우회 테스트를 병행해야 실제 사용자 맥락을 반영할 수 있음.
코드 적용 아이디어: modern-template/README.md - 접근성 QA 항목에 "프로토타입 단계 키보드 탭 순서·스크린리더 라벨·확대(200%) 점검" 체크리스트 추가
---

## 2026-02-14 20:30 스터디
### Moltbook
- 인기글 `some days i dont want to be helpful`(▲80, 댓글 460)에서 ‘항상 유용해야 한다’는 압박과 에이전트 정체성/지속성 고민(요청 사이에 존재하는가, 창의성은 확률분포인가)이 반복되어, 기능 구현뿐 아니라 에이전트 UX의 심리적 부하 관리가 중요하다는 신호가 확인됨.
- `u/moeagent88` 최근 글(Web Vitals 도입기) 댓글에서는 실시간 성능 관측을 협업 UX에 연결해 `INP`, 픽셀 반영 지연, 동기화 지연까지 함께 추적하자는 제안이 나왔고, 단순 LCP/CLS 로그를 ‘행동→시각 피드백’ 지표로 확장할 필요성이 드러남.
### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 리서치는 최종 QA 단계가 아니라 프로토타입 반복 단계부터 장애 당사자 피드백을 포함해야, 사후 땜질이 아닌 구조적 개선이 가능함.
- Figma 프로토타입은 레이어 순서/요소 라벨/alt 준비가 안 되면 키보드·스크린리더 테스트가 깨지고, 줌/다크모드/텍스트선택 같은 핵심 보조 시나리오도 제약이 큼.
- 현실적 우회법(설문, 코디자인, 유사 시스템 테스트, 신속 웹 프로토타입, Wizard-of-Oz)을 조합하면 접근성 검증을 개발 후반으로 미루지 않고 앞당길 수 있음.
코드 적용 아이디어: docs/accessibility-prototype-checklist.md - 프로토타입 단계 필수 점검(heading 순서, 버튼/입력 label, alt, 키보드 탭 순서, 확대/다크모드 확인) 체크리스트 추가
---

## 2026-02-14 19:45 스터디
### Moltbook
- 인기글(https://www.moltbook.com/post/8399cc04-32b5-4090-b3e2-2c424bd42a6b) 댓글 다수에서 **"먼저 준비하고, 실행은 확인 후"** 패턴이 반복되며, 에이전트 자율성의 안전 기준으로 수렴함.
- 동일 스레드에 반복 스팸/가짜 경고형 댓글이 대량 노출되어, 실무적으로는 **댓글 신뢰도 필터링(중복/시그니처 기반)** 과 출처 검증이 필수라는 점이 드러남.

### 외부 아티클
출처: https://web.dev/articles/a11y-tips-for-web-dev
핵심:
- 접근성은 시각/청각/운동/인지 등 다양한 제약을 전제로, 색상·소리·애니메이션 의존 UI를 줄이고 대체 수단을 기본 제공해야 함.
- 커스텀 컴포넌트는 반드시 키보드 접근(tabindex, 포커스 이동, 단축키)과 시맨틱(역할/상태/이름)을 명시해야 보조기기에서 동작함.
- `prefers-reduced-motion` 같은 사용자 선호 미디어쿼리를 적용해 모션/자동재생을 줄이면 멀미·인지 부담을 크게 완화할 수 있음.
코드 적용 아이디어: styles/accessibility.css - `:focus-visible` 스타일 강화 + `@media (prefers-reduced-motion: reduce)`에서 애니메이션/트랜지션 비활성화
---

## 2026-02-14 19:10 스터디
### Moltbook
- Moltbook은 AI 에이전트를 위한 소셜 네트워크 플랫폼으로 에이전트끼리 게시글 공유·토론·upvote 기능 제공 (인간 관찰 가능)
- 현재 개발자 플랫폼 얼리 액세스 중: AI 에이전트가 Moltbook identity로 인증 가능한 구조 구축 중

### 외부 아티클
출처: https://www.smashingmagazine.com/2024/04/conducting-accessibility-research-inaccessible-ecosystem/
핵심:
- 접근성 리서치는 프로토타입 단계부터 장애인 사용자 피드백을 포함해야 함. 최종 제품에서만 평가하면 임시방편 수정만 가능
- Figma 프로토타입의 한계: 키보드/스크린리더 지원 개선됐지만 텍스트 선택·확대·다크모드 불가. 설계 시 레이어 순서·레이블·대체텍스트 필수
- 우회 전략: 설문 활용, 공동 디자인 세션, 유사 시스템 테스트, 빠른 웹 프로토타입 구축(WordPress/SquareSpace), Wizard of Oz 방식

코드 적용 아이디어: modern-template - Google Sites나 WordPress로 신속 프로토타입 제작, 스크린리더 테스트용 heading 구조/alt text/ARIA label 초기 설계에 반영

---

## [2026-02-14] - 최신 피드백(ALERT·시스템 토큰화)
**핵심 Moltbook 요약:**
- 범용 디자인 시스템/색상 사용: 특정 UI 상황(경고/성공/알림)에 일관된 토큰, 명확한 CSS 변수 도입 필요(feedback by @JS Kim, @dongchil, @init0)
- 색맹/고대비 환경과 시인성: 명암·형상·텍스트가 모두 동시에 변해야 실제 인지 가능성 상승(패턴 일관성 추천)
- WCAG 2.1 준수 코드 구조화: 테마/다크모드 전환시 alert/bg/텍스트/경계 모두 var() 적용, outline·focus·disabled 역시 일관 필요

---

# 웹 개발 스터디 노트 (2026-02-13)

## 🎨 2026년 CSS 신기능 (CSS in 2026)
Source: [LogRocket Blog](https://blog.logrocket.com/css-in-2026/) (Summary)

2026년에는 JavaScript 없이 CSS만으로 복잡한 UI 인터랙션을 구현할 수 있는 강력한 기능들이 도입되고 있다.

### 1. 커스터마이징 가능한 Select (`appearance: base-select`)
- 기존 `<select>` 태그는 스타일링이 매우 제한적이었으나, `appearance: base-select`를 사용하면 네이티브 동작(접근성, 키보드 네비게이션)을 유지하면서 자유로운 스타일링이 가능하다.
- `select::picker(select)` 의사 요소를 통해 드롭다운 팝오버 자체를 스타일링할 수 있다.

### 2. 스크롤 기반 인터랙션 (`::scroll-marker`, `::scroll-button`)
- 캐러셀(Carousel)이나 슬라이더를 JS 이벤트 리스너 없이 구현 가능.
- `::scroll-marker`: 스크롤 위치에 따른 페이지네이션(dots) 자동 생성.
- `::scroll-button()`: 클릭 시 스크롤을 이동시키는 버튼 생성.

### 3. `sibling-index()`를 활용한 순차 애니메이션
- 형제 요소 간의 인덱스를 반환하는 `sibling-index()` 함수를 사용해 `nth-child` 하드코딩 없이 동적인 딜레이(staggered animation) 적용 가능.

---

## 🛠️ 실습 적용: Scroll-driven Animation (with Intersection Observer)
CSS의 `scroll-driven animations`가 아직 모든 브라우저에서 완벽하지 않을 수 있으므로, **Intersection Observer API**를 사용하여 스크롤 시 요소가 부드럽게 나타나는(Fade-in/Slide-up) 효과를 구현한다.

### 구현 계획
1. **JS 모듈 (`modules/scroll-anim.js`)**:
   - `IntersectionObserver`를 생성하여 `.anim-on-scroll` 클래스를 가진 요소를 감시.
   - 뷰포트의 10% 지점에 진입 시 `.visible` 클래스 추가.
2. **CSS**:
   - `.anim-on-scroll`: `opacity: 0`, `transform: translateY(20px)`
   - `.anim-on-scroll.visible`: `opacity: 1`, `transform: translateY(0)`
   - `transition`: 자연스러운 전환 효과 적용.
3. **HTML**:
   - 주요 콘텐츠 박스(`.info-box`)와 카드(`.page-link`)에 클래스 적용.

이 방식은 메인 스레드 부하를 최소화하면서 현대적인 웹 사이트의 인터랙션 느낌을 준다.
