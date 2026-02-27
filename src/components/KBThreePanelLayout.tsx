'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import LanguageToggle from './LanguageToggle';
import SearchBar from './SearchBar';
import DownloadProgressPanel, { useDownloadManager } from './DownloadManager';

interface NavItem {
  slug: string;
  title: string;
}

interface NavCategory {
  id: string;
  label: string;
  labelZh: string;
  icon: string;
  items: NavItem[];
}

const SECTION_COLORS: Record<string, string> = {
  'bangong': 'bg-yellow-500',
  'products': 'bg-orange-500',
  'seg': 'bg-purple-500',
  'cloud-ng': 'bg-green-500',
  'ucss': 'bg-blue-500',
  'shujuku': 'bg-gray-500',
  'zhongduan': 'bg-indigo-500',
  'app': 'bg-blue-600',
  'spe': 'bg-cyan-500',
  'dsg': 'bg-red-500',
  'aswg': 'bg-teal-500',
  'ucwi': 'bg-violet-500',
  'itm': 'bg-amber-500',
  'mag': 'bg-pink-500',
  'bushu': 'bg-emerald-500',
  'tesao': 'bg-sky-500',
  'kehu': 'bg-rose-500',
};

interface Props {
  categories: NavCategory[];
  initialSection?: string;
  initialArticle?: string;
  articleHtml?: string;
}

const FILE_EXTENSIONS = ['.pdf', '.zip', '.exe', '.msi', '.tar', '.gz', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.iso', '.dmg', '.pkg', '.deb', '.rpm', '.rar', '.7z', '.csv', '.cap', '.pcap'];

function isFileUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return FILE_EXTENSIONS.some(ext => lower.includes(ext));
}

export default function KBThreePanelLayout({ categories, initialSection, initialArticle, articleHtml }: Props) {
  const router = useRouter();
  const { convert } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<string>(initialSection || categories[0]?.id || '');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(initialArticle || '');
  const [articleContent, setArticleContent] = useState<string>(articleHtml || '');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { downloads, startDownload, dismissDownload } = useDownloadManager(selectedArticleSlug);

  const currentCategory = categories.find(c => c.id === selectedSection);

  const convertedContent = useMemo(() => {
    if (!articleContent) return '';
    return convert(articleContent);
  }, [articleContent, convert]);

  // Intercept clicks on file links in article content
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (isFileUrl(href)) {
        e.preventDefault();
        e.stopPropagation();
        startDownload(href);
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [convertedContent, startDownload]);

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedArticleSlug('');
    setArticleContent('');
    window.history.pushState({}, '', '/kb/' + sectionId);
  };

  const handleArticleClick = async (slug: string) => {
    setSelectedArticleSlug(slug);
    setIsLoading(true);
    window.history.pushState({}, '', '/kb/' + slug);
    try {
      const res = await fetch('/api/kb/article?slug=' + encodeURIComponent(slug));
      if (res.ok) {
        const data = await res.json();
        setArticleContent(data.html);
      } else {
        setArticleContent('<p>Failed to load article</p>');
      }
    } catch {
      setArticleContent('<p>Failed to load article</p>');
    } finally {
      setIsLoading(false);
    }
  };

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
              <div className="w-64">
                <SearchBar />
              </div>
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

      {/* Three Panel Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Sections */}
        <div className="w-56 shrink-0 bg-gray-100 border-r border-gray-200 overflow-y-auto p-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Sections
          </h2>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSectionClick(cat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-0.5 flex items-center gap-2.5 transition-all text-sm ${
                selectedSection === cat.id
                  ? 'bg-white shadow-sm text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${SECTION_COLORS[cat.id] || 'bg-gray-400'}`} />
              {convert(cat.label)}
              <span className="ml-auto text-xs text-gray-400">{cat.items.length}</span>
            </button>
          ))}
        </div>

        {/* Middle Panel - Pages */}
        <div className="w-80 shrink-0 border-r border-gray-200 overflow-y-auto bg-white">
          {currentCategory && (
            <>
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{convert(currentCategory.label)}</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {convert(currentCategory.labelZh)} - {currentCategory.items.length} articles
                </p>
              </div>
              {currentCategory.items.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleArticleClick(item.slug)}
                  className={`w-full text-left px-4 py-3 transition-all ${
                    selectedArticleSlug === item.slug
                      ? 'bg-blue-50 border-l-2 border-blue-500'
                      : 'hover:bg-gray-50 border-l-2 border-transparent'
                  }`}
                >
                  <span className="text-sm text-gray-700">{convert(item.title)}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Loading article...</p>
            </div>
          ) : convertedContent ? (
            <div
              ref={contentRef}
              className="prose prose-gray max-w-none p-8"
              dangerouslySetInnerHTML={{ __html: convertedContent }}
            />
          ) : selectedSection && !selectedArticleSlug ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-6xl mb-4">{String.fromCodePoint(0x1F4C4)}</div>
              <h3 className="text-lg font-medium">{convert(currentCategory?.label || '')} - {convert(currentCategory?.labelZh || '')}</h3>
              <p className="text-sm mt-1">Select an article from the list to read its content.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-6xl mb-4">{String.fromCodePoint(0x1F4DA)}</div>
              <h3 className="text-lg font-medium">NextGuard Knowledge Base</h3>
              <p className="text-sm mt-1">Select a section and article to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Progress Panel */}
      <DownloadProgressPanel downloads={downloads} onDismiss={dismissDownload} />
    </div>
  );
}
