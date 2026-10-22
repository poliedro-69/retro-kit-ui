import { RetroWindow } from '@/components/retro-ui'

const linkClass =
  'text-rt-accent underline underline-offset-2 hover:text-rt-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent'

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-6 pb-12">
      <RetroWindow
        title="About.hlp - RetroKit"
        titleAs="p"
        status={<span className="flex-1">Free forever. No sign-up required.</span>}
      >
        <div className="grid gap-6 p-5 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[13px] font-semibold tracking-widest uppercase">RetroKit.exe</p>
            <p className="mt-2 max-w-xs leading-relaxed text-rt-ink/80">
              Free retro UI kits for React and Tailwind CSS.
            </p>
          </div>
          <nav aria-label="Kits">
            <p className="font-mono text-[11px] font-semibold tracking-widest uppercase">Kits</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li>
                <a href="#kits" className={linkClass}>
                  Windows 3.1 Kit
                </a>
              </li>
              <li>
                <a href="#kits" className={linkClass}>
                  Mac System 7 Kit
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Explore">
            <p className="font-mono text-[11px] font-semibold tracking-widest uppercase">Explore</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li>
                <a href="/showcase" className={linkClass}>
                  Component showcase
                </a>
              </li>
              <li>
                <a href="#faq" className={linkClass}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#top" className={linkClass}>
                  Back to top
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="border-t border-rt-shadow/50 px-5 py-3 text-[12px] leading-relaxed text-rt-ink/70">
          2026 RetroKit. Windows and Macintosh are trademarks of their respective owners. RetroKit is an independent
          project and is not affiliated with or endorsed by them.
        </p>
      </RetroWindow>
    </footer>
  )
}
