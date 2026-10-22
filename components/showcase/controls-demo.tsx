'use client'

import { useEffect, useState } from 'react'
import {
  RetroBadge,
  RetroButton,
  RetroCheckbox,
  RetroGroup,
  RetroInput,
  RetroProgress,
  RetroRadio,
  RetroSelect,
  RetroWindow,
} from '@/components/retro-ui'

export function ControlsDemo() {
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!installing) return
    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setInstalling(false)
          return 100
        }
        return value + 4
      })
    }, 120)
    return () => clearInterval(timer)
  }, [installing])

  function start() {
    setProgress(0)
    setInstalling(true)
  }

  return (
    <RetroWindow
      title="Controles.exe"
      status={
        <>
          <span className="flex-1">{progress === 100 ? 'Instalación completada' : 'Listo'}</span>
          <RetroBadge tone={progress === 100 ? 'ok' : 'neutral'}>{progress}%</RetroBadge>
        </>
      }
    >
      <form
        className="grid gap-4 p-3 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault()
          start()
        }}
      >
        <div className="flex flex-col gap-3">
          <RetroInput label="Nombre de usuario" name="user" placeholder="ej. bill_g" autoComplete="off" />
          <RetroInput
            label="Directorio"
            name="dir"
            defaultValue="C:\WINDOWS"
            hint="Ruta de instalación"
            className="font-mono"
          />
          <RetroSelect label="Resolución" name="res" defaultValue="vga">
            <option value="vga">640 x 480, 16 colores</option>
            <option value="svga">800 x 600, 256 colores</option>
            <option value="xga">1024 x 768, 256 colores</option>
          </RetroSelect>
        </div>

        <div className="flex flex-col gap-3">
          <RetroGroup legend="Modo">
            <RetroRadio name="mode" label="Instalación rápida" defaultChecked />
            <RetroRadio name="mode" label="Personalizada" />
            <RetroRadio name="mode" label="Solo lectura" disabled />
          </RetroGroup>
          <RetroGroup legend="Opciones">
            <RetroCheckbox label="Crear grupo de programas" defaultChecked />
            <RetroCheckbox label="Instalar protector de pantalla" />
          </RetroGroup>
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <RetroProgress value={progress} label="Progreso de instalación" />
          <div className="flex flex-wrap justify-end gap-2">
            <RetroButton type="submit" variant="primary" disabled={installing}>
              {installing ? 'Instalando...' : 'Instalar'}
            </RetroButton>
            <RetroButton type="reset" onClick={() => setProgress(0)} disabled={installing}>
              Restablecer
            </RetroButton>
            <RetroButton disabled>Ayuda</RetroButton>
          </div>
        </div>
      </form>
    </RetroWindow>
  )
}
