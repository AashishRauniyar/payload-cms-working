import type { Block } from 'payload'

export const ThreeBottlesBlock: Block = {
  slug: 'threeBottlesBlock',
  interfaceName: 'ThreeBottlesBlock',
  labels: {
    singular: 'Three Bottles',
    plural: 'Three Bottles',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'h1', type: 'text', label: 'Heading Line 1', defaultValue: "2025'S TOP MALE" },
        { name: 'h2', type: 'text', label: 'Heading Line 2', defaultValue: 'ENHANCEMENT' },
        { name: 'h3', type: 'text', label: 'Heading Line 3', defaultValue: 'SUPPLEMENTS' },
      ],
    },
    {
      name: 'bg',
      type: 'select',
      label: 'Background',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
      ],
      defaultValue: 'white',
    },
    {
      name: 'products',
      type: 'array',
      label: 'Products (3)',
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Configure exactly 3 products to compare',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'Product Name',
            },
            {
              name: 'rating',
              type: 'number',
              required: true,
              admin: {
                step: 0.1,
                description: '0–5, supports halves',
              },
              defaultValue: 4.5,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description:
                  'Optional image for the bottle. If omitted, a colored placeholder bottle will be shown.',
              },
            },
            {
              name: 'color',
              type: 'select',
              label: 'Placeholder Color',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Red', value: 'red' },
                { label: 'Gray', value: 'gray' },
              ],
              defaultValue: 'blue',
            },
          ],
        },
        {
          name: 'ing',
          type: 'text',
          label: 'Main Ingredients',
          defaultValue: 'L-Arginine, Zinc, Fenugreek, Tongkat Ali, Epimedium',
        },
        {
          name: 'benefits',
          type: 'text',
          label: 'Key Benefits',
          defaultValue: 'Supports overall vitality, stamina, and wellness',
        },
        {
          name: 'csat',
          type: 'text',
          label: 'Customer Satisfaction',
          defaultValue: 'High, with many repeat customers',
        },
      ],
    },
  ],
}
