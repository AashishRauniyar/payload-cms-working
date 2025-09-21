'use client'

import React from 'react'
import Link from 'next/link'
import { FolderOpen, Hash, ArrowRight } from 'lucide-react'

interface BlogCategory {
  id: string
  name: string
  description?: string
  color?: string
  slug: string
  postCount: number
}

interface CategoriesPageClientProps {
  categories: BlogCategory[]
}

export default function CategoriesPageClient({ categories }: CategoriesPageClientProps) {
  const getRandomGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-red-500 to-red-600',
    ]
    return gradients[index % gradients.length]
  }

  const getCategoryColor = (category: BlogCategory, index: number) => {
    if (category.color) {
      return { backgroundColor: category.color }
    }
    return {}
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
          <FolderOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog Categories</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our content organized by topics. Find exactly what you're looking for with our
          categorized articles.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/blog/categories/${category.slug}`}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              {/* Category Header */}
              <div
                className={`h-24 bg-gradient-to-r ${getRandomGradient(index)} relative overflow-hidden`}
                style={getCategoryColor(category, index)}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <Hash className="w-6 h-6 text-white/80" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Browse articles</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-16">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No categories found</h3>
          <p className="text-gray-400">Categories will appear here once they are created.</p>
        </div>
      )}

      {/* Back to Blog Link */}
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to All Posts
        </Link>
      </div>
    </div>
  )
}
