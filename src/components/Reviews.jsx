import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import './Reviews.css'

const reviews = [
  {
    id: 1,
    name: 'Emilce Saqueta Melo',
    role: 'Licenciada en Turismo, Cocreadora de GeoTour',
    avatar: 'ES',
    color: '#7c3aed',
    rating: 5,
    text: '"Desde el primer momento mostró profesionalismo, compromiso y una gran capacidad para interpretar exactamente lo que necesitábamos."',
  },
  {
    id: 2,
    name: 'Giuliana Zorzoli',
    role: 'Ingeniera de Software',
    avatar: 'GZ',
    color: '#0891b2',
    rating: 5,
    text: '"Trabajar con Iván fue una experiencia fantástica. Entregó el diseño a tiempo, con una calidad excepcional y siempre estuvo abierto a recibir feedback. Definitivamente lo recomiendo."',
  },
  {
    id: 3,
    name: 'Claudia Zampedri',
    role: 'Freelance',
    avatar: 'CZ',
    color: '#059669',
    rating: 5,
    text: '"La creatividad y profesionalismo superaron todas mis expectativas. Altamente recomendado."',
  },
]

function StarRating({ rating, revealed }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`star${revealed ? ' star--animate' : ''}`}
          style={{ '--si': i }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#f59e0b' : 'none'}
          stroke={i < rating ? '#f59e0b' : '#475569'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { lang } = useLang()
  const tr = translations[lang].reviews
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headerRef)
  useReveal(gridRef, { threshold: 0.1 })

  return (
    <section id="resenas" className="reviews">
      <div className="reviews-inner">
        <div className="reviews-header reveal" ref={headerRef}>
          <p className="section-label">{tr.label}</p>
          <h2 className="section-title">{tr.title}</h2>
        </div>
        <div className="reviews-grid" ref={gridRef}>
          {reviews.map((r, i) => (
            <div key={r.id} className="review-card" style={{ '--i': i }}>
              <div className="review-top">
                <div className="review-avatar" style={{ background: r.color }}>
                  {r.avatar}
                </div>
                <div>
                  <p className="review-name">{r.name}</p>
                  <p className="review-role">{r.role}</p>
                </div>
              </div>
              <StarRating rating={r.rating} />
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
