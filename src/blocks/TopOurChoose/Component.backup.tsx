'use client'

import React from 'react'
import { Media } from '../../components/Media'
import { CMSLink } from '../../components/Link'
import type { TopOurChoose as TopOurChooseType } from '@/payload-types'

// Robust image component with timeout and retry handling
const RobustMedia: React.FC<{ resource: any; className: string }> = ({ resource, className }) => {
  const [imageError, setImageError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setImageError(true)
        setIsLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timeout)
  }, [isLoading])

  React.useEffect(() => {
    if (resource) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [resource])

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
        <div className="text-center text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium">Image Unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-indigo-600 rounded-full mx-auto mb-1"></div>
            <span className="text-xs font-medium">Loading...</span>
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

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({
  rating,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`${sizeClasses[size]} text-yellow-400 fill-current drop-shadow-sm`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>,
    )
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        className={`${sizeClasses[size]} text-yellow-400 fill-current drop-shadow-sm`}
        viewBox="0 0 20 20"
      >
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
      <svg key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>,
    )
  }

  return <div className="flex gap-1">{stars}</div>
}

const EvidenceIndicator: React.FC<{ evidence: string }> = ({ evidence }) => {
  const getEvidenceStyle = (evidence: string) => {
    switch (evidence.toLowerCase()) {
      case 'gold star evidence':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
          text: 'text-yellow-800',
          bgLight: 'bg-yellow-50',
          border: 'border-yellow-200',
        }
      case 'strong evidence':
        return {
          bg: 'bg-gradient-to-r from-green-400 to-green-500',
          text: 'text-green-800',
          bgLight: 'bg-green-50',
          border: 'border-green-200',
        }
      case 'good evidence':
      case 'good site evidence':
        return {
          bg: 'bg-gradient-to-r from-blue-400 to-blue-500',
          text: 'text-blue-800',
          bgLight: 'bg-blue-50',
          border: 'border-blue-200',
        }
      case 'limited evidence':
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          text: 'text-gray-800',
          bgLight: 'bg-gray-50',
          border: 'border-gray-200',
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          text: 'text-gray-800',
          bgLight: 'bg-gray-50',
          border: 'border-gray-200',
        }
    }
  }

  const style = getEvidenceStyle(evidence)

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${style.bgLight} ${style.border} border`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${style.bg} mr-2 shadow-sm`}></div>
      <span className={`text-xs font-semibold ${style.text}`}>{evidence}</span>
    </div>
  )
}

const getButtonStyles = (style: string) => {
  const baseStyles =
    'relative overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95'

  switch (style) {
    case 'primary':
      return `${baseStyles} bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-200`
    case 'secondary':
      return `${baseStyles} bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-200`
    case 'success':
      return `${baseStyles} bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green-200`
    case 'warning':
      return `${baseStyles} bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-yellow-200`
    case 'outline':
      return `${baseStyles} bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-gray-200`
    default:
      return `${baseStyles} bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-200`
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
  const backgroundClasses = {
    none: '',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    orange: 'bg-gradient-to-br from-orange-50 to-orange-100',
  }

  const bgClass = backgroundColor ? backgroundClasses[backgroundColor] || '' : ''

  const content = (
    <div className="max-w-6xl mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 backdrop-blur-sm border-gray-300 border-1">
        {/* Hero Header with Gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 px-8 py-6 ">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-1">{productName}</div>
                {title && <div className="text-indigo-100 text-sm font-medium">{title}</div>}
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
                <div className="flex items-center space-x-2">
                  <StarRating rating={overallRating} size="sm" />
                  <span className="text-white font-bold text-lg">{overallRating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-0">
          {/* Left Side - Product Claims */}
          <div className="lg:col-span-2 p-8">
            <div className="space-y-6">
              {/* Claims List */}
              {ratings && ratings.length > 0 && (
                <div className="space-y-4">
                  {ratings.map((rating, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <StarRating rating={rating.rating} size="sm" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                              {rating.title}
                            </div>
                            {rating.description && (
                              <div className="text-sm text-gray-600 mt-1">{rating.description}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <EvidenceIndicator evidence={rating.evidence || 'Limited Evidence'} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {buttons && buttons.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                  {buttons.map((button, index) => (
                    <CMSLink
                      key={index}
                      {...button.link}
                      className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-lg ${getButtonStyles(button.style || 'primary')} ${button.size === 'large' ? 'px-8 py-4 text-base' : ''}`}
                    >
                      <span className="relative z-10">{button.label}</span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                    </CMSLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Image & Rating Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col justify-between min-h-[400px]">
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center">
              {productImage && (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-200 transform group-hover:scale-105 transition-transform duration-300">
                    <RobustMedia resource={productImage} className="w-32 h-40 object-contain" />
                  </div>
                </div>
              )}
            </div>

            {/* Overall Rating Display */}
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600 mb-2">OVERALL RATING</div>
              <div className="flex items-center justify-center mb-2">
                <StarRating rating={overallRating} size="lg" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {overallRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500 mt-1">out of 5 stars</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return <section className={`py-20 px-4 ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`py-20 px-4 ${bgClass} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  )
}
