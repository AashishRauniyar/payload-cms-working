'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Category, Post } from '@/payload-types'

interface NavbarProps {
  categories: Category[]
  featuredPosts?: Post[]
}

export default function Navbar({ categories, featuredPosts = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
    setHoveredCategory(null)
  }

  // Component to render category dropdown items
  const CategoryItem = ({ category }: { category: Category }) => (
    <div key={category.id} className="relative">
      <div
        className="group"
        onMouseEnter={() => setHoveredCategory(Number(category.id))}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg mx-2 font-medium"
          onClick={closeDropdown}
        >
          <div className="flex items-center space-x-2">
            <span>{category.title}</span>
          </div>
        </Link>
      </div>
    </div>
  )

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>🏆 Trusted Health Source Since 2024</span>
            <span>📞 Customer Support: 1-800-XXX-XXXX</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/newsletter" className="hover:text-primary-100 transition-colors">
              Newsletter
            </Link>
            <Link href="/about" className="hover:text-primary-100 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HS</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthScopeDaily</h1>
                <p className="text-sm text-gray-600">Health & Wellness Expert Reviews</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('categories')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
              >
                <span>Categories</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openDropdown === 'categories' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <span className="text-sm font-semibold text-gray-900">Browse by Category</span>
                  </div>
                  {categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <Link
                      href="/categories"
                      className="block mx-2 px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 transition-colors rounded-lg text-center"
                      onClick={closeDropdown}
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              href="/posts"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Blog
            </Link>

            {/* Supplements */}
            <Link
              href="/supplements"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Supplements
            </Link>

            {/* Brands */}
            <Link
              href="/brands"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Brands
            </Link>

            {/* Reviews */}
            <Link
              href="/reviews"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Reviews
            </Link>

            {/* Company */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('company')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
              >
                <span>Company</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {openDropdown === 'company' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
                    onClick={closeDropdown}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
                    onClick={closeDropdown}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
                    onClick={closeDropdown}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/team"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
                    onClick={closeDropdown}
                  >
                    Our Team
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
              CLAIM DISCOUNT
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {/* Home */}
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Categories */}
              <div className="px-2">
                <div className="font-semibold text-gray-900 px-2 py-2 border-b border-gray-100 mb-2">
                  Categories
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/categories"
                  className="block px-4 py-3 mt-3 text-primary-600 font-medium border-t border-gray-100 pt-3"
                  onClick={() => setIsOpen(false)}
                >
                  View All Categories →
                </Link>
              </div>

              {/* Blog */}
              <Link
                href="/posts"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              {/* Supplements */}
              <Link
                href="/supplements"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Supplements
              </Link>

              {/* Reviews */}
              <Link
                href="/reviews"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium rounded-lg mx-2"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>

              <div className="pt-4 border-t border-gray-200 mt-4 mx-2">
                <div className="bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-medium">
                  CLAIM DISCOUNT
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={closeDropdown} />}
    </nav>
  )
}
