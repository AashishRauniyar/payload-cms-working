import type { Block } from 'payload'

export const TopOurChoose: Block = {
  slug: 'topOurChoose',
  interfaceName: 'TopOurChoose',
  labels: {
    singular: 'Top Our Choose Block',
    plural: 'Top Our Choose Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Block Title (Optional)',
      admin: {
        description: 'Optional title for the rating section',
      },
    },
    {
      name: 'productName',
      type: 'text',
      label: 'Product Name',
      required: true,
      defaultValue: 'Primal RX Gummies',
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Product Image',
      required: true,
      admin: {
        description: 'Main product image to display in the center',
      },
    },
    {
      name: 'overallRating',
      type: 'number',
      label: 'Overall Rating',
      required: true,
      min: 0,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Overall rating score (0-5)',
      },
      defaultValue: 4.3,
    },
    {
      name: 'ratings',
      type: 'array',
      label: 'Rating Categories',
      minRows: 2,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'category',
          type: 'text',
          label: 'Rating Category',
          required: true,
          admin: {
            placeholder: 'e.g., Support for Claims',
          },
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating Score',
          required: true,
          min: 0,
          max: 5,
          admin: {
            step: 0.1,
            description: 'Rating score (0-5)',
          },
        },
        {
          name: 'evidence',
          type: 'select',
          label: 'Evidence Level',
          required: true,
          options: [
            { label: 'Gold Star Evidence', value: 'Gold Star Evidence' },
            { label: 'Strong Evidence', value: 'Strong Evidence' },
            { label: 'Good Evidence', value: 'Good Evidence' },
            { label: 'Limited Evidence', value: 'Limited Evidence' },
          ],
          defaultValue: 'Strong Evidence',
        },
      ],
      defaultValue: [
        {
          category: 'Support for Claims',
          rating: 4,
          evidence: 'Good Site Evidence',
        },
        {
          category: 'Ingredient Safety',
          rating: 5,
          evidence: 'Strong Evidence',
        },
        {
          category: 'Value for the Price',
          rating: 4.5,
          evidence: 'Good Site Evidence',
        },
        {
          category: 'Projected Efficacy',
          rating: 4,
          evidence: 'Strong Evidence',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light Gray', value: 'gray' },
        { label: 'Light Blue', value: 'blue' },
        { label: 'Light Green', value: 'green' },
        { label: 'Light Orange', value: 'orange' },
      ],
      defaultValue: 'none',
    },
  ],
}
