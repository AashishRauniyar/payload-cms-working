'use client'

import React from 'react'

const BrandSlider = () => {
  const brands = [
    { name: 'Optimum Nutrition', logo: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=ON' },
    { name: 'Garden of Life', logo: 'https://via.placeholder.com/150x80/10B981/FFFFFF?text=GOL' },
    { name: 'Nature Made', logo: 'https://via.placeholder.com/150x80/F59E0B/FFFFFF?text=NM' },
    { name: 'Thorne Health', logo: 'https://via.placeholder.com/150x80/EF4444/FFFFFF?text=TH' },
    { name: 'Athletic Greens', logo: 'https://via.placeholder.com/150x80/059669/FFFFFF?text=AG' },
    { name: 'Ritual', logo: 'https://via.placeholder.com/150x80/8B5CF6/FFFFFF?text=RT' },
    { name: 'Life Extension', logo: 'https://via.placeholder.com/150x80/06B6D4/FFFFFF?text=LE' },
    { name: 'Nordic Naturals', logo: 'https://via.placeholder.com/150x80/3B82F6/FFFFFF?text=NN' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with the world's most respected health and wellness brands to bring you
            quality products and expert recommendations.
          </p>
        </div>

        {/* Brand logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-100 p-4 h-20 flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Brand categories pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['Supplements', 'Skincare', 'Fitness', 'Nutrition', 'Wellness', 'Medical'].map(
            (category, index) => (
              <span
                key={index}
                className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 cursor-pointer hover:shadow-md"
              >
                {category}
              </span>
            ),
          )}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            View All Brands
          </button>
        </div>
      </div>
    </section>
  )
}

export default BrandSlider
