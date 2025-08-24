'use client'

import React from 'react'

const FeaturedBrands = () => {
  const featuredBrands = [
    {
      name: 'Optimum Nutrition',
      logo: 'https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=ON',
      description:
        'Leading sports nutrition brand trusted by athletes worldwide for premium protein supplements and performance products.',
      rating: 4.8,
      reviews: 15420,
      category: 'Sports Nutrition',
      verified: true,
      featured: true,
      products: 127,
    },
    {
      name: 'Garden of Life',
      logo: 'https://via.placeholder.com/120x60/10B981/FFFFFF?text=GOL',
      description:
        'Organic whole food vitamins and supplements made from real food ingredients with no synthetic binders or fillers.',
      rating: 4.7,
      reviews: 12890,
      category: 'Organic Supplements',
      verified: true,
      featured: true,
      products: 89,
    },
    {
      name: 'Thorne Health',
      logo: 'https://via.placeholder.com/120x60/EF4444/FFFFFF?text=TH',
      description:
        'Science-backed nutritional supplements trusted by healthcare practitioners and elite athletes for optimal health.',
      rating: 4.9,
      reviews: 8760,
      category: 'Clinical Nutrition',
      verified: true,
      featured: true,
      products: 156,
    },
    {
      name: 'CeraVe',
      logo: 'https://via.placeholder.com/120x60/06B6D4/FFFFFF?text=CV',
      description:
        'Dermatologist-developed skincare with essential ceramides to restore and maintain the skin barrier.',
      rating: 4.6,
      reviews: 22100,
      category: 'Skincare',
      verified: true,
      featured: true,
      products: 45,
    },
    {
      name: 'Nordic Naturals',
      logo: 'https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=NN',
      description:
        'Premium omega-3 fish oil supplements sourced from wild-caught fish with third-party purity testing.',
      rating: 4.8,
      reviews: 9540,
      category: 'Omega-3',
      verified: true,
      featured: true,
      products: 78,
    },
    {
      name: 'Ritual',
      logo: 'https://via.placeholder.com/120x60/8B5CF6/FFFFFF?text=RT',
      description:
        'Clean, traceable multivitamins with no synthetic fillers, designed for different life stages and needs.',
      rating: 4.5,
      reviews: 6780,
      category: 'Multivitamins',
      verified: true,
      featured: true,
      products: 12,
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Editor&apos;s Choice
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Brands</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked brands that have earned our trust through rigorous testing, quality
            standards, and exceptional customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBrands.map((brand, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 group cursor-pointer"
            >
              {/* Brand Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-12 object-contain"
                    />
                    {brand.verified && (
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  {brand.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {brand.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">{renderStars(brand.rating)}</div>
                  <span className="text-sm font-semibold text-gray-900">{brand.rating}</span>
                  <span className="text-sm text-gray-500">({brand.reviews} reviews)</span>
                </div>

                <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  {brand.category}
                </span>
              </div>

              {/* Brand Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{brand.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{brand.products}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{brand.rating}★</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.floor(brand.reviews / 1000)}K+
                    </div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:shadow-lg">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Brands CTA */}
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore All 500+ Brands
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBrands
