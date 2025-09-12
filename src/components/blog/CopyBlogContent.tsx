'use client'

import React, { useState, useRef } from 'react'
import type { Post } from '@/payload-types'

interface CopyBlogContentProps {
  post: Post
}

const CopyBlogContent: React.FC<CopyBlogContentProps> = ({ post }) => {
  const [showCopyDialog, setShowCopyDialog] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'markdown' | 'text'>('json')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Function to serialize the post content for copying
  const serializeContent = (format: 'json' | 'markdown' | 'text') => {
    const postData = {
      title: post.title,
      content: post.content,
      categories: post.categories,
      meta: {
        title: post.meta?.title,
        description: post.meta?.description,
        // Note: We skip image copying as it would need to be re-uploaded
      },
      authors: post.authors,
      // Skip relatedPosts as they would need to be re-linked
    }

    switch (format) {
      case 'json':
        return JSON.stringify(postData, null, 2)
      
      case 'markdown':
        return convertToMarkdown(postData)
      
      case 'text':
        return convertToText(postData)
      
      default:
        return JSON.stringify(postData, null, 2)
    }
  }

  // Convert content to Markdown format (simplified)
  const convertToMarkdown = (postData: any) => {
    let markdown = `# ${postData.title}\n\n`
    
    if (postData.meta?.description) {
      markdown += `${postData.meta.description}\n\n`
    }

    // Note: Full Lexical to Markdown conversion would be complex
    // This is a simplified version - you might want to use a proper Lexical serializer
    markdown += `## Content\n\n`
    markdown += `<!-- Lexical JSON Content -->\n`
    markdown += `\`\`\`json\n${JSON.stringify(postData.content, null, 2)}\n\`\`\`\n\n`
    
    return markdown
  }

  // Convert content to plain text format
  const convertToText = (postData: any) => {
    let text = `TITLE: ${postData.title}\n\n`
    
    if (postData.meta?.title) {
      text += `META TITLE: ${postData.meta.title}\n`
    }
    
    if (postData.meta?.description) {
      text += `META DESCRIPTION: ${postData.meta.description}\n`
    }
    
    text += `\nCONTENT (JSON FORMAT):\n`
    text += JSON.stringify(postData.content, null, 2)
    
    return text
  }

  const handleCopy = async () => {
    const content = serializeContent(selectedFormat)
    
    try {
      await navigator.clipboard.writeText(content)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (error) {
      // Fallback for older browsers
      if (textAreaRef.current) {
        textAreaRef.current.select()
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 3000)
      }
    }
  }

  const handleDownload = () => {
    const content = serializeContent(selectedFormat)
    const fileExtension = selectedFormat === 'json' ? '.json' : selectedFormat === 'markdown' ? '.md' : '.txt'
    const filename = `${post.slug || 'blog-content'}${fileExtension}`
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Copy Button */}
      <div className="copy-blog-button-container">
        <button
          onClick={() => setShowCopyDialog(true)}
          className="copy-blog-button"
          title="Copy blog content for reuse"
        >
          <svg className="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy Content
        </button>
      </div>

      {/* Copy Dialog Modal */}
      {showCopyDialog && (
        <div className="copy-dialog-overlay" onClick={() => setShowCopyDialog(false)}>
          <div className="copy-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="copy-dialog-header">
              <h3 className="copy-dialog-title">Copy Blog Content</h3>
              <button
                onClick={() => setShowCopyDialog(false)}
                className="copy-dialog-close"
              >
                <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="copy-dialog-content">
              <p className="copy-dialog-description">
                Select the format you want to copy the blog content in. This will include the title, content with all custom blocks, and metadata.
              </p>

              {/* Format Selection */}
              <div className="format-selection">
                <label className="format-label">Output Format:</label>
                <div className="format-options">
                  <button
                    onClick={() => setSelectedFormat('json')}
                    className={`format-option ${selectedFormat === 'json' ? 'active' : ''}`}
                  >
                    <span className="format-name">JSON</span>
                    <span className="format-desc">Full structure with custom blocks</span>
                  </button>
                  <button
                    onClick={() => setSelectedFormat('markdown')}
                    className={`format-option ${selectedFormat === 'markdown' ? 'active' : ''}`}
                  >
                    <span className="format-name">Markdown</span>
                    <span className="format-desc">Readable format with JSON content</span>
                  </button>
                  <button
                    onClick={() => setSelectedFormat('text')}
                    className={`format-option ${selectedFormat === 'text' ? 'active' : ''}`}
                  >
                    <span className="format-name">Text</span>
                    <span className="format-desc">Plain text format</span>
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="content-preview">
                <label className="preview-label">Preview:</label>
                <textarea
                  ref={textAreaRef}
                  value={serializeContent(selectedFormat)}
                  readOnly
                  className="preview-textarea"
                  rows={10}
                />
              </div>

              {/* Success Message */}
              {copySuccess && (
                <div className="copy-success">
                  <svg className="success-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Content copied to clipboard!
                </div>
              )}

              {/* Action Buttons */}
              <div className="copy-dialog-actions">
                <button onClick={handleDownload} className="download-button">
                  <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                <button onClick={handleCopy} className="copy-button-primary">
                  <svg className="copy-icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </button>
              </div>

              {/* Usage Instructions */}
              <div className="usage-instructions">
                <h4 className="instructions-title">How to use:</h4>
                <ol className="instructions-list">
                  <li>Copy the content above</li>
                  <li>Go to your Payload CMS admin panel</li>
                  <li>Create a new blog post</li>
                  <li>For JSON format: Use the content to populate fields programmatically</li>
                  <li>For Markdown/Text: Use as reference for manual content creation</li>
                </ol>
                <p className="instructions-note">
                  Note: Images will need to be re-uploaded and related posts re-linked manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CopyBlogContent
