'use client'

import React from 'react'
import Link from 'next/link'

const AboutContact = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Have questions about our reviews, need personalized health guidance, or want to
            collaborate with our team? We&apos;d love to hear from you.
          </p>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-700 rounded-2xl p-6 hover:bg-blue-800 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
              <p className="text-blue-200 text-sm mb-3">For general inquiries and support</p>
              <a
                href="mailto:contact@healthscopedaily.com"
                className="text-white font-medium hover:underline"
              >
                contact@healthscopedaily.com
              </a>
            </div>

            <div className="bg-blue-700 rounded-2xl p-6 hover:bg-blue-800 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Consultation</h3>
              <p className="text-blue-200 text-sm mb-3">Personalized health guidance</p>
              <a
                href="mailto:experts@healthscopedaily.com"
                className="text-white font-medium hover:underline"
              >
                experts@healthscopedaily.com
              </a>
            </div>

            <div className="bg-blue-700 rounded-2xl p-6 hover:bg-blue-800 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Media & Press</h3>
              <p className="text-blue-200 text-sm mb-3">Press inquiries and partnerships</p>
              <a
                href="mailto:media@healthscopedaily.com"
                className="text-white font-medium hover:underline"
              >
                media@healthscopedaily.com
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Contact Us
            </Link>
            <Link
              href="/newsletter"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Join Our Newsletter
            </Link>
          </div>

          {/* Response Time */}
          <div className="mt-8 bg-blue-700 rounded-xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white font-medium">We typically respond within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutContact
