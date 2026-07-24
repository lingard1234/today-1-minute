import { getTossShareLink, share } from "@apps-in-toss/web-framework";

import { CardNews } from "../types/card";

// granite.config.ts의 appName과 동일해야 딥링크가 앱으로 열려요.
const APP_DEEP_LINK = "intoss://today-1-minute";

/**
 * 카드 한 장을 친구에게 공유해요.
 * 토스 앱 안에서는 토스 공유 링크(getTossShareLink)를 만들어 네이티브 공유 시트(share)를 띄우고,
 * 토스 밖(로컬 dev, 일반 브라우저)에서는 Web Share API나 클립보드 복사로 자연스럽게 폴백해요.
 */
export async function shareCard(card: CardNews): Promise<void> {
  const headline = card.title.replace(/\n/g, " ");
  const message = `${headline}\n\n하루 1분이면 충분한 오늘의 뉴스, 하루1분에서 확인해보세요.`;

  try {
    const link = await getTossShareLink(APP_DEEP_LINK, card.imageUrl);
    await share({ message: `${message}\n${link}` });
    return;
  } catch {
    // 토스 앱 환경이 아니면 아래 웹 폴백으로 넘어가요.
  }

  try {
    const nav = navigator as Navigator & {
      share?: (data: { title?: string; text?: string }) => Promise<void>;
    };
    if (typeof nav.share === "function") {
      await nav.share({ title: "하루1분", text: message });
      return;
    }
    await navigator.clipboard.writeText(message);
  } catch {
    // 사용자가 공유를 취소했거나 클립보드 접근이 막힌 경우 — 조용히 무시해요.
  }
}
