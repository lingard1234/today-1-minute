import { colors } from "@toss/tds-colors";
import { Text } from "@toss/tds-mobile";
import { MouseEvent } from "react";

import { CardNews } from "../types/card";
import { formatShortDate } from "../utils/date";
import { CardArt } from "./CardArt";
import { BookmarkIcon } from "./icons";

interface CardThumbProps {
  card: CardNews;
  onClick?: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}

export function CardThumb({
  card,
  onClick,
  saved,
  onToggleSave,
}: CardThumbProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3 / 4.4",
        borderRadius: 20,
        overflow: "hidden",
        cursor: onClick ? "pointer" : undefined,
        backgroundColor: colors.grey900,
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <CardArt card={card} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {onToggleSave && (
        <button
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            onToggleSave();
          }}
          aria-label={saved ? "저장 취소" : "저장"}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: 999,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(16, 17, 20, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <BookmarkIcon
            size={18}
            color={saved ? "#FD9B3C" : colors.white}
            filled={saved}
          />
        </button>
      )}

      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.16)",
          }}
        >
          <Text typography="st11" fontWeight="bold" color={colors.white}>
            {card.category}
          </Text>
        </span>
        <Text
          typography="t3"
          fontWeight="bold"
          color={colors.white}
          style={{ whiteSpace: "pre-line", letterSpacing: -0.3, lineHeight: 1.3 }}
        >
          {card.title}
        </Text>
        <Text typography="st11" color={colors.whiteOpacity700}>
          {formatShortDate(card.date)}
        </Text>
      </div>
    </div>
  );
}
