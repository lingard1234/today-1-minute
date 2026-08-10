import { Text } from "@toss/tds-mobile";

import { useTheme } from "../contexts/ThemeContext";
import { BookmarkIcon, HomeIcon } from "./icons";

export type TabKey = "home" | "mypage";

/**
 * 플로팅 탭바에 가려지지 않도록 각 화면이 콘텐츠 아래에 둬야 하는 여백이에요.
 * 탭바 높이(73) + 화면 하단 띄움(16) + 콘텐츠와의 간격(15) 기준이에요.
 * safe-area는 탭바 위치와 이 여백에 똑같이 더해지므로 기기에서도 간격이 유지돼요.
 */
export const TAB_BAR_CLEARANCE = "calc(env(safe-area-inset-bottom) + 104px)";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: "홈" },
  { key: "mypage", label: "스크랩" },
];

interface BottomTabBarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

/**
 * 앱인토스 미니앱 브랜딩 가이드에 따라 플로팅 형태로 구현한 하단 탭바예요.
 * 화면 가장자리에 붙는 전체 너비 탭바는 토스 앱 자체 하단 탭과 형태가 겹쳐
 * 사용자가 위치를 헷갈릴 수 있어서, 좌우·하단을 띄운 알약 형태를 유지해요.
 */
export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  const { theme } = useTheme();

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "calc(env(safe-area-inset-bottom) + 16px)",
        zIndex: 30,
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        // 탭바 양옆 빈 공간이 아래 콘텐츠 터치를 막지 않게 해요.
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 6,
          borderRadius: 28,
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.floatingShadow,
          pointerEvents: "auto",
        }}
      >
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          const color = isActive ? theme.accent : theme.textTertiary;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              style={{
                width: 72,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "8px 0",
                borderRadius: 22,
                border: "none",
                backgroundColor: isActive ? theme.accentSoft : "transparent",
                cursor: "pointer",
              }}
            >
              {key === "home" ? (
                <HomeIcon size={22} color={color} />
              ) : (
                <BookmarkIcon size={22} color={color} filled={isActive} />
              )}
              <Text
                typography="st12"
                fontWeight={isActive ? "bold" : "medium"}
                color={color}
              >
                {label}
              </Text>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
