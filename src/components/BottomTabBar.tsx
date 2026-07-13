import { Text } from "@toss/tds-mobile";

import { useTheme } from "../contexts/ThemeContext";
import { BookmarkIcon, HomeIcon } from "./icons";

export type TabKey = "home" | "mypage";

interface BottomTabBarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  const { theme } = useTheme();

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        borderTop: `1px solid ${theme.border}`,
        backgroundColor: theme.surface,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <button
        onClick={() => onChange("home")}
        aria-label="홈"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: "10px 0",
          background: "none",
          border: "none",
        }}
      >
        <HomeIcon
          size={22}
          color={active === "home" ? theme.accent : theme.textTertiary}
        />
        <Text
          typography="st12"
          fontWeight={active === "home" ? "bold" : "medium"}
          color={active === "home" ? theme.accent : theme.textTertiary}
        >
          홈
        </Text>
      </button>
      <button
        onClick={() => onChange("mypage")}
        aria-label="마이페이지"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: "10px 0",
          background: "none",
          border: "none",
        }}
      >
        <BookmarkIcon
          size={22}
          color={active === "mypage" ? theme.accent : theme.textTertiary}
          filled={active === "mypage"}
        />
        <Text
          typography="st12"
          fontWeight={active === "mypage" ? "bold" : "medium"}
          color={active === "mypage" ? theme.accent : theme.textTertiary}
        >
          마이페이지
        </Text>
      </button>
    </nav>
  );
}
