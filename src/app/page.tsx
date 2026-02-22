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
            Official documentation for Web Security Gateway, Email Security Gateway, DLP/MDLP, and UCSS Management Platform.
          </p>
          {/* Search Box - real form */}
          <div className="max-w-2xl mx-auto">
            <form action="/kb" method="GET">
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-lg">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  placeholder="Search articles, guides, FAQs..."
                  className="flex-1 text-gray-700 placeholder-gray-400 outline-none bg-transparent text-base"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAV_STRUCTURE.map((category) => (
            <Link key={category.id} href={`/kb/${category.id}`}>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <div className="text-3xl mb-3">{CATEGORY_ICONS[category.id] || '\ud83d\udcc4'}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.label}</h3>
                <p className="text-sm text-gray-500 mb-2">{category.labelZh}</p>
                <p className="text-xs text-gray-400">{category.items.length} articles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Web Gateway \u2014 Inline Deployment', href: '/kb/web-gateway/deployment-inline' },
            { title: 'UCSS Initial Setup & Licensing', href: '/kb/ucss/initial-setup' },
            { title: 'MDLP Overview \u2014 5 DLP Channels', href: '/kb/dlp/overview' },
            { title: 'Email Gateway MTA Deployment', href: '/kb/email-gateway/deployment-mta' },
            { title: 'AD / LDAP Integration Guide', href: '/kb/web-gateway/ad-ldap-integration' },
            { title: 'HA (High Availability) Setup', href: '/kb/ucss/ha-setup' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-700">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>\u00a9 {new Date().getFullYear()} Nextguard Technology. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://next-guard.com" className="hover:text-white transition-colors">nextguard.com</a>
            &nbsp;\u00b7&nbsp;
            <a href="mailto:support@nextguard.com" className="hover:text-white transition-colors">support@nextguard.com</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
