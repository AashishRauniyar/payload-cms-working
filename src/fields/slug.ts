import type { Field } from 'payload'

export const slugField = (): Field => ({
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ value, originalDoc, data }) => {
        if (data?.title && !value) {
          return data.title
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase()
        }
        return value
      },
    ],
  },
})
