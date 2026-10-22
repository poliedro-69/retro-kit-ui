'use client'

import { cn } from '@/lib/utils'
import type { ExplorerKit } from './types'

type ComponentTreeProps = {
  kits: ExplorerKit[]
  expanded: Set<string>
  selectedId: string
  onToggle: (id: string) => void
  onSelect: (id: string) => void
}

const rowBase =
  'flex w-full items-center gap-1.5 py-0.5 pr-2 text-left text-[13px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent'

function Folder({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 14" aria-hidden="true" className="size-4 shrink-0">
      <path
        d={open ? 'M1 3h5l1.5 1.5H14V12H1Z' : 'M1 2h5l1.5 1.5H15V12H1Z'}
        fill="#f3d36b"
        stroke="#000"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Doc() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0">
      <path d="M3 1.5h6.5L13 5v9.5H3Z" fill="#fff" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
      <path d="M9.5 1.5V5H13M5 8h6M5 10.5h6" fill="none" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

export function ComponentTree({ kits, expanded, selectedId, onToggle, onSelect }: ComponentTreeProps) {
  return (
    <nav aria-label="Component tree" className="text-rt-ink">
      <ul className="flex flex-col">
        {kits.map((kit) => {
          const kitOpen = expanded.has(kit.id)
          return (
            <li key={kit.id}>
              <button
                type="button"
                aria-expanded={kitOpen}
                onClick={() => onToggle(kit.id)}
                className={cn(rowBase, 'pl-1 font-semibold hover:bg-rt-face-hi')}
              >
                <span aria-hidden="true" className="w-3 text-center font-mono text-[11px]">
                  {kitOpen ? '−' : '+'}
                </span>
                <Folder open={kitOpen} />
                <span className="truncate">{kit.name}</span>
              </button>
              {kitOpen ? (
                <ul className="ml-3 border-l border-dotted border-rt-shadow">
                  {kit.categories.map((category) => {
                    const catOpen = expanded.has(category.id)
                    return (
                      <li key={category.id}>
                        <button
                          type="button"
                          aria-expanded={catOpen}
                          onClick={() => onToggle(category.id)}
                          className={cn(rowBase, 'pl-1 hover:bg-rt-face-hi')}
                        >
                          <span aria-hidden="true" className="w-3 text-center font-mono text-[11px]">
                            {catOpen ? '−' : '+'}
                          </span>
                          <Folder open={catOpen} />
                          <span className="truncate">{category.name}</span>
                          <span className="ml-auto text-[11px] text-rt-shadow">{category.items.length}</span>
                        </button>
                        {catOpen ? (
                          <ul className="ml-3 border-l border-dotted border-rt-shadow">
                            {category.items.map((item) => {
                              const selected = item.id === selectedId
                              return (
                                <li key={item.id}>
                                  <button
                                    type="button"
                                    aria-current={selected ? 'true' : undefined}
                                    onClick={() => onSelect(item.id)}
                                    className={cn(
                                      rowBase,
                                      'pl-3',
                                      selected ? 'bg-rt-accent text-white' : 'hover:bg-rt-face-hi',
                                    )}
                                  >
                                    <Doc />
                                    <span className="truncate">{item.name}</span>
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
