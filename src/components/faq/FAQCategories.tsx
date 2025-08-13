'use client'

import React, { useState } from 'react'

const FAQCategories = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index],
    )
  }

  const categories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics about HealthScopeDaily and how to navigate our platform',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      count: 12,
      faqs: [
        {
          question: 'What is HealthScopeDaily?',
          answer:
            'HealthScopeDaily is a comprehensive health and wellness platform that provides expert reviews, evidence-based information, and recommendations for supplements, health products, and wellness solutions.',
        },
        {
          question: 'How do I navigate the website?',
          answer:
            'Our website is organized into categories like supplements, wellness products, and health guides. Use the main navigation menu or search bar to find specific information.',
        },
        {
          question: 'Is the content free to access?',
          answer:
            'Yes, most of our content including product reviews, health guides, and expert recommendations are completely free to access.',
        },
      ],
    },
    {
      title: 'Product Reviews',
      description: 'Questions about our review process and product evaluations',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      count: 18,
      faqs: [
        {
          question: 'How do you review products?',
          answer:
            'Our review process involves scientific research analysis, expert evaluation, ingredient assessment, third-party testing verification, and real user feedback compilation.',
        },
        {
          question: 'Are your reviews unbiased?',
          answer:
            'Yes, we maintain strict editorial independence. Our reviews are based purely on scientific evidence, product quality, and user experience, not influenced by brand partnerships.',
        },
        {
          question: 'How often are reviews updated?',
          answer:
            'We regularly update our reviews as new research emerges or product formulations change, typically reviewing products every 6-12 months.',
        },
      ],
    },
    {
      title: 'Health & Supplements',
      description: 'Questions about health guidance and supplement information',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      count: 24,
      faqs: [
        {
          question: 'Should I consult a doctor before taking supplements?',
          answer:
            'Yes, we always recommend consulting with a healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.',
        },
        {
          question: 'How do I choose the right supplement?',
          answer:
            'Consider your specific health goals, dietary restrictions, existing medications, and consult our detailed reviews and guides. When in doubt, consult a healthcare provider.',
        },
        {
          question: 'Are natural supplements always safe?',
          answer:
            "Not necessarily. 'Natural' doesn't always mean safe. Even natural supplements can interact with medications or cause side effects. Always research and consult professionals.",
        },
      ],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <p className="text-xl text-gray-600">Find answers organized by topic areas</p>
        </div>

        {/* Category Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div
                  className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mb-6`}
                >
                  <div className={category.color}>{category.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`${category.bgColor} ${category.color} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {category.count} articles
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {categories.flatMap((category, categoryIndex) =>
              category.faqs.map((faq, faqIndex) => {
                const itemIndex = categoryIndex * 10 + faqIndex
                const isOpen = openItems.includes(itemIndex)

                return (
                  <div
                    key={itemIndex}
                    className="bg-white rounded-xl shadow-md border border-gray-100"
                  >
                    <button
                      onClick={() => toggleItem(itemIndex)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-8 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you find the answers you need.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQCategories
