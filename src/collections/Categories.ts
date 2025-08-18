import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Category Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional image for this category. Used on category pages and cards.',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: 'Category Description',
      type: 'richText',
      required: false,
      admin: {
        description: 'Optional short description used on category pages and SEO.',
      },
    },
    ...slugField(),
  ],
}
