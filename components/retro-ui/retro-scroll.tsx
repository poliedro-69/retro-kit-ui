import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type RetroScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  sunken?: boolean
}

export function RetroScrollArea({ label, sunken = true, className, children, ...props }: RetroScrollAreaProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        'rt-scroll overflow-auto text-[13px] text-rt-ink',
        sunken && 'rt-sunken',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rt-accent',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
