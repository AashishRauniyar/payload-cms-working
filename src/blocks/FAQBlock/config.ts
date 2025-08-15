import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional title for the FAQ section',
      },
    },
    {
      name: 'faqContent',
      type: 'textarea',
      label: 'FAQ Content (Markdown Format)',
      admin: {
        description:
          'Paste your FAQ content in markdown format. Use **Question?** for questions and regular text for answers.',
        placeholder:
          '**1. How easy is it to clean the Birdyl Hummingbird Feeder?**\n\nThe Birdyl Hummingbird Feeder features a wide twist-off base that makes cleaning quick and straightforward.\n\n**2. Is the Birdyl Hummingbird Feeder bee and ant proof?**\n\nYes, the Birdyl Hummingbird Feeder comes equipped with an ant moat and bee guard.',
      },
      required: true,
    },
  ],
}
