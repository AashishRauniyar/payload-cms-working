import type { Block } from 'payload'

export const ProsConsBlock: Block = {
  slug: 'prosConsBlock',
  labels: {
    singular: 'Pros & Cons Block',
    plural: 'Pros & Cons Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Block Title (Optional)',
      admin: {
        description: 'Optional title for the pros and cons section',
      },
    },
    {
      name: 'prosTitle',
      type: 'text',
      label: 'Pros Section Title',
      defaultValue: 'Pros',
    },
    {
      name: 'consTitle',
      type: 'text',
      label: 'Cons Section Title',
      defaultValue: 'Cons',
    },
    {
      name: 'pros',
      type: 'array',
      label: 'Pros',
      minRows: 1,
      admin: {
        description: 'Enter each pro point on a new line or copy/paste multiple lines',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          label: 'Pro Point',
          admin: {
            placeholder: 'Enter a positive point...',
          },
        },
      ],
    },
    {
      name: 'cons',
      type: 'array',
      label: 'Cons',
      minRows: 1,
      admin: {
        description: 'Enter each con point on a new line or copy/paste multiple lines',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          label: 'Con Point',
          admin: {
            placeholder: 'Enter a negative point...',
          },
        },
      ],
    },
    {
      name: 'bulkProsText',
      type: 'textarea',
      label: 'Bulk Pros Input (Optional)',
      admin: {
        description:
          'Paste multiple pros here, one per line. This will override the Pros array above.',
        placeholder: 'Pro 1\nPro 2\nPro 3\n...',
      },
    },
    {
      name: 'bulkConsText',
      type: 'textarea',
      label: 'Bulk Cons Input (Optional)',
      admin: {
        description:
          'Paste multiple cons here, one per line. This will override the Cons array above.',
        placeholder: 'Con 1\nCon 2\nCon 3\n...',
      },
    },
    {
      name: 'style',
      type: 'select',
      label: 'Visual Style',
      options: [
        { label: 'Default (Side by Side)', value: 'default' },
        { label: 'Table Format', value: 'table' },
        { label: 'Stacked', value: 'stacked' },
        { label: 'Card Style', value: 'cards' },
      ],
      defaultValue: 'table',
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
      ],
      defaultValue: 'none',
    },
  ],
}
