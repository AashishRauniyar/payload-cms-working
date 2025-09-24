import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import React from 'react'
import type { Category, Post } from '@/payload-types'
import BlogPageClient from '../../BlogPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // Find the category by slug
  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryResult.docs[0] as Category | undefined

  if (!category) {
    notFound()
  }

  // Find posts in this category
  const postsResult = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 100,
    overrideAccess: isDraftMode,
    trash: false,
    where: {
      and: [
        {
          categories: {
            contains: category.id,
          },
        },
        isDraftMode
          ? {}
          : {
              status: {
                equals: 'published',
              },
            },
      ],
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{category.title}</h1>
            {category.description && (
              <div className="text-lg text-gray-600 max-w-2xl mx-auto">
                {/* You can render the rich text description here if needed */}
                <p>Articles in {category.title}</p>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500">
              {postsResult.docs.length} article{postsResult.docs.length !== 1 ? 's' : ''} in this
              category
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <BlogPageClient posts={postsResult.docs as Post[]} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise

  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryResult.docs[0] as Category | undefined

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${category.title} - HealthScopeDaily`,
    description: `Browse health and wellness articles in ${category.title}. Expert insights and research-backed information.`,
    alternates: {
      canonical: `/blog/categories/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateStaticParams() {
  // Skip static generation during Docker build
  return []
}
