'use client'

import { cn } from '@/lib/utils'

type RetroMenubarProps = {
  items: string[]
  label?: string
  className?: string
  onSelect?: (item: string) => void
}

export function RetroMenubar({ items, label = 'Menu', className, onSelect }: RetroMenubarProps) {
  return (
    <nav aria-label={label} className={cn('flex gap-0.5 px-0.5', className)}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect?.(item)}
          className="rounded-[2px] px-2 py-0.5 text-[13px] transition-colors hover:bg-rt-accent hover:text-rt-on-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent"
        >
          <u className="underline-offset-2">{item[0]}</u>
          {item.slice(1)}
        </button>
      ))}
    </nav>
  )
}
