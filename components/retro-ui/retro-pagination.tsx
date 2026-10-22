'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type PageItem = number | 'ellipsis-start' | 'ellipsis-end'

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, index) => start + index)

function getPages(page: number, pageCount: number, siblings: number): PageItem[] {
  if (pageCount <= siblings * 2 + 5) return range(1, pageCount)
  const leftSibling = Math.max(page - siblings, 1)
  const rightSibling = Math.min(page + siblings, pageCount)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < pageCount - 2

  if (!showLeftEllipsis) return [...range(1, 3 + siblings * 2), 'ellipsis-end', pageCount]
  if (!showRightEllipsis) return [1, 'ellipsis-start', ...range(pageCount - (2 + siblings * 2), pageCount)]
  return [1, 'ellipsis-start', ...range(leftSibling, rightSibling), 'ellipsis-end', pageCount]
}

type RetroPaginationProps = {
  pageCount: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  siblings?: number
  label?: string
  className?: string
}

const buttonClass = cn(
  'rt-raised inline-flex h-7 min-w-7 items-center justify-center px-2 text-[13px] font-medium text-rt-ink select-none',
  'hover:brightness-105 active:rt-pressed',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent',
  'disabled:cursor-not-allowed disabled:text-rt-shadow disabled:[text-shadow:1px_1px_0_var(--color-rt-light)] disabled:hover:brightness-100',
)

export function RetroPagination({
  pageCount,
  page,
  defaultPage = 1,
  onPageChange,
  siblings = 1,
  label = 'Pagination',
  className,
}: RetroPaginationProps) {
  const [innerPage, setInnerPage] = useState(defaultPage)
  const current = Math.min(Math.max(page ?? innerPage, 1), pageCount)

  function goTo(next: number) {
    const clamped = Math.min(Math.max(next, 1), pageCount)
    setInnerPage(clamped)
    onPageChange?.(clamped)
  }

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => goTo(current - 1)} className={buttonClass}>
            Prev
          </button>
        </li>
        {getPages(current, pageCount, siblings).map((item) => (
          <li key={item}>
            {typeof item === 'number' ? (
              <button
                type="button"
                aria-label={`Page ${item}`}
                aria-current={item === current ? 'page' : undefined}
                onClick={() => goTo(item)}
                className={cn(buttonClass, item === current && 'rt-pressed font-bold')}
              >
                {item}
              </button>
            ) : (
              <span aria-hidden="true" className="inline-flex h-7 min-w-5 items-end justify-center pb-1 text-rt-ink">
                ...
              </span>
            )}
          </li>
        ))}
        <li>
          <button type="button" aria-label="Next page" disabled={current === pageCount} onClick={() => goTo(current + 1)} className={buttonClass}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
