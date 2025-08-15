'use client'

import React from 'react'
import { Star, DollarSign, ClipboardList, ShieldCheck, ExternalLink, Award } from 'lucide-react'
import './styles.css'

interface RatingItem {
  label: string
  score: number
  iconType: 'star' | 'dollar' | 'clipboard' | 'shield'
}

interface BrandHighlightsTableProps {
  title?: string
  overallRating?: number
  productImage?: {
    url: string
    alt: string
  }
  productName?: string
  buyNowText?: string
  buyNowLink?: string
  ratings?: RatingItem[]
  highlights?: string
  backgroundColor?: 'none' | 'white' | 'gray' | 'blue' | 'gradient'
  disableInnerContainer?: boolean
  className?: string
}

const iconMap = {
  star: <Star className="bh-icon bh-icon-star" />,
  dollar: <DollarSign className="bh-icon bh-icon-dollar" />,
  clipboard: <ClipboardList className="bh-icon bh-icon-clipboard" />,
  shield: <ShieldCheck className="bh-icon bh-icon-shield" />,
}

export const BrandHighlightsTable: React.FC<BrandHighlightsTableProps> = ({
  title = 'How Does Our Product Rate?',
  overallRating = 4.7,
  productImage,
  productName = 'Our Product',
  buyNowText = 'SHOP NOW',
  buyNowLink = '#',
  ratings = [],
  highlights = '',
  backgroundColor = 'none',
  disableInnerContainer,
  className,
}) => {
  try {
    // Replace [Product] with actual product name in title
    const displayTitle = title?.replace(/\[Product\]/g, productName) || 'How Does Our Product Rate?'

    // Ensure highlights is always a string
    const safeHighlights = typeof highlights === 'string' ? highlights : ''

    // Ensure ratings is always an array
    const safeRatings = Array.isArray(ratings) ? ratings : []

    const backgroundClasses = {
      none: '',
      white: 'bh-bg-white',
      gray: 'bh-bg-gray',
      blue: 'bh-bg-blue',
      gradient: 'bh-bg-gradient',
    }

    const content = (
      <div className="bh-simple-table">
        {/* Overall Rating Header */}
        <div className="bh-header">
          <div className="bh-rating-banner">
            <span className="bh-rating-text">Overall Rating: {overallRating}</span>
          </div>
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="bh-content">
          {/* Left Column - Product Image & Buy Button */}
          <div className="bh-product-section">
            <div className="bh-image-container">
              {productImage?.url ? (
                <img
                  src={productImage.url}
                  alt={productImage.alt || productName}
                  className="bh-product-image"
                />
              ) : (
                <div className="bh-image-placeholder">
                  <Award className="bh-placeholder-icon" />
                  <span className="bh-placeholder-text">Product Image</span>
                </div>
              )}
            </div>

            <h3 className="bh-product-name">{productName}</h3>

            <a
              href={buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bh-buy-button"
            >
              <span className="bh-button-text">{buyNowText}</span>
              <ExternalLink className="bh-button-icon" />
            </a>
          </div>

          {/* Middle Column - Brand Highlights Section */}
          <div className="bh-highlights">
            <h4 className="bh-section-heading">Brand Highlights</h4>

            <div className="bh-highlights-list">
              {safeHighlights && safeHighlights.trim() ? (
                safeHighlights
                  .split('\n')
                  .filter((line) => line.trim() !== '')
                  .map((highlight, idx) => (
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
              {safeRatings && safeRatings.length > 0 ? (
                safeRatings.map((item, idx) => (
                  <div key={idx} className="bh-rating-item">
                    <div className="bh-rating-icon">{iconMap[item?.iconType] || iconMap.star}</div>
                    <div className="bh-rating-info">
                      <div className="bh-rating-score">
                        <span className="bh-score">{item?.score || 0}</span>
                        <span className="bh-score-max">/5</span>
                      </div>
                      <span className="bh-rating-label">{item?.label || 'N/A'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bh-empty">
                  <Star className="bh-empty-icon" />
                  <span className="bh-empty-text">No ratings available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )

    if (disableInnerContainer) {
      return (
        <section className={`bh-wrapper ${backgroundClasses[backgroundColor]} ${className || ''}`}>
          {content}
        </section>
      )
    }

    return (
      <section className={`bh-wrapper ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        <div className="bh-container">{content}</div>
      </section>
    )
  } catch (error) {
    console.error('BrandHighlightsTable Error:', error)
    return (
      <div className="bh-error">
        <span className="bh-error-text">Unable to load brand highlights table</span>
      </div>
    )
  }
}
