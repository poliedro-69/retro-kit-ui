'use client'

import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type RetroTableColumn<T> = {
  key: string
  header: string
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  render?: (row: T) => ReactNode
  sortValue?: (row: T) => string | number
}

type RetroTableProps<T extends object> = {
  label: string
  columns: RetroTableColumn<T>[]
  rows: T[]
  getRowId?: (row: T) => string
  selectedId?: string | null
  defaultSelectedId?: string | null
  onSelectedChange?: (id: string | null) => void
  className?: string
}

type Sort = { key: string; direction: 'asc' | 'desc' } | null

const alignment = { left: 'text-left', right: 'text-right', center: 'text-center' } as const

function defaultRowId(row: object) {
  return String((row as Record<string, unknown>).id)
}

function rawValue<T extends object>(row: T, column: RetroTableColumn<T>): string | number {
  if (column.sortValue) return column.sortValue(row)
  const value = (row as Record<string, unknown>)[column.key]
  return typeof value === 'number' ? value : String(value ?? '')
}

function compare(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export function RetroTable<T extends object>({
  label,
  columns,
  rows,
  getRowId = defaultRowId,
  selectedId,
  defaultSelectedId = null,
  onSelectedChange,
  className,
}: RetroTableProps<T>) {
  const [sort, setSort] = useState<Sort>(null)
  const [innerSelected, setInnerSelected] = useState<string | null>(defaultSelectedId)
  const selected = selectedId !== undefined ? selectedId : innerSelected

  const sortColumn = sort ? columns.find((column) => column.key === sort.key) : undefined
  const sortedRows =
    sort && sortColumn
      ? [...rows].sort((a, b) => compare(rawValue(a, sortColumn), rawValue(b, sortColumn)) * (sort.direction === 'asc' ? 1 : -1))
      : rows

  function cycleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: 'asc' }
      return current.direction === 'asc' ? { key, direction: 'desc' } : null
    })
  }

  function select(id: string) {
    setInnerSelected(id)
    onSelectedChange?.(id)
  }

  function onRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, id: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select(id)
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const sibling = event.key === 'ArrowDown' ? event.currentTarget.nextElementSibling : event.currentTarget.previousElementSibling
      if (sibling instanceof HTMLElement) sibling.focus()
    }
  }

  return (
    <div className={cn('rt-sunken overflow-auto bg-rt-paper', className)}>
      <table className="w-full border-collapse text-[13px] text-rt-ink">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const active = sort?.key === column.key
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : column.sortable ? 'none' : undefined}
                  className="sticky top-0 p-0 font-semibold"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => cycleSort(column.key)}
                      className={cn(
                        'rt-raised flex w-full items-center justify-between gap-2 px-2 py-0.5 select-none active:rt-pressed',
                        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent',
                        alignment[column.align ?? 'left'],
                      )}
                    >
                      <span>{column.header}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 8 8"
                        className={cn('size-2 fill-current', !active && 'opacity-0', active && sort.direction === 'desc' && 'rotate-180')}
                      >
                        <path d="M0 6h8L4 1z" />
                      </svg>
                    </button>
                  ) : (
                    <div className={cn('rt-raised px-2 py-0.5', alignment[column.align ?? 'left'])}>{column.header}</div>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => {
            const id = getRowId(row)
            const isSelected = selected === id
            return (
              <tr
                key={id}
                tabIndex={0}
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => select(id)}
                onKeyDown={(event) => onRowKeyDown(event, id)}
                className={cn(
                  'cursor-default border-b border-rt-face outline-none',
                  'focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-dotted focus-visible:outline-current',
                  isSelected ? 'bg-rt-accent text-rt-on-accent' : 'hover:bg-rt-face-hi',
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn('px-2 py-1 whitespace-nowrap', alignment[column.align ?? 'left'])}>
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
