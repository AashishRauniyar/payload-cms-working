'use client'

import React from 'react'
import { Media } from '../../components/Media'
import { CMSLink } from '../../components/Link'
import type { TopOurChoose as TopOurChooseType } from '@/payload-types'

// Robust image component with timeout and retry handling
const RobustMedia: React.FC<{ resource: any; className: string }> = ({ resource, className }) => {
  const [imageError, setImageError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  // Timeout handler for slow-loading images
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setImageError(true)
        setIsLoading(false)
      }
    }, 10000) // 10 second timeout

    return () => clearTimeout(timeout)
  }, [isLoading])

  // Handle successful load
  React.useEffect(() => {
    if (resource) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000) // Assume loaded after 2 seconds
      return () => clearTimeout(timer)
    }
  }, [resource])

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs">Image Unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-1"></div>
            <span className="text-xs">Loading...</span>
          </div>
        </div>
      )}
      <Media resource={resource} className={className} />
    </div>
  )
}

interface TopOurChooseBlockProps extends Omit<TopOurChooseType, 'blockType' | 'id' | 'blockName'> {
  disableInnerContainer?: boolean
  className?: string
}

const StarRating: React.FC<{ rating: number; color?: string }> = ({
  rating,
  color = 'text-yellow-500',
}) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={i} className={`w-5 h-5 ${color} fill-current`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>,
    )
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <svg key="half" className={`w-5 h-5 ${color} fill-current`} viewBox="0 0 20 20">
        <defs>
          <linearGradient id="halfFill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfFill)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>,
    )
  }

  // Empty stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>,
    )
  }

  return <div className="flex">{stars}</div>
}

const EvidenceIndicator: React.FC<{ evidence: string }> = ({ evidence }) => {
  const getEvidenceColor = (evidence: string) => {
    switch (evidence.toLowerCase()) {
      case 'gold star evidence':
        return 'bg-yellow-500'
      case 'strong evidence':
        return 'bg-green-500'
      case 'good evidence':
      case 'good site evidence':
        return 'bg-blue-500'
      case 'limited evidence':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${getEvidenceColor(evidence)} mr-2`}></div>
      <span className="text-sm text-gray-600 font-medium">{evidence}</span>
    </div>
  )
}

const getButtonStyles = (style: string) => {
  switch (style) {
    case 'primary':
      return 'bg-orange-500 text-white hover:bg-orange-600'
    case 'secondary':
      return 'bg-blue-500 text-white hover:bg-blue-600'
    case 'success':
      return 'bg-green-500 text-white hover:bg-green-600'
    case 'warning':
      return 'bg-yellow-500 text-white hover:bg-yellow-600'
    case 'outline':
      return 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
    default:
      return 'bg-orange-500 text-white hover:bg-orange-600'
  }
}

export const TopOurChoose: React.FC<TopOurChooseBlockProps> = ({
  title,
  productName,
  productImage,
  overallRating,
  ratings,
  buttons = [],
  backgroundColor,
  disableInnerContainer,
  className,
}) => {
  // Debug logging
  console.log('TopOurChoose - buttons:', buttons)
  console.log('TopOurChoose - buttons length:', buttons?.length)
  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
  }

  const bgClass = backgroundColor ? backgroundClasses[backgroundColor] || '' : ''

  const content = (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg">
        {/* Header */}
        <div className="bg-green-700 text-white px-8 py-4 rounded-t-xl">
          <div className="text-xl font-bold">{productName}</div>
        </div>

        <div className="flex">
          {/* Left Side - Claims/Features */}
          <div className="flex-1 p-8">
            <div className="space-y-5">
              {ratings.slice(0, 4).map((rating) => (
                <div
                  key={rating.category}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-lg text-gray-700 font-semibold">{rating.category}</span>
                  <EvidenceIndicator evidence={rating.evidence} />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex mt-8 space-x-4 flex-wrap gap-y-3">
              {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
                  <CMSLink
                    key={index}
                    type={button.link.type}
                    reference={button.link.reference}
                    url={button.link.url}
                    newTab={button.link.newTab}
                    className={`px-8 py-4 text-base rounded-lg font-semibold transition-colors shadow-md ${getButtonStyles(button.style)}`}
                  >
                    {button.label}
                  </CMSLink>
                ))
              ) : (
                // Fallback default buttons when no buttons are configured
                <>
                  <button className="bg-orange-500 text-white px-8 py-4 text-base rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md">
                    Shop Now
                  </button>
                  <button className="bg-blue-500 text-white px-8 py-4 text-base rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">
                    Read Review
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Center - Product Image */}
          <div className="w-40 flex items-center justify-center p-8">
            {productImage ? (
              <div className="w-32 h-36 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                <RobustMedia resource={productImage} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="bg-orange-100 rounded-xl p-4 w-32 h-36 flex items-center justify-center shadow-md">
                <div className="bg-orange-600 text-white text-base font-bold px-4 py-2 rounded-lg transform -rotate-12">
                  PRODUCT
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Ratings */}
          <div className="w-96 p-8 bg-gray-50 rounded-r-xl">
            <div className="mb-6">
              <div className="text-xl font-bold text-gray-800 mb-4">Rating Breakdown</div>

              <div className="space-y-4">
                {ratings.slice(0, 4).map((rating) => (
                  <div
                    key={`rating-${rating.category}`}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-base text-gray-600 font-medium">{rating.category}</span>
                    <StarRating rating={rating.rating} />
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="border-t border-gray-300 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Overall Rating:</span>
                <div className="flex items-center">
                  <StarRating rating={overallRating} color="text-yellow-500" />
                  <span className="ml-3 text-xl font-bold text-gray-800">
                    {overallRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return <section className={`py-16 px-4 ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`py-16 px-4 ${bgClass} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  )
}
