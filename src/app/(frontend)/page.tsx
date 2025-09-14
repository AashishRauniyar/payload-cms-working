'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LandingFooter from '@/components/ui/LandingFooter'
import type { Post, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

// Enhanced Counter component with better animations
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

      // Enhanced easing function for smoother animation
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
    <span id={`counter-${end}`} className="inline-block">
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

export default function LandingPage() {
  // State for advertisement visibility
  const [isAdVisible, setIsAdVisible] = useState(true)

  // Static data for best guides - could be fetched from API in the future
  const bestGuides = [
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
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-right px-6 py-2 border-b border-gray-200 relative">
        <span className="text-xs text-gray-500 font-medium">Advertisement</span>
        <button
          onClick={() => setIsAdVisible(!isAdVisible)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label={isAdVisible ? 'Close advertisement' : 'Show advertisement'}
        >
          {isAdVisible ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Promotional Banner */}
      <div
        className={`bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-6 relative overflow-hidden transition-all duration-500 ease-in-out ${
          isAdVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                GET UP TO 50% OFF
              </h2>
              <p className="text-xl text-white/90 font-semibold">HEALTH-BOOSTING BUNDLES*</p>
            </div>
            <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-white/20">
              CLAIM YOUR DISCOUNT TODAY
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-24 lg:pt-32 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-300/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-blue-800 px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-blue-200/50">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              #1 Trusted Supplement Review Platform
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Expert-Tested
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Supplement Reviews
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  You Can Trust
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-medium">
                Discover the most effective supplements with our science-backed reviews, clinical
                research analysis, and real user testimonials. Make informed decisions for your
                health journey.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">FDA Guidelines</h3>
                <p className="text-sm opacity-90">Compliant Reviews</p>
              </div>

              <div className="group bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">3rd Party Testing</h3>
                <p className="text-sm opacity-90">Verified Results</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Real Users</h3>
                <p className="text-sm opacity-90">Authentic Reviews</p>
              </div>

              <div className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Money Back</h3>
                <p className="text-sm opacity-90">Guarantee Info</p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-lg">Lab Tested</span>
              </div>
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-lg">Doctor Reviewed</span>
              </div>
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-lg">User Verified</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/posts"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-center flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-blue-500/20"
              >
                Browse Reviews
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <button className="group bg-white/90 backdrop-blur-sm border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Watch How It Works
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Bar */}
        <div className="bg-white/90 backdrop-blur-md mt-20 py-8 border border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Medical Board Certified</span>
              </div>
              <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold">SSL Secured</span>
              </div>
              <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <span className="font-semibold">5M+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-blue-200/50">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </div>
              Expert Reviewed Categories
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Find The Perfect{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Supplement
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Browse our comprehensive reviews across the most popular supplement categories. Each
              product is rigorously tested and reviewed by our medical experts.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {productCategories.map((category, index) => (
              <Link key={index} href="/posts" className="block group">
                <div className="relative h-full">
                  <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-gray-200/50 group-hover:border-blue-300/50 group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-500"></div>

                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <div className="text-blue-600 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-500">
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-800 group-hover:text-blue-600 transition-colors duration-500 mb-3">
                        {category.name}
                      </h3>
                      <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-500 font-semibold flex items-center justify-center gap-2">
                        View Reviews
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Enhanced Category Stats */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl p-12 text-center shadow-2xl border border-blue-200/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Our Review Database</h3>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-3 group">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={2500} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-600 font-semibold">Weight Loss Products</div>
                </div>
                <div className="space-y-3 group">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={1200} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-600 font-semibold">
                    Men's Health Supplements
                  </div>
                </div>
                <div className="space-y-3 group">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={800} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-600 font-semibold">Brain Health Products</div>
                </div>
                <div className="space-y-3 group">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={1500} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-600 font-semibold">Joint Support Options</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-blue-200/50">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  Trusted Brand Reviews
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    BRANDS
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Looking for a particular brand? This Brands A-Z page is a near comprehensive
                  listing of brands reviewed, including skin care, weight management, vitamins and
                  supplements.
                </p>

                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Our team of experts objectively review a wide range of products and services
                  across the best health and wellness brands. Whether it&apos;s a well-known brand
                  or a new company, if it&apos;s out there, we&apos;re reviewing it for you.
                </p>

                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  See how some of your favorite brands rank in our rigorous, unbiased reviews! Click
                  any of the brands to go straight to the reviews. If you have a specific question
                  about any brand, leave us a comment or send us an email!
                </p>
              </div>

              <div className="pt-8">
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-black text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  VIEW ALL BRANDS
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Brand Logos */}
            <div className="grid grid-cols-2 gap-6">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 min-h-[140px] flex flex-col justify-center relative overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-500"></div>

                  <div className="relative z-10 group-hover:scale-105 transition-transform duration-500">
                    {/* Brand Logo/Name */}
                    <h3
                      className={`font-black text-xl mb-3 ${brand.color} group-hover:opacity-80 transition-opacity duration-300`}
                    >
                      {brand.logo}
                    </h3>

                    {/* Subtitle if exists */}
                    {brand.subtitle && (
                      <p className="text-xs text-gray-500 font-semibold tracking-wider mb-3">
                        {brand.subtitle}
                      </p>
                    )}

                    {/* Special styling for specific brands */}
                    {brand.name === 'Beverly Hills MD' && (
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300 delay-75"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300 delay-150"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300 delay-200"></div>
                      </div>
                    )}

                    {brand.name === 'Gundry MD' && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {brand.name === 'ActivatedYou' && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300">
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
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-orange-200/50">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              Editor's Choice
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BEST GUIDE
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {bestGuides.map((guide: any, index: number) => (
              <Link
                key={index}
                href={guide.slug !== '#' ? `/posts/${guide.slug}` : '#'}
                className="block group"
              >
                <article className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-200/50 transform hover:scale-105 hover:-translate-y-2 relative">
                  <div className="overflow-hidden relative">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Ranking badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-black text-xl mb-4 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-semibold">
                      <span>Read more</span>
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
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* VIEW ALL Button */}
          <div className="text-center mb-16">
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-black text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              VIEW ALL
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl p-12 text-center shadow-2xl border border-gray-200/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black text-gray-900 mb-6">Looking for more?</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium max-w-3xl mx-auto">
                Browse our list of best articles on vitamins and supplements, skincare products and
                more. Find the original content, including expert recommended products, guides, and
                evidence-based research.
              </p>
              <Link
                href="/posts"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                See Our Best Guide
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left Column - Hero Image */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-blue-600/20"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
                  alt="Happy couple exercising outdoors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Enhanced floating elements */}
                <div className="absolute top-8 left-8 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>

                <div className="absolute bottom-8 right-8 w-16 h-16 bg-blue-600/30 rounded-full backdrop-blur-sm animate-pulse shadow-lg"></div>
                <div className="absolute top-1/2 right-12 w-12 h-12 bg-orange-400/40 rounded-full backdrop-blur-sm animate-bounce delay-1000 shadow-lg"></div>
                <div className="absolute top-1/4 left-1/2 w-8 h-8 bg-green-400/30 rounded-full backdrop-blur-sm animate-pulse delay-500 shadow-lg"></div>
              </div>

              {/* Right Column - Newsletter Form */}
              <div className="p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white relative">
                <div className="max-w-md mx-auto w-full">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-blue-200/50">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      Stay Updated
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        SUBSCRIBE TO OUR
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        NEWSLETTER
                      </span>
                    </h2>
                  </div>

                  <form className="space-y-6">
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="w-full px-6 py-5 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 group-hover:border-gray-300 shadow-lg"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors"
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
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl"
                    >
                      Subscribe Now
                    </button>
                  </form>

                  <div className="mt-8 space-y-6">
                    <p className="text-gray-700 text-center leading-relaxed text-lg font-medium">
                      Spam-free newsletters directly from our health experts and professionals.
                    </p>

                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">
                        Your{' '}
                        <a href="#" className="text-blue-600 hover:underline font-bold">
                          privacy
                        </a>{' '}
                        is important to us
                      </span>
                    </div>
                  </div>

                  {/* Enhanced trust indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                        <span className="font-semibold">No Spam</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                        <span className="font-semibold">Expert Content</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg"></div>
                        <span className="font-semibold">Unsubscribe Anytime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Choice - Top Picks */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-orange-200/50">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              Editor's Choice
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Top-Rated{' '}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Supplements
              </span>{' '}
              This Month
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Our medical experts have tested and ranked these supplements based on efficacy,
              safety, and value. Updated monthly with the latest research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {topPicks.map((pick, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-200/50 relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-red-50/0 group-hover:from-orange-50/50 group-hover:to-red-50/50 transition-all duration-500"></div>

                {/* Ranking Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  #{index + 1}
                </div>

                {/* Product Image */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 group-hover:from-orange-50 group-hover:to-red-50 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <img
                      src={pick.image}
                      alt={pick.name}
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                  {/* Trust Badge */}
                  {index === 0 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-2 rounded-full font-black shadow-lg">
                      #1 CHOICE
                    </div>
                  )}
                </div>

                <div className="text-center space-y-4 relative z-10">
                  <h3 className="font-black text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {pick.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {pick.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-3 py-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-black text-gray-800 text-lg">{pick.rating}</span>
                    <span className="text-gray-500 text-sm font-semibold">(2.1k reviews)</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">3rd Party Tested</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Money Back Guarantee</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-2xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                    View Full Review
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 p-12 rounded-3xl shadow-2xl border border-gray-200/30 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 mb-6">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                  Our supplement database contains over 5,000 reviewed products. Use our smart
                  search to find the perfect match for your health goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Search supplements..."
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium shadow-lg"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-blue-200/50">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  Trusted by Millions
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Feel nourished,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    live your best life.
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                  Trustworthy and Empathetic Health Information.
                </p>
              </div>
            </div>

            {/* Right Column - Clean Horizontal Stats */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Stat 1 */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={400} suffix=" K+" />
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-semibold">
                      Monthly Readers
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/50 group-hover:to-emerald-50/50 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                    </div>
                    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={100} suffix=" K+" />
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-semibold">
                      Medical Reviewers
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-indigo-50/0 group-hover:from-purple-50/50 group-hover:to-indigo-50/50 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={5} suffix=" K+" />
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-semibold">
                      Wellness Topics
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Review Process & Medical Board */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Review Process */}
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg border border-blue-200/50">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Our Review Standards
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                  Science-Backed{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Review Process
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                  Every supplement review follows our rigorous 6-step process to ensure you get
                  accurate, unbiased information backed by clinical research.
                </p>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-blue-100/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-3 text-xl">
                      Laboratory Testing & Analysis
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Independent 3rd party testing for purity, potency, and contamination
                      screening.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-green-100/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-3 text-xl">
                      Clinical Research Review
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Comprehensive analysis of peer-reviewed studies and clinical trial data.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-3 text-xl">
                      Medical Expert Validation
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Board-certified physicians and specialists review all findings and
                      recommendations.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-orange-100/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-3 text-xl">
                      Real User Testing Program
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      60-day user trials with verified participants tracking real-world results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 rounded-3xl shadow-xl border border-gray-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-black text-gray-900 text-xl">Transparency Guarantee</span>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium">
                  We maintain complete editorial independence. Our reviews are never influenced by
                  manufacturers or advertisers. Learn more about our editorial process.
                </p>
              </div>
            </div>

            {/* Medical Board */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Medical Advisory Board
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  <span className="text-green-600">150+</span> Medical Experts
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our diverse team of board-certified physicians, nutritionists, and research
                  specialists ensures every review meets the highest medical standards.
                </p>
              </div>

              {/* Expert Profiles */}
              <div className="grid grid-cols-1 gap-6">
                {expertTeam.slice(0, 3).map((expert, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{expert.name}</h4>
                        <p className="text-blue-600 font-semibold text-sm mb-2">{expert.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Board Certified</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                            <span>15+ Years Experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Board Stats */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      <AnimatedCounter end={150} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600">Medical Reviewers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      <AnimatedCounter end={25} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600">Specialties Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      <AnimatedCounter end={500} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600">Hours Weekly Review</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      <AnimatedCounter end={99} suffix="%" />
                    </div>
                    <div className="text-sm text-gray-600">Accuracy Rating</div>
                  </div>
                </div>
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
    </div>
  )
}
