'use client'

import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MacTooltipProps = {
  content: ReactNode
  children: ReactElement<{ 'aria-describedby'?: string }>
  side?: 'top' | 'bottom'
  delay?: number
  className?: string
}

export function MacTooltip({ content, children, side = 'top', delay = 400, className }: MacTooltipProps) {
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
            'pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 rounded-[10px] border-2 border-mac-ink bg-mac-paper px-2.5 py-1 font-rt-mono text-[11px] whitespace-nowrap text-mac-ink shadow-[2px_2px_0_var(--color-mac-ink)]',
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
            className,
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
