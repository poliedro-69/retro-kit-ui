'use client'

import { useEffect, useState } from 'react'
import { RetroButton } from '@/components/retro-ui'
import type { CodeFile } from './types'

export function CodeBlock({ file }: { file: CodeFile }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(file.code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure className="m-0 bg-rt-paper">
      <figcaption className="flex items-center justify-between gap-2 border-b border-rt-shadow bg-rt-face-hi px-2 py-1">
        <span className="truncate font-mono text-[11px] text-rt-ink/80">{file.name}</span>
        <RetroButton size="sm" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </RetroButton>
        <span role="status" className="sr-only">
          {copied ? 'Code copied to clipboard' : ''}
        </span>
      </figcaption>
      <pre className="rt-code m-0 overflow-x-auto whitespace-pre-wrap p-3" aria-label={`Código de ${file.name}`}>
        <code>{file.code}</code>
      </pre>
    </figure>
  )
}
