# Modern Template 🎨

현대적인 웹 표준과 접근성을 고려한 HTML/CSS/JavaScript 템플릿

## 특징

- ✅ **시맨틱 HTML5** - 명확한 문서 구조
- ✅ **WCAG 2.1 AA 접근성** - ARIA 속성, 키보드 네비게이션
- ✅ **모듈화 SCSS** - 변수, 믹스인, 컴포넌트 분리
- ✅ **Vanilla JavaScript** - ES Module, jQuery 미사용
- ✅ **반응형 디자인** - 모바일 우선
- ✅ **크로스 브라우저** - 최신 브라우저 지원

## 프로토타입 단계 접근성 QA 체크리스트

초기 프로토타입 검토 때 아래 항목을 먼저 확인하면, 개발 후반 접근성 수정 비용을 줄일 수 있습니다.

- 심화/대체 방법 문서: [`docs/a11y-prototype-research-checklist.md`](docs/a11y-prototype-research-checklist.md)
- 실행형 플레이북: [`docs/a11y-prototype-research-playbook.md`](docs/a11y-prototype-research-playbook.md)

- [ ] **탭 순서**: 키보드(Tab/Shift+Tab) 이동이 시각적 흐름과 일치하는지
- [ ] **포커스 가시성**: 현재 포커스된 요소가 명확히 보이고(outline/contrast), 키보드만으로 조작 가능한지
- [ ] **버튼/입력 라벨**: 버튼 텍스트와 `label`/`aria-label`이 목적을 명확히 설명하는지
- [ ] **헤딩 구조**: `h1`~`h6` 순서가 논리적이고, 섹션 구조가 스크린리더에서 이해 가능한지
- [ ] **이미지 대체 텍스트**: 의미 있는 이미지에 `alt`가 있고, 장식 이미지는 비워뒀는지(`alt=""`)
- [ ] **200% 확대(리플로우)**: 브라우저 200% 확대에서도 가로 스크롤 남발 없이 내용 잘림/겹침이 없는지
- [ ] **다크 모드/고대비 대응**: 텍스트-배경 대비가 유지되고 상태(hover/focus/disabled)가 구분되는지

간단 권장 루틴: **키보드만으로 1회 탐색 → 200% 확대 확인 → 이미지 alt/라벨 점검**

아래 블록은 이슈/PR에 바로 붙여 넣는 **기본 템플릿**입니다.

```markdown
### Prototype A11y Check (Default)

- [ ] 탭 순서 확인 (Tab / Shift+Tab)
- [ ] 포커스 가시성 확인 (`:focus-visible`, 대비 유지)
- [ ] 버튼/입력 라벨 확인 (`label`/`aria-label`)
- [ ] 이미지 alt 점검 (의미 이미지 alt, 장식 이미지 `alt=""`)
- [ ] 200% 확대(리플로우) 확인
- [ ] 다크모드/고대비에서 상태(hover/focus/disabled) 구분 확인
```

Figma/프로토타입 핸드오프 전에는 아래 3가지를 추가로 확인하세요.

- [ ] 레이어/읽기 순서가 화면의 실제 탐색 순서와 일치하는지
- [ ] 인터랙션 요소(버튼/입력/아이콘 버튼)에 이름(label)이 빠지지 않았는지
- [ ] 이미지/아이콘의 의미 전달이 텍스트 없이도 충분한지(필요 시 alt/캡션 보강)

팀에서 매번 같은 기준으로 확인할 수 있도록, 프로토타입 PR/리뷰 코멘트에 아래 문구를 그대로 붙여 쓰면 좋습니다.

```text
[Prototype A11y Quick Check]
- Tab 순서/포커스 확인 완료
- 버튼·입력 라벨 확인 완료
- 의미 있는 이미지 alt 확인 완료
- 200% 확대(리플로우) 확인 완료
```

## 신규 작업 템플릿: A11y Acceptance Criteria

새 기능/페이지 작업 이슈에 아래 체크박스를 그대로 붙여두면, 일정이 급해져도 최소 접근성 기준을 놓치지 않습니다.

```markdown
### A11y Acceptance Criteria

- [ ] 키보드만으로 핵심 플로우(이동/열기/닫기/제출) 수행 가능
- [ ] 포커스 표시가 모든 인터랙티브 요소에서 명확하게 보임
- [ ] 텍스트/아이콘 대비가 WCAG AA 기준 충족 (일반 텍스트 4.5:1, 비텍스트 UI 3:1)
- [ ] 브라우저 200% 확대에서도 내용 잘림/겹침 없이 사용 가능
```

