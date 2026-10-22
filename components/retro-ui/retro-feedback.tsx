import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function RetroProgress({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn('rt-sunken h-5.5 p-0.5', className)}
    >
      <div
        className="h-full bg-[repeating-linear-gradient(90deg,var(--color-rt-accent)_0_9px,transparent_9px_12px)] transition-[width] duration-200"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

const tones = {
  neutral: 'bg-rt-face text-rt-ink',
  info: 'bg-rt-accent text-rt-on-accent',
  warn: 'bg-rt-warn text-rt-ink',
  ok: 'bg-rt-ok text-rt-on-accent',
  danger: 'bg-rt-danger text-rt-on-accent',
} as const

export function RetroBadge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: keyof typeof tones
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[2px] border border-rt-line px-1.5 py-px font-rt-mono text-[11px] font-semibold tracking-wide uppercase shadow-[1px_1px_0_rgb(0_0_0/0.35)]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
