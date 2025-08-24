import React from 'react'
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

  // Extract rows
  const rows = dataLines.map((line) => {
    return line
      .split('|')
      .map((cell) => stripMarkdown(cell.trim()))
      .filter((cell) => cell)
  })

  return { headers, rows }
}

// Function to detect and convert URLs to clickable links
const renderCellContent = (content: string, isSupplementStyle = false) => {
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g

  // Check if the entire content is a URL
  const isFullURL = urlRegex.test(content) && content.trim().match(urlRegex)?.[0] === content.trim()

  if (isFullURL) {
    return (
      <a
        href={content.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${
          isSupplementStyle
            ? 'text-blue-600 hover:text-blue-700 font-medium'
            : 'text-blue-600 hover:text-blue-800'
        } underline break-all transition-colors duration-200`}
      >
        {content.trim()}
      </a>
    )
  }

  // If content contains URLs but isn't entirely a URL, replace inline URLs
  if (content.match(urlRegex)) {
    const parts = content.split(urlRegex)

    return (
      <>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isSupplementStyle
                    ? 'text-blue-600 hover:text-blue-700 font-medium'
                    : 'text-blue-600 hover:text-blue-800'
                } underline break-all transition-colors duration-200`}
              >
                {part}
              </a>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </>
    )
  }

  // Return plain text if no URLs found
  return content
}

// Enhanced supplement badge component
const SupplementBadge = ({ type }: { type: string }) => {
  const getBadgeStyle = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes('vitamin')) {
      return 'bg-orange-100 text-orange-800 border-orange-200'
    } else if (lowerType.includes('mineral')) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    } else if (lowerType.includes('protein') || lowerType.includes('amino')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    } else if (lowerType.includes('herb') || lowerType.includes('botanical')) {
      return 'bg-green-100 text-green-800 border-green-200'
    } else if (lowerType.includes('probiotic')) {
      return 'bg-pink-100 text-pink-800 border-pink-200'
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(type)}`}
    >
      {type}
    </span>
  )
}

// Style configurations
const getTableStyles = (style: string, _responsive: string) => {
  const baseStyles = {
    container: 'w-full',
    wrapper: 'overflow-hidden shadow-xl rounded-2xl',
    table: 'w-full border-collapse',
    header: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600',
    headerCell:
      'px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-white border-r border-blue-400/30 last:border-r-0',
    row: 'transition-all duration-300 hover:bg-blue-50/50',
    cell: 'px-6 py-4 text-sm text-gray-800 border-r border-gray-100 last:border-r-0 border-b border-gray-50 last:border-b-0',
  }

  switch (style) {
    case 'supplement':
      return {
        ...baseStyles,
        wrapper: `${baseStyles.wrapper} border-2 border-blue-100`,
        header: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        headerCell: `${baseStyles.headerCell} bg-gradient-to-r from-blue-600 to-indigo-600 text-white`,
        row: `${baseStyles.row} hover:bg-blue-50 hover:shadow-sm`,
        cell: `${baseStyles.cell} font-medium`,
      }

    case 'comparison':
      return {
        ...baseStyles,
        wrapper: `${baseStyles.wrapper} border-2 border-blue-100`,
        header: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        headerCell: `${baseStyles.headerCell} bg-gradient-to-r from-blue-600 to-indigo-600`,
        row: `${baseStyles.row} hover:bg-blue-50 hover:shadow-sm even:bg-blue-25`,
        cell: `${baseStyles.cell} border-b border-blue-50`,
      }

    case 'dosage':
      return {
        ...baseStyles,
        wrapper: `${baseStyles.wrapper} border-2 border-amber-100`,
        header: 'bg-gradient-to-r from-amber-500 to-orange-500',
        headerCell: `${baseStyles.headerCell} bg-gradient-to-r from-amber-500 to-orange-500`,
        row: `${baseStyles.row} hover:bg-amber-50 hover:shadow-sm`,
        cell: `${baseStyles.cell} border-b border-amber-50 font-mono text-center`,
      }

    case 'striped':
      return {
        ...baseStyles,
        row: `${baseStyles.row} even:bg-blue-25 hover:bg-blue-50`,
        wrapper: `${baseStyles.wrapper} border border-blue-200`,
      }

    case 'bordered':
      return {
        ...baseStyles,
        table: `${baseStyles.table} border border-blue-200`,
        cell: `${baseStyles.cell} border border-blue-100`,
        headerCell: `${baseStyles.headerCell} border border-blue-400`,
        wrapper: `${baseStyles.wrapper} border-2 border-blue-200`,
      }

    case 'compact':
      return {
        ...baseStyles,
        headerCell: `${baseStyles.headerCell.replace('px-6 py-5', 'px-4 py-3')}`,
        cell: `${baseStyles.cell.replace('px-6 py-4', 'px-4 py-2')}`,
        row: `${baseStyles.row} hover:bg-blue-50`,
      }

    case 'card':
      return {
        ...baseStyles,
        wrapper: `${baseStyles.wrapper} border-2 border-blue-100 shadow-2xl`,
        header: 'bg-gradient-to-r from-blue-600 to-cyan-600',
        headerCell: `${baseStyles.headerCell} border-r border-blue-400/30`,
        row: `${baseStyles.row} border-b border-blue-50 last:border-b-0 hover:bg-blue-50`,
        cell: `${baseStyles.cell} border-r-0`,
      }

    default:
      return {
        ...baseStyles,
        row: `${baseStyles.row} border-b border-blue-50 last:border-b-0 hover:bg-blue-50`,
        wrapper: `${baseStyles.wrapper} border border-blue-200`,
      }
  }
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
  const styles = getTableStyles(tableStyle, responsive)
  const isSupplementStyle = ['supplement', 'comparison', 'dosage'].includes(tableStyle)

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
                Please ensure your supplement data is in proper markdown table format for optimal
                display.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const content = (
    <div className={styles.container}>
      {tableTitle && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{tableTitle}</h3>
        </div>
      )}

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={`${styles.header} rounded-t-2xl`}>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`${styles.headerCell} ${index === 0 ? 'rounded-tl-2xl' : ''} ${index === headers.length - 1 ? 'rounded-tr-2xl' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    {index === 0 && isSupplementStyle && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.row}>
                {row.map((cell, cellIndex) => {
                  // Handle empty cells or cells with just "-"
                  const cellContent = cell === '-' || cell === '' ? '—' : cell
                  const isFirstColumn = cellIndex === 0

                  return (
                    <td
                      key={cellIndex}
                      className={`${styles.cell} ${
                        isFirstColumn && isSupplementStyle
                          ? 'font-bold text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50'
                          : isFirstColumn
                            ? 'font-semibold text-gray-800 bg-gray-50'
                            : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isFirstColumn && isSupplementStyle && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                        <div className="flex-grow">
                          {/* Check if content looks like a supplement type for badging */}
                          {cellIndex === 1 &&
                          isSupplementStyle &&
                          (cellContent.toLowerCase().includes('vitamin') ||
                            cellContent.toLowerCase().includes('mineral') ||
                            cellContent.toLowerCase().includes('herb') ||
                            cellContent.toLowerCase().includes('protein')) ? (
                            <SupplementBadge type={cellContent} />
                          ) : (
                            renderCellContent(cellContent, isSupplementStyle)
                          )}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center italic font-medium">{caption}</p>
        </div>
      )}

      {/* Enhanced mobile responsive helper */}
      {responsive === 'scroll' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 md:hidden">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0L3 11.414a1 1 0 010-1.414L6.293 6.707a1 1 0 011.414 1.414L5.414 10.5H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium">
              Swipe horizontally to view all supplement details
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
