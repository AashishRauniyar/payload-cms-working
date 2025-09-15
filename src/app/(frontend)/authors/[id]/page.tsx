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
    <div className="min-h-screen bg-white">
      {/* Clean Header Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-xl">
                {avatar?.url ? (
                  <Image
                    src={avatar.url}
                    alt={avatar.alt || author.name || 'Author'}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400">
                    👤
                  </div>
                )}
              </div>
              {/* Verification Badge - Positioned at top-right of avatar */}
              <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">{author.name}</h1>
              {author.title && (
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-medium mb-6">
                  {author.title}
                </div>
              )}

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
                {author.experience && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{author.experience}+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Health</div>
                  <div className="text-sm text-gray-600">Specialty</div>
                </div>
              </div>

              {/* Social Media Links with Platform Names */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {author.socialMedia?.linkedin?.url && (
                  <a
                    href={author.socialMedia.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {author.socialMedia?.twitter?.url && (
                  <a
                    href={author.socialMedia.twitter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                )}
                {author.socialMedia?.facebook?.url && (
                  <a
                    href={author.socialMedia.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Facebook
                  </a>
                )}
                {author.socialMedia?.instagram?.url && (
                  <a
                    href={author.socialMedia.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Instagram
                  </a>
                )}
                {author.socialMedia?.youtube?.url && (
                  <a
                    href={author.socialMedia.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.854 11.854 0 001 10.049 11.854 11.854 0 002.166 15.1c.205.358.478.649.804.82.33.174.684.26 1.042.26h11.976c.358 0 .712-.086 1.042-.26.326-.171.599-.462.804-.82a11.853 11.853 0 001.166-5.051 11.854 11.854 0 00-1.166-5.05 2.007 2.007 0 00-.804-.821A2.007 2.007 0 0015.988 4H4.012c-.358 0-.712.086-1.042.26a2.007 2.007 0 00-.804.82zm6.58 3.856l-.007-.004A1 1 0 007.618 8v4a1 1 0 001.533.846l.007-.004 4-2.5a1 1 0 000-1.692l-4-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    YouTube
                  </a>
                )}
                {author.socialMedia?.website?.url && (
                  <a
                    href={author.socialMedia.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Website
                  </a>
                )}
                {/* Other Social Media Links */}
                {author.socialMedia?.other &&
                  author.socialMedia.other.length > 0 &&
                  author.socialMedia.other.map(
                    (social, index) =>
                      social.url && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {social.platform || 'Link'}
                        </a>
                      ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Bio Section */}
        {author.bio && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">About</h2>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
              <p className="text-gray-700 leading-relaxed text-lg font-light">{author.bio}</p>
            </div>

            {/* Credentials & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group hover:scale-105 transition-transform duration-200">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-green-800 text-lg">Board Certified</h3>
                  </div>
                  <p className="text-green-700">Licensed medical professional</p>
                </div>
              </div>

              <div className="group hover:scale-105 transition-transform duration-200">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-blue-800 text-lg">Evidence-Based</h3>
                  </div>
                  <p className="text-blue-700">Research-backed expertise</p>
                </div>
              </div>

              <div className="group hover:scale-105 transition-transform duration-200">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-purple-800 text-lg">Patient Care</h3>
                  </div>
                  <p className="text-purple-700">Dedicated to wellness</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex items-center mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Articles by {author.name?.split(' ')[0]}
              </h2>
              <p className="text-gray-600 mt-1 text-lg">Expert insights and medical knowledge</p>
            </div>
          </div>

          {posts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const heroImage = post.heroImage as Media | null
                return (
                  <Link key={post.id} href={`/posts/${post.slug}`} className="group">
                    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1">
                      {/* Article Image */}
                      {heroImage?.url && (
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={heroImage.url}
                            alt={heroImage.alt || post.title || 'Article'}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.slice(0, 2).map((category, index) => {
                              if (typeof category === 'object' && category !== null) {
                                return (
                                  <span
                                    key={index}
                                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                                  >
                                    {category.title}
                                  </span>
                                )
                              }
                              return null
                            })}
                          </div>
                        )}

                        {/* Date and Read Time */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                          {post.publishedAt && (
                            <time dateTime={post.publishedAt} className="font-medium">
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </time>
                          )}
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            5 min read
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No articles yet</h3>
              <p className="text-gray-600 text-lg">
                Check back soon for expert insights from {author.name?.split(' ')[0]}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
