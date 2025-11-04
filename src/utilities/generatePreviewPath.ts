import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  'blog-posts': '/blog',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // If no slug yet (draft post), use the preview route
  if (!slug) {
    const prefix = collectionPrefixMap[collection] || ''
    const encodedParams = new URLSearchParams({
      slug: '',
      collection,
      path: `${prefix}/preview`,
      previewSecret: process.env.PREVIEW_SECRET || '',
    })

    const url = `/next/preview?${encodedParams.toString()}`
    return url
  }

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
