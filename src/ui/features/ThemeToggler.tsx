"use client"

import { MoonIcon } from "@/ui/components/icons/MoonIcon"
import { SunIcon } from "@/ui/components/icons/SunIcon"
import { AnimatePresence, motion } from "framer-motion"
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
      <AnimatePresence initial={false}>
        <span
          style={{
            display: "inline-flex",
            position: "relative",
            width: "1em",
            height: "1em",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {effectiveTheme === "light" ? (
            <motion.span
              key="sun"
              initial={{ rotate: -25, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 25, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.28 }}
              style={{
                display: "inline-flex",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SunIcon />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 25, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -25, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.28 }}
              style={{
                display: "inline-flex",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MoonIcon />
            </motion.span>
          )}
        </span>
      </AnimatePresence>
    </button>
  )
}