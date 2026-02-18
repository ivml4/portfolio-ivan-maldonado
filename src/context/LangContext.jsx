import { createContext, useContext, useState } from 'react'

export const LangContext = createContext({ lang: 'es', toggleLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')

  function toggleLang() {
    setLang((l) => {
      const next = l === 'es' ? 'en' : 'es'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}
