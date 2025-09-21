import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Category, Post } from '@/payload-types'
import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // First, find the category by slug
  const categories = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: isDraftMode,
  })

  const category = categories.docs?.[0]

  if (!category) {
    return notFound()
  }

  // Then find all posts that belong to this category
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 50,
    overrideAccess: isDraftMode,
    where: {
      categories: {
        contains: category.id,
      },
      ...(isDraftMode
        ? {}
        : {
            _status: {
              equals: 'published',
            },
          }),
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <PageClient category={category} posts={posts.docs} />
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const categories = await payload.find({
      collection: 'categories',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    const params = categories.docs.map(({ slug }) => {
      return { slug }
    })

    return params
  } catch (error) {
    if (error instanceof Error) {
      console.warn(
        'Database not available during build, skipping static generation:',
        error.message,
      )
    } else {
      console.warn('Database not available during build, skipping static generation:', error)
    }
    return []
  }
}

export async function generateMetadata({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categories.docs?.[0]

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }

  const title = `${category.title} - Blog Category`
  const descriptionText = category.description
    ? typeof category.description === 'string'
      ? category.description
      : 'Browse all articles in this category'
    : 'Browse all articles in this category'

  const description = `Browse all articles in the ${category.title} category. ${descriptionText}`

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/categories/${category.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      ...(category.image &&
        typeof category.image === 'object' && {
          images: [
            {
              url: category.image.url || '',
              width: category.image.width || 1200,
              height: category.image.height || 630,
              alt: category.title,
            },
          ],
        }),
    },
  }
}
