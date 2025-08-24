'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LandingFooter from '@/components/ui/LandingFooter'
import type { Post, Media } from '@/payload-types'

// Props interface for the landing page
interface LandingPageProps {
  featuredPosts?: Post[]
}

// Counter component for animating numbers
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number | string
  duration?: number
  suffix?: string
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [end, isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const endValue = parseInt(end.toString().replace(/[^\d]/g, ''))

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * endValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isVisible, end, duration])

  return (
    <span id={`counter-${end}`}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Exact data from Consumer Health Digest with matching icons
const productCategories = [
  {
    name: 'Weight Loss',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8C35.3137 8 38 10.6863 38 14V18H42C45.3137 18 48 20.6863 48 24V50C48 53.3137 45.3137 56 42 56H22C18.6863 56 16 53.3137 16 50V24C16 20.6863 18.6863 18 22 18H26V14C26 10.6863 28.6863 8 32 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M28 26H36M28 32H36M28 38H32" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="45" r="3" fill="#60A5FA" />
      </svg>
    ),
  },
  {
    name: 'Joint Pain',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <path
          d="M32 12C28 12 25 15 25 19V25C25 29 28 32 32 32C36 32 39 29 39 25V19C39 15 36 12 32 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M32 32V45" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="48" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="28" cy="22" r="2" fill="#60A5FA" />
        <circle cx="36" cy="22" r="2" fill="#60A5FA" />
      </svg>
    ),
  },
  {
    name: "Men's Health",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 56V48C18 43.5817 21.5817 40 26 40H38C42.4183 40 46 43.5817 46 48V56"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M45 15L52 8M52 8L58 14M52 8V20M52 8H40" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="32" cy="45" r="2" fill="#60A5FA" />
      </svg>
    ),
  },
  {
    name: 'Brain Health',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <path
          d="M20 25C20 18.3726 25.3726 13 32 13C38.6274 13 44 18.3726 44 25C44 28.5 42.5 31.5 40 33.5C41 35 42 37 42 39C42 42.3137 39.3137 45 36 45H28C24.6863 45 22 42.3137 22 39C22 37 23 35 24 33.5C21.5 31.5 20 28.5 20 25Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="28" cy="25" r="2" fill="#60A5FA" />
        <circle cx="36" cy="25" r="2" fill="#60A5FA" />
        <path d="M26 35C28 37 30 37 32 37C34 37 36 37 38 35" stroke="#60A5FA" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Anti-Aging',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 56V48C18 43.5817 21.5817 40 26 40H38C42.4183 40 46 43.5817 46 48V56"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="28" cy="18" r="1.5" fill="#60A5FA" />
        <circle cx="36" cy="18" r="1.5" fill="#60A5FA" />
        <path d="M29 22C30 23 31 23 32 23C33 23 34 23 35 22" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="32" cy="32" r="2" stroke="#60A5FA" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: 'Eye Cream',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
        <path
          d="M32 16C24 16 18 22 18 28C18 34 24 40 32 40C40 40 46 34 46 28C46 22 40 16 32 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="28" r="3" fill="#60A5FA" />
        <path
          d="M22 48C25 50 28 51 32 51C36 51 39 50 42 48"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="27" cy="45" r="1" fill="#60A5FA" />
        <circle cx="37" cy="45" r="1" fill="#60A5FA" />
      </svg>
    ),
  },
]

const brands = [
  {
    name: 'Beverly Hills MD',
    logo: 'BEVERLY HILLS MD',
    subtitle: 'COSMECEUTICALS',
    color: 'text-blue-600',
  },
  {
    name: 'CrazyBulk',
    logo: 'CRAZYBULK',
    subtitle: 'BULKING • CUTTING • STRENGTH',
    color: 'text-gray-900',
  },
  {
    name: 'DRMTLGY',
    logo: 'DRMTLGY',
    subtitle: 'MEDICAL GRADE SKIN CARE',
    color: 'text-gray-900',
  },
  {
    name: 'Gundry MD',
    logo: 'GUNDRY MD',
    subtitle: '',
    color: 'text-gray-700',
  },
  {
    name: 'Nushape',
    logo: 'NUSHAPE',
    subtitle: '',
    color: 'text-gray-900',
  },
  {
    name: 'ActivatedYou',
    logo: 'ACTIVATEDYOU',
    subtitle: '',
    color: 'text-orange-500',
  },
]

