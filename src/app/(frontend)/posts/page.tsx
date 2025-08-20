import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { BlogPageClient } from './BlogPageClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 20,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-white">
      <PageClient />
      <BlogPageClient posts={posts.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Health Blog - HealthScopeDaily`,
    description: 'Latest health and wellness blog posts, expert insights, and product reviews.',
    alternates: { canonical: '/posts' },
    robots: { index: true, follow: true },
  }
}
