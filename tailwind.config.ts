
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6ff',
          100: '#e7ecff',
          200: '#cfd9ff',
          300: '#aabaff',
          400: '#7c90ff',
          500: '#596dff',
          600: '#4452db',
          700: '#3943b4',
          800: '#323b93',
          900: '#2b3478'
        }
      },
      boxShadow: {
        card: '0 8px 24px rgba(17, 24, 39, 0.08)'
      }
    },
  },
  plugins: [],
} satisfies Config
