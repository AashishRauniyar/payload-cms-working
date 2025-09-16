'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Category, Post } from '@/payload-types'
import { Search, Heart, Shield, Award } from 'lucide-react'

interface NavbarProps {
  categories: Category[]
  featuredPosts?: Post[]
}

export default function Navbar({ categories }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [_hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock the body scroll when mobile nav is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Helper to highlight active links
  const getNavLinkClass = (href: string) => {
    const base =
      'relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 group'
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
    return isActive
      ? 'relative text-blue-600 bg-blue-50 font-semibold py-2 px-4 rounded-lg border border-blue-100'
      : base
  }

  // Helper for dropdown link classes
  const getDropdownLinkClass = () => {
    return 'flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg mx-2 group'
  }

  const onKeyDownClose = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null)
      setIsOpen(false)
    }
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
    setHoveredCategory(null)
  }

  return (
    <>
      {/* Top notification bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm py-2 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="relative max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span className="font-medium">Trusted Health Source Since 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Evidence-Based Reviews</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/newsletter"
              className="flex items-center space-x-1 hover:text-blue-100 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Newsletter</span>
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'shadow-lg border-b border-gray-200 backdrop-blur-md bg-white/95'
            : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Logo - Only show on mobile */}
            <div className="flex items-center md:hidden">
              <Link href="/" className="flex items-center group">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
                  </div>
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    HealthScope
                  </div>
                </div>
              </Link>
            </div>

            {/* Left Navigation - Desktop only */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/" className={getNavLinkClass('/')}>
                <span>Home</span>
                {pathname === '/' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('categories')}
                  onKeyDown={onKeyDownClose}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'categories'}
                  aria-controls="nav-categories-menu"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 group"
                >
                  <span>Categories</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:text-blue-600 ${
                      openDropdown === 'categories' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === 'categories' && (
                  <div
                    id="nav-categories-menu"
                    className="absolute top-full left-0 mt-3 w-80 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-200 py-4 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Browse Categories</h3>
                      <p className="text-xs text-gray-500 mt-1">Explore our health topics</p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 gap-2 px-3 mb-4">
                      {(categories || []).slice(0, 8).map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg group"
                          onClick={closeDropdown}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                          <span className="flex-1 truncate">{category.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <Link
                        href="/categories"
                        className="flex items-center justify-center mx-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold hover:bg-blue-50 transition-all duration-200 rounded-lg border border-blue-200 hover:border-blue-300 text-sm"
                        onClick={closeDropdown}
                      >
                        <span>View All Categories</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1 rotate-[-90deg]" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/posts" className={getNavLinkClass('/posts')}>
                <span>Reviews</span>
                {pathname.startsWith('/posts') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link href="/supplements" className={getNavLinkClass('/supplements')}>
                <span>Supplements</span>
                {pathname.startsWith('/supplements') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            </div>

            {/* Center Logo - Desktop only */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Link href="/" className="flex items-center group">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      HealthScopeDaily
                    </div>
                    <div className="text-xs text-gray-500 font-medium -mt-1">
                      Evidence-Based Reviews
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Navigation - Desktop only */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/brands" className={getNavLinkClass('/brands')}>
                <span>Brands</span>
                {pathname.startsWith('/brands') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>

             

              <Link href="/authors" className={getNavLinkClass('/authors')}>
                <span>Experts</span>
                {pathname.startsWith('/authors') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>

              {/* Company Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('company')}
                  onKeyDown={onKeyDownClose}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'company'}
                  aria-controls="nav-company-menu"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 group"
                >
                  <span>About</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:text-blue-600 ${
                      openDropdown === 'company' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === 'company' && (
                  <div
                    id="nav-company-menu"
                    className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50"
                  >
                    <Link href="/about" className={getDropdownLinkClass()} onClick={closeDropdown}>
                      <div className="flex items-center space-x-3 w-full">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="flex-1">About Us</span>
                      </div>
                    </Link>
                    <Link
                      href="/contact"
                      className={getDropdownLinkClass()}
                      onClick={closeDropdown}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <MagnifyingGlassIcon className="w-4 h-4 text-green-500" />
                        <span className="flex-1">Contact</span>
                      </div>
                    </Link>
                    <Link href="/faq" className={getDropdownLinkClass()} onClick={closeDropdown}>
                      <div className="flex items-center space-x-3 w-full">
                        <Award className="w-4 h-4 text-purple-500" />
                        <span className="flex-1">FAQ</span>
                      </div>
                    </Link>
                    <Link
                      href="/authors"
                      className={getDropdownLinkClass()}
                      onClick={closeDropdown}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="flex-1">Our Team</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-200">
                <Link
                  href="/posts?focus=search"
                  aria-label="Search"
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                >
                  <Search className="w-4 h-4" />
                </Link>

                <Link
                  href="/posts"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link
                href="/posts?focus=search"
                aria-label="Search"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg relative z-50"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div
              id="mobile-nav"
              className="lg:hidden border-t border-gray-200 bg-white shadow-lg relative z-50"
              onKeyDown={onKeyDownClose}
            >
              <div className="py-4 px-4 space-y-4 max-h-[85vh] overflow-y-auto">
                {/* Main Navigation */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      pathname === '/'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-sm">Home</span>
                  </Link>

                  <Link
                    href="/posts"
                    className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      pathname.startsWith('/posts')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-sm">Blog</span>
                  </Link>

                  <Link
                    href="/supplements"
                    className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      pathname.startsWith('/supplements')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-sm">Supplements</span>
                  </Link>

                  <Link
                    href="/brands"
                    className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      pathname.startsWith('/brands')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span className="font-medium text-sm">Brands</span>
                  </Link>

                  <Link
                    href="/authors"
                    className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      pathname.startsWith('/authors')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                    <span className="font-medium text-sm">Our Experts</span>
                  </Link>
                </div>

                {/* Categories Section */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {(categories || []).slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center space-x-2 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="truncate">{category.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/categories"
                    className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>View All Categories</span>
                    <ChevronDownIcon className="w-4 h-4 ml-1 rotate-[-90deg]" />
                  </Link>
                </div>

                {/* Company Section */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/about"
                      className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>About Us</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <MagnifyingGlassIcon className="w-4 h-4" />
                      <span>Contact</span>
                    </Link>
                    <Link
                      href="/faq"
                      className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Award className="w-4 h-4" />
                      <span>FAQ</span>
                    </Link>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-3 border-t border-gray-200">
                  <Link
                    href="/posts"
                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg text-sm text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overlay for dropdowns */}
        {openDropdown && (
          <div className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm" onClick={closeDropdown} />
        )}

        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </nav>
    </>
  )
}
