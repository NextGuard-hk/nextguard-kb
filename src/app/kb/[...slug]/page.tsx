import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NAV_STRUCTURE, getCategoryById } from '@/lib/navigation'
import type { Metadata } from 'next'
import KBThreePanelLayout from '@/components/KBThreePanelLayout'

interface Props {
  params: { slug: string[] }
}

function getArticleContent(slugArr: string[]) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'kb', ...slugArr) + '.mdx'
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return { frontmatter: data, content }
}

function mdxToHtml(content: string, frontmatter: Record<string, any>): string {
  let html = content
    .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/```[\s\S]*?```/g, (m) => {
      const c = m.replace(/```\w*\n?/, '').replace(/```$/, '')
      return '<pre><code>' + c.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>'
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    .replace(/!\[([^\]]*?)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg" />')
    .replace(/^---$/gm, '<hr class="my-4 border-gray-300" />')
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[a-z])(\S.+)$/gm, '<p>$1</p>')
    .replace(/\n{2,}/g, '\n')

  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-2">$&</ul>')

  const titleHtml = frontmatter.title ? '<h1 class="text-2xl font-bold text-gray-900 mb-2">' + frontmatter.title + '</h1>' : ''
  const descHtml = frontmatter.description ? '<p class="text-gray-500 mb-6">' + frontmatter.description + '</p>' : ''
  const tagsHtml = frontmatter.tags ? '<div class="flex gap-2 mb-4">' + frontmatter.tags.map((t: string) => '<span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">' + t + '</span>').join('') + '</div>' : ''

  return tagsHtml + titleHtml + descHtml + '<hr class="my-4 border-gray-200" />' + html
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.slug.length === 1) {
    const category = getCategoryById(params.slug[0])
    if (category) {
      return { title: category.label, description: category.labelZh + ' - Knowledge Base articles' }
    }
  }
  const article = getArticleContent(params.slug)
  if (!article) return { title: 'Not Found' }
  return { title: article.frontmatter.title, description: article.frontmatter.description }
}

export default function KBPage({ params }: Props) {
  const slugStr = params.slug.join('/')
  const category = getCategoryById(params.slug[0])

  // If section doesn't exist, 404
  if (!category) return notFound()

  const categories = NAV_STRUCTURE.map(cat => ({
    id: cat.id,
    label: cat.label,
    labelZh: cat.labelZh,
    icon: cat.icon,
    items: cat.items.map(item => ({
      slug: item.slug,
      title: item.title,
    })),
  }))

  // Section landing page (e.g. /kb/ucss)
  if (params.slug.length === 1) {
    return (
      <KBThreePanelLayout
        categories={categories}
        initialSection={params.slug[0]}
      />
    )
  }

  // Article page (e.g. /kb/ucss/some-article)
  const article = getArticleContent(params.slug)
  if (!article) return notFound()

  const articleHtml = mdxToHtml(article.content, article.frontmatter)

  return (
    <KBThreePanelLayout
      categories={categories}
      initialSection={params.slug[0]}
      initialArticle={slugStr}
      articleHtml={articleHtml}
    />
  )
}
