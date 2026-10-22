'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { RetroTabs } from '@/components/retro-ui'
import { packageManagers } from '@/lib/docs'
import type { PackageManager } from '@/lib/docs'
import { Snippet } from './snippet'

type PackageManagerState = { manager: PackageManager; setManager: (manager: PackageManager) => void }

const PackageManagerContext = createContext<PackageManagerState | null>(null)

export function PackageManagerProvider({ children }: { children: ReactNode }) {
  const [manager, setManager] = useState<PackageManager>('npm')
  return <PackageManagerContext.Provider value={{ manager, setManager }}>{children}</PackageManagerContext.Provider>
}

type InstallTabsProps = {
  commands: Record<PackageManager, string>
  label?: string
}

export function InstallTabs({ commands, label = 'Terminal' }: InstallTabsProps) {
  const shared = useContext(PackageManagerContext)
  const [local, setLocal] = useState<PackageManager>('npm')
  const value = shared?.manager ?? local
  const setValue = shared?.setManager ?? setLocal

  return (
    <RetroTabs
      value={value}
      onValueChange={(id) => setValue(id as PackageManager)}
      panelClassName="rt-raised rounded-[3px] p-2"
      tabs={packageManagers.map((manager) => ({
        id: manager,
        label: manager,
        content: <Snippet code={commands[manager]} label={label} />,
      }))}
    />
  )
}
