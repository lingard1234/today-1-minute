import { Text } from "@toss/tds-mobile";
import { useMemo, useState } from "react";

import { AppHeader } from "../components/AppHeader";
import { BannerAd } from "../components/BannerAd";
import { CardCarousel } from "../components/CardCarousel";
import { DateSelector } from "../components/DateSelector";
import { useTheme } from "../contexts/ThemeContext";
import cards from "../data/cards.json";
import { CardNews } from "../types/card";
import { formatShortDate } from "../utils/date";

interface HomeProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectCard: (id: string) => void;
}

export function Home({ savedIds, onToggleSave, onSelectCard }: HomeProps) {
  const { theme } = useTheme();
  const allCards = cards as CardNews[];

  const availableDates = useMemo(
    () =>
      Array.from(new Set(allCards.map((card) => card.date))).sort((a, b) =>
        b.localeCompare(a),
      ),
    [allCards],
  );

  const [selectedDate, setSelectedDate] = useState(availableDates[0]);

  const cardsForDate = allCards
    .filter((card) => card.date === selectedDate)
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div style={{ backgroundColor: theme.bg }}>
      <AppHeader />

      <div style={{ padding: "16px 20px 0" }}>
        <DateSelector
          selectedDate={selectedDate}
          availableDates={availableDates}
          onSelectDate={setSelectedDate}
        />
        <div style={{ marginTop: 14 }}>
          <Text typography="t1" fontWeight="bold" color={theme.textPrimary}>
            {formatShortDate(selectedDate)}의 하루 1분
          </Text>
        </div>
        <div style={{ marginTop: 4 }}>
          <Text typography="st9" color={theme.textSecondary}>
            좌우로 넘기며 오늘의 소식을 확인해보세요.
          </Text>
        </div>
      </div>

      <div style={{ padding: "14px 0 4px" }}>
        {cardsForDate.length > 0 ? (
          <CardCarousel
            cards={cardsForDate}
            savedIds={savedIds}
            onToggleSave={onToggleSave}
            onSelectCard={onSelectCard}
          />
        ) : (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <Text typography="st9" color={theme.textSecondary}>
              이 날짜의 카드뉴스가 아직 없어요.
            </Text>
          </div>
        )}
      </div>

      <div style={{ padding: "8px 20px 84px" }}>
        <BannerAd />
      </div>
    </div>
  );
}
