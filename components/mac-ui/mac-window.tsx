import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const stripes = 'h-3.5 flex-1 bg-[repeating-linear-gradient(0deg,var(--color-mac-ink)_0_1px,transparent_1px_3px)]'

export const macDither =
  'bg-mac-paper bg-[radial-gradient(var(--color-mac-ink)_0.75px,transparent_0.75px)] bg-[length:4px_4px]'

type MacWindowProps = {
  title: string
  titleAs?: 'h3' | 'p'
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function MacWindow({ title, titleAs: Title = 'p', children, className, bodyClassName }: MacWindowProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        'border-2 border-mac-ink bg-mac-paper font-rt-mono text-[12px] text-mac-ink shadow-[3px_3px_0_var(--color-mac-ink)]',
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b-2 border-mac-ink px-1.5 py-1">
        <span aria-hidden="true" className="size-3.5 shrink-0 border-2 border-mac-ink bg-mac-paper" />
        <span aria-hidden="true" className={stripes} />
        <Title className="shrink-0 bg-mac-paper px-1 text-[12px] font-semibold">{title}</Title>
        <span aria-hidden="true" className={stripes} />
        <span aria-hidden="true" className="size-3.5 shrink-0 border-2 border-mac-ink bg-mac-paper" />
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
