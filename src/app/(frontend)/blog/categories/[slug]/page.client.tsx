'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Tag, Clock, Search, Grid, List } from 'lucide-react'
import type { BlogPost, BlogCategory, Media } from '@/payload-types'

interface CategoryPostsClientProps {
  category: BlogCategory
  posts: BlogPost[]
}

export default function CategoryPostsClient({ category, posts }: CategoryPostsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.meta?.description?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })

    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'date':
        default:
          return (
            new Date(b.publishedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.createdAt).getTime()
          )
      }
    })
  }, [posts, searchQuery, sortBy])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getReadingTime = (content: any) => {
    // Simple reading time calculation
    const words = 250 // Average words per minute
    const textLength = JSON.stringify(content).length
    const wordCount = textLength / 5 // Average word length
    const readingTime = Math.ceil(wordCount / words)
    return Math.max(1, readingTime)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="/blog/categories"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          All Categories
        </Link>

        <div className="flex items-center mb-4">
          <div
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: category.color || '#3B82F6' }}
          ></div>
          <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
        </div>

        {category.description && (
          <p className="text-xl text-gray-600 mb-6 max-w-3xl">{category.description}</p>
        )}

        <div className="flex items-center text-sm text-gray-500">
          <Tag className="w-4 h-4 mr-2" />
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* Posts Grid/List */}
      {filteredPosts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`group ${
                viewMode === 'grid'
                  ? 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200'
                  : 'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 p-6'
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    {/* Featured Image */}
                    {post.featuredImage && typeof post.featuredImage === 'object' && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <Image
                          src={(post.featuredImage as Media).url || '/images/placeholder.jpg'}
                          alt={(post.featuredImage as Media).alt || post.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      )}

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {getReadingTime(post.content)} min read
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <div className="flex gap-6">
                    {/* Featured Image */}
                    {post.featuredImage && typeof post.featuredImage === 'object' && (
                      <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={(post.featuredImage as Media).url || '/images/placeholder.jpg'}
                          alt={(post.featuredImage as Media).alt || post.title}
                          width={192}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      )}

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {getReadingTime(post.content)} min read
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {searchQuery ? 'No articles found' : 'No articles in this category yet'}
          </h3>
          <p className="text-gray-400">
            {searchQuery
              ? 'Try adjusting your search terms or browse all categories.'
              : 'Articles will appear here once they are published in this category.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Back to All Categories */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog/categories"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Categories
        </Link>
      </div>
    </div>
  )
}
