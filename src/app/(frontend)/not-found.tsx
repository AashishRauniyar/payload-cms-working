import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold text-blue-100 select-none leading-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Page Not Found</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off. Don&apos;t worry – let&apos;s get
            you back on track to discover valuable health insights.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Home */}
          <Link href="/" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🏠
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Home</h3>
              <p className="text-sm text-gray-500">Back to our homepage</p>
            </div>
          </Link>

          {/* Blog Posts */}
          <Link href="/posts" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Articles</h3>
              <p className="text-sm text-gray-500">Evidence-based health content</p>
            </div>
          </Link>

          {/* Categories */}
          <Link href="/categories" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🏷️
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Categories</h3>
              <p className="text-sm text-gray-500">Browse by topic</p>
            </div>
          </Link>

          {/* Search */}
          <Link href="/search" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Search</h3>
              <p className="text-sm text-gray-500">Find what you need</p>
            </div>
          </Link>
        </div>

        {/* Popular Topics */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Health Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Supplements',
              'Nutrition',
              'Weight Loss',
              'Mental Health',
              'Exercise',
              'Sleep',
              'Preventive Care',
              "Women's Health",
              "Men's Health",
            ].map((topic) => (
              <Link
                key={topic}
                href={`/search?q=${encodeURIComponent(topic.toLowerCase())}`}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Link href="/">
                <span className="mr-2">🏠</span>
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <Link href="/posts">
                <span className="mr-2">📖</span>
                Explore Articles
              </Link>
            </Button>
          </div>

          <p className="text-gray-500 text-sm">
            Still can&apos;t find what you&apos;re looking for?
            <Link href="/search" className="text-blue-600 hover:text-blue-700 ml-1 underline">
              Try our search feature
            </Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-blue-200 text-6xl opacity-20 animate-pulse hidden lg:block">
          💊
        </div>
        <div className="absolute bottom-20 right-10 text-green-200 text-5xl opacity-20 animate-pulse hidden lg:block">
          🌿
        </div>
        <div className="absolute top-1/2 left-5 text-red-200 text-4xl opacity-20 animate-pulse hidden lg:block">
          ❤️
        </div>
      </div>
    </div>
  )
}
