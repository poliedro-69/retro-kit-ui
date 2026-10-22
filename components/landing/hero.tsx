import { Download } from 'lucide-react'
import { RetroBadge, RetroLinkButton, RetroWindow } from '@/components/retro-ui'
import { MacPreview, Win31Preview } from './kit-previews'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-24">
      <RetroWindow
        title="README.TXT"
        titleAs="p"
        status={
          <>
            <span className="flex-1">2 kits - React + Tailwind CSS v4</span>
            <RetroBadge tone="ok">Free</RetroBadge>
          </>
        }
      >
        <div className="p-5 sm:p-8">
          <RetroBadge tone="info">Free forever - MIT licensed</RetroBadge>
          <h1 className="mt-4 font-mono text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
            Free retro UI kits for the modern web.
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-pretty text-rt-ink/80">
            Windows 3.1 and Mac System 7 inspired components for React and Tailwind. Classic bevels, title bars and
            dithered patterns, finished with modern focus states, soft gradients and accessible markup.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <RetroLinkButton href="#kits" variant="primary">
              <Download className="size-4" aria-hidden="true" />
              Download free kits
            </RetroLinkButton>
            <RetroLinkButton href="/showcase">Browse components</RetroLinkButton>
          </div>
          <dl className="rt-sunken mt-8 grid grid-cols-3 divide-x divide-rt-shadow/40 text-center">
            {[
              ['2', 'Free kits'],
              ['12', 'Components each'],
              ['0', 'Sign-ups needed'],
            ].map(([value, label]) => (
              <div key={label} className="px-2 py-3">
                <dt className="sr-only">{label}</dt>
                <dd className="font-mono text-2xl font-semibold">{value}</dd>
                <dd aria-hidden="true" className="text-[12px] text-rt-ink/70">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </RetroWindow>

      <div className="relative flex flex-col gap-6 lg:block lg:h-120">
        <Win31Preview className="lg:absolute lg:top-0 lg:left-0 lg:w-[88%]" />
        <MacPreview className="lg:absolute lg:right-0 lg:bottom-0 lg:w-[74%]" />
      </div>
    </section>
  )
}
