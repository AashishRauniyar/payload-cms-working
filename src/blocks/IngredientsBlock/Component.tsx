'use client'

import React from 'react'
import { Media } from '../../components/Media'
import type { IngredientsBlock as IngredientsBlockType } from '@/payload-types'

// Enhanced image component exactly matching reference design
import type { Media as MediaType } from '@/payload-types'

const IngredientImage: React.FC<{ resource: MediaType | number | null | undefined }> = ({
  resource,
}) => {
  const [resolved, setResolved] = React.useState<MediaType | null>(
    typeof resource === 'object' && resource !== null ? (resource as MediaType) : null,
  )
  const [isResolving, setIsResolving] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  // Resolve numeric IDs to media documents
  React.useEffect(() => {
    let active = true
    const resolve = async () => {
      try {
        setHasError(false)
        if (typeof resource === 'object' && resource !== null) {
          if (active) {
            setResolved(resource)
            setIsResolving(false)
          }
          return
        }
        if (typeof resource === 'number') {
          if (active) setIsResolving(true)
          const res = await fetch(`/api/media/${resource}`, { cache: 'no-store' })
          if (!res.ok) throw new Error(`Failed to load media ${resource}`)
          const data = await res.json()
          if (active) {
            const doc = data?.doc ?? null
            setResolved(doc)
            setIsResolving(false)
            setHasError(!doc)
          }
          return
        }
        // No resource provided
        if (active) {
          setResolved(null)
          setIsResolving(false)
        }
      } catch (e) {
        console.error('IngredientsBlock: media resolve failed', e)
        if (active) {
          setResolved(null)
          setIsResolving(false)
          setHasError(true)
        }
      }
    }
    resolve()
    return () => {
      active = false
    }
  }, [resource])

  if ((!resolved && !resource) || hasError) {
    return (
      <div
        className="flex items-center justify-center aspect-square w-[140px] lg:w-[160px] max-w-full mx-auto rounded-full bg-white border border-gray-200"
        style={{ boxShadow: 'inset 0 0 0 6px #fff' }}
      >
        <div className="text-center text-gray-400">
          <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs">No Image</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center aspect-square w-[140px] lg:w-[160px] max-w-full mx-auto rounded-full bg-white border border-gray-200 relative"
      style={{ boxShadow: 'inset 0 0 0 6px #fff' }}
    >
      {isResolving && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin w-3 h-3 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-1"></div>
            <span className="text-xs">Loading...</span>
          </div>
        </div>
      )}
      <div
        className="w-[82%] h-[82%] rounded-full overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,.1)' }}
      >
        <Media
          resource={resolved || resource}
          className="w-full h-full object-cover"
          imgClassName="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

interface IngredientsBlockProps
  extends Omit<IngredientsBlockType, 'blockType' | 'id' | 'blockName'> {
  disableInnerContainer?: boolean
  className?: string
}

export const IngredientsBlock: React.FC<IngredientsBlockProps> = ({
  title,
  ingredients = [],
  layout = 'stacked',
  backgroundColor = 'none',
  disableInnerContainer,
  className,
}) => {
  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  const bgClass = backgroundColor ? backgroundClasses[backgroundColor] || '' : ''

  const content = (
    <div className={`container ${layout ? '' : ''}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-slate-900">{title}</h2>
      )}

      <div className="space-y-4">
        {ingredients.map((ingredient, index) => {
          type IngredientItem = IngredientsBlockType['ingredients'][number]
          const item = ingredient as IngredientItem
          const imageId =
            typeof item.image === 'number'
              ? item.image
              : typeof item.image === 'object'
                ? item.image?.id
                : undefined
          const stableKey =
            item.id ?? (imageId != null ? `img-${imageId}` : `name-${item.name}-${index}`)
          return (
            <div
              key={stableKey}
              className="bg-white rounded-[16px] border border-[#eef2f7] p-4 md:p-5"
              style={{ boxShadow: '0 6px 20px rgba(16,24,40,.06)' }}
            >
              {/* Grid layout - more compact */}
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-6 items-center">
                {/* Image Container - smaller */}
                <figure className="order-2 lg:order-1">
                  <IngredientImage resource={item.image} />
                </figure>

                {/* Content - more compact */}
                <div className="flex flex-col gap-3 order-1 lg:order-2">
                  {/* Pill/Title - smaller */}
                  <div
                    className="text-white font-bold text-center px-4 py-2.5 rounded-full text-base md:text-lg"
                    style={{
                      background: '#3f4ed8',
                      lineHeight: '1.2',
                    }}
                  >
                    {item.name}
                  </div>

                  {/* Description - smaller text */}
                  <p className="m-0 text-slate-600 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return <div className={`${bgClass} ${className || ''}`}>{content}</div>
  }

  return <div className={`${bgClass} ${className || ''}`}>{content}</div>
}
