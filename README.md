
# Next.js + Google Sheets Directory (Pretty UI)

A **beautiful, blazing‑fast** directory where each row in a **Google Sheet** becomes a **static page**.
Built with Next.js App Router + Tailwind. Perfect for programmatic SEO and ads.

## Features
- Google Sheets as your CMS (service account, read‑only)
- Static pages for listings and categories
- Search page (simple fuzzy match)
- JSON‑LD LocalBusiness schema
- `sitemap.xml` + `robots.txt`
- Pretty UI: hero, cards, category pills, responsive layout
- Zero auth, zero payments, zero CMS bloat

## 1) Prepare your Google Sheet
- Create a sheet with a tab named **Listings**
- Header row (A1..):  
  `name | slug | category | address | city | state | postal_code | country | phone | website | description | image_url | lat | lng | rating`
- Ensure **unique `slug`** values

## 2) Create a Google service account
- Enable **Google Sheets API**
- Create a **Service Account** and JSON key
- **Share the sheet** to the service account email as **Viewer**

## 3) Configure env vars
Create `.env.local` with:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000

SHEET_ID=YOUR_SHEET_ID
SHEET_RANGE=Listings!A1:N

GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 4) Run
```
npm install
npm run dev
```

## 5) Deploy
- Push to GitHub, import to Vercel/Netlify
- Add the same env vars in project settings
- Ship 🚀

## Notes
- For very large sheets, consider caching to JSON during build or splitting by category.
- To add programmatic SEO hubs (e.g., `/tx/houston/restaurants`), create route segments that group by city/state/category using `getSheetRows()`.
- Add your ad network script and place it inside the “Sponsored” card on the listing page.
