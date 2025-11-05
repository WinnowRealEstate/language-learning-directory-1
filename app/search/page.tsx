
import Link from 'next/link'
import ListingCard from '@/components/listing-card'
import { getSheetRows } from '@/lib/sheets'

function normalize(s: string) { return s.toLowerCase() }

export default async function Search({ searchParams }: { searchParams: { q?: string } }) {
  const q = normalize(searchParams.q || '')
  const rows = await getSheetRows()
  const list = q
    ? rows.filter(r => normalize(JSON.stringify(r)).includes(q))
    : rows

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Search</h1>
        <Link href="/" className="text-sm hover:underline">← Back</Link>
      </div>
      <p className="text-sm text-gray-600">Results for: {q || 'all'}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, 60).map(item => <ListingCard key={item.slug} item={item} />)}
      </div>
    </div>
  )
}
