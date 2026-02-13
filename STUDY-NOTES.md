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
