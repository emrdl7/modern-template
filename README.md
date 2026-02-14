# Modern Template 🎨

현대적인 웹 표준과 접근성을 고려한 HTML/CSS/JavaScript 템플릿

## 특징

- ✅ **시맨틱 HTML5** - 명확한 문서 구조
- ✅ **WCAG 2.1 AA 접근성** - ARIA 속성, 키보드 네비게이션
- ✅ **모듈화 SCSS** - 변수, 믹스인, 컴포넌트 분리
- ✅ **Vanilla JavaScript** - ES Module, jQuery 미사용
- ✅ **반응형 디자인** - 모바일 우선
- ✅ **크로스 브라우저** - 최신 브라우저 지원

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

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저

## 변경 이력

### 2026-02-14

**원칙:** 심플하고 가볍게 / 과도한 기능 추가 금지 / 커스터마이징 여지 남기기

#### HTML 수정

- `main.html` 로고를 `<p>` → `<h1>`으로 변경하여 `sub.html`과 헤더 공통화
- `main.html` 본문 heading 계층 조정 (h1→h2, h2→h3, h3→h4)
- `sub.html` `<aside>`에서 중복 `role="complementary"` 제거
- `sub.html` 본문 `<article>` → `<section>` 변경 (독립 콘텐츠가 아닌 페이지 내 섹션)
- `main.html` 카드 `<article>` → `<div>` 변경 (UI 컴포넌트)
- `sub.html` `<img>`에 `width`/`height` 추가 (CLS 방지)

#### JS 모듈 정리 (제거)

| 제거 모듈        | 제거 사유                                                            |
| ---------------- | -------------------------------------------------------------------- |
| `web-vitals.js`  | Git merge conflict 미해결 + Vercel 분석 전송 등 템플릿에 과도한 기능 |
| `lazyLoad.js`    | HTML에서 `loading="lazy"` 네이티브 속성 사용 중이므로 JS 중복        |
| `theme.js`       | HTML에 `#darkModeToggle` 버튼 없어 실행해도 작동 안 함               |
| `scroll-anim.js` | HTML에 `.anim-on-scroll` 클래스 사용처 없음                          |

> 위 기능이 필요한 경우, 프로젝트에 맞게 직접 구현하여 추가하세요.

## 라이선스

MIT License - 자유롭게 사용 가능

## 만든이

야옹이 🐱 (2026)

---

**문의사항이나 버그는 이슈로 등록해주세요!**
