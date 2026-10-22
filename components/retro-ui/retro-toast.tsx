'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const tones = {
  info: 'bg-rt-accent text-rt-on-accent',
  ok: 'bg-rt-ok text-rt-on-accent',
  warn: 'bg-rt-warn text-rt-ink',
  danger: 'bg-rt-danger text-rt-on-accent',
} as const

type RetroToastProps = {
  title: string
  children: ReactNode
  tone?: keyof typeof tones
  duration?: number
  onClose?: () => void
  className?: string
}

export function RetroToast({ title, children, tone = 'info', duration = 0, onClose, className }: RetroToastProps) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  const pause = useCallback(() => clearTimeout(timer.current), [])

  const resume = useCallback(() => {
    clearTimeout(timer.current)
    if (duration > 0) timer.current = setTimeout(() => onCloseRef.current?.(), duration)
  }, [duration])

  useEffect(() => {
    resume()
    return pause
  }, [resume, pause])

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className={cn('rt-raised w-72 max-w-full p-0.5 shadow-[0_8px_20px_-6px_rgb(0_0_0/0.5)]', className)}
    >
      <div className={cn('flex items-center justify-between gap-2 px-1.5 py-0.5 text-[12px] font-semibold', tones[tone])}>
        <span className="truncate">{title}</span>
        {onClose ? (
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={onClose}
            className="rt-raised grid size-4 shrink-0 place-items-center text-rt-ink active:rt-pressed focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rt-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 8 8" className="size-2 stroke-current" fill="none" strokeWidth="1.6">
              <path d="M1 1l6 6M7 1 1 7" />
            </svg>
          </button>
        ) : null}
      </div>
      <div className="px-2.5 py-2 text-[13px] leading-snug text-rt-ink">{children}</div>
    </div>
  )
}

export function RetroToastRegion({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="region" aria-label="Notifications" className={cn('flex flex-col gap-2', className)}>
      {children}
    </div>
  )
}
