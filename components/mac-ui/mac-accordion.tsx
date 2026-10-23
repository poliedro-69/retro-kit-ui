'use client'

import { useId, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type MacAccordionItem = {
  id: string
  title: string
  content: ReactNode
  disabled?: boolean
}

type MacAccordionProps = {
  items: MacAccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string[]
  className?: string
}

export function MacAccordion({ items, type = 'single', defaultValue = [], className }: MacAccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue)
  const baseId = useId()

  function toggle(id: string) {
    setOpen((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id)
      return type === 'single' ? [id] : [...current, id]
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not(:disabled)'))
    const index = triggers.findIndex((trigger) => trigger === document.activeElement)
    if (index < 0) return
    const target =
      event.key === 'ArrowDown'
        ? triggers[(index + 1) % triggers.length]
        : event.key === 'ArrowUp'
          ? triggers[(index - 1 + triggers.length) % triggers.length]
          : event.key === 'Home'
            ? triggers[0]
            : event.key === 'End'
              ? triggers[triggers.length - 1]
              : undefined
    if (target) {
      event.preventDefault()
      target.focus()
    }
  }

  return (
    <div onKeyDown={onKeyDown} className={cn('flex flex-col gap-2 font-rt-mono text-[12px] text-mac-ink', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const triggerId = `${baseId}-trigger-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`
        return (
          <div key={item.id}>
            <button
              id={triggerId}
              type="button"
              data-accordion-trigger=""
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
              className={cn(
                'flex w-full items-center gap-2 border-2 border-mac-ink bg-mac-paper px-2 py-0.5 text-left font-bold select-none',
                'hover:bg-mac-hover aria-expanded:bg-mac-ink aria-expanded:text-mac-paper',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-ink',
                'disabled:cursor-not-allowed disabled:border-mac-dim disabled:text-mac-dim',
              )}
            >
              <svg aria-hidden="true" viewBox="0 0 8 8" className={cn('size-2 shrink-0 fill-current', isOpen && 'rotate-90')}>
                <path d="M1.5 0.5v7L7 4z" />
              </svg>
              {item.title}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="border-2 border-t-0 border-mac-ink bg-mac-paper p-2.5 leading-snug"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
