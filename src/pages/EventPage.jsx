import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton'
import { VotingCalendar } from '../components/VotingCalendar'
import { useToast } from '../components/ui/Toast'
import Comments from '../components/Comments'

export default function EventPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Participant state
  const [participantName, setParticipantName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [nameError, setNameError] = useState('')

  // Voting state
  const [availability, setAvailability] = useState({})
  const [viewMode, setViewMode] = useState('calendar')
  const [isSaving, setIsSaving] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // Check for saved participant in localStorage
  useEffect(() => {
    const savedParticipant = localStorage.getItem(`eventually_participant_${id}`)
    if (savedParticipant) {
      const { name, availability: savedAvailability } = JSON.parse(savedParticipant)
      setParticipantName(name)
      setAvailability(savedAvailability || {})
      setIsNameSet(true)
      setHasVoted(true)
    } else {
      setShowNameModal(true)
    }
  }, [id])

  // Pre-populate all dates as available when event loads and user hasn't voted yet
  useEffect(() => {
    if (event && event.dates && !hasVoted && Object.keys(availability).length === 0) {
      const prePopulated = {}
      event.dates.forEach(date => {
        prePopulated[date] = 'available'
      })
      setAvailability(prePopulated)
    }
  }, [event, hasVoted])

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Evento no encontrado')
          } else {
            throw new Error('Error al cargar el evento')
          }
          return
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        console.error('Error:', err)
        setError('Error al cargar el evento')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  // Handle name submission
  const handleSetName = () => {
    const trimmedName = participantName.trim()
    
    if (!trimmedName) {
      setNameError('Ingresá tu nombre para votar')
      return
    }
    
    if (trimmedName.length < 2) {
      setNameError('El nombre debe tener al menos 2 caracteres')
      return
    }

    // Check if name already exists
    if (event?.participants?.some(p => 
      p.name.toLowerCase() === trimmedName.toLowerCase()
    )) {
      // Load existing participant's votes
      const existing = event.participants.find(p => 
        p.name.toLowerCase() === trimmedName.toLowerCase()
      )
      if (existing?.availability) {
        const existingAvailability = {}
        existing.availability.forEach(a => {
          existingAvailability[a.date] = a.status
        })
        setAvailability(existingAvailability)
        setHasVoted(true)
      }
    }

    setIsNameSet(true)
    setShowNameModal(false)
    setNameError('')
    toast.info(`Hola ${trimmedName}! Marcá tu disponibilidad`)
  }

  // Handle vote submission
  const handleSubmitVote = async () => {
    // Check if ALL dates have been voted on (required)
    const votedDates = Object.entries(availability).filter(([_, status]) => status !== null)
    const totalDates = event?.dates?.length || 0
    
    if (votedDates.length < totalDates) {
      const missing = totalDates - votedDates.length
      toast.error(`Tenés que votar en todas las fechas. Faltan ${missing} fecha(s).`)
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch(`/api/events/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: participantName.trim(),
          availability: votedDates.map(([date, status]) => ({
            date,
            status
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Error al guardar el voto')
      }

      // Save to localStorage with event info
      localStorage.setItem(`eventually_participant_${id}`, JSON.stringify({
        name: participantName.trim(),
        availability,
        eventTitle: event?.title,
        votedAt: new Date().toISOString()
      }))

      setHasVoted(true)
      toast.success('¡Tu voto fue guardado!')

      // Refresh event data
      const eventResponse = await fetch(`/api/events/${id}`)
      const eventData = await eventResponse.json()
      setEvent(eventData)

    } catch (err) {
      console.error('Error:', err)
      toast.error('Error al guardar el voto. Intentá de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle "Try without account" - just enter
  const handleTryWithoutAccount = () => {
    setParticipantName('Anónimo')
    setIsNameSet(true)
    setShowNameModal(false)
  }

  // Calculate stats for a date
  const calculateDateStats = (dateKey) => {
    if (!event?.participants || event.participants.length === 0) {
      return { available: 0, flexible: 0, unavailable: 0, percentage: 0 }
    }
    
    let available = 0, flexible = 0, unavailable = 0
    
    event.participants.forEach(participant => {
      const vote = participant.availability?.find(a => a.date === dateKey)
      if (vote?.status === 'available') available++
      else if (vote?.status === 'flexible') flexible++
      else if (vote?.status === 'unavailable') unavailable++
    })
    
    const total = event.participants.length
    const percentage = Math.round(((available + flexible * 0.5) / total) * 100)
    
    return { available, flexible, unavailable, percentage }
  }

  // Format date for display
  const formatDateDisplay = (dateKey) => {
    const [year, month, day] = dateKey.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('es-AR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }

  // Get best dates sorted by score
  const getBestDates = () => {
    if (!event?.dates || !event?.participants) return []
    
    return event.dates.map(date => {
      const stats = calculateDateStats(date)
      return {
        date,
        ...stats,
        score: stats.available * 3 + stats.flexible - stats.unavailable * 2
      }
    }).sort((a, b) => b.score - a.score)
  }

  // Loading state
  if (loading) {
    return (
      <div className="page event-page">
        <div className="container container--medium">
          <div className="event-header">
            <Skeleton variant="title" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
          <CardSkeleton />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="page event-page">
        <div className="container container--narrow">
          <div className="error-card card">
            <div className="error-icon">😕</div>
            <h2>Evento no encontrado</h2>
            <p>Este evento no existe o el link es incorrecto.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page event-page">
      {/* Name Modal */}
      <Modal
        isOpen={showNameModal}
        onClose={() => {}}
        title="¿Cómo te llamás?"
        sheet
        footer={
          <div className="name-modal-footer">
            <Button variant="ghost" onClick={handleTryWithoutAccount}>
              Votar anónimo
            </Button>
            <Button variant="primary" onClick={handleSetName}>
              Continuar
            </Button>
          </div>
        }
      >
        <Input
          placeholder="Tu nombre"
          value={participantName}
          onChange={(e) => {
            setParticipantName(e.target.value)
            setNameError('')
          }}
          error={nameError}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSetName()
          }}
        />
        <p className="name-modal-hint">
          Así sabrán quién votó cada fecha
        </p>
      </Modal>

      <div className="container container--medium">
        {/* Event Header */}
        <header 
          className="event-header"
          style={{ '--theme-color': event.theme_color || '#6366f1' }}
        >
          <div className="event-header__top">
            <button 
              className="event-back-btn"
              onClick={() => navigate('/')}
            >
              ← Inicio
            </button>
            {hasVoted && (
              <span className="badge badge--success">
                ✓ Ya votaste
              </span>
            )}
          </div>
          
          <h1 className="event-title">{event.title}</h1>
          
          {event.description && (
            <p className="event-description">{event.description}</p>
          )}
          
          <div className="event-meta">
            {event.location && (
              <span className="event-meta__item">
                📍 {event.location}
              </span>
            )}
            <span className="event-meta__item">
              👤 Organizado por {event.organizer_name || 'Organizador'}
            </span>
            <span className="event-meta__item">
              📅 {event.dates?.length || 0} fechas posibles
            </span>
          </div>
        </header>

        {/* Voting Section */}
        {isNameSet && (
          <section className="event-voting animate-fade-in-up">
            {/* Info banner about pre-populated votes */}
            {!hasVoted && (
              <div className="prepopulated-notice">
                <span className="prepopulated-notice__icon">💡</span>
                <div>
                  <strong>Todos los días están marcados como "Disponible"</strong>
                  <p>Cambiá los que no te sirvan. Tenés que votar en todas las fechas.</p>
                </div>
              </div>
            )}
            
            <VotingCalendar
              eventDates={event.dates || []}
              availability={availability}
              onAvailabilityChange={setAvailability}
              participantName={participantName}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showQuickActions={true}
            />

            <div className="voting-submit">
              <Button
                variant="success"
                size="lg"
                onClick={handleSubmitVote}
                loading={isSaving}
                disabled={isSaving}
                fullWidth
              >
                {isSaving ? 'Guardando...' : hasVoted ? 'Actualizar mi voto' : 'Guardar mi voto'}
              </Button>
              
              {isNameSet && (
                <button 
                  className="change-name-btn"
                  onClick={() => setShowNameModal(true)}
                >
                  Cambiar nombre ({participantName})
                </button>
              )}
            </div>
          </section>
        )}

        {/* Results Section - visible to all */}
        {event.participants && event.participants.length > 0 && (
          <section className="event-results card animate-fade-in-up">
            <h3 className="section-title">🎯 Resultados de la votación</h3>
            <p className="section-subtitle">Disponibilidad de todos los participantes</p>
            
            {/* Availability Matrix */}
            <div className="matrix-scroll">
              <table className="availability-matrix">
                <thead>
                  <tr>
                    <th className="matrix-header-name">Participante</th>
                    {event.dates?.sort().map(date => (
                      <th key={date} className="matrix-header-date">
                        <div className="matrix-date">
                          {formatDateDisplay(date)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {event.participants.map((participant, index) => (
                    <tr key={index} className={participant.name === participantName ? 'matrix-row--current' : ''}>
                      <td className="matrix-name">
                        <span className="matrix-avatar">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                        {participant.name}
                        {participant.name === participantName && <span className="matrix-you">(vos)</span>}
                      </td>
                      {event.dates?.sort().map(date => {
                        const vote = participant.availability?.find(a => a.date === date)
                        const status = vote?.status || 'none'
                        return (
                          <td key={date} className={`matrix-cell matrix-cell--${status}`}>
                            {status === 'available' && '✓'}
                            {status === 'flexible' && '~'}
                            {status === 'unavailable' && '✕'}
                            {status === 'none' && '-'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top 3 Best Dates */}
            <div className="best-dates-section">
              <h4 className="best-dates-title">🏆 Mejores fechas</h4>
              <div className="best-dates-list">
                {getBestDates().slice(0, 3).map((dateInfo, index) => (
                  <div 
                    key={dateInfo.date}
                    className={`best-date-item ${index === 0 ? 'best-date-item--winner' : ''}`}
                  >
                    <span className="best-date-medal">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <div className="best-date-info">
                      <span className="best-date-name">{formatDateDisplay(dateInfo.date)}</span>
                      <span className="best-date-stats">
                        ✓ {dateInfo.available} disponibles
                        {dateInfo.flexible > 0 && ` · ~ ${dateInfo.flexible} quizás`}
                      </span>
                    </div>
                    <span className="best-date-percent">{dateInfo.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Participants Summary */}
        {event.participants && event.participants.length > 0 && (
          <section className="event-participants card animate-fade-in-up">
            <h3 className="section-title">
              Participantes ({event.participants.length})
            </h3>
            <div className="participants-list">
              {event.participants.map((participant, index) => (
                <div 
                  key={index}
                  className={`participant-item ${participant.name === participantName ? 'participant-item--current' : ''}`}
                >
                  <span className="participant-avatar">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="participant-name">{participant.name}</span>
                  {participant.name === participantName && (
                    <span className="badge badge--info">Vos</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <Comments eventId={id} participantName={participantName} />
      </div>

      <style>{`
        .event-page {
          padding: var(--space-6) 0;
        }
        
        .event-header {
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .event-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .event-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
          padding: var(--space-2) 0;
        }
        
        .event-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .event-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-3);
          color: var(--theme-color, var(--color-accent-primary));
        }
        
        .event-description {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
        
        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .event-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .event-voting {
          margin-bottom: var(--space-6);
        }
        
        .voting-submit {
          margin-top: var(--space-4);
          text-align: center;
        }
        
        .change-name-btn {
          background: none;
          border: none;
          color: var(--color-text-tertiary);
          font-size: var(--text-sm);
          cursor: pointer;
          margin-top: var(--space-2);
        }
        
        .change-name-btn:hover {
          color: var(--color-accent-primary);
          text-decoration: underline;
        }
        
        .event-participants {
          margin-bottom: var(--space-6);
        }
        
        .section-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
        }
        
        .participants-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        
        .participant-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-full);
        }
        
        .participant-item--current {
          background: var(--color-accent-primary-subtle);
        }
        
        .participant-avatar {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }
        
        .participant-name {
          font-size: var(--text-sm);
          font-weight: 500;
        }
        
        .name-modal-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        
        .name-modal-hint {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-top: var(--space-2);
          text-align: center;
        }
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        .error-card h2 {
          margin-bottom: var(--space-2);
        }
        
        .error-card p {
          margin-bottom: var(--space-6);
        }
        
        /* Pre-populated notice */
        .prepopulated-notice {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }
        
        .prepopulated-notice__icon {
          font-size: var(--text-xl);
        }
        
        .prepopulated-notice strong {
          display: block;
          margin-bottom: var(--space-1);
          color: var(--color-success);
        }
        
        .prepopulated-notice p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }
        
        /* Results section */
        .event-results {
          margin-bottom: var(--space-6);
        }
        
        .section-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-bottom: var(--space-4);
        }
        
        /* Availability Matrix */
        .matrix-scroll {
          overflow-x: auto;
          margin-bottom: var(--space-6);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-lg);
        }
        
        .availability-matrix {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        
        .matrix-header-name {
          text-align: left;
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          font-weight: 600;
          position: sticky;
          left: 0;
          z-index: 1;
        }
        
        .matrix-header-date {
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-tertiary);
          min-width: 70px;
          text-align: center;
        }
        
        .matrix-date {
          font-size: var(--text-xs);
          text-transform: capitalize;
          font-weight: 500;
        }
        
        .matrix-row--current {
          background: var(--color-accent-primary-subtle);
        }
        
        .matrix-name {
          padding: var(--space-3);
          background: var(--color-bg-secondary);
          position: sticky;
          left: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .matrix-row--current .matrix-name {
          background: var(--color-accent-primary-subtle);
        }
        
        .matrix-avatar {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .matrix-you {
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
          margin-left: var(--space-1);
        }
        
        .matrix-cell {
          text-align: center;
          padding: var(--space-2);
          font-weight: 600;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .matrix-cell--available {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .matrix-cell--flexible {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .matrix-cell--unavailable {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .matrix-cell--none {
          color: var(--color-text-tertiary);
        }
        
        /* Best Dates */
        .best-dates-section {
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .best-dates-title {
          font-size: var(--text-base);
          margin-bottom: var(--space-3);
        }
        
        .best-dates-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        
        .best-date-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .best-date-item--winner {
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
        }
        
        .best-date-medal {
          font-size: var(--text-xl);
        }
        
        .best-date-info {
          flex: 1;
        }
        
        .best-date-name {
          font-weight: 600;
          display: block;
          text-transform: capitalize;
        }
        
        .best-date-stats {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .best-date-percent {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-success);
        }
        
        .best-date-item--winner .best-date-percent {
          color: var(--color-success);
        }
        
        @media (max-width: 640px) {
          .event-page {
            padding: var(--space-4) 0;
          }
          
          .event-title {
            font-size: var(--text-2xl);
          }
          
          .event-meta {
            flex-direction: column;
            gap: var(--space-2);
          }
          
          .result-date-item {
            flex-wrap: wrap;
          }
          
          .result-date-bar {
            width: 100%;
            order: 3;
          }
        }
      `}</style>
    </div>
  )
}
