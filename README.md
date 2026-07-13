# 📰 하루 1분

> 하루 1분으로 오늘의 한국 뉴스를 파악하는 토스 미니앱

[![Deploy](https://github.com/lingard1234/today-1-minute/actions/workflows/deploy.yml/badge.svg)](https://github.com/lingard1234/today-1-minute/actions/workflows/deploy.yml)

---

## 소개

**하루 1분**은 바쁜 현대인을 위한 카드뉴스 미니앱이에요.
매일 아침 AI가 날씨·경제·IT·사회·문화·스포츠 분야의 실제 뉴스를 골라 짧고 명확하게 정리해줘요.
토스 앱 안에서 1분 안에 오늘 하루를 파악할 수 있어요.

## 주요 기능

- **매일 자동 업데이트** — 매일 07:01 KST, AI가 실제 뉴스를 검색·요약·발행
- **Pexels 실사 사진** — 각 뉴스 주제에 맞는 고화질 사진 자동 매칭
- **날짜별 브라우징** — 과거 날짜 카드뉴스도 날짜 선택기로 확인 가능
- **저장 기능** — 마음에 드는 카드를 마이페이지에 저장
- **다크 모드** — 라이트/다크 테마 전환 지원
- **자동 배포** — `cards.json` push 시 GitHub Actions가 앱인토스에 자동 배포

## 화면 구성

```
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│  🏠 홈                  │   │  📄 상세                 │   │  🔖 마이페이지           │
│  ─────────────────────  │   │  ─────────────────────  │   │  ─────────────────────  │
│  📅 7월 12일 (일)       │   │  [실사 사진]             │   │  저장한 카드 0개         │
│                         │   │                         │   │                         │
│  7월 12일의 하루 1분    │   │  경제                    │   │  저장한 카드가 없어요.   │
│  좌우로 넘기며 확인     │   │  K-뷰티 수출             │   │  홈에서 카드를 저장해    │
│                         │   │  세계 2위 달성           │   │  보세요.                 │
│  ┌────┐  ┌────┐         │   │                         │   │                         │
│  │사진│  │사진│  ...    │   │  한국의 화장품 수출액이  │   │                         │
│  │경제│  │날씨│         │   │  지난해 114억 달러를...  │   │                         │
│  └────┘  └────┘         │   │                         │   │                         │
│  [홈]         [마이페이지]│  │  출처: 식품의약품안전처  │   │  [홈]         [마이페이지]│
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

## 자동화 파이프라인

```
매일 07:01 KST
    │
    ▼
Claude Code (로컬)
    │  WebSearch로 오늘 실제 뉴스 수집
    │  AI가 카드뉴스 작성 (해요체, 사실 기반)
    │  Pexels API로 관련 사진 자동 매칭
    │  cards.json 업데이트
    │
    ▼
git push → GitHub
    │
    ▼
GitHub Actions
    │  npm ci
    │  ait build
    │  ait deploy
    │
    ▼
앱인토스 자동 배포 완료
```

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | React 18, Vite, TypeScript |
| UI | Toss Design System (TDS Mobile) |
| 플랫폼 SDK | @apps-in-toss/web-framework |
| 자동화 | Claude Code Scheduled Tasks |
| 이미지 | Pexels API |
| CI/CD | GitHub Actions + `ait deploy` |

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5174)
npm run dev
```

환경변수 설정:

```bash
cp .env.example .env
# .env에서 PEXELS_API_KEY 채우기 (https://www.pexels.com/api/)
```

## 카드 수동 등록

AI로 카드 초안을 만들고 검수 후 발행하는 2단계 워크플로우도 지원해요.

```bash
# 1. 뉴스 원문으로 AI 초안 생성
npm run card:draft -- --text "뉴스 원문 텍스트" --category IT

# 2. content/drafts/ 에서 초안 검수 후 발행
npm run card:publish -- ./content/drafts/2026-07-12-draft.json
```

## 배포

GitHub Actions가 `src/` 변경 시 자동 배포해요.
수동 배포가 필요하면:

```bash
npm run build
npm run deploy
```

앱인토스 API 키는 [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > API 키에서 발급받으세요.

## 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [Pexels API](https://www.pexels.com/api/)
