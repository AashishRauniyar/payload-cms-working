import LandingPage from '../landing/page'
import type { Metadata } from 'next'

export default LandingPage

export const metadata: Metadata = {
  title: 'Consumer Health Digest - Trusted Reviews, Honest Ratings and Quality Advice',
  description:
    'Your premier source for evidence-based health and wellness information and unbiased product reviews. Get trusted advice from medical experts.',
  keywords:
    'health reviews, wellness, product reviews, supplements, medical advice, health information',
  openGraph: {
    title: 'Consumer Health Digest - Trusted Health Reviews',
    description:
      'Evidence-based health information and unbiased product reviews from medical experts.',
    type: 'website',
  },
}
