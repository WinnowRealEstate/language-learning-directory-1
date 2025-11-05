
import type { MetadataRoute } from 'next'
import { getSheetRows } from '@/lib/sheets'
import { ENV } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = ENV.SITE_URL
  const rows = await getSheetRows()

  const listings = rows.map(r => ({
    url: `${base}/listing/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  const categories = Array.from(new Set(rows.map(r => r.category).filter(Boolean))) as string[]
  const cats = categories.map(c => ({
    url: `${base}/category/${encodeURIComponent(c)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  return [{ url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }, ...cats, ...listings]
}
