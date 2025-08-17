'use client'

import React from 'react'
import { Star, DollarSign, FlaskConical, ShieldCheck, ExternalLink, Award } from 'lucide-react'
import type { BrandHighlightsTableBlock } from '@/payload-types'
import './styles.css'

interface BrandHighlightsTableProps extends BrandHighlightsTableBlock {
  disableInnerContainer?: boolean
  className?: string
}

export const BrandHighlightsTable: React.FC<BrandHighlightsTableProps> = (props) => {
  // Debug logging to see all props
  console.log('🔍 BrandHighlights Component Props:', JSON.stringify(props, null, 2))

  const {
    title,
    overallRating,
    productImage,
    productName,
    buyNowText,
    buyNowLink,
    ingredientsRating,
    valueForCostRating,
    manufacturerRating,
    safetyRating,
    highlights,
    backgroundColor,
    disableInnerContainer,
    className,
  } = props

  console.log('🎯 Individual Rating Fields:', {
    ingredientsRating: `${ingredientsRating} (type: ${typeof ingredientsRating})`,
    valueForCostRating: `${valueForCostRating} (type: ${typeof valueForCostRating})`,
    manufacturerRating: `${manufacturerRating} (type: ${typeof manufacturerRating})`,
    safetyRating: `${safetyRating} (type: ${typeof safetyRating})`,
    title,
    productName,
  })

  // Dynamic values - use admin values if they exist, otherwise use sensible defaults
  const dynamicValues = {
    title: title || 'How Does Our Product Rate?',
    overallRating: overallRating || 4.7,
    productName: productName || 'Our Product',
    buyNowText: buyNowText || 'SHOP NOW',
    buyNowLink: buyNowLink || '#',
    highlights: highlights || '',
    backgroundColor: backgroundColor || 'gradient',
    // Rating values - properly handle all possible values including 0
    ingredientsRating: typeof ingredientsRating === 'number' ? ingredientsRating : 0,
    valueForCostRating: typeof valueForCostRating === 'number' ? valueForCostRating : 0,
    manufacturerRating: typeof manufacturerRating === 'number' ? manufacturerRating : 0,
    safetyRating: typeof safetyRating === 'number' ? safetyRating : 0,
  }

  console.log('🚀 Final Values Being Rendered:', dynamicValues)

  // Handle productImage type (could be number or Media object)
  const imageData = typeof productImage === 'object' && productImage !== null ? productImage : null

  const backgroundClasses = {
    none: '',
    white: 'bh-bg-white',
    gray: 'bh-bg-gray',
    blue: 'bh-bg-blue',
    gradient: 'bh-bg-gradient',
  }

  const bgClass = backgroundClasses[dynamicValues.backgroundColor as keyof typeof backgroundClasses]

  const displayTitle = dynamicValues.title.replace(/\[Product\]/g, dynamicValues.productName)

  const content = (
    <div className="bh-simple-table">
      {/* Overall Rating Header */}
      <div className="bh-header">
        <div className="bh-rating-banner">
          <span className="bh-rating-text">Overall Rating: {dynamicValues.overallRating}</span>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="bh-content">
        {/* Left Column - Product Image & Buy Button */}
        <div className="bh-product-section">
          <div className="bh-image-container">
            {imageData?.url ? (
              <img
                src={imageData.url}
                alt={imageData.alt || dynamicValues.productName || 'Product Image'}
                className="bh-product-image"
              />
            ) : (
              <div className="bh-image-placeholder">
                <Award className="bh-placeholder-icon" />
                <span className="bh-placeholder-text">Product Image</span>
              </div>
            )}
          </div>

          <h3 className="bh-product-name">{dynamicValues.productName}</h3>

          <a
            href={dynamicValues.buyNowLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bh-buy-button"
          >
            <span className="bh-button-text">{dynamicValues.buyNowText}</span>
            <ExternalLink className="bh-button-icon" />
          </a>
        </div>

        {/* Middle Column - Brand Highlights Section */}
        <div className="bh-highlights">
          <h4 className="bh-section-heading">Brand Highlights</h4>

          <div className="bh-highlights-list">
            {dynamicValues.highlights && dynamicValues.highlights.trim() ? (
              dynamicValues.highlights
                .split('\n')
                .filter((line: string) => line.trim() !== '')
                .map((highlight: string, idx: number) => (
                  <div key={idx} className="bh-highlight-item">
                    <span className="bh-bullet">–</span>
                    <span className="bh-highlight-text">{highlight.trim()}</span>
                  </div>
                ))
            ) : (
              <div className="bh-empty">
                <ShieldCheck className="bh-empty-icon" />
                <span className="bh-empty-text">No highlights available</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Ratings Section */}
        <div className="bh-ratings">
          <div className="bh-ratings-list">
            {/* Ingredients Rating */}
            <div className="bh-rating-item">
              <div className="bh-rating-icon">
                <FlaskConical className="bh-icon bh-icon-ingredients" />
              </div>
              <div className="bh-rating-info">
                <div className="bh-rating-score">
                  <span className="bh-score">{dynamicValues.ingredientsRating}</span>
                  <span className="bh-score-max">/5</span>
                </div>
                <span className="bh-rating-label">Ingredients</span>
              </div>
            </div>

            {/* Value for Cost Rating */}
            <div className="bh-rating-item">
              <div className="bh-rating-icon">
                <DollarSign className="bh-icon bh-icon-value" />
              </div>
              <div className="bh-rating-info">
                <div className="bh-rating-score">
                  <span className="bh-score">{dynamicValues.valueForCostRating}</span>
                  <span className="bh-score-max">/5</span>
                </div>
                <span className="bh-rating-label">Value for Cost</span>
              </div>
            </div>

            {/* Manufacturer Rating */}
            <div className="bh-rating-item">
              <div className="bh-rating-icon">
                <Award className="bh-icon bh-icon-manufacturer" />
              </div>
              <div className="bh-rating-info">
                <div className="bh-rating-score">
                  <span className="bh-score">{dynamicValues.manufacturerRating}</span>
                  <span className="bh-score-max">/5</span>
                </div>
                <span className="bh-rating-label">Manufacturer</span>
              </div>
            </div>

            {/* Safety Rating */}
            <div className="bh-rating-item">
              <div className="bh-rating-icon">
                <ShieldCheck className="bh-icon bh-icon-safety" />
              </div>
              <div className="bh-rating-info">
                <div className="bh-rating-score">
                  <span className="bh-score">{dynamicValues.safetyRating}</span>
                  <span className="bh-score-max">/5</span>
                </div>
                <span className="bh-rating-label">Safety</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return <section className={`bh-wrapper ${bgClass} ${className || ''}`}>{content}</section>
  }

  return (
    <section className={`bh-wrapper ${bgClass} ${className || ''}`}>
      <div className="bh-container">{content}</div>
    </section>
  )
}
