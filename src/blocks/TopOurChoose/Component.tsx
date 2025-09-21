'use client'

import React, { useState } from 'react'
import { Star, StarHalf, ChevronDown, ChevronUp, ShoppingCart, FileText } from 'lucide-react'
import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'
import type { TopOurChoose as TopOurChooseType } from '@/payload-types'

interface TopOurChooseBlockProps extends Omit<TopOurChooseType, 'blockType' | 'id' | 'blockName'> {
  disableInnerContainer?: boolean
  className?: string
}

const StarRating: React.FC<{
  rating: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  criterionIndex?: number
  hoveredCriterion?: number | null
}> = ({
  rating,
  color = 'text-blue-500',
  size = 'md',
  interactive = false,
  criterionIndex = null,
  hoveredCriterion = null,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const starSize = sizeClasses[size]
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const isHovered = interactive && hoveredCriterion === criterionIndex

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${starSize} transition-all duration-300 cursor-pointer
            ${
              isHovered
                ? 'fill-blue-600 text-blue-600 transform scale-110 drop-shadow-lg'
                : `${color} fill-current hover:fill-blue-600 hover:text-blue-600`
            }`}
        />,
      )
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className={`${starSize} relative`}>
          <Star className={`${starSize} text-gray-300 absolute transition-all duration-300`} />
          <StarHalf
            className={`${starSize} transition-all duration-300 absolute cursor-pointer
              ${
                isHovered
                  ? 'fill-blue-600 text-blue-600 transform scale-110 drop-shadow-lg'
                  : `${color} fill-current hover:fill-blue-600 hover:text-blue-600`
              }`}
          />
        </div>,
      )
    } else {
      stars.push(
        <Star
          key={i}
          className={`${starSize} text-gray-300 transition-all duration-300 cursor-pointer
            ${isHovered ? 'text-gray-400 transform scale-110' : 'hover:text-gray-400'}`}
        />,
      )
    }
  }

  return <div className="flex space-x-1">{stars}</div>
}

const getEvidenceIcon = (evidence: string, isHovered = false) => {
  const baseClasses =
    'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform'

  switch (evidence?.toLowerCase()) {
    case 'gold star evidence':
      return (
        <div
          className={`${baseClasses} ${isHovered ? 'bg-yellow-500 scale-110 shadow-lg' : 'bg-yellow-400'}`}
        >
          <Star
            className={`w-3 h-3 fill-white text-white transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
          />
        </div>
      )
    case 'limited evidence':
      return (
        <div
          className={`${baseClasses} ${isHovered ? 'bg-gray-500 scale-110 shadow-lg' : 'bg-gray-400'}`}
        ></div>
      )
    case 'strong evidence':
      return (
        <div
          className={`${baseClasses} ${isHovered ? 'bg-green-600 scale-110 shadow-lg' : 'bg-green-500'}`}
        ></div>
      )
    default:
      return <div className={`${baseClasses} bg-gray-300`}></div>
  }
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredCriterion, setHoveredCriterion] = useState<number | null>(null)

  // Default ratings data to match the image - only used if no CMS data provided
  const defaultRatings = [
    {
      title: 'Support for Claims',
      category: 'Support for Claims',
      rating: 4,
      evidence: 'Gold Star Evidence' as const,
      description: 'Strong clinical backing with peer-reviewed studies',
      id: 'default-1',
    },
    {
      title: 'Ingredient Safety',
      category: 'Ingredient Safety',
      rating: 5,
      evidence: 'Limited Evidence' as const,
      description: 'Generally recognized as safe with minimal side effects',
      id: 'default-2',
    },
    {
      title: 'Value for the Price',
      category: 'Value for the Price',
      rating: 4.5,
      evidence: 'Strong Evidence' as const,
      description: 'Competitive pricing compared to similar premium products',
      id: 'default-3',
    },
    {
      title: 'Projected Efficacy',
      category: 'Projected Efficacy',
      rating: 4,
      evidence: 'Strong Evidence' as const,
      description: 'Expected results based on ingredient profiles and dosages',
      id: 'default-4',
    },
  ]

  // Use CMS ratings if available, otherwise fallback to defaults
  const ratingsData = ratings && ratings.length > 0 ? ratings : defaultRatings

  const content = (
    <div className="max-w-6xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2">
        <h1 className="text-xl font-bold">{productName || title || 'Primal RX Gummies'}</h1>
      </div>

      <div className="flex">
        {/* Left Section - Criteria */}
        <div className="flex-1 p-3 space-y-2">
          {ratingsData.map((rating, index) => (
            <div
              key={rating.id || `rating-${index}`}
              className="group flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCriterion(index)}
              onMouseLeave={() => setHoveredCriterion(null)}
            >
              <div className="flex items-center space-x-2">
                {getEvidenceIcon(rating.evidence, hoveredCriterion === index)}
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-300 text-sm">
                    {('title' in rating ? rating.title : rating.category) as string}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                    {rating.evidence}
                  </div>
                  {/* Animated evidence description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      hoveredCriterion === index ? 'max-h-12 opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded italic">
                      {(rating as any).description || 'Additional information about this criterion'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex-shrink-0 flex flex-col items-center justify-start p-3 pt-1">
          {/* Product Image moved up */}
          <div className="relative group -mb-4">
            {productImage ? (
              <div className="w-56 h-64">
                <Media
                  resource={productImage}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-52 h-64 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="w-44 h-56 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-600 mb-1">Product</div>
                    <div className="text-xs text-blue-600 font-semibold">Image</div>
                    <div className="text-xs text-gray-500 mt-1">Placeholder</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons positioned vertically below image - compact */}
          <div className="flex flex-col space-y-1 w-full max-w-sm">
            {buttons && buttons.length > 0 ? (
              buttons.map((button, index) => (
                <CMSLink
                  key={button.id || button.label || index}
                  type={button.link.type}
                  reference={button.link.reference}
                  url={button.link.url}
                  newTab={button.link.newTab}
                  className={`group relative overflow-hidden font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-center ${
                    button.style === 'primary' || button.label?.toLowerCase().includes('shop')
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
                      : 'bg-green-500 hover:bg-green-600 text-white shadow-green-200'
                  }`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full ${
                      button.style === 'primary' || button.label?.toLowerCase().includes('shop')
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                        : 'bg-gradient-to-r from-green-400 to-green-500'
                    }`}
                  ></div>
                  <div className="relative flex items-center justify-center">
                    <div className="text-xs font-bold tracking-wide text-white">{button.label}</div>
                  </div>
                </CMSLink>
              ))
            ) : (
              <>
                <button className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-blue-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <div className="relative flex items-center justify-center">
                    <div className="text-xs font-bold tracking-wide text-white">Shop Now</div>
                  </div>
                </button>
                <button className="group relative overflow-hidden bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-green-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <div className="relative flex items-center justify-center">
                    <div className="text-xs font-bold tracking-wide text-white">Read Review</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Section - Rating Breakdown */}
        <div className="flex-1 p-3">
          <div className="border border-gray-200 rounded-lg">
            <div
              className="flex items-center justify-between p-3 cursor-pointer group hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="font-semibold text-base text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                Rating Breakdown
              </div>
              <div
                className={`transform transition-all duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:scale-110'}`}
              >
                <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
              </div>
            </div>

            {/* Always Visible Ratings */}
            <div className="p-3 space-y-2 border-t border-gray-100">
              {ratingsData.map((rating, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200"
                >
                  <span className="text-xs text-gray-600">
                    {String(
                      rating.category || ('title' in rating ? rating.title : `Rating ${index + 1}`),
                    )}
                    :
                  </span>
                  <div className="flex items-center space-x-2">
                    <StarRating
                      rating={rating.rating}
                      size="sm"
                      interactive={true}
                      criterionIndex={index}
                      hoveredCriterion={hoveredCriterion}
                    />
                  </div>
                </div>
              ))}

              {/* Overall Rating */}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-2 rounded-lg">
                  <span className="font-semibold text-gray-900 text-sm">Overall Rating:</span>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={overallRating} size="sm" color="text-yellow-500" />
                    <span className="text-base font-bold text-gray-900">
                      {overallRating.toFixed(1)}
                    </span>
                  </div>
                </div>
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
    return <section className={`py-4 px-2 ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`py-4 px-2 ${bgClass} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  )
}
