import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import Link from 'next/link'
import type { Category } from '@/payload-types'

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of health and wellness articles organized by topic.
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
  // Get category icon based on title (you can customize this)
  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('supplement')) return '💊'
    if (lowerTitle.includes('nutrition')) return '🥗'
    if (lowerTitle.includes('fitness')) return '💪'
    if (lowerTitle.includes('mental')) return '🧠'
    if (lowerTitle.includes('beauty') || lowerTitle.includes('skin')) return '✨'
    if (lowerTitle.includes('weight')) return '⚖️'
    if (lowerTitle.includes('vitamin')) return '🌟'
    return '🏥'
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-center">
        {/* Icon */}
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {getCategoryIcon(category.title)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {category.title}
        </h3>

        {/* View Articles Link */}
        <div className="mt-4 inline-flex items-center space-x-1 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>View Articles</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
