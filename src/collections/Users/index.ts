import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'experience', 'title'],
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
    {
      name: 'experience',
      type: 'number',
      admin: {
        description: 'Years of experience',
        placeholder: 'Enter number of years',
      },
      validate: (value: number | null | undefined) => {
        if (value !== undefined && value !== null && value < 0) {
          return 'Experience cannot be negative'
        }
        return true
      },
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      admin: {
        description: 'Add your social media profiles to display on your author page',
      },
      fields: [
        {
          name: 'linkedin',
          type: 'group',
          label: 'LinkedIn',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://linkedin.com/in/yourprofile',
                description: 'Your LinkedIn profile URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'LinkedIn logo (optional - will use default if not provided)',
              },
            },
          ],
        },
        {
          name: 'twitter',
          type: 'group',
          label: 'Twitter/X',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://twitter.com/yourusername',
                description: 'Your Twitter/X profile URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Twitter/X logo (optional - will use default if not provided)',
              },
            },
          ],
        },
        {
          name: 'facebook',
          type: 'group',
          label: 'Facebook',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://facebook.com/yourprofile',
                description: 'Your Facebook profile URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Facebook logo (optional - will use default if not provided)',
              },
            },
          ],
        },
        {
          name: 'instagram',
          type: 'group',
          label: 'Instagram',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://instagram.com/yourusername',
                description: 'Your Instagram profile URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Instagram logo (optional - will use default if not provided)',
              },
            },
          ],
        },
        {
          name: 'youtube',
          type: 'group',
          label: 'YouTube',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://youtube.com/c/yourchannel',
                description: 'Your YouTube channel URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'YouTube logo (optional - will use default if not provided)',
              },
            },
          ],
        },
        {
          name: 'website',
          type: 'group',
          label: 'Personal Website',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                placeholder: 'https://yourwebsite.com',
                description: 'Your personal or professional website URL',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Website favicon or logo (optional)',
              },
            },
          ],
        },
        {
          name: 'other',
          type: 'array',
          label: 'Other Social Media',
          admin: {
            description: 'Add other social media platforms not listed above',
          },
          fields: [
            {
              name: 'platform',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Platform name (e.g., TikTok, Pinterest, etc.)',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'https://platform.com/yourprofile',
              },
              validate: (value: string | null | undefined) => {
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Platform logo or icon',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
