import Link from 'next/link'
import Image from 'next/image'
import { NAV_STRUCTURE } from '@/lib/navigation'

const CATEGORY_ICONS: Record<string, string> = {
  'bangong': '\ud83d\udcbc',
  'seg': '\ud83d\udce7',
  'cloud-ng': '\ud83c\udf10',
  'ucss': '\u2699\ufe0f',
  'shujuku': '\ud83d\uddc4\ufe0f',
  'zhongduan-new': '\ud83d\udcbb',
  'zhongduan': '\ud83d\udee1\ufe0f',
  'ucss-02': '\ud83d\udda5\ufe0f',
  'app-04': '\ud83d\udcf1',
  'spe-05': '\u2699\ufe0f',
  'dsg-06': '\ud83d\udee1\ufe0f',
  'seg-07': '\ud83d\udce7',
  'aswg-08': '\ud83c\udf10',
  'ucwi-09': '\ud83d\udcbb',
  'itm-10': '\ud83d\udcca',
  'mag-11': '\ud83d\udcca',
  'bushu-11': '\ud83d\udce6',
  'tesao-14': '\ud83d\udd0d',
  'kehu-18': '\ud83d\udc65',
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
            Nextguard \u6280\u672f\u652f\u6301\u77e5\u8bc6\u5e93 \u2014 \u7f51\u5173\u3001\u90ae\u4ef6\u3001\u7ec8\u7aef\u3001UCSS\u3001\u6570\u636e\u5e93\u7b49\u4ea7\u54c1\u6587\u6863\u3002
          </p>
          {/* Search Box - real form */}
          <div className="max-w-2xl mx-auto">
            <form action="/kb" method="GET">
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-lg">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  placeholder="\u641c\u7d22\u6587\u7ae0\u3001\u6307\u5357\u3001\u5e38\u89c1\u95ee\u9898..."
                  className="flex-1 text-gray-700 placeholder-gray-400 outline-none bg-transparent text-base"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">\u6309\u4ea7\u54c1\u6d4f\u89c8</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAV_STRUCTURE.map((category) => (
            <Link
              key={category.id}
              href={`/kb/${category.items[0]?.slug || category.id}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="text-3xl mb-3">
                {CATEGORY_ICONS[category.id] || '\ud83d\udcc4'}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-8">\u70ed\u95e8\u6587\u7ae0</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'SEG\u6982\u89c8', href: '/kb/seg/seg-overview' },
            { title: 'UCSS\u6982\u89c8', href: '/kb/ucss/ucss-overview' },
            { title: '\u7ec8\u7aefnew\u6982\u89c8', href: '/kb/zhongduan-new/zhongduan-new-overview' },
            { title: 'Cloud-NG\u6982\u89c8', href: '/kb/cloud-ng/cloud-ng-overview' },
            { title: '\u6570\u636e\u5e93\u6982\u89c8', href: '/kb/shujuku/shujuku-overview' },
            { title: '\u529e\u516c\u6982\u89c8', href: '/kb/bangong/bangong-overview' },
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
          {' '}\u00b7{' '}
          <a href="mailto:support@nextguard.com" className="hover:text-white transition-colors">support@nextguard.com</a>
        </p>
      </footer>
    </div>
  )
}
