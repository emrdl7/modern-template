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

