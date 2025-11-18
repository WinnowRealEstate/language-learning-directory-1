// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getHomeConfig } from '@/lib/home'

// dynamic metadata based on home_page sheet
export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeConfig()
  const siteName = home.site_name || 'Atlas Directory'
  const description =
    home.site_tagline ||
    'Ultra-fast directory powered by Google Sheets + Next.js'

  return {
    title: {
      default: siteName,
      template: `%s · ${siteName}`,
    },
    description,
    icons: { icon: '/favicon.svg' },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const home = await getHomeConfig()
  const year = new Date().getFullYear()
  
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body>
        <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.svg" alt="logo" className="h-6 w-6" />
              <span className="font-semibold text-lg tracking-tight">
                {home.site_name}
              </span>
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t">
          <div className="container py-10 text-sm text-gray-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p>
                © {year} {home.site_name}. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link className="hover:underline" href="/sitemap.xml">
                  Sitemap
                </Link>
                <Link className="hover:underline" href="/robots.txt">
                  Robots
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
