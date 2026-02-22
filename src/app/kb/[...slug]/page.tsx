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
  const article = getArticleContent(params.slug)
  if (!article) return { title: 'Not Found' }
  return { title: article.frontmatter.title, description: article.frontmatter.description }
}

export default function KBPage({ params }: Props) {
  const slugStr = params.slug.join('/')
  const article = getArticleContent(params.slug)
  const category = getCategoryById(params.slug[0])

  if (params.slug.length === 1) {
    if (!category) return notFound()
    return (
      <div className="min-h-screen bg-gray-50">
        <KBHeader />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: category.label }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.label}</h1>
          <p className="text-gray-500 mb-8">{category.labelZh}</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              {category && (
                <nav className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">{category.label}</p>
                  {category.items.map(item => (
                    <Link key={item.slug} href={`/kb/${item.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm ${
                        item.slug === slugStr ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                      {item.title}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: category?.label || '', href: `/kb/${params.slug[0]}` },
              { label: article.frontmatter.title }
            ]} />
            <article className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <header className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.frontmatter.tags?.map((t: string) => (
                    <span key={t} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{t}</span>
                  ))}
                  {article.frontmatter.version && (
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">v{article.frontmatter.version}</span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{article.frontmatter.title}</h1>
                {article.frontmatter.description && <p className="text-gray-500">{article.frontmatter.description}</p>}
                {article.frontmatter.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-2">Updated: {new Date(article.frontmatter.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
              </header>
              <div className="prose prose-blue max-w-none">
                <MDXRemote source={article.content} />
              </div>
            </article>
            <div className="mt-6 flex justify-between text-sm">
              <Link href={`/kb/${params.slug[0]}`} className="text-gray-500 hover:text-blue-600">&larr; Back to {category?.label}</Link>
              <a href="mailto:support@nextguard.com?subject=KB Feedback" className="text-gray-400 hover:text-blue-600">Send feedback</a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function KBHeader() {
  return (
          <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center">
              <Image
                src="https://raw.githubusercontent.com/NextGuard-hk/nextguard-website/main/public/images/nextguard-logo.png"
                alt="Nextguard"
                width={160}
                height={40}
                className="h-8 w-auto mix-blend-screen"
                unoptimized
              />
            </Link>
            <span className="text-gray-400 mx-1 hidden sm:inline">/</span>
            <span className="text-gray-300 text-sm hidden sm:inline">Knowledge Base</span>
        <nav className="hidden md:flex gap-5 text-sm">
          {NAV_STRUCTURE.slice(0,5).map(c => (
            <Link key={c.id} href={`/kb/${c.id}`} className="text-gray-600 hover:text-blue-600">{c.label.split(' ')[0]}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span>/</span>}
          {item.href ? <Link href={item.href} className="hover:text-blue-600">{item.label}</Link> : <span className="text-gray-900">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
