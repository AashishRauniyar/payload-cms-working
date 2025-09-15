import React from 'react'
import { Check, AlertTriangle } from 'lucide-react'

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
  prosTitle = 'What We Love',
  consTitle = 'Minor Drawbacks',
  tableData,
  backgroundColor = 'gray',
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
    {
      point:
        'Exceptional Audio Quality - Crystal clear highs, rich mids, and deep bass that rivals $400+ headphones',
    },
    { point: 'Incredible Comfort - Wore for 8+ hours without discomfort during work sessions' },
    {
      point:
        'Outstanding Battery Life - Actually delivers 40+ hours with ANC on - exceeded expectations',
    },
  ]

  const defaultCons = [
    {
      point:
        'Slightly Bulky for Travel - Larger than ultra-portable options, but case helps with storage',
    },
    {
      point:
        'App Could Be Better - Mobile app works but interface feels dated compared to competitors',
    },
    {
      point: 'Limited Color Options - Only available in black and silver - would love more variety',
    },
  ]

  // Process table data to extract pros and cons, or use defaults
  const { pros: parsedPros, cons: parsedCons } = tableData
    ? parseProsCons(tableData)
    : { pros: [], cons: [] }
  const prosData = parsedPros.length > 0 ? parsedPros : defaultPros
  const consData = parsedCons.length > 0 ? parsedCons : defaultCons

  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  // Split point into title and description
  const formatPoint = (point: string) => {
    const parts = point.split(' - ')
    if (parts.length > 1) {
      return {
        title: parts[0],
        description: parts.slice(1).join(' - '),
      }
    }
    return {
      title: point,
      description: '',
    }
  }

  const content = (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6">
        {/* What We Love Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-green-600">{prosTitle}</div>
          </div>

          <div className="space-y-4">
            {prosData.map((item, index) => {
              const formatted = formatPoint(item.point)
              return (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{formatted.title}</div>
                    {formatted.description && (
                      <p className="text-gray-600 text-xs leading-relaxed mt-1">
                        {formatted.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Minor Drawbacks Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-orange-600">{consTitle}</div>
          </div>

          <div className="space-y-4">
            {consData.map((item, index) => {
              const formatted = formatPoint(item.point)
              return (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{formatted.title}</div>
                    {formatted.description && (
                      <p className="text-gray-600 text-xs leading-relaxed mt-1">
                        {formatted.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section className={`${backgroundClasses[backgroundColor]} ${className}`}>
        {title && <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{title}</h2>}
        {content}
      </section>
    )
  }

  return (
    <section className={`${backgroundClasses[backgroundColor]} ${className}`}>
      {title && <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{title}</h2>}
      {content}
    </section>
  )
}
