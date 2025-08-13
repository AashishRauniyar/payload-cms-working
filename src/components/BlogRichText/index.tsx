import React from 'react'
import { cn } from '@/utilities/ui'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { BrandHighlightsTable } from '@/blocks/BrandHighlightsTable/Component'
import { ProsConsBlock } from '@/blocks/ProsConsBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  BrandHighlightsTableBlock as BrandHighlightsTableBlockProps,
  ProsConsBlock as ProsConsBlockProps,
} from '@/payload-types'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | BrandHighlightsTableBlockProps
      | ProsConsBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const blogJsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => (
      <div className="my-8">
        <BannerBlock {...node.fields} />
      </div>
    ),
    mediaBlock: ({ node }) => (
      <div className="my-8">
        <MediaBlock
          imgClassName="m-0"
          {...node.fields}
          enableGutter={false}
          disableInnerContainer={true}
        />
      </div>
    ),
    code: ({ node }) => (
      <div className="my-8">
        <CodeBlock {...node.fields} />
      </div>
    ),
    cta: ({ node }) => (
      <div className="my-8">
        <CallToActionBlock {...node.fields} />
      </div>
    ),
    prosConsBlock: ({ node }) => (
      <div className="my-8">
        <ProsConsBlock
          disableInnerContainer={true}
          title={node.fields.title || undefined}
          prosTitle={node.fields.prosTitle || 'Pros'}
          consTitle={node.fields.consTitle || 'Cons'}
          pros={node.fields.pros || []}
          cons={node.fields.cons || []}
          bulkProsText={node.fields.bulkProsText || undefined}
          bulkConsText={node.fields.bulkConsText || undefined}
          style={node.fields.style || 'default'}
          backgroundColor={node.fields.backgroundColor || 'none'}
        />
      </div>
    ),
    brandHighlightsTable: ({ node }) => (
      <div className="my-8">
        <BrandHighlightsTable
          disableInnerContainer={true}
          title={node.fields.title || undefined}
          overallRating={node.fields.overallRating || undefined}
          productImage={
            node.fields.productImage && typeof node.fields.productImage === 'object'
              ? {
                  url: node.fields.productImage.url || '',
                  alt: node.fields.productImage.alt || '',
                }
              : undefined
          }
          productName={node.fields.productName || undefined}
          buyNowText={node.fields.buyNowText || undefined}
          buyNowLink={node.fields.buyNowLink || undefined}
          ratings={node.fields.ratings || []}
          highlights={node.fields.highlights || []}
          backgroundColor={node.fields.backgroundColor || 'gradient'}
        />
      </div>
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function BlogRichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={blogJsxConverters}
      className={cn(
        'blog-richtext', // Using blog-specific class instead of payload-richtext
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
