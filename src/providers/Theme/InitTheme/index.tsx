import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Force light mode only - ignore user preferences and system theme
    var themeToSet = 'light'
    
    // Set the theme attribute
    document.documentElement.setAttribute('data-theme', themeToSet)
    
    // Also set in localStorage to maintain consistency
    window.localStorage.setItem('${themeLocalStorageKey}', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
