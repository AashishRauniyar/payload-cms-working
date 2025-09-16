// import React from 'react'
// import { Media } from '@/components/Media'
// import type { Media as MediaType } from '@/payload-types'

// // Define the types for the new simplified structure
// interface ReviewsBlockType {
//   blockHeader?: {
//     title?: string | null
//     subtitle?: string | null
//   } | null
//   reviews?: ReviewItem[] | null
//   displayOptions?: {
//     layout?: string | null
//     alternateBackground?: boolean | null
//     showDashedBorders?: boolean | null
//     borderStyle?: string | null
//     spacing?: string | null
//     maxWidth?: string | null
//   } | null
// }

// interface ReviewItem {
//   name?: string | null
//   gender?: string | null
//   age?: number | null
//   profileImage?: MediaType | number | null
//   rating?: number | null
//   reviewText?: string | null
// }

// // Star Rating Component - Making stars bigger
// const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
//   return (
//     <div className="flex justify-center mt-3 gap-1">
//       {[...Array(5)].map((_, i) => (
//         <span
//           key={i}
//           className={`w-6 h-6 text-lg ${i < rating ? 'text-orange-400' : 'text-gray-300'}`}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   )
// }

// // Profile Image Component
// const ProfileImage: React.FC<{
//   profileImage?: MediaType | number | null
//   gender?: string | null
//   name?: string | null
// }> = ({ profileImage, gender, name }) => {
//   // Check if we have uploaded media
//   const hasUploadedImage = profileImage && typeof profileImage === 'object'

//   const getFallbackImageUrl = () => {
//     const initials =
//       name
//         ?.split(' ')
//         .map((n: string) => n[0])
//         .join('') || '?'
//     const bgColor = gender === 'female' ? 'ff69b4' : '4169e1' // Pink for female, Blue for male
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=150&font-size=0.33`
//   }

//   return (
//     <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
//       {hasUploadedImage ? (
//         <Media
//           resource={profileImage}
//           alt={name || 'Reviewer'}
//           className="w-full h-full object-cover rounded-full"
//           imgClassName="w-full h-full object-cover rounded-full"
//         />
//       ) : (
//         <img
//           src={getFallbackImageUrl()}
//           alt={name || 'Reviewer'}
//           className="w-full h-full object-cover rounded-full"
//         />
//       )}
//     </div>
//   )
// }

// // Individual Review Card Component - With alternating backgrounds
// const TestimonialCard: React.FC<{
//   review: ReviewItem
//   index: number
// }> = ({ review, index }) => {
//   const { name, gender, age, profileImage, rating, reviewText } = review

//   // Even numbered reviews (2nd, 4th, 6th etc) get the cream background
//   const isEvenReview = (index + 1) % 2 === 0
//   const backgroundColor = isEvenReview ? 'bg-[#FBF9F4]' : 'bg-white'

//   return (
//     <div className={`border-2 border-dashed border-gray-400 p-6 mb-8 ${backgroundColor}`}>
//       <div className="flex items-start gap-4">
//         {/* Profile Image */}
//         <div className="flex-shrink-0">
//           <ProfileImage profileImage={profileImage} gender={gender} name={name} />

//           {/* Star Rating */}
//           <StarRating rating={rating || 4} />

//           {/* Name and Demographics */}
//           <div className="text-center mt-2">
//             <div className="font-bold text-gray-800 text-sm">{name || 'Anonymous'}</div>
//             <div className="text-gray-500 text-xs">
//               {gender === 'female' ? 'Female' : 'Male'} {age}
//             </div>
//           </div>
//         </div>

//         {/* Testimonial Text */}
//         <div className="flex-1">
//           <p className="text-gray-700 text-sm leading-relaxed italic">"{reviewText}"</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Main Component
// export const ReviewsBlock: React.FC<ReviewsBlockType> = (props) => {
//   const { blockHeader, reviews, displayOptions } = props

//   if (!reviews || reviews.length === 0) {
//     return null
//   }

//   // Get container max width classes - Making it match full blog content width
//   const getMaxWidthClasses = () => {
//     switch (displayOptions?.maxWidth) {
//       case 'small':
//         return 'max-w-4xl'
//       case 'medium':
//         return 'max-w-6xl'
//       case 'large':
//         return 'max-w-7xl'
//       case 'xlarge':
//         return 'max-w-full'
//       default:
//         return 'max-w-none' // No max width constraint - matches blog content
//     }
//   }

//   return (
//     <div className={`${getMaxWidthClasses()} mx-auto px-6 py-6 w-full`}>
//       {/* Header */}
//       {blockHeader && (
//         <div className="text-center mb-12">
//           {blockHeader.title && (
//             <div className="text-3xl font-bold text-gray-900 mb-4">{blockHeader.title}</div>
//           )}
//           {blockHeader.subtitle && (
//             <div className="text-lg text-gray-600 max-w-2xl mx-auto">{blockHeader.subtitle}</div>
//           )}
//         </div>
//       )}

//       {/* Reviews Container - Full width within container */}
//       <div className="space-y-6 w-full">
//         {reviews.map((review: ReviewItem, index: number) => (
//           <TestimonialCard key={index} review={review} index={index} />
//         ))}
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'

// Define the types for the new simplified structure
interface ReviewsBlockType {
  blockHeader?: {
    title?: string | null
    subtitle?: string | null
  } | null
  displayOptions?: {
    layout?: string | null
    alternateBackground?: boolean | null
    showDashedBorders?: boolean | null
    borderStyle?: string | null
    spacing?: string | null
    maxWidth?: string | null
  } | null
}

// Interactive Star Rating Component with hover effects
const InteractiveStarRating: React.FC<{
  rating: number
  onRatingChange: (rating: number) => void
}> = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <div className="flex justify-center mb-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`w-5 h-5 text-lg transition-all duration-200 hover:scale-110 ${
            star <= (hoveredRating || rating)
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-300 hover:text-yellow-200'
          }`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// Floating Label Input Component
const FloatingLabelInput: React.FC<{
  id: string
  type: string
  value: string
  onChange: (value: string) => void
  label: string
  required?: boolean
}> = ({ id, type, value, onChange, label, required = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const labelFloated = isFocused || hasValue

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-2 py-1.5 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-sm"
        placeholder=""
      />
      <label
        htmlFor={id}
        className={`absolute left-2 transition-all duration-300 pointer-events-none ${
          labelFloated
            ? 'top-0 -translate-y-1/2 bg-white px-1 text-xs text-blue-600 font-medium'
            : 'top-1/2 -translate-y-1/2 text-gray-500 text-xs'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
}

