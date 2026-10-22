import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const stripes = 'h-3.5 flex-1 bg-[repeating-linear-gradient(0deg,#000_0_1px,transparent_1px_3px)]'

export const macDither =
  'bg-white bg-[radial-gradient(#000_0.75px,transparent_0.75px)] bg-[length:4px_4px]'

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
