'use client'

import React, { useState } from 'react'

export interface FAQBlockProps {
  title?: string
  faqContent?: string
  disableInnerContainer?: boolean
  className?: string
}

// Robust parser: supports **Question**, Q:, and numbered formats (1. Question)
const parseFAQContent = (content: string) => {
  if (!content) return [] as { question: string; answer: string }[]

  const lines = content.split(/\r?\n/)
  const faqs: { question: string; answer: string }[] = []
  let currentQ: string | null = null
  let currentA: string[] = []

  const flush = () => {
    if (currentQ) {
      const answer = currentA.join('\n').trim()
      if (answer) faqs.push({ question: currentQ.trim(), answer })
    }
    currentQ = null
    currentA = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    const mdMatch = line.match(/^\*\*(.+?)\*\*\s*$/) // **Question**
    const qMatch = line.match(/^(?:Q:|Q\.|Q\)|\d+[\.)])\s*(.+)$/i) // Q: or 1. Question

    if (mdMatch || qMatch) {
      flush()
      currentQ = (mdMatch?.[1] || qMatch?.[1] || '').trim()
    } else if (line.length > 0 || currentA.length > 0) {
      currentA.push(raw)
    }
  }
  flush()

  return faqs
}

// Parse Markdown headings (#, ##, ...) as collapsible sections: heading = question, body until next heading = answer
const parseMarkdownHeadings = (content: string) => {
  if (!content) return [] as { question: string; answer: string }[]
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  const items: { question: string; answer: string }[] = []
  let currentQ: string | null = null
  let currentA: string[] = []

  const isHeading = (l: string) => /^#{1,6}\s+/.test(l.trim())
  const extractHeading = (l: string) => l.trim().replace(/^#{1,6}\s+/, '')

  const flush = () => {
    if (currentQ) {
      const answer = currentA.join('\n').trim()
      items.push({ question: currentQ.trim(), answer })
    }
    currentQ = null
    currentA = []
  }

  for (const raw of lines) {
    if (isHeading(raw)) {
      // New section
      if (currentQ !== null) flush()
      currentQ = extractHeading(raw)
    } else {
      if (currentQ !== null) currentA.push(raw)
    }
  }
  if (currentQ !== null) flush()
  // Only keep sections that actually had a heading
  return items.filter((i) => i.question.length > 0)
}

// Minimal, safe-ish Markdown to HTML converter for fallback rendering
// Supports: headings (#..###### ), bold **text**, italic *text*, links [text](url),
// paragraphs and simple unordered/ordered lists. Escapes HTML first.
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeAttr = (s: string) => s.replace(/"/g, '&quot;')

const inlineMd = (s: string) => {
  // links: [text](url) - only allow http/https, otherwise use '#'
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, url: string) => {
    const safeUrl = /^https?:\/\//i.test(url) ? url : '#'
    return `<a href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener noreferrer">${label}</a>`
  })
  // bold
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // italic (after bold to avoid conflicts)
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
  return s
}

const markdownToHtml = (md: string) => {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const rawLine = lines[i]
    const line = rawLine.trim()

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const level = Math.min(6, h[1].length)
      out.push(`<h${level}>${inlineMd(escapeHtml(h[2]))}</h${level}>`)
      i++
      continue
    }

    // unordered list
    if (/^(?:-|\*)\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length) {
        const l = lines[i].trim()
        if (/^(?:-|\*)\s+/.test(l)) {
          items.push(`<li>${inlineMd(escapeHtml(l.replace(/^(?:-|\*)\s+/, '')))}</li>`)
          i++
        } else break
      }
      out.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length) {
        const l = lines[i].trim()
        if (/^\d+\.\s+/.test(l)) {
          items.push(`<li>${inlineMd(escapeHtml(l.replace(/^\d+\.\s+/, '')))}</li>`)
          i++
        } else break
      }
      out.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    // paragraph (consume consecutive non-empty lines)
    if (line.length > 0) {
      const para: string[] = []
      while (i < lines.length && lines[i].trim().length > 0) {
        para.push(lines[i])
        i++
      }
      const html = inlineMd(escapeHtml(para.join('\n'))).replace(/\n/g, '<br/>')
      out.push(`<p>${html}</p>`)
      continue
    }

    // blank line
    i++
  }
  return out.join('\n')
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  title,
  faqContent = '',
  disableInnerContainer = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const faqsParsed = parseFAQContent(faqContent)
  const useHeadingParse = faqsParsed.length === 0 && !!faqContent
  const faqs = useHeadingParse ? parseMarkdownHeadings(faqContent) : faqsParsed

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const isEmpty = faqs.length === 0

  return (
    <div className={`faq-block ${className}`}>
      <div className={disableInnerContainer ? '' : 'container mx-auto px-4'}>
        <div className="max-w-6xl mx-auto">
          {title && (
            <div className="text-center mb-8">
              <div className="text-3xl font-bold text-gray-900 mb-2">{title}</div>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
          )}

          {isEmpty ? (
            faqContent ? (
              <div className="px-6 py-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(faqContent) }}
                />
                <div className="mt-3 text-xs text-gray-400">
                  Showing Markdown rendering. For collapsible Q/A, format questions as
                  “**Question**”, “Q: Question”, or “1. Question”.
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">No FAQs provided yet.</div>
            )
          ) : (
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openItems.has(index)
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <button
                      className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                          {faq.question}
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className="inline-flex items-center justify-center w-6 h-6 border border-blue-600 text-blue-600 rounded"
                            aria-hidden
                          >
                            {isOpen ? '−' : '+'}
                          </span>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5">
                        <div className="pt-3 border-t border-gray-100">
                          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
