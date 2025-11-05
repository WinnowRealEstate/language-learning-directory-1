// lib/home.ts
import Papa from 'papaparse'
import { ENV } from './env'

export type HomeConfig = {
  site_name: string
  site_tagline?: string
  hero_title?: string
  hero_subtitle?: string
  hero_image_url?: string
}

function clean(s: any): string {
  return (s ?? '').toString().trim()
}

export async function getHomeConfig(): Promise<HomeConfig> {
  if (!ENV.SHEET_HOME_CSV_URL) {
    console.warn('⚠️ SHEET_HOME_CSV_URL is not set, using defaults')
    return {
      site_name: 'Atlas Directory',
      site_tagline: 'Ultra-fast directory powered by Google Sheets + Next.js',
      hero_title: 'A beautiful, blazing-fast directory',
      hero_subtitle:
        'Manage listings in Google Sheets. Pre-render clean, SEO-friendly pages and serve them from the edge.',
      hero_image_url: '',
    }
  }

  const res = await fetch(ENV.SHEET_HOME_CSV_URL)
  if (!res.ok) {
    console.error(
      '❌ Failed to fetch home_page CSV:',
      res.status,
      res.statusText
    )
    return {
      site_name: 'Atlas Directory',
    }
  }

  const csvText = await res.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  const rows = parsed.data as any[]

  if (!rows.length) {
    console.warn('⚠️ home_page CSV has no rows, using defaults')
    return {
      site_name: 'Atlas Directory',
    }
  }

  const row = rows[0]

  // normalize keys to lowercase
  const normalized: Record<string, string> = {}
  Object.entries(row).forEach(([key, value]) => {
    const k = key.toString().trim().toLowerCase()
    normalized[k] = clean(value)
  })

  return {
    site_name: normalized['site_name'] || 'Atlas Directory',
    site_tagline: normalized['site_tagline'] || '',
    hero_title:
      normalized['hero_title'] ||
      'A beautiful, blazing-fast directory',
    hero_subtitle:
      normalized['hero_subtitle'] ||
      'Manage listings in Google Sheets. Pre-render clean, SEO-friendly pages and serve them from the edge.',
    hero_image_url: normalized['hero_image_url'] || '',
  }
}
