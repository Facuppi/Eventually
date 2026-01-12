import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import Calendar from '../components/Calendar'
import AvailabilityMatrix from '../components/AvailabilityMatrix'
import Comments from '../components/Comments'

function EventPage() {
  const { id } = useParams()
  const { user, refreshEvents } = useUser()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [participantName, setParticipantName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [hasExistingResponse, setHasExistingResponse] = useState(false)
  const [availability, setAvailability] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('vote')
  const [viewMode, setViewMode] = useState('calendar') // 'calendar' or 'list'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    fetchEvent()
    setMounted(true)
  }, [id])

  useEffect(() => {
    if (user?.email && event && !isEditing) {
      checkExistingResponse()
    }
  }, [user, event])

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    }
    setLoading(false)
  }

  const checkExistingResponse = async () => {
    if (!user?.email) return
    
    try {
      const response = await fetch(`/api/events/${id}/response/${encodeURIComponent(user.email)}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setAvailability(data.availability)
          setParticipantName(data.participant_name)
          setHasExistingResponse(true)
        } else {
          initializeAvailability()
        }
      }
    } catch (error) {
      console.error('Error checking response:', error)
      initializeAvailability()
    }
  }

  const initializeAvailability = () => {
    if (!event) return
    const initial = {}
    event.selected_dates.forEach(date => {
      initial[date] = 'available'
    })
    setAvailability(initial)
  }

  const handleStartResponding = () => {
    if (!participantName.trim()) return
    if (Object.keys(availability).length === 0) {
      initializeAvailability()
    }
    setIsEditing(true)
  }

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability)
    setSaved(false)
  }

  // Quick vote functions
  const setAllAvailable = () => {
    const newAvailability = {}
    event.selected_dates.forEach(date => {
      newAvailability[date] = 'available'
    })
    setAvailability(newAvailability)
    setSaved(false)
  }

  const setAllUnavailable = () => {
    const newAvailability = {}
    event.selected_dates.forEach(date => {
      newAvailability[date] = 'unavailable'
    })
    setAvailability(newAvailability)
    setSaved(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/events/${id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantEmail: user?.email || `anon-${Date.now()}@eventually.app`,
          participantName,
          availability
        })
      })
      if (response.ok) {
        setSaved(true)
        setHasExistingResponse(true)
        refreshEvents()
        fetchEvent()
        
        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
    } catch (error) {
      console.error('Error saving response:', error)
    }
    setIsSaving(false)
  }

  const handleCommentAdded = (comment) => {
    setEvent(prev => ({
      ...prev,
      comments: [...(prev.comments || []), comment]
    }))
  }

  const formatDateForList = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const formatDateLong = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="page skeleton-page">
        <div className="skeleton-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="container">
          <div className="skeleton skeleton-card"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center fade-in">
          <div className="empty-illustration">🔍</div>
          <h2>Evento no encontrado</h2>
          <p>El link puede estar incorrecto o el evento ya no existe.</p>
          <Link to="/" className="btn btn-primary mt-2">Ir al inicio</Link>
        </div>
      </div>
    )
  }

  if (event.status === 'closed') {
    return (
      <div className="page">
        <div className="container" style={{ maxWidth: '800px', paddingTop: '2rem' }}>
          <div className="winner-banner fade-in">
            <div className="winner-icon">🎉</div>
            <h2>Fecha confirmada</h2>
            <div className="winner-date">{formatDateLong(event.winner_date)}</div>
          </div>
          
          <div className="card fade-in">
            <div className="card-header">
              <h3>{event.name}</h3>
              <p>El organizador ha cerrado la votación y confirmado la fecha.</p>
            </div>
            
            <AvailabilityMatrix 
              dates={event.selected_dates} 
              responses={event.responses || []} 
            />
          </div>

          {/* Comments */}
          <div className="card fade-in mt-3">
            <div className="card-header">
              <h3>💬 Comentarios</h3>
            </div>
            <Comments 
              eventId={id}
              comments={event.comments || []}
              onCommentAdded={handleCommentAdded}
              userName={participantName}
              userEmail={user?.email}
            />
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/" className="btn btn-secondary">Volver al inicio</Link>
          </div>
        </div>
      </div>
    )
  }

  const sortedDates = [...event.selected_dates].sort()

  return (
    <div className="page event-page">
      <div className="bg-gradient"></div>
      
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        <h1>{event.name}</h1>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        {event.location && (
          <p className="event-location">📍 {event.location}</p>
        )}
        <p className="event-stats">
          {event.responses?.length || 0} de {event.expected_participants} participantes han respondido
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Tabs */}
        <div className={`tabs ${mounted ? 'mounted' : ''}`}>
          <button 
            className={`tab ${activeTab === 'vote' ? 'active' : ''}`}
            onClick={() => setActiveTab('vote')}
          >
            <span className="tab-icon">🗳️</span>
            <span className="tab-label">Votar</span>
          </button>
          <button 
            className={`tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">Resultados</span>
          </button>
          <button 
            className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            <span className="tab-icon">💬</span>
            <span className="tab-label">Chat</span>
            {event.comments?.length > 0 && (
              <span className="tab-badge">{event.comments.length}</span>
            )}
          </button>
        </div>

        {/* Vote Tab */}
        {activeTab === 'vote' && (
          <>
            {!isEditing && !hasExistingResponse ? (
              <div className="card fade-in text-center">
                <div className="welcome-icon">👋</div>
                <h3>¿Cómo te llamas?</h3>
                <p className="welcome-description">
                  {user?.email 
                    ? `Conectado como ${user.email}` 
                    : 'Ingresa tu nombre para marcar tu disponibilidad'}
                </p>
                <div className="name-input-wrapper">
                  <input
                    type="text"
                    className="form-input name-input"
                    placeholder="Tu nombre"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleStartResponding()}
                    maxLength={50}
                  />
                </div>
                <button 
                  className="btn btn-primary btn-lg"
                  disabled={!participantName.trim()}
                  onClick={handleStartResponding}
                >
                  Continuar →
                </button>
              </div>
            ) : (
              <div className="card fade-in">
                <div className="card-header">
                  <div className="header-content">
                    <div>
                      <h3>
                        {hasExistingResponse && !isEditing 
                          ? `${participantName}, ya votaste 👍` 
                          : `Hola, ${participantName} 👋`}
                      </h3>
                      <p>
                        {hasExistingResponse && !isEditing
                          ? 'Tu respuesta está guardada. Puedes editarla si quieres.'
                          : 'Haz clic en cada fecha para cambiar tu disponibilidad'}
                      </p>
                    </div>
                    {saved && (
                      <span className="saved-badge">✓ Guardado</span>
                    )}
                  </div>
                </div>

                {(isEditing || hasExistingResponse) && (
                  <>
                    {/* Quick vote buttons */}
                    <div className="quick-vote">
                      <span className="quick-vote-label">Marcar todas:</span>
                      <button 
                        type="button"
                        className="btn btn-sm btn-quick available"
                        onClick={setAllAvailable}
                      >
                        ✓ Puedo
                      </button>
                      <button 
                        type="button"
                        className="btn btn-sm btn-quick unavailable"
                        onClick={setAllUnavailable}
                      >
                        ✗ No puedo
                      </button>
                    </div>

                    {/* View mode toggle */}
                    <div className="view-toggle">
                      <button 
                        className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                        onClick={() => setViewMode('calendar')}
                      >
                        📅 Calendario
                      </button>
                      <button 
                        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        📋 Lista
                      </button>
                    </div>

                    {viewMode === 'calendar' ? (
                      <Calendar
                        selectedDates={event.selected_dates}
                        availability={availability}
                        onAvailabilityChange={handleAvailabilityChange}
                        mode="respond"
                        viewMode={event.view_mode}
                      />
                    ) : (
                      <div className="list-view">
                        {sortedDates.map(date => {
                          const status = availability[date] || 'available'
                          return (
                            <div 
                              key={date}
                              className={`list-item ${status}`}
                              onClick={() => {
                                const states = ['available', 'adaptable', 'unavailable']
                                const currentIndex = states.indexOf(status)
                                const nextIndex = (currentIndex + 1) % states.length
                                handleAvailabilityChange({
                                  ...availability,
                                  [date]: states[nextIndex]
                                })
                              }}
                            >
                              <span className="list-date">{formatDateForList(date)}</span>
                              <span className={`list-status ${status}`}>
                                {status === 'available' && '✓ Puedo'}
                                {status === 'adaptable' && '~ Me adapto'}
                                {status === 'unavailable' && '✗ No puedo'}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <div className="legend">
                      <div className="legend-item">
                        <div className="legend-color available"></div>
                        <span>Puedo</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color adaptable"></div>
                        <span>Me adapto</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color unavailable"></div>
                        <span>No puedo</span>
                      </div>
                    </div>

                    <div className="vote-actions">
                      {!hasExistingResponse && (
                        <button 
                          className="btn btn-secondary"
                          onClick={() => {
                            setIsEditing(false)
                            setParticipantName('')
                          }}
                        >
                          Cambiar nombre
                        </button>
                      )}
                      {hasExistingResponse && !isEditing && (
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setIsEditing(true)}
                        >
                          Editar respuesta
                        </button>
                      )}
                      <button 
                        className="btn btn-success btn-save"
                        disabled={isSaving}
                        onClick={handleSave}
                      >
                        {isSaving ? (
                          <span className="btn-loading">
                            <span className="spinner"></span>
                            Guardando...
                          </span>
                        ) : (
                          hasExistingResponse ? '✓ Actualizar' : '✓ Guardar respuesta'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="card fade-in">
            <div className="card-header">
              <h3>📊 Disponibilidad del grupo</h3>
              <p>Vista general de todas las respuestas</p>
            </div>
            
            <AvailabilityMatrix 
              dates={event.selected_dates} 
              responses={event.responses || []} 
            />

            <div className="legend" style={{ marginTop: '1rem' }}>
              <div className="legend-item">
                <div className="legend-color available"></div>
                <span>Puedo</span>
              </div>
              <div className="legend-item">
                <div className="legend-color adaptable"></div>
                <span>Me adapto</span>
              </div>
              <div className="legend-item">
                <div className="legend-color unavailable"></div>
                <span>No puedo</span>
              </div>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="card fade-in">
            <div className="card-header">
              <h3>💬 Comentarios</h3>
              <p>Comunícate con los demás participantes</p>
            </div>
            
            <Comments 
              eventId={id}
              comments={event.comments || []}
              onCommentAdded={handleCommentAdded}
              userName={participantName || user?.email?.split('@')[0]}
              userEmail={user?.email}
            />
          </div>
        )}
      </div>

      <style>{`
        .event-page {
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

        .event-description {
          max-width: 500px;
          margin: 0.5rem auto;
          font-size: 1rem;
        }

        .event-location {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .event-stats {
          font-size: 0.9375rem;
          margin-top: 0.5rem;
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: var(--bg-tertiary);
          padding: 4px;
          border-radius: var(--radius-md);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.4s ease;
        }

        .tabs.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .tab:hover {
          color: var(--text-primary);
        }

        .tab.active {
          background: var(--bg-secondary);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .tab-icon {
          font-size: 1rem;
        }

        .tab-badge {
          position: absolute;
          top: 4px;
          right: 8px;
          background: var(--accent);
          color: white;
          font-size: 0.625rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 100px;
          min-width: 18px;
        }

        .welcome-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }

        .welcome-description {
          margin-bottom: 1.5rem;
        }

        .name-input-wrapper {
          max-width: 300px;
          margin: 0 auto 1rem;
        }

        .name-input {
          text-align: center;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .saved-badge {
          background: var(--available-bg);
          color: var(--available);
          padding: 0.375rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          animation: popIn 0.3s ease;
        }

        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .quick-vote {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
          flex-wrap: wrap;
        }

        .quick-vote-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .btn-quick {
          border: none;
        }

        .btn-quick.available {
          background: var(--available-bg);
          color: var(--available);
        }

        .btn-quick.available:hover {
          background: var(--available);
          color: white;
        }

        .btn-quick.unavailable {
          background: var(--unavailable-bg);
          color: var(--unavailable);
        }

        .btn-quick.unavailable:hover {
          background: var(--unavailable);
          color: white;
        }

        .view-toggle {
          display: inline-flex;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 4px;
          gap: 4px;
          margin-bottom: 1rem;
        }

        .list-view {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .list-item:hover {
          transform: translateX(4px);
        }

        .list-item.available {
          border-color: var(--available);
          background: var(--available-bg);
        }

        .list-item.adaptable {
          border-color: var(--adaptable);
          background: var(--adaptable-bg);
        }

        .list-item.unavailable {
          border-color: var(--unavailable);
          background: var(--unavailable-bg);
        }

        .list-date {
          font-weight: 500;
          text-transform: capitalize;
        }

        .list-status {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .list-status.available { color: var(--available); }
        .list-status.adaptable { color: var(--adaptable); }
        .list-status.unavailable { color: var(--unavailable); }

        .vote-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }

        .btn-save {
          margin-left: auto;
        }

        .btn-loading {
          display: flex;
          align-items: center;
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

        .empty-illustration {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .winner-banner {
          text-align: center;
          background: linear-gradient(135deg, var(--available) 0%, #2ecc71 100%);
          color: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
        }

        .winner-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .winner-banner h2 {
          margin-bottom: 0.5rem;
        }

        .winner-date {
          font-size: 1.5rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .skeleton-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .skeleton-header {
          text-align: center;
          padding: 3rem 2rem;
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-tertiary) 25%,
            var(--bg-hover) 50%,
            var(--bg-tertiary) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-md);
        }
        .skeleton-title {
          width: 300px;
          height: 40px;
          margin: 0 auto 1rem;
        }
        .skeleton-subtitle {
          width: 200px;
          height: 20px;
          margin: 0 auto;
        }
        .skeleton-card {
          max-width: 600px;
          height: 400px;
          margin: 2rem auto 0;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 480px) {
          .tab-label {
            display: none;
          }

          .tab-icon {
            font-size: 1.25rem;
          }

          .vote-actions {
            flex-direction: column;
          }

          .btn-save {
            margin-left: 0;
          }

          .quick-vote {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default EventPage
