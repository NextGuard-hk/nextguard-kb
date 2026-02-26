'use client'

import { useLanguage } from './LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-0.5">
      <button
        onClick={() => setLang('sc')}
        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
          lang === 'sc'
            ? 'bg-cyan-500 text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        简体
      </button>
      <button
        onClick={() => setLang('tc')}
        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
          lang === 'tc'
            ? 'bg-cyan-500 text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        繁體
      </button>
    </div>
  )
}
