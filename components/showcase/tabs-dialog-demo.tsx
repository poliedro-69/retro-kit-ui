'use client'

import { useState } from 'react'
import { RetroBadge, RetroButton, RetroDialog, RetroTabs, RetroWindow } from '@/components/retro-ui'

export function TabsDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <RetroWindow title="Propiedades" bodyClassName="p-3">
      <RetroTabs
        tabs={[
          {
            id: 'general',
            label: 'General',
            content: (
              <div className="flex flex-col gap-2">
                <p className="leading-snug">
                  Sistema operativo: <strong>Retro UI 3.1</strong>. Memoria disponible: 640 KB (suficiente para
                  todos).
                </p>
                <div className="flex gap-1.5">
                  <RetroBadge tone="ok">Estable</RetroBadge>
                  <RetroBadge tone="info">Modo 386</RetroBadge>
                </div>
              </div>
            ),
          },
          {
            id: 'tema',
            label: 'Tema',
            content: (
              <p className="leading-snug">
                Estructura de bordes biselados con acabados modernos: degradados suaves, sombras difusas y estados
                de foco accesibles.
              </p>
            ),
          },
          {
            id: 'acerca',
            label: 'Acerca de',
            content: <p className="leading-snug">Hecho con React y Tailwind CSS. Sin imágenes, solo CSS.</p>,
          },
        ]}
      />
      <div className="mt-3 flex justify-end">
        <RetroButton onClick={() => setOpen(true)}>Eliminar archivo...</RetroButton>
      </div>

      <RetroDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar"
        actions={
          <>
            <RetroButton variant="primary" onClick={() => setOpen(false)}>
              Aceptar
            </RetroButton>
            <RetroButton onClick={() => setOpen(false)}>Cancelar</RetroButton>
          </>
        }
      >
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-rt-line bg-rt-warn font-mono text-[20px] font-semibold shadow-[1px_1px_0_rgb(0_0_0/0.35)]"
        >
          !
        </span>
        <p className="leading-snug">¿Seguro que quieres eliminar AUTOEXEC.BAT? Esta acción no se puede deshacer.</p>
      </RetroDialog>
    </RetroWindow>
  )
}
