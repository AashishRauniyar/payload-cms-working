'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Category, Media } from '@/payload-types'

type Props = {
  categories: Category[]
}

export default function CategoriesClient({ categories }: Props) {
  const [query, setQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q) {
      return categories.filter((c) => (c.title || '').toLowerCase().includes(q))
    }
    if (activeLetter) {
      return categories.filter((c) => (c.title || '').toUpperCase().startsWith(activeLetter))
    }
    return categories
  }, [categories, query, activeLetter])

  const letters = useMemo(
    () => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    [],
  )

  const results = useMemo(() => {
    return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  }, [filtered])

  return (
    <>
      {/* Statistics */}
      <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">📊</span>
          <span>{categories.length} Categories</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">🏥</span>
          <span>Health & Wellness Topics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">✨</span>
          <span>Expert Curated</span>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Find Your Health Topic</h2>
          <p className="text-gray-500 text-sm">
            Search through our categories or browse alphabetically
          </p>
        </div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
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

      {/* A–Z Index as filter */}
      <div className="mb-8">
        <h3 className="text-center text-sm font-medium text-gray-600 mb-4">
          Browse Alphabetically
        </h3>
        <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
          <button
            onClick={() => setActiveLetter(null)}
            className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
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
              className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
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

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {query || activeLetter ? 'Filtered Categories' : 'All Categories'}
          </h3>
          <p className="text-gray-500 text-sm">
            {results.length} categor{results.length !== 1 ? 'ies' : 'y'} found
            {activeLetter && <span className="ml-1">starting with &quot;{activeLetter}&quot;</span>}
            {query && <span className="ml-1">matching &quot;{query}&quot;</span>}
          </p>
        </div>
        {(query || activeLetter) && (
          <button
            onClick={() => {
              setQuery('')
              setActiveLetter(null)
            }}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="text-5xl text-gray-300 mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-3">No categories found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any categories matching your search criteria. Try adjusting your search
            terms or browse all categories.
          </p>
          <button
            onClick={() => {
              setQuery('')
              setActiveLetter(null)
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Show All Categories
          </button>
        </div>
      )}
    </>
  )
}

function CategoryCard({ category }: { category: Category }) {
  const image = category.image as Media | null

  // Get category icon based on title
  const getCategoryIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('male') || t.includes('men')) return '👨'
    if (t.includes('weight') || t.includes('loss')) return '⚖️'
    if (t.includes('supplement') || t.includes('vitamin')) return '💊'
    if (t.includes('joint') || t.includes('bone')) return '🦴'
    if (t.includes('brain') || t.includes('mental')) return '🧠'
    if (t.includes('heart') || t.includes('cardio')) return '❤️'
    if (t.includes('digest') || t.includes('gut')) return '🥗'
    if (t.includes('skin') || t.includes('beauty')) return '✨'
    if (t.includes('women') || t.includes('female')) return '👩'
    if (t.includes('energy') || t.includes('fitness')) return '⚡'
    return '🏥'
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-blue-200"
    >
      {/* Image Container with improved positioning */}
      <div className="aspect-[4/3] w-full relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        {image?.url ? (
          <div className="relative w-full h-full">
            <Image
              src={image.url}
              alt={image.alt || category.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-5xl mb-2 opacity-70">{getCategoryIcon(category.title)}</div>
            <div className="text-xs text-gray-500 font-medium">No Image</div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold rounded-full shadow-sm">
            Category
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {category.title}
          </h3>
          <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Description */}
        {category.description &&
          typeof category.description === 'object' &&
          'root' in category.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {/* @ts-expect-error generic richText */}
              {category.description.root?.children?.[0]?.children?.[0]?.text ??
                'Explore articles and insights in this health category.'}
            </p>
          )}

        {/* Call to Action */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
            <span>View Articles</span>
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Article Count (if available) */}
          <div className="text-xs text-gray-400">
            <span>Explore →</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 pointer-events-none transition-colors duration-300" />
    </Link>
  )
}
