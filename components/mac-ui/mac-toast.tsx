'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MacToastProps = {
  title: string
  children: ReactNode
  urgent?: boolean
  duration?: number
  onClose?: () => void
  className?: string
}

export function MacToast({ title, children, urgent = false, duration = 0, onClose, className }: MacToastProps) {
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
      role={urgent ? 'alert' : 'status'}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className={cn('w-72 max-w-full border-2 border-mac-ink bg-mac-paper font-rt-mono text-[12px] text-mac-ink shadow-[3px_3px_0_var(--color-mac-ink)]', className)}
    >
      <div className="relative flex items-center justify-center border-b-2 border-mac-ink px-6 py-0.5 font-bold">
        {onClose ? (
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={onClose}
            className="absolute left-1.5 size-3.5 border-2 border-mac-ink bg-mac-paper hover:bg-mac-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-mac-ink"
          />
        ) : null}
        <span className="truncate">{title}</span>
      </div>
      <div className="px-3 py-2 leading-snug">{children}</div>
    </div>
  )
}

export function MacToastRegion({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="region" aria-label="Notifications" className={cn('flex flex-col gap-3', className)}>
      {children}
    </div>
  )
}
