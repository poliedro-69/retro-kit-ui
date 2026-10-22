import type { Metadata } from 'next'
import { ElementsPlayground } from '@/components/elements-demo/elements-playground'

export const metadata: Metadata = {
  title: 'Web Components playground',
  description: 'RetroKit custom elements running inside a Next.js app.',
}

export default function ElementsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 font-mono text-2xl font-semibold">Web Components playground</h1>
      <ElementsPlayground />
    </main>
  )
}
