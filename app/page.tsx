import { Faq } from '@/components/landing/faq'
import { Hero } from '@/components/landing/hero'
import { KitCatalog } from '@/components/landing/kit-catalog'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'

export default function Page() {
  return (
    <div id="top" className="rt-desktop min-h-screen scroll-smooth">
      <SiteHeader />
      <main>
        <Hero />
        <KitCatalog />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
