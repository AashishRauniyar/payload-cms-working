'use client'

import React from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'

import type { Category, Post } from '@/payload-types'

type Props = {
  category: Category
  posts: Post[]
}

export default function CategoryPageClient({ category, posts }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {category.image && typeof category.image === 'object' && (
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                <img
                  src={category.image.url || ''}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-gray-900">{category.title}</h1>
          </div>

          {category.description && (
            <div className="text-lg text-gray-600 max-w-3xl mx-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    typeof category.description === 'string'
                      ? category.description
                      : JSON.stringify(category.description),
                }}
              />
            </div>
          )}
        </div>

        {/* Posts count */}
        <div className="mb-8">
          <p className="text-gray-600 text-center">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <CollectionArchive posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found in this category yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
