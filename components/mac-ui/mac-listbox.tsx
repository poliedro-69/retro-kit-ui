'use client'

import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type MacListboxOption = { value: string; label: string; disabled?: boolean }

type MacListboxProps = {
  options: MacListboxOption[]
  label: string
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  className?: string
  listClassName?: string
}

export function MacListbox({
  options,
  label,
  multiple = false,
  value,
  defaultValue = [],
  onValueChange,
  className,
  listClassName,
}: MacListboxProps) {
  const baseId = useId()
  const labelId = `${baseId}-label`
  const listRef = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState(defaultValue)
  const selected = value ?? internal
  const [active, setActive] = useState(() => {
    const index = options.findIndex((option) => selected.includes(option.value) && !option.disabled)
    return index >= 0 ? index : Math.max(0, options.findIndex((option) => !option.disabled))
  })

  const optionId = (index: number) => `${baseId}-option-${index}`

  function commit(next: string[]) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  function choose(index: number) {
    const option = options[index]
    if (!option || option.disabled) return
    setActive(index)
    if (multiple) {
      commit(selected.includes(option.value) ? selected.filter((v) => v !== option.value) : [...selected, option.value])
    } else {
      commit([option.value])
    }
  }

  function step(from: number, direction: 1 | -1) {
    let index = from + direction
    while (index >= 0 && index < options.length && options[index].disabled) index += direction
    return index >= 0 && index < options.length ? index : from
  }

  function moveTo(index: number) {
    if (index < 0 || index >= options.length) return
    setActive(index)
    listRef.current?.children[index]?.scrollIntoView({ block: 'nearest' })
    if (!multiple) choose(index)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault()
        moveTo(step(active, event.key === 'ArrowDown' ? 1 : -1))
        break
      case 'Home':
        event.preventDefault()
        moveTo(step(-1, 1))
        break
      case 'End':
        event.preventDefault()
        moveTo(step(options.length, -1))
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        choose(active)
        break
    }
  }

  return (
    <div className={cn('flex flex-col gap-1 font-rt-mono text-[12px] text-mac-ink', className)}>
      <span id={labelId} className="font-semibold">
        {label}
      </span>
      <div
        ref={listRef}
        role="listbox"
        aria-labelledby={labelId}
        aria-multiselectable={multiple || undefined}
        aria-activedescendant={optionId(active)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          'group mac-scroll h-32 overflow-auto border-2 border-mac-ink bg-mac-paper',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-ink',
          listClassName,
        )}
      >
        {options.map((option, index) => {
          const isSelected = selected.includes(option.value)
          return (
            <div
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              aria-disabled={option.disabled || undefined}
              onClick={() => choose(index)}
              className={cn(
                'cursor-pointer px-2 py-0.5 select-none',
                isSelected ? 'bg-mac-ink text-mac-paper' : 'hover:bg-mac-hover',
                index === active &&
                  'group-focus-visible:outline-1 group-focus-visible:-outline-offset-3 group-focus-visible:outline-dotted group-focus-visible:outline-current',
                option.disabled && 'cursor-not-allowed text-mac-dim hover:bg-transparent',
              )}
            >
              {option.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
