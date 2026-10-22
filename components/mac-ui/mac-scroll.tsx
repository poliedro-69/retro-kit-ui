import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type MacScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  framed?: boolean
}

export function MacScrollArea({ label, framed = true, className, children, ...props }: MacScrollAreaProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        'mac-scroll overflow-auto bg-mac-paper font-rt-mono text-[12px] text-mac-ink',
        framed && 'border-2 border-mac-ink',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-ink',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
