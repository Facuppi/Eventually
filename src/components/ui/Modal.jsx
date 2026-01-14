import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  sheet = false 
}) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      document.body.style.overflow = 'hidden'
      modalRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-width: 360px',
    md: 'max-width: 500px',
    lg: 'max-width: 700px',
    xl: 'max-width: 900px'
  }

  return createPortal(
    <>
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className={`modal ${sheet ? 'modal--sheet' : ''}`}
        style={{ [sizeClasses[size]]: true }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        {title && (
          <header className="modal__header">
            <h2 id="modal-title" className="modal__title">{title}</h2>
          </header>
        )}
        <div className="modal__body">
          {children}
        </div>
        {footer && (
          <footer className="modal__footer">
            {footer}
          </footer>
        )}
      </div>
    </>,
    document.body
  )
}

