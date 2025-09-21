import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import CategoryPageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

interface PageParams {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: PageParams) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  // First, find the category by slug
  const categoryResult = await payload.find({
    collection: 'blog-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const category = categoryResult.docs[0]

  if (!category) {
    return notFound()
  }

  // Then fetch all blog posts that belong to this category
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
            in: [category.id],
          },
        },
      ],
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <CategoryPageClient category={category} posts={blogPosts.docs} />
    </div>
  )
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'blog-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const category = categoryResult.docs[0]

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Blog Category | HealthScopeDaily`,
    description:
      category.description ||
      `Explore articles in the ${category.name} category. Expert insights, research-backed guides, and wellness tips from healthcare professionals.`,
    alternates: { canonical: `/blog/category/${slug}` },
    robots: { index: true, follow: true },
  }
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'blog-categories',
    depth: 0,
    limit: 100,
    where: {},
  })

  return categories.docs.map((category) => ({
    slug: category.slug,
  }))
}
