'use client'

import React, { useState, useEffect } from 'react'

interface ReviewData {
  name: string
  email: string
  review: string
  rating: number
  timestamp: string
}

const CustomerReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submittedReviews, setSubmittedReviews] = useState<ReviewData[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Load existing reviews from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('customer_reviews')
    if (stored) {
      try {
        const reviews = JSON.parse(stored)
        setSubmittedReviews(reviews)
      } catch (error) {
        console.error('Error parsing stored reviews:', error)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }

    // Limit review text to 1000 characters
    if (name === 'review' && value.length > 1000) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Review is required'
    } else if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create review object
    const newReview: ReviewData = {
      ...formData,
      timestamp: new Date().toISOString(),
    }

    // Get existing reviews from localStorage
    const existingReviews = localStorage.getItem('customer_reviews')
    let reviews: ReviewData[] = []

    if (existingReviews) {
      try {
        reviews = JSON.parse(existingReviews)
      } catch (error) {
        console.error('Error parsing existing reviews:', error)
      }
    }

    // Add new review to the beginning of the array
    reviews.unshift(newReview)

    // Keep only the last 50 reviews to prevent localStorage bloat
    if (reviews.length > 50) {
      reviews = reviews.slice(0, 50)
    }

    // Store in localStorage
    localStorage.setItem('customer_reviews', JSON.stringify(reviews))
    setSubmittedReviews(reviews)

    // Reset form and show success
    setFormData({ name: '', email: '', review: '', rating: 5 })
    setIsSubmitting(false)
    setShowSuccess(true)

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const renderStarRating = (interactive = false) => {
    const currentRating = interactive ? hoveredRating || formData.rating : formData.rating

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => interactive && handleRatingClick(star)}
              onMouseEnter={() => interactive && setHoveredRating(star)}
              onMouseLeave={() => interactive && setHoveredRating(0)}
              className={`transition-all duration-200 p-1 rounded-full ${
                interactive ? 'cursor-pointer hover:scale-110 hover:bg-yellow-50' : 'cursor-default'
              }`}
              disabled={!interactive}
            >
              <svg
                className={`w-7 h-7 transition-colors duration-200 ${
                  star <= currentRating
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300 fill-current hover:text-yellow-200'
                }`}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-base text-gray-700 font-semibold">
          {currentRating} star{currentRating !== 1 ? 's' : ''}
        </span>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="customer-review-section">
      {/* Success Message */}
      {showSuccess && (
        <div className="success-banner">
          <div className="success-content">
            <div className="success-icon">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="success-title">Thank you for your review!</h4>
              <p className="success-message">Your feedback has been submitted successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Review Form */}
      <div className="review-form-container">
        <div className="form-background">
          <div className="form-pattern"></div>
        </div>

        <div className="form-content">
          <div className="form-header">
            <h3 className="form-title">Write a Review</h3>
            <p className="form-subtitle">
              Share your experience and help others make informed decisions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="review-form">
            {/* Name and Email Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`form-input ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
            </div>

            {/* Rating */}
            <div className="form-group">
              <label className="form-label">Rating *</label>
              <div className="rating-container">{renderStarRating(true)}</div>
            </div>

            {/* Review Text */}
            <div className="form-group">
              <label htmlFor="review" className="form-label">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                required
                rows={4}
                className={`form-textarea ${errors.review ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Share your thoughts about this article or product. What did you find most helpful?"
              />
              {errors.review && <p className="error-message">{errors.review}</p>}
              <div
                className={`character-count ${formData.review.length > 900 ? 'text-red-500' : ''}`}
              >
                {formData.review.length}/1000 characters
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className="submit-button">
              {isSubmitting ? (
                <>
                  <svg className="submit-spinner" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Review
                  <svg
                    className="submit-arrow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Display Recent Reviews */}
      {submittedReviews.length > 0 && (
        <div className="recent-reviews">
          <h4 className="recent-reviews-title">Recent Reviews</h4>
          <div className="reviews-list">
            {submittedReviews.slice(0, 3).map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{review.name.charAt(0).toUpperCase()}</div>
                    <div className="reviewer-details">
                      <h5 className="reviewer-name">{review.name}</h5>
                      <div className="review-meta">
                        {renderStarRating(false)}
                        <span className="review-date">{formatDate(review.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>

          {submittedReviews.length > 3 && (
            <p className="more-reviews-text">
              And {submittedReviews.length - 3} more review
              {submittedReviews.length - 3 !== 1 ? 's' : ''}...
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomerReviewForm
