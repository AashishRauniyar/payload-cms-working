import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import type { Post, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

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

  const featuredPost = posts.docs[0] as Post
  const otherPosts = posts.docs.slice(1) as Post[]

  return (
    <div className="min-h-screen bg-white pt-16">
      <PageClient />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Expert Health Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest research-backed articles, product reviews, and wellness
            insights from health experts.
          </p>
        </div>

        {posts.docs.length > 0 ? (
          <>
            {/* Featured Post */}
            {featuredPost && <FeaturedPost post={featuredPost} />}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-16">
              {posts.totalPages > 1 && posts.page && (
                <Pagination page={posts.page} totalPages={posts.totalPages} />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No blog posts yet</h2>
            <p className="text-gray-500">Check back soon for expert health and wellness content!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'

  return (
    <article className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
              Featured Article
            </span>
            <time className="text-gray-500 text-sm">{publishedDate}</time>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight">{post.title}</h2>

          {post.meta?.description && (
            <p className="text-lg text-gray-600 leading-relaxed">{post.meta.description}</p>
          )}

          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <span>Read Full Article</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-blue-200 flex items-center justify-center">
              <div className="text-6xl text-primary-400">📰</div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function BlogCard({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Image */}
        <div className="aspect-[16/10] relative rounded-xl overflow-hidden bg-gray-100 mb-4">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-3xl text-gray-400">📄</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <time>{publishedDate}</time>
            {post.categories && post.categories.length > 0 && (
              <>
                <span>•</span>
                <span className="text-primary-600">
                  {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Health'}
                </span>
              </>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.meta?.description && (
            <p className="text-gray-600 line-clamp-3">{post.meta.description}</p>
          )}
        </div>
      </Link>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Health Blog - HealthScopeDaily`,
    description: 'Latest health and wellness blog posts, expert insights, and product reviews.',
  }
}
