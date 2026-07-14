import { TossAds } from "@apps-in-toss/web-framework";
import { useEffect, useRef, useState } from "react";

// 앱인토스 콘솔 > 수익화 > 인앱 광고에서 발급받은 배너 광고 그룹 ID예요. (고정값)
const AD_GROUP_ID = "ait.v2.live.004bb5eac3cf4fcd";

export function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!TossAds.attachBanner.isSupported()) return;
      setSupported(true);

      const banner = TossAds.attachBanner(AD_GROUP_ID, containerRef.current, {
        variant: "card",
      });

      return () => banner.destroy();
    } catch {
      // 토스 앱 환경이 아닐 때(예: 로컬 vite dev)는 브릿지가 주입되지 않아 무시해요.
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: supported ? 96 : 0,
        borderRadius: 16,
      }}
    />
  );
}
