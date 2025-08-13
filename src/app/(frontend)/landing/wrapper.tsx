'use client'
import React, { useEffect } from 'react'
import LandingPageComponent from './page'

export default function LandingPageWrapper() {
  useEffect(() => {
    // Hide header and footer for landing page by targeting common selectors
    const hideElements = () => {
      // Try multiple selectors to find header and footer
      const headerSelectors = ['header', '[data-testid="header"]', '.header', 'nav']
      const footerSelectors = ['footer', '[data-testid="footer"]', '.footer']

      headerSelectors.forEach((selector) => {
        const element = document.querySelector(selector)
        if (element && element !== document.querySelector('.landing-page header')) {
          ;(element as HTMLElement).style.display = 'none'
        }
      })

      footerSelectors.forEach((selector) => {
        const element = document.querySelector(selector)
        if (element && element !== document.querySelector('.landing-page footer')) {
          ;(element as HTMLElement).style.display = 'none'
        }
      })
    }

    // Hide elements immediately and after a brief delay to catch dynamically loaded content
    hideElements()
    const timer = setTimeout(hideElements, 100)

    return () => {
      clearTimeout(timer)
      // Restore elements
      const headerSelectors = ['header', '[data-testid="header"]', '.header', 'nav']
      const footerSelectors = ['footer', '[data-testid="footer"]', '.footer']

      headerSelectors.forEach((selector) => {
        const element = document.querySelector(selector)
        if (element) {
          ;(element as HTMLElement).style.display = ''
        }
      })

      footerSelectors.forEach((selector) => {
        const element = document.querySelector(selector)
        if (element) {
          ;(element as HTMLElement).style.display = ''
        }
      })
    }
  }, [])

  return (
    <div className="landing-page-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      <LandingPageComponent />
    </div>
  )
}
