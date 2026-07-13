import { Storage } from "@apps-in-toss/web-framework";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "saved-card-ids";

/** 저장한 카드 id 목록을 기기 저장소에 보관해요. */
export function useSavedCards() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Storage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setSavedIds(JSON.parse(value));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id];
      Storage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  return { savedIds, isSaved, toggleSave, loaded };
}
