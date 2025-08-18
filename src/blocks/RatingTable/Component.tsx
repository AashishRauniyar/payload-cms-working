'use client'

import React from 'react'
import { Star } from 'lucide-react'
import RichText from '@/components/RichText'
import type { RatingTableBlock } from '@/payload-types'
import './styles.css'

interface RatingTableProps extends RatingTableBlock {
  disableInnerContainer?: boolean
  className?: string
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
  } = props

  // Handle productImage type (could be number or Media object)
  const imageData = typeof productImage === 'object' && productImage !== null ? productImage : null

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(rating)

    const stars = []

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="rt-star rt-star-filled" />)
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="rt-star rt-star-half">
          <Star className="rt-star rt-star-empty" />
          <Star className="rt-star rt-star-filled rt-star-half-overlay" />
        </div>,
      )
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="rt-star rt-star-empty" />)
    }

    return stars
  }

  // Get progress bar color class
  const getProgressBarColor = (color: string) => {
    const colorMap = {
      green: 'linear-gradient(90deg, #27ae60, #2ecc71)',
      blue: 'linear-gradient(90deg, #2980b9, #3498db)',
      orange: 'linear-gradient(90deg, #e67e22, #f39c12)',
      red: 'linear-gradient(90deg, #c0392b, #e74c3c)',
      purple: 'linear-gradient(90deg, #8e44ad, #9b59b6)',
      teal: 'linear-gradient(90deg, #16a085, #1abc9c)',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.teal
  }

  // Background classes
  const backgroundClasses = {
    none: '',
    white: 'rt-bg-white',
    gray: 'rt-bg-gray',
    blue: 'rt-bg-blue',
    gradient: 'rt-bg-gradient',
  }

  const bgClass = backgroundClasses[backgroundColor as keyof typeof backgroundClasses]

  const content = (
    <div className="rt-modern-container">
      {/* Title */}
      <div className="rt-modern-title">{title}</div>

      {/* Main Content */}
      <div className="rt-modern-content">
        {/* Left Side - Product Image and Rating */}
        <div className="rt-modern-left">
          {/* Product Image */}
          <div className="rt-modern-image-wrapper">
            {imageData?.url ? (
              <img
                src={imageData.url}
                alt={imageData.alt || title || 'Product Image'}
                className="rt-modern-image"
              />
            ) : (
              <div className="rt-modern-image rt-modern-placeholder">Product Image</div>
            )}
          </div>

          {/* Star Rating */}
          <div className="rt-modern-stars">{renderStars(overallRating)}</div>
        </div>

        {/* Right Side - Metrics */}
        <div className="rt-modern-right">
          {ratingMetrics.map((metric, index) => (
            <div key={index} className="rt-modern-metric">
              <span className="rt-modern-label">{metric.metricName}</span>
              <div className="rt-modern-progress">
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
        <div className="rt-modern-description">
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
