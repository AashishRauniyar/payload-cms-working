/**
 * Google Analytics utility functions
 */

// Type definitions for analytics events
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Get the Google Analytics ID from environment variables
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Check if Google Analytics is enabled
export const isGAEnabled = (): boolean => {
  return !!GA_ID && typeof window !== 'undefined'
}

// Custom event tracking
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isGAEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GA Event (Development):', event)
    }
    return
  }

  try {
    // Use gtag if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const { action, category, label, value, custom_parameters } = event
      ;(window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters,
      })
    }
  } catch (error) {
    console.warn('Error tracking Google Analytics event:', error)
  }
}

// Page view tracking (useful for SPA navigation)
export const trackPageView = (url: string, title?: string): void => {
  if (!isGAEnabled()) return

  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('config', GA_ID, {
        page_location: url,
        page_title: title,
      })
    }
  } catch (error) {
    console.warn('Error tracking Google Analytics page view:', error)
  }
}

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number): void => {
  if (!isGAEnabled()) return

  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
      })
    }
  } catch (error) {
    console.warn('Error tracking Google Analytics conversion:', error)
  }
}

// Custom dimension tracking
export const setCustomDimension = (index: number, value: string): void => {
  if (!isGAEnabled()) return

  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('config', GA_ID, {
        [`custom_map.dimension${index}`]: value,
      })
    }
  } catch (error) {
    console.warn('Error setting Google Analytics custom dimension:', error)
  }
}
