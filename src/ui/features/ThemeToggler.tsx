'use client'

import { ThemeIcon } from '@/ui/components/icons/ThemeIcon'
import { useTheme } from 'neato/theme'

export function ThemeToggler() {
  const { setTheme, effectiveTheme, theme } = useTheme()

  console.log(effectiveTheme, theme)

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
