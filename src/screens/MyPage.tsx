import { Text } from "@toss/tds-mobile";

import { CardArt } from "../components/CardArt";
import { BookmarkIcon } from "../components/icons";
import { useTheme } from "../contexts/ThemeContext";
import cards from "../data/cards.json";
import { CardNews } from "../types/card";
import { formatShortDate } from "../utils/date";

interface MyPageProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectCard: (id: string) => void;
}

export function MyPage({ savedIds, onToggleSave, onSelectCard }: MyPageProps) {
  const { theme } = useTheme();
  const savedCards = (cards as CardNews[])
    .filter((card) => savedIds.includes(card.id))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100dvh", position: "relative" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          height: 52,
          padding: "0 20px",
          backgroundColor: theme.bg,
        }}
      >
        <Text typography="t5" fontWeight="bold" color={theme.textPrimary}>
          스크랩
        </Text>
      </header>

      {savedCards.length === 0 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            top: 52,
            bottom: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <BookmarkIcon size={32} color={theme.textTertiary} />
          <Text typography="t5" fontWeight="bold" color={theme.textSecondary}>
            아직 저장한 카드가 없어요
          </Text>
          <Text typography="st9" color={theme.textTertiary} style={{ textAlign: "center", padding: "0 32px" }}>
            관심 있는 카드를 저장하고 나중에 다시 확인해보세요.
          </Text>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "8px 20px 84px",
          }}
        >
          {savedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              role="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${theme.border}`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  backgroundColor: theme.surfaceAlt,
                }}
              >
                <CardArt card={card} />
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Text typography="st11" fontWeight="bold" color={theme.accent}>
                  {card.category}
                </Text>
                <Text
                  typography="st6"
                  fontWeight="bold"
                  color={theme.textPrimary}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title.replace(/\n/g, " ")}
                </Text>
                <Text typography="st12" color={theme.textTertiary}>
                  {formatShortDate(card.date)}
                </Text>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSave(card.id);
                }}
                aria-label="저장 취소"
                style={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                }}
              >
                <BookmarkIcon size={20} color={theme.accent} filled />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