// Auto-expanding Textarea Component
const FloatingLabelTextarea: React.FC<{
  id: string
  value: string
  onChange: (value: string) => void
  label: string
  required?: boolean
}> = ({ id, value, onChange, label, required = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const labelFloated = isFocused || hasValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    // Auto-expand textarea
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none min-h-[60px] max-h-[100px]"
        placeholder=""
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 pointer-events-none ${
          labelFloated
            ? 'top-0 -translate-y-1/2 bg-white px-2 text-xs text-blue-600 font-medium'
            : 'top-5 text-gray-500 text-sm'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
}

// Main Write Review Form Component
export const ReviewsBlock: React.FC<ReviewsBlockType> = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    name: '',
    email: '',
    review: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.rating === 0) {
      alert('Please select a rating')
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your review! It has been submitted for moderation.')
      setFormData({ rating: 0, name: '', email: '', review: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-2 px-2 min-h-screen flex items-center">
      <div className="max-w-sm mx-auto w-full">
        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Header */}
          <div className="text-center py-2 px-3 border-b border-gray-100">
            <div className="text-base font-bold text-gray-900">Write a Review</div>
            <div className="text-xs text-gray-600">Share your experience</div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-3 py-3 space-y-2">
            {/* Star Rating */}
            <div className="text-center">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <InteractiveStarRating
                rating={formData.rating}
                onRatingChange={(rating) => setFormData({ ...formData, rating })}
              />
              <div className="text-xs text-gray-500">
                {formData.rating > 0 && (
                  <span>
                    {formData.rating === 1 && 'Poor'}
                    {formData.rating === 2 && 'Fair'}
                    {formData.rating === 3 && 'Good'}
                    {formData.rating === 4 && 'Very Good'}
                    {formData.rating === 5 && 'Excellent'}
                  </span>
                )}
              </div>
            </div>

            {/* Name Field */}
            <FloatingLabelInput
              id="name"
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              label="Your Name"
              required
            />

            {/* Email Field */}
            <FloatingLabelInput
              id="email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              label="Email Address"
              required
            />

            {/* Review Textarea */}
            <FloatingLabelTextarea
              id="review"
              value={formData.review}
              onChange={(value) => setFormData({ ...formData, review: value })}
              label="Write your review"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || formData.rating === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Review'
              )}
            </button>

            {/* Privacy Note */}
            <div className="text-center text-xs text-gray-500">
              Your email will not be published. Required fields are marked{' '}
              <span className="text-red-500">*</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
