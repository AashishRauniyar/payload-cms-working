'use client'

import React, { useState } from 'react'

const FAQSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Search Our Knowledge Base</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Use our search feature to quickly find
            answers to your questions.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQ... (e.g., 'How to contact support', 'Product reviews')"
            className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
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
        </form>

        {/* Popular Searches */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Product reviews',
              'Contact support',
              'Account help',
              'Supplement guide',
              'Return policy',
              'Health advice',
            ].map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSearch
