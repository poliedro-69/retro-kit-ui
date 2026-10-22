'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RetroWindowProps = {
  title: string
  children: ReactNode
  menu?: ReactNode
  status?: ReactNode
  onClose?: () => void
  resizable?: boolean
  maximizable?: boolean
  minimizable?: boolean
  defaultMaximized?: boolean
  defaultMinimized?: boolean
  className?: string
  bodyClassName?: string
  titleAs?: 'h2' | 'h3' | 'p'
}

function TitleGlyph({ kind }: { kind: 'min' | 'max' }) {
  return (
    <svg viewBox="0 0 8 8" className="size-2 fill-current" aria-hidden="true">
      {kind === 'min' ? <path d="M0 2h8L4 7z" /> : <path d="M0 6h8L4 1z" />}
    </svg>
  )
}

export function RetroWindow({
  title,
  children,
  menu,
  status,
  onClose,
  resizable = true,
  maximizable = true,
  minimizable = true,
  defaultMaximized = false,
  defaultMinimized = false,
  className,
  bodyClassName,
  titleAs: Title = 'h2',
}: RetroWindowProps) {
  const [maximized, setMaximized] = useState(defaultMaximized)
  const [minimized, setMinimized] = useState(defaultMinimized)
  const boxClass =
    'rt-raised flex size-5.5 shrink-0 items-center justify-center text-rt-ink'

  return (
    <section
      aria-label={title}
      className={cn(
        'flex flex-col rounded-[5px] border border-rt-line bg-rt-face p-0.75 font-rt text-[13px] text-rt-ink',
        'shadow-[inset_1px_1px_0_var(--color-rt-light),0_2px_0_rgb(0_0_0/0.25),0_16px_32px_-12px_rgb(0_0_0/0.55)]',
        resizable && !maximized && 'resize overflow-auto',
        maximized && 'fixed inset-2 z-50 size-auto max-h-[calc(100vh-1rem)] max-w-none',
        className,
      )}
    >
      <header className="flex items-stretch gap-0.75">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close window"
            className={cn(
              boxClass,
              'transition-colors hover:bg-rt-light active:rt-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent',
            )}
          >
            <span className="block h-0.75 w-3 rounded-[1px] border border-rt-line bg-rt-paper" />
          </button>
        ) : (
          <span aria-hidden="true" className={boxClass}>
            <span className="block h-0.75 w-3 rounded-[1px] border border-rt-line bg-rt-paper" />
          </span>
        )}
        <Title className="rt-title flex h-5.5 min-w-0 flex-1 items-center truncate rounded-[2px] px-2.5 font-rt-mono text-[11px] font-semibold tracking-widest uppercase">
          {title}
        </Title>
        {minimizable ? (
          <button
            type="button"
            onClick={() => setMinimized((value) => !value)}
            aria-label={minimized ? 'Restore window' : 'Minimize window'}
            aria-pressed={minimized}
            className={cn(boxClass, 'transition-colors hover:bg-rt-light active:rt-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent')}
          >
            <TitleGlyph kind="min" />
          </button>
        ) : (
          <span aria-hidden="true" className={boxClass}>
            <TitleGlyph kind="min" />
          </span>
        )}
        {maximizable ? (
          <button
            type="button"
            onClick={() => setMaximized((value) => !value)}
            aria-label={maximized ? 'Restore window' : 'Maximize window'}
            aria-pressed={maximized}
            className={cn(boxClass, 'transition-colors hover:bg-rt-light active:rt-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent')}
          >
            <TitleGlyph kind="max" />
          </button>
        ) : (
          <span aria-hidden="true" className={boxClass}>
            <TitleGlyph kind="max" />
          </span>
        )}
      </header>

      {!minimized ? (
        <>
          {menu ? <div className="mt-0.75">{menu}</div> : null}

          <div className={cn('mt-0.75 flex-1 border-t border-rt-shadow/60', bodyClassName)}>{children}</div>

          {status ? (
            <footer className="rt-sunken mt-0.75 flex items-center gap-2 px-2 py-0.5 text-[12px]">
              {status}
            </footer>
          ) : null}
        </>
      ) : null}
    </section>
  )
}
