'use client'

import { Check } from 'lucide-react'
import { RetroBadge, RetroWindow } from '@/components/retro-ui'
import { MacWindow } from '@/components/mac-ui'
import { MacPreview, Win31Preview } from './kit-previews'

type Kit = {
  id: 'win31' | 'system7'
  name: string
  file: string
  size: string
  description: string
  features: string[]
}

const kits: Kit[] = [
  {
    id: 'win31',
    name: 'Windows 3.1 Kit',
    file: 'retrokit-win31.zip',
    size: '48 KB',
    description:
      'Beveled buttons, gradient title bars, group boxes and program-manager style windows with a clean modern finish.',
    features: ['Windows', 'Buttons', 'Inputs', 'Checkboxes', 'Menu bar', 'Tabs', 'Dialogs', 'Progress bar'],
  },
  {
    id: 'system7',
    name: 'Mac System 7 Kit',
    file: 'retrokit-system7.zip',
    size: '41 KB',
    description:
      'Black and white pixel-sharp windows, striped title bars, rounded default buttons and dithered desktop patterns.',
    features: ['Windows', 'Buttons', 'Inputs', 'Checkboxes', 'Menu bar', 'Alerts', 'Scroll bars', 'Dither patterns'],
  },
]

function FeatureList({ features, mac }: { features: string[]; mac?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-1.5">
          <Check className={mac ? 'size-3.5' : 'size-3.5 text-rt-ok'} aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
  )
}

export function KitCatalog() {
  return (
    <section id="kits" aria-label="Free UI kits" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12">
      <RetroWindow
        title="Kits.exe - Free UI kits"
        titleAs="h2"
        status={<span className="flex-1">{kits.length} object(s) - no sign-up required</span>}
      >
        <div className="p-4 sm:p-6">
          <p className="max-w-2xl leading-relaxed text-pretty text-rt-ink/80">
            Pick a kit, copy the folder into your project and import the tokens. Every kit is free for personal and
            commercial use.
          </p>

          <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
            <RetroWindow
              title={kits[0].name}
              titleAs="h3"
              bodyClassName="flex flex-col"
              status={
                <>
                  <span className="flex-1">
                    {kits[0].file} - {kits[0].size}
                  </span>
                  <RetroBadge tone="ok">Free</RetroBadge>
                </>
              }
            >
              <div className="rt-desktop border-b border-rt-line p-4">
                <Win31Preview />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <p className="leading-relaxed text-pretty">{kits[0].description}</p>
                <FeatureList features={kits[0].features} />
                <a
                  href="/showcase"
                  className="mt-auto inline-flex w-full items-center justify-center border-2 border-rt-line bg-rt-accent px-3 py-2 text-center font-mono text-[13px] font-bold text-white shadow-[inset_1px_1px_0_var(--color-rt-accent-hi),inset_-1px_-1px_0_var(--color-rt-accent-deep),2px_2px_0_var(--color-rt-shadow)] hover:bg-rt-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent"
                >
                  Explore Windows 3.1 components
                </a>
              </div>
            </RetroWindow>

            <MacWindow title={kits[1].name} titleAs="h3" className="flex flex-col" bodyClassName="flex flex-1 flex-col">
              <div className="border-b-2 border-black p-4">
                <MacPreview />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <p className="text-[13px] leading-relaxed text-pretty">{kits[1].description}</p>
                <FeatureList features={kits[1].features} mac />
                <p className="flex items-center justify-between border-t-2 border-black pt-3 text-[12px]">
                  <span>
                    {kits[1].file} - {kits[1].size}
                  </span>
                  <span className="border-2 border-black px-1.5 font-semibold uppercase">Free</span>
                </p>
                <a
                  href="/showcase"
                  className="mx-1 mt-1 inline-flex items-center justify-center border-2 border-black bg-white px-3 py-1.5 text-center font-mono text-[12px] font-semibold text-black shadow-[2px_2px_0_#000] hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Explore System 7 components
                </a>
              </div>
            </MacWindow>
          </div>
        </div>
      </RetroWindow>

    </section>
  )
}
