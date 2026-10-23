import { Faq } from '@/components/landing/faq'
import { Hero } from '@/components/landing/hero'
import { KitCatalog } from '@/components/landing/kit-catalog'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RetroKit',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Poliedro69', url: 'https://machinetix.com' },
  }

  return (
    <div id="top" className="rt-desktop min-h-screen scroll-smooth">
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
