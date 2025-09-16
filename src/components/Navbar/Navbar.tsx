// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import {
//   ChevronDownIcon,
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline'
// import { Category, Post } from '@/payload-types'

// interface NavbarProps {
//   categories?: Category[]
//   featuredPosts?: Post[]
// }

// export default function Navbar({ categories = [] }: NavbarProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)
//   const [_hoveredCategory, setHoveredCategory] = useState<number | null>(null)
//   const pathname = usePathname()

//   // Ensure categories is always an array
//   const safeCategories = Array.isArray(categories) ? categories : []

//   // Lock the body scroll when mobile nav is open
//   useEffect(() => {
//     if (typeof document === 'undefined') return
//     document.body.style.overflow = isOpen ? 'hidden' : ''
//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [isOpen])

//   // Helper to highlight active links
//   const getNavLinkClass = (href: string) => {
//     const base =
//       'text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50'
//     const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
//     return isActive ? `${base} bg-primary-50 text-primary-700` : base
//   }

//   const onKeyDownClose = (e: React.KeyboardEvent) => {
//     if (e.key === 'Escape') {
//       setOpenDropdown(null)
//       setIsOpen(false)
//     }
//   }

//   const toggleDropdown = (dropdown: string) => {
//     setOpenDropdown(openDropdown === dropdown ? null : dropdown)
//   }

//   const closeDropdown = () => {
//     setOpenDropdown(null)
//     setHoveredCategory(null)
//   }

//   // Component to render category dropdown items
//   const CategoryItem = ({ category }: { category: Category }) => (
//     <div key={category.id} className="relative">
//       <div
//         className="group"
//         onMouseEnter={() => setHoveredCategory(Number(category.id))}
//         onMouseLeave={() => setHoveredCategory(null)}
//       >
//         <Link
//           href={`/categories/${category.slug}`}
//           className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg mx-2 font-medium"
//           onClick={closeDropdown}
//         >
//           <div className="flex items-center space-x-2">
//             <span>{category.title}</span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   )

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       {/* Top Bar */}
//       <div className="bg-primary-600 text-white text-sm py-2">
//         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <span>🏆 Trusted Health Source Since 2024</span>
//             <span>📞 Customer Support: 1-800-XXX-XXXX</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link href="/newsletter" className="hover:text-primary-100 transition-colors">
//               Newsletter
//             </Link>
//             <Link href="/about" className="hover:text-primary-100 transition-colors">
//               About Us
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center space-x-3">
//               <div className="w-10 h-10 flex items-center justify-center">
//                 <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">HS</span>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">HealthScopeDaily</h1>
//                 <p className="text-sm text-gray-600">Health & Wellness Expert Reviews</p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {/* Home */}
//             <Link href="/" className={getNavLinkClass('/')}>
//               Home
//             </Link>

//             {/* Categories Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('categories')}
//                 onKeyDown={onKeyDownClose}
//                 aria-haspopup="true"
//                 aria-expanded={openDropdown === 'categories'}
//                 aria-controls="nav-categories-menu"
//                 className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
//               >
//                 <span>Categories</span>
//                 <ChevronDownIcon className="w-4 h-4" />
//               </button>
//               {openDropdown === 'categories' && (
//                 <div
//                   id="nav-categories-menu"
//                   className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 max-h-96 overflow-y-auto"
//                 >
//                   <div className="px-4 py-2 border-b border-gray-100 mb-2">
//                     <span className="text-sm font-semibold text-gray-900">Browse by Category</span>
//                   </div>
//                   {safeCategories.map((category) => (
//                     <CategoryItem key={category.id} category={category} />
//                   ))}
//                   <div className="border-t border-gray-100 mt-3 pt-3">
//                     <Link
//                       href="/categories"
//                       className="block mx-2 px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 transition-colors rounded-lg text-center"
//                       onClick={closeDropdown}
//                     >
//                       View All Categories →
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Blog */}
//             <Link href="/posts" className={getNavLinkClass('/posts')}>
//               Blog
//             </Link>

//             {/* Supplements */}
//             <Link href="/supplements" className={getNavLinkClass('/supplements')}>
//               Supplements
//             </Link>

