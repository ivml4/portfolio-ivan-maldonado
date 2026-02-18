import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import './Services.css'

const serviceIcons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    color: '#a78bfa',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: '#f97316',
  },
]

export default function Services() {
  const { lang } = useLang()
  const tr = translations[lang].services
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headerRef)
  useReveal(gridRef, { threshold: 0.1 })

  return (
    <section id="servicios" className="services">
      <div className="services-inner">
        <div className="services-header reveal" ref={headerRef}>
          <p className="section-label">{tr.label}</p>
          <h2 className="section-title">{tr.title}</h2>
        </div>
        <div className="services-grid" ref={gridRef}>
          {tr.items.map((s, i) => (
            <div key={s.title} className="service-card" style={{ '--i': i }}>
              <div className="service-icon" style={{ color: serviceIcons[i].color }}>
                {serviceIcons[i].icon}
              </div>
              <h3 className="service-name">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
