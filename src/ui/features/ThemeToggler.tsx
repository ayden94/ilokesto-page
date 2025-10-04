"use client"

import { ThemeIcon } from "@/ui/components/icons/ThemeIcon"
import { useTheme } from "neato/theme"

export function ThemeToggler() {
  const { setTheme, effectiveTheme } = useTheme()

  return (
    <button
      className="theme-toggler"
      type="button"
      onClick={() => {
        setTheme(effectiveTheme === "light" ? "dark" : "light")
      }}
    >
      <ThemeIcon theme={effectiveTheme} />
    </button>
  )
}