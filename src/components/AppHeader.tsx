import config from "../../granite.config.ts";
import { useTheme } from "../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "./icons";

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
        src={config.brand.icon}
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
