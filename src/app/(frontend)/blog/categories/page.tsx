import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import PageClient from './page.client'
import BlogPageClient from './BlogPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const blogPosts = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    limit: 100,
    overrideAccess: isDraftMode,
    trash: false,
    where: isDraftMode
      ? {}
      : {
          status: {
            equals: 'published',
          },
        },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <PageClient />
      <BlogPageClient posts={blogPosts.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog - HealthScopeDaily`,
    description:
      'Browse our comprehensive collection of blog articles, expert insights, research-backed guides, and wellness tips from healthcare professionals.',
    alternates: { canonical: '/blog' },
    robots: { index: true, follow: true },
  }
}