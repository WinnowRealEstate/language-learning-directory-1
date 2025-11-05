// app/page.tsx
import Hero from '@/components/hero'
import SearchBar from '@/components/search-bar'
import ListingCard from '@/components/listing-card'
import { getSheetRows } from '@/lib/sheets'
import { getHomeConfig } from '@/lib/home'

export default async function Home() {
  const [rows, home] = await Promise.all([
    getSheetRows(),
    getHomeConfig(),
  ])

  return (
    <>
      <Hero
        title={home.hero_title || 'A beautiful, blazing-fast directory'}
        subtitle={
          home.hero_subtitle ||
          'Manage listings in Google Sheets. Pre-render clean, SEO-friendly pages and serve them from the edge.'
        }
        tag={home.site_tagline}
        imageUrl={home.hero_image_url}
      />
      <SearchBar />

      <section className="container mt-6">
        <h2 className="text-lg font-medium mb-3">Featured</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.slice(0, 9).map((item) => (
            <ListingCard key={item.slug} item={item} />
          ))}
        </div>
        {rows.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">
            No listings yet. Check your Google Sheet headers and slugs.
          </p>
        )}
      </section>
    </>
  )
}
