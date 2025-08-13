import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { Post, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Supplements - HealthScopeDaily',
  description:
    'Comprehensive reviews and guides for health supplements, vitamins, and wellness products.',
}

async function getSupplementPosts() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 50,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return posts.docs as Post[]
}

export default async function SupplementsPage() {
  const posts = await getSupplementPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Articles</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive reviews, guides, and expert insights on supplements, health
            products, and wellness solutions to help you make informed decisions.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No articles yet</h2>
            <p className="text-gray-500">Check back soon for expert health and wellness content!</p>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {posts.length >= 50 && (
          <div className="text-center mt-12">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Featured Image */}
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-4xl text-primary-400">🏥</div>
          </div>
        )}

        {/* Category Badge */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-700">
              {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Health'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center space-x-4 mb-3">
          <time className="text-sm text-gray-500">{publishedDate}</time>
          {post.authors && post.authors.length > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">
                {typeof post.authors[0] === 'object' && 'name' in post.authors[0]
                  ? post.authors[0].name
                  : 'HealthScope Team'}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        {post.meta?.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.meta.description}
          </p>
        )}

        {/* Read More */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center space-x-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
        >
          <span>Read more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
