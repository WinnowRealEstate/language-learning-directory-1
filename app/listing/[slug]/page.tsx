// @ts-nocheck
import type { Metadata } from 'next'
import Image from 'next/image'
import { getSheetRows } from '@/lib/sheets'


export async function generateStaticParams() {
  const rows = await getSheetRows()
  return rows.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rows = await getSheetRows()
  const item = rows.find(r => r.slug === params.slug)
  const title = item ? `${item.name} – ${item.city ?? ''} ${item.state ?? ''}`.trim() : 'Listing'
  const description = item?.description || `Details for ${item?.name ?? 'this listing'}.`
  return { title, description, openGraph: { title, description, images: item?.image_url ? [item.image_url] : [] } }
}

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const rows = await getSheetRows()
  const item = rows.find(r => r.slug === params.slug)
  if (!item) return <div className="container py-10">Not found.</div>

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: item.name,
    url: item.website || undefined,
    telephone: item.phone || undefined,
    image: item.image_url || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: item.address || undefined,
      addressLocality: item.city || undefined,
      addressRegion: item.state || undefined,
      postalCode: item.postal_code || undefined,
      addressCountry: item.country || 'US'
    },
    geo: item.lat && item.lng ? { '@type': 'GeoCoordinates', latitude: item.lat, longitude: item.lng } : undefined,
    aggregateRating: item.rating ? { '@type': 'AggregateRating', ratingValue: item.rating, reviewCount: 1 } : undefined
  }

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="card overflow-hidden lg:col-span-3">
          <div className="relative h-64 w-full bg-gray-100">
            {item.image_url ? (
              <Image src={item.image_url} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">No image</div>
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

        <aside className="lg:col-span-2 space-y-4">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold">Details</h2>
            <p className="text-sm text-gray-600">{[item.address, item.city, item.state, item.postal_code].filter(Boolean).join(', ')}</p>
            {item.phone && <p className="text-sm">📞 {item.phone}</p>}
            {item.website && <p className="text-sm">🔗 <a className="underline" href={item.website} target="_blank" rel="noreferrer">{item.website}</a></p>}
          </div>

          <div className="card p-5">
            <h2 className="font-semibold mb-2">Sponsored</h2>
            <div className="h-24 grid place-items-center border border-dashed rounded-lg text-gray-400 text-sm">
              Ad Slot
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
