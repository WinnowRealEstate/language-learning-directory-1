// components/hero.tsx
type HeroProps = {
  title: string
  subtitle: string
  tag?: string
  imageUrl?: string
}

export default function Hero({ title, subtitle, tag, imageUrl }: HeroProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white pointer-events-none" />
      <div className="container relative py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          {tag && (
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1 text-xs text-brand-700 shadow-sm">
              <span>{tag}</span>
            </div>
          )}
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-gray-600 text-lg">{subtitle}</p>
        </div>

        {imageUrl && (
          <div className="relative h-56 md:h-72 w-full">
            {/* simple image container; you can later swap to next/image */}
            <div
              className="h-full w-full rounded-2xl bg-cover bg-center shadow-card border border-gray-100"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
