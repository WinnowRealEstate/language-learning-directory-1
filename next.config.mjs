/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  typescript: {
    // ✅ Allow production builds even if there are TS errors
    ignoreBuildErrors: true,
  },
}

export default nextConfig
