import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Category } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Article Categories - HealthScopeDaily',
  description:
    'Browse health and wellness articles by category. Find expert insights in supplements, nutrition, fitness, and more.',
  alternates: { canonical: '/blog/categories' },
  robots: { index: true, follow: true },
}

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function BlogCategoriesPage() {
  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'title',
  })

  const categories = categoriesResult.docs as Category[]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Article Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of health articles organized by category. From
            supplements and fitness to mental health and nutrition.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">📂</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No categories yet</h2>
            <p className="text-gray-500">Categories will appear here once content is added!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: Category }) {
  const categoryImage = category.image && typeof category.image === 'object' ? category.image : null

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-blue-200">
      <Link
        href={`/blog/categories/${category.slug || category.title.toLowerCase().replace(/\s+/g, '-')}`}
        className="block"
      >
        {/* Image Container */}
        <div className="aspect-[4/3] w-full relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          {categoryImage?.url ? (
            <div className="relative w-full h-full">
              <Image
                src={categoryImage.url}
                alt={categoryImage.alt || category.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-2 opacity-70">📋</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
            {category.title}
          </h3>

          {/* Description */}
          {category.description && (
            <div className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {/* Basic text extraction - you might want to properly render rich text */}
              <p>Explore articles in {category.title}</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
              <span>View Articles</span>
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
