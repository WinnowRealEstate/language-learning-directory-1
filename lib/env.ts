// lib/env.ts
export const ENV = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  SHEET_CSV_URL: process.env.SHEET_CSV_URL || '',
  SHEET_HOME_CSV_URL: process.env.SHEET_HOME_CSV_URL || '',
}
