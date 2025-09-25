'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Post, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPageClientProps {
  posts: Post[]
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'popular'>('date')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  // Auto-focus search input when navigated from search button
  useEffect(() => {
    const focusSearch = searchParams.get('focus')
    if (focusSearch === 'search' && searchInputRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus()
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // Add a gentle pulse effect to indicate the focused search
        searchInputRef.current?.classList.add('animate-pulse')
        setTimeout(() => {
          searchInputRef.current?.classList.remove('animate-pulse')
        }, 1000)
      }, 100)
    }
  }, [searchParams])

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

  // Generate alphabet letters
  const letters = useMemo(
    () => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    [],
  )

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.meta?.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        !selectedCategory ||
        post.categories?.some((cat) => typeof cat === 'object' && cat.title === selectedCategory)

      const matchesLetter = !activeLetter || post.title?.toUpperCase().startsWith(activeLetter)

      return matchesSearch && matchesCategory && matchesLetter
    })

    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'popular':
          // Could add view count logic here
          return (
            new Date(b.publishedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.createdAt).getTime()
          )
        case 'date':
        default:
          return (
            new Date(b.publishedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.createdAt).getTime()
          )
      }
    })
  }, [posts, searchQuery, selectedCategory, activeLetter, sortBy])

  const isFiltering = searchQuery || selectedCategory || activeLetter

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Enhanced Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Health Articles</h1>

        {/* Statistics */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500">📚</span>
            <span>{posts.length} Articles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500">🔬</span>
            <span>Research-Backed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500">👨‍⚕️</span>
            <span>Expert Reviewed</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div
        className={`max-w-2xl mx-auto mb-5 ${searchParams.get('focus') === 'search' ? 'ring-2 ring-blue-200 rounded-xl p-4 bg-blue-50/50' : ''}`}
      >
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {searchParams.get('focus') === 'search'
              ? '🔍 Search Health Articles'
              : 'Find Health Articles'}
          </h2>
          {searchParams.get('focus') === 'search' && (
            <p className="text-sm text-blue-600 font-medium">
              Start typing to search our health articles
            </p>
          )}
        </div>
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search articles by title, content, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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

      {/* Alphabetical Filter */}
      <div className="mb-5">
        <h3 className="text-center text-sm font-medium text-gray-600 mb-3">
          Browse Alphabetically
        </h3>
        <div className="flex flex-wrap gap-1.5 justify-center max-w-5xl mx-auto">
          <button
            onClick={() => setActiveLetter(null)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
              activeLetter === null
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
            }`}
          >
            All
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`px-2.5 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                activeLetter === letter
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter & Sort Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-3">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.slice(0, 5).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'popular')}
            className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Latest</option>
            <option value="title">Title A-Z</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {isFiltering ? 'Filtered Results' : 'All Articles'}
          </h3>
          <p className="text-gray-500 text-sm">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            {activeLetter && <span className="ml-1">starting with &quot;{activeLetter}&quot;</span>}
            {searchQuery && <span className="ml-1">matching &quot;{searchQuery}&quot;</span>}
            {selectedCategory && <span className="ml-1">in {selectedCategory}</span>}
          </p>
        </div>
        {isFiltering && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setActiveLetter(null)
            }}
            className="px-3 py-1.5 text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="text-4xl text-gray-300 mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto text-sm">
            We couldn&apos;t find any articles matching your criteria. Try adjusting your search terms or
            filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
              setActiveLetter(null)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  )
}

function BlogCard({ post }: { post: Post }) {
  const heroImage = post.heroImage as Media | null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'
  const categories = post.categories as any[] | null

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-blue-200">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Image Container */}
        <div className="aspect-[4/3] w-full relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          {heroImage?.url ? (
            <div className="relative w-full h-full">
              <Image
                src={heroImage.url}
                alt={heroImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-2 opacity-70">📰</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <time className="font-medium">{publishedDate}</time>
              {categories && categories.length > 0 && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {typeof categories[0] === 'object' ? categories[0].title : 'Health'}
                  </span>
                </>
              )}
            </div>
            <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {/* Description */}
          {post.meta?.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {post.meta.description}
            </p>
          )}

          {/* Author Info */}
          {post.authors && post.authors.length > 0 && (
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <span>By </span>
              <span className="ml-1 font-medium">
                {typeof post.authors[0] === 'object' && 'name' in post.authors[0]
                  ? post.authors[0].name
                  : 'HealthScope Team'}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
              <span>Read Article</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 pointer-events-none transition-colors duration-300" />
      </Link>
    </article>
  )
}
