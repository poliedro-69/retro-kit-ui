import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'primary'
type Size = 'sm' | 'md'

const base = cn(
  'rt-raised inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-rt-ink select-none',
  'transition-[filter,box-shadow] duration-100 hover:brightness-105',
  'active:rt-pressed active:[&>span]:translate-y-px',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent',
)

const sizes: Record<Size, string> = {
  md: 'min-h-7 px-4',
  sm: 'min-h-5.5 px-2 text-[12px]',
}

type RetroButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export function RetroButton({
  variant = 'default',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: RetroButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        'disabled:cursor-not-allowed disabled:text-rt-shadow disabled:[text-shadow:1px_1px_0_#fff] disabled:hover:brightness-100',
        sizes[size],
        variant === 'primary' && 'enabled:rt-primary enabled:active:rt-primary-pressed',
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5">{children}</span>
    </button>
  )
}

type RetroLinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
}

export function RetroLinkButton({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: RetroLinkButtonProps) {
  return (
    <a
      className={cn(
        base,
        'no-underline',
        sizes[size],
        variant === 'primary' && 'any-link:rt-primary any-link:active:rt-primary-pressed',
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5">{children}</span>
    </a>
  )
}
