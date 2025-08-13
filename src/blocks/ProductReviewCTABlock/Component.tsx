import React from 'react'
import { Shield, DollarSign, FlaskConical, Star, Award, CheckCircle, Check } from 'lucide-react'

interface ProductReviewCTABlockProps {
  title: string
  overallRating: number
  productName: string
  productImage: {
    id: string
    url: string
    alt?: string
    width?: number
    height?: number
  }
  ctaButton: {
    text: string
    link: string
    openInNewTab: boolean
  }
  ratings: Array<{
    category: string
    score: number
    icon: 'medications' | 'value' | 'manufacturer' | 'safety' | 'quality' | 'custom'
  }>
  brandHighlights: Array<{
    highlight: string
  }>
  backgroundColor: 'blue' | 'gray' | 'white' | 'green'
  disableInnerContainer?: boolean
  className?: string
}

export const ProductReviewCTABlock: React.FC<ProductReviewCTABlockProps> = ({
  title,
  overallRating,
  productName,
  productImage,
  ctaButton,
  ratings,
  brandHighlights,
  backgroundColor,
  disableInnerContainer,
  className,
}) => {
  const backgroundClasses = {
    blue: 'bg-gradient-to-r from-blue-50 to-blue-100',
    gray: 'bg-gradient-to-r from-gray-50 to-gray-100',
    white: 'bg-white',
    green: 'bg-gradient-to-r from-green-50 to-green-100',
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'medications':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        )
      case 'value':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
        )
      case 'manufacturer':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-purple-600" />
          </div>
        )
      case 'safety':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
        )
      case 'quality':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-gray-600" />
          </div>
        )
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const content = (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Main Title with Blue Left Border */}
      <div className="bg-gray-50 border-l-4 border-blue-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Overall Rating Section */}
      <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <span className="text-lg font-medium text-gray-700 mr-2">Overall Rating:</span>
          <span className="text-xl font-bold text-blue-600">{overallRating}/5</span>
          <div className="ml-2">{renderStars(overallRating)}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Product Image and CTA */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <img
                src={productImage.url}
                alt={productImage.alt || productName}
                className="w-48 h-auto object-contain drop-shadow-lg"
              />
            </div>
            <div className="text-center space-y-3">
              <div className="border-l-4 border-blue-600 bg-gray-50 px-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
              </div>
              <a
                href={ctaButton.link}
                target={ctaButton.openInNewTab ? '_blank' : '_self'}
                rel={ctaButton.openInNewTab ? 'noopener noreferrer' : ''}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {ctaButton.text}
              </a>
            </div>
          </div>

          {/* Middle Column - Ratings */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 bg-gray-50 px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">Rating Breakdown</h3>
            </div>
            <div className="space-y-4">
              {ratings.map((rating, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-4">
                    {getIcon(rating.icon)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-bold text-gray-800">
                          {rating.score}
                          <span className="text-base text-gray-600">/5</span>
                        </span>
                        <div className="flex">{renderStars(rating.score)}</div>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{rating.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Brand Highlights */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 bg-gray-50 px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">Brand Highlights</h3>
            </div>
            <div className="space-y-3">
              {brandHighlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section className={`py-12 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        <div className="max-w-7xl mx-auto">{content}</div>
      </section>
    )
  }

  return (
    <section className={`py-12 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  )
}
