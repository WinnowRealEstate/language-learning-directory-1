export default function SearchBar() {
  return (
    <form action="/search" className="container mt-6 md:mt-8 relative z-10">
      <div className="card p-3 md:p-4 flex items-center gap-2">
        <input
          name="q"
          placeholder="Search by keyword or title"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button className="btn-primary">Search</button>
      </div>
    </form>
  )
}
