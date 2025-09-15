'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category, Post, Media } from '@/payload-types'

interface Props {
  categories: Category[]
  posts: Post[]
}

export default function ReviewsPageClient({ categories, posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on selected category and search query
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by category if one is selected
    if (selectedCategory) {
      filtered = filtered.filter((post) => {
        if (!post.categories) return false
        return post.categories.some((cat) => {
          const category = typeof cat === 'object' ? cat : null
          return category?.slug === selectedCategory
        })
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query)
        const descriptionMatch = post.meta?.description?.toLowerCase().includes(query) || false
        return titleMatch || descriptionMatch
      })
    }

    return filtered
  }, [posts, selectedCategory, searchQuery])

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null) // Deselect if already selected
    } else {
      setSelectedCategory(categorySlug)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Articles</h1>
      </div>

      {/* Category Grid */}
      <CategoryGrid
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Clear filters button */}
      {(selectedCategory || searchQuery) && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSearchQuery('')
            }}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Articles Grid */}
      <ArticlesGrid posts={filteredPosts} />
    </div>
  )
}

// Category Grid Component
function CategoryGrid({
  categories,
  selectedCategory,
  onCategoryClick,
}: {
  categories: Category[]
  selectedCategory: string | null
  onCategoryClick: (slug: string) => void
}) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {categories.slice(0, 6).map((category) => {
          const isSelected = selectedCategory === category.slug
          const categoryImage = category.image as Media | null

          return (
            <button
              key={category.id}
              onClick={() => category.slug && onCategoryClick(category.slug)}
              className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                isSelected
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md border border-gray-100'
              }`}
            >
              {/* Category Image/Icon */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 flex items-center justify-center ${
                  isSelected ? 'bg-white/20' : 'bg-blue-50'
                }`}
              >
                {categoryImage?.url ? (
                  <Image
                    src={categoryImage.url}
                    alt={categoryImage.alt || category.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`text-xl md:text-2xl ${isSelected ? 'text-white' : 'text-blue-500'}`}
                  >
                    {getCategoryIcon(category.title)}
                  </div>
                )}
              </div>

              {/* Category Title */}
              <h3
                className={`text-xs md:text-sm font-semibold text-center leading-tight ${
                  isSelected ? 'text-white' : 'text-gray-900 group-hover:text-blue-600'
                }`}
              >
                {category.title.toUpperCase()}
              </h3>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Search Bar Component
function SearchBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
}) {
  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for reviews and articles..."
          className="w-full px-5 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Articles Grid Component
function ArticlesGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl">
        <div className="text-5xl text-gray-300 mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-3">No articles found</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We couldn't find any articles matching your criteria. Try adjusting your search terms or
          selecting a different category.
        </p>
        <div className="text-sm text-gray-400">
          <p>
            💡 <strong>Tip:</strong> Use broader search terms or check spelling
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Article Card Component
function ArticleCard({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'
  const categories = post.categories as Category[] | null

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      {/* Hero Image */}
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-4xl text-blue-400">📋</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap gap-2">
            {categories &&
              categories.slice(0, 2).map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {category.title}
                </span>
              ))}
          </div>
          <time className="text-sm text-gray-500">{publishedDate}</time>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
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

        {/* Author */}
        {post.authors && post.authors.length > 0 && (
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <span>By </span>
            <span className="ml-1 font-medium">
              {typeof post.authors[0] === 'object' && 'name' in post.authors[0]
                ? post.authors[0].name
                : 'HealthScope Team'}
            </span>
          </div>
        )}

        {/* Read Review Button */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors group"
        >
          <span>Read Review</span>
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

// Helper function to get category icons
function getCategoryIcon(categoryTitle: string): string {
  const title = categoryTitle.toLowerCase()

  if (title.includes('menopause') || title.includes('women')) return '♀️'
  if (title.includes('skincare') || title.includes('skin')) return '🧴'
  if (title.includes('supplement') || title.includes('vitamin')) return '💊'
  if (title.includes('joint') || title.includes('bone')) return '🦴'
  if (title.includes('brain') || title.includes('mental')) return '🧠'
  if (title.includes('prostate') || title.includes('men')) return '⚕️'
  if (title.includes('heart') || title.includes('cardio')) return '❤️'
  if (title.includes('digest') || title.includes('gut')) return '🥗'
  if (title.includes('immune') || title.includes('defense')) return '🛡️'
  if (title.includes('energy') || title.includes('fitness')) return '⚡'

  return '📋' // Default icon
}
