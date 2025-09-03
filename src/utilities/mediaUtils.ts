/**
 * Utility functions for handling media URLs with special characters
 */

/**
 * Properly encode media URLs for Next.js Image component
 */
export function encodeMediaUrl(url: string): string {
  if (!url) return url

  // Split the URL to encode only the filename part
  const parts = url.split('/')
  const filename = parts[parts.length - 1]

  // Encode the filename while preserving other URL parts
  const encodedFilename = encodeURIComponent(filename)
  parts[parts.length - 1] = encodedFilename

  return parts.join('/')
}

/**
 * Sanitize filename for better URL compatibility
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[()[\]{}]/g, '') // Remove brackets and parentheses
    .replace(/[^a-zA-Z0-9.-]/g, '-') // Replace other special chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .toLowerCase()
}

/**
 * Check if filename has problematic characters for Next.js Image optimization
 */
export function hasProblematicChars(url: string): boolean {
  const filename = url.split('/').pop() || ''
  return /[()[\]{}\s%]/.test(filename)
}

/**
 * Get the base URL for media files
 */
export function getMediaBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'https://healthylifestyletips.online'
}
