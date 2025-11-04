'use client'

import { useCallback } from 'react'
import { trackEvent, type AnalyticsEvent } from '@/utilities/analytics'

/**
 * Hook for easy event tracking with Google Analytics
 * Provides optimized event tracking with automatic debouncing
 */
export function useTrackEvent() {
  const track = useCallback((event: AnalyticsEvent) => {
    trackEvent(event)
  }, [])

  // Convenience methods for common events
  const trackClick = useCallback(
    (elementName: string, additionalParams?: Record<string, any>) => {
      track({
        action: 'click',
        category: 'engagement',
        label: elementName,
        ...additionalParams,
      })
    },
    [track],
  )

  const trackFormSubmission = useCallback(
    (formName: string, success: boolean = true) => {
      track({
        action: success ? 'form_submit_success' : 'form_submit_error',
        category: 'form',
        label: formName,
        value: success ? 1 : 0,
      })
    },
    [track],
  )

  const trackSearch = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      track({
        action: 'search',
        category: 'engagement',
        label: searchTerm,
        value: resultsCount,
      })
    },
    [track],
  )

  const trackDownload = useCallback(
    (fileName: string, fileType?: string) => {
      track({
        action: 'download',
        category: 'engagement',
        label: fileName,
        custom_parameters: {
          file_type: fileType,
        },
      })
    },
    [track],
  )

  const trackVideoPlay = useCallback(
    (videoTitle: string, duration?: number) => {
      track({
        action: 'video_play',
        category: 'media',
        label: videoTitle,
        value: duration,
      })
    },
    [track],
  )

  const trackSocialShare = useCallback(
    (platform: string, contentType: string) => {
      track({
        action: 'share',
        category: 'social',
        label: platform,
        custom_parameters: {
          content_type: contentType,
        },
      })
    },
    [track],
  )

  return {
    track,
    trackClick,
    trackFormSubmission,
    trackSearch,
    trackDownload,
    trackVideoPlay,
    trackSocialShare,
  }
}
