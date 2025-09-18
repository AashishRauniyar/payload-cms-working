import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { Banner } from '../blocks/Banner/config'
import { BrandHighlightsTableBlock } from '../blocks/BrandHighlightsTable/config'
import { Code } from '../blocks/Code/config'
import { CustomCTABlock } from '../blocks/CustomCTABlock/config'
import { FAQBlock } from '../blocks/FAQBlock/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { ProsConsBlock } from '../blocks/ProsConsBlock/config'
import { RatingTableBlock } from '../blocks/RatingTable/config'
import { ReviewsBlock } from '../blocks/ReviewsBlock/config'
import { TableBlockConfig } from '../blocks/TableBlock/config'
import { ThreeBottlesBlock } from '../blocks/ThreeBottles/config'
import { IngredientsBlock } from '../blocks/IngredientsBlock/config'
import { TopOurChoose } from '../blocks/TopOurChoose/config'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { populateAuthors } from './Posts/hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './Posts/hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug/index'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  trash: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    blogCategories: true,
    excerpt: true,
    featuredImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'blog-posts',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'blog-posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief description of the blog post (used in listing pages)',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Featured image for the blog post',
              },
            },
            {
              name: 'hideFeaturedImageInArticle',
              type: 'checkbox',
              label: 'Hide featured image on article page',
              defaultValue: false,
              admin: {
                description:
                  'If checked, the featured image will be used only on listing cards and not displayed at the top of the article.',
                position: 'sidebar',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    UnorderedListFeature(),
                    OrderedListFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({
                      blocks: [
                        Banner,
                        Code,
                        MediaBlock,
                        ProsConsBlock,
                        ReviewsBlock,
                        ThreeBottlesBlock,
                        BrandHighlightsTableBlock,
                        RatingTableBlock,
                        TableBlockConfig,
                        FAQBlock,
                        CustomCTABlock,
                        TopOurChoose,
                        IngredientsBlock,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'status',
              type: 'select',
              options: [
                {
                  label: 'Draft',
                  value: 'draft',
                },
                {
                  label: 'Published',
                  value: 'published',
                },
              ],
              defaultValue: 'draft',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'relatedBlogPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'blog-posts',
            },
            {
              name: 'blogCategories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'blog-categories',
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
