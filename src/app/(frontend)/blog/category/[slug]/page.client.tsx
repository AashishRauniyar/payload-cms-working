'use client'

import { useState, useMemo } from 'react'
import type { BlogPost, BlogCategory } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag, Search, Filter } from 'lucide-react'

interface CategoryPageClientProps {
  category: BlogCategory
  posts: BlogPost[]
}

const CategoryPageClient = ({ category, posts }: CategoryPageClientProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
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
            new Date(b.publishedAt || b.updatedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.updatedAt || a.createdAt).getTime()
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

  const getExcerpt = (post: BlogPost) => {
    return post.excerpt || post.meta?.description || 'No description available.'
  }

  const getAuthorName = (post: BlogPost) => {
    const author = post.authors?.[0]
    if (typeof author === 'object' && author !== null) {
      return author.name || 'Unknown Author'
    }
    return 'Unknown Author'
  }

  const getFeaturedImage = (post: BlogPost) => {
    const featuredImage = post.featuredImage
    if (featuredImage && typeof featuredImage === 'object') {
      return featuredImage
    }
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            All Blog Posts
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            {category.color && (
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
            )}
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          {category.description && (
            <p className="text-gray-600 text-lg leading-relaxed">{category.description}</p>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Latest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, _index) => {
            const featuredImage = getFeaturedImage(post)

            return (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Featured Image */}
                {featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={featuredImage.url!}
                      alt={featuredImage.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.blogCategories?.map((cat) => {
                      if (typeof cat === 'object') {
                        return (
                          <span
                            key={cat.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: cat.color ? `${cat.color}20` : '#f3f4f6',
                              color: cat.color || '#374151',
                            }}
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {cat.name}
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>

                  {/* Title */}
                  <h2
                    className="text-xl font-semibold text-gray-900 mb-3 overflow-hidden text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="text-gray-600 mb-4 overflow-hidden text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {getExcerpt(post)}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{getAuthorName(post)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(post.publishedAt || post.updatedAt || post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        /* No Results */
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No articles found matching "${searchQuery}" in the ${category.name} category.`
                : `No articles found in the ${category.name} category yet.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryPageClient
