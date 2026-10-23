import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { CopyButton } from '@/components/license/copy-button'
import { CreditSnippets } from '@/components/license/credit-snippets'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { RetroBadge, RetroWindow } from '@/components/retro-ui'
import { credit, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `License - ${site.productName}`,
  description: `${site.productName} is free for personal and commercial projects under an MIT license with a simple attribution clause: link back to ${site.author.name}.`,
  alternates: { canonical: '/license' },
}

const canDo = [
  'Use the kits in personal, client and commercial projects',
  'Modify, restyle and re-theme every component',
  'Ship them in closed-source products and SaaS apps',
  'Redistribute them inside your own projects and templates',
]

const mustDo = [
  `Show the credit "${credit.text}" somewhere users can see it`,
  `Link "${site.author.name}" to ${site.author.url}`,
  'Keep the copyright notice and license text with any copy of the source',
]

const questions = [
  {
    q: 'Where should the credit go?',
    a: 'A site footer, an About page or a credits screen all work. For open-source projects that ship the source, a line in the README is enough.',
  },
  {
    q: 'Can I remove the credit?',
    a: `Only with written permission from ${site.author.name}. Get in touch and describe your project.`,
  },
  {
    q: 'Does the credit have to look like the kit?',
    a: 'No. Style it to match your site, as long as the text and the link stay readable and visible.',
  },
]

function List({ items, tone }: { items: string[]; tone: 'ok' | 'must' }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-relaxed">
          <span
            aria-hidden="true"
            className={`mt-1.5 size-2 shrink-0 rounded-[1px] border border-rt-line ${tone === 'ok' ? 'bg-rt-ok' : 'bg-rt-warn'}`}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function LicensePage() {
  const template = await readFile(join(process.cwd(), 'license/LICENSE.template'), 'utf8')
  const licenseText = template
    .replaceAll('{{year}}', String(site.year))
    .replaceAll('{{name}}', site.author.name)
    .replaceAll('{{url}}', site.author.url)
    .replaceAll('{{product}}', site.productName)

  const snippets = [
    { id: 'jsx', label: 'React', code: credit.jsx },
    { id: 'html', label: 'HTML', code: credit.html },
    { id: 'md', label: 'Markdown', code: credit.markdown },
  ]

  return (
    <div id="top" className="rt-desktop min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-12">
        <div className="text-white">
          <RetroBadge>MIT + Attribution</RetroBadge>
          <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Free to use. Just give credit.
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-white/90">
            {site.productName} is free for personal and commercial work. The only condition is a visible link back to{' '}
            {site.author.name}.
          </p>
        </div>

        <RetroWindow title="SUMMARY.HLP - In plain English" status={<span className="flex-1">Not legal advice</span>}>
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            <section aria-labelledby="can-heading" className="rt-sunken p-4">
              <h3 id="can-heading" className="mb-3 font-mono text-[11px] font-semibold tracking-widest uppercase">
                You can
              </h3>
              <List items={canDo} tone="ok" />
            </section>
            <section aria-labelledby="must-heading" className="rt-sunken p-4">
              <h3 id="must-heading" className="mb-3 font-mono text-[11px] font-semibold tracking-widest uppercase">
                You must
              </h3>
              <List items={mustDo} tone="must" />
            </section>
          </div>
        </RetroWindow>

        <RetroWindow
          title="CREDIT.EXE - Copy your attribution"
          status={<span className="flex-1 truncate">{credit.text}</span>}
        >
          <CreditSnippets snippets={snippets} />
        </RetroWindow>

        <RetroWindow
          title="LICENSE.TXT"
          status={
            <span className="flex-1">
              Copyright {site.year} {site.author.name}
            </span>
          }
        >
          <div className="flex flex-col gap-3 p-3">
            <pre
              tabIndex={0}
              aria-label="Full license text"
              className="rt-sunken max-h-96 overflow-auto p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-rt-ink focus-visible:outline-2 focus-visible:outline-rt-accent"
            >
              {licenseText}
            </pre>
            <div className="flex justify-end">
              <CopyButton text={licenseText} label="Copy license" />
            </div>
          </div>
        </RetroWindow>

        <RetroWindow title="QUESTIONS.HLP" status={<span className="flex-1">{questions.length} topics</span>}>
          <div className="rt-sunken m-3 divide-y divide-rt-shadow/40">
            {questions.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 font-medium select-none hover:bg-rt-face-hi focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent [&::-webkit-details-marker]:hidden">
                  <svg
                    viewBox="0 0 8 8"
                    aria-hidden="true"
                    className="size-2.5 shrink-0 fill-rt-ink transition-transform group-open:rotate-90"
                  >
                    <path d="M1 0l6 4-6 4z" />
                  </svg>
                  {item.q}
                </summary>
                <p className="px-4 pb-4 pl-9.5 leading-relaxed text-pretty text-rt-ink/80">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="border-t border-rt-shadow/50 px-4 py-3 text-[12px] leading-relaxed text-rt-ink/80">
            Questions or a custom license?{' '}
            <a
              href={`mailto:${site.author.email}`}
              className="text-rt-accent underline underline-offset-2 hover:text-rt-accent-deep"
            >
              {site.author.email}
            </a>
          </p>
        </RetroWindow>
      </main>
      <SiteFooter />
    </div>
  )
}
