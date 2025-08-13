import type { Block } from 'payload'

export const BrandHighlightsTableBlock: Block = {
  slug: 'brandHighlightsTable',
  interfaceName: 'BrandHighlightsTableBlock',
  labels: {
    singular: 'Brand Highlights Table',
    plural: 'Brand Highlights Tables',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Block Title',
      defaultValue: 'How Does [Product] Rate?',
      admin: {
        description:
          'Main title for the brand highlights table. Use [Product] as placeholder for product name.',
      },
    },
    {
      name: 'overallRating',
      type: 'number',
      label: 'Overall Rating',
      defaultValue: 4.5,
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Overall product rating out of 5',
      },
    },
    {
      name: 'productImage',
      type: 'upload',
      label: 'Product Image',
      relationTo: 'media',
      admin: {
        description: 'Upload a PNG/JPG image of the product',
      },
    },
    {
      name: 'productName',
      type: 'text',
      label: 'Product Name',
      defaultValue: 'Our Product',
      admin: {
        description: 'Name of the product being reviewed',
      },
    },
    {
      name: 'buyNowText',
      type: 'text',
      label: 'Buy Now Button Text',
      defaultValue: 'SHOP NOW',
      admin: {
        description: 'Text displayed on the buy now button',
      },
    },
    {
      name: 'buyNowLink',
      type: 'text',
      label: 'Buy Now Link',
      defaultValue: '#',
      admin: {
        description: 'URL where users will be redirected when clicking the buy now button',
        placeholder: 'https://example.com/product',
      },
    },
    {
      name: 'ratings',
      type: 'array',
      label: 'Rating Categories',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Individual rating categories with scores',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Rating Label',
          required: true,
          admin: {
            placeholder: 'e.g., Ingredients Quality',
          },
        },
        {
          name: 'score',
          type: 'number',
          label: 'Rating Score',
          required: true,
          min: 1,
          max: 5,
          admin: {
            step: 0.1,
            description: 'Rating score out of 5',
          },
        },
        {
          name: 'iconType',
          type: 'select',
          label: 'Icon Type',
          required: true,
          options: [
            { label: 'Star (Quality/Performance)', value: 'star' },
            { label: 'Dollar Sign (Value/Cost)', value: 'dollar' },
            { label: 'Clipboard (Policy/Service)', value: 'clipboard' },
            { label: 'Shield (Safety/Security)', value: 'shield' },
          ],
          defaultValue: 'star',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Brand Highlights',
      minRows: 1,
      admin: {
        description: 'Key highlights or features of the brand/product',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Highlight Text',
          required: true,
          admin: {
            placeholder: 'e.g., Powered by plant-based ingredients supported by clinical studies',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Style',
      options: [
        { label: 'None (Transparent)', value: 'none' },
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
        { label: 'Light Blue', value: 'blue' },
        { label: 'Gradient (Blue to Purple)', value: 'gradient' },
      ],
      defaultValue: 'gradient',
    },
  ],
}
