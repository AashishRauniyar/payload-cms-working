import { MediaBlock } from '@/blocks/MediaBlock/Component'
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

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  BrandHighlightsTableBlock as BrandHighlightsTableBlockProps,
  ProsConsBlock as ProsConsBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

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

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    prosConsBlock: ({ node }) => (
      <ProsConsBlock
        className="col-start-1 col-span-3"
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
    ),
    brandHighlightsTable: ({ node }) => (
      <BrandHighlightsTable
        className="col-start-1 col-span-3"
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
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
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
