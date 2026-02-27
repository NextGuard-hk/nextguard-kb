'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

const FILE_EXTENSIONS = ['.pdf', '.zip', '.exe', '.msi', '.tar', '.gz', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.iso', '.dmg', '.pkg', '.deb', '.rpm', '.rar', '.7z', '.csv', '.txt', '.log', '.cap', '.pcap']

interface DownloadItem {
  id: string
  filename: string
  url: string
  progress: number
  status: 'downloading' | 'completed' | 'failed'
  loaded: number
  total: number
  startTime: number
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function isFileUrl(url: string): boolean {
  const lower = url.toLowerCase()
  return FILE_EXTENSIONS.some(ext => lower.includes(ext))
}

async function logDownload(data: { filename: string; url: string; fileSize: number | null; status: string; articleSlug: string }) {
  try {
    await fetch('/api/download-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch (e) {
    console.error('Failed to log download:', e)
  }
}

export function useDownloadManager(articleSlug: string) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([])

  const startDownload = useCallback((url: string, filename?: string) => {
    const inferredFilename = filename || url.split('/').pop()?.split('?')[0] || 'download'
    const id = Date.now().toString()

    const item: DownloadItem = {
      id,
      filename: inferredFilename,
      url,
      progress: 0,
      status: 'downloading',
      loaded: 0,
      total: 0,
      startTime: Date.now(),
    }

    setDownloads(prev => [...prev, item])

    logDownload({ filename: inferredFilename, url, fileSize: null, status: 'started', articleSlug })

    const xhr = new XMLHttpRequest()
    const proxyUrl = '/api/download?url=' + encodeURIComponent(url) + '&filename=' + encodeURIComponent(inferredFilename)
    xhr.open('GET', proxyUrl)
    xhr.responseType = 'blob'

    xhr.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100)
        setDownloads(prev => prev.map(d => d.id === id ? { ...d, progress: percent, loaded: e.loaded, total: e.total } : d))
      } else {
        setDownloads(prev => prev.map(d => d.id === id ? { ...d, loaded: e.loaded } : d))
      }
    })

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blobUrl = window.URL.createObjectURL(xhr.response)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = inferredFilename
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(blobUrl)

        setDownloads(prev => prev.map(d => d.id === id ? { ...d, progress: 100, status: 'completed' } : d))
        logDownload({ filename: inferredFilename, url, fileSize: xhr.response.size, status: 'completed', articleSlug })
      } else {
        setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'failed' } : d))
        logDownload({ filename: inferredFilename, url, fileSize: null, status: 'failed', articleSlug })
      }
    }

    xhr.onerror = () => {
      setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'failed' } : d))
      logDownload({ filename: inferredFilename, url, fileSize: null, status: 'failed', articleSlug })
    }

    xhr.send()
  }, [articleSlug])

  const dismissDownload = useCallback((id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id))
  }, [])

  return { downloads, startDownload, dismissDownload, isFileUrl }
}

export default function DownloadProgressPanel({ downloads, onDismiss }: { downloads: DownloadItem[]; onDismiss: (id: string) => void }) {
  if (downloads.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 space-y-2">
      {downloads.map((dl) => (
        <div key={dl.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]" title={dl.filename}>
              {dl.status === 'downloading' && <span className="text-blue-500 mr-1">\u2B07</span>}
              {dl.status === 'completed' && <span className="text-green-500 mr-1">\u2713</span>}
              {dl.status === 'failed' && <span className="text-red-500 mr-1">\u2717</span>}
              {dl.filename}
            </span>
            <button onClick={() => onDismiss(dl.id)} className="text-gray-400 hover:text-gray-600 text-xs ml-2">\u2715</button>
          </div>

          {dl.status === 'downloading' && (
            <>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dl.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{dl.total > 0 ? `${formatBytes(dl.loaded)} / ${formatBytes(dl.total)}` : formatBytes(dl.loaded)}</span>
                <span>{dl.progress}%</span>
              </div>
            </>
          )}

          {dl.status === 'completed' && (
            <p className="text-xs text-green-600">Download complete - {dl.total > 0 ? formatBytes(dl.total) : ''}</p>
          )}

          {dl.status === 'failed' && (
            <p className="text-xs text-red-600">Download failed</p>
          )}
        </div>
      ))}
    </div>
  )
}
