import { Text } from "@toss/tds-mobile";

import { CardArt } from "../components/CardArt";
import { BookmarkIcon, ChevronLeftIcon } from "../components/icons";
import { useTheme } from "../contexts/ThemeContext";
import { CardNews } from "../types/card";
import { formatFullDate } from "../utils/date";

interface DetailProps {
  card: CardNews;
  onBack: () => void;
  saved: boolean;
  onToggleSave: () => void;
}

export function Detail({ card, onBack, saved, onToggleSave }: DetailProps) {
  const { theme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
          padding: "0 8px",
          backgroundColor: theme.surface,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <button
          onClick={onBack}
          aria-label="뒤로 가기"
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
          }}
        >
          <ChevronLeftIcon size={22} color={theme.textPrimary} />
        </button>

        <button
          onClick={onToggleSave}
          aria-label={saved ? "저장 취소" : "저장"}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
          }}
        >
          <BookmarkIcon
            size={22}
            color={saved ? theme.accent : theme.textPrimary}
            filled={saved}
          />
        </button>
      </header>

      <div style={{ padding: "20px 20px 60px" }}>
        <div
          style={{
            width: "100%",
            height: 180,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: theme.surface,
          }}
        >
          <CardArt card={card} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Text typography="st10" fontWeight="bold" color={theme.accent}>
                {card.category}
              </Text>
              <Text typography="st10" color={theme.textTertiary}>
                {formatFullDate(card.date)}
              </Text>
            </div>
            <Text
              typography="t1"
              fontWeight="bold"
              color={theme.textPrimary}
              style={{ whiteSpace: "pre-line", lineHeight: 1.35 }}
            >
              {card.title.replace(/\n/g, " ")}
            </Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {card.summary.split("\n\n").map((paragraph, index) => (
              <Text
                key={index}
                typography="t5"
                fontWeight="medium"
                color={theme.textSecondary}
                style={{ whiteSpace: "pre-line", lineHeight: 1.75 }}
              >
                {paragraph}
              </Text>
            ))}
          </div>

          {card.source && (
            <Text typography="st11" color={theme.textTertiary}>
              출처: {card.source}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
