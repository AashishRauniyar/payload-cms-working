'use client'

import React, { useEffect, useState } from 'react'

interface TableOfContentsProps {
  content: unknown // Rich text content from Payload CMS
}

interface TOCItem {
  id: string
  text: string
  level: number
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from the rich text content - moved outside useEffect to avoid dependency issues
  const extractHeadings = React.useCallback((node: unknown, items: TOCItem[] = []): TOCItem[] => {
    const nodeObj = node as { type?: string; children?: unknown[]; tag?: string }
    if (nodeObj?.type === 'heading' && nodeObj?.children) {
      const text = nodeObj.children
        .map((child: unknown) => (child as { text?: string }).text || '')
        .join('')
        .trim()

      if (text) {
        const level = parseInt(nodeObj.tag?.replace('h', '') || '1')
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')

        items.push({ id, text, level })
      }
    }

    if (nodeObj?.children) {
      nodeObj.children.forEach((child: unknown) => extractHeadings(child, items))
    }

    return items
  }, [])

  useEffect(() => {
    const contentObj = content as { root?: { children?: unknown[] } }
    if (contentObj?.root?.children) {
      const headings = extractHeadings(contentObj.root)
      setTocItems(headings)
    }
  }, [content, extractHeadings])

  useEffect(() => {
    if (tocItems.length === 0) return

    const handleScroll = () => {
      try {
        // Create array of elements with their corresponding tocItem info
        const elementsWithInfo = tocItems
          .map((item) => ({
            element: document.getElementById(item.id),
            item,
          }))
          .filter(({ element }) => element !== null) // Only keep items that exist in DOM

        if (elementsWithInfo.length === 0) return

        const scrollPosition = window.scrollY + 100
        let newActiveId = ''

        // Find the active section by iterating through actual elements
        for (let i = elementsWithInfo.length - 1; i >= 0; i--) {
          const { element, item } = elementsWithInfo[i]
          if (element && element.offsetTop <= scrollPosition) {
            newActiveId = item.id
            break
          }
        }

        // Only update if the active ID has changed
        setActiveId((prev) => (prev !== newActiveId ? newActiveId : prev))
      } catch (error) {
        // Silently handle any DOM access errors during cleanup/unmounting
        console.warn('Error in scroll handler:', error)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <nav className="table-of-contents">
      <h3 className="toc-title">In This Review</h3>
      <ul className="toc-list">
        {tocItems.map((item, index) => (
          <li key={index} className={`toc-item toc-level-${item.level}`}>
            <button
              onClick={() => handleClick(item.id)}
              className={`toc-link ${activeId === item.id ? 'toc-active' : ''}`}
            >
              {item.text}
            </button>
            {index < tocItems.length - 1 && <span className="toc-separator">|</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
