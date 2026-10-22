'use client'

import { useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type RetroTab = { id: string; label: string; content: ReactNode }

export function RetroTabs({ tabs, className }: { tabs: RetroTab[]; className?: string }) {
  const baseId = useId()
  const [active, setActive] = useState(tabs[0]?.id)
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})

  function onKeyDown(event: KeyboardEvent, index: number) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = tabs[(index + step + tabs.length) % tabs.length]
    setActive(next.id)
    buttons.current[next.id]?.focus()
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div role="tablist" className="flex items-end gap-0.5 px-1">
        {tabs.map((tab, index) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(node) => {
                buttons.current[tab.id] = node
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'rt-raised relative rounded-b-none px-3.5 text-[13px] font-medium transition-[filter] hover:brightness-105',
                'focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-rt-accent',
                selected ? 'z-10 -mb-px h-7.5 border-b-rt-face bg-rt-face' : 'h-6.5 text-rt-ink/75',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="rt-raised rounded-[3px] p-3"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
