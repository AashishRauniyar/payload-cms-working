import React from 'react'
import Link from 'next/link'

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-gray-500 font-medium">Contact Us</span>
            </li>
          </ol>
        </nav>

        <div className="text-center">
          <div className="mb-8">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Send Us Your <span className="text-blue-600">Feedback</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              At HealthScopeDaily, we value your feedback and opportunities from you. Whether you
              have questions about our reviews, need personalized health guidance, or want to
              collaborate with us, we&apos;re here to help.
            </p>
            <div className="text-sm text-gray-500 mb-8">
              <span className="font-medium">Last Updated:</span>{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          {/* Key Questions */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Have Questions?</h3>
                <p className="text-gray-600 text-sm">
                  Do you feel something is incorrect in one of our articles?
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm">
                  Have you run into difficulty navigating our site?
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Help us improve our content and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-amber-800 mb-1">Medical Disclaimer</h3>
                  <p className="text-sm text-amber-700">
                    We help better serve our readers and the accuracy of the content, and we hope to
                    create a smooth user experience for our readers. Your feedback is valuable and
                    will help us improve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
