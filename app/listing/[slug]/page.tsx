// @ts-nocheck
import type { Metadata } from 'next'
import Image from 'next/image'
import { getSheetRows } from '@/lib/sheets'

// dynamic route params are now a Promise in Next 15+
type ParamsP = Promise<{ slug: string }>

export async function generateStaticParams() {
  const rows = await getSheetRows()
  return rows.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(
  { params }: { params: ParamsP }
): Promise<Metadata> {
  const { slug } = await params
  const rows = await getSheetRows()
  const item = rows.find(r => r.slug === slug)

  const title = item?.name ?? 'Listing'
  const description =
    item?.description?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    `Details for ${item?.name ?? 'this listing'}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: item?.image_url ? [item.image_url] : []
    }
  }
}

export default async function ListingPage({ params }: { params: ParamsP }) {
  const { slug } = await params
  const rows = await getSheetRows()
  const item = rows.find(r => r.slug === slug)
  if (!item) return <div className="container py-10">Not found.</div>

  // JSON-LD without location/phone/website — use Article for content pages
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.name,
    description: (item.description || '').replace(/<[^>]*>/g, '').slice(0, 200),
    image: item.image_url || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window === 'undefined' ? '' : window.location.href
    }
  }

  return (
    <div className="container py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="card overflow-hidden lg:col-span-5">
          <div className="relative h-64 w-full bg-gray-100">
            {item.image_url ? (
              <Image src={item.image_url} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>
          <div className="p-5">
            <h1 className="text-3xl font-semibold">{item.name}</h1>
            {item.category && <p className="badge mt-2 inline-block">{item.category}</p>}
            {item.description && (
              <div
                className="mt-4 rich-content text-gray-700 leading-7"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
