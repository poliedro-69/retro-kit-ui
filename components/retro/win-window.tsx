import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type WinWindowProps = {
  title: string
  children: ReactNode
  status?: ReactNode
  className?: string
}

export function WinWindow({ title, children, status, className }: WinWindowProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        'flex flex-col border border-black bg-win-face p-0.75 font-win text-[13px] text-black shadow-[2px_2px_0_#000]',
        className,
      )}
    >
      <header className="flex items-stretch gap-px bg-win-face">
        <div
          aria-hidden="true"
          className="win-raised flex h-5.5 w-5.5 shrink-0 items-center justify-center"
        >
          <span className="block h-0.75 w-3 border border-black bg-white" />
        </div>
        <h2 className="flex h-5.5 flex-1 items-center truncate bg-win-title px-2 text-[13px] font-bold tracking-wide text-white">
          {title}
        </h2>
        <div aria-hidden="true" className="win-raised flex h-5.5 w-5.5 items-center justify-center text-[8px]">
          ▼
        </div>
        <div aria-hidden="true" className="win-raised flex h-5.5 w-5.5 items-center justify-center text-[8px]">
          ▲
        </div>
      </header>
      <div className="mt-0.75 flex-1">{children}</div>
      {status ? (
        <footer className="win-sunken mt-0.75 flex items-center gap-2 px-2 py-0.5 text-[12px]">
          {status}
        </footer>
      ) : null}
    </section>
  )
}
