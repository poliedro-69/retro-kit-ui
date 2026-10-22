'use client'

import { useRef, useState } from 'react'
import { MacButton, MacToast, MacToastRegion } from '@/components/mac-ui'
import { RetroButton, RetroToast, RetroToastRegion } from '@/components/retro-ui'

type Tone = 'info' | 'ok' | 'warn' | 'danger'

type Sample = { title: string; message: string; tone: Tone }

type ToastItem = Sample & { id: number; duration: number }

const samples: Sample[] = [
  { title: 'File copied', message: 'README.TXT was copied to A:\\.', tone: 'ok' },
  { title: 'Low disk space', message: 'Drive C: has less than 2 MB free.', tone: 'warn' },
  { title: 'Network', message: 'Connected to WORKGROUP.', tone: 'info' },
  { title: 'Write error', message: 'Cannot write to drive A:. Disk is full.', tone: 'danger' },
]

function useToasts() {
  const [items, setItems] = useState<ToastItem[]>([{ ...samples[2], id: 0, duration: 0 }])
  const nextId = useRef(1)

  function push() {
    const id = nextId.current++
    const sample = samples[id % samples.length]
    setItems((current) => [...current.slice(-2), { ...sample, id, duration: 6000 }])
  }

  function dismiss(id: number) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return { items, push, dismiss }
}

export function ToastDemo() {
  const { items, push, dismiss } = useToasts()
  return (
    <div className="rt-raised flex min-h-72 w-full max-w-sm flex-col gap-3 p-3">
      <RetroButton onClick={push} className="self-start">
        Show notification
      </RetroButton>
      <RetroToastRegion>
        {items.map((item) => (
          <RetroToast key={item.id} title={item.title} tone={item.tone} duration={item.duration} onClose={() => dismiss(item.id)}>
            {item.message}
          </RetroToast>
        ))}
      </RetroToastRegion>
    </div>
  )
}

export function MacToastDemo() {
  const { items, push, dismiss } = useToasts()
  return (
    <div className="flex min-h-72 w-full max-w-sm flex-col gap-3 border-2 border-mac-ink bg-mac-paper p-3">
      <MacButton onClick={push} className="self-start">
        Show notification
      </MacButton>
      <MacToastRegion>
        {items.map((item) => (
          <MacToast
            key={item.id}
            title={item.title}
            urgent={item.tone === 'danger'}
            duration={item.duration}
            onClose={() => dismiss(item.id)}
          >
            {item.message}
          </MacToast>
        ))}
      </MacToastRegion>
    </div>
  )
}
