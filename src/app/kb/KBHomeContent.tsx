'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import SearchBar from '@/components/SearchBar'

const SECTION_COLORS: Record<string, string> = {
  'bangong': 'border-l-yellow-500',
  'products': 'border-l-orange-500',
  'seg': 'border-l-purple-500',
  'cloud-ng': 'border-l-green-500',
  'ucss': 'border-l-blue-500',
  'shujuku': 'border-l-gray-500',
  'zhongduan': 'border-l-indigo-500',
  'app': 'border-l-blue-600',
  'spe': 'border-l-cyan-500',
  'dsg': 'border-l-red-500',
  'aswg': 'border-l-teal-500',
  'ucwi': 'border-l-violet-500',
  'itm': 'border-l-amber-500',
  'mag': 'border-l-pink-500',
  'bushu': 'border-l-emerald-500',
  'tesao': 'border-l-sky-500',
  'kehu': 'border-l-rose-500',
}

interface Category {
  id: string
  label: string
  labelZh: string
  itemCount: number
}

export default function KBHomeContent({ categories, totalArticles }: { categories: Category[]; totalArticles: number }) {
  const { convert } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="https://next-guard.com/images/nextguard-logo.png"
                  alt="Nextguard"
                  width={160}
                  height={40}
                  className="mix-blend-screen"
                />
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/kb" className="text-white font-medium hover:text-blue-400">
                Knowledge Base
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <LanguageToggle />
              <a href="https://next-guard.com" className="text-gray-300 hover:text-white">nextguard.com</a>
              <button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.href = '/login';
                }}
                className="text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{convert('Knowledge Base')}</h1>
        <p className="text-gray-500 mb-6">{totalArticles} {convert('articles across')} {categories.length} {convert('sections')}</p>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/kb/${category.id}`}
              className={`block p-5 bg-white rounded-xl border-l-4 ${SECTION_COLORS[category.id] || 'border-l-gray-300'} shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="font-semibold text-gray-900">{convert(category.label)}</h3>
              {category.labelZh !== category.label && (
                <p className="text-sm text-gray-500 mt-0.5">{convert(category.labelZh)}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{category.itemCount} articles</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-8">
        \u00a9 {new Date().getFullYear()} Nextguard Technology. All rights reserved.
      </footer>
    </div>
  )
}
