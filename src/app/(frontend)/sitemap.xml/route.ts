import { getServerSideSitemapIndex } from 'next-sitemap'

const getSiteURL = () =>
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

export async function GET() {
  const SITE_URL = getSiteURL()

  return getServerSideSitemapIndex([
    `${SITE_URL}/pages-sitemap.xml`,
    `${SITE_URL}/posts-sitemap.xml`,
  ])
}
