'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type RetroMenuItem =
  | { separator: true }
  | { label: string; shortcut?: string; disabled?: boolean; onSelect?: () => void }

type RetroDropdownMenuProps = {
  label: string
  items: RetroMenuItem[]
  align?: 'start' | 'end'
  className?: string
}

const enabledIndices = (items: RetroMenuItem[]) =>
  items.flatMap((item, index) => ('separator' in item || item.disabled ? [] : [index]))

export function RetroDropdownMenu({ label, items, align = 'start', className }: RetroDropdownMenuProps) {
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
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openWith('first'))}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'rt-raised inline-flex min-h-7 items-center gap-2 px-3 text-[13px] font-medium text-rt-ink select-none',
          'hover:brightness-105 active:rt-pressed aria-expanded:rt-pressed',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent',
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
            'rt-raised absolute top-full z-20 mt-1 min-w-48 p-0.5 shadow-[0_8px_20px_-6px_rgb(0_0_0/0.5)]',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, index) =>
            'separator' in item ? (
              <div
                key={`separator-${index}`}
                role="separator"
                className="mx-1 my-0.5 h-px bg-rt-shadow shadow-[0_1px_0_var(--color-rt-light)]"
              />
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
                  'flex w-full items-center justify-between gap-6 rounded-[2px] px-3 py-1 text-left text-[13px] text-rt-ink',
                  'focus-visible:bg-rt-accent focus-visible:text-rt-on-accent focus-visible:outline-none',
                  'disabled:cursor-not-allowed disabled:text-rt-shadow disabled:[text-shadow:1px_1px_0_var(--color-rt-light)]',
                )}
              >
                <span>{item.label}</span>
                {item.shortcut ? <span className="font-mono text-[11px] opacity-70">{item.shortcut}</span> : null}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}
