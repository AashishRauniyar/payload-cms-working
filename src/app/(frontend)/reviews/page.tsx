import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import type { Category, Post } from '@/payload-types'
import ReviewsPageClient from './ReviewsPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Product Reviews - HealthScopeDaily',
  description:
    'Comprehensive health product reviews and insights organized by category. Find expert reviews on supplements, skincare, and wellness products.',
  alternates: { canonical: '/reviews' },
  robots: { index: true, follow: true },
}

async function getCategories() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'title',
    depth: 2,
  })

  return categories.docs as Category[]
}

async function getPosts() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 100,
    sort: '-publishedAt',
    depth: 2,
  })

  return posts.docs as Post[]
}

export default async function ReviewsPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()])

  return (
    <div className="min-h-screen bg-gray-50">
      <ReviewsPageClient categories={categories} posts={posts} />
    </div>
  )
}
