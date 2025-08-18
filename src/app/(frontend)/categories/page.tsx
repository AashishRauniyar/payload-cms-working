import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of health and wellness articles organized by topic.
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
