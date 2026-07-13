# today-1-minute

Apps in Toss 프로젝트입니다.

## 시작하기

```bash
npm run dev
```

## 카드 뉴스 등록하기

카드 뉴스는 `src/data/cards.json`에 저장돼요. AI로 초안을 만들고, 검수 후 발행하는 2단계로 관리해요.

1. `.env.example`을 복사해 `.env`를 만들고 `ANTHROPIC_API_KEY`를 채워주세요.
2. 뉴스 원문으로 AI 초안을 생성해요.

```bash
npm run card:draft -- --file ./content/source/news.txt --category 경제
# 또는
npm run card:draft -- --text "뉴스 원문 텍스트" --category IT
```

3. `content/drafts/`에 생성된 초안 JSON을 열어 문구를 검수하고, `imageUrl`(카드 배경 이미지 주소)을 채워주세요.
4. 검수가 끝나면 발행해요. `cards.json`에 반영되고 초안 파일은 삭제돼요.

```bash
npm run card:publish -- ./content/drafts/2026-07-10-draft.json
```

## 배포하기

- 앱인토스 배포 API 키는 [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > API 키 > 콘솔 API 키 에서 발급받을 수 있어요.

```bash
npm run build
npm run deploy
```

## 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [앱인토스 개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)

AI를 사용하시는 경우 [여기](https://developers-apps-in-toss.toss.im/development/llms.html)를 확인해보세요.
