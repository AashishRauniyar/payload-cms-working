import React from 'react'

// Custom layout for the landing page without default header/footer
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className="landing-page">{children}</div>
}