const topPicks = [
  {
    name: 'Mitolyn',
    description: 'Support Weight Loss',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Emma Relief',
    description: 'Best Solution for Digestive Health',
    rating: 4.0,
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Polyphenol-Rich Olive Oil',
    description: 'High-Quality Olive Oil Abundant',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Morning Kick',
    description: 'Support Healthy Digestion and Energy Levels',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=200&q=80',
  },
]

const expertTeam = [
  {
    name: 'Pauline J. Jose, M.D.',
    title: 'Specialist in Family Medicine',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Franz Gliederer, MD, MPH',
    title: 'Functional Medicine, Urgent Care Physician',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Aneesh Singla, MD, MPH',
    title: 'Physician, Interventional Pain Specialist',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Harlan Stueven,MD',
    title: 'Board-Certified Emergency Physician',
    image:
      'https://images.unsplash.com/photo-1594824609379-2d4b936c8e66?auto=format&fit=crop&w=150&q=80',
  },
]

const featuredTopics = [
  {
    title: 'Dietitian-Approved Foods to Boost Testosterone Naturally',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Best Low-Carb Vegetables, Recommended by Dietitians',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'List of Low-Calorie Foods – Nutritious Way for Healthy Diet',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: '10 Fat-Burning Foods To Support Metabolism and Weight Loss',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
  },
]

export default function LandingPage({ featuredPosts = [] }: LandingPageProps) {
  // Use featured posts or fallback to static data
  const bestGuides =
    featuredPosts.length > 0
      ? featuredPosts.slice(0, 3).map((post: Post) => ({
          title: post.title,
          image:
            (post.heroImage as Media)?.url ||
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80',
          slug: post.slug,
        }))
      : [
          {
            title: '20 Best Male Enhancement Pills – Top Over The Counter Sex Pills For Men 2025',
            image:
              'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80',
            slug: '#',
          },
          {
            title: 'The Best Anti-Aging Eye Cream 2025 For Wrinkles, Fine Lines, And Dark Circles',
            image:
              'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
            slug: '#',
          },
          {
            title: 'The 30 Best Supplements In 2025 For Joint Pain, Knee Pain, And Cartilage',
            image:
              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
            slug: '#',
          },
        ]

  return (
    <div className="bg-white min-h-screen font-sans w-full overflow-x-hidden">
      {/* Advertisement Banner */}
      <div className="bg-gray-100 text-right px-4 py-1">
        <span className="text-xs text-gray-500">Advertisement</span>
      </div>

      {/* HealthScopeDaily Promotional Banner */}
      <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-blue-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Removed logo and HealthScopeDaily text */}
            <div className="text-center w-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-red-600">GET UP TO 50% OFF</h2>
              <p className="text-lg text-gray-700">HEALTH-BOOSTING BUNDLES*</p>
            </div>
            <button className="bg-gray-800 text-yellow-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition shadow-lg ml-8">
              CLAIM YOUR DISCOUNT TODAY
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
                Trusted Reviews,
                <br />
                Honest Ratings and
                <br />
                Quality Advice
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Consumer Health Digest is your premier source for evidence-based health and wellness
                information and unbiased product reviews.
              </p>

              {/* Search Bar */}
              <div className="mb-12">
                <div className="flex rounded-full border-2 border-gray-300 bg-white shadow-lg max-w-lg">
                  <input
                    type="search"
                    placeholder="How can we help you?"
                    className="flex-1 px-6 py-4 text-lg text-gray-700 rounded-l-full focus:outline-none"
                  />
                  <button className="bg-red-500 text-white px-10 py-4 rounded-r-full font-bold text-lg hover:bg-red-600 transition flex items-center gap-2">
                    SEARCH <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="text-center">
              <div className="mb-10">
                <h2 className="text-5xl font-bold text-gray-900 mb-2">Reviewed</h2>
                <h2 className="text-5xl font-bold text-gray-900">Over 10K+ Products</h2>
              </div>

              {/* Feature Icons Grid */}
              <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-blue-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      className="w-10 h-10 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    Find The Best Products
                  </h3>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-green-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      className="w-10 h-10 text-green-600 group-hover:text-green-700 group-hover:scale-110 transition-all duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    Up-to-Date Reviews
                  </h3>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-purple-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      className="w-10 h-10 text-purple-600 group-hover:text-purple-700 group-hover:scale-110 transition-all duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11C16.1 11 17 11.9 17 13S16.1 15 15 15 13 14.1 13 13 13.9 11 15 11ZM11 20C12.1 20 13 20.9 13 22H9C9 20.9 9.9 20 11 20Z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    Experienced Researchers
                  </h3>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-orange-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      className="w-10 h-10 text-orange-600 group-hover:text-orange-700 group-hover:scale-110 transition-all duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19ZM6 15H18V17H6V15ZM6 11H18V13H6V11ZM6 7H18V9H6V7Z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    Stay Informed
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-16">
          <div className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-100 hover:border-gray-600 hover:scale-110 transition-all duration-300 animate-bounce">
            <svg
              className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Product Review Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-600 mb-6">PRODUCT REVIEW</h2>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2"
              >
                VIEW ALL →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12 max-w-5xl mx-auto">
            {productCategories.map((category, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-32 h-32 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 shadow-lg border border-gray-100">
                  <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">
                    {category.icon}
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    category.name === "Men's Health"
                      ? 'text-blue-600 group-hover:text-blue-700'
                      : 'text-gray-800 group-hover:text-blue-600'
                  }`}
                >
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-blue-600 mb-8">BRANDS</h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Looking for a particular brand? This Brands A-Z page is a near comprehensive listing
                of brands reviewed, including skin care, weight management, vitamins and
                supplements.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our team of experts objectively review a wide range of products and services across
                the best health and wellness brands. Whether it&apos;s a well-known brand or a new
                company, if it&apos;s out there, we&apos;re reviewing it for you.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                See how some of your favorite brands rank in our rigorous, unbiased reviews! Click
                any of the brands to go straight to the reviews. If you have a specific question
                about any brand, leave us a comment or send us an email!
              </p>

              <div className="pt-6">
                <a href="#" className="text-red-600 font-bold text-lg hover:underline">
                  VIEW ALL BRANDS
                </a>
              </div>
            </div>

            {/* Right Column - Brand Logos */}
            <div className="grid grid-cols-2 gap-8">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 min-h-[120px] flex flex-col justify-center"
                >
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {/* Brand Logo/Name */}
                    <h3
                      className={`font-bold text-xl mb-2 ${brand.color} group-hover:opacity-80 transition-opacity`}
                    >
                      {brand.logo}
                    </h3>

                    {/* Subtitle if exists */}
                    {brand.subtitle && (
                      <p className="text-xs text-gray-500 font-medium tracking-wider">
                        {brand.subtitle}
                      </p>
                    )}

                    {/* Special styling for specific brands */}
                    {brand.name === 'Beverly Hills MD' && (
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    )}

                    {brand.name === 'Gundry MD' && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-6 h-6 text-green-500">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {brand.name === 'ActivatedYou' && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-5 h-5 text-orange-500">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Guide Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-600 mb-6">BEST GUIDE</h2>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2"
              >
                VIEW ALL →
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {bestGuides.map((guide: any, index: number) => (
              <Link
                key={index}
                href={guide.slug !== '#' ? `/posts/${guide.slug}` : '#'}
                className="block"
              >
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer border border-gray-100">
                  <div className="overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for more?</h3>
            <p className="text-gray-600 mb-6">
              Browse our list of best articles on vitamins and supplements, skincare products and
              more. Find the original content, including expert recommended products, guides, and
              evidence-based research.
            </p>
            <Link
              href="/posts"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              See Our Best Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[500px]">
              {/* Left Column - Hero Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-blue-600/20"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
                  alt="Happy couple exercising outdoors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Floating elements for visual interest */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>

                <div className="absolute bottom-8 right-8 w-12 h-12 bg-blue-600/30 rounded-full backdrop-blur-sm animate-pulse"></div>
                <div className="absolute top-1/2 right-12 w-8 h-8 bg-orange-400/40 rounded-full backdrop-blur-sm animate-bounce delay-1000"></div>
              </div>

              {/* Right Column - Newsletter Form */}
              <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-md mx-auto w-full">
                  <h2 className="text-5xl font-bold text-blue-600 mb-8 leading-tight">
                    SUBSCRIBE TO OUR NEWSLETTER
                  </h2>

                  <form className="space-y-6">
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Email Address..."
                        className="w-full px-6 py-4 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Submit
                    </button>
                  </form>

                  <div className="mt-8 space-y-4">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Spam-free newsletters directly from our health experts and professionals.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Your{' '}
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                          privacy
                        </a>{' '}
                        is important to us
                      </span>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>No Spam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Expert Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Unsubscribe Anytime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Top Picks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">OUR TOP PICKS FOR YOU</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPicks.map((pick, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={pick.image}
                  alt={pick.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{pick.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{pick.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-yellow-500 text-xl">★★★★★</span>
                  <span className="font-semibold">{pick.rating}</span>
                </div>
                <button className="bg-orange-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Check Price
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-5xl font-bold text-blue-600 mb-6 leading-tight">
                Feel nourished, live your best life.
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Trustworthy and Empathetic Health Information.
              </p>
            </div>

            {/* Right Column - Stats with chevron design */}
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {/* Stat 1 */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 min-w-[200px] group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    <AnimatedCounter end={400} suffix=" K+" />
                  </div>
                  <div className="text-lg text-gray-600 font-medium">Monthly Readers</div>
                </div>

                {/* Chevron Arrow 1 */}
                <div className="mx-4">
                  <svg className="w-6 h-12 text-green-500" fill="currentColor" viewBox="0 0 12 24">
                    <path d="M0 0 L8 12 L0 24 L4 24 L12 12 L4 0 Z" />
                  </svg>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 min-w-[200px] group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    <AnimatedCounter end={100} suffix=" K+" />
                  </div>
                  <div className="text-lg text-gray-600 font-medium">Medical Reviewers</div>
                </div>

                {/* Chevron Arrow 2 */}
                <div className="mx-4">
                  <svg className="w-6 h-12 text-blue-500" fill="currentColor" viewBox="0 0 12 24">
                    <path d="M0 0 L8 12 L0 24 L4 24 L12 12 L4 0 Z" />
                  </svg>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 min-w-[200px] group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    <AnimatedCounter end={5} suffix=" K+" />
                  </div>
                  <div className="text-lg text-gray-600 font-medium">Wellness Topics</div>
                </div>

                {/* Final Chevron Arrow */}
                <div className="mx-4">
                  <svg className="w-6 h-12 text-green-500" fill="currentColor" viewBox="0 0 12 24">
                    <path d="M0 0 L8 12 L0 24 L4 24 L12 12 L4 0 Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Standards</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our aim is to provide you with the most updated information so you can improve your
                overall health.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                    <span className="text-blue-600 font-bold group-hover:text-blue-700 group-hover:scale-125 transition-all duration-300">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      Written by health specialists and writers
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <span className="text-green-600 font-bold group-hover:text-green-700 group-hover:scale-125 transition-all duration-300">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      Fact checked against current research
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                    <span className="text-purple-600 font-bold group-hover:text-purple-700 group-hover:scale-125 transition-all duration-300">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      Reviewed by top accredited medical experts
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                    <span className="text-orange-600 font-bold group-hover:text-orange-700 group-hover:scale-125 transition-all duration-300">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      Continually revised based on current research
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  Read About Our Process →
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Medical Expert Board</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team of more than 100+ board-certified physicians and health care professionals,
                to ensure our articles and content is medically accurate, relevant, and up-to-date.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {expertTeam.map((expert, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                    />
                    <h4 className="font-semibold text-gray-900 text-sm">{expert.name}</h4>
                    <p className="text-xs text-gray-600">{expert.title}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  Meet The Team →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen On */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-4xl font-bold text-blue-600">AS SEEN ON</h3>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2 group"
              >
                VIEW ALL
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-center gap-16 flex-wrap">
              {/* GREATIST */}
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="bg-black text-white px-8 py-4 rounded-none font-bold text-xl tracking-wider group-hover:bg-gray-800 transition-colors duration-300 shadow-lg group-hover:shadow-xl">
                  GREATIST
                </div>
              </div>

              {/* healthline */}
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="bg-black text-white px-8 py-4 rounded-none font-bold text-xl tracking-wider group-hover:bg-gray-800 transition-colors duration-300 shadow-lg group-hover:shadow-xl">
                  healthline
                </div>
              </div>

              {/* allure */}
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-gray-900 font-light text-2xl tracking-wide group-hover:text-black transition-colors duration-300">
                  allure
                </div>
              </div>

              {/* elite daily */}
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-gray-900 font-bold text-xl tracking-wide group-hover:text-black transition-colors duration-300">
                  elite daily
                </div>
              </div>

              {/* VOICE */}
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="bg-black text-white px-8 py-4 rounded-none font-bold text-xl tracking-widest group-hover:bg-gray-800 transition-colors duration-300 shadow-lg group-hover:shadow-xl flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  VOICE
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="mt-12 flex items-center justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Topic</h2>
            <p className="text-xl text-gray-600">VIEW ALL</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic, index) => (
              <article
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img src={topic.image} alt={topic.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-tight">{topic.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              VIEW ALL →
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <LandingFooter />
    </div>
  )
}
