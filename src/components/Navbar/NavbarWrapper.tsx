import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from './Navbar'
import type { Category } from '@/payload-types'

export async function NavbarWrapper() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
  })

  return <Navbar categories={categories.docs as Category[]} />
}
