'use client'

import React, { useState } from 'react'

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How do you review health products and supplements?',
      answer:
        'Our team of health experts conducts thorough research on each product, analyzing ingredients, clinical studies, user reviews, and safety profiles. We follow strict editorial guidelines and only recommend products that meet our high standards for quality and effectiveness.',
    },
    {
      question: 'Are your health recommendations personalized?',
      answer:
        'While our articles provide general health information and product reviews, they are not personalized medical advice. We always recommend consulting with healthcare professionals before making significant changes to your health routine or starting new supplements.',
    },
    {
      question: 'How often is your content updated?',
      answer:
        'We update our content regularly to ensure accuracy and relevance. Product reviews are updated when new research emerges or products change their formulations. Health articles are reviewed quarterly and updated as needed based on the latest scientific findings.',
    },
    {
      question: 'Do you have affiliate relationships with the products you review?',
      answer:
        'Yes, we may earn commissions from some product purchases made through our links. However, this does not influence our editorial decisions. We maintain strict independence in our reviews and only recommend products we genuinely believe can benefit our readers.',
    },
    {
      question: 'Can I request a review of a specific product?',
      answer:
        "Absolutely! We welcome product review requests from our readers. You can contact us through the form above or send us an email with your suggestion. While we can't review every product, we consider all requests based on reader interest and product merit.",
    },
    {
      question: 'How can I stay updated with your latest reviews and articles?',
      answer:
        'You can subscribe to our newsletter below to receive weekly updates with our latest reviews, health tips, and exclusive content. You can also follow us on social media for daily health insights and product updates.',
    },
    {
      question: 'Do you provide medical advice or consultations?',
      answer:
        'No, we do not provide medical advice or consultations. Our content is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for personalized medical guidance.',
    },
    {
      question: 'How can I report an error or concern about your content?',
      answer:
        'We appreciate feedback about our content accuracy. If you notice an error or have concerns, please contact us immediately through our contact form or email. We take content accuracy seriously and will investigate and correct any issues promptly.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our health reviews, content process, and how we
            can help you make informed wellness decisions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 lg:px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
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
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 lg:px-8 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? We're here to help you get the answers you need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Us a Message
              </a>
              <a
                href="mailto:contact@healthscopedaily.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFAQ
