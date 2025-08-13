import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import LandingPageWrapper from './wrapper'
import type { Post } from '@/payload-types'

// This needs to be a client component wrapper that receives server data
import LandingPageComponent from './page'

async function getFeaturedPosts() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 3,
    sort: '-publishedAt',
    depth: 2,
  })

  return posts.docs as Post[]
}

export default async function LandingPageServer() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div className="landing-page-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      <LandingPageComponent featuredPosts={featuredPosts} />
    </div>
  )
}
