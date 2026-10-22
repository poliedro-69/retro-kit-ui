'use client'

import '@your-scope/retrokit-elements'
import { useEffect, useRef, useState } from 'react'

function useRetroEvent<T extends HTMLElement>(type: string, handler: (event: Event) => void) {
  const ref = useRef<T>(null)
  const latest = useRef(handler)
  latest.current = handler
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const listener = (event: Event) => latest.current(event)
    node.addEventListener(type, listener)
    return () => node.removeEventListener(type, listener)
  }, [type])
  return ref
}

export function ElementsPlayground() {
  const [name, setName] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [plan, setPlan] = useState('free')
  const [tab, setTab] = useState('general')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(40)

  const nameRef = useRetroEvent<HTMLElement>('input', (e) => setName((e.target as HTMLInputElement).value))
  const checkRef = useRetroEvent<HTMLElement>('change', (e) => setSubscribed((e.target as HTMLInputElement).checked))
  const planRef = useRetroEvent<HTMLDivElement>('change', (e) => setPlan((e.target as HTMLElement & { value: string }).value))
  const tabsRef = useRetroEvent<HTMLElement>('change', (e) => setTab((e.target as HTMLElement & { value: string }).value))
  const dialogRef = useRetroEvent<HTMLElement>('close', () => setOpen(false))
  const runRef = useRetroEvent<HTMLElement>('click', () => setProgress((value) => (value >= 100 ? 0 : value + 20)))
  const openRef = useRetroEvent<HTMLElement>('click', () => setOpen(true))

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <rt-window heading="Web Component / Next.js" closable>
        <div className="flex flex-col gap-4 p-4" data-testid="rt-panel">
          <rt-input ref={nameRef} label="Your name" placeholder="Ada Lovelace" hint="Fires native input events." />
          <rt-checkbox ref={checkRef}>Subscribe to updates</rt-checkbox>
          <rt-group legend="Plan">
            <div ref={planRef} className="flex flex-col">
              <rt-radio name="plan" value="free" checked={plan === 'free'}>Free</rt-radio>
              <rt-radio name="plan" value="pro" checked={plan === 'pro'}>Pro</rt-radio>
            </div>
          </rt-group>
          <rt-progress value={progress} label="Install progress" />
          <div className="flex flex-wrap gap-2">
            <rt-button ref={runRef} variant="primary">Advance</rt-button>
            <rt-button ref={openRef}>Open dialog</rt-button>
            <rt-badge tone="ok">v0.1</rt-badge>
          </div>
          <p className="font-mono text-xs" data-testid="rt-state">
            name={name || '-'} / subscribed={String(subscribed)} / plan={plan}
          </p>
        </div>
      </rt-window>

      <div className="flex flex-col gap-8">
        <rt-tabs ref={tabsRef} value={tab}>
          <rt-tab name="general" label="General">General settings panel.</rt-tab>
          <rt-tab name="display" label="Display">Display settings panel.</rt-tab>
        </rt-tabs>
        <mac-window heading="Web Component / System 7">
          <div className="flex flex-col gap-3 p-4">
            <mac-input label="Folder name" placeholder="Untitled" />
            <mac-checkbox checked>Keep window open</mac-checkbox>
            <mac-progress value={60} label="Copying" />
            <div>
              <mac-button is-default>OK</mac-button>
            </div>
          </div>
        </mac-window>
      </div>

      <rt-dialog ref={dialogRef} heading="Confirm" open={open}>
        Dialogs use the native top layer, focus trap and Escape key.
        <rt-button slot="actions" variant="primary" onClick={() => setOpen(false)}>OK</rt-button>
      </rt-dialog>
    </div>
  )
}
