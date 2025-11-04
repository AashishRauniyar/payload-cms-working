'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent, trackPageView, isGAEnabled } from '@/utilities/analytics'

/**
 * Hook for Google Analytics tracking
 */
export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route changes
  useEffect(() => {
    if (!isGAEnabled()) return

    const searchParamsString = searchParams.toString()
    const url = pathname + (searchParamsString ? `?${searchParamsString}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return {
    trackEvent,
    trackPageView,
    isEnabled: isGAEnabled(),
  }
}

/**
 * Hook for tracking specific events
 */
export function useTrackEvent() {
  return {
    // Common event tracking functions
    trackClick: (elementName: string, additionalData?: Record<string, any>) => {
      trackEvent({
        action: 'click',
        category: 'engagement',
        label: elementName,
        custom_parameters: additionalData,
      })
    },

    trackFormSubmit: (formName: string, success = true) => {
      trackEvent({
        action: success ? 'submit_success' : 'submit_error',
        category: 'form',
        label: formName,
      })
    },

    trackFileDownload: (fileName: string, fileType?: string) => {
      trackEvent({
        action: 'download',
        category: 'file',
        label: fileName,
        custom_parameters: {
          file_type: fileType,
        },
      })
    },

    trackVideoPlay: (videoName: string, duration?: number) => {
      trackEvent({
        action: 'play',
        category: 'video',
        label: videoName,
        value: duration,
      })
    },

    trackScrollDepth: (percentage: number, page: string) => {
      trackEvent({
        action: 'scroll',
        category: 'engagement',
        label: page,
        value: percentage,
      })
    },

    trackSearch: (searchTerm: string, resultsCount?: number) => {
      trackEvent({
        action: 'search',
        category: 'search',
        label: searchTerm,
        value: resultsCount,
      })
    },

    trackCustomEvent: trackEvent,
  }
}
