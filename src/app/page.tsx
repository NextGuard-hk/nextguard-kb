import Link from 'next/link'
import { NAV_STRUCTURE } from '@/lib/navigation'

const CATEGORY_ICONS: Record<string, string> = {
  'getting-started': '🚀',
  'web-gateway': '🌐',
  'email-gateway': '📧',
  'dlp': '🛡️',
  'ucss': '⚙️',
  'faq': '❓',
  'release-notes': '📝',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Nextguard</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-600">Knowledge Base</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/kb" className="text-gray-600 hover:text-blue-600 transition-colors">Browse All</Link>
              <Link href="/kb/release-notes/v3-15" className="text-gray-600 hover:text-blue-600 transition-colors">Release Notes</Link>
              <a href="https://nextguard.com" className="text-gray-600 hover:text-blue-600 transition-colors">nextguard.com</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nextguard Knowledge Base</h1>
          <p className="text-blue-100 text-lg mb-10">
            Official documentation for Web Security Gateway, Email Security Gateway, DLP/MDLP, and UCSS Management Platform.
          </p>
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <Link href="/kb">
              <div className="flex items-center gap-3 bg-white text-gray-500 rounded-xl px-5 py-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search articles, guides, FAQs...</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {NAV_STRUCTURE.map((category) => (
            <Link
              key={category.id}
              href={`/kb/${category.id}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3">{CATEGORY_ICONS[category.id] || '📄'}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                {category.label}
              </h3>
              <p className="text-sm text-gray-500">{category.labelZh}</p>
              <p className="text-xs text-gray-400 mt-2">{category.items.length} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Web Gateway — Inline Deployment', href: '/kb/web-gateway/deployment-inline' },
              { title: 'UCSS Initial Setup & Licensing', href: '/kb/ucss/initial-setup' },
              { title: 'MDLP Overview — 5 DLP Channels', href: '/kb/dlp/overview' },
              { title: 'Email Gateway MTA Deployment', href: '/kb/email-gateway/deployment-mta' },
              { title: 'AD / LDAP Integration Guide', href: '/kb/web-gateway/ad-ldap-integration' },
              { title: 'HA (High Availability) Setup', href: '/kb/ucss/ha-setup' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700 group-hover:text-blue-600">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Nextguard Technology. All rights reserved.</p>
          <p className="mt-1">
            <a href="https://nextguard.com" className="hover:text-blue-600">nextguard.com</a>
            <span className="mx-2">·</span>
            <a href="mailto:support@nextguard.com" className="hover:text-blue-600">support@nextguard.com</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
