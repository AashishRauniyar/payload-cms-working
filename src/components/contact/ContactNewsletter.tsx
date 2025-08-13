'use client'

import React, { useState } from 'react'

const ContactNewsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setEmail('')
    setIsSubmitting(false)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 5000)
  }

  const trustBadges = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: '100% Secure',
      subtext: 'Your data is protected',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      text: 'No Spam',
      subtext: 'Only valuable content',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Easy Unsubscribe',
      subtext: 'Cancel anytime',
    },
  ]

  const benefits = [
    'Weekly health tips and wellness advice',
    'Exclusive product reviews and recommendations',
    'Early access to new articles and guides',
    'Special discounts from trusted health brands',
    'Expert insights on the latest health trends',
    'Personalized supplement recommendations',
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
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
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Stay Updated
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-blue-600">Newsletter</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Get the latest health insights, product reviews, and wellness tips delivered straight
              to your inbox. Join 50,000+ health-conscious readers.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get:</h3>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
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
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {trustBadges.map((badge, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-blue-600 mb-2 flex justify-center">{badge.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm">{badge.text}</p>
                  <p className="text-xs text-gray-600">{badge.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            {!isSubscribed ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe Now</h3>
                  <p className="text-gray-600">Join thousands of health-conscious readers today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        <span>Subscribe Free</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Family! 🎉</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for subscribing! Check your email for a welcome message and your first
                  dose of health insights.
                </p>
                <div className="text-sm text-gray-500">
                  Expect your first newsletter within the next few hours.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <p className="text-gray-600">Newsletter Subscribers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
            <p className="text-gray-600">Reader Satisfaction</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
            <p className="text-gray-600">Products Reviewed</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactNewsletter
