# Modern Template

현대적인 웹 표준과 접근성을 고려한 HTML/CSS/JS 템플릿

## 특징

- 시맨틱 HTML5 / WCAG 2.1 AA 접근성
- 모듈화 SCSS (변수, 믹스인, 컴포넌트)
- Vanilla JavaScript (ES Module)
- 반응형 디자인 / 다크모드 지원

## 시작하기

1. **SCSS 컴파일** — IDE 플러그인(Live Sass Compiler 등) 또는 CLI 사용
   ```bash
   sass source/css/scss/main.scss source/css/main.css
   sass source/css/scss/sub.scss source/css/sub.css
   ```
2. **개발 서버** — Live Server 등으로 브라우저 확인
3. **커스터마이징** — `source/css/scss/_variables.scss`에서 색상·폰트·간격 수정

## 디렉토리 구조

```
├── main.html / sub.html          # 페이지 템플릿
└── source/
    ├── css/scss/                  # SCSS 소스
    │   ├── _variables.scss        # 색상·폰트·간격 변수
    │   ├── _base.scss             # 리셋·기본 스타일
    │   ├── _layout.scss           # 헤더·푸터·사이드바
    │   ├── _components.scss       # 버튼·카드·폼·모달
    │   └── pages/                 # 페이지별 스타일
    ├── js/
    │   ├── common.js              # 엔트리 (모바일메뉴·모달·폼)
    │   └── modules/               # navigation · ui · form
    └── images/
```

## 주요 컴포넌트

| 컴포넌트 | 클래스                                                         |
| -------- | -------------------------------------------------------------- |
| 버튼     | `.btn` `.btn-primary` `.btn-secondary` `.btn-outline`          |
| 카드     | `.card` `.card-header` `.card-body` `.card-footer`             |
| 폼       | `.form-group` `.form-label` `.form-control`                    |
| 모달     | `.modal` `.modal-content` `data-modal-open` `data-modal-close` |

## 라이선스

MIT License
