import { NextResponse } from 'next/server'

const getSiteURL = () =>
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

export async function GET() {
  const SITE_URL = getSiteURL()

  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
