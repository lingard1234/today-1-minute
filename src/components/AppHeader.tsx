import { useTheme } from "../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "./icons";

// 앱인토스 콘솔에 등록된 미니앱 아이콘이에요. (고정값)
// SDK 3.x부터 설정 파일의 brand에서 icon이 빠져서 여기에 직접 둬요.
const APP_ICON_URL =
  "https://static.toss.im/appsintoss/47057/73a4786d-bc38-43ea-bf16-fc934a509d5c.png";

export function AppHeader() {
  const { theme, mode, toggleMode } = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 52,
        padding: "0 20px",
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <img
        src={APP_ICON_URL}
        alt="하루1분"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          objectFit: "cover",
        }}
      />

      <button
        onClick={toggleMode}
        aria-label={mode === "light" ? "다크 모드 켜기" : "라이트 모드 켜기"}
        style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          border: "none",
          backgroundColor: theme.surfaceAlt,
        }}
      >
        {mode === "light" ? (
          <MoonIcon size={17} color={theme.textSecondary} />
        ) : (
          <SunIcon size={17} color={theme.accent} />
        )}
      </button>
    </header>
  );
}
