import type { Block } from 'payload'

export const CustomCTABlock: Block = {
  slug: 'customCTABlock',
  labels: {
    singular: 'Custom CTA Block',
    plural: 'Custom CTA Blocks',
  },
  interfaceName: 'CustomCTABlock',
  fields: [
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Text',
      defaultValue: 'Ready to Transform Your Health?',
      admin: {
        description: 'Main headline text for the CTA section',
      },
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Get Your Supplement Now',
      admin: {
        description: 'Text that appears on the CTA button',
      },
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      defaultValue: '#',
      admin: {
        description: 'URL where the button should link to (use full URL like https://example.com)',
      },
      required: true,
    },
  ],
}
