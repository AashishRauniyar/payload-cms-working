import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media, User } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 600

async function getAuthors() {
  const payload = await getPayload({ config: configPromise })
  const users = await payload.find({ collection: 'users', limit: 100, pagination: false })
  return users.docs as User[]
}

export default async function AuthorsPage() {
  const authors = await getAuthors()
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Authors</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the experts behind our reviews and health guidance.
          </p>
        </div>

        {/* Banner-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((a) => {
            const avatar = a.avatar as Media | null
            return (
              <Link
                key={a.id}
                href={`/authors/${a.id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="flex items-center gap-4 p-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {avatar?.url ? (
                      <Image
                        src={avatar.url}
                        alt={avatar.alt || a.name || 'Author'}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">👤</div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                      {a.name || 'Unnamed Author'}
                    </div>
                    {a.title && <div className="text-sm text-gray-600">{a.title}</div>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
