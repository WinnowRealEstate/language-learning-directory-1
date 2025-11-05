// lib/taxonomy.ts

// clean up a taxonomy string like " Languages / Spanish / Games  "
export function normalizeTax(s?: string) {
  return (s || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')   // trim leading/trailing slashes
    .replace(/\s+/g, '-')        // spaces -> hyphens
    .toLowerCase()
}

// split "languages/spanish/games" into ['languages', 'spanish', 'games']
export function splitTax(s?: string) {
  const n = normalizeTax(s)
  return n ? n.split('/').filter(Boolean) : []
}

// join ['languages', 'spanish', 'games'] -> 'languages/spanish/games'
export function joinTax(parts: string[]) {
  return parts.map((p) => normalizeTax(p)).filter(Boolean).join('/')
}
