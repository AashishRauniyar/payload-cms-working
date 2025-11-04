'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import RichText from '@/components/RichText'
import type { RatingTableBlock, Media } from '@/payload-types'
import './styles.css'

interface RatingTableProps extends RatingTableBlock {
  disableInnerContainer?: boolean
  className?: string
}

export const RatingTable: React.FC<RatingTableProps> = (props) => {
  const {
    title,
    productImage,
    customRating, // User input rating value - REQUIRED field
    ratingMetrics = [],
    description,
    backgroundColor = 'white',
    disableInnerContainer,
    className,
  } = props

  // Resolve product image (handles both numeric ID and populated Media object)
  const [resolvedImage, setResolvedImage] = useState<Media | null>(
    typeof productImage === 'object' && productImage !== null ? (productImage as Media) : null,
  )

  useEffect(() => {
    let active = true

    const resolve = async () => {
      try {
        if (typeof productImage === 'object' && productImage !== null) {
          // Already populated
          if (active) setResolvedImage(productImage as Media)
          return
        }

        if (typeof productImage === 'number') {
          // Fetch media doc by ID from Payload REST API
          const res = await fetch(`/api/media/${productImage}`, { cache: 'no-store' })
          if (!res.ok) throw new Error(`Failed to load media ${productImage}: ${res.status}`)
          const data = await res.json()
          if (active) setResolvedImage(data?.doc ?? null)
        }
      } catch (e) {
        console.error('RatingTable: failed to resolve product image', e)
        if (active) setResolvedImage(null)
      }
    }

    resolve()

    return () => {
      active = false
    }
  }, [productImage])

  // Normalize a rating value from number or string; clamp 0..5; return null if invalid
  const normalizeRating = (value: unknown): number | null => {
    let n: number | null = null
    if (typeof value === 'number') n = value
    else if (typeof value === 'string') {
      const parsed = parseFloat(value)
      n = Number.isFinite(parsed) ? parsed : null
    }
    if (n === null || Number.isNaN(n)) return null
    return Math.min(Math.max(n, 0), 5)
  }

  // Calculate star rating - prefer customRating, but gracefully fall back to legacy overallRating
  // This avoids empty stars while the database schema is being migrated.
  const calculateStarRating = () => {
    // 1) Preferred: customRating (new field)
    const normalized = normalizeRating(customRating as unknown)
    if (normalized !== null) return normalized

    // 2) Fallback: overallRating (legacy field persisted in DB prior to migration)
    //    Accessed via index signature to avoid strict typing issues against generated types
    const legacy = (props as unknown as { overallRating?: number | string })?.overallRating
    const normalizedLegacy = normalizeRating(legacy)
    if (normalizedLegacy !== null) return normalizedLegacy

    // If neither present, return 0 to render empty stars (should not happen once schema is aligned)
    console.error('RatingTable - rating is missing or invalid:', {
      customRating,
      overallRating: legacy,
    })
    return 0
  }

  const calculatedRating = calculateStarRating()

  // Generate star rating display with precise decimal support (e.g., 2.4 stars)
  const renderStars = (rating: number) => {
    const clampedRating = Math.min(Math.max(rating, 0), 5)
    const fullStars = Math.floor(clampedRating)
    const remainder = clampedRating - fullStars

    const stars = []

    // Full stars (e.g., for 2.4 rating, show 2 full stars)
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="rt-star rt-star-filled" fill="currentColor" />)
    }

    // Partial star for decimal remainder (e.g., 0.4 becomes 40% filled)
    if (remainder > 0) {
      const partialPercentage = remainder * 100 // 0.4 = 40%
      stars.push(
        <div key="partial" className="rt-star rt-star-half" style={{ position: 'relative' }}>
          <Star className="rt-star rt-star-empty" stroke="currentColor" fill="none" />
          <Star
            className="rt-star rt-star-filled rt-star-half-overlay"
            style={{
              clipPath: `inset(0 ${100 - partialPercentage}% 0 0)`,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            fill="currentColor"
            stroke="currentColor"
          />
        </div>,
      )
    }

    // Empty stars for remaining slots (e.g., for 2.4 rating, show 2 empty stars)
    const totalUsedStars = fullStars + (remainder > 0 ? 1 : 0)
    const emptyStars = 5 - totalUsedStars

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="rt-star rt-star-empty"
          stroke="currentColor"
          fill="none"
        />,
      )
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
      <div className="rt-modern-content">
        {/* Left Side - Product Image and Rating */}
        <div className="rt-modern-left">
          {/* Product Image */}
          <div className="rt-modern-image-wrapper">
            {resolvedImage?.url ? (
              <Image
                src={resolvedImage.url}
                alt={resolvedImage.alt || title || 'Product Image'}
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
            <meta itemProp="worstRating" content="0" />
            <div
              className="flex gap-1 flex-wrap justify-center"
              aria-label={`${calculatedRating.toFixed(1)} out of 5 stars`}
            >
              {renderStars(calculatedRating)}
            </div>
            {/* Show exact rating value */}
            <div className="text-xs sm:text-sm font-medium text-gray-800 mt-2 text-center">
              {calculatedRating.toFixed(1)}/5.0
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
