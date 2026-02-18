import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import './Navbar.css'

const sections = ['inicio', 'servicios', 'trabajos', 'resenas', 'contacto']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const { lang, toggleLang } = useLang()
  const tr = translations[lang].nav

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#inicio" className="navbar-logo">Iván Maldonado</a>
        <ul className="navbar-links">
          <li><a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''}>{tr.home}</a></li>
          <li><a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''}>{tr.services}</a></li>
          <li><a href="#trabajos" className={activeSection === 'trabajos' ? 'active' : ''}>{tr.projects}</a></li>
          <li><a href="#resenas" className={activeSection === 'resenas' ? 'active' : ''}>{tr.reviews}</a></li>
          <li><a href="#contacto" className={activeSection === 'contacto' ? 'active' : ''}>{tr.contact}</a></li>
        </ul>
        <div className="navbar-controls">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Change language">
            <span className={lang === 'es' ? 'lang-opt lang-opt--active' : 'lang-opt'}>ES</span>
            <span className="lang-sep">·</span>
            <span className={lang === 'en' ? 'lang-opt lang-opt--active' : 'lang-opt'}>EN</span>
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
