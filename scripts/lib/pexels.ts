/**
 * Pexels API로 기사 카테고리/제목과 관련된 저작권 걱정 없는 실사 이미지를 검색해요.
 * (무료 스톡 사진, 출처 표기 없이 사용 가능 — https://www.pexels.com/license/)
 *
 * PEXELS_API_KEY 환경변수가 없거나 검색 결과가 없으면 null을 반환하고,
 * 호출부(CardArt 컴포넌트)에서 카테고리 아트로 자연스럽게 대체돼요.
 */

const PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search";

// 카테고리 → 영문 검색 키워드 (Pexels는 한국어 검색 품질이 낮아 영문으로 매핑해요)
const CATEGORY_KEYWORDS: Record<string, string> = {
  날씨: "weather sky",
  경제: "stock market finance",
  IT: "technology computer",
  사회: "city street korea",
  문화: "cinema movie theater",
  스포츠: "sports stadium",
};

interface PexelsPhoto {
  src: {
    large: string;
    medium: string;
  };
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

/**
 * 카테고리(및 선택적으로 제목 키워드)와 관련된 실사 이미지 URL을 검색해요.
 * 실패 시(키 없음, 네트워크 오류, 결과 없음) null을 반환해요.
 */
export async function searchArticlePhoto(
  category: string,
  extraKeyword?: string,
): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn("PEXELS_API_KEY가 없어 이미지 검색을 건너뛰어요.");
    return null;
  }

  const baseKeyword = CATEGORY_KEYWORDS[category] ?? category;
  const query = extraKeyword ? `${baseKeyword} ${extraKeyword}` : baseKeyword;

  const url = new URL(PEXELS_SEARCH_URL);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "portrait");

  try {
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
    });

    if (!res.ok) {
      console.warn(`Pexels 검색 실패 (${res.status}): ${query}`);
      return null;
    }

    const data = (await res.json()) as PexelsSearchResponse;
    const photo = data.photos[0];
    return photo?.src.large ?? null;
  } catch (error) {
    console.warn("Pexels 검색 중 오류가 발생했어요.", error);
    return null;
  }
}
