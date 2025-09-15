import React from 'react'
import { Check, X } from 'lucide-react'

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
    <div className="max-w-7xl w-full mx-auto">
      <div className="grid grid-cols-2 gap-8">
        {/* PROS Card */}
        <div className="relative">
          {/* Card Container */}
          <div className="bg-gray-50 border-2 border-blue-400 rounded-xl p-8 pt-16 relative">
            {/* Header Circle */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-white border-4 border-blue-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                {prosTitle}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 mt-4 flex-1 overflow-y-auto">
              {prosData.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">{item.point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONS Card */}
        <div className="relative">
          {/* Card Container */}
          <div className="bg-gray-50 border-2 border-red-400 rounded-xl p-8 pt-16 relative">
            {/* Header Circle */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-white border-4 border-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                {consTitle}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 mt-4">
              {consData.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-1">
                    <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">{item.point}</p>
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
        className={`${backgroundClasses[backgroundColor]} p-8 flex items-center justify-center ${className}`}
      >
        {title && <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">{title}</h2>}
        {content}
      </section>
    )
  }

  return (
    <section
      className={`${backgroundClasses[backgroundColor]} p-8 flex items-center justify-center ${className}`}
    >
      {title && <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">{title}</h2>}
      {content}
    </section>
  )
}
