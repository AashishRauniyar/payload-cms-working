export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">Consumer Health Digest</h1>
        <p className="text-xl text-gray-700 mb-8">
          Your premier source for evidence-based health and wellness information and unbiased
          product reviews.
        </p>
        <div className="space-x-4">
          <a
            href="/home"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Enter Site
          </a>
          <a
            href="/admin"
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition inline-block"
          >
            Admin Panel
          </a>
        </div>
        <div className="mt-12 text-gray-600">
          <p>
            ✅ Application Status: <span className="text-green-600 font-semibold">Healthy</span>
          </p>
          <p>
            ✅ Database: <span className="text-green-600 font-semibold">Connected</span>
          </p>
          <p>
            ✅ Migrations: <span className="text-green-600 font-semibold">Complete</span>
          </p>
        </div>
      </div>
    </div>
  )
}
