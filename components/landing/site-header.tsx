import { RetroLinkButton } from '@/components/retro-ui'

const links = [
  { href: '/#kits', label: 'Kits' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/showcase', label: 'Components' },
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
              className="hidden px-3 py-1 text-[13px] hover:bg-rt-accent hover:text-white focus-visible:outline-2 focus-visible:outline-rt-accent sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <RetroLinkButton href="/#kits" variant="primary" size="sm" className="ml-2">
            Get free kits
          </RetroLinkButton>
        </nav>
      </div>
    </header>
  )
}
