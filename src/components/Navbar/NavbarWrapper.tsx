import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from './Navbar'
import type { Category } from '@/payload-types'

export async function NavbarWrapper() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Check if categories collection exists
    const collections = payload.config.collections
    const hasCategories = collections.some((collection) => collection.slug === 'categories')

    if (!hasCategories) {
      return <Navbar categories={[]} />
    }

    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
      pagination: false,
    })

    // Ensure categories.docs is an array
    const categoryDocs = categories?.docs || []

    return <Navbar categories={categoryDocs as Category[]} />
  } catch (error) {
    // Silently handle error and return fallback
    return <Navbar categories={[]} />
  }
}
