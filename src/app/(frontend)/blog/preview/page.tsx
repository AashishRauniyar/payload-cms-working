import React from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function BlogPreviewPage() {
  const { isEnabled: draft } = await draftMode()

  if (!draft) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Preview Not Available</h1>
          <p className="text-gray-600">
            This page is only accessible in preview mode.
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className="pb-16">
      <LivePreviewListener />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-blue-900">Live Preview Mode</h1>
            <p className="text-blue-700 mb-4">
              Your blog post is being previewed in real-time.
            </p>
            <p className="text-blue-600 text-sm">
              Save your blog post with a title to generate a slug and see the full preview with proper URL.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
