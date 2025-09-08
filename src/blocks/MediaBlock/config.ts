import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image/Media',
      admin: {
        description: 'Upload an image or select from media library',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption for the image',
      },
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: 'center',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Full Width',
          value: 'full',
        },
      ],
      admin: {
        description: 'How to align the image on the page',
      },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Image Size',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (300px)',
          value: 'small',
        },
        {
          label: 'Medium (600px)',
          value: 'medium',
        },
        {
          label: 'Large (900px)',
          value: 'large',
        },
        {
          label: 'Extra Large (1200px)',
          value: 'xlarge',
        },
        {
          label: 'Full Width',
          value: 'full',
        },
      ],
      admin: {
        description: 'Maximum width of the image',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto (Original)',
          value: 'auto',
        },
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Landscape (16:9)',
          value: 'landscape',
        },
        {
          label: 'Portrait (4:5)',
          value: 'portrait',
        },
        {
          label: 'Wide (21:9)',
          value: 'wide',
        },
      ],
      admin: {
        description: 'Force a specific aspect ratio (crops image if needed)',
      },
    },
    {
      name: 'borderRadius',
      type: 'select',
      label: 'Border Radius',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Full (Circle)',
          value: 'full',
        },
      ],
      admin: {
        description: 'Add rounded corners to the image',
      },
    },
    {
      name: 'shadow',
      type: 'select',
      label: 'Shadow',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Extra Large',
          value: 'xlarge',
        },
      ],
      admin: {
        description: 'Add a drop shadow to the image',
      },
    },
    {
      name: 'border',
      type: 'checkbox',
      label: 'Add Border',
      defaultValue: false,
      admin: {
        description: 'Add a border around the image',
      },
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Make Image Clickable',
      defaultValue: false,
      admin: {
        description: 'Allow the image to be clicked to open in full size or navigate',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      label: 'Link Type',
      defaultValue: 'lightbox',
      options: [
        {
          label: 'Open in Lightbox',
          value: 'lightbox',
        },
        {
          label: 'External URL',
          value: 'external',
        },
        {
          label: 'Internal Page',
          value: 'internal',
        },
      ],
      admin: {
        condition: (data) => data.enableLink === true,
        description: 'What happens when the image is clicked',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'External URL',
      admin: {
        condition: (data) => data.enableLink === true && data.linkType === 'external',
        description: 'URL to navigate to when image is clicked',
      },
    },
    {
      name: 'spacing',
      type: 'group',
      label: 'Spacing Options',
      fields: [
        {
          name: 'marginTop',
          type: 'select',
          label: 'Margin Top',
          defaultValue: 'small',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xlarge' },
          ],
        },
        {
          name: 'marginBottom',
          type: 'select',
          label: 'Margin Bottom',
          defaultValue: 'small',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xlarge' },
          ],
        },
      ],
      admin: {
        description: 'Control spacing around the image',
      },
    },
  ],
}
