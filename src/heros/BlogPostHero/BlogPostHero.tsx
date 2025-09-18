import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { BlogPost } from '@/payload-types'

import { Media } from '@/components/Media'
import Link from 'next/link'
import { formatAuthors } from '@/utilities/formatAuthors'

export const BlogPostHero: React.FC<{
  post: BlogPost
}> = ({ post }) => {
  const {
    blogCategories,
    featuredImage,
    populatedAuthors,
    publishedAt,
    updatedAt,
    title,
    excerpt,
    hideFeaturedImageInArticle,
  } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="text-black pt-8 pb-6">
      <div className="container mx-auto px-4">
        {/* Constrain header elements to the same content column */}
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Category */}
          <nav className="mb-2" aria-label="Breadcrumb">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                Home
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="/blog" className="text-gray-400 hover:text-gray-600">
                Blog
              </Link>
              {blogCategories && blogCategories.length > 0 && (
                <>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blue-400 font-medium">
                    {blogCategories.map((category, index) => {
                      if (typeof category === 'object' && category !== null) {
                        const { name: categoryName } = category
                        const nameToUse = categoryName || 'Untitled category'
                        const categorySlug = (category as { slug?: string }).slug
                        const isLast = index === blogCategories.length - 1
                        return (
                          <React.Fragment key={index}>
                            {categorySlug ? (
                              <Link
                                href={`/blog/category/${categorySlug}`}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                {nameToUse}
                              </Link>
                            ) : (
                              <span>{nameToUse}</span>
                            )}
                            {!isLast && <span>, </span>}
                          </React.Fragment>
                        )
                      }
                      return null
                    })}
                  </span>
                </>
              )}
            </div>
          </nav>

          {/* Category Badge */}
          {blogCategories && blogCategories.length > 0 && (
            <div className="mb-4">
              {blogCategories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { name: categoryName } = category
                  const nameToUse = categoryName || 'Untitled category'
                  const categorySlug = (category as { slug?: string }).slug

                  return categorySlug ? (
                    <Link
                      key={index}
                      href={`/blog/category/${categorySlug}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-blue-700 mr-2"
                    >
                      {nameToUse}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mr-2"
                    >
                      {nameToUse}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{title}</h1>

          {/* Excerpt */}
          {excerpt && <p className="text-xl text-gray-600 leading-relaxed mb-8">{excerpt}</p>}

          {/* Date Information and Author - Single Line */}
          <div className={hideFeaturedImageInArticle ? 'mb-2' : 'mb-4'}>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {/* Date Information */}
              {publishedAt && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <time dateTime={publishedAt} className="text-sm text-gray-600 font-medium">
                      {formatDateTime(publishedAt)}
                    </time>
                  </div>
                </div>
              )}

              {updatedAt && updatedAt !== publishedAt && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <time dateTime={updatedAt} className="text-sm text-gray-600 font-medium">
                      Updated {formatDateTime(updatedAt)}
                    </time>
                  </div>
                </div>
              )}

              {/* Separator */}
              {(publishedAt || (updatedAt && updatedAt !== publishedAt)) && hasAuthors && (
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
              )}

              {/* Author Information */}
              {hasAuthors && (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600">
                    by{' '}
                    {populatedAuthors?.map((a, idx) => (
                      <Link
                        key={a.id || idx}
                        href={`/authors/${a.id}`}
                        className="font-semibold text-blue-600 hover:underline hover:text-blue-700"
                      >
                        {a.name}
                        {idx !== (populatedAuthors?.length || 1) - 1 ? ', ' : ''}
                      </Link>
                    ))}
                  </p>
                </div>
              )}

              {/* Blog Badge */}
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📝</span>
                </div>
                <span className="text-blue-700 font-medium text-xs">Blog Post</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {!hideFeaturedImageInArticle && featuredImage && typeof featuredImage !== 'string' && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video">
                <Media fill priority imgClassName="object-cover" resource={featuredImage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
