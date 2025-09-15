import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import type { Category } from '@/payload-types'
import CategoriesClient from './CategoriesClient'

export const metadata: Metadata = {
  title: 'Categories - HealthScopeDaily',
  description: 'Browse health and wellness articles by category.',
}

async function getCategories() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'title',
  })

  return categories.docs as Category[]
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            From supplements and fitness to mental health and nutrition - find expert insights in
            your area of interest.
          </p>
        </div>

        {/* Realtime categories client */}
        {categories.length > 0 ? (
          <CategoriesClient categories={categories} />
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
