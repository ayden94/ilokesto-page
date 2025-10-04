"use client"

import { useTheme } from "neato/theme";

export function Toggle() {
  const { setTheme, theme } = useTheme();
  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Theme</button>;
}