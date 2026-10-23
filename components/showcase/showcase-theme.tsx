'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { RetroTheme, type RetroFontId, type RetroThemeId } from '@/components/retro-ui'

type ShowcaseThemeValue = {
  theme: RetroThemeId
  font: RetroFontId
  setTheme: (theme: RetroThemeId) => void
  setFont: (font: RetroFontId) => void
  reset: () => void
}

const ShowcaseThemeContext = createContext<ShowcaseThemeValue | null>(null)

export function useShowcaseTheme() {
  const value = useContext(ShowcaseThemeContext)
  if (!value) throw new Error('useShowcaseTheme must be used inside <ShowcaseThemeShell>')
  return value
}

export function ShowcaseThemeShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<RetroThemeId>('navy')
  const [font, setFont] = useState<RetroFontId>('plex')

  const value = useMemo(
    () => ({
      theme,
      font,
      setTheme,
      setFont,
      reset: () => {
        setTheme('navy')
        setFont('plex')
      },
    }),
    [theme, font],
  )

  return (
    <ShowcaseThemeContext.Provider value={value}>
      <RetroTheme theme={theme} font={font} className="rt-desktop min-h-screen px-4 pb-8 pt-0">
        {children}
      </RetroTheme>
    </ShowcaseThemeContext.Provider>
  )
}
