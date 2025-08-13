import { BrandsHero, FeaturedBrands, BrandSlider } from '@/components/brands'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Health & Wellness Brands - Expert Reviews & Rankings | HealthScopeDaily',
  description:
    'Discover the top health and wellness brands with expert reviews, detailed analysis, and comprehensive rankings. From supplements to skincare, find trusted brands backed by science.',
  openGraph: {
    title: 'Top Health & Wellness Brands - Expert Reviews & Rankings',
    description: 'Discover the top health and wellness brands with expert reviews and rankings.',
    type: 'website',
  },
}

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BrandsHero />
      <BrandSlider />
      <FeaturedBrands />

      {/* Additional Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Trust Our Brand Reviews?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Our expert team rigorously evaluates each brand based on quality, transparency,
              scientific backing, and customer satisfaction.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Analysis</h3>
                <p className="text-gray-600">
                  We evaluate ingredients, research backing, and clinical evidence for every brand
                  we review.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Review</h3>
                <p className="text-gray-600">
                  Our team of health professionals and researchers provide unbiased, expert
                  evaluations.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real Results</h3>
                <p className="text-gray-600">
                  We track real user experiences and outcomes to provide authentic brand
                  assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
