import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type MacButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { isDefault?: boolean }

export function MacButton({ isDefault, className, children, type = 'button', ...props }: MacButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'rounded-[10px] border-2 border-mac-ink bg-mac-paper px-4 py-0.5 font-rt-mono text-[12px] font-semibold text-mac-ink',
        'transition-colors hover:bg-mac-hover active:bg-mac-ink active:text-mac-paper',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mac-ink',
        'disabled:cursor-not-allowed disabled:border-dashed disabled:text-mac-dim disabled:hover:bg-mac-paper',
        isDefault && 'shadow-[0_0_0_2px_var(--color-mac-paper),0_0_0_4px_var(--color-mac-ink)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
