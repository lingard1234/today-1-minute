import { CardNews } from "../types/card";
import { CardThumb } from "./CardThumb";

interface CardCarouselProps {
  cards: CardNews[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectCard: (id: string) => void;
}

export function CardCarousel({
  cards,
  savedIds,
  onToggleSave,
  onSelectCard,
}: CardCarouselProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        padding: "0 20px 4px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          style={{
            flex: "0 0 auto",
            width: "84%",
            maxWidth: 340,
            scrollSnapAlign: "start",
          }}
        >
          <CardThumb
            card={card}
            onClick={() => onSelectCard(card.id)}
            saved={savedIds.includes(card.id)}
            onToggleSave={() => onToggleSave(card.id)}
          />
        </div>
      ))}
    </div>
  );
}
