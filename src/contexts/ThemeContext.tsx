import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AppTheme, darkTheme, lightTheme } from "../theme";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  theme: AppTheme;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "today-1-minute:theme-mode";

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    document.body.style.backgroundColor = mode === "light" ? "#E9EBEF" : "#05060a";
    const root = document.getElementById("root");
    if (root) root.style.backgroundColor = theme.bg;
  }, [mode, theme.bg]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme,
      toggleMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
