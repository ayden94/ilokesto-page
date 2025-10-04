'use client'

import { useTheme } from 'neato/theme'
import { ThemeIcon } from '../components/icons/ThemeIcon'

export function ThemeToggler() {
  const { setTheme, effectiveTheme } = useTheme()

  return (
    <button
      className="theme-toggler"
      type="button"
      onClick={() => {
        setTheme(effectiveTheme === 'light' ? 'dark' : 'light')
      }}
    >
      <ThemeIcon theme={effectiveTheme} />
    </button>
  )
}
