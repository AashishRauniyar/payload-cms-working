'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* Schema.org structured data for website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HealthScopeDaily - Health & Wellness Expert Reviews',
            url: 'https://healthscopedaily.com',
            description:
              'Expert health and wellness reviews, supplement guides, and professional medical advice.',
            publisher: {
              '@type': 'Organization',
              name: 'HealthScopeDaily',
              logo: {
                '@type': 'ImageObject',
                url: 'https://healthscopedaily.com/HealthScopeDaily.png',
              },
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://healthscopedaily.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 15.74L15.18 22L12 18.74L8.82 22L10.91 15.74L2 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">HealthScopeDaily</h3>
                <p className="text-sm text-gray-400">Health & Wellness Experts</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted source for expert health and wellness reviews, supplement guides, and
              professional medical advice. Making informed health decisions easier.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/healthscopedaily"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow us on Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/healthscopedaily"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow us on Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/healthscopedaily"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow us on LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/healthscopedaily"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow us on Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986 6.618 0 11.986-5.368 11.986-11.986C24.003 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.446c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323 0 1.298-.49 2.449-1.297 3.324-.875.807-2.026 1.297-3.323 1.297zm7.581-9.02c-.26 0-.521-.104-.708-.291a.998.998 0 01-.291-.708c0-.26.104-.521.291-.708.188-.188.448-.291.708-.291.26 0 .521.104.708.291.188.188.291.448.291.708 0 .26-.104.521-.291.708-.187.188-.448.291-.708.291z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-300 hover:text-white transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/supplements"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-300 hover:text-white transition-colors">
                  Brand Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Product Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Health Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categories/general-health"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  General Health
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/beauty-skin-care"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Beauty & Skin Care
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/weight-management"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Weight Management
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/mental-health"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mental Health
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/fitness"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fitness & Exercise
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/nutrition"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Nutrition
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/supplements"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Supplements
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support & Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold mb-3">Subscribe to Our Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  aria-label="Email address for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators & Certifications */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h5 className="font-semibold text-white mb-2">Expert Reviewed</h5>
              <p className="text-sm text-gray-400">All content reviewed by health professionals</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h5 className="font-semibold text-white mb-2">Evidence-Based</h5>
              <p className="text-sm text-gray-400">Science-backed recommendations only</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h5 className="font-semibold text-white mb-2">Independent</h5>
              <p className="text-sm text-gray-400">Unbiased product evaluations</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h5 className="font-semibold text-white mb-2">Privacy Protected</h5>
              <p className="text-sm text-gray-400">Your data is safe and secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              <strong className="text-gray-300">Medical Disclaimer:</strong> The information
              provided on HealthScopeDaily is for educational and informational purposes only. It is
              not intended as a substitute for professional medical advice, diagnosis, or treatment.
              Always seek the advice of your physician or other qualified health provider with any
              questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} HealthScopeDaily. All rights reserved. | Made with ❤️ for your health
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
