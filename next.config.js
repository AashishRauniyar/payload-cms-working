// next.config.ts/js
import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const vercelHost = process.env.VERCEL_URL
const NEXT_PUBLIC_SERVER_URL = vercelHost
  ? `https://${vercelHost}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3019'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }, // 👈 allow build to pass if TS errors exist
  output: 'standalone',
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const u = new URL(item)
        return {
          protocol: u.protocol.replace(':', ''),
          hostname: u.hostname,
          port: u.port || '', // 👈 include port so Docker dev images load
          pathname: '/**',
        }
      }),
      {
        protocol: 'https',
        hostname: 'healthylifestyletips.online',
        port: '',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'www.healthylifestyletips.online',
        port: '',
        pathname: '/api/media/file/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
    unoptimized: false,
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return config
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
