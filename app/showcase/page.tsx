import type { Metadata } from 'next'
import { RetroLinkButton } from '@/components/retro-ui'
import { ComponentExplorer } from '@/components/showcase/explorer/component-explorer'
import { getExplorerData } from '@/components/showcase/explorer/registry'

export const metadata: Metadata = {
  title: 'Component Explorer | RetroKit',
  description: 'Browse every Windows 3.1 and Mac System 7 component in a classic tree view, with live previews and copy-ready code.',
}

export default async function Page() {
  const data = await getExplorerData()

  return (
    <main className="rt-desktop min-h-screen px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-mono text-[15px] font-semibold tracking-widest text-white uppercase [text-shadow:1px_1px_0_#000]">
            RetroKit.exe
          </h1>
          <RetroLinkButton href="/" size="sm">
            Back to home
          </RetroLinkButton>
        </div>
        <ComponentExplorer data={data} />
      </div>
    </main>
  )
}