클라이언트/의사결정자 설득용으로 아래 3문장을 그대로 복붙해도 됩니다.

```text
(1) 접근성은 “착한 일”이 아니라 전환율/이탈률/CS 비용에 직접 영향을 주는 사용성 품질입니다.
(2) 지금 체크리스트 4가지만 먼저 고정하면, 런칭 직전 수정 리스크(일정/비용)를 크게 줄일 수 있습니다.
(3) 이번 릴리즈에서 못 하는 항목은 백로그로 명시해, 다음 스프린트에서 순차 개선하겠습니다.
```

## 디렉토리 구조

```
modern-template/
├── index.html              # 프로젝트 인덱스
├── main.html               # 메인 페이지 템플릿
├── sub.html                # 서브 페이지 템플릿
├── README.md               # 문서 (이 파일)
└── source/
    ├── css/
    │   ├── main.css              # 컴파일된 CSS (메인 페이지)
    │   ├── sub.css               # 컴파일된 CSS (서브 페이지)
    │   └── scss/                 # SCSS 소스 (개발용)
    │       ├── _variables.scss   # 변수 + 헬퍼 함수
    │       ├── _fonts.scss       # 웹폰트 (@font-face)
    │       ├── _mixins.scss      # 믹스인
    │       ├── _base.scss        # 기본 스타일
    │       ├── _layout.scss      # 레이아웃 (헤더, 사이드바 등)
    │       ├── _components.scss  # UI 컴포넌트
    │       ├── main.scss         # 메인 페이지 엔트리
    │       ├── sub.scss          # 서브 페이지 엔트리
    │       └── pages/
    │           ├── _main.scss    # 메인 페이지 전용 스타일
    │           └── _sub.scss     # 서브 페이지 전용 스타일
    ├── js/
    │   ├── common.js             # 엔트리 포인트 (ES Module)
    │   ├── utils.js              # 유틸리티 함수 (debounce, throttle, trapFocus)
    │   └── modules/
    │       ├── navigation.js     # 모바일메뉴, 스티키헤더, 스무스스크롤
    │       ├── ui.js             # 모달, 탭
    │       └── form.js           # 폼 유효성 검사
    ├── font/                     # 웹폰트
    └── images/                   # 이미지 리소스
```

## 빠른 시작

### 1. SCSS 컴파일

SCSS를 CSS로 컴파일해야 합니다.

**방법 1: npm script 사용 (추천)**

```bash
# 한 번에 모든 CSS 컴파일
npm run build:css

# Watch 모드 (개발 중)
npm run watch:css
```

**방법 2: Sass CLI 사용**

```bash
# 개별 컴파일
sass source/css/scss/main.scss source/css/main.css
sass source/css/scss/sub.scss source/css/sub.css

# Watch 모드
sass --watch source/css/scss:source/css
```

**방법 2: VS Code Extension**

- Live Sass Compiler 확장 설치
- 자동 컴파일 활성화

### 2. 개발 서버 실행

Live Server 등을 사용하여 브라우저에서 확인

```bash
# VS Code Live Server 확장 사용
# 또는
npx serve .
```

### 3. 개발자에게 전달

SCSS 컴파일 후 다음 파일/폴더만 전달:

- HTML 파일들 (`main.html`, `sub.html` 등)
- `source/css/main.css` (메인 페이지용 CSS)
- `source/css/sub.css` (서브 페이지용 CSS)
- `source/js/` (common.js + utils.js + modules/)
- `source/font/`
- `source/images/`

**페이지별 CSS 구조:**

- `main.css` - 메인 페이지 전용 (공통 스타일 + 메인 페이지 스타일 포함)
- `sub.css` - 서브 페이지 전용 (공통 스타일 + 서브 페이지 스타일 포함)
- 각 페이지는 하나의 CSS 파일만 로드

SCSS 소스(`source/css/scss/`)는 개발용이므로 선택사항

## SCSS 변수 커스터마이징

`source/css/scss/_variables.scss`에서 프로젝트에 맞게 수정

### 색상

```scss
$colors: (
  primary: #246beb,
  // 메인 색상
  secondary: #003675,
  // 보조 색상
  accent: #e71825,
  // 강조 색상
   // ...
);
```

### 폰트

