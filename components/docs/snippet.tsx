import { CopyButton } from '@/components/license/copy-button'
import { cn } from '@/lib/utils'

type SnippetProps = {
  code: string
  label?: string
  className?: string
}

export function Snippet({ code, label = 'Terminal', className }: SnippetProps) {
  return (
    <figure className={cn('rt-sunken overflow-hidden bg-rt-paper', className)}>
      <figcaption className="flex items-center justify-between gap-2 border-b border-rt-shadow/50 bg-rt-face px-2 py-1">
        <span className="truncate font-mono text-[11px] tracking-widest uppercase">{label}</span>
        <CopyButton text={code} />
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={`${label} snippet`}
        className="max-h-96 overflow-auto p-3 font-mono text-[12px] leading-relaxed text-rt-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent"
      >
        <code>{code}</code>
      </pre>
    </figure>
  )
}
