'use client'

import { RETRO_FONTS, RETRO_THEMES, RetroButton, RetroSelect } from '@/components/retro-ui'
import { useShowcaseTheme } from '../showcase-theme'

export function ThemePicker() {
  const { theme, font, setTheme, setFont, reset } = useShowcaseTheme()
  const current = RETRO_THEMES.find((entry) => entry.id === theme) ?? RETRO_THEMES[0]
  const isDefault = theme === 'navy' && font === 'plex'

  return (
    <div
      role="group"
      aria-label="Theme settings"
      className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-rt-shadow/60 px-2 py-1.5"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="theme-select" className="font-medium">
          Theme
        </label>
        <span aria-hidden="true" className="flex">
          {current.swatch.map((color) => (
            <span key={color} className="size-3.5 border border-rt-line first:rounded-l-[2px] last:rounded-r-[2px] [&:not(:first-child)]:-ml-px" style={{ backgroundColor: color }} />
          ))}
        </span>
        <RetroSelect id="theme-select" value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)} className="w-44">
          {RETRO_THEMES.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </RetroSelect>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="font-select" className="font-medium">
          Font
        </label>
        <RetroSelect id="font-select" value={font} onChange={(event) => setFont(event.target.value as typeof font)} className="w-56">
          {RETRO_FONTS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </RetroSelect>
      </div>
      <RetroButton size="sm" onClick={reset} disabled={isDefault} className="ml-auto">
        Reset
      </RetroButton>
    </div>
  )
}
