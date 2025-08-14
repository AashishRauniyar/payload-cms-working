import type { Block } from 'payload'

export const ProsConsBlock: Block = {
  slug: 'prosConsBlock',
  interfaceName: 'ProsConsBlock',
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
      name: 'tableData',
      type: 'textarea',
      label: 'Pros & Cons Table',
      required: true,
      admin: {
        rows: 10,
        description: 'Paste your pros/cons table directly here in markdown format.',
        placeholder:
          '| **Pros** | **Cons** |\n| --- | --- |\n| Leak-proof and pest-proof design | Compact base ideal for smaller gardens |\n| Attractive, UV-resistant build | Limited color options |\n| Easy, zero-drip cleaning | Capacity promotes regular fresh nectar refills |\n| Wide perch attracts multiple birds | Cleaning instructions encourage proper maintenance |\n| Durable for all-weather use | Buying direct ensures authentic product and support |',
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
