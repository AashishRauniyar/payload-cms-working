'use client'
import React from 'react'
import Link from 'next/link'

export default function ExtendedFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Consumer Health</h3>
                <p className="text-sm text-gray-400">Digest</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted source for evidence-based health information, comprehensive product
              reviews, and expert medical advice to help you make informed decisions about your
              health and wellness.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Health Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Health Categories</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Weight Loss
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Joint Pain
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Men's Health
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Women's Health
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Brain Health
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Anti-Aging
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Eye Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Digestive Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Reviews */}
          <div>
            <h4 className="font-bold text-lg mb-4">Product Reviews</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Vitamins
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Protein Powders
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  CBD Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Beauty Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Fitness Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Health Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Medical Board
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Editorial Process
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Evidence-Based
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Clinical Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Health News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Wellness Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Partnerships
                </Link>
              </li>
            </ul>

            <h5 className="font-semibold text-gray-400 mt-6 mb-3">Legal</h5>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Disclaimer */}
            <div className="lg:w-3/5">
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Medical Disclaimer:</strong> The information
                provided on this website is for educational purposes only and is not intended as
                medical advice. Always consult with a qualified healthcare provider before making
                any changes to your health regimen.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-300">SSL Secured</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-300">Medically Reviewed</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-300">Trusted Reviews</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © 2025 Consumer Health Digest. All rights reserved. | Made with ❤️ for your health
              and wellness journey.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
