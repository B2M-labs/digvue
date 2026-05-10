import { createContext, useContext, useState, type ReactNode } from 'react'
import { i18n, type Lang } from '../data/i18n'

type ContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<ContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('dv_lang')
    return saved === 'en' ? 'en' : 'pt'
  })

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('dv_lang', l)
  }

  function t(key: string): string {
    return i18n[lang][key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang fora do LangProvider')
  return ctx
}
