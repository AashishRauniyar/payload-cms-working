'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import RichText from '@/components/RichText'
import type { RatingTableBlock } from '@/payload-types'
import './styles.css'

interface RatingTableProps extends RatingTableBlock {
  disableInnerContainer?: boolean
  className?: string
  customRating?: number // Allow external rating override
}

export const RatingTable: React.FC<RatingTableProps> = (props) => {
  const {
    title,
    productImage,
    overallRating = 4.5,
    ratingMetrics = [],
    description,
    backgroundColor = 'white',
    disableInnerContainer,
    className,
    customRating, // New prop for external rating control
  } = props

  // Handle productImage type (could be number or Media object)
  const imageData = typeof productImage === 'object' && productImage !== null ? productImage : null

  // Calculate star rating dynamically
  const calculateStarRating = () => {
    // Priority 1: Use customRating if provided (for external control)
    if (customRating !== undefined && customRating !== null) {
      return Math.min(Math.max(customRating, 0), 5) // Clamp between 0 and 5
    }

    // Priority 2: Use overallRating if provided and is a valid number
    if (overallRating && overallRating > 0) {
      return Math.min(Math.max(overallRating, 0), 5) // Clamp between 0 and 5
    }

    // Priority 3: Calculate from metrics if available
    if (ratingMetrics.length > 0) {
      const totalPercentage = ratingMetrics.reduce((sum, metric) => sum + metric.percentage, 0)
      const averagePercentage = totalPercentage / ratingMetrics.length
      // Convert percentage to 5-star scale (0-100% becomes 0-5 stars)
      return Math.min(Math.max((averagePercentage / 100) * 5, 0), 5)
    }

    // Default fallback
    return 0
  }

  const calculatedRating = calculateStarRating()

  // Generate star rating display with dynamic precision
  const renderStars = (rating: number, showPreciseHalf = true) => {
    const clampedRating = Math.min(Math.max(rating, 0), 5)
    const fullStars = Math.floor(clampedRating)
    const remainder = clampedRating - fullStars

    // Determine if we should show a half star based on remainder
    const hasHalfStar = showPreciseHalf && remainder >= 0.25 && remainder < 0.75
    const shouldRoundUp = remainder >= 0.75

    const actualFullStars = shouldRoundUp ? fullStars + 1 : fullStars
    const emptyStars = 5 - actualFullStars - (hasHalfStar ? 1 : 0)

    const stars = []

    // Full stars
    for (let i = 0; i < actualFullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="rt-star rt-star-filled" fill="currentColor" />)
    }

    // Half star with precise fill percentage
    if (hasHalfStar) {
      const halfPercentage = ((remainder - 0.25) / 0.5) * 100 // Map 0.25-0.75 to 0-100%
      stars.push(
        <div key="half" className="rt-star rt-star-half" style={{ position: 'relative' }}>
          <Star className="rt-star rt-star-empty" />
          <Star
            className="rt-star rt-star-filled rt-star-half-overlay"
            style={{
              clipPath: `inset(0 ${100 - halfPercentage}% 0 0)`,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            fill="currentColor"
          />
        </div>,
      )
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="rt-star rt-star-empty" fill="none" />)
    }

    return stars
  }

  // Get progress bar color class
  // const getProgressBarColor = (color: string) => {
  //   const colorMap = {
  //     green: 'linear-gradient(90deg, #27ae60, #2ecc71)',
  //     blue: 'linear-gradient(90deg, #2980b9, #3498db)',
  //     orange: 'linear-gradient(90deg, #e67e22, #f39c12)',
  //     red: 'linear-gradient(90deg, #c0392b, #e74c3c)',
  //     purple: 'linear-gradient(90deg, #8e44ad, #9b59b6)',
  //     teal: 'linear-gradient(90deg, #16a085, #1abc9c)',
  //   }
  //   return colorMap[color as keyof typeof colorMap] || colorMap.teal
  // }

  // Background classes
  const backgroundClasses = {
    none: '',
    white: 'rt-bg-white',
    gray: 'rt-bg-gray',
    blue: 'rt-bg-blue',
    gradient: 'rt-bg-gradient',
    blueGradient: 'rt-bg-blue-gradient',
  }

  const bgClass = backgroundClasses[backgroundColor as keyof typeof backgroundClasses]

  const content = (
    <div className="rt-modern-container" itemScope itemType="https://schema.org/Product">
      {/* Title */}
      <div className="rt-modern-title" itemProp="name">
        {title}
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left Side - Product Image and Rating */}
        <div className="flex flex-col justify-start items-center">
          {/* Product Image */}
          <div className="rt-modern-image-wrapper">
            {imageData?.url ? (
              <Image
                src={imageData.url}
                alt={imageData.alt || title || 'Product Image'}
                className="rt-modern-image"
                width={200}
                height={200}
                itemProp="image"
              />
            ) : (
              <div className="rt-modern-image rt-modern-placeholder">Product Image</div>
            )}
          </div>

          {/* Star Rating with SEO Structure */}
          <div className="rt-modern-stars" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content={calculatedRating.toFixed(1)} />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
            <div
              className="flex gap-1"
              aria-label={`${calculatedRating.toFixed(1)} out of 5 stars`}
            >
              {renderStars(calculatedRating)}
            </div>
          </div>
        </div>

        {/* Right Side - Metrics */}
        <div className="rt-modern-right">
          {ratingMetrics.map((metric, index) => (
            <div key={index} className="rt-modern-metric">
              <span className="rt-modern-label">{metric.metricName}</span>
              <div className="rt-modern-progress rounded-lg">
                <div
                  className="rt-modern-fill"
                  style={{
                    width: `${metric.percentage}%`,
                  }}
                >
                  <div className="rt-modern-shimmer"></div>
                </div>
              </div>
              <span className="rt-modern-percentage">{metric.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      {description && (
        <div className="rt-modern-description" itemProp="description">
          <RichText data={description} enableGutter={false} />
        </div>
      )}
    </div>
  )

  if (disableInnerContainer) {
    return <section className={`rt-wrapper ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`rt-wrapper ${bgClass} ${className || ''}`}>
      <div className="rt-container">{content}</div>
    </section>
  )
}
