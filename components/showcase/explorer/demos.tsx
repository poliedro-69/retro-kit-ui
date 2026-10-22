'use client'

import { useEffect, useState } from 'react'
import { MacButton, MacProgress } from '@/components/mac-ui'
import { RetroButton, RetroDialog, RetroLinkButton, RetroProgress } from '@/components/retro-ui'

export function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <RetroButton onClick={() => setOpen(true)}>Delete file...</RetroButton>
      <RetroDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm"
        actions={
          <>
            <RetroButton variant="primary" onClick={() => setOpen(false)}>
              OK
            </RetroButton>
            <RetroButton onClick={() => setOpen(false)}>Cancel</RetroButton>
          </>
        }
      >
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-rt-line bg-rt-warn font-mono text-[20px] font-semibold shadow-[1px_1px_0_rgb(0_0_0/0.35)]"
        >
          !
        </span>
        <p className="leading-snug">Are you sure you want to delete AUTOEXEC.BAT? This cannot be undone.</p>
      </RetroDialog>
    </>
  )
}

export function LinkButtonDemo() {
  return (
    <div className="flex gap-2">
      <RetroLinkButton href="#" onClick={(event) => event.preventDefault()}>
        Read more
      </RetroLinkButton>
      <RetroLinkButton href="#" variant="primary" onClick={(event) => event.preventDefault()}>
        Download
      </RetroLinkButton>
    </div>
  )
}

function useProgress(initial: number) {
  const [progress, setProgress] = useState(initial)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setProgress((value) => Math.min(100, value + 4)), 120)
    return () => clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (running && progress >= 100) setRunning(false)
  }, [running, progress])

  function start() {
    setProgress(0)
    setRunning(true)
  }

  return { progress, running, start }
}

export function ProgressDemo() {
  const { progress, running, start } = useProgress(35)
  return (
    <div className="rt-raised flex w-full max-w-sm flex-col gap-3 p-3">
      <p>{progress === 100 ? 'Copy complete.' : 'Copying files...'}</p>
      <RetroProgress value={progress} label="Copy progress" />
      <div className="flex justify-end">
        <RetroButton size="sm" variant="primary" disabled={running} onClick={start}>
          {running ? 'Copying...' : progress === 100 ? 'Restart' : 'Start'}
        </RetroButton>
      </div>
    </div>
  )
}

export function MacProgressDemo() {
  const { progress, running, start } = useProgress(35)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 border-2 border-mac-ink bg-mac-paper p-3 font-mono text-[12px] text-mac-ink shadow-[3px_3px_0_var(--color-mac-ink)]">
      <p>{progress === 100 ? 'Copy complete.' : 'Copying files...'}</p>
      <MacProgress value={progress} label="Copy progress" />
      <div className="flex justify-end">
        <MacButton isDefault disabled={running} onClick={start}>
          {running ? 'Copying...' : progress === 100 ? 'Restart' : 'Start'}
        </MacButton>
      </div>
    </div>
  )
}
