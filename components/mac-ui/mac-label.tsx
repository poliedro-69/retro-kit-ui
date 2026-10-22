import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type MacLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function MacLabel({ required, className, children, ...props }: MacLabelProps) {
  return (
    <label className={cn('inline-flex items-baseline gap-1 font-rt-mono text-[12px] font-bold text-mac-ink', className)} {...props}>
      {children}
      {required ? <span aria-hidden="true">*</span> : null}
    </label>
  )
}

type MacSeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed'
  decorative?: boolean
  className?: string
}

export function MacSeparator({ orientation = 'horizontal', variant = 'solid', decorative = false, className }: MacSeparatorProps) {
  const horizontal = orientation === 'horizontal'
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative || horizontal ? undefined : 'vertical'}
      className={cn(
        horizontal ? 'w-full border-t-2' : 'h-full min-h-4 border-l-2',
        variant === 'dashed' ? 'border-dashed' : 'border-solid',
        'border-mac-ink',
        className,
      )}
    />
  )
}
