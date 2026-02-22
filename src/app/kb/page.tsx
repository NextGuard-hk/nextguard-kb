'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_STRUCTURE } from '@/lib/navigation'

const CATEGORY_ICONS: Record<string, string> = {
  'getting-started': '\ud83d\ude80',
  'web-gateway': '\ud83c\udf10',
  'email-gateway': '\ud83d\udce7',
  'dlp': '\ud83d\udee1\ufe0f',
  'ucss': '\u2699\ufe0f',
  'faq': '\u2753',
  'release-notes': '\ud83d\udcdd',
}

function BrowseContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q) setQuery(q)
  }, [searchParams])

  const allArticles = NAV_STRUCTURE.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryId: cat.id,
      categoryLabel: cat.label,
      categoryIcon: CATEGORY_ICONS[cat.id] || '\ud83d\udcc4',
    }))
  )

  const filtered = query.trim()
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.slug.toLowerCase().includes(query.toLowerCase()) ||
          a.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                  className="h-8 w-auto mix-blend-screen"
                  unoptimized
                />
              </Link>
              <span className="text-gray-400 mx-1 hidden sm:inline">/</span>
              <Link href="/" className="text-gray-300 text-sm hidden sm:inline hover:text-white">Knowledge Base</Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/kb" className="text-white font-medium">Browse All</Link>
              <Link href="/kb/release-notes/v3-15" className="text-gray-300 hover:text-white transition-colors">Release Notes</Link>
              <a href="https://next-guard.com" className="text-gray-300 hover:text-white transition-colors">nextguard.com</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse All Articles</h1>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, guides, FAQs..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus={!!initialQuery}
          />
        </div>

        <p className="text-sm text-gray-500 mb-8">
          {filtered ? `${filtered.length} articles found` : `${allArticles.length} articles total`}
        </p>

        {filtered ? (
          /* Search results — flat list */
          <div className="space-y-2">
            {filtered.map((item) => (
              <Link key={item.slug} href={`/kb/${item.slug}`}>
                <div className="bg-white rounded-lg px-5 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-between">
                  <div>
                    <span className="text-gray-700">{item.title}</span>
                    <span className="ml-2 text-xs text-gray-400">{item.categoryIcon} {item.categoryLabel}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Grouped by category */
          <div className="space-y-10">
            {NAV_STRUCTURE.map((category) => (
              <div key={category.id}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>{CATEGORY_ICONS[category.id] || '\ud83d\udcc4'}</span>
                  {category.label}
                  <span className="text-sm font-normal text-gray-400">({category.items.length})</span>
                </h2>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <Link key={item.slug} href={`/kb/${item.slug}`}>
                      <div className="bg-white rounded-lg px-5 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-between">
                        <span className="text-gray-700">{item.title}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>\u00a9 {new Date().getFullYear()} Nextguard Technology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default function BrowseAllPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>}>
      <BrowseContent />
    </Suspense>
  )
}
