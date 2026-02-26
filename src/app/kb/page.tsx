import Link from 'next/link'
import Image from 'next/image'
import { NAV_STRUCTURE } from '@/lib/navigation'
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

export default function KBHomePage() {
  const totalArticles = NAV_STRUCTURE.reduce((sum, cat) => sum + cat.items.length, 0)

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
              <a href="https://next-guard.com" className="text-gray-300 hover:text-white">nextguard.com</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-gray-500 mb-6">{totalArticles} articles across {NAV_STRUCTURE.length} sections</p>
        <div className="mb-8">
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_STRUCTURE.map((category) => (
            <Link
              key={category.id}
              href={'/kb/' + category.id}
              className={'block p-5 bg-white rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all ' + (SECTION_COLORS[category.id] || 'border-l-gray-300')}
            >
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
              {category.labelZh !== category.label && (
                <p className="text-sm text-gray-500">{category.labelZh}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">{category.items.length} articles</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-8 text-center text-sm text-gray-400">
        <p>\u00a9 {new Date().getFullYear()} Nextguard Technology. All rights reserved.</p>
      </footer>
    </div>
  )
}
