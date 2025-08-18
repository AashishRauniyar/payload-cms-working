import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Category, Post, Media } from '@/payload-types'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return categories.docs.map((category) => ({
    slug: category.slug,
  }))
}

async function getCategoryBySlug(slug: string) {
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

  return categories.docs[0] as Category | null
}

async function getPostsByCategory(categoryId: number) {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      categories: {
        contains: categoryId,
      },
      _status: {
        equals: 'published',
      },
    },
    limit: 50,
    sort: '-publishedAt',
    depth: 2,
  })

  return posts.docs as Post[]
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(Number(category.id))

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Category Image (optional) */}
          {category.image && typeof category.image === 'object' && (
            <div className="w-full max-w-3xl mx-auto mb-6">
              <Image
                src={(category.image as Media).url as string}
                alt={(category.image as Media).alt || category.title}
                width={1200}
                height={400}
                className="w-full h-56 md:h-72 object-cover rounded-xl"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>

          {/* Category Description (optional) */}
          {category.description &&
          typeof category.description === 'object' &&
          'root' in category.description ? (
            <div className="prose prose-gray max-w-3xl mx-auto text-left">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              {/* Render minimal Lexical JSON as plain text fallback */}
              <p className="text-lg text-gray-600">
                {/* @ts-expect-error generic richText shape */}
                {category.description.root?.children?.[0]?.children?.[0]?.text ?? ''}
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-600">
              Articles and insights related to {category.title.toLowerCase()}
            </p>
          )}

          {/* Breadcrumb */}
          <nav className="mt-6">
            <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary-600">
                  Categories
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li className="text-gray-900 font-medium">{category.title}</li>
            </ol>
          </nav>
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
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No articles in this category yet
            </h2>
            <p className="text-gray-500 mb-8">Check back soon for new content!</p>
            <Link
              href="/posts"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Browse All Articles
            </Link>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found - HealthScopeDaily',
    }
  }

  return {
    title: `${category.title} - HealthScopeDaily`,
    description: `Browse articles and insights related to ${category.title}`,
  }
}
