'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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

export default function KBThreePanelLayout({ categories, initialSection, initialArticle, articleHtml }: Props) {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string>(initialSection || categories[0]?.id || '');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(initialArticle || '');
  const [articleContent, setArticleContent] = useState<string>(articleHtml || '');
  const [isLoading, setIsLoading] = useState(false);

  const currentCategory = categories.find(c => c.id === selectedSection);

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
        setArticleContent('<p class="text-red-500">Failed to load article</p>');
      }
    } catch {
      setArticleContent('<p class="text-red-500">Failed to load article</p>');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="https://raw.githubusercontent.com/NextGuard-hk/nextguard-website/main/public/images/nextguard-logo.png"
                  alt="Nextguard"
                  width={140}
                  height={35}
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

      {/* Three Panel Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Sections */}
        <div className="w-56 bg-gray-100 border-r border-gray-300 overflow-y-auto flex-shrink-0">
          <div className="p-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Sections</h2>
          </div>
          <nav className="px-2 pb-4">
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
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${SECTION_COLORS[cat.id] || 'bg-gray-400'}`} />
                <span className="truncate">{cat.label}</span>
                <span className="ml-auto text-xs text-gray-400">{cat.items.length}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Middle Panel - Pages */}
        <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          {currentCategory && (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">{currentCategory.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{currentCategory.labelZh} - {currentCategory.items.length} articles</p>
              </div>
              <div className="divide-y divide-gray-100">
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
                    <span className={`text-sm block ${
                      selectedArticleSlug === item.slug
                        ? 'text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}>{item.title}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
                <p className="text-sm text-gray-500 mt-3">Loading article...</p>
              </div>
            </div>
          ) : articleContent ? (
            <div className="max-w-4xl mx-auto px-8 py-8">
              <div
                className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg prose-pre:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />
            </div>
          ) : selectedSection && !selectedArticleSlug ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentCategory?.label} - {currentCategory?.labelZh}
                </h3>
                <p className="text-sm text-gray-500">
                  Select an article from the list to read its content.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">NextGuard Knowledge Base</h3>
                <p className="text-sm text-gray-500">Select a section and article to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
