import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string[] }> }) {
  try {
    const params = await context.params
    // Decode URL-encoded filename components
    const decodedSlug = params.slug.map((part) => decodeURIComponent(part))
    const filename = decodedSlug.join('/')
    const mediaRoot = path.join(process.cwd(), 'public', 'media')
    const filePath = path.join(mediaRoot, filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Heuristic fallbacks: try common variants or a generic placeholder
      const candidates: string[] = []

      const ext = path.extname(filename).toLowerCase()
      const base = path.basename(filename, ext)

      // Map numbered variants like 75-1.jpg, 75-2.jpg, 75-3.jpg -> 75.jpg
      const numberedMatch = base.match(/^(\d+)-\d+$/)
      if (numberedMatch) {
        candidates.push(path.join(mediaRoot, `${numberedMatch[1]}${ext}`))
      }

      // Try common size suffixes e.g., 75-600x400.jpg, 75-500x500.jpg, 75-300x200.jpg
      const sizeSuffixes = ['-600x400', '-500x500', '-300x200']
      for (const suffix of sizeSuffixes) {
        candidates.push(path.join(mediaRoot, `${base}${suffix}${ext}`))
      }

      // Try webp variant
      if (ext !== '.webp') {
        candidates.push(path.join(mediaRoot, `${base}.webp`))
      }

      // Final generic fallback in public (outside media)
      candidates.push(path.join(process.cwd(), 'public', 'website-template-OG.webp'))

      const found = candidates.find((p) => fs.existsSync(p))
      if (!found) {
        return new NextResponse('File not found', { status: 404 })
      }

      const buffer = fs.readFileSync(found)
      const foundExt = path.extname(found).toLowerCase()
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': getContentType(foundExt),
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    const contentType = getContentType(ext)

    // Return file with appropriate headers
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error serving media file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
  }

  return types[ext] || 'application/octet-stream'
}
