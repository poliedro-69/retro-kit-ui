'use client'

import { FormEvent, useState } from 'react'
import { useEveAgent } from 'eve/react'

export function ComponentAgentChat() {
  const [input, setInput] = useState('')
  const agent = useEveAgent()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = input.trim()
    if (!value || agent.status === 'running') return
    setInput('')
    await agent.send(value)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[1fr_280px]">
      <section className="rt-raised flex min-h-[560px] flex-col p-2" aria-label="Component agent chat">
        <div className="rt-sunken flex-1 space-y-3 overflow-y-auto bg-rt-paper p-3">
          {agent.data.messages.length === 0 ? (
            <div className="max-w-xl space-y-2 text-sm">
              <p className="font-bold">retro-component-builder ready.</p>
              <p>Describe the component you want. I will inspect the kits, implement every requested package, update the showcase and registry, run checks, test the preview and publish the result to main.</p>
            </div>
          ) : null}
          {agent.data.messages.map((message) => (
            <article key={message.id} className={message.role === 'user' ? 'ml-auto max-w-[85%] bg-rt-accent p-2 text-white' : 'max-w-[92%] border border-rt-line bg-rt-face p-2'}>
              {message.parts?.map((part, index) =>
                part.type === 'text' ? <p key={part.id ?? index} className="whitespace-pre-wrap">{part.text}</p> : null,
              )}
            </article>
          ))}
          {agent.error ? <p role="alert" className="border border-red-700 bg-red-100 p-2 text-red-900">{agent.error.message}</p> : null}
        </div>
        <form onSubmit={submit} className="mt-2 flex gap-2">
          <label htmlFor="component-agent-input" className="sr-only">Component request</label>
          <textarea
            id="component-agent-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder="Create a Windows 3.1 calendar component..."
            className="rt-sunken min-h-12 flex-1 resize-y bg-rt-paper p-2"
            disabled={agent.status === 'running'}
          />
          <button type="submit" className="rt-raised self-end px-3 py-2 font-bold" disabled={!input.trim() || agent.status === 'running'}>
            {agent.status === 'running' ? 'Working...' : 'Send'}
          </button>
        </form>
      </section>
      <aside className="rt-raised h-fit space-y-3 p-3 text-sm">
        <h2 className="font-bold">Required checklist</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>React kits</li>
          <li>Web Components</li>
          <li>React and Web Components</li>
          <li>Showcase and registry</li>
          <li>Builds and browser QA</li>
          <li>Commit and push to main</li>
        </ul>
        <button type="button" onClick={agent.reset} className="rt-raised w-full px-2 py-1">New request</button>
      </aside>
    </div>
  )
}
