'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const BrandsHero = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-gray-500 font-medium">Brands</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Trusted by Millions
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Featured <span className="text-blue-600">Brands</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover the best in wellness with vetted products from trusted health experts to
                ensure authentic, quality care precisely tailored to your needs.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-lg">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search brands, products, categories..."
                  className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Key Features */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Vetted</h3>
                  <p className="text-sm text-gray-600">Reviewed by professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Premium standards</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive</h3>
                  <p className="text-sm text-gray-600">Complete reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80"
                alt="Health and wellness products from top brands"
                className="w-full rounded-3xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-green-500 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Trusted Brands</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-gray-600">Products Reviewed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandsHero
