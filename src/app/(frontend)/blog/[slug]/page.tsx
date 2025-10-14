import type { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { getServerSideURL } from '@/utilities/getURL'
import RichText from '@/components/RichText'

import type { BlogPost } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { BlogPostHero } from '@/heros/BlogPostHero/BlogPostHero'

// Simple PageClient component inline
function PageClient() {
  return null
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Skip static generation during Docker build
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function BlogPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/blog/' + slug
  const post = await queryBlogPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const siteUrl = getServerSideURL()

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.meta?.description || undefined,
    author:
      post.populatedAuthors && post.populatedAuthors.length > 0
        ? {
            '@type': 'Person',
            name: post.populatedAuthors
              .map((a) => a?.name)
              .filter(Boolean)
              .join(', '),
          }
        : undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    image:
      post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url
        ? siteUrl + post.meta.image.url
        : post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url
          ? siteUrl + post.featuredImage.url
          : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': siteUrl + url },
    publisher: { '@type': 'Organization', name: 'HealthScopeDaily' },
    url: siteUrl + url,
  }

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <Script id="ld-article" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleLd)}
      </Script>

      <BlogPostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-black [&_*]:text-black">
              <RichText data={post.content} enableGutter={false} />
            </div>

            {/* Related Blog Posts */}
            {post.relatedBlogPosts && post.relatedBlogPosts.length > 0 && (
              <div className="mt-16 border-t pt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.relatedBlogPosts
                    .filter((relatedPost) => typeof relatedPost === 'object')
                    .slice(0, 4)
                    .map((relatedPost) => (
                      <RelatedBlogPostCard key={relatedPost.id} post={relatedPost} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function RelatedBlogPostCard({ post }: { post: BlogPost }) {
  const featuredImage =
    post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <a href={`/blog/${post.slug}`} className="block">
        {featuredImage?.url && (
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">{publishedDate}</div>
          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 break-words">
            {post.title}
          </h4>
          {post.excerpt && <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>}
        </div>
      </a>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryBlogPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryBlogPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog-posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    trash: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
