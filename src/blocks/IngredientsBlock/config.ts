import type { Block } from 'payload'

export const IngredientsBlock: Block = {
  slug: 'ingredientsBlock',
  interfaceName: 'IngredientsBlock',
  labels: {
    singular: 'Ingredients Block',
    plural: 'Ingredients Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Block Title (Optional)',
      admin: {
        description: 'Optional title for the ingredients section',
      },
    },
    {
      name: 'ingredients',
      type: 'array',
      label: 'Ingredients',
      minRows: 1,
      maxRows: 10,
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Ingredient Name',
          required: true,
          admin: {
            placeholder: 'e.g., Green Tea Extract',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Ingredient Image',
          required: true,
          admin: {
            description: 'Circular image showing the ingredient',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          admin: {
            rows: 4,
            description: 'Brief description of the ingredient and its benefits',
            placeholder: 'Describe the ingredient and its health benefits...',
          },
        },
      ],
      defaultValue: [
        {
          name: 'Green Tea Extract',
          description:
            "SlimPulse's effectiveness stems from its carefully selected blend of natural ingredients, each chosen for their proven weight loss benefits and synergistic effects. The SlimPulse weight loss Supplement contains seven primary active compounds that work together to maximize fat burning and metabolic enhancement. Each ingredient has been extensively studied in clinical trials and has demonstrated significant weight loss benefits when used in the dosages",
        },
        {
          name: 'Garcinia Cambogia',
          description:
            'This tropical fruit extract contains hydroxycitric acid (HCA), which has been shown to suppress appetite and inhibit fat production. Research indicates that Garcinia Cambogia can reduce food intake by up to 25% and block the enzyme responsible for converting carbohydrates into fat. The ingredient also helps regulate serotonin levels, which can improve mood and reduce emotional eating behaviors.',
        },
        {
          name: 'Caffeine Anhydrous',
          description:
            'This concentrated form of caffeine provides sustained energy and enhanced focus while boosting metabolic rate. Studies demonstrate that caffeine can increase thermogenesis by 8-15% and improve exercise performance, making workouts more effective for weight loss. The anhydrous form ensures rapid absorption and prolonged effects without the jitters often associated with regular caffeine consumption.',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      options: [
        { label: 'Stacked Cards', value: 'stacked' },
        { label: 'Grid Layout (2 columns)', value: 'grid-2' },
        { label: 'Grid Layout (3 columns)', value: 'grid-3' },
      ],
      defaultValue: 'stacked',
      admin: {
        description: 'Choose how to display the ingredient cards',
      },
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
