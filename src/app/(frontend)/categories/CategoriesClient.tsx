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
      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
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
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setActiveLetter(null)}
          className={`px-3 py-1.5 text-base md:text-lg rounded-full border ${
            activeLetter === null
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white border-gray-200 hover:bg-primary-50 hover:text-primary-700'
          }`}
        >
          All
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={`px-3 py-1.5 text-base md:text-lg rounded-full border ${
              activeLetter === letter
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white border-gray-200 hover:bg-primary-50 hover:text-primary-700'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No categories match your search.</div>
      )}
    </>
  )
}

function CategoryCard({ category }: { category: Category }) {
  const image = category.image as Media | null
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="aspect-[16/9] w-full relative bg-gray-100">
        {image?.url ? (
          <Image src={image.url} alt={image.alt || category.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📂</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {category.title}
        </h3>
        {category.description &&
          typeof category.description === 'object' &&
          'root' in category.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {/* @ts-expect-error generic richText */}
              {category.description.root?.children?.[0]?.children?.[0]?.text ?? ''}
            </p>
          )}
        <div className="mt-3 inline-flex items-center space-x-1 text-primary-600 text-sm font-medium">
          <span>View Articles</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
