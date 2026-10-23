import type { MetadataRoute } from 'next'
import { getExplorerData } from '@/components/showcase/explorer/registry'
import { site } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const data = await getExplorerData()
  const componentUrls = data.kits.flatMap((kit) =>
    kit.categories.flatMap((category) =>
      category.items.map((item) => ({
        url: `${site.siteUrl}/components/${kit.id}/${item.id.replace(/^(win|mac)-/, '')}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
  )

  return [
    ...['', '/docs', '/showcase', '/license'].map((path) => ({
      url: `${site.siteUrl}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...componentUrls,
  ]
}
