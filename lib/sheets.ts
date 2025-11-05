// lib/sheets.ts — public CSV version with logging + header normalization
import Papa from 'papaparse'
import { ENV } from './env'

export type Listing = {
  name: string
  slug: string
  taxonomy?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  phone?: string
  website?: string
  description?: string
  image_url?: string
  lat?: string
  lng?: string
  rating?: string
}

function clean(s: any): string {
  return (s ?? '').toString().trim()
}

export async function getSheetRows(): Promise<Listing[]> {
  if (!ENV.SHEET_CSV_URL) {
    console.error('❌ SHEET_CSV_URL is not set in env')
    return []
  }

  console.log('⬇️ Fetching CSV from', ENV.SHEET_CSV_URL)

  const res = await fetch(ENV.SHEET_CSV_URL)
  if (!res.ok) {
    console.error('❌ Failed to fetch CSV:', res.status, res.statusText)
    return []
  }

  const csvText = await res.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  // normalize keys to lowercase so Name / NAME / name all work
  const rows = (parsed.data as any[]).map((row, idx) => {
    const normalized: Record<string, string> = {}
    Object.entries(row).forEach(([key, value]) => {
      const k = key.toString().trim().toLowerCase()
      normalized[k] = clean(value)
    })

    return {
      name: normalized['name'] || '',
      slug: normalized['slug'] || '',
      taxonomy: normalized['taxonomy'] || '',
      address: normalized['address'] || '',
      city: normalized['city'] || '',
      state: normalized['state'] || '',
      postal_code: normalized['postal_code'] || '',
      country: normalized['country'] || '',
      phone: normalized['phone'] || '',
      website: normalized['website'] || '',
      description: normalized['description'] || '',
      image_url: normalized['image_url'] || '',
      lat: normalized['lat'] || '',
      lng: normalized['lng'] || '',
      rating: normalized['rating'] || '',
    } as Listing
  })

  const filtered = rows.filter((r) => r.name && r.slug)

  console.log(
    `✅ Parsed ${rows.length} rows from CSV, ${filtered.length} have name+slug`
  )

  return filtered
}