//             {/* Brands */}
//             <Link href="/brands" className={getNavLinkClass('/brands')}>
//               Brands
//             </Link>

//             {/* Reviews */}
//             <Link href="/reviews" className={getNavLinkClass('/reviews')}>
//               Reviews
//             </Link>

//             {/* Company */}
//             <div className="relative">
//               <button
//                 onClick={() => toggleDropdown('company')}
//                 onKeyDown={onKeyDownClose}
//                 aria-haspopup="true"
//                 aria-expanded={openDropdown === 'company'}
//                 aria-controls="nav-company-menu"
//                 className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-50 font-medium"
//               >
//                 <span>Company</span>
//                 <ChevronDownIcon className="w-4 h-4" />
//               </button>
//               {openDropdown === 'company' && (
//                 <div
//                   id="nav-company-menu"
//                   className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50"
//                 >
//                   <Link
//                     href="/about"
//                     className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
//                     onClick={closeDropdown}
//                   >
//                     About Us
//                   </Link>
//                   <Link
//                     href="/contact"
//                     className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
//                     onClick={closeDropdown}
//                   >
//                     Contact
//                   </Link>
//                   <Link
//                     href="/faq"
//                     className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
//                     onClick={closeDropdown}
//                   >
//                     FAQ
//                   </Link>
//                   <Link
//                     href="/team"
//                     className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg mx-2"
//                     onClick={closeDropdown}
//                   >
//                     Our Team
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/search"
//               aria-label="Search"
//               className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
//             >
//               <MagnifyingGlassIcon className="w-5 h-5" />
//             </Link>
//             <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
//               CLAIM DISCOUNT
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
//               aria-expanded={isOpen}
//               aria-controls="mobile-nav"
//               aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div
//             id="mobile-nav"
//             className="md:hidden border-t border-gray-200 py-4"
//             onKeyDown={onKeyDownClose}
//           >
//             <div className="space-y-1">
//               {/* Home */}
//               <Link
//                 href="/"
//                 className={'block px-4 py-3 rounded-lg mx-2 ' + getNavLinkClass('/')}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Home
//               </Link>

//               {/* Mobile Categories */}
//               <div className="px-2">
//                 <div className="font-semibold text-gray-900 px-2 py-2 border-b border-gray-100 mb-2">
//                   Categories
//                 </div>
//                 <div className="space-y-1">
//                   {safeCategories.map((category) => (
//                     <Link
//                       key={category.id}
//                       href={`/categories/${category.slug}`}
//                       className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg font-medium"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {category.title}
//                     </Link>
//                   ))}
//                 </div>
//                 <Link
//                   href="/categories"
//                   className="block px-4 py-3 mt-3 text-primary-600 font-medium border-t border-gray-100 pt-3"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   View All Categories →
//                 </Link>
//               </div>

//               {/* Blog */}
//               <Link
//                 href="/posts"
//                 className={'block px-4 py-3 rounded-lg mx-2 ' + getNavLinkClass('/posts')}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Blog
//               </Link>

//               {/* Supplements */}
//               <Link
//                 href="/supplements"
//                 className={'block px-4 py-3 rounded-lg mx-2 ' + getNavLinkClass('/supplements')}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Supplements
//               </Link>

//               {/* Reviews */}
//               <Link
//                 href="/reviews"
//                 className={'block px-4 py-3 rounded-lg mx-2 ' + getNavLinkClass('/reviews')}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Reviews
//               </Link>

