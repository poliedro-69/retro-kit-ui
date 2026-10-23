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
  alternates: { canonical: '/showcase' },
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ component?: string }>
}) {
  const data = await getExplorerData()
  const component = (await searchParams).component
  const [kitId, slug] = component?.split('/') ?? []
  const prefix = kitId === 'win31' ? 'win-' : kitId === 'mac7' ? 'mac-' : ''
  const requestedId = prefix && slug ? `${prefix}${slug}` : undefined
  const initialSelectedId = requestedId && data.kits.some((kit) => kit.categories.some((category) => category.items.some((item) => item.id === requestedId)))
    ? requestedId
    : undefined

  return (
    <main>
      <ShowcaseThemeShell>
        <SiteHeader />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
          <ComponentExplorer data={data} initialSelectedId={initialSelectedId} />
          <InstallPanel />
        </div>
      </ShowcaseThemeShell>
    </main>
  )
}
