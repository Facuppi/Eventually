import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AvailabilityMatrix from '../components/AvailabilityMatrix'
import Comments from '../components/Comments'

function ReadonlyPage() {
  const { readonlyId } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvent()
  }, [readonlyId])

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/readonly/${readonlyId}`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    }
    setLoading(false)
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
          <p>El enlace puede estar incorrecto o el evento ya no existe.</p>
          <Link to="/" className="btn btn-primary mt-2">Ir al inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        
        <div className="readonly-badge">
          <span>👁️</span> Vista de solo lectura
        </div>
        
        <h1>{event.name}</h1>
        
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        
        <p>
          {event.responses?.length || 0} de {event.expected_participants} participantes han respondido
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        {event.status === 'closed' && event.winner_date && (
          <div className="winner-banner fade-in">
            <h2>🎉 Fecha confirmada</h2>
            <div className="winner-date">{formatDateLong(event.winner_date)}</div>
          </div>
        )}

        {/* Availability Matrix */}
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

        {/* Comments (read only) */}
        <div className="card fade-in mt-3">
          <div className="card-header">
            <h3>💬 Comentarios</h3>
            <p>Mensajes de los participantes</p>
          </div>
          
          <Comments 
            comments={event.comments || []} 
            readOnly={true}
          />
        </div>

        <div className="text-center mt-3">
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
            ¿Quieres votar? Pide al organizador el enlace de participación.
          </p>
        </div>
      </div>

      <style>{`
        .readonly-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
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

        .empty-illustration {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
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
          width: 200px;
          height: 40px;
          margin: 0 auto 1rem;
        }
        .skeleton-subtitle {
          width: 300px;
          height: 20px;
          margin: 0 auto;
        }
        .skeleton-card {
          max-width: 600px;
          height: 400px;
          margin: 0 auto;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default ReadonlyPage


