
import { NextResponse } from 'next/server'
import { ENV } from '@/lib/env'

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${ENV.SITE_URL}/sitemap.xml
`
  return new NextResponse(body, { headers: { 'Content-Type': 'text/plain' } })
}
