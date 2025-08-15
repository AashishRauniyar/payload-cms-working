'use client'

import React from 'react'

export interface CustomCTABlockProps {
  ctaText?: string
  buttonText?: string
  buttonLink?: string
  disableInnerContainer?: boolean
  className?: string
}

export const CustomCTABlock: React.FC<CustomCTABlockProps> = ({
  ctaText = "Ready to Transform Your Health?",
  buttonText = "Get Your Supplement Now",
  buttonLink = "#",
  disableInnerContainer = false,
  className = '',
}) => {
  return (
    <div className={`custom-cta-block ${className}`}>
      <div className={disableInnerContainer ? '' : 'container mx-auto px-4'}>
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 p-8 md:p-12 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Health Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>

              {/* CTA Text */}
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {ctaText}
              </div>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands who've already discovered the natural path to better health and vitality.
              </p>

              {/* Animated CTA Button */}
              <div className="relative inline-block">
                <a
                  href={buttonLink}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-emerald-600 bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center space-x-3">
                    {/* Pulse Animation Circle */}
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping group-hover:bg-white"></div>
                    </div>
                    
                    <span className="group-hover:text-white transition-colors duration-300">
                      {buttonText}
                    </span>
                    
                    {/* Arrow Icon */}
                    <svg 
                      className="w-5 h-5 text-emerald-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>

                {/* Button Glow Effect */}
                <div className="absolute inset-0 -m-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 mt-8 text-white/80">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">FDA Approved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">30-Day Guarantee</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">10K+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
