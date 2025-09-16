'use client'

import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'
import type { TopOurChoose as TopOurChooseType } from '@/payload-types'

interface TopOurChooseBlockProps extends Omit<TopOurChooseType, 'blockType' | 'id' | 'blockName'> {
  disableInnerContainer?: boolean
  className?: string
}

const StarRating: React.FC<{ rating: number; color?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  rating,
  color = 'text-blue-500',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const starSize = sizeClasses[size]
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className={`${starSize} ${color} fill-current`} />)
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className={`${starSize} ${color} fill-current`} />)
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />)
  }

  return <div className="flex">{stars}</div>
}

interface EvidenceIndicatorProps {
  evidence: string
}

export const EvidenceIndicator: React.FC<EvidenceIndicatorProps> = ({ evidence }) => {
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
  overallRating = 4.8,
  ratings = [],
  buttons = [],
  backgroundColor,
  disableInnerContainer,
  className,
}) => {
  // Default ratings data to match the image
  const defaultRatings = [
    { title: 'Boosts Memory and Learning Abilities*', rating: 5, evidence: 'Strong Evidence' },
    { title: 'Enhances Focus and Mental Clarity*', rating: 4.5, evidence: 'Strong Evidence' },
    { title: 'Supports Brain Health and Function*', rating: 5, evidence: 'Gold Star Evidence' },
    { title: 'Reduces Mental Fatigue and Stress*', rating: 4.5, evidence: 'Strong Evidence' },
  ]

  const ratingsData = ratings.length > 0 ? ratings : defaultRatings

  const content = (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm max-w-5xl mx-auto">
      {/* Header - Green Bar */}
      <div className="bg-green-700 text-white px-6 py-3 rounded-t-lg">
        <div className="text-base font-semibold">
          {productName ||
            title ||
            'Neuro Plus Brain and Focus Formula | Cognitive Performance Enhancer'}
        </div>
      </div>

      <div className="flex">
        {/* Left Side - Benefits List */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {ratingsData.map((rating, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                    {rating.evidence?.toLowerCase().includes('gold star') ? (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    ) : rating.evidence?.toLowerCase().includes('strong') ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{rating.title}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {rating.evidence || 'Strong Evidence'}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex mt-6 space-x-3">
            {buttons && buttons.length > 0 ? (
              buttons.map((button) => (
                <CMSLink
                  key={button.label || 'button'}
                  type={button.link.type}
                  reference={button.link.reference}
                  url={button.link.url}
                  newTab={button.link.newTab}
                  className={`px-6 py-2 text-sm rounded font-semibold transition-colors ${
                    button.style === 'primary' || button.label?.toLowerCase().includes('shop')
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {button.label}
                </CMSLink>
              ))
            ) : (
              <>
                <button className="bg-orange-500 text-white px-6 py-2 text-sm rounded font-semibold hover:bg-orange-600 transition-colors">
                  Shop Now
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 text-sm rounded font-semibold hover:bg-blue-600 transition-colors">
                  Read Review
                </button>
              </>
            )}
          </div>
        </div>

        {/* Center - Product Image */}
        <div className="w-40 flex items-center justify-center p-6">
          {productImage ? (
            <div className="w-32 h-40">
              <Media resource={productImage} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-24 h-32 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-600 mb-1">WOW MD</div>
                  <div className="text-xs text-blue-600 font-semibold">NEURO PLUS</div>
                  <div className="text-xs text-gray-500 mt-1">BRAIN & FOCUS FORMULA</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Rating Breakdown */}
        <div className="w-80 p-6 bg-gray-50 rounded-r-lg border-l border-gray-200">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Rating Breakdown</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Support for Claims:</span>
                <StarRating rating={5} color="text-blue-500" size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Ingredient Safety:</span>
                <StarRating rating={4.5} color="text-blue-500" size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Value for the Price:</span>
                <StarRating rating={5} color="text-blue-500" size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Brand Transparency:</span>
                <StarRating rating={4.5} color="text-blue-500" size="sm" />
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-800">Overall Rating:</span>
              <div className="flex items-center">
                <StarRating rating={overallRating} color="text-yellow-500" size="sm" />
                <span className="ml-2 text-lg font-bold text-gray-800">
                  {overallRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
  }

  const bgClass = backgroundColor ? backgroundClasses[backgroundColor] || '' : ''

  if (disableInnerContainer) {
    return <section className={`py-8 px-4 ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`py-8 px-4 ${bgClass} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  )
}
