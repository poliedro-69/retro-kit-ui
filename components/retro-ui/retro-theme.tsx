import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const RETRO_THEMES = [
  { id: 'navy', name: 'Classic Navy', tone: 'light', swatch: ['#dde0e6', '#2b49c9', '#167a84'] },
  { id: 'hotdog', name: 'Hot Dog Stand', tone: 'light', swatch: ['#ffe14d', '#e01b1b', '#c41515'] },
  { id: 'phosphor', name: 'Phosphor Green', tone: 'dark', swatch: ['#0b1f10', '#33ff77', '#020a04'] },
  { id: 'amber', name: 'Amber Terminal', tone: 'dark', swatch: ['#1c1203', '#ffb000', '#0a0600'] },
  { id: 'rose', name: 'Rose / Pastel', tone: 'light', swatch: ['#f6dfe8', '#d9498a', '#8fcbc0'] },
  { id: 'dark', name: 'Dark Mode', tone: 'dark', swatch: ['#2b2f3a', '#5b7cff', '#0f1a24'] },
] as const

export const RETRO_FONTS = [
  { id: 'plex', name: 'IBM Plex' },
  { id: 'pixel', name: 'Pixel (VT323 + Press Start 2P)' },
  { id: 'system', name: 'System (Chicago-like)' },
  { id: 'mono', name: 'Mono' },
] as const

export type RetroThemeId = (typeof RETRO_THEMES)[number]['id']
export type RetroFontId = (typeof RETRO_FONTS)[number]['id']

type RetroThemeProps = HTMLAttributes<HTMLDivElement> & {
  theme?: RetroThemeId
  font?: RetroFontId
}

export function RetroTheme({ theme = 'navy', font = 'plex', className, children, ...props }: RetroThemeProps) {
  const tone = RETRO_THEMES.find((entry) => entry.id === theme)?.tone ?? 'light'
  return (
    <div
      data-rt-theme={theme}
      data-rt-font={font}
      data-rt-tone={tone}
      className={cn('font-rt', className)}
      {...props}
    >
      {children}
    </div>
  )
}
