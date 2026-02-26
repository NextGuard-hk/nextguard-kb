import Link from 'next/link'
import Image from 'next/image'
import { NAV_STRUCTURE } from '@/lib/navigation'

const CATEGORY_ICONS: Record<string, string> = {
  'bangong': '💼',
  'products': '📦',
  'seg': '✉️',
  'cloud-ng': '🌐',
  'ucss': '⚙️',
  'shujuku': '🗄️',
  'zhongduan': '💻',
  'app': '📱',
  'spe': '⚙️',
  'dsg': '🛡️',
  'aswg': '🌐',
  'ucwi': '🖥️',
  'itm': '📊',
  'mag': '📈',
  'bushu': '🚀',
  'tesao': '🔍',
  'kehu': '👥',
}

export default function BrowseAllPage() {
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
              <a href="https://next-guard.com" className="text-gray-300 hover:text-white">nextguard.com</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-gray-500 mb-8">{totalArticles} articles across {NAV_STRUCTURE.length} sections</p>

        {/* Sections Grid */}
        <div className="space-y-10">
          {NAV_STRUCTURE.map((category) => (
            <section key={category.id} id={category.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{CATEGORY_ICONS[category.id] || '📄'}</span>
                <h2 className="text-xl font-bold text-gray-900">{category.label}</h2>
                <span className="text-sm text-gray-400 ml-1">({category.items.length})</span>
              </div>
              {category.labelZh !== category.label && (
                <p className="text-sm text-gray-500 mb-3 ml-9">{category.labelZh}</p>
              )}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/kb/${item.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-800 group-hover:text-blue-600 text-sm truncate">{item.title}</span>
                    <span className="text-gray-400 group-hover:text-blue-500 ml-2 flex-shrink-0">&rsaquo;</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Nextguard Technology. All rights reserved.
      </footer>
    </div>
  )
}
