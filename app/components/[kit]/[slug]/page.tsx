import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExplorerData } from '@/components/showcase/explorer/registry'
import { RetroLinkButton } from '@/components/retro-ui'

export const dynamicParams = false

type Params = { kit: string; slug: string }

async function findItem(params: Params) {
  const data = await getExplorerData()
  const kit = data.kits.find((candidate) => candidate.id === params.kit)
  const item = kit?.categories.flatMap((category) => category.items).find((candidate) => candidate.id === `${params.kit === 'win31' ? 'win' : 'mac'}-${params.slug}`)
  return kit && item ? { data, kit, item } : null
}

export async function generateStaticParams() {
  const data = await getExplorerData()
  return data.kits.flatMap((kit) =>
    kit.categories.flatMap((category) =>
      category.items.map((item) => ({
        kit: kit.id,
        slug: item.id.replace(/^(win|mac)-/, ''),
      })),
    ),
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const result = await findItem(await params)
  if (!result) return {}
  const { item, kit } = result
  return {
    title: `${kit.name} ${item.name}`,
    description: `${item.description} Explore the live preview, props and copy-ready React code in RetroKit.`,
    alternates: { canonical: `/components/${kit.id}/${item.id.replace(/^(win|mac)-/, '')}` },
  }
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const result = await findItem(await params)
  if (!result) notFound()
  const { data, kit, item } = result
  const related = kit.categories.flatMap((category) => category.items).filter((candidate) => candidate.id !== item.id).slice(0, 6)
  const source = item.sources[0] ? data.sources[item.sources[0]] : null
  const slug = item.id.replace(/^(win|mac)-/, '')

  return (
    <main className={`min-h-screen p-4 md:p-8 ${kit.canvas === 'win' ? 'rt-desktop' : 'bg-[#f4f4f4]'}`}>
      <div className="mx-auto max-w-5xl space-y-6">
        <nav aria-label="Breadcrumb" className="font-rt-mono text-xs">
          <Link href="/">RetroKit</Link> {' / '}
          <Link href="/showcase">Showcase</Link> {' / '}
          <span>{item.name}</span>
        </nav>
        <header className="space-y-2">
          <p className="font-rt-mono text-xs uppercase tracking-widest">{kit.name}</p>
          <h1 className="font-rt-mono text-2xl font-bold">{item.name}</h1>
          <p className="max-w-2xl text-sm">{item.description}</p>
        </header>
        <section aria-labelledby="preview-title" className="rt-raised bg-rt-paper p-4">
          <h2 id="preview-title" className="sr-only">{item.name} preview</h2>
          <div className="flex min-h-48 items-center justify-center">{item.preview}</div>
        </section>
        <section className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-3">
            <h2 className="font-rt-mono text-lg font-bold">Props</h2>
            <dl className="space-y-2 text-sm">
              {item.props.map((prop) => (
                <div key={prop.name} className="border-b border-current/20 pb-2">
                  <dt className="font-semibold">{prop.name}</dt>
                  <dd>{prop.type} — {prop.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-3">
            <h2 className="font-rt-mono text-lg font-bold">React usage</h2>
            <pre className="rt-sunken overflow-x-auto bg-rt-paper p-4 text-xs"><code>{source?.code ?? item.usage.code}</code></pre>
          </div>
        </section>
        <section aria-labelledby="related-title" className="space-y-3">
          <h2 id="related-title" className="font-rt-mono text-lg font-bold">Related components</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((candidate) => (
              <RetroLinkButton key={candidate.id} href={`/components/${kit.id}/${candidate.id.replace(/^(win|mac)-/, '')}`} size="sm">{candidate.name}</RetroLinkButton>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
