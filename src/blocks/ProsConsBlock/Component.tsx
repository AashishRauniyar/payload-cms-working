import React from 'react'
import { Check, X } from 'lucide-react'
import './styles.css'

interface ProsConsItem {
  point: string
}

interface ProsConsTableProps {
  title?: string
  prosTitle?: string
  consTitle?: string
  tableData?: string
  backgroundColor?: 'none' | 'gray' | 'blue' | 'green'
  disableInnerContainer?: boolean
  className?: string
}

export function ProsConsBlock({
  title,
  prosTitle = 'PROS',
  consTitle = 'CONS',
  tableData,
  backgroundColor = 'none',
  disableInnerContainer = false,
  className = '',
}: ProsConsTableProps) {
  // Function to parse markdown table for pros/cons
  const parseProsCons = (markdown: string) => {
    if (!markdown) return { pros: [], cons: [] }

    const lines = markdown
      .trim()
      .split('\n')
      .filter((line) => line.trim())

    if (lines.length < 2) return { pros: [], cons: [] }

    // Skip header and separator lines
    const dataLines = lines.slice(2)

    const pros: ProsConsItem[] = []
    const cons: ProsConsItem[] = []

    dataLines.forEach((line) => {
      const cells = line
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell)

      if (cells.length >= 2) {
        // First column is pros, second column is cons
        if (cells[0] && cells[0] !== '-' && cells[0] !== '') {
          pros.push({ point: cells[0] })
        }
        if (cells[1] && cells[1] !== '-' && cells[1] !== '') {
          cons.push({ point: cells[1] })
        }
      }
    })

    return { pros, cons }
  }

  // Default data if no tableData provided
  const defaultPros = [
    { point: 'Supports liver detox, digestion, and energy in one formula.' },
    { point: 'Made with 14 plant-based ingredients backed by science.' },
    { point: 'Only two capsules are needed per day.' },
    { point: 'Vegan, non-GMO, and free from major allergens.' },
    { point: 'Third-party tested for quality and purity.' },
    { point: 'Backed with a 90-day satisfaction guarantee.' },
  ]

  const defaultCons = [
    { point: 'Only sold through the official Snap Supplements website.' },
    { point: 'It goes out of stock fast, due to high demand.' },
  ]

  // Process table data to extract pros and cons, or use defaults
  const { pros: parsedPros, cons: parsedCons } = tableData
    ? parseProsCons(tableData)
    : { pros: [], cons: [] }
  const prosData = parsedPros.length > 0 ? parsedPros : defaultPros
  const consData = parsedCons.length > 0 ? parsedCons : defaultCons

  const backgroundClasses = {
    none: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  const content = (
    <div className="pros-cons-container w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      {/* Title - Responsive Typography */}
      {title && (
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 text-gray-800 px-4">
          {title}
        </h2>
      )}

      {/* Cards Container - Responsive Grid */}
      <div className="pros-cons-grid grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
        {/* PROS Card */}
        <div className="relative order-1 lg:order-1">
          {/* Card Container - Responsive Padding */}
          <div className="pros-cons-card bg-white border-2 border-green-400 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 pt-12 sm:pt-14 lg:pt-16 relative shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header Circle - Responsive Sizing */}
            <div className="pros-cons-header-circle absolute -top-8 sm:-top-10 lg:-top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white border-3 sm:border-4 border-green-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
                    strokeWidth={3}
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                {prosTitle}
              </div>
            </div>

            {/* Content - Responsive Spacing */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 mt-2 sm:mt-4">
              {prosData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg flex-1 break-words items-center">
                    {item.point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONS Card */}
        <div className="relative order-2 lg:order-2">
          {/* Card Container - Responsive Padding */}
          <div className="pros-cons-card bg-white border-2 border-red-400 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 pt-12 sm:pt-14 lg:pt-16 relative shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header Circle - Responsive Sizing */}
            <div className="pros-cons-header-circle absolute -top-8 sm:-top-10 lg:-top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white border-3 sm:border-4 border-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                {consTitle}
              </div>
            </div>

            {/* Content - Responsive Spacing */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 mt-2 sm:mt-4">
              {consData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <X
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg flex-1 break-words">
                    {item.point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section
        className={`${backgroundClasses[backgroundColor]} py-6 sm:py-8 lg:py-12 xl:py-16 px-2 sm:px-4 lg:px-6 xl:px-8 ${className}`}
      >
        {content}
      </section>
    )
  }

  return (
    <section
      className={`${backgroundClasses[backgroundColor]} py-6 sm:py-8 lg:py-12 xl:py-16 px-2 sm:px-4 lg:px-6 xl:px-8 ${className}`}
    >
      {content}
    </section>
  )
}
