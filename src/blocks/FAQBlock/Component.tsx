'use client'

import React, { useState } from 'react'

export interface FAQBlockProps {
  title?: string
  faqContent?: string
  disableInnerContainer?: boolean
  className?: string
}

// Simple function to parse markdown-like FAQ content
const parseFAQContent = (content: string) => {
  if (!content) return []

  // Split by **text** pattern to find questions
  const parts = content.split(/(\*\*[^*]+\*\*)/)
  const faqs = []

  for (let i = 0; i < parts.length - 1; i += 2) {
    const questionMatch = parts[i + 1]?.match(/\*\*(.+)\*\*/)
    const question = questionMatch ? questionMatch[1] : null
    const answer = parts[i + 2]?.trim()

    if (question && answer) {
      faqs.push({
        question: question.trim(),
        answer: answer.trim(),
      })
    }
  }

  return faqs.filter((item) => item.question && item.answer)
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  title,
  faqContent = '',
  disableInnerContainer = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const faqs = parseFAQContent(faqContent)

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  if (!faqs.length) return null

  return (
    <div className={`faq-block ${className}`}>
      <div className={disableInnerContainer ? '' : 'container mx-auto px-4'}>
        <div className="max-w-6xl mx-auto">
          {title && (
            <div className="text-center mb-8">
              <div className="text-3xl font-bold text-gray-900 mb-2">{title}</div>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
          )}

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openItems.has(index)
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                        {faq.question}
                      </div>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5">
                      <div className="pt-3 border-t border-gray-100">
                        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
