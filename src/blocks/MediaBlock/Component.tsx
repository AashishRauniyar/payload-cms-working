'use client'

import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  className?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    media,
    caption,
    alignment = 'center',
    size = 'small',
    aspectRatio = 'auto',
    borderRadius = 'none',
    shadow = 'none',
    border = false,
    enableLink = false,
    linkType = 'lightbox',
    externalUrl,
    spacing,
    className,
    staticImage,
  } = props

  const [showLightbox, setShowLightbox] = useState(false)

  // Get alignment classes
  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'full':
        return 'w-full'
      default:
        return 'text-center'
    }
  }

  // Get size classes
  const getSizeClasses = () => {
    if (alignment === 'full') return 'w-full'

    switch (size) {
      case 'small':
        return 'max-w-[300px]'
      case 'medium':
        return 'max-w-[600px]'
      case 'large':
        return 'max-w-[900px]'
      case 'xlarge':
        return 'max-w-[1200px]'
      case 'full':
        return 'w-full'
      default:
        return 'max-w-[600px]'
    }
  }

  // Get aspect ratio classes
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'landscape':
        return 'aspect-video'
      case 'portrait':
        return 'aspect-[4/5]'
      case 'wide':
        return 'aspect-[21/9]'
      default:
        return ''
    }
  }

  // Get border radius classes
  const getBorderRadiusClasses = () => {
    switch (borderRadius) {
      case 'small':
        return 'rounded-sm'
      case 'medium':
        return 'rounded-md'
      case 'large':
        return 'rounded-lg'
      case 'full':
        return 'rounded-full'
      default:
        return ''
    }
  }

  // Get shadow classes
  const getShadowClasses = () => {
    switch (shadow) {
      case 'small':
        return 'shadow-sm'
      case 'medium':
        return 'shadow-md'
      case 'large':
        return 'shadow-lg'
      case 'xlarge':
        return 'shadow-xl'
      default:
        return ''
    }
  }

  // Get spacing classes
  const getSpacingClasses = () => {
    const marginTop = spacing?.marginTop || 'small'
    const marginBottom = spacing?.marginBottom || 'small'

    const topClasses: Record<string, string> = {
      none: 'mt-0',
      small: 'mt-2',
      medium: 'mt-4',
      large: 'mt-6',
      xlarge: 'mt-8',
    }

    const bottomClasses: Record<string, string> = {
      none: 'mb-0',
      small: 'mb-2',
      medium: 'mb-4',
      large: 'mb-6',
      xlarge: 'mb-8',
    }

    return `${topClasses[marginTop] || topClasses.medium} ${bottomClasses[marginBottom] || bottomClasses.medium}`
  }

  // Get container alignment for centering
  const getContainerClasses = () => {
    if (alignment === 'full') return 'w-full'

    switch (alignment) {
      case 'left':
        return 'flex justify-start'
      case 'right':
        return 'flex justify-end'
      default:
        return 'flex justify-center' // Center by default
    }
  }

  // Handle click events
  const handleClick = () => {
    if (!enableLink) return

    if (linkType === 'lightbox') {
      setShowLightbox(true)
    } else if (linkType === 'external' && externalUrl) {
      window.open(externalUrl, '_blank')
    }
  }

  // Get image source
  const getImageSrc = (): string => {
    if (staticImage) return staticImage.src || ''
    if (media && typeof media === 'object' && media.url) return media.url
    return ''
  }

  // Get image alt text
  const getImageAlt = (): string => {
    if (media && typeof media === 'object' && media.alt) return media.alt
    return caption || 'Image'
  }

  if (!media && !staticImage) return null

  const imageSrc = getImageSrc()
  if (!imageSrc) return null

  const imageClasses = cn(
    'max-w-full h-auto',
    getSizeClasses(),
    getAspectRatioClasses(),
    getBorderRadiusClasses(),
    getShadowClasses(),
    {
      'border-2 border-gray-300': border,
      'cursor-pointer hover:opacity-90 transition-opacity': enableLink,
      'object-cover': aspectRatio !== 'auto',
    },
  )

  const containerClasses = cn('w-full', getSpacingClasses(), getContainerClasses(), className)

  return (
    <>
      <div className={containerClasses}>
        <div className={cn('inline-block', getSizeClasses())}>
          {staticImage ? (
            <Image
              src={staticImage}
              alt={getImageAlt()}
              className={imageClasses}
              onClick={handleClick}
              width={1200}
              height={800}
            />
          ) : (
            <img
              src={imageSrc}
              alt={getImageAlt()}
              className={imageClasses}
              onClick={handleClick}
            />
          )}

          {caption && (
            <div className={cn('mt-3 text-sm text-gray-600', getAlignmentClasses())}>{caption}</div>
          )}
        </div>
      </div>

      {/* Simple Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={imageSrc}
              alt={getImageAlt()}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
