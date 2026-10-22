import type { ReactNode } from 'react'
import { RetroWindow } from '@/components/retro-ui'

type DocsSectionProps = {
  id: string
  title: string
  status?: string
  children: ReactNode
}

export function DocsSection({ id, title, status, children }: DocsSectionProps) {
  return (
    <div id={id} className="scroll-mt-20">
      <RetroWindow title={title} status={status ? <span className="flex-1">{status}</span> : undefined}>
        <div className="flex flex-col gap-4 p-4 leading-relaxed">{children}</div>
      </RetroWindow>
    </div>
  )
}

export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-label={`Step ${n}: ${title}`} className="flex flex-col gap-2">
      <h3 className="flex items-center gap-2 text-[14px] font-semibold">
        <span
          aria-hidden="true"
          className="rt-title flex size-5 shrink-0 items-center justify-center rounded-[2px] font-mono text-[11px]"
        >
          {n}
        </span>
        {title}
      </h3>
      <div className="flex flex-col gap-2 pl-7">{children}</div>
    </section>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="rt-sunken bg-rt-paper px-1 py-px font-mono text-[12px]">{children}</code>
}
