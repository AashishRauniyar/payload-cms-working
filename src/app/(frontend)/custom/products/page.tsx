import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { BrandHighlightsTable } from '@/blocks/BrandHighlightsTable/Component'

// Custom products page using Payload as data source
export default async function ProductsPage() {
  const payload = await getPayload({ config: configPromise })

  // You could create a custom 'products' collection in Payload
  // For now, we'll use pages collection as example
  // const products = await payload.find({
  //   collection: 'pages',
  //   limit: 10,
  //   where: {
  //     // You could filter by a custom field like 'pageType'
  //   },
  // })

  // Mock product data - in real app, this would come from Payload
  const mockProducts = [
    {
      id: 1,
      title: 'How Does Premium Supplement Rate?',
      overallRating: 4.8,
      productName: 'Premium Health Supplement',
      buyNowText: 'ORDER NOW',
      buyNowLink: 'https://example.com/premium',
      ingredientsRating: 4.9,
      valueForCostRating: 4.7,
      manufacturerRating: 4.8,
      safetyRating: 5.0,
      highlights:
        'Clinically proven formula with 30+ essential nutrients\nMade in FDA-approved facilities\n90-day money-back guarantee\nSustainable sourcing and eco-friendly packaging\nTrusted by over 100,000+ customers worldwide',
    },
    {
      id: 2,
      title: 'How Does Fitness Pro Rate?',
      overallRating: 4.6,
      productName: 'Fitness Pro Workout System',
      buyNowText: 'GET STARTED',
      buyNowLink: 'https://example.com/fitness-pro',
      ingredientsRating: 4.8,
      valueForCostRating: 4.4,
      manufacturerRating: 4.7,
      safetyRating: 4.5,
      highlights:
        'Over 200+ professional workout routines\nPersonalized meal plans and nutrition guidance\n24/7 expert support and community access\nProgress tracking and achievement system\nCompatible with all fitness levels',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
                <Link
                  href="/custom"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Products
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of high-quality products designed to meet your needs.
            </p>
          </div>

          <div className="space-y-16">
            {mockProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {/* Product Section */}
                <BrandHighlightsTable
                  blockType="brandHighlightsTable"
                  title={product.title}
                  overallRating={product.overallRating}
                  productName={product.productName}
                  buyNowText={product.buyNowText}
                  buyNowLink={product.buyNowLink}
                  ingredientsRating={product.ingredientsRating}
                  valueForCostRating={product.valueForCostRating}
                  manufacturerRating={product.manufacturerRating}
                  safetyRating={product.safetyRating}
                  highlights={product.highlights}
                  backgroundColor="white"
                />

                {/* Separator */}
                {index < mockProducts.length - 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers and transform your life today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  View All Products
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">Stay Connected</h4>
            <p className="text-gray-400 mb-6">
              Get the latest updates on our products and exclusive offers.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
