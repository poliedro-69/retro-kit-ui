import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function MacProgress({ value, label, className }: { value: number; label: string; className?: string }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn('h-4 border-2 border-black bg-white p-px', className)}
    >
      <div className="h-full bg-black" style={{ width: `${clamped}%` }} />
    </div>
  )
}

type MacAlertProps = {
  label: string
  children: ReactNode
  actions?: ReactNode
  className?: string
}

export function MacAlert({ label, children, actions, className }: MacAlertProps) {
  return (
    <div
      role="alertdialog"
      aria-label={label}
      className={cn('border-2 border-black bg-white p-0.5 shadow-[3px_3px_0_#000]', className)}
    >
      <div className="border-2 border-black p-3 font-mono text-[12px] text-black">
        <div className="flex gap-3">
          <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 shrink-0">
            <path d="M16 3 30 28H2Z" fill="#fff" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 12v8M16 23.5v1" stroke="#000" strokeWidth="3" />
          </svg>
          <div className="leading-snug">{children}</div>
        </div>
        {actions ? <div className="mt-3 flex justify-end gap-4 pr-1">{actions}</div> : null}
      </div>
    </div>
  )
}