//               <div className="pt-4 border-t border-gray-200 mt-4 mx-2">
//                 <div className="bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-medium">
//                   CLAIM DISCOUNT
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Overlay for dropdowns */}
//       {openDropdown && <div className="fixed inset-0 z-40" onClick={closeDropdown} />}
//     </nav>
//   )
// }
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
      'relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-3 lg:px-4 rounded-lg hover:bg-blue-50 group whitespace-nowrap'
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
    return isActive
      ? 'relative text-blue-600 bg-blue-50 font-semibold py-2 px-3 lg:px-4 rounded-lg border border-blue-100 whitespace-nowrap'
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
        <div className="mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
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
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-3 lg:px-4 rounded-lg hover:bg-blue-50 group"
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
                    className="absolute top-full left-0 mt-3 w-[32rem] bg-white rounded-xl shadow-xl border border-gray-200 py-4 z-50 animate-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Browse Categories</h3>
                      <p className="text-xs text-gray-500 mt-1">Explore our health topics</p>
                    </div>

                    {/* Categories Grid - 2 rows x 4 columns */}
                    <div className="grid grid-cols-2 gap-2 px-3 mb-4">
                      {(categories || []).slice(0, 8).map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg group"
                          onClick={closeDropdown}
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                          <span className="flex-1">{category.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <Link
                        href="/categories"
                        className="flex items-center justify-center mx-2 px-4 py-3 text-blue-600 hover:text-blue-700 font-semibold hover:bg-blue-50 transition-all duration-200 rounded-lg border border-blue-200 hover:border-blue-300"
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
                <span>Blog</span>
                {pathname.startsWith('/posts') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link href="/supplements" className={getNavLinkClass('/supplements')}>
                <span className="hidden lg:inline">Supplements</span>
                <span className="lg:hidden">Supps</span>
                {pathname.startsWith('/supplements') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            </div>

            {/* Center Logo */}
            <div className="flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:z-10">
              <Link href="/" className="flex items-center group">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                      HealthScopeDaily
                    </div>
                    <div className="text-xs text-gray-500 font-medium -mt-1 whitespace-nowrap">
                      Evidence-Based Reviews
                    </div>
                  </div>
                  <div className="hidden md:block lg:hidden">
                    <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                      HealthScope
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
              <Link href="/brands" className={getNavLinkClass('/brands')}>
                <span>Brands</span>
                {pathname.startsWith('/brands') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>

              <Link href="/reviews" className={getNavLinkClass('/reviews')}>
                <span>Reviews</span>
                {pathname.startsWith('/reviews') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>

              <Link href="/authors" className={getNavLinkClass('/authors')}>
                <span className="hidden lg:inline">Our Experts</span>
                <span className="lg:hidden">Experts</span>
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
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 px-3 lg:px-4 rounded-lg hover:bg-blue-50 group"
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
                    className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 animate-in slide-in-from-top-2 duration-200"
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
                    <Link href="/team" className={getDropdownLinkClass()} onClick={closeDropdown}>
                      <div className="flex items-center space-x-3 w-full">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="flex-1">Our Team</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 lg:space-x-3 ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-gray-200">
                <Link
                  href="/search"
                  aria-label="Search"
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                >
                  <Search className="w-5 h-5" />
                </Link>

                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 lg:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                  <span className="hidden lg:inline">Get Started</span>
                  <span className="lg:hidden">Start</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link
                href="/search"
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
              className="md:hidden border-t border-gray-200 bg-white shadow-lg relative z-50"
              onKeyDown={onKeyDownClose}
            >
              <div className="py-6 px-4 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Main Navigation */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname === '/'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Home</span>
                  </Link>

                  <Link
                    href="/posts"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname.startsWith('/posts')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Blog</span>
                  </Link>

                  <Link
                    href="/supplements"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname.startsWith('/supplements')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-medium">Supplements</span>
                  </Link>

                  <Link
                    href="/brands"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname.startsWith('/brands')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">Brands</span>
                  </Link>

                  <Link
                    href="/reviews"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname.startsWith('/reviews')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium">Reviews</span>
                  </Link>

                  <Link
                    href="/authors"
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      pathname.startsWith('/authors')
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="font-medium">Our Experts</span>
                  </Link>
                </div>

                {/* Categories Section */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(categories || []).slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center space-x-2 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{category.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/categories"
                    className="inline-flex items-center mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>View All Categories</span>
                    <ChevronDownIcon className="w-4 h-4 ml-1 rotate-[-90deg]" />
                  </Link>
                </div>

                {/* Company Section */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/about"
                      className="flex items-center space-x-3 py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>About Us</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-3 py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <MagnifyingGlassIcon className="w-4 h-4" />
                      <span>Contact</span>
                    </Link>
                    <Link
                      href="/faq"
                      className="flex items-center space-x-3 py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Award className="w-4 h-4" />
                      <span>FAQ</span>
                    </Link>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </button>
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
