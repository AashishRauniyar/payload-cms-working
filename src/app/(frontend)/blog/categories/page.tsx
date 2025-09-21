import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import CategoriesPageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function BlogCategoriesPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  // Fetch all blog categories
  const blogCategories = await payload.find({
    collection: 'blog-categories',
    depth: 1,
    limit: 100,
    overrideAccess: isDraftMode,
    sort: 'name',
  })

  // Fetch blog posts with their categories to calculate post counts
  const blogPosts = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    limit: 1000,
    overrideAccess: isDraftMode,
    trash: false,
    where: isDraftMode
      ? {}
      : {
          status: {
            equals: 'published',
          },
        },
    select: {
      id: true,
      blogCategories: true,
    },
  })

  // Calculate post counts for each category
  const categoriesWithCounts = blogCategories.docs.map((category) => {
    const postCount = blogPosts.docs.filter((post) =>
      Array.isArray(post.blogCategories)
        ? post.blogCategories.some(
            (cat: any) => (typeof cat === 'object' ? cat.id : cat) === category.id,
          )
        : false,
    ).length

    return {
      ...category,
      postCount,
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <CategoriesPageClient categories={categoriesWithCounts} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog Categories - HealthScopeDaily',
    description:
      'Browse our blog articles by category. Find content organized by health topics, wellness guides, research insights, and expert advice.',
    alternates: { canonical: '/blog/categories' },
    robots: { index: true, follow: true },
  }
}
