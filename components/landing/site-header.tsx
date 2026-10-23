const links = [
  { href: '/#kits', label: 'Kits' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/showcase', label: 'Components' },
  { href: '/docs', label: 'Docs' },
  { href: '/license', label: 'License' },
]

export function SiteHeader() {
  return (
    <header className="rt-raised sticky top-0 z-30 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-[13px] font-semibold tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent"
        >
          <span aria-hidden="true" className="rt-title flex size-6 items-center justify-center rounded-[2px] text-[11px]">
            R
          </span>
          RetroKit.exe
        </a>
        <nav aria-label="Main" className="flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden px-3 py-1 text-[13px] hover:bg-rt-accent hover:text-rt-on-accent focus-visible:outline-2 focus-visible:outline-rt-accent sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/poliedro-69/retro-kit-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="Open RetroKit on GitHub"
            className="ml-1 inline-flex size-7 items-center justify-center border border-transparent hover:border-rt-border hover:bg-rt-accent hover:text-rt-on-accent focus-visible:outline-2 focus-visible:outline-rt-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.58 1.19 3.21.91.1-.71.38-1.19.7-1.46-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.13-3.04-.11-.28-.49-1.44.11-3 0 0 .92-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.18-1.46 3.1-1.16 3.1-1.16.6 1.56.22 2.72.11 3 .7.79 1.13 1.8 1.13 3.04 0 4.35-2.65 5.3-5.17 5.59.39.34.74 1 .74 2.02v3c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
            </svg>
          </a>
          <a
            href="https://github.com/sponsors/poliedro-69"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-1 border-2 border-rt-border bg-[#ffcc00] px-3 py-1 font-mono text-[12px] font-bold text-black shadow-[2px_2px_0_#000] hover:translate-y-px hover:shadow-[1px_1px_0_#000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent"
          >
            <span aria-hidden="true">$</span>
            Donate
          </a>
        </nav>
      </div>
    </header>
  )
}
