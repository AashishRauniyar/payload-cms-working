import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media, User, Post } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const user = await payload.findByID({ collection: 'users', id })
  return { title: `${user.name || 'Author'} - Profile` }
}

async function getAuthor(id: string) {
  const payload = await getPayload({ config: configPromise })
  try {
    const user = await payload.findByID({ collection: 'users', id })
    return user as User
  } catch {
    return null
  }
}

async function getPostsByAuthor(id: string) {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      authors: { contains: id },
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
    depth: 1,
  })
  return posts.docs as Post[]
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params
  const author = await getAuthor(id)
  if (!author) return <div className="container py-20">Author not found.</div>
  const posts = await getPostsByAuthor(id)

  const avatar = author.avatar as Media | null

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg mb-8 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20">
            {avatar?.url ? (
              <Image
                src={avatar.url}
                alt={avatar.alt || author.name || 'Author'}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{author.name}</h1>
            {author.title && (
              <div className="mt-1 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                {author.title}
              </div>
            )}
          </div>
        </div>

        {author.bio && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-700 whitespace-pre-line">{author.bio}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Articles by {author.name?.split(' ')[0]}</h2>
          {posts.length ? (
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <Link href={`/posts/${p.slug}`} className="text-primary-600 hover:underline">
                    {p.title}
                  </Link>
                  {p.publishedAt && (
                    <time className="text-sm text-gray-500">
                      {new Date(p.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No articles yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
