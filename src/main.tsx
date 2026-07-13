import { TossAds } from "@apps-in-toss/web-framework";
import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import config from "../granite.config.ts";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./index.css";

try {
  if (TossAds.initialize.isSupported()) {
    TossAds.initialize({});
  }
} catch {
  // 토스 앱 환경이 아닐 때(예: 로컬 vite dev)는 브릿지가 주입되지 않아 무시해요.
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TDSMobileAITProvider brandPrimaryColor={config.brand.primaryColor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TDSMobileAITProvider>
  </StrictMode>,
);
