import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, updatedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className=" text-black pt-8 pb-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Category */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Home</span>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400">Blog</span>
            {categories && categories.length > 0 && (
              <>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-blue-400 font-medium">
                  {categories.map((category, index) => {
                    if (typeof category === 'object' && category !== null) {
                      const { title: categoryTitle } = category
                      const titleToUse = categoryTitle || 'Untitled category'
                      const isLast = index === categories.length - 1
                      return (
                        <React.Fragment key={index}>
                          {titleToUse}
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
        {categories && categories.length > 0 && (
          <div className="mb-6">
            {categories.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category
                const titleToUse = categoryTitle || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
                  >
                    {titleToUse}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">{title}</h1>
        </div>

        {/* Date Information, Trust Badges and Author - Single Line */}
        <div className="max-w-4xl mx-auto mb-8">
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
            {(publishedAt || (updatedAt && updatedAt !== publishedAt)) && (
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
            )}

            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-green-700 font-medium text-xs">Medically Cited</span>
              </div>

              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-blue-700 font-medium text-xs">Fact Checked</span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Author Information */}
            {hasAuthors && (
              <div className="flex items-center">
                <p className="text-sm text-gray-600">
                  by{' '}
                  <span className="font-semibold text-blue-600">
                    {formatAuthors(populatedAuthors)}, RD
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {heroImage && typeof heroImage !== 'string' && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video">
                <Media fill priority imgClassName="object-cover" resource={heroImage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
