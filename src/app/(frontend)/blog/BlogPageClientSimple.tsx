'use client'

import { BlogPost } from '@/payload-types'

interface BlogPageClientProps {
  posts: BlogPost[]
}

const BlogPageClient = ({ posts }: BlogPageClientProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Blog Articles</h1>
        <p className="text-gray-600">
          {posts.length} blog post{posts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            {post.excerpt && <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>}
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Read More →
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogPageClient
