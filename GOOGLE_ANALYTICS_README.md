# Google Analytics Implementation Guide

## Overview

This Payload CMS Next.js project now includes a comprehensive Google Analytics 4 (GA4) implementation using Next.js 15's `@next/third-parties` package for optimal performance.

## Files Added/Modified

### Core Analytics Files

1. **`src/components/GoogleAnalytics.tsx`** - Custom GA component with development mode handling
2. **`src/utilities/analytics.ts`** - Core analytics utilities and tracking functions
3. **`src/hooks/useAnalytics.ts`** - React hook for automatic page view tracking
4. **`src/hooks/useTrackEvent.ts`** - React hook for easy event tracking
5. **`src/hooks/index.ts`** - Export file for analytics hooks

### Modified Files

1. **`src/app/(frontend)/layout.tsx`** - Added GoogleAnalytics component
2. **`.env`** - Added GA_ID configuration (placeholder)

## Setup Instructions

### 1. Google Analytics Configuration

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use existing one
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Update your `.env` file:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 2. Environment Variables

- **Development**: GA loads but doesn't track (console logs instead)
- **Production**: Full GA tracking enabled
- **No GA_ID**: Component gracefully handles missing configuration

### 3. Usage Examples

#### Automatic Page Tracking

```tsx
// Already implemented in layout.tsx
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
```

#### Manual Event Tracking

```tsx
'use client'
import { useTrackEvent } from '@/hooks'

export function MyComponent() {
  const { trackClick, trackFormSubmission } = useTrackEvent()

  const handleButtonClick = () => {
    trackClick('header-cta-button')
  }

  const handleFormSubmit = async (formData) => {
    try {
      await submitForm(formData)
      trackFormSubmission('newsletter', true)
    } catch (error) {
      trackFormSubmission('newsletter', false)
    }
  }

  return <button onClick={handleButtonClick}>Track This Click</button>
}
```

#### Custom Event Tracking

```tsx
import { useTrackEvent } from '@/hooks'

const { track } = useTrackEvent()

track({
  action: 'video_play',
  category: 'engagement',
  label: 'product-demo-video',
  value: 120, // video duration in seconds
})
```

## Available Tracking Methods

### useTrackEvent Hook Methods

- `track(event)` - Generic event tracking
- `trackClick(elementName)` - Button/link clicks
- `trackFormSubmission(formName, success)` - Form submissions
- `trackSearch(searchTerm, resultsCount)` - Search events
- `trackDownload(fileName, fileType)` - File downloads
- `trackVideoPlay(videoTitle, duration)` - Video interactions
- `trackSocialShare(platform, contentType)` - Social sharing

### Direct Analytics Functions

- `trackEvent(event)` - Core event tracking
- `trackPageView(url, title)` - Manual page views
- `trackConversion(conversionId, value)` - Conversion tracking
- `isGAEnabled()` - Check if GA is active

## Performance Features

### Optimizations Included

1. **Next.js Third Parties**: Uses `@next/third-parties/google` for optimal loading
2. **Development Mode**: Disabled tracking in development with console logging
3. **Error Handling**: Graceful handling of missing GA configuration
4. **TypeScript**: Full type safety for all analytics functions
5. **Tree Shaking**: Only loads GA when enabled

### No Partytown Required

The `@next/third-parties` package provides sufficient optimization without the deprecated Partytown package.

## Development vs Production

### Development Mode (`NODE_ENV !== 'production'`)

- GA script doesn't load
- All tracking calls log to console
- No actual data sent to Google Analytics
- Perfect for testing implementation

### Production Mode

- Full GA4 tracking enabled
- Real-time data collection
- All events and page views tracked

## Common Integration Points

### Customer Review Form

```tsx
// Example integration in CustomerReviewForm
import { useTrackEvent } from '@/hooks'

export function CustomerReviewForm() {
  const { trackFormSubmission } = useTrackEvent()

  const handleSubmit = async (formData) => {
    try {
      await submitReview(formData)
      trackFormSubmission('customer-review', true)
    } catch (error) {
      trackFormSubmission('customer-review', false)
    }
  }

  // ... rest of component
}
```

### E-commerce Tracking

```tsx
// Track purchases
track({
  action: 'purchase',
  category: 'ecommerce',
  label: 'product-name',
  value: 99.99,
  custom_parameters: {
    currency: 'USD',
    items: ['item1', 'item2'],
  },
})
```

## Testing Your Implementation

### 1. Development Testing

1. Start your development server
2. Open browser console
3. Navigate between pages - you should see console logs
4. Trigger events - check for tracking logs

### 2. Production Testing

1. Deploy to production with real GA_ID
2. Use Google Analytics DebugView
3. Install Google Analytics Debugger browser extension
4. Verify events in GA4 real-time reports

## Troubleshooting

### Common Issues

1. **No tracking in development**: Expected behavior for privacy
2. **Events not showing**: Check GA_ID format and environment
3. **Console errors**: Verify all imports and GA_ID configuration

### Debug Commands

```javascript
// Check if GA is loaded
console.log(typeof window.gtag)

// Check environment
console.log(process.env.NODE_ENV)
console.log(process.env.NEXT_PUBLIC_GA_ID)
```

## Security & Privacy

### GDPR Compliance

- Consider adding cookie consent before loading GA
- GA only loads in production with explicit configuration
- No tracking in development protects developer privacy

### Data Collection

- Only collects standard GA4 data
- No personally identifiable information in custom events
- Respects user privacy settings

## Next Steps

1. **Replace placeholder GA_ID** with your actual Measurement ID
2. **Test in production** to verify tracking works
3. **Add custom events** throughout your application
4. **Set up GA4 goals** for conversion tracking
5. **Configure audiences** for retargeting campaigns

## Support

For questions about this implementation:

1. Check Google Analytics documentation
2. Review Next.js third-parties documentation
3. Examine the TypeScript types for proper usage
4. Test with browser console for debugging
