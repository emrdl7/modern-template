# 웹 개발 스터디 노트 (2026-02-13)

## 🎨 2026년 CSS 신기능 (CSS in 2026)
Source: [LogRocket Blog](https://blog.logrocket.com/css-in-2026/)

2026년에는 JavaScript 없이 CSS만으로 복잡한 UI 인터랙션을 구현할 수 있는 강력한 기능들이 도입되고 있다.

### 1. 커스터마이징 가능한 Select (`appearance: base-select`)
- 기존 `<select>` 태그는 스타일링이 매우 제한적이었으나, `appearance: base-select`를 사용하면 네이티브 동작(접근성, 키보드 네비게이션)을 유지하면서 자유로운 스타일링이 가능하다.
- `select::picker(select)` 의사 요소를 통해 드롭다운 팝오버 자체를 스타일링할 수 있다.
- **장점:** 복잡한 JS 기반 드롭다운 라이브러리 없이 시맨틱한 `<select>`만으로 디자인 요구사항 충족 가능.

### 2. 스크롤 기반 인터랙션 (`::scroll-marker`, `::scroll-button`)
- 캐러셀(Carousel)이나 슬라이더를 JS 이벤트 리스너 없이 구현 가능.
- `::scroll-marker`: 스크롤 위치에 따른 페이지네이션(dots) 자동 생성.
- `::scroll-button()`: 클릭 시 스크롤을 이동시키는 버튼 생성.

### 3. `sibling-index()`를 활용한 순차 애니메이션
- 형제 요소 간의 인덱스를 반환하는 `sibling-index()` 함수를 사용해 `nth-child` 하드코딩 없이 동적인 딜레이(staggered animation) 적용 가능.
- 예: `transition-delay: calc(0.1s * sibling-index())`

### 4. Typed `attr()` 함수
- `attr(data-color color)`와 같이 타입을 지정하여 HTML 속성 값을 CSS 속성값(색상, 길이 등)으로 직접 사용 가능.

---

## 🛠️ 실습 적용: JS 모듈화 및 테마 관리
- 인라인 스크립트로 처리되던 다크모드 토글 로직을 ES Module (`modules/theme.js`)로 분리.
- `localStorage`를 연동하여 새로고침 후에도 테마 유지.
- 접근성(`aria-pressed`) 상태 동기화 로직 고도화.

## 📊 성능 최적화: Web Vitals 측정 스크립트
- `PerformanceObserver` API를 활용하여 LCP(Largest Contentful Paint)와 CLS(Cumulative Layout Shift)를 실시간으로 측정하는 모듈(`modules/web-vitals.js`) 구현.
- **LCP:** 페이지 로딩 시 가장 큰 콘텐츠 요소가 렌더링되는 시점을 포착. 사용자 경험(체감 로딩 속도)의 핵심 지표.
- **CLS:** 의도치 않은 레이아웃 이동(Shift)을 감지. 시각적 안정성을 저해하는 요소를 디버깅할 수 있음.
- 별도의 무거운 라이브러리 없이 네이티브 API만으로 성능 지표를 콘솔에 로깅하도록 구성하여 개발 모드에서 즉각적인 피드백 가능.
