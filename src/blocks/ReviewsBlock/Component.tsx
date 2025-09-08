import React from 'react'

// Define the types for the new simplified structure
interface ReviewsBlockType {
  blockHeader?: {
    title?: string | null
    subtitle?: string | null
  } | null
  reviews?: ReviewItem[] | null
  displayOptions?: {
    layout?: string | null
    alternateBackground?: boolean | null
    showDashedBorders?: boolean | null
    borderStyle?: string | null
    spacing?: string | null
    maxWidth?: string | null
  } | null
}

interface ReviewItem {
  name?: string | null
  gender?: string | null
  age?: number | null
  profileImage?: string | null
  rating?: number | null
  reviewText?: string | null
}

// Star Rating Component - Making stars bigger
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center mt-3 gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`w-6 h-6 text-lg ${i < rating ? 'text-orange-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// Profile Image Component
const ProfileImage: React.FC<{
  profileImage?: string | null
  gender?: string | null
  name?: string | null
}> = ({ profileImage, gender, name }) => {
  const getImageUrl = () => {
    // For now, always use UI Avatars to avoid timeout issues
    const initials =
      name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('') || '?'
    const bgColor = gender === 'female' ? 'ff69b4' : '4169e1' // Pink for female, Blue for male
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=150&font-size=0.33`
  }

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
      <img
        src={getImageUrl()}
        alt={name || 'Reviewer'}
        className="w-full h-full object-cover object-center scale-110"
        style={{
          objectPosition: 'center center',
        }}
      />
    </div>
  )
}

// Individual Review Card Component - With alternating backgrounds
const TestimonialCard: React.FC<{
  review: ReviewItem
  index: number
}> = ({ review, index }) => {
  const { name, gender, age, profileImage, rating, reviewText } = review

  // Even numbered reviews (2nd, 4th, 6th etc) get the cream background
  const isEvenReview = (index + 1) % 2 === 0
  const backgroundColor = isEvenReview ? 'bg-[#FBF9F4]' : 'bg-white'

  return (
    <div className={`border-2 border-dashed border-gray-400 p-6 mb-8 ${backgroundColor}`}>
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <ProfileImage profileImage={profileImage} gender={gender} name={name} />

          {/* Star Rating */}
          <StarRating rating={rating || 4} />

          {/* Name and Demographics */}
          <div className="text-center mt-2">
            <div className="font-bold text-gray-800 text-sm">{name || 'Anonymous'}</div>
            <div className="text-gray-500 text-xs">
              {gender === 'female' ? 'Female' : 'Male'} {age}
            </div>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="flex-1">
          <p className="text-gray-700 text-sm leading-relaxed italic">"{reviewText}"</p>
        </div>
      </div>
    </div>
  )
}

// Main Component
export const ReviewsBlock: React.FC<ReviewsBlockType> = (props) => {
  const { blockHeader, reviews, displayOptions } = props

  if (!reviews || reviews.length === 0) {
    return null
  }

  // Get container max width classes - Making it match full blog content width
  const getMaxWidthClasses = () => {
    switch (displayOptions?.maxWidth) {
      case 'small':
        return 'max-w-4xl'
      case 'medium':
        return 'max-w-6xl'
      case 'large':
        return 'max-w-7xl'
      case 'xlarge':
        return 'max-w-full'
      default:
        return 'max-w-none' // No max width constraint - matches blog content
    }
  }

  return (
    <div className={`${getMaxWidthClasses()} mx-auto px-6 py-6 w-full`}>
      {/* Header */}
      {blockHeader && (
        <div className="text-center mb-12">
          {blockHeader.title && (
            <div className="text-3xl font-bold text-gray-900 mb-4">{blockHeader.title}</div>
          )}
          {blockHeader.subtitle && (
            <div className="text-lg text-gray-600 max-w-2xl mx-auto">{blockHeader.subtitle}</div>
          )}
        </div>
      )}

      {/* Reviews Container - Full width within container */}
      <div className="space-y-6 w-full">
        {reviews.map((review: ReviewItem, index: number) => (
          <TestimonialCard key={index} review={review} index={index} />
        ))}
      </div>
    </div>
  )
}
