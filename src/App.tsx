import { useState } from "react";

import { BottomTabBar, TabKey } from "./components/BottomTabBar";
import cards from "./data/cards.json";
import { useSavedCards } from "./hooks/useSavedCards";
import { Detail } from "./screens/Detail";
import { Home } from "./screens/Home";
import { MyPage } from "./screens/MyPage";
import { CardNews } from "./types/card";

function App() {
  const [tab, setTab] = useState<TabKey>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { savedIds, toggleSave } = useSavedCards();

  const selectedCard = (cards as CardNews[]).find(
    (card) => card.id === selectedId,
  );

  if (selectedCard) {
    return (
      <Detail
        card={selectedCard}
        onBack={() => setSelectedId(null)}
        saved={savedIds.includes(selectedCard.id)}
        onToggleSave={() => toggleSave(selectedCard.id)}
      />
    );
  }

  return (
    <>
      {tab === "home" ? (
        <Home
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelectCard={setSelectedId}
        />
      ) : (
        <MyPage
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelectCard={setSelectedId}
        />
      )}
      <BottomTabBar active={tab} onChange={setTab} />
    </>
  );
}

export default App;
