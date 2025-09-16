'use client'

import React from 'react'

// Simple utility function to combine class names
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

export interface CustomCTABlockProps {
  buttonText?: string
  buttonLink?: string
  disableInnerContainer?: boolean
  className?: string
}

// Gradient Pulse Button Component
interface GradientPulseButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const SimpleGradientButton: React.FC<GradientPulseButtonProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{ textDecoration: 'none !important' }}
      className={cn(
        // Base styles
        'inline-block text-center min-w-[200px] px-10 py-4 rounded-full',
        'text-lg font-bold text-white',
        // Remove all text decorations - comprehensive approach
        'no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline',
        'decoration-none hover:decoration-none focus:decoration-none active:decoration-none',
        '[text-decoration:none!important] hover:[text-decoration:none!important]',
        // Blue gradient background matching site theme
        'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800',
        // Blue shadow to match theme
        'shadow-[0_8px_15px_rgba(29,78,216,0.3)]',
        // Simple hover effect with blue shadow - no animations
        'hover:shadow-[0_12px_20px_rgba(29,78,216,0.4)]',
        // Focus states for accessibility with blue theme
        'focus:outline-none focus:ring-4 focus:ring-blue-300/50',
        // Ensure text is always white
        '!text-white',
        className,
      )}
    >
      {children}
    </a>
  )
}

export const CustomCTABlock: React.FC<CustomCTABlockProps> = ({
  buttonText = 'Get Your Supplement Now',
  buttonLink = '#',
  disableInnerContainer = false,
  className = '',
}) => {
  return (
    <div className={`custom-cta-block ${className}`}>
      <div className={disableInnerContainer ? '' : 'container mx-auto px-4'}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Button */}
          <SimpleGradientButton href={buttonLink}>💊 {buttonText}</SimpleGradientButton>
        </div>
      </div>
    </div>
  )
}
