import type { Block } from 'payload'

export const ReviewsBlock: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  labels: {
    singular: 'Customer Reviews Block',
    plural: 'Customer Reviews Blocks',
  },
  fields: [
    {
      name: 'blockHeader',
      type: 'group',
      label: 'Block Header',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Block Title',
          defaultValue: 'Customer Reviews',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: {
            placeholder: 'What our customers are saying...',
          },
        },
      ],
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Customer Reviews',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Customer Name',
          required: true,
          admin: {
            placeholder: 'John Doe',
          },
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          defaultValue: 'male',
        },
        {
          name: 'age',
          type: 'number',
          label: 'Age',
          min: 18,
          max: 80,
          defaultValue: 34,
        },
        {
          name: 'profileImage',
          type: 'upload',
          label: 'Profile Image',
          relationTo: 'media',
          admin: {
            description: 'Upload a profile image for this reviewer (optional)',
          },
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Star Rating (1-5)',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 4,
          admin: {
            step: 1,
            description: 'Whole numbers only (1, 2, 3, 4, or 5 stars)',
          },
        },
        {
          name: 'reviewText',
          type: 'textarea',
          label: 'Review Text',
          required: true,
          admin: {
            rows: 4,
            placeholder: 'Share your experience with this product...',
          },
        },
      ],
    },
    {
      name: 'displayOptions',
      type: 'group',
      label: 'Display & Style Options',
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: 'Layout Style',
          options: [
            { label: 'Stacked Cards', value: 'stacked' },
            { label: 'Grid Layout', value: 'grid' },
          ],
          defaultValue: 'stacked',
        },
        {
          name: 'alternateBackground',
          type: 'checkbox',
          label: 'Alternate Background Colors',
          defaultValue: true,
          admin: {
            description: 'Alternate between light cream and white backgrounds',
          },
        },
        {
          name: 'showDashedBorders',
          type: 'checkbox',
          label: 'Show Dashed Borders',
          defaultValue: true,
          admin: {
            description: 'Add dashed borders between review cards',
          },
        },
      ],
    },
  ],
}
