# 모바일앱 도입 타당성 컨설팅 웹사이트

모바일웹 기반 서비스의 앱 전환 분석 리포트 웹사이트입니다.

## 구조

```
mobile-app-consulting/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 스타일시트
├── js/
│   └── main.js            # 콘텐츠 로딩 및 Mermaid 다이어그램
├── content/                # 마크다운 콘텐츠 파일 (유지보수 용이)
│   ├── 01-summary.md
│   ├── 02-checklist.md
│   ├── 03-comparison.md
│   ├── 04-pwa-recommendation.md
│   ├── 05-criteria.md
│   ├── 06-metrics.md
│   ├── 07-security.md
│   ├── 08-cost.md
│   ├── 09-conclusion.md
│   └── 10-roadmap.md
└── README.md
```

## 콘텐츠 수정 방법

1. `content/` 폴더 내 `.md` 파일을 수정하세요.
2. 파일 이름 앞의 번호(예: `01-`)는 로딩 순서와 관련이 있으므로 유지하세요.
3. `index.html`을 브라우저에서 열면 콘텐츠가 자동으로 로드됩니다.

**참고**: 보안 정책(CORS)으로 인해 로컬 파일(`file://`)에서 직접 열 경우 마크다운 파일이 로드되지 않을 수 있습니다. 
이 경우 로컬 서버를 실행하세요:

```bash
# Python 3
python3 -m http.server 8080

# 또는 Node.js (npx)
npx serve .
```

그런 다음 브라우저에서 `http://localhost:8080`에 접속하세요.

## 주요 기능

- **Mermaid 다이어그램**: 의사결정 흐름도, 대안 비교 차트, 로드맵 흐름을 시각화
- **반응형 디자인**: 모바일/데스크톱 모두 지원
- **sticky TOC**: 스크롤 시 상단에 고정되는 목차
- **카드 UI**: 비용, 지표 등을 시각적으로 표시

## 기술 스택

- Vanilla HTML/CSS/JavaScript
- [Mermaid.js](https://mermaid.js.org/) - 다이어그램 렌더링
- 외부 라이브러리 의존성 최소화
