import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import Calendar from '../components/Calendar'

const THEME_COLORS = [
  { name: 'Azul', value: '#0071e3' },
  { name: 'Violeta', value: '#6366f1' },
  { name: 'Verde', value: '#34c759' },
  { name: 'Naranja', value: '#ff9500' },
  { name: 'Rosa', value: '#ff2d55' },
  { name: 'Turquesa', value: '#00c7be' },
]

function CreateEvent() {
  const navigate = useNavigate()
  const { user, refreshEvents } = useUser()
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    expectedParticipants: 2,
    viewMode: 'days',
    selectedDates: [],
    themeColor: '#6366f1',
    customSlug: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState({ share: false, admin: false, readonly: false })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDatesChange = (dates) => {
    setEventData(prev => ({ ...prev, selectedDates: dates }))
  }

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...eventData,
          adminEmail: user?.email || ''
        })
      })
      const data = await response.json()
      setResult(data)
      setStep(3)
      refreshEvents()
    } catch (error) {
      console.error('Error creating event:', error)
    }
    setIsLoading(false)
  }

  const copyLink = (type, url) => {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopied(prev => ({ ...prev, [type]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
  }

  const shareWhatsApp = (url) => {
    const text = `¡Hola! Te invito a votar por las fechas para "${eventData.name}". Marca tu disponibilidad aquí:`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.origin + url)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareNative = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.name,
          text: `Vota por las fechas para "${eventData.name}"`,
          url: window.location.origin + url
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLink('share', url)
        }
      }
    } else {
      copyLink('share', url)
    }
  }

  // Redirect to home if not logged in
  if (!user) {
    navigate('/')
    return null
  }

  return (
    <div className="page create-page">
      <div className="bg-gradient"></div>
      
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Volver
        </Link>
        <h1>Crear nuevo evento</h1>
        <p>Define los detalles y selecciona las fechas posibles</p>
      </div>

      <div className="container">
        {/* Progress Steps */}
        <div className={`progress-steps ${mounted ? 'mounted' : ''}`}>
          {[
            { num: 1, label: 'Detalles' },
            { num: 2, label: 'Fechas' },
            { num: 3, label: 'Listo' }
          ].map((s, i) => (
            <div key={s.num} className="step-wrapper">
              {i > 0 && <div className={`step-line ${step > i ? 'active' : ''}`}></div>}
              <div 
                className={`step-indicator ${step >= s.num ? 'active' : ''} ${step === s.num ? 'current' : ''}`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`step-label ${step >= s.num ? 'active' : ''}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className={`card step-card ${mounted ? 'mounted' : ''}`}>
            <div className="card-header">
              <span className="card-icon">📝</span>
              <div>
                <h3>Información del evento</h3>
                <p>Cuéntanos sobre tu reunión</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nombre del evento *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Reunión de equipo Q1"
                  value={eventData.name}
                  onChange={(e) => setEventData(prev => ({ ...prev, name: e.target.value }))}
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción (opcional)</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Agrega contexto o instrucciones para los participantes..."
                  value={eventData.description}
                  onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ubicación (opcional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Zoom, Oficina principal, etc."
                  value={eventData.location}
                  onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                  maxLength={200}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Participantes esperados</label>
                  <input
                    type="number"
                    className="form-input"
                    min="2"
                    max="100"
                    value={eventData.expectedParticipants}
                    onChange={(e) => setEventData(prev => ({ 
                      ...prev, 
                      expectedParticipants: parseInt(e.target.value) || 2 
                    }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de vista</label>
                  <div className="toggle-group">
                    <button 
                      type="button"
                      className={`toggle-btn ${eventData.viewMode === 'days' ? 'active' : ''}`}
                      onClick={() => setEventData(prev => ({ ...prev, viewMode: 'days' }))}
                    >
                      Días
                    </button>
                    <button 
                      type="button"
                      className={`toggle-btn ${eventData.viewMode === 'weeks' ? 'active' : ''}`}
                      onClick={() => setEventData(prev => ({ ...prev, viewMode: 'weeks' }))}
                    >
                      Semanas
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Color del tema</label>
                <div className="color-picker">
                  {THEME_COLORS.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      className={`color-option ${eventData.themeColor === color.value ? 'selected' : ''}`}
                      style={{ '--color': color.value }}
                      onClick={() => setEventData(prev => ({ ...prev, themeColor: color.value }))}
                      title={color.name}
                    >
                      {eventData.themeColor === color.value && '✓'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={!eventData.name.trim()}
              onClick={() => setStep(2)}
            >
              Continuar <span className="btn-arrow">→</span>
            </button>
          </div>
        )}

        {/* Step 2: Select Dates */}
        {step === 2 && (
          <div className={`card step-card ${mounted ? 'mounted' : ''}`}>
            <div className="card-header">
              <span className="card-icon">📅</span>
              <div>
                <h3>Selecciona las fechas</h3>
                <p>Elige los días posibles para la reunión</p>
              </div>
            </div>

            <Calendar
              selectedDates={eventData.selectedDates}
              onDatesChange={handleDatesChange}
              mode="select"
              viewMode={eventData.viewMode}
            />

            <div className="legend">
              <div className="legend-item">
                <div className="legend-color selected"></div>
                <span>Seleccionado</span>
              </div>
              <div className="selected-count">
                <strong>{eventData.selectedDates.length}</strong> fechas seleccionadas
              </div>
            </div>

            <div className="step-actions">
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
              >
                ← Atrás
              </button>
              <button 
                className="btn btn-primary btn-lg"
                disabled={eventData.selectedDates.length === 0 || isLoading}
                onClick={handleCreate}
              >
                {isLoading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Creando...
                  </span>
                ) : (
                  <>Crear evento</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && result && (
          <div className={`card step-card success-card ${mounted ? 'mounted' : ''}`}>
            <div className="success-animation">
              <div className="success-circle">
                <span className="success-icon">🎉</span>
              </div>
              <div className="confetti">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="confetti-piece" style={{ '--delay': `${i * 0.1}s`, '--x': `${Math.random() * 200 - 100}px` }}></div>
                ))}
              </div>
            </div>
            
            <h2 className="success-title">¡Evento creado!</h2>
            <p className="success-subtitle">Comparte el link con los participantes</p>

            {/* Share link */}
            <div className="link-card">
              <div className="link-header">
                <span className="link-icon">🔗</span>
                <span className="link-label">Link para participantes</span>
              </div>
              <div className="link-content">
                <input
                  type="text"
                  className="link-input"
                  value={window.location.origin + result.shareUrl}
                  readOnly
                />
                <div className="link-actions">
                  <button 
                    className={`btn btn-sm ${copied.share ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => copyLink('share', result.shareUrl)}
                  >
                    {copied.share ? '✓ Copiado' : 'Copiar'}
                  </button>
                  <button 
                    className="btn btn-sm btn-whatsapp"
                    onClick={() => shareWhatsApp(result.shareUrl)}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                  {navigator.share && (
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => shareNative(result.shareUrl)}
                    >
                      📤 Compartir
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Readonly link */}
            <div className="link-card link-card-secondary">
              <div className="link-header">
                <span className="link-icon">👁️</span>
                <span className="link-label">Link de solo lectura (para ver resultados)</span>
              </div>
              <div className="link-content">
                <input
                  type="text"
                  className="link-input"
                  value={window.location.origin + result.readonlyUrl}
                  readOnly
                />
                <button 
                  className={`btn btn-sm ${copied.readonly ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => copyLink('readonly', result.readonlyUrl)}
                >
                  {copied.readonly ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Admin link */}
            <div className="link-card link-card-warning">
              <div className="link-header">
                <span className="link-icon">👑</span>
                <span className="link-label">Link de administrador (guárdalo)</span>
              </div>
              <div className="link-content">
                <input
                  type="text"
                  className="link-input"
                  value={window.location.origin + result.adminUrl}
                  readOnly
                />
                <button 
                  className={`btn btn-sm ${copied.admin ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => copyLink('admin', result.adminUrl)}
                >
                  {copied.admin ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Volver al inicio
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate(result.adminUrl)}
              >
                Ver panel de admin →
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .create-page {
          position: relative;
        }

        .bg-gradient {
          position: fixed;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(14, 165, 233, 0.06) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .back-link {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--accent);
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.4s ease;
        }

        .progress-steps.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .step-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .step-line {
          position: absolute;
          top: 20px;
          right: 50%;
          width: 60px;
          height: 2px;
          background: var(--border-color);
          transition: background 0.3s;
        }

        .step-line.active {
          background: var(--accent);
        }

        .step-indicator {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-color);
          color: var(--text-tertiary);
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .step-indicator.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .step-indicator.current {
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
        }

        .step-label {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          transition: color 0.3s;
          min-width: 80px;
          text-align: center;
        }

        .step-label.active {
          color: var(--text-primary);
        }

        .step-card {
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .step-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .card-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .card-icon {
          font-size: 2rem;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .color-picker {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .color-option {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid transparent;
          background: var(--color);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
        }

        .color-option:hover {
          transform: scale(1.1);
        }

        .color-option.selected {
          border-color: var(--text-primary);
          box-shadow: 0 0 0 2px var(--bg-secondary);
        }

        .selected-count {
          margin-left: auto;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .step-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }

        .step-actions .btn-primary {
          flex: 1;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .btn-arrow {
          transition: transform 0.2s;
        }

        .btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Success card */
        .success-card {
          text-align: center;
        }

        .success-animation {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .success-circle {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: success-pop 0.5s ease;
        }

        @keyframes success-pop {
          0% { transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .success-icon {
          font-size: 2.5rem;
        }

        .confetti {
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 2px;
          animation: confetti 1s ease forwards;
          animation-delay: var(--delay);
        }

        .confetti-piece:nth-child(odd) {
          background: #ff9500;
        }

        .confetti-piece:nth-child(3n) {
          background: #34c759;
        }

        @keyframes confetti {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), -100px) rotate(720deg);
            opacity: 0;
          }
        }

        .success-title {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .success-subtitle {
          margin-bottom: 2rem;
        }

        .link-card {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1rem;
          text-align: left;
        }

        .link-card-secondary {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
        }

        .link-card-warning {
          background: rgba(255, 149, 0, 0.1);
          border: 1px solid rgba(255, 149, 0, 0.3);
        }

        .link-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .link-icon {
          font-size: 1rem;
        }

        .link-label {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .link-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .link-input {
          flex: 1;
          padding: 0.625rem 0.875rem;
          font-size: 0.8125rem;
          font-family: monospace;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        .link-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-whatsapp {
          background: #25D366;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .btn-whatsapp:hover {
          background: #20bd5a;
        }

        .success-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .success-actions {
            flex-direction: column;
          }

          .link-actions {
            flex-direction: column;
          }

          .link-actions .btn {
            width: 100%;
          }

          .step-line {
            width: 40px;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateEvent
