import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Script from 'next/script'
import { getServerSideURL } from '@/utilities/getURL'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import LandingPageServer from '../landing/server'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    const params = pages.docs
      ?.filter((doc) => {
        return doc.slug !== 'home'
      })
      .map(({ slug }) => {
        return { slug }
      })

    return params || []
  } catch (error) {
    if (error instanceof Error) {
      console.warn(
        'Database not available during build, skipping static generation:',
        error.message,
      )
    } else {
      console.warn('Database not available during build, skipping static generation:', error)
    }
    // Return empty array to allow build to continue
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  // If this is the home page, serve our custom landing page
  if (slug === 'home') {
    return <LandingPageServer />
  }

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const canonical = slug === 'home' ? siteUrl + '/' : siteUrl + url

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.meta?.description || undefined,
    url: canonical,
    datePublished: page.createdAt,
    dateModified: page.updatedAt,
  }

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <Script id="ld-webpage" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webPageLd)}
      </Script>

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise

  // If this is the home page, return custom metadata
  if (slug === 'home') {
    return {
      title: 'Consumer Health Digest - Trusted Reviews, Honest Ratings and Quality Advice',
      description:
        'Your premier source for evidence-based health and wellness information and unbiased product reviews. Get trusted advice from medical experts.',
      keywords:
        'health reviews, wellness, product reviews, supplements, medical advice, health information',
      openGraph: {
        title: 'Consumer Health Digest - Trusted Health Reviews',
        description:
          'Evidence-based health information and unbiased product reviews from medical experts.',
        type: 'website',
      },
    }
  }

  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
