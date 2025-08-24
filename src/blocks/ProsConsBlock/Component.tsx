import React from 'react'

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
    default: 'grid md:grid-cols-2 gap-4',
    stacked: 'space-y-4',
    cards: 'grid md:grid-cols-2 gap-4',
    table: '',
  }

  // const prosCardClasses = {
  //   default:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   stacked:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   cards:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   table: '',
  // }

  // const consCardClasses = {
  //   default:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   stacked:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   cards:
  //     'border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200',
  //   table: '',
  // }

  // Render table format
  if (style === 'table') {
    const maxRows = Math.max(processedPros.length, processedCons.length)

    const content = (
      <div className={containerClasses[style]}>
        <table className="w-full">
          <thead className="bg-transparent border-b border-gray-200">
            <tr>
              <th className="px-0 py-2 text-left font-semibold text-green-700 align-middle border-0">
                <div className="flex items-center">
                  <img src="/images/pros.png" alt="Pros" className="h-14 md:h-16 w-auto mr-3" />
                  <span className="text-2xl md:text-3xl">{prosTitle}</span>
                </div>
              </th>
              <th className="px-0 py-2 text-left font-semibold text-red-700 align-middle border-0">
                <div className="flex items-center">
                  <img src="/images/cons.png" alt="Cons" className="h-14 md:h-16 w-auto mr-3" />
                  <span className="text-2xl md:text-3xl">{consTitle}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }, (_, index) => (
              <tr key={index} className="border-0">
                <td className="px-0 py-2 text-gray-700 align-top border-0">
                  {processedPros[index] ? (
                    <div className="flex items-start">
                      <img
                        src="/images/tick.png"
                        alt="Tick"
                        className="w-4 h-4 mt-1 mr-2 flex-shrink-0"
                      />
                      {processedPros[index].point}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-0 py-2 text-gray-700 align-top border-0">
                  {processedCons[index] ? (
                    <div className="flex items-start">
                      <img
                        src="/images/cross.png"
                        alt="Cross"
                        className="w-4 h-4 mt-1 mr-2 flex-shrink-0"
                      />
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
        <section className={`py-4 px-0 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
          {title && <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{title}</h2>}
          {content}
        </section>
      )
    }

    return (
      <section className={`py-0 px-0 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        <div className="max-w-6xl mx-auto">
          {title && <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{title}</h2>}
          {content}
        </div>
      </section>
    )
  }

  // Original content for other styles
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pros Card */}
      <div
        className="relative bg-white rounded-3xl p-8 pt-16 min-h-[480px]"
        style={{ border: '4px solid #22C55E' }}
      >
        {/* Circular Header Badge */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-sm"
            style={{ backgroundColor: '#22C55E' }}
          >
            <div className="flex items-center space-x-1">
              <span className="text-white font-bold text-sm tracking-wide">{prosTitle}</span>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Rows */}
        <div className="space-y-6">
          {/* Render actual pros */}
          {processedPros.slice(0, 6).map((pro, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#22C55E' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 ml-4" style={{ backgroundColor: '#D1D5DB' }}></div>
            </div>
          ))}

          {/* Fill remaining slots to ensure 6 rows */}
          {Array.from({ length: Math.max(0, 6 - processedPros.length) }, (_, index) => (
            <div key={`empty-pros-${index}`} className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#22C55E' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 ml-4" style={{ backgroundColor: '#D1D5DB' }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cons Card */}
      <div
        className="relative bg-white rounded-3xl p-8 pt-16 min-h-[480px]"
        style={{ border: '4px solid #EF4444' }}
      >
        {/* Circular Header Badge */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-sm"
            style={{ backgroundColor: '#EF4444' }}
          >
            <div className="flex items-center space-x-1">
              <span className="text-white font-bold text-sm tracking-wide">{consTitle}</span>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Rows */}
        <div className="space-y-6">
          {/* Render actual cons */}
          {processedCons.slice(0, 6).map((con, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#EF4444' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 ml-4" style={{ backgroundColor: '#D1D5DB' }}></div>
            </div>
          ))}

          {/* Fill remaining slots to ensure 6 rows */}
          {Array.from({ length: Math.max(0, 6 - processedCons.length) }, (_, index) => (
            <div key={`empty-cons-${index}`} className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#EF4444' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 ml-4" style={{ backgroundColor: '#D1D5DB' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return (
      <section className={`py-12 px-0 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
        {title && <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>}
        {content}
      </section>
    )
  }

  return (
    <section className={`py-12 px-0 ${backgroundClasses[backgroundColor]} ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>}
        {content}
      </div>
    </section>
  )
}
