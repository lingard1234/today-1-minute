/**
 * 뉴스 원문을 받아 AI로 카드 뉴스 초안을 생성하는 스크립트.
 *
 * 사용법:
 *   npm run card:draft -- --file ./content/source/news.txt --category 경제
 *   npm run card:draft -- --text "뉴스 원문 텍스트..." --category IT
 *
 * 관련 실사 이미지는 Pexels API로 자동 검색해 imageUrl에 채워줘요.
 * 결과는 content/drafts/{date}-draft.json 에 저장되며,
 * 사람이 검수 후 `npm run card:publish` 로 발행해요.
 */
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { z } from "zod";

import { searchArticlePhoto } from "./lib/pexels";

const DRAFTS_DIR = "./content/drafts";

const CardDraftSchema = z.object({
  title: z
    .string()
    .describe(
      "카드 이미지 위에 노출될 굵은 헤드라인. 최대 2줄, 줄바꿈은 \\n으로 표시. 15자 내외로, 숫자·핵심 키워드를 앞세워 클릭하고 싶게 작성하되 과장이나 낚시성 표현은 쓰지 않기.",
    ),
  summary: z
    .string()
    .describe(
      "상세 화면에 노출될 요약 본문. 2~3개 문단, 문단 구분은 \\n\\n. 존댓말(해요체)로 담백하게 작성.",
    ),
  category: z
    .string()
    .describe("카드 카테고리 (예: 경제, 사회, IT, 날씨, 문화 등 2~4자)"),
});

function parseArgs(argv: string[]) {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      args[key] = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const sourceText = args.file
    ? readFileSync(args.file, "utf-8")
    : args.text;

  if (!sourceText) {
    console.error(
      "사용법: npm run card:draft -- --file <경로> 또는 --text \"원문\" [--category 카테고리] [--source 출처]",
    );
    process.exit(1);
  }

  const client = new Anthropic();

  const message = await client.beta.messages.parse({
    model: "claude-opus-4-6",
    max_tokens: 2048,
    system:
      "당신은 '하루1분' 카드 뉴스 서비스의 에디터예요. 주어진 뉴스 원문을 바탕으로 1분 안에 읽을 수 있는 간결한 카드 뉴스 초안을 작성해요. 과장이나 추측 없이 원문에 근거해 사실만 전달하고, 토스 보이스톤(해요체, 능동적이고 담백한 말투)을 사용해요. 제목은 독자가 '더 읽고 싶다'고 느끼도록 구체적인 숫자·인물·변화 포인트를 앞세워 작성하되, 본문과 어긋나는 낚시성·자극적 표현은 절대 쓰지 않아요.",
    messages: [
      {
        role: "user",
        content: `다음 뉴스 원문을 카드 뉴스로 요약해줘.${
          args.category ? ` 카테고리는 "${args.category}"로 고정해줘.` : ""
        }\n\n---\n${sourceText}`,
      },
    ],
    output_format: betaZodOutputFormat(CardDraftSchema),
  });

  const draft = message.parsed_output;
  if (!draft) {
    console.error("카드 초안 생성에 실패했어요. 응답을 확인해주세요.");
    console.error(message);
    process.exit(1);
  }

  const date = new Date().toISOString().slice(0, 10);
  const id = date.replace(/-/g, "");
  const category = args.category ?? draft.category;

  const imageUrl = await searchArticlePhoto(category);
  if (!imageUrl) {
    console.warn(
      "관련 이미지를 찾지 못했어요. 발행 시 카테고리 아트로 자동 대체돼요.",
    );
  }

  const draftCard = {
    id,
    date,
    category,
    title: draft.title,
    summary: draft.summary,
    imageUrl: imageUrl ?? "", // 비어 있으면 발행 시 카테고리 아트로 대체돼요.
    source: args.source ?? "",
  };

  if (!existsSync(DRAFTS_DIR)) {
    mkdirSync(DRAFTS_DIR, { recursive: true });
  }

  const draftPath = `${DRAFTS_DIR}/${date}-draft.json`;
  writeFileSync(draftPath, JSON.stringify(draftCard, null, 2) + "\n");

  console.log(`초안이 생성되었어요: ${draftPath}`);
  console.log("검수 후 아래 명령으로 발행해주세요:");
  console.log(`  npm run card:publish -- ${draftPath}`);
}

main();
