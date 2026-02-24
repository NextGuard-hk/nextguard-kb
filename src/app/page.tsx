import Link from 'next/link'
import Image from 'next/image'
import { NAV_STRUCTURE } from '@/lib/navigation'

const CATEGORY_ICONS: Record<string, string> = {
  'bangong': '💼',
  'seg': '📧',
  'cloud-ng': '🌐',
  'ucss': '⚙️',
  'shujuku': '🗄️',
  'zhongduan-new': '💻',
  'zhongduan': '🛡️',
  'ucss-02': '🖥️',
  'app-04': '📱',
  'spe-05': '⚙️',
  'dsg-06': '🛡️',
  'seg-07': '📧',
  'aswg-08': '🌐',
  'ucwi-09': '💻',
  'itm-10': '📊',
  'mag-11': '📊',
  'bushu-11': '📦',
  'tesao-14': '🔍',
  'kehu-18': '👥',
}

export default function HomePage() {
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
              <span className="text-gray-300 text-sm hidden sm:inline">Knowledge Base</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/kb" className="text-gray-300 hover:text-white transition-colors">Browse All</Link>
              <Link href="/kb/release-notes/v3-15" className="text-gray-300 hover:text-white transition-colors">Release Notes</Link>
              <a href="https://next-guard.com" className="text-gray-300 hover:text-white transition-colors">nextguard.com</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nextguard Knowledge Base</h1>
          <p className="text-blue-100 text-lg mb-10">
            Nextguard 技术支持知识库 — 网关、邮件、终端、UCSS、数据库等产品文档。
          </p>
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <form action="/kb" method="GET">
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-lg">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  placeholder="搜索文章、指南、常见问题..."
                  className="flex-1 text-gray-700 placeholder-gray-400 outline-none bg-transparent text-base"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">按产品浏览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAV_STRUCTURE.map((category) => (
            <Link
              key={category.id}
              href={`/kb/${category.items[0]?.slug || category.id}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="text-3xl mb-3">
                {CATEGORY_ICONS[category.id] || '📄'}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{category.labelZh}</p>
              <p className="text-xs text-gray-400 mt-2">{category.items.length} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">热门文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'SEG概览', href: '/kb/seg/seg-overview' },
            { title: 'UCSS概览', href: '/kb/ucss/ucss-overview' },
            { title: '终端new概览', href: '/kb/zhongduan-new/zhongduan-new-overview' },
            { title: 'Cloud-NG概览', href: '/kb/cloud-ng/cloud-ng-overview' },
            { title: '数据库概览', href: '/kb/shujuku/shujuku-overview' },
            { title: '办公概览', href: '/kb/bangong/bangong-overview' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-lg border border-gray-200 px-5 py-4 hover:shadow-md hover:border-blue-300 transition-all text-gray-700 hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Nextguard Technology. All rights reserved.</p>
        <p className="mt-2">
          <a href="https://next-guard.com" className="hover:text-white transition-colors">nextguard.com</a>
          {' '}·{' '}
          <a href="mailto:support@nextguard.com" className="hover:text-white transition-colors">support@nextguard.com</a>
        </p>
      </footer>
    </div>
  )
}
