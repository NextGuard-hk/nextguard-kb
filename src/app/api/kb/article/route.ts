import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const slugArr = slug.split('/')
  const filePath = path.join(process.cwd(), 'src', 'content', 'kb', ...slugArr) + '.mdx'

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  // Convert MDX content to simple HTML
  // We'll do basic markdown to HTML conversion
  let html = content
    // Headers
    .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, '').replace(/```$/, '')
      return '<pre><code>' + code.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>'
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    // Images
    .replace(/!\[([^\]]*?)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg" />')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-4 border-gray-300" />')
    // Lists
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[a-z])(\S.+)$/gm, '<p>$1</p>')
    // Clean up empty lines
    .replace(/\n{2,}/g, '\n')

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-2">$&</ul>')

  // Add title
  const titleHtml = data.title ? '<h1 class="text-2xl font-bold text-gray-900 mb-2">' + data.title + '</h1>' : ''
  const descHtml = data.description ? '<p class="text-gray-500 mb-6">' + data.description + '</p>' : ''
  const tagsHtml = data.tags ? '<div class="flex gap-2 mb-4">' + data.tags.map((t: string) => '<span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">' + t + '</span>').join('') + '</div>' : ''

  const fullHtml = tagsHtml + titleHtml + descHtml + '<hr class="my-4 border-gray-200" />' + html

  return NextResponse.json({
    html: fullHtml,
    title: data.title || '',
    description: data.description || '',
  })
}
