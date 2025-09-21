import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import CategoryPostsClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  // Find the category by slug
  const categoryQuery = await payload.find({
    collection: 'blog-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryQuery.docs[0]

  if (!category) {
    notFound()
  }

  // Fetch blog posts for this category
  const blogPosts = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    limit: 100,
    overrideAccess: isDraftMode,
    trash: false,
    where: {
      and: [
        isDraftMode
          ? {}
          : {
              status: {
                equals: 'published',
              },
            },
        {
          blogCategories: {
            contains: category.id,
          },
        },
      ],
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <CategoryPostsClient category={category} posts={blogPosts.docs} />
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'blog-categories',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return categories.docs.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryQuery = await payload.find({
    collection: 'blog-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryQuery.docs[0]

  if (!category) {
    return {
      title: 'Category Not Found - HealthScopeDaily',
    }
  }

  return {
    title: `${category.name} - Blog Category - HealthScopeDaily`,
    description:
      category.description ||
      `Browse all blog posts in the ${category.name} category. Find expert insights, research-backed guides, and wellness tips.`,
    alternates: { canonical: `/blog/categories/${slug}` },
    robots: { index: true, follow: true },
  }
}
