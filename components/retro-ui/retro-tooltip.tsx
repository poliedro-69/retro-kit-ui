'use client'

import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RetroTooltipProps = {
  content: ReactNode
  children: ReactElement<{ 'aria-describedby'?: string }>
  side?: 'top' | 'bottom'
  delay?: number
  className?: string
}

export function RetroTooltip({ content, children, side = 'top', delay = 400, className }: RetroTooltipProps) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const tooltipId = useId()

  useEffect(() => () => clearTimeout(timer.current), [])

  function show(immediate: boolean) {
    clearTimeout(timer.current)
    if (immediate) setOpen(true)
    else timer.current = setTimeout(() => setOpen(true), delay)
  }

  function hide() {
    clearTimeout(timer.current)
    setOpen(false)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => show(false)}
      onMouseLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
      onKeyDown={(event) => {
        if (event.key === 'Escape') hide()
      }}
    >
      {cloneElement(children, { 'aria-describedby': open ? tooltipId : undefined })}
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 border border-rt-line bg-rt-warn px-1.5 py-0.5 text-[12px] whitespace-nowrap text-rt-ink shadow-[2px_2px_0_rgb(0_0_0/0.4)]',
            side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
            className,
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
