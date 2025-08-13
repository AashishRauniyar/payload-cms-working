'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import the Header and Footer to avoid SSR issues
const HeaderComponent = dynamic(
  () => import('@/Header/Component').then((mod) => ({ default: mod.Header })),
  {
    ssr: false,
    loading: () => <div style={{ height: '80px' }} />,
  },
)

const FooterComponent = dynamic(
  () => import('@/Footer/Component').then((mod) => ({ default: mod.Footer })),
  {
    ssr: false,
    loading: () => <div />,
  },
)

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  if (isLandingPage) {
    return <>{children}</>
  }

  return (
    <>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </>
  )
}
