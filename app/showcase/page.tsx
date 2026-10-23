import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { ComponentExplorer } from '@/components/showcase/explorer/component-explorer'
import { getExplorerData } from '@/components/showcase/explorer/registry'
import { InstallPanel } from '@/components/showcase/install-panel'
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
        <SiteHeader />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
          <ComponentExplorer data={data} />
          <InstallPanel />
        </div>
      </ShowcaseThemeShell>
    </main>
  )
}
