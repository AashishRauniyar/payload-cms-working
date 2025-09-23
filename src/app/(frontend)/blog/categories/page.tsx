import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Blog Categories | Health & Wellness Insights',
  description:
    'Explore all blog categories. Find research-backed articles and expert guides by topic.',
}

export default async function BlogCategoriesIndex() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'blog-categories',
    depth: 0,
    limit: 100,
    where: {},
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Browse
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Blog Categories</h1>
            <p className="mt-3 text-gray-600">
              Choose a category to explore the latest articles and research-backed insights.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.docs.map((cat) => (
              <Link
                key={String((cat as any).id ?? (cat as any).slug)}
                href={`/blog/category/${cat.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                      {cat.name as string}
                    </h2>
                    {cat['description'] && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {String(cat['description'])}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


