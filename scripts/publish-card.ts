/**
 * 검수된 카드 뉴스 초안을 src/data/cards.json 에 반영하는 스크립트.
 *
 * 사용법:
 *   npm run card:publish -- ./content/drafts/2026-07-10-draft.json
 */
import { readFileSync, rmSync, writeFileSync } from "fs";

const CARDS_PATH = "./src/data/cards.json";

interface CardDraft {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  imageUrl?: string;
  source?: string;
}

const REQUIRED_FIELDS: (keyof CardDraft)[] = [
  "id",
  "date",
  "category",
  "title",
  "summary",
];

function main() {
  const draftPath = process.argv[2];
  if (!draftPath) {
    console.error("사용법: npm run card:publish -- <초안 JSON 경로>");
    process.exit(1);
  }

  const draft = JSON.parse(readFileSync(draftPath, "utf-8")) as CardDraft;

  const missing = REQUIRED_FIELDS.filter((field) => !draft[field]);
  if (missing.length > 0) {
    console.error(`다음 필드를 채워주세요: ${missing.join(", ")}`);
    process.exit(1);
  }

  if (!draft.imageUrl) {
    delete draft.imageUrl; // 비어 있으면 화면에서 카테고리 아트로 대체돼요.
  }

  const cards = JSON.parse(readFileSync(CARDS_PATH, "utf-8")) as CardDraft[];

  if (cards.some((card) => card.id === draft.id)) {
    console.error(`이미 같은 id(${draft.id})의 카드가 존재해요.`);
    process.exit(1);
  }

  cards.push(draft);
  cards.sort((a, b) => b.date.localeCompare(a.date));

  writeFileSync(CARDS_PATH, JSON.stringify(cards, null, 2) + "\n");
  rmSync(draftPath);

  console.log(`발행 완료: ${draft.id} (${CARDS_PATH})`);
}

main();
