'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { RetroWindow } from './retro-window'

type RetroDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}

export function RetroDialog({ open, onClose, title, children, actions }: RetroDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={title}
      className="m-auto w-[min(92vw,26rem)] bg-transparent p-0 backdrop:bg-black/45 backdrop:backdrop-blur-[2px]"
    >
      <RetroWindow title={title} onClose={onClose}>
        <div className="flex gap-3 p-4">{children}</div>
        {actions ? <div className="flex justify-center gap-2 px-4 pb-4">{actions}</div> : null}
      </RetroWindow>
    </dialog>
  )
}
