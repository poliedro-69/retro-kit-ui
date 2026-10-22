import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type MacButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { isDefault?: boolean }

export function MacButton({ isDefault, className, children, type = 'button', ...props }: MacButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'rounded-[10px] border-2 border-black bg-white px-4 py-0.5 font-mono text-[12px] font-semibold text-black',
        'transition-colors hover:bg-neutral-100 active:bg-black active:text-white',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
        'disabled:cursor-not-allowed disabled:border-dashed disabled:text-neutral-500 disabled:hover:bg-white',
        isDefault && 'shadow-[0_0_0_2px_#fff,0_0_0_4px_#000]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
