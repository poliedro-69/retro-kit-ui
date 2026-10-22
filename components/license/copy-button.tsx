'use client'

import { useEffect, useState } from 'react'
import { RetroButton } from '@/components/retro-ui'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <RetroButton size="sm" onClick={copy} aria-live="polite">
      <span>{copied ? 'Copied!' : label}</span>
    </RetroButton>
  )
}
