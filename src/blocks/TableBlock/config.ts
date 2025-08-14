import type { Block } from 'payload'

export const TableBlockConfig: Block = {
  slug: 'tableBlock',
  interfaceName: 'TableBlock',
  labels: {
    singular: 'Table Block',
    plural: 'Table Blocks',
  },
  fields: [
    {
      name: 'tableTitle',
      label: 'Table Title (Optional)',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional title that appears above the table',
      },
    },
    {
      name: 'tableData',
      label: 'Table Data',
      type: 'textarea',
      required: true,
      admin: {
        rows: 10,
        placeholder:
          'Paste your table data here in markdown table format:\n\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Value 1  | Value 2  | Value 3  |\n| Value 4  | Value 5  | Value 6  |',
        description:
          'Paste your table in markdown format. The component will automatically parse and style it.',
      },
    },
    {
      name: 'tableStyle',
      label: 'Table Style',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Striped Rows',
          value: 'striped',
        },
        {
          label: 'Bordered',
          value: 'bordered',
        },
        {
          label: 'Compact',
          value: 'compact',
        },
        {
          label: 'Modern Card',
          value: 'card',
        },
      ],
    },
    {
      name: 'responsive',
      label: 'Responsive Behavior',
      type: 'select',
      required: true,
      defaultValue: 'scroll',
      options: [
        {
          label: 'Horizontal Scroll',
          value: 'scroll',
        },
        {
          label: 'Stack on Mobile',
          value: 'stack',
        },
        {
          label: 'Hide Columns',
          value: 'hide',
        },
      ],
    },
    {
      name: 'caption',
      label: 'Table Caption (Optional)',
      type: 'text',
      required: false,
      admin: {
        description: 'A caption that appears below the table for additional context.',
      },
    },
  ],
}
