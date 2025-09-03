'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  [key: string]: any
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isOptimizationError, setIsOptimizationError] = useState(false)

  // Check if filename has problematic characters
  const hasProblematicChars = /[()[\]{}\s%]/.test(src)

  // If the image has problematic characters or we've had optimization errors, use unoptimized
  const shouldUseUnoptimized = hasProblematicChars || isOptimizationError

  const handleError = () => {
    if (!isOptimizationError && !shouldUseUnoptimized) {
      // First error - try unoptimized
      setIsOptimizationError(true)
    } else {
      // Second error - mark as completely failed
      setImageError(true)
    }
  }

  const handleLoad = () => {
    // Reset error state on successful load
    setImageError(false)
  }

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span>Image failed to load</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      unoptimized={shouldUseUnoptimized}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}
