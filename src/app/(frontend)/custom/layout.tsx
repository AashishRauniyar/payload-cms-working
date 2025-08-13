import React from 'react'

// Custom layout for non-blog pages to avoid global CSS interference
export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="custom-website">
      {/* This wrapper ensures our custom pages don't inherit blog styles */}
      {children}
    </div>
  )
}
