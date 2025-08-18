import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface ProsConsItem {
  point: string
}

interface ProsConsBlockProps {
  title?: string
  prosTitle: string
  consTitle: string
  tableData: string
  style: 'default' | 'stacked' | 'cards' | 'table'
  backgroundColor: 'none' | 'gray' | 'blue' | 'green'
  disableInnerContainer?: boolean
  className?: string
}

export const ProsConsBlock: React.FC<ProsConsBlockProps> = ({
  title,
  prosTitle,
  consTitle,
  tableData,
  style,
  backgroundColor,
  disableInnerContainer,
  className,
}) => {
  // Function to parse markdown table for pros/cons
  const parseProsCons = (markdown: string) => {
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

  // Process table data to extract pros and cons
  const { pros: processedPros, cons: processedCons } = parseProsCons(tableData || '')
  const backgroundClasses = {
    none: '',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  const containerClasses = {
    default: 'grid md:grid-cols-2 gap-6',
    stacked: 'space-y-6',
    cards: 'grid md:grid-cols-2 gap-5',
    table: '',
  }

  const prosCardClasses = {
    default: 'bg-white rounded-lg p-6 border-l-4 border-green-500',
    stacked: 'bg-white rounded-lg p-6 border-l-4 border-green-500',
    cards: 'bg-white rounded-xl p-6 shadow-lg border border-green-100',
    table: '',
  }

  const consCardClasses = {
    default: 'bg-white rounded-lg p-6 border-l-4 border-red-500',
    stacked: 'bg-white rounded-lg p-6 border-l-4 border-red-500',
    cards: 'bg-white rounded-xl p-6 shadow-lg border border-red-100',
    table: '',
  }

  // Render table format
  if (style === 'table') {
    const maxRows = Math.max(processedPros.length, processedCons.length)

    const content = (
      <div className={containerClasses[style]}>
        <table className="w-full">
          <thead className="bg-transparent">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-green-700 align-middle border-0">
                <div className="flex items-center">
                  <img src="/images/pros.png" alt="Pros" className="h-16 md:h-20 w-auto mr-4" />
                  <span className="text-2xl md:text-3xl">{prosTitle}</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-red-700 align-middle border-0">
                <div className="flex items-center">
                  <img src="/images/cons.png" alt="Cons" className="h-16 md:h-20 w-auto mr-4" />
                  <span className="text-2xl md:text-3xl">{consTitle}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }, (_, index) => (
              <tr key={index} className="border-0">
                <td className="px-6 py-3 text-gray-700 align-top border-0">
                  {processedPros[index] ? (
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {processedPros[index].point}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-3 text-gray-700 align-top border-0">
                  {processedCons[index] ? (
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {processedCons[index].point}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

    if (disableInnerContainer) {
      return (
        <section className={`py-12 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
          {title && <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">{title}</h2>}
          {content}
        </section>
      )
    }

    return (
      <section className={`py-0 px-0 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        <div className="max-w-6xl mx-auto">
          {title && <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>}
          {content}
        </div>
      </section>
    )
  }

  // Original content for other styles
  const content = (
    <div className={containerClasses[style]}>
      {/* Pros Section */}
      <div className={prosCardClasses[style]}>
        <div className="flex items-center mb-3">
          <img src="/images/pros.png" alt="Pros" className="h-12 md:h-14 w-auto mr-3" />
          <h3 className="text-2xl font-semibold text-green-700">{prosTitle}</h3>
        </div>
        <ul className="space-y-3">
          {processedPros.map((pro, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 leading-relaxed">{pro.point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Section */}
      <div className={consCardClasses[style]}>
        <div className="flex items-center mb-3">
          <img src="/images/cons.png" alt="Cons" className="h-12 md:h-14 w-auto mr-3" />
          <h3 className="text-2xl font-semibold text-red-700">{consTitle}</h3>
        </div>
        <ul className="space-y-3">
          {processedCons.map((con, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 leading-relaxed">{con.point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section className={`py-6 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        {title && <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h2>}
        {content}
      </section>
    )
  }

  return (
    <section className={`py-6 px-4 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h2>}
        {content}
      </div>
    </section>
  )
}
