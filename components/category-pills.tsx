
import Link from 'next/link'

export default function CategoryPills({ cats }: { cats: string[] }) {
  if (!cats.length) return null
  return (
    <section className="container mt-10">
      <h2 className="text-lg font-medium mb-3">Browse by category</h2>
      <ul className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <li key={c}>
            <Link href={`/category/${encodeURIComponent(c)}`} className="badge hover:bg-gray-50">
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
