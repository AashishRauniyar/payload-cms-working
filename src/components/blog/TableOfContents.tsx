'use client'

import React, { useEffect, useState } from 'react'

interface TableOfContentsProps {
  content: any // Rich text content from Payload CMS
}

interface TOCItem {
  id: string
  text: string
  level: number
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from the rich text content
  const extractHeadings = (node: any, items: TOCItem[] = []): TOCItem[] => {
    if (node?.type === 'heading' && node?.children) {
      const text = node.children
        .map((child: any) => child.text || '')
        .join('')
        .trim()

      if (text) {
        const level = parseInt(node.tag?.replace('h', '') || '1')
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')

        items.push({ id, text, level })
      }
    }

    if (node?.children) {
      node.children.forEach((child: any) => extractHeadings(child, items))
    }

    return items
  }

  useEffect(() => {
    if (content?.root?.children) {
      const headings = extractHeadings(content.root)
      setTocItems(headings)
    }
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean)

      const scrollPosition = window.scrollY + 100

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(tocItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
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
