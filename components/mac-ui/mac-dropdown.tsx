'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type MacMenuItem =
  | { separator: true }
  | { label: string; shortcut?: string; disabled?: boolean; onSelect?: () => void }

type MacDropdownMenuProps = {
  label: string
  items: MacMenuItem[]
  align?: 'start' | 'end'
  className?: string
}

const enabledIndices = (items: MacMenuItem[]) =>
  items.flatMap((item, index) => ('separator' in item || item.disabled ? [] : [index]))

export function MacDropdownMenu({ label, items, align = 'start', className }: MacDropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const initialFocus = useRef<'first' | 'last'>('first')
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const list = enabledIndices(items)
    const target = initialFocus.current === 'last' ? list[list.length - 1] : list[0]
    itemRefs.current[target]?.focus()
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, items])

  function close(refocus: boolean) {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }

  function openWith(position: 'first' | 'last') {
    initialFocus.current = position
    setOpen(true)
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openWith(event.key === 'ArrowDown' ? 'first' : 'last')
    }
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const list = enabledIndices(items)
    const position = list.indexOf(itemRefs.current.findIndex((el) => el === document.activeElement))
    const focusAt = (index: number | undefined) => {
      if (index !== undefined) itemRefs.current[index]?.focus()
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusAt(list[(position + 1) % list.length])
        break
      case 'ArrowUp':
        event.preventDefault()
        focusAt(position <= 0 ? list[list.length - 1] : list[position - 1])
        break
      case 'Home':
        event.preventDefault()
        focusAt(list[0])
        break
      case 'End':
        event.preventDefault()
        focusAt(list[list.length - 1])
        break
      case 'Escape':
        event.preventDefault()
        close(true)
        break
      case 'Tab':
        close(false)
        break
    }
  }

  return (
    <div ref={rootRef} className={cn('relative inline-block font-rt-mono text-[12px] text-mac-ink', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openWith('first'))}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'flex items-center gap-3 border-2 border-mac-ink bg-mac-paper px-3 py-0.5 font-semibold shadow-[2px_2px_0_var(--color-mac-ink)] select-none',
          'hover:bg-mac-hover aria-expanded:bg-mac-ink aria-expanded:text-mac-paper',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-ink',
        )}
      >
        {label}
        <svg aria-hidden="true" viewBox="0 0 8 8" className="size-2 fill-current">
          <path d="M0 2h8L4 7z" />
        </svg>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={cn(
            'absolute top-full z-20 min-w-44 border-2 border-mac-ink bg-mac-paper py-0.5 shadow-[3px_3px_0_var(--color-mac-ink)]',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, index) =>
            'separator' in item ? (
              <div key={`separator-${index}`} role="separator" className="my-0.5 border-t border-dashed border-mac-ink" />
            ) : (
              <button
                key={item.label}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                type="button"
                role="menuitem"
                tabIndex={-1}
                disabled={item.disabled}
                onMouseEnter={(event) => event.currentTarget.focus()}
                onClick={() => {
                  item.onSelect?.()
                  close(true)
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-6 px-3 py-0.5 text-left',
                  'focus-visible:bg-mac-ink focus-visible:text-mac-paper focus-visible:outline-none',
                  'disabled:cursor-not-allowed disabled:text-mac-dim',
                )}
              >
                <span>{item.label}</span>
                {item.shortcut ? <span>{item.shortcut}</span> : null}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}
