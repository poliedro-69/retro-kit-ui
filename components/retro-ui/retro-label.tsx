import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type RetroLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function RetroLabel({ required, className, children, ...props }: RetroLabelProps) {
  return (
    <label className={cn('inline-flex items-baseline gap-1 text-[13px] font-medium text-rt-ink', className)} {...props}>
      {children}
      {required ? (
        <span aria-hidden="true" className="text-rt-danger">
          *
        </span>
      ) : null}
    </label>
  )
}

type RetroSeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
}

export function RetroSeparator({ orientation = 'horizontal', decorative = false, className }: RetroSeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative || orientation === 'horizontal' ? undefined : 'vertical'}
      className={cn(
        orientation === 'horizontal'
          ? 'h-0.5 w-full bg-[linear-gradient(to_bottom,var(--color-rt-shadow)_0_1px,var(--color-rt-light)_1px_2px)]'
          : 'h-full min-h-4 w-0.5 bg-[linear-gradient(to_right,var(--color-rt-shadow)_0_1px,var(--color-rt-light)_1px_2px)]',
        className,
      )}
    />
  )
}
