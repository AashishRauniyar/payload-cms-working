import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Author profile image',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short author biography',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Professional title (e.g., "Medical Doctor", "Registered Dietitian")',
      },
    },
  ],
  timestamps: true,
}