```scss
$font-family-base:
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
$font-sizes: (
  base: 1.6rem,
  // 기본 16px
  lg: 1.8rem,
  // 18px
   // ...
);
```

### 브레이크포인트

```scss
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
);
```

### 헬퍼 함수

`map-get()` 대신 축약 헬퍼 함수를 사용합니다:

```scss
// 기존
background-color: map-get($colors, primary);
font-size: map-get($font-sizes, base);
padding: map-get($spacers, 6);

// 헬퍼 함수
background-color: color(primary);
font-size: font-size(base);
padding: spacer(6);
```

| 헬퍼 함수           | 대상 Map         |
| ------------------- | ---------------- |
| `color($key)`       | `$colors`        |
| `font-size($key)`   | `$font-sizes`    |
| `font-weight($key)` | `$font-weights`  |
| `line-height($key)` | `$line-heights`  |
| `spacer($key)`      | `$spacers`       |
| `radius($key)`      | `$border-radius` |
| `shadow($key)`      | `$shadows`       |
| `z($key)`           | `$z-index`       |

## 컴포넌트 사용법

### 버튼

```html
<button class="btn btn-primary">기본 버튼</button>
<button class="btn btn-secondary">보조 버튼</button>
<button class="btn btn-outline">아웃라인 버튼</button>
<button class="btn btn-lg">큰 버튼</button>
```

### 카드

```html
<div class="card">
  <div class="card-header">카드 헤더</div>
  <div class="card-body">
    <h3>카드 제목</h3>
    <p>카드 내용</p>
  </div>
  <div class="card-footer">카드 푸터</div>
</div>
```

### 폼

```html
<form>
  <div class="form-group">
    <label for="input" class="form-label">라벨</label>
    <input type="text" id="input" class="form-control" placeholder="입력..." />
  </div>

  <div class="form-check">
    <input type="checkbox" id="check" class="form-check-input" />
    <label for="check" class="form-check-label">체크박스</label>
  </div>

  <button type="submit" class="btn btn-primary">제출</button>
</form>
```

## JavaScript 기능

ES Module 기반으로 기능별 파일이 분리되어 있습니다:

| 모듈                    | 기능                                         |
| ----------------------- | -------------------------------------------- |
| `modules/navigation.js` | 모바일 메뉴 토글, 스티키 헤더, 스무스 스크롤 |
| `modules/ui.js`         | 모달, 탭                                     |
| `modules/form.js`       | 폼 유효성 검사                               |
| `utils.js`              | debounce, throttle, trapFocus                |

HTML에서 엔트리 포인트만 로드하면 모듈이 자동으로 import됩니다:

```html
<script type="module" src="source/js/common.js"></script>
```

### 모달 사용 예

```html
<!-- 트리거 버튼 -->
<button data-modal-open="myModal">모달 열기</button>

<!-- 모달 -->
<div id="myModal" class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h3>모달 제목</h3>
      <button data-modal-close>&times;</button>
    </div>
    <div class="modal-body">모달 내용</div>
    <div class="modal-footer">
      <button class="btn btn-primary" data-modal-close>닫기</button>
    </div>
  </div>
</div>
```

## 접근성 체크리스트

- ✅ Skip Navigation 제공
- ✅ ARIA 속성 사용 (role, aria-label, aria-expanded 등)
- ✅ 키보드 네비게이션 지원
- ✅ 포커스 스타일 명확함
- ✅ 색상 대비 4.5:1 이상
- ✅ 의미있는 HTML 태그 사용
- ✅ alt 속성 필수

### 프로토타입 단계 QA (초기 점검)

- [ ] 키보드만으로 탭 이동 시 포커스 순서가 시각 흐름과 일치하는가?
- [ ] 버튼/링크/입력 요소에 스크린리더가 읽을 이름(label/aria-label)이 있는가?
- [ ] 의미 있는 이미지에 적절한 alt 텍스트가 있고, 장식 이미지는 제외 처리했는가?
- [ ] 브라우저 확대 200%에서 레이아웃 깨짐 없이 주요 기능 사용이 가능한가?
- [ ] 다크 모드(또는 고대비 모드)에서도 텍스트 가독성과 상태 구분이 유지되는가?

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저

## 라이선스

MIT License - 자유롭게 사용 가능

## 만든이

야옹이 🐱 (2026)

---

**문의사항이나 버그는 이슈로 등록해주세요!**
