/** 앱 전체에서 쓰는 테마 색상. 라이트/다크 모드를 지원해요. */
export interface AppTheme {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentSoft: string;
}

export const lightTheme: AppTheme = {
  bg: "#F5F6F8",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F2F5",
  border: "#E5E7EB",
  textPrimary: "#16181C",
  textSecondary: "#5B616E",
  textTertiary: "#9AA0AC",
  accent: "#FD9B3C",
  accentSoft: "rgba(253, 155, 60, 0.12)",
};

export const darkTheme: AppTheme = {
  bg: "#101114",
  surface: "#1B1D22",
  surfaceAlt: "#24262D",
  border: "#2C2F37",
  textPrimary: "#FFFFFF",
  textSecondary: "#9AA0AC",
  textTertiary: "#6B7280",
  accent: "#FD9B3C",
  accentSoft: "rgba(253, 155, 60, 0.16)",
};
