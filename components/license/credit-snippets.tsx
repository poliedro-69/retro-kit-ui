'use client'

import { RetroTabs } from '@/components/retro-ui'
import { CopyButton } from './copy-button'

type Snippet = { id: string; label: string; code: string }

function SnippetPanel({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <pre className="rt-sunken overflow-x-auto p-3 font-mono text-[12px] leading-relaxed whitespace-pre text-rt-ink">
        <code>{code}</code>
      </pre>
      <div className="flex justify-end">
        <CopyButton text={code} label="Copy snippet" />
      </div>
    </div>
  )
}

export function CreditSnippets({ snippets }: { snippets: Snippet[] }) {
  return (
    <RetroTabs
      className="p-2"
      tabs={snippets.map((snippet) => ({
        id: snippet.id,
        label: snippet.label,
        content: <SnippetPanel code={snippet.code} />,
      }))}
    />
  )
}
