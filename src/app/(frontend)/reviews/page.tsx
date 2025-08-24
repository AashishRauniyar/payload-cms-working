import Link from 'next/link'

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Reviews</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            In-depth reviews of health products, supplements, and wellness solutions
          </p>
        </div>

        <div className="text-center py-20">
          <div className="text-6xl text-gray-300 mb-4">⭐</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Reviews Coming Soon</h2>
          <p className="text-gray-500 mb-8">
            We&apos;re working on detailed product reviews for you.
          </p>
          <Link
            href="/posts"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Read Our Articles
          </Link>
        </div>
      </div>
    </div>
  )
}
