'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'

interface GoogleAnalyticsProps {
  gaId: string
  debugMode?: boolean
}

export function GoogleAnalytics({ gaId, debugMode = false }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Only load in production unless debug mode is enabled
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (isDevelopment && !debugMode) {
      console.log('Google Analytics disabled in development mode')
      return
    }

    if (!gaId || gaId === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics ID not configured properly')
      return
    }

    // Log successful initialization
    console.log(`Google Analytics initialized with ID: ${gaId}`)
  }, [gaId, debugMode])

  // Don't render in development unless debug mode is enabled
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && !debugMode) {
    return null
  }

  // Don't render if GA ID is not properly configured
  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    return null
  }

  return <NextGoogleAnalytics gaId={gaId} />
}

export default GoogleAnalytics
