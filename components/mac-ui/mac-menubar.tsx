'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type MacMenu = { label: string; items: string[] }

type MacMenubarProps = {
  menus: MacMenu[]
  label?: string
  className?: string
  onSelect?: (menu: string, item: string) => void
}

export function MacMenubar({ menus, label = 'Menu', className, onSelect }: MacMenubarProps) {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open === null) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={ref}
      role="menubar"
      aria-label={label}
      className={cn(
        'flex items-center gap-1 border-b-2 border-mac-ink bg-mac-paper px-2 font-rt-mono text-[12px] font-semibold text-mac-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="mr-2 size-3 rounded-full bg-mac-ink" />
      {menus.map((menu, index) => {
        const isOpen = open === index
        return (
          <div key={menu.label} role="none" className="relative">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              onMouseEnter={() => open !== null && setOpen(index)}
              className={cn(
                'px-2 py-0.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mac-ink',
                isOpen ? 'bg-mac-ink text-mac-paper' : 'hover:bg-mac-hover',
              )}
            >
              {menu.label}
            </button>
            {isOpen ? (
              <ul
                role="menu"
                aria-label={menu.label}
                className="absolute top-full left-0 z-10 min-w-36 border-2 border-mac-ink bg-mac-paper py-0.5 font-normal shadow-[3px_3px_0_var(--color-mac-ink)]"
              >
                {menu.items.map((item) => (
                  <li key={item} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onSelect?.(menu.label, item)
                        setOpen(null)
                      }}
                      className="block w-full px-3 py-0.5 text-left hover:bg-mac-ink hover:text-mac-paper focus-visible:bg-mac-ink focus-visible:text-mac-paper focus-visible:outline-none"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
