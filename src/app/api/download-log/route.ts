import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LOG_DIR = path.join(process.cwd(), 'logs')
const LOG_FILE = path.join(LOG_DIR, 'downloads.json')

interface DownloadLogEntry {
  timestamp: string
  filename: string
  url: string
  fileSize: number | null
  status: 'started' | 'completed' | 'failed'
  userAgent: string
  ip: string
  articleSlug: string
}

function ensureLogFile() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '[]', 'utf-8')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filename, url, fileSize, status, articleSlug } = body

    if (!filename || !url || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry: DownloadLogEntry = {
      timestamp: new Date().toISOString(),
      filename,
      url,
      fileSize: fileSize || null,
      status,
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      articleSlug: articleSlug || 'unknown',
    }

    ensureLogFile()
    const logs: DownloadLogEntry[] = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'))
    logs.push(entry)
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8')

    console.log(`[DOWNLOAD ${status.toUpperCase()}] ${filename} from ${articleSlug} at ${entry.timestamp}`)

    return NextResponse.json({ success: true, entry })
  } catch (error) {
    console.error('[DOWNLOAD LOG ERROR]', error)
    return NextResponse.json({ error: 'Failed to log download' }, { status: 500 })
  }
}

export async function GET() {
  try {
    ensureLogFile()
    const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'))
    return NextResponse.json({ logs, total: logs.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 })
  }
}
