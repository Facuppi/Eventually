import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton'

export default function ReadonlyPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Calculate best dates
  const bestDates = useMemo(() => {
    if (!event?.participants || event.participants.length === 0) return []
    
    const dateScores = {}
    
    event.dates?.forEach(date => {
      dateScores[date] = {
        available: 0,
        flexible: 0,
        unavailable: 0,
        total: event.participants.length
      }
    })
    
    event.participants.forEach(participant => {
      participant.availability?.forEach(({ date, status }) => {
        if (dateScores[date]) {
          if (status === 'available') dateScores[date].available++
          else if (status === 'flexible') dateScores[date].flexible++
          else if (status === 'unavailable') dateScores[date].unavailable++
        }
      })
    })

    return Object.entries(dateScores)
      .map(([date, scores]) => ({
        date,
        ...scores,
        score: scores.available * 3 + scores.flexible * 1 - scores.unavailable * 2,
        percentage: Math.round(((scores.available + scores.flexible * 0.5) / scores.total) * 100)
      }))
      .sort((a, b) => b.score - a.score)
  }, [event])

  // Format date
  const formatDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="page readonly-page">
        <div className="container container--medium">
          <Skeleton variant="title" width="60%" />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="page readonly-page">
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
    <div className="page readonly-page">
      <div className="container container--medium">
        {/* Header */}
        <header className="readonly-header">
          <div className="readonly-header__top">
            <button 
              className="readonly-back-btn"
              onClick={() => navigate('/')}
            >
              ← Inicio
            </button>
            <span className="badge badge--neutral">Solo lectura</span>
          </div>
          
          <h1 className="readonly-title">{event.title}</h1>
          
          {event.description && (
            <p className="readonly-description">{event.description}</p>
          )}
          
          <div className="readonly-meta">
            {event.location && (
              <span className="readonly-meta__item">📍 {event.location}</span>
            )}
            <span className="readonly-meta__item">
              👥 {event.participants?.length || 0} participantes
            </span>
          </div>
        </header>

        {/* Best Dates */}
        <section className="readonly-best-dates card">
          <h3>🎯 Mejores fechas</h3>
          
          {bestDates.length === 0 || event.participants?.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay votos registrados.</p>
            </div>
          ) : (
            <div className="best-dates-list">
              {bestDates.slice(0, 5).map((dateInfo, index) => (
                <div 
                  key={dateInfo.date}
                  className={`best-date-item ${index === 0 ? 'best-date-item--winner' : ''}`}
                >
                  <div className="best-date-rank">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="best-date-info">
                    <span className="best-date-name">{formatDate(dateInfo.date)}</span>
                    <div className="best-date-stats">
                      <span className="stat stat--available">✓ {dateInfo.available}</span>
                      <span className="stat stat--flexible">~ {dateInfo.flexible}</span>
                      <span className="stat stat--unavailable">✕ {dateInfo.unavailable}</span>
                    </div>
                  </div>
                  <div className="best-date-percentage">
                    <div 
                      className="percentage-bar"
                      style={{ 
                        '--percentage': `${dateInfo.percentage}%`,
                        '--color': dateInfo.percentage > 70 ? 'var(--color-success)' : 
                                   dateInfo.percentage > 40 ? 'var(--color-warning)' : 
                                   'var(--color-error)'
                      }}
                    >
                      <div className="percentage-fill"></div>
                    </div>
                    <span className="percentage-text">{dateInfo.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Availability Matrix */}
        {event.participants && event.participants.length > 0 && (
          <section className="readonly-matrix card">
            <h3>📊 Matriz de disponibilidad</h3>
            <div className="matrix-scroll">
              <table className="availability-matrix">
                <thead>
                  <tr>
                    <th className="matrix-header-name">Participante</th>
                    {event.dates?.sort().map(date => (
                      <th key={date} className="matrix-header-date">
                        <div className="matrix-date">
                          {formatDate(date).split(' ').slice(0, 2).join(' ')}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {event.participants.map((participant, index) => (
                    <tr key={index}>
                      <td className="matrix-name">
                        <span className="matrix-avatar">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                        {participant.name}
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
          </section>
        )}

        {/* CTA to vote */}
        <div className="readonly-cta card">
          <p>¿Querés votar tu disponibilidad?</p>
          <Button 
            variant="primary"
            onClick={() => navigate(`/event/${id}`)}
          >
            Ir a votar →
          </Button>
        </div>
      </div>

      <style>{`
        .readonly-page {
          padding: var(--space-6) 0;
        }
        
        .readonly-header {
          margin-bottom: var(--space-6);
        }
        
        .readonly-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .readonly-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
        }
        
        .readonly-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .readonly-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .readonly-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }
        
        .readonly-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .readonly-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .readonly-best-dates,
        .readonly-matrix {
          margin-bottom: var(--space-6);
        }
        
        .readonly-best-dates h3,
        .readonly-matrix h3 {
          margin-bottom: var(--space-4);
        }
        
        .empty-state {
          text-align: center;
          padding: var(--space-8);
          color: var(--color-text-tertiary);
        }
        
        .best-dates-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .best-date-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .best-date-item--winner {
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
        }
        
        .best-date-rank {
          font-size: var(--text-xl);
          min-width: 40px;
          text-align: center;
        }
        
        .best-date-info {
          flex: 1;
        }
        
        .best-date-name {
          font-weight: 500;
          display: block;
          margin-bottom: var(--space-1);
        }
        
        .best-date-stats {
          display: flex;
          gap: var(--space-3);
          font-size: var(--text-xs);
        }
        
        .stat--available { color: var(--color-available); }
        .stat--flexible { color: var(--color-flexible); }
        .stat--unavailable { color: var(--color-unavailable); }
        
        .best-date-percentage {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-width: 100px;
        }
        
        .percentage-bar {
          flex: 1;
          height: 8px;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .percentage-fill {
          height: 100%;
          width: var(--percentage);
          background: var(--color);
          border-radius: var(--radius-full);
        }
        
        .percentage-text {
          font-size: var(--text-sm);
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }
        
        .matrix-scroll {
          overflow-x: auto;
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
          position: sticky;
          left: 0;
        }
        
        .matrix-header-date {
          padding: var(--space-2);
          background: var(--color-bg-tertiary);
          min-width: 80px;
        }
        
        .matrix-date {
          font-size: var(--text-xs);
          text-transform: capitalize;
        }
        
        .matrix-name {
          padding: var(--space-3);
          background: var(--color-bg-secondary);
          position: sticky;
          left: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
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
        }
        
        .matrix-cell {
          text-align: center;
          padding: var(--space-2);
          font-weight: 600;
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
        
        .readonly-cta {
          text-align: center;
          padding: var(--space-6);
        }
        
        .readonly-cta p {
          margin-bottom: var(--space-4);
        }
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        @media (max-width: 640px) {
          .readonly-page {
            padding: var(--space-4) 0;
          }
          
          .readonly-title {
            font-size: var(--text-2xl);
          }
          
          .best-date-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .best-date-percentage {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
