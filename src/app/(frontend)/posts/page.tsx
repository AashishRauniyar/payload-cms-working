import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { BlogPageClient } from './BlogPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 100, // Increased limit for better browsing
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <PageClient />
      <BlogPageClient posts={posts.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Health Articles - HealthScopeDaily`,
    description:
      'Browse our comprehensive collection of health articles, expert insights, research-backed guides, and wellness tips from healthcare professionals.',
    alternates: { canonical: '/posts' },
    robots: { index: true, follow: true },
  }
}
