import { NextRequest, NextResponse } from 'next/server'

const FILE_EXTENSIONS = ['.pdf', '.zip', '.exe', '.msi', '.tar', '.gz', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.iso', '.dmg', '.pkg', '.deb', '.rpm', '.rar', '.7z', '.csv', '.txt', '.log', '.cap', '.pcap']

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const filename = request.nextUrl.searchParams.get('filename')

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const contentLength = response.headers.get('content-length')
    const inferredFilename = filename || url.split('/').pop()?.split('?')[0] || 'download'

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${inferredFilename}"`,
    })

    if (contentLength) {
      headers.set('Content-Length', contentLength)
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
