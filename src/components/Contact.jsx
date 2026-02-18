import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n'
import './Contact.css'

// Paso 1: activar con el email real → Paso 2: reemplazar por el hash que da FormSubmit
// Ej: 'daabf6254aa3dfa7dade9834ad9d54d2'
const FORMSUBMIT_ENDPOINT = '23fe958122ed4512d5941dc0bc670ade'

// URL del portfolio una vez deployado — actualizar antes de subir a producción
const NEXT_URL = 'https://github.com/ivml4/portfolio-ivan-maldonado/settings/pages'

export default function Contact() {
  const { lang } = useLang()
  const tr = translations[lang].contact
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  useReveal(headerRef)
  useReveal(formRef, { threshold: 0.1 })
  useReveal(infoRef, { threshold: 0.1 })

  return (
    <section id="contacto" className="contact">
      <div className="contact-inner">
        <div className="contact-header reveal" ref={headerRef}>
          <p className="section-label">{tr.label}</p>
          <h2 className="section-title">{tr.title}</h2>
        </div>
        <div className="contact-body">
          <form
            className="contact-form reveal-left"
            ref={formRef}
            action={`https://formsubmit.co/${FORMSUBMIT_ENDPOINT}`}
            method="POST"
          >
            {/* FormSubmit config */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={NEXT_URL} />
            <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />

            <div className="form-group">
              <label htmlFor="name">{tr.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={tr.namePlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{tr.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={tr.emailPlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{tr.message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={tr.messagePlaceholder}
                required
              />
            </div>
            <button type="submit" className="btn-submit">{tr.submit}</button>
          </form>

          <div className="contact-info reveal-right" ref={infoRef}>
            <h3 className="contact-connect-title">{tr.connectTitle}</h3>
            <p className="contact-connect-text">{tr.connectText}</p>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item-label">Email</p>
                  <a href="mailto:ivanleandromaldonado4@gmail.com" className="contact-item-value">ivanleandromaldonado4@gmail.com</a>
                </div>
              </div>
              <a className="contact-item" href="https://wa.me/5491160139986" target="_blank" rel="noopener noreferrer">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item-label">WhatsApp</p>
                  <span className="contact-item-value">+54 9 11 6013-9986</span>
                </div>
              </a>
              <a className="contact-item" href="https://www.linkedin.com/in/iv%C3%A1n-maldonado/" target="_blank" rel="noopener noreferrer">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item-label">LinkedIn</p>
                  <span className="contact-item-value">linkedin.com/in/iván-maldonado</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>{tr.footer}</p>
      </footer>
    </section>
  )
}
