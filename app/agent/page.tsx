import { SiteHeader } from '@/components/landing/site-header'
import { ComponentAgentChat } from '@/components/agent/component-agent-chat'

export const metadata = {
  title: 'Component Agent | RetroKit',
  description: 'Private component creation agent for RetroKit.',
}

export default function AgentPage() {
  return (
    <main className="min-h-screen bg-rt-paper text-rt-ink">
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <header className="max-w-3xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-rt-accent-deep">Private developer tool</p>
          <h1 className="font-mono text-3xl font-bold">Component Agent</h1>
          <p className="text-sm">Describe a component once. retro-component-builder carries it through both retro kits, React, Web Components, Vue, showcase, registry, validation and main.</p>
        </header>
        <ComponentAgentChat />
      </div>
    </main>
  )
}
