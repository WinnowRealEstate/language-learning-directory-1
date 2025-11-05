
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/sheets'

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <Link href={`/listing/${item.slug}`} className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-44 w-full bg-gray-100">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{item.name}</h3>
          {item.category ? <span className="badge">{item.category}</span> : null}
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {[item.city, item.state].filter(Boolean).join(', ')}
        </p>
      </div>
    </Link>
  )
}
