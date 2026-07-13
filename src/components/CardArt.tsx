import { CSSProperties, useState } from "react";

import { CardNews } from "../types/card";
import { CategoryArt } from "./CategoryArt";

interface CardArtProps {
  card: CardNews;
  style?: CSSProperties;
}

/**
 * 카드의 대표 이미지를 그려줘요.
 * imageUrl(Pexels 등 실사 이미지)이 있으면 우선 사용하고,
 * 없거나 로드에 실패하면 카테고리 아트로 자연스럽게 대체돼요.
 */
export function CardArt({ card, style }: CardArtProps) {
  const [failed, setFailed] = useState(false);

  if (!card.imageUrl || failed) {
    return <CategoryArt category={card.category} style={style} />;
  }

  return (
    <img
      src={card.imageUrl}
      alt={card.title.replace(/\n/g, " ")}
      onError={() => setFailed(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        ...style,
      }}
    />
  );
}
