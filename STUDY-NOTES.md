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
