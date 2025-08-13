import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { BrandHighlightsTable } from '@/blocks/BrandHighlightsTable/Component'

// This is a completely custom page independent of Payload's styling
export default async function CustomPage() {
  // You can still fetch data from Payload CMS as admin panel
  const payload = await getPayload({ config: configPromise })

  // Example: Fetch some posts to display
  const posts = await payload.find({
    collection: 'posts',
    limit: 5,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Custom Header - Independent styling */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">My Custom Website</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </a>
              <a
                href="/custom/products"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Products
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Custom Design */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Amazing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Products{' '}
            </span>
            with Ease
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Showcase your products with beautiful, interactive components that convert visitors into
            customers.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Product Showcase using our custom component */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Product</h3>
            <p className="text-lg text-gray-600">
              See how our Brand Highlights component works in a custom page
            </p>
          </div>

          {/* Using our custom component without any blog styling interference */}
          <BrandHighlightsTable
            title="How Does Mind Lab Pro Rate?"
            overallRating={4.7}
            productName="Mind Lab Pro"
            buyNowText="SHOP NOW"
            buyNowLink="https://example.com"
            ratings={[
              { label: 'Ingredients Quality', score: 4.8, iconType: 'star' },
              { label: 'Value for Cost', score: 4.6, iconType: 'dollar' },
              { label: 'Return Policy', score: 5.0, iconType: 'clipboard' },
              { label: 'Safety', score: 4.7, iconType: 'shield' },
            ]}
            highlights={[
              {
                text: 'Powered by plant-based ingredients supported by scientific clinical studies',
              },
              { text: 'Third-party tested and validated' },
              { text: '100% performing nutrients. No pointless ingredients' },
              { text: 'Emphasizes ultramodern, ethical manufacturing practices' },
              { text: 'Committed to sustainable and transparent sourcing' },
            ]}
            backgroundColor="gradient"
          />

          {/* Call to Action for Products Page */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Discover More Products</h4>
              <p className="text-lg mb-6 opacity-90">
                Explore our full range of premium products with detailed ratings and reviews.
              </p>
              <a
                href="/custom/products"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts from Payload CMS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest from Blog</h3>
            <p className="text-lg text-gray-600">Content managed through Payload CMS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.docs.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-gray-600 mb-4">
                    {new Date(post.publishedAt || '').toLocaleDateString()}
                  </p>
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">My Custom Website</h5>
              <p className="text-gray-400">
                Built with Next.js and Payload CMS for the perfect balance of custom design and
                content management.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/posts" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/custom" className="hover:text-white transition-colors">
                    Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact</h5>
              <p className="text-gray-400">
                Get in touch to learn more about our products and services.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 My Custom Website. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
