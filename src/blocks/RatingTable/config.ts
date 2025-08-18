import type { Block } from 'payload'

export const RatingTableBlock: Block = {
  slug: 'ratingTable',
  interfaceName: 'RatingTableBlock',
  labels: {
    singular: 'Product Rating Table',
    plural: 'Product Rating Tables',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'PRODUCT - A BETTER ALTERNATIVE?',
      admin: {
        description: 'The main title displayed above the rating table',
      },
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Product Image',
      required: true,
      admin: {
        description: 'Upload the product image to display',
      },
    },
    {
      name: 'overallRating',
      type: 'number',
      label: 'Overall Star Rating',
      required: true,
      defaultValue: 4.5,
      min: 0,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Overall star rating out of 5 stars',
      },
    },
    {
      name: 'ratingMetrics',
      type: 'array',
      label: 'Rating Metrics',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Add rating metrics with percentage values',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'metricName',
          type: 'text',
          label: 'Metric Name',
          required: true,
          admin: {
            placeholder: 'e.g., Speed of Results',
          },
        },
        {
          name: 'percentage',
          type: 'number',
          label: 'Percentage',
          required: true,
          min: 0,
          max: 100,
          admin: {
            step: 1,
            description: 'Percentage value (0-100)',
          },
        },
        {
          name: 'color',
          type: 'select',
          label: 'Progress Bar Color',
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Red', value: 'red' },
            { label: 'Purple', value: 'purple' },
            { label: 'Teal', value: 'teal' },
          ],
          defaultValue: 'teal',
          admin: {
            description: 'Color theme for the progress bar',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Product Description',
      required: false,
      admin: {
        description: 'Detailed description about the product and its benefits',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'None', value: 'none' },
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
        { label: 'Light Blue', value: 'blue' },
        { label: 'Gradient', value: 'gradient' },
      ],
      defaultValue: 'white',
      admin: {
        description: 'Choose background color for the component',
      },
    },
  ],
}
