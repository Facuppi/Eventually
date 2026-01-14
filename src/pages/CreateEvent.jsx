import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ProgressBar } from '../components/ui/ProgressBar'
import { CalendarPicker } from '../components/CalendarPicker'
import { useToast } from '../components/ui/Toast'

const STEPS = ['Detalles', 'Fechas', 'Revisar']
const DRAFT_KEY = 'eventually_event_draft'

// Color options for theme
const COLOR_OPTIONS = [
  { value: '#6366f1', name: 'Índigo' },
  { value: '#8b5cf6', name: 'Violeta' },
  { value: '#ec4899', name: 'Rosa' },
  { value: '#ef4444', name: 'Rojo' },
  { value: '#f59e0b', name: 'Ámbar' },
  { value: '#10b981', name: 'Esmeralda' },
  { value: '#3b82f6', name: 'Azul' },
  { value: '#06b6d4', name: 'Cian' },
]

export default function CreateEvent() {
  const navigate = useNavigate()
  const toast = useToast()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    themeColor: '#6366f1',
    dates: [],
    organizerName: '',
    organizerEmail: ''
  })

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY)
    if (saved) {
      try {
        const draft = JSON.parse(saved)
        setFormData(draft)
        toast.info('Borrador recuperado')
      } catch (e) {
        // Ignore invalid draft
      }
    }
  }, [])

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.dates.length > 0) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData))
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData])

  // Update form field
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }, [errors])

  // Validate current step
  const validateStep = useCallback(() => {
    const newErrors = {}
    
    if (currentStep === 0) {
      if (!formData.title.trim()) {
        newErrors.title = 'El nombre del evento es requerido'
      } else if (formData.title.length < 3) {
        newErrors.title = 'El nombre debe tener al menos 3 caracteres'
      }
    }
    
    if (currentStep === 1) {
      if (formData.dates.length === 0) {
        newErrors.dates = 'Seleccioná al menos una fecha'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [currentStep, formData])

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1)
        window.scrollTo(0, 0)
      }
    }
  }

  // Handle back
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle submit
  const handleSubmit = async () => {
    if (!validateStep()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          location: formData.location.trim(),
          dates: formData.dates,
          theme_color: formData.themeColor,
          organizer_name: formData.organizerName.trim() || 'Organizador',
          organizer_email: formData.organizerEmail.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Error al crear el evento')
      }

      const data = await response.json()
      
      // Clear draft
      localStorage.removeItem(DRAFT_KEY)
      
      toast.success('¡Evento creado exitosamente!')
      
      // Navigate to admin page
      navigate(`/admin/${data.admin_id}`)
      
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al crear el evento. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear draft
  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
    setFormData({
      title: '',
      description: '',
      location: '',
      themeColor: '#6366f1',
      dates: [],
      organizerName: '',
      organizerEmail: ''
    })
    setCurrentStep(0)
    toast.success('Borrador eliminado')
  }

  // Format date for display
  const formatDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }

  return (
    <div className="page create-page">
      <div className="container container--narrow">
        {/* Header */}
        <header className="create-header">
          <button 
            className="create-back-btn"
            onClick={() => navigate('/')}
            aria-label="Volver al inicio"
          >
            ← Inicio
          </button>
          <h1 className="create-title">Crear evento</h1>
        </header>

        {/* Progress */}
        <ProgressBar 
          steps={STEPS} 
          currentStep={currentStep}
          showLabels={true}
          showPercentage={true}
        />

        {/* Step 1: Details */}
        {currentStep === 0 && (
          <div className="create-step animate-fade-in-up">
            <div className="card">
              <div className="card__header">
                <h2 className="card__title">
                  <span>📝</span> Detalles del evento
                </h2>
                <p className="card__description">
                  Contanos sobre tu evento
                </p>
              </div>

              <Input
                label="Nombre del evento"
                placeholder="Ej: Asado de fin de año"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                maxLength={100}
                showCounter={true}
                error={errors.title}
                required
                autoFocus
              />

              <div className="form-group">
                <label className="form-label">
                  Descripción
                  <span className="form-label__optional">(opcional)</span>
                </label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Detalles adicionales sobre el evento..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  maxLength={500}
                  rows={3}
                />
                <p className="form-counter">{formData.description.length}/500</p>
              </div>

              <Input
                label="Ubicación"
                placeholder="Ej: Casa de Juan, Palermo"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                maxLength={200}
                optional
                hint="Dirección o lugar del evento"
              />

              <div className="form-group">
                <label className="form-label">Color del tema</label>
                <div className="color-picker">
                  {COLOR_OPTIONS.map(color => (
                    <button
                      key={color.value}
                      className={`color-option ${formData.themeColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => updateField('themeColor', color.value)}
                      aria-label={color.name}
                      title={color.name}
                    >
                      {formData.themeColor === color.value && (
                        <span className="color-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Tu nombre"
                placeholder="Ej: Juan"
                value={formData.organizerName}
                onChange={(e) => updateField('organizerName', e.target.value)}
                maxLength={50}
                optional
                hint="Aparecerá como organizador del evento"
              />
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {currentStep === 1 && (
          <div className="create-step animate-fade-in-up">
            <div className="card">
              <div className="card__header">
                <h2 className="card__title">
                  <span>📅</span> Fechas posibles
                </h2>
                <p className="card__description">
                  Seleccioná las fechas en las que podría hacerse el evento
                </p>
              </div>

              {errors.dates && (
                <div className="form-error" role="alert" style={{ marginBottom: 'var(--space-4)' }}>
                  <span>⚠</span> {errors.dates}
                </div>
              )}

              <CalendarPicker
                selectedDates={formData.dates}
                onDatesChange={(dates) => updateField('dates', dates)}
                showQuickButtons={true}
                showSelectedList={true}
                showLegend={true}
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 2 && (
          <div className="create-step animate-fade-in-up">
            <div className="card">
              <div className="card__header">
                <h2 className="card__title">
                  <span>👁️</span> Revisar y crear
                </h2>
                <p className="card__description">
                  Verificá que todo esté correcto antes de crear el evento
                </p>
              </div>

              <div className="review-section">
                <div className="review-item">
                  <span className="review-label">Nombre</span>
                  <span className="review-value">{formData.title}</span>
                  <button 
                    className="review-edit"
                    onClick={() => setCurrentStep(0)}
                  >
                    Editar
                  </button>
                </div>

                {formData.description && (
                  <div className="review-item">
                    <span className="review-label">Descripción</span>
                    <span className="review-value">{formData.description}</span>
                  </div>
                )}

                {formData.location && (
                  <div className="review-item">
                    <span className="review-label">Ubicación</span>
                    <span className="review-value">{formData.location}</span>
                  </div>
                )}

                <div className="review-item">
                  <span className="review-label">Color</span>
                  <span className="review-value">
                    <span 
                      className="review-color" 
                      style={{ backgroundColor: formData.themeColor }}
                    ></span>
                  </span>
                </div>

                <div className="review-item">
                  <span className="review-label">Organizador</span>
                  <span className="review-value">
                    {formData.organizerName || 'Organizador'}
                  </span>
                </div>

                <div className="review-item review-item--dates">
                  <div className="review-label-row">
                    <span className="review-label">Fechas ({formData.dates.length})</span>
                    <button 
                      className="review-edit"
                      onClick={() => setCurrentStep(1)}
                    >
                      Editar
                    </button>
                  </div>
                  <div className="review-dates">
                    {formData.dates.slice().sort().map(dateKey => (
                      <span key={dateKey} className="review-date-tag">
                        {formatDate(dateKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="review-notice">
                <span className="review-notice__icon">ℹ️</span>
                <p>
                  Al crear el evento recibirás un <strong>link de administrador</strong> para 
                  compartir y ver los resultados. ¡Guardalo bien!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="create-nav">
          <div className="create-nav__left">
            {currentStep > 0 && (
              <Button variant="ghost" onClick={handleBack}>
                ← Atrás
              </Button>
            )}
            {(formData.title || formData.dates.length > 0) && (
              <Button variant="ghost" size="sm" onClick={handleClearDraft}>
                Limpiar borrador
              </Button>
            )}
          </div>
          
          <div className="create-nav__right">
            {currentStep < STEPS.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Continuar →
              </Button>
            ) : (
              <Button 
                variant="success" 
                size="lg"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : '¡Crear evento!'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .create-page {
          padding: var(--space-8) 0;
        }
        
        .create-header {
          margin-bottom: var(--space-6);
        }
        
        .create-back-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) 0;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
          margin-bottom: var(--space-2);
        }
        
        .create-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .create-title {
          font-size: var(--text-3xl);
        }
        
        .create-step {
          margin-bottom: var(--space-6);
        }
        
        /* Color picker */
        .color-picker {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        
        .color-option {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 3px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .color-option:hover {
          transform: scale(1.1);
        }
        
        .color-option.active {
          border-color: var(--color-text-primary);
          box-shadow: 0 0 0 2px var(--color-bg-secondary);
        }
        
        .color-check {
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        /* Review section */
        .review-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .review-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .review-item--dates {
          flex-direction: column;
          align-items: stretch;
        }
        
        .review-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .review-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-tertiary);
          min-width: 100px;
        }
        
        .review-value {
          flex: 1;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .review-edit {
          background: none;
          border: none;
          color: var(--color-accent-primary);
          font-size: var(--text-sm);
          cursor: pointer;
          padding: var(--space-1) var(--space-2);
        }
        
        .review-edit:hover {
          text-decoration: underline;
        }
        
        .review-color {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
        }
        
        .review-dates {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-top: var(--space-2);
        }
        
        .review-date-tag {
          padding: var(--space-1) var(--space-3);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
        }
        
        .review-notice {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-info-bg);
          border-radius: var(--radius-lg);
          margin-top: var(--space-4);
        }
        
        .review-notice__icon {
          font-size: var(--text-lg);
        }
        
        .review-notice p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        /* Navigation */
        .create-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .create-nav__left,
        .create-nav__right {
          display: flex;
          gap: var(--space-3);
        }
        
        @media (max-width: 640px) {
          .create-page {
            padding: var(--space-4) 0;
          }
          
          .review-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .review-value {
            width: 100%;
          }
          
          .create-nav {
            flex-direction: column-reverse;
            gap: var(--space-3);
          }
          
          .create-nav__left,
          .create-nav__right {
            width: 100%;
          }
          
          .create-nav__right .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
