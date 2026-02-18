import { useState, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import './ProjectModal.css'

export default function ProjectModal({ projects, initialIndex, onClose }) {
  const { lang } = useLang()
  const tr = translations[lang]
  const mtr = tr.modal
  const ptrCategories = tr.projects.categories
  const ptrDescriptions = tr.projects.descriptions

  const [projectIndex, setProjectIndex] = useState(initialIndex)
  const [imageIndex, setImageIndex] = useState(0)

  const project = projects[projectIndex]
  const images = project.images ?? [project.image]
  const total = projects.length

  // Reset image index when project changes
  useEffect(() => { setImageIndex(0) }, [projectIndex])

  // ESC to close
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const prevProject = useCallback(() => {
    setProjectIndex((i) => Math.max(0, i - 1))
  }, [])

  const nextProject = useCallback(() => {
    setProjectIndex((i) => Math.min(total - 1, i + 1))
  }, [total])

  const prevImage = useCallback(() => {
    setImageIndex((i) => Math.max(0, i - 1))
  }, [])

  const nextImage = useCallback(() => {
    setImageIndex((i) => Math.min(images.length - 1, i + 1))
  }, [images.length])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label={mtr.close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="modal-content">

          {/* Two-column row: info + gallery */}
          <div className="modal-columns">

            {/* Left — project info */}
            <div className="modal-info">
              <p className="modal-category">{ptrCategories[project.categoryKey]}</p>
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-description">{ptrDescriptions[project.id]}</p>
            </div>

            {/* Right — image gallery */}
            <div className="modal-gallery">
              <p className="modal-gallery-label">{mtr.gallery}</p>

              <div className="modal-image-wrap">
                <img
                  key={imageIndex}
                  src={images[imageIndex]}
                  alt={`${project.title} — ${imageIndex + 1}`}
                  className="modal-image"
                />

                {images.length > 1 && (
                  <>
                    <button
                      className={`modal-img-arrow modal-img-arrow--prev${imageIndex === 0 ? ' modal-img-arrow--hidden' : ''}`}
                      onClick={prevImage}
                      aria-label={mtr.prevImage}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className={`modal-img-arrow modal-img-arrow--next${imageIndex === images.length - 1 ? ' modal-img-arrow--hidden' : ''}`}
                      onClick={nextImage}
                      aria-label={mtr.nextImage}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <span className="modal-image-counter">{imageIndex + 1} / {images.length}</span>
                  </>
                )}
              </div>

              {/* Dot thumbnails */}
              {images.length > 1 && (
                <div className="modal-image-dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-image-dot${i === imageIndex ? ' modal-image-dot--active' : ''}`}
                      onClick={() => setImageIndex(i)}
                      aria-label={`${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Visit site */}
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-site-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  {mtr.visitSite}
                </a>
              )}
            </div>
          </div>

          {/* Review — full width below both columns */}
          {project.review && (() => {
            const rev = project.review
            const reviewText = lang === 'en' ? (rev.textEn ?? rev.text) : rev.text
            const reviewRole = lang === 'en' ? (rev.roleEn ?? rev.role) : rev.role
            return (
              <div className="modal-review">
                <div className="modal-review-top">
                  <div className="modal-review-avatar" style={{ background: rev.color }}>
                    {rev.avatar}
                  </div>
                  <div>
                    <p className="modal-review-name">{rev.name}</p>
                    <p className="modal-review-role">{reviewRole}</p>
                  </div>
                </div>
                <div className="modal-review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24"
                      fill={i < rev.rating ? '#f59e0b' : 'none'}
                      stroke={i < rev.rating ? '#f59e0b' : '#475569'}
                      strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="modal-review-text">"{reviewText}"</p>
              </div>
            )
          })()}
        </div>

        {/* Footer nav */}
        <div className="modal-footer">
          <button
            className="modal-nav-btn"
            onClick={prevProject}
            disabled={projectIndex === 0}
          >
            {mtr.prev}
          </button>
          <span className="modal-nav-counter">{projectIndex + 1} / {total}</span>
          <button
            className="modal-nav-btn"
            onClick={nextProject}
            disabled={projectIndex === total - 1}
          >
            {mtr.next}
          </button>
        </div>

      </div>
    </div>
  )
}
