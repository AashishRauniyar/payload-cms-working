'use client'

import { useEffect } from 'react'

export const useHeadingIds = () => {
  useEffect(() => {
    // Add IDs to all headings in the blog content
    const blogContent = document.querySelector('.blog-content')
    if (!blogContent) return

    const headings = blogContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading) => {
      const text = heading.textContent?.trim()
      if (text && !heading.id) {
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
        heading.id = id
      }
    })
  }, [])
}

export default function BlogContentEnhancer() {
  useHeadingIds()
  return null
}
