'use client'

import { useEffect, useState } from 'react'
import { Check, Download, FileArchive } from 'lucide-react'
import { RetroBadge, RetroButton, RetroDialog, RetroProgress, RetroWindow } from '@/components/retro-ui'
import { MacButton, MacWindow } from '@/components/mac-ui'
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
  const [open, setOpen] = useState(false)
  const [kit, setKit] = useState<Kit>(kits[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!open || progress >= 100) return
    const timer = setTimeout(() => setProgress((value) => Math.min(100, value + 12)), 140)
    return () => clearTimeout(timer)
  }, [open, progress])

  function startDownload(selected: Kit) {
    setKit(selected)
    setProgress(0)
    setOpen(true)
  }

  const done = progress >= 100

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
                <RetroButton variant="primary" className="mt-auto w-full" onClick={() => startDownload(kits[0])}>
                  <Download className="size-4" aria-hidden="true" />
                  Download Windows 3.1 Kit
                </RetroButton>
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
                <MacButton isDefault className="mx-1 mt-1 py-1.5" onClick={() => startDownload(kits[1])}>
                  Download System 7 Kit
                </MacButton>
              </div>
            </MacWindow>
          </div>
        </div>
      </RetroWindow>

      <RetroDialog
        open={open}
        onClose={() => setOpen(false)}
        title={done ? 'Demo complete' : 'Copying files...'}
        actions={
          done ? (
            <RetroButton variant="primary" onClick={() => setOpen(false)}>
              OK
            </RetroButton>
          ) : (
            <RetroButton onClick={() => setOpen(false)}>Cancel</RetroButton>
          )
        }
      >
        <FileArchive className="size-8 shrink-0 text-rt-accent-deep" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="truncate font-mono text-[12px]">{kit.file}</p>
          <RetroProgress value={progress} label={`Copying ${kit.name}`} />
          <p aria-live="polite" className="text-[12px] text-rt-ink/80">
            {done ? 'This is a demo: no file was downloaded.' : `${Math.round(progress)}% complete`}
          </p>
        </div>
      </RetroDialog>
    </section>
  )
}
