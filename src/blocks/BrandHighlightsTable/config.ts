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
      name: 'ingredientsRating',
      type: 'number',
      label: 'Ingredients Rating',
      defaultValue: 4.5,
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Rating for ingredients quality out of 5',
      },
    },
    {
      name: 'valueForCostRating',
      type: 'number',
      label: 'Value for Cost Rating',
      defaultValue: 4.5,
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Rating for value proposition out of 5',
      },
    },
    {
      name: 'manufacturerRating',
      type: 'number',
      label: 'Manufacturer Rating',
      defaultValue: 4.5,
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Rating for manufacturer trustworthiness out of 5',
      },
    },
    {
      name: 'safetyRating',
      type: 'number',
      label: 'Safety Rating',
      defaultValue: 4.5,
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Rating for product safety out of 5',
      },
    },
    {
      name: 'highlights',
      type: 'textarea',
      label: 'Brand Highlights',
      required: false,
      admin: {
        description:
          'Enter multiple highlights, one per line. Each line will become a bullet point.',
        placeholder:
          'Powered by plant-based ingredients supported by clinical studies\nThird-party tested and validated\n100% performing nutrients. No pointless ingredients\nEmphasizes ultramodern, ethical manufacturing practices\nCommitted to sustainable and transparent sourcing',
        rows: 8,
      },
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
