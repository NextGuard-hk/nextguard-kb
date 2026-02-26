import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { NAV_STRUCTURE, getCategoryById } from '@/lib/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string[] }
}

function getArticleContent(slugArr: string[]) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'kb', ...slugArr) + '.mdx'
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return { frontmatter: data, content }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Handle category landing pages (e.g. /kb/seg)
  if (params.slug.length === 1) {
    const category = getCategoryById(params.slug[0])
    if (category) {
      return { title: `${category.label} | Nextguard KB`, description: `${category.labelZh} - Knowledge Base articles` }
    }
  }
  const article = getArticleContent(params.slug)
  if (!article) return { title: 'Not Found' }
  return { title: `${article.frontmatter.title} | Nextguard KB`, description: article.frontmatter.description }
}

export default function KBPage({ params }: Props) {
  const slugStr = params.slug.join('/')
  const article = getArticleContent(params.slug)
  const category = getCategoryById(params.slug[0])

  // Section landing page (e.g. /kb/app)
  if (params.slug.length === 1) {
    if (!category) return notFound()
    return (
      <div className="min-h-screen bg-gray-50">
        <KBHeader />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'KB', href: '/kb' }, { label: category.label }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.label}</h1>
          <p className="text-gray-500 mb-8">{category.labelZh} - {category.items.length} articles</p>
          <div className="grid gap-3">
            {category.items.map(item => (
              <Link key={item.slug} href={`/kb/${item.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all flex items-center justify-between group">
                <span className="font-medium text-gray-800 group-hover:text-blue-600">{item.title}</span>
                <span className="text-gray-400 group-hover:text-blue-500">&rsaquo;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!article) return notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <KBHeader />
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        {category && (
          <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white min-h-screen">
            <div className="sticky top-16 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              <Link href={`/kb/${category.id}`} className="font-bold text-gray-900 mb-3 block">
                {category.label}
              </Link>
              <nav className="space-y-1">
                {category.items.map(item => (
                  <Link key={item.slug} href={`/kb/${item.slug}`}
                    className={`block text-sm px-3 py-2 rounded-md transition-colors ${
                      item.slug === slugStr
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Article Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-10">
          <Breadcrumb items={[
            { label: 'KB', href: '/kb' },
            { label: category?.label || '', href: `/kb/${category?.id}` },
            { label: article.frontmatter.title }
          ]} />

          <div className="flex flex-wrap gap-2 mb-4">
            {article.frontmatter.tags?.map((t: string) => (
              <span key={t} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{t}</span>
            ))}
            {article.frontmatter.section && (
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">{article.frontmatter.section}</span>
            )}
            {article.frontmatter.date && (
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">{article.frontmatter.date}</span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.frontmatter.title}</h1>
          {article.frontmatter.description && (
            <p className="text-lg text-gray-600 mb-6 border-l-4 border-blue-200 pl-4">{article.frontmatter.description}</p>
          )}

          <article className="prose prose-gray max-w-none
            prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-7
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse
            prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50
            prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
            prose-li:text-gray-700">
            <MDXRemote source={article.content} />
          </article>

          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center text-sm">
            <Link href={`/kb/${category?.id}`} className="text-blue-600 hover:text-blue-800">
              &larr; Back to {category?.label}
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

function KBHeader() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="https://raw.githubusercontent.com/NextGuard-hk/nextguard-website/main/public/images/nextguard-logo.png"
                alt="Nextguard"
                width={160}
                height={40}
                className="brightness-200"
              />
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/kb" className="text-white font-medium hover:text-blue-400">
              Knowledge Base
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/kb" className="text-gray-300 hover:text-white">Browse All</Link>
            <a href="https://next-guard.com" className="text-gray-300 hover:text-white">nextguard.com</a>
          </div>
        </div>
      </div>
    </header>
  )
}

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600">{item.label}</Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
