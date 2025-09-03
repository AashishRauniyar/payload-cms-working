import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const filename = params.slug.join('/')
    const filePath = path.join(process.cwd(), 'public', 'media', filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    const contentType = getContentType(ext)

    // Return file with appropriate headers
    return new NextResponse(fileBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
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
