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
  overallRating = 4.3,
  ratings = [],
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
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-300">
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
          {/* Left Side - Features with animations */}
          <div className="lg:col-span-2 p-8">
            <div className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
              Key Features & Evidence
            </div>

            <div className="grid gap-4 mb-8">
              {ratings && ratings.length > 0
                ? ratings.slice(0, 4).map((rating, index) => (
                    <div
                      key={rating.title || `rating-${index}`}
                      className="group p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                          {rating.title || rating.category}
                        </span>
                        <StarRating rating={rating.rating} size="sm" />
                      </div>
                      <EvidenceIndicator evidence={rating.evidence || 'Limited Evidence'} />
                    </div>
                  ))
                : // Default ratings if none provided
                  [
                    {
                      title: 'Supports Maximum Pleasure*',
                      rating: 4,
                      evidence: 'Good Site Evidence',
                    },
                    { title: 'Increase Staying Power*', rating: 5, evidence: 'Good Site Evidence' },
                    {
                      title: 'Increased Peak Performance*',
                      rating: 4.5,
                      evidence: 'Strong Evidence',
                    },
                    { title: 'Boost Blood Circulation*', rating: 4, evidence: 'Strong Evidence' },
                  ].map((rating, index) => (
                    <div
                      key={rating.title}
                      className="group p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                          {rating.title}
                        </span>
                        <StarRating rating={rating.rating} size="sm" />
                      </div>
                      <EvidenceIndicator evidence={rating.evidence} />
                    </div>
                  ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {buttons && buttons.length > 0 ? (
                buttons.map((button) => (
                  <CMSLink
                    key={button.label || 'button'}
                    type={button.link.type}
                    reference={button.link.reference}
                    url={button.link.url}
                    newTab={button.link.newTab}
                    className={`px-8 py-4 text-base rounded-2xl font-semibold ${getButtonStyles(button.style)} shadow-lg text-white`}
                  >
                    <span className="relative z-10 text-white">{button.label}</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
                  </CMSLink>
                ))
              ) : (
                <>
                  <button
                    className={`px-8 py-4 text-base rounded-2xl font-semibold ${getButtonStyles('primary')} shadow-lg text-white`}
                  >
                    <span className="relative z-10 text-white">Shop Now</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
                  </button>
                  <button
                    className={`px-8 py-4 text-base rounded-2xl font-semibold ${getButtonStyles('secondary')} shadow-lg text-white`}
                  >
                    <span className="relative z-10 text-white">Read Review</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Product Image & Overall Rating */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex flex-col items-center justify-center relative">
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-100 rounded-full opacity-30"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-20"></div>

            {/* Product Image */}
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-blue-500 rounded-3xl opacity-20 blur-xl"></div>
              {productImage ? (
                <div className="relative w-48 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Media resource={productImage} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="relative bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl p-8 w-48 h-56 flex items-center justify-center shadow-2xl border-4 border-white">
                  <div className="bg-blue-600 text-white text-lg font-bold px-6 py-3 rounded-xl transform -rotate-12 shadow-lg">
                    PRODUCT
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
