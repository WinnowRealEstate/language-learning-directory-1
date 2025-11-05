
import Link from 'next/link'
import ListingCard from '@/components/listing-card'
import { getSheetRows } from '@/lib/sheets'

export async function generateStaticParams() {
  const rows = await getSheetRows()
  const categories = Array.from(new Set(rows.map(r => r.category).filter(Boolean))) as string[]
  return categories.map(name => ({ name }))
}

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const rows = await getSheetRows()
  const list = rows.filter(r => r.category === params.name)

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{params.name}</h1>
        <Link href="/" className="text-sm hover:underline">← Back</Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(item => <ListingCard key={item.slug} item={item} />)}
      </div>
    </div>
  )
}
