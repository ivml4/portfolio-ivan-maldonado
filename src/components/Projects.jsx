import { useState, useEffect, useRef, useCallback } from 'react'
import useReveal from '../hooks/useReveal'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import { assetUrl } from '../utils/assetUrl'
import ProjectModal from './ProjectModal'
import './Projects.css'

const img = (path) => assetUrl(`images/${path}`)

const projectsData = [
  {
    id: 'geotour',
    title: 'GeoTour',
    categoryKey: 'web',
    image: img('geotour-portada.jpeg'),
    images: [
      img('geotour-portada.jpeg'),
      img('geotour-1.jpeg'),
      img('geotour-2.jpeg'),
      img('geotour-3.jpeg'),
      img('geotour-4.jpeg'),
      img('geotour-5.jpeg'),
    ],
    siteUrl: 'https://geotour.com.ar/',
    review: {
      name: 'Emilce Saqueta Melo',
      role: 'Licenciada en Turismo, Cocreadora de GeoTour',
      roleEn: 'Tourism Degree, GeoTour Co-founder',
      avatar: 'ES',
      color: '#7c3aed',
      rating: 5,
      text: 'Desde el primer momento mostró profesionalismo, compromiso y una gran capacidad para interpretar exactamente lo que necesitábamos. Supo plasmar la identidad de GeoTour de manera clara, moderna y funcional, siempre con muy buena predisposición para escuchar sugerencias, resolver dudas y proponer mejoras. El resultado final superó nuestras expectativas, tanto en diseño como en usabilidad. Sin dudas, lo recomiendo a quienes busquen un desarrollador web confiable, creativo y responsable.',
      textEn: "From the very first moment he showed professionalism, commitment and a great ability to interpret exactly what we needed. He captured GeoTour's identity in a clear, modern and functional way, always with great willingness to listen to suggestions, resolve doubts and propose improvements. The final result exceeded our expectations, both in design and usability. Without a doubt, I recommend him to anyone looking for a reliable, creative and responsible web developer.",
    },
  },
  {
    id: 'cinema',
    title: 'Back to the Cinema',
    categoryKey: 'web',
    image: img('back-to-cinema-portada.jpeg'),
    images: [
      img('back-to-cinema-portada.jpeg'),
      img('back-to-cinema-1.jpeg'),
      img('back-to-cinema-2.jpeg'),
      img('back-to-cinema-3.jpeg'),
    ],
    siteUrl: undefined,
  },
  {
    id: 'gameteca',
    title: 'Gameteca',
    categoryKey: 'mobile',
    image: img('gameteca-portada.jpeg'),
    images: [
      img('gameteca-portada.jpeg'),
      img('gameteca-1.jpeg'),
      img('gameteca-2.jpeg'),
      img('gameteca-3.jpeg'),
    ],
    siteUrl: undefined,
  },
  {
    id: 'yoga',
    title: 'Yoga Studio',
    categoryKey: 'web',
    image: img('yoga-portada.jpeg'),
    images: [
      img('yoga-portada.jpeg'),
      img('yoga-1.jpeg'),
      img('yoga-2.jpeg'),
      img('yoga-3.jpeg'),
      img('yoga-4.jpeg'),
    ],
    siteUrl: undefined,
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    categoryKey: 'web',
    image: img('portfolio-portada.jpeg'),
    images: [
      img('portfolio-portada.jpeg'),
      img('portfolio-1.jpeg'),
    ],
    siteUrl: 'https://giuliana-zorzoli.netlify.app/',
    review: {
      name: 'Giuliana Zorzoli',
      role: 'Ingeniera de Software',
      roleEn: 'Software Engineer',
      avatar: 'GZ',
      color: '#0891b2',
      rating: 5,
      text: 'El trabajo de Iván fue excepcional. Logró crear un portfolio que realmente me representa y que potencia la forma en que muestro mis habilidades como desarrolladora. Siempre estuvo presente durante el proceso, escuchó cada uno de mis comentarios y transformó mi feedback en un diseño que refleja completamente mi esencia.',
      textEn: "Iván's work was exceptional. He managed to create a portfolio that truly represents me and enhances the way I showcase my skills as a developer. He was always present throughout the process, listened to every one of my comments and transformed my feedback into a design that completely reflects my essence.",
    },
  },
]

const VISIBLE = 3
const MAX_INDEX = projectsData.length - VISIBLE // 2

export default function Projects() {
  const { lang } = useLang()
  const tr = translations[lang].projects
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [modalProject, setModalProject] = useState(null)
  const headerRef = useRef(null)
  useReveal(headerRef)

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1))
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(MAX_INDEX, i + 1))
  }, [])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setCurrentIndex((i) => (i >= MAX_INDEX ? 0 : i + 1))
    }, 3500)
    return () => clearInterval(id)
  }, [isPaused])

  function openModal(projectId) {
    const idx = projectsData.findIndex((p) => p.id === projectId)
    setModalProject(idx)
  }

  function closeModal() {
    setModalProject(null)
  }

  return (
    <section id="trabajos" className="projects">
      <div className="projects-inner">
        <div className="projects-header reveal" ref={headerRef}>
          <p className="section-label">{tr.label}</p>
          <h2 className="section-title">{tr.title}</h2>
        </div>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={`carousel-arrow carousel-arrow--prev${currentIndex === 0 ? ' carousel-arrow--hidden' : ''}`}
            onClick={prev}
            aria-label={tr.prevSlide}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{ transform: `translateX(calc(-${currentIndex} * (100% + var(--gap)) / ${VISIBLE}))` }}
            >
              {projectsData.map((p) => (
                <div key={p.id} className="project-card" onClick={() => openModal(p.id)}>
                  <div className="project-thumb">
                    <img src={p.image} alt={p.title} />
                    <div className="project-overlay">
                      <span className="project-view">{tr.viewBtn}</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <p className="project-category">{tr.categories[p.categoryKey]}</p>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-description">{tr.descriptions[p.id]}</p>
                    <button className="project-link" onClick={() => openModal(p.id)}>
                      {tr.viewBtn}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`carousel-arrow carousel-arrow--next${currentIndex === MAX_INDEX ? ' carousel-arrow--hidden' : ''}`}
            onClick={next}
            aria-label={tr.nextSlide}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === currentIndex ? ' carousel-dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`${tr.goToSlide} ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {modalProject !== null && (
        <ProjectModal
          projects={projectsData}
          initialIndex={modalProject}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
