import type { Metadata } from 'next'
import { RetroLinkButton } from '@/components/retro-ui'
import { ComponentExplorer } from '@/components/showcase/explorer/component-explorer'
import { getExplorerData } from '@/components/showcase/explorer/registry'
import { ShowcaseThemeShell } from '@/components/showcase/showcase-theme'

export const metadata: Metadata = {
  title: 'Component Explorer | RetroKit',
  description:
    'Browse every Windows 3.1 and Mac System 7 component in a classic tree view, with live previews, copy-ready code and switchable color and font themes.',
}

export default async function Page() {
  const data = await getExplorerData()

  return (
    <main>
      <ShowcaseThemeShell>
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-rt-mono text-[15px] font-semibold tracking-widest text-rt-desktop-ink uppercase">
              RetroKit.exe
            </h1>
            <RetroLinkButton href="/" size="sm">
              Back to home
            </RetroLinkButton>
          </div>
          <ComponentExplorer data={data} />
        </div>
      </ShowcaseThemeShell>
    </main>
  )
}
