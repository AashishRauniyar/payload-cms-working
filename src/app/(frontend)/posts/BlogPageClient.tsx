'use client'

import React, { useState, useMemo } from 'react'
import type { Post, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPageClientProps {
  posts: Post[]
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    posts.forEach((post) => {
      if (post.categories) {
        post.categories.forEach((cat) => {
          if (typeof cat === 'object' && cat.title) {
            cats.add(cat.title)
          }
        })
      }
    })
    return Array.from(cats).sort()
  }, [posts])

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.meta?.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        !selectedCategory ||
        post.categories?.some((cat) => typeof cat === 'object' && cat.title === selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  const isFiltering = searchQuery || selectedCategory
  const featuredPost = !isFiltering ? filteredPosts[0] : null
  const postsToShow = isFiltering ? filteredPosts : filteredPosts.slice(1)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with Search */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Health Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Stay informed with our latest research-backed articles, product reviews, and wellness
          insights from health experts.
        </p>

        {/* Search and Filter Section */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {isFiltering && (
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <>
          {/* Featured Post - Only show when not filtering */}
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {/* Posts Grid */}
          {postsToShow.length > 0 && (
            <div className={featuredPost ? 'mt-10' : ''}>
              {!isFiltering && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsToShow.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl text-gray-300 mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h2>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'

  return (
    <article className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Featured Article
            </span>
            <time className="text-gray-500 text-sm">{publishedDate}</time>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight">{post.title}</h2>

          {post.meta?.description && (
            <p className="text-gray-600 leading-relaxed">{post.meta.description}</p>
          )}

          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Read Full Article</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center">
              <div className="text-4xl text-blue-400">📰</div>
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
        <div className="aspect-[16/10] relative rounded-xl overflow-hidden bg-gray-100 mb-3">
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-2xl text-gray-400">📄</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <time>{publishedDate}</time>
            {post.categories && post.categories.length > 0 && (
              <>
                <span>•</span>
                <span className="text-blue-600">
                  {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Health'}
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.meta?.description && (
            <p className="text-gray-600 line-clamp-2 text-sm">{post.meta.description}</p>
          )}
        </div>
      </Link>
    </article>
  )
}
