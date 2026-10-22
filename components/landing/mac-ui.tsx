import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const stripes = 'h-3.5 flex-1 bg-[repeating-linear-gradient(0deg,#000_0_1px,transparent_1px_3px)]'

export const macDither =
  'bg-white bg-[radial-gradient(#000_0.75px,transparent_0.75px)] bg-[length:4px_4px]'

export function MacWindow({
  title,
  titleAs: Title = 'p',
  children,
  className,
  bodyClassName,
}: {
  title: string
  titleAs?: 'h3' | 'p'
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section
      aria-label={title}
      className={cn(
        'border-2 border-black bg-white font-mono text-[12px] text-black shadow-[3px_3px_0_#000]',
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b-2 border-black px-1.5 py-1">
        <span aria-hidden="true" className="size-3.5 shrink-0 border-2 border-black bg-white" />
        <span aria-hidden="true" className={stripes} />
        <Title className="shrink-0 bg-white px-1 text-[12px] font-semibold">{title}</Title>
        <span aria-hidden="true" className={stripes} />
        <span aria-hidden="true" className="size-3.5 shrink-0 border-2 border-black bg-white" />
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}

export function MacButton({
  isDefault,
  className,
  children,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isDefault?: boolean }) {
  return (
    <button
      type={type}
      className={cn(
        'rounded-[10px] border-2 border-black bg-white px-4 py-0.5 font-mono text-[12px] font-semibold text-black',
        'transition-colors hover:bg-neutral-100 active:bg-black active:text-white',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
        isDefault && 'shadow-[0_0_0_2px_#fff,0_0_0_4px_#000]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
