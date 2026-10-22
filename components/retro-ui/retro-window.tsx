import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RetroWindowProps = {
  title: string
  children: ReactNode
  menu?: ReactNode
  status?: ReactNode
  onClose?: () => void
  className?: string
  bodyClassName?: string
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
  className,
  bodyClassName,
}: RetroWindowProps) {
  const boxClass =
    'rt-raised flex size-5.5 shrink-0 items-center justify-center text-rt-ink'

  return (
    <section
      aria-label={title}
      className={cn(
        'flex flex-col rounded-[5px] border border-rt-line bg-rt-face p-0.75 text-[13px] text-rt-ink',
        'shadow-[inset_1px_1px_0_#fff,0_2px_0_rgb(0_0_0/0.25),0_16px_32px_-12px_rgb(0_0_0/0.55)]',
        className,
      )}
    >
      <header className="flex items-stretch gap-0.75">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className={cn(
              boxClass,
              'transition-colors hover:bg-white active:rt-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent',
            )}
          >
            <span className="block h-0.75 w-3 rounded-[1px] border border-rt-line bg-white" />
          </button>
        ) : (
          <span aria-hidden="true" className={boxClass}>
            <span className="block h-0.75 w-3 rounded-[1px] border border-rt-line bg-white" />
          </span>
        )}
        <h2 className="rt-title flex h-5.5 min-w-0 flex-1 items-center truncate rounded-[2px] px-2.5 font-mono text-[11px] font-semibold tracking-widest uppercase">
          {title}
        </h2>
        <span aria-hidden="true" className={boxClass}>
          <TitleGlyph kind="min" />
        </span>
        <span aria-hidden="true" className={boxClass}>
          <TitleGlyph kind="max" />
        </span>
      </header>

      {menu ? <div className="mt-0.75">{menu}</div> : null}

      <div className={cn('mt-0.75 flex-1 border-t border-rt-shadow/60', bodyClassName)}>{children}</div>

      {status ? (
        <footer className="rt-sunken mt-0.75 flex items-center gap-2 px-2 py-0.5 text-[12px]">
          {status}
        </footer>
      ) : null}
    </section>
  )
}
