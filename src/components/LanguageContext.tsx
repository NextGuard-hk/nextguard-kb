'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import * as OpenCC from 'opencc-js'

type Lang = 'sc' | 'tc'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  convert: (text: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'sc',
  setLang: () => {},
  convert: (t) => t,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('sc')
  const [converter, setConverter] = useState<((text: string) => string) | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('kb-lang') as Lang | null
    if (saved === 'tc') {
      setLangState('tc')
    }
  }, [])

  useEffect(() => {
    if (lang === 'tc') {
      const conv = OpenCC.Converter({ from: 'cn', to: 'twp' })
      setConverter(() => conv)
    } else {
      setConverter(null)
    }
  }, [lang])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('kb-lang', newLang)
  }, [])

  const convert = useCallback((text: string): string => {
    if (lang === 'sc' || !converter) return text
    try {
      return converter(text)
    } catch {
      return text
    }
  }, [lang, converter])

  return (
    <LanguageContext.Provider value={{ lang, setLang, convert }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
