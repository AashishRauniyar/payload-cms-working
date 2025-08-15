'use client'

import React, { useState } from 'react'
import type { Post } from '@/payload-types'

interface AuthorReviewSectionProps {
  post: Post
}

interface SerializableAuthor {
  id: number | string
  name?: string | null
  avatar?: {
    id: number | string
    url: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  title?: string | null
  bio?: string | null
}

const AuthorReviewSection: React.FC<AuthorReviewSectionProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  // Safely extract author data
  const authors = (post.populatedAuthors as SerializableAuthor[]) || []
  const hasAuthors = authors && authors.length > 0
  const author = hasAuthors ? authors[0] : null

  // Type guard for avatar URL
  const getAvatarUrl = (avatar: SerializableAuthor['avatar']): string | null => {
    if (avatar && typeof avatar === 'object' && avatar.url) {
      return avatar.url
    }
    return null
  }

  // Get dates
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null
  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null

  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="author-review-banner">
      <div className="banner-background">
        <div className="banner-pattern"></div>
      </div>

      <div className="banner-content">
        {/* Author Profile Section */}
        <div className="author-profile-section">
          <div className="author-avatar-large">
            {author && author.avatar && getAvatarUrl(author.avatar) ? (
              <img
                src={getAvatarUrl(author.avatar) || ''}
                alt={author.name || 'Author'}
                className="author-avatar-img"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const placeholder = target.nextElementSibling as HTMLElement
                  if (placeholder) {
                    placeholder.classList.remove('hidden')
                  }
                }}
              />
            ) : null}
            <div
              className={`author-avatar-placeholder-large ${
                author && author.avatar && getAvatarUrl(author.avatar) ? 'hidden' : ''
              }`}
            >
              <svg className="avatar-icon-large" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="author-details">
            <div className="author-header">
              <h3 className="author-name-large">
                {author ? author.name || 'Dr. Rahul' : 'Dr. Rahul'}
              </h3>
              <div className="author-credentials-container">
                {author && author.title ? (
                  <span className="author-credentials">{author.title}</span>
                ) : (
                  <span className="author-credentials">Medical Expert</span>
                )}
              </div>
            </div>

            {/* Description - only shown when expanded */}
            {isExpanded && (
              <>
                {author && author.bio ? (
                  <p className="author-bio">{author.bio}</p>
                ) : (
                  <p className="author-bio">
                    Experienced healthcare professional committed to providing accurate,
                    evidence-based health information to help you make informed decisions about your
                    wellness.
                  </p>
                )}
              </>
            )}

            <div className="author-meta">
              <div className="publication-info">
                {publishedDate && (
                  <div className="meta-item">
                    <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="meta-text">Published 08/15/2025</span>
                  </div>
                )}

                {updatedDate && publishedDate && updatedDate > publishedDate && (
                  <div className="meta-item">
                    <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="meta-text">Updated 08/15/2025</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Quality Section */}
        <div className="credibility-section">
          <div className="trust-indicators">
            <div className="trust-header-with-arrow">
              <h4 className="credibility-title">Trust & Quality</h4>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="expand-button"
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                <svg
                  className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Trust badges - only shown when expanded */}
            {isExpanded && (
              <div className="trust-badges-grid">
                <div className="trust-badge-large medically-cited">
                  <div className="badge-icon-container green">
                    <svg className="badge-icon-lg" fill="white" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="badge-content">
                    <span className="badge-title">Medically Cited</span>
                    <span className="badge-description">
                      All claims backed by scientific research
                    </span>
                  </div>
                </div>

                <div className="trust-badge-large fact-checked">
                  <div className="badge-icon-container blue">
                    <svg className="badge-icon-lg" fill="white" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="badge-content">
                    <span className="badge-title">Fact Checked</span>
                    <span className="badge-description">Verified by medical professionals</span>
                  </div>
                </div>

                <div className="trust-badge-large peer-reviewed">
                  <div className="badge-icon-container purple">
                    <svg className="badge-icon-lg" fill="white" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="badge-content">
                    <span className="badge-title">Expert Reviewed</span>
                    <span className="badge-description">Reviewed by healthcare experts</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorReviewSection
