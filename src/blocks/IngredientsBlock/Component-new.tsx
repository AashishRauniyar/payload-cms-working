'use client'

import React from 'react'
import { Media } from '../../components/Media'
import type { IngredientsBlock as IngredientsBlockType } from '@/payload-types'

// Enhanced image component exactly matching reference design
const IngredientImage: React.FC<{ resource: any }> = ({ resource }) => {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  React.useEffect(() => {
    if (resource) {
      setImageError(false)
      setImageLoaded(false)
    }
  }, [resource])

  if (!resource || imageError) {
    return (
      <div
        className="flex items-center justify-center aspect-square w-[220px] lg:w-[260px] max-w-full mx-auto rounded-full bg-white border border-gray-200"
        style={{ boxShadow: 'inset 0 0 0 8px #fff' }}
      >
        <div className="text-center text-gray-400">
          <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center aspect-square w-[220px] lg:w-[260px] max-w-full mx-auto rounded-full bg-white border border-gray-200 relative"
      style={{ boxShadow: 'inset 0 0 0 8px #fff' }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full z-10">
          <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
      )}
      <div
        className="w-[82%] h-[82%] rounded-full overflow-hidden"
        style={{ boxShadow: '0 2px 18px rgba(0,0,0,.12)' }}
      >
        <Media
          resource={resource}
          className="w-full h-full object-cover"
          imgClassName="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
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
    none: 'bg-[#f5f7fb]',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  const bgClass = backgroundColor
    ? backgroundClasses[backgroundColor] || 'bg-[#f5f7fb]'
    : 'bg-[#f5f7fb]'

  const content = (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="w-full max-w-[1100px]">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {title}
          </h2>
        )}

        <div className="space-y-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id || index}
              className="bg-white rounded-[18px] border border-[#eef2f7] p-7"
              style={{ boxShadow: '0 10px 25px rgba(16,24,40,.08)' }}
            >
              {/* Grid layout matching reference - desktop: 300px + 1fr, mobile: stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-9 items-center">
                {/* Image Container - exactly matching reference */}
                <figure className="order-2 lg:order-1">
                  <IngredientImage resource={ingredient.image} />
                </figure>

                {/* Content - exactly matching reference */}
                <div className="flex flex-col gap-[18px] order-1 lg:order-2">
                  {/* Pill/Title - exactly matching reference */}
                  <div
                    className="text-white font-bold text-center px-5 py-4 rounded-full text-lg md:text-xl lg:text-2xl"
                    style={{
                      background: '#3f4ed8',
                      lineHeight: '1.2',
                    }}
                  >
                    {ingredient.name}
                  </div>

                  {/* Description - exactly matching reference */}
                  <p className="m-0 text-slate-600 leading-relaxed text-sm md:text-base lg:text-lg">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return <section className={`${bgClass} ${className || ''}`}>{content}</section>
  }

  return <section className={`${bgClass} ${className || ''}`}>{content}</section>
}
