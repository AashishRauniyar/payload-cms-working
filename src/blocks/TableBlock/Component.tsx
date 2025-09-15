import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface TableBlockProps {
  tableTitle?: string
  tableData: string
  tableStyle:
    | 'default'
    | 'striped'
    | 'bordered'
    | 'compact'
    | 'card'
    | 'supplement'
    | 'comparison'
    | 'dosage'
  responsive: 'scroll' | 'stack' | 'hide'
  caption?: string
  disableInnerContainer?: boolean
  className?: string
}

interface TableRow {
  [key: string]: string | number
}

// Function to strip markdown formatting
const stripMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
    .replace(/\*(.*?)\*/g, '$1') // Remove italic *text*
    .replace(/`(.*?)`/g, '$1') // Remove inline code `text`
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough ~~text~~
    .trim()
}

// Function to parse markdown table
const parseMarkdownTable = (markdown: string) => {
  const lines = markdown
    .trim()
    .split('\n')
    .filter((line) => line.trim())

  if (lines.length < 2) return { headers: [], rows: [] }

  // Extract headers
  const headerLine = lines[0]
  const headers = headerLine
    .split('|')
    .map((cell) => stripMarkdown(cell.trim()))
    .filter((cell) => cell)

  // Skip separator line (line with dashes)
  const dataLines = lines.slice(2)

  // Extract rows and convert to objects for easier sorting/filtering
  const rows: TableRow[] = dataLines.map((line) => {
    const cells = line
      .split('|')
      .map((cell) => stripMarkdown(cell.trim()))
      .filter((cell) => cell)

    const rowObj: TableRow = {}
    headers.forEach((header, index) => {
      const cellValue = cells[index] || ''
      // Try to convert to number if it looks like a number
      const numValue = parseFloat(cellValue.replace(/[$,]/g, ''))
      rowObj[header] = !isNaN(numValue) && cellValue.match(/^[\d$,.]+$/) ? numValue : cellValue
    })
    return rowObj
  })

  return { headers, rows }
}

export const TableBlock: React.FC<TableBlockProps> = ({
  tableTitle,
  tableData,
  tableStyle = 'supplement',
  responsive = 'scroll',
  caption,
  className,
  disableInnerContainer,
}) => {
  const { headers, rows } = parseMarkdownTable(tableData || '')

  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredAndSortedRows = useMemo(() => {
    let filteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )

    if (sortConfig) {
      filteredRows.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
        }

        const aStr = String(aValue).toLowerCase()
        const bStr = String(bValue).toLowerCase()

        if (aStr < bStr) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aStr > bStr) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filteredRows
  }, [rows, sortConfig, searchTerm])

  const getSortIcon = (columnName: string) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-500" />
    )
  }

  const formatCellValue = (value: string | number, header: string) => {
    if (typeof value === 'number') {
      // Check if it looks like currency
      if (
        header.toLowerCase().includes('price') ||
        header.toLowerCase().includes('total') ||
        header.toLowerCase().includes('cost')
      ) {
        return `$${value.toFixed(2)}`
      }
      return value.toString()
    }
    return value || '—'
  }

  if (!tableData || !headers.length || !rows.length) {
    return (
      <div className={cn('my-8', className)}>
        <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-amber-800">Table Data Required</h3>
              <p className="text-amber-700 mt-1">
                Please ensure your data is in proper markdown table format for optimal display.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const content = (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {tableTitle && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{tableTitle}</h3>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-blue-800 transition-colors select-none"
                    onClick={() => handleSort(header)}
                  >
                    <div className="flex items-center gap-2">
                      {header}
                      {getSortIcon(header)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedRows.map((row, index) => (
                <tr
                  key={index}
                  className={`
                    border-b border-gray-100 transition-all duration-200 cursor-pointer
                    ${hoveredRow === index ? 'bg-blue-50 shadow-sm' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    hover:bg-blue-50 hover:shadow-sm
                  `}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {headers.map((header, cellIndex) => {
                    const value = row[header]
                    const isFirstColumn = cellIndex === 0
                    const isQuantityColumn = header.toLowerCase().includes('quantity')

                    return (
                      <td key={cellIndex} className="px-6 py-4">
                        {isFirstColumn ? (
                          <span className="text-gray-700 font-medium">
                            {formatCellValue(value, header)}
                          </span>
                        ) : isQuantityColumn && typeof value === 'number' ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full">
                            {value}
                          </span>
                        ) : (
                          <span
                            className={`${
                              header.toLowerCase().includes('total') ||
                              header.toLowerCase().includes('price')
                                ? 'text-gray-900 font-bold text-lg'
                                : cellIndex === 1
                                  ? 'text-blue-600 font-semibold'
                                  : 'text-gray-700 font-semibold'
                            }`}
                          >
                            {formatCellValue(value, header)}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredAndSortedRows.length} rows</span>
            {headers.some(
              (h) => h.toLowerCase().includes('total') || h.toLowerCase().includes('price'),
            ) && (
              <span>
                Total:{' '}
                <span className="font-bold text-blue-600">
                  {(() => {
                    const totalHeader =
                      headers.find((h) => h.toLowerCase().includes('total')) ||
                      headers.find((h) => h.toLowerCase().includes('price'))
                    if (totalHeader) {
                      const sum = filteredAndSortedRows.reduce((acc, row) => {
                        const val = row[totalHeader]
                        return acc + (typeof val === 'number' ? val : 0)
                      }, 0)
                      return `$${sum.toFixed(2)}`
                    }
                    return ''
                  })()}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {caption && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center italic font-medium">{caption}</p>
        </div>
      )}

      {/* Enhanced mobile responsive helper */}
      {responsive === 'scroll' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg md:hidden">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0L3 11.414a1 1 0 010-1.414L6.293 6.707a1 1 0 011.414 1.414L5.414 10.5H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium">
              Swipe horizontally to view all table details
            </span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11.5H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )

  if (disableInnerContainer) {
    return <section className={cn(className)}>{content}</section>
  }

  return (
    <section className={cn(className)}>
      <div className="w-full">{content}</div>
    </section>
  )
}
