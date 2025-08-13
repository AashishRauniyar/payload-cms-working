import React from 'react'
import type { Metadata } from 'next'
import { FAQHero, FAQSearch, FAQCategories } from '@/components/faq'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Health & Wellness Support | HealthScopeDaily',
  description:
    'Find answers to common questions about health supplements, product reviews, and wellness guidance. Get expert support for your health journey with HealthScopeDaily.',
  openGraph: {
    title: 'Frequently Asked Questions - Health & Wellness Support',
    description: 'Find answers to common questions about health supplements and wellness guidance.',
    type: 'website',
  },
}

const FAQPage = () => {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <FAQHero />

      {/* Search Section */}
      <FAQSearch />

      {/* Categories Section */}
      <FAQCategories />
    </div>
  )
}

export default FAQPage
