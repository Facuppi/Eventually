import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton'
import { useToast } from '../components/ui/Toast'
import Comments from '../components/Comments'

export default function AdminPage() {
  const { adminId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modals
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)

  // Actions
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/admin/${adminId}`)
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
  }, [adminId])

  // Generate links
  const links = useMemo(() => {
    if (!event) return {}
    const baseUrl = window.location.origin
    return {
      participant: `${baseUrl}/event/${event.id}`,
      readonly: `${baseUrl}/readonly/${event.id}`,
      admin: `${baseUrl}/admin/${adminId}`
    }
  }, [event, adminId])

  // Copy link to clipboard
  const copyLink = async (link, label) => {
    try {
      await navigator.clipboard.writeText(link)
      toast.success(`Link ${label} copiado!`)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = link
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      toast.success(`Link ${label} copiado!`)
    }
  }

  // Share via WhatsApp
  const shareWhatsApp = (link, message) => {
    const text = encodeURIComponent(`${message}\n\n${link}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Delete event
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/${adminId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Error al eliminar')
      }

      toast.success('Evento eliminado')
      navigate('/')
    } catch (err) {
      console.error('Error:', err)
      toast.error('Error al eliminar el evento')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  // Duplicate event
  const handleDuplicate = async () => {
    setIsDuplicating(true)
    try {
      const response = await fetch(`/api/admin/${adminId}/duplicate`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        throw new Error('Error al duplicar')
      }

      const data = await response.json()
      toast.success('Evento duplicado!')
      navigate(`/admin/${data.admin_id}`)
    } catch (err) {
      console.error('Error:', err)
      toast.error('Error al duplicar el evento')
    } finally {
      setIsDuplicating(false)
      setShowDuplicateModal(false)
    }
  }

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
      <div className="page admin-page">
        <div className="container container--medium">
          <div className="admin-header">
            <Skeleton variant="title" width="60%" />
          </div>
          <CardSkeleton />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="page admin-page">
        <div className="container container--narrow">
          <div className="error-card card">
            <div className="error-icon">😕</div>
            <h2>Evento no encontrado</h2>
            <p>Este link de administrador no es válido.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page admin-page">
      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Compartir evento"
        size="md"
      >
        <div className="share-links">
          {/* Participant Link */}
          <div className="share-link-item">
            <div className="share-link-header">
              <span className="share-link-icon">🔗</span>
              <div>
                <h4>Link para participantes</h4>
                <p>Compartí este link para que voten</p>
              </div>
            </div>
            <div className="share-link-actions">
              <input 
                type="text" 
                value={links.participant} 
                readOnly 
                className="form-input"
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => copyLink(links.participant, 'de participantes')}
              >
                Copiar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => shareWhatsApp(
                  links.participant,
                  `¡Hola! Te invito a votar en "${event.title}". Marcá tu disponibilidad:`
                )}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Readonly Link */}
          <div className="share-link-item">
            <div className="share-link-header">
              <span className="share-link-icon">👁️</span>
              <div>
                <h4>Link de solo lectura</h4>
                <p>Para ver resultados sin votar</p>
              </div>
            </div>
            <div className="share-link-actions">
              <input 
                type="text" 
                value={links.readonly} 
                readOnly 
                className="form-input"
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => copyLink(links.readonly, 'de solo lectura')}
              >
                Copiar
              </Button>
            </div>
          </div>

          {/* Admin Link */}
          <div className="share-link-item share-link-item--warning">
            <div className="share-link-header">
              <span className="share-link-icon">🔐</span>
              <div>
                <h4>Link de administrador</h4>
                <p>⚠️ Solo vos deberías tener este link</p>
              </div>
            </div>
            <div className="share-link-actions">
              <input 
                type="text" 
                value={links.admin} 
                readOnly 
                className="form-input"
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => copyLink(links.admin, 'de administrador')}
              >
                Copiar
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="¿Eliminar evento?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              loading={isDeleting}
            >
              Eliminar
            </Button>
          </>
        }
      >
        <p>Esta acción no se puede deshacer. Se eliminarán todos los votos y comentarios.</p>
      </Modal>

      {/* Duplicate Modal */}
      <Modal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title="¿Duplicar evento?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDuplicateModal(false)}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleDuplicate}
              loading={isDuplicating}
            >
              Duplicar
            </Button>
          </>
        }
      >
        <p>Se creará una copia del evento con las mismas fechas pero sin votos.</p>
      </Modal>

      <div className="container container--medium">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header__top">
            <button 
              className="admin-back-btn"
              onClick={() => navigate('/')}
            >
              ← Inicio
            </button>
            <span className="badge badge--info">Admin</span>
          </div>
          
          <h1 className="admin-title">{event.title}</h1>
          
          {event.description && (
            <p className="admin-description">{event.description}</p>
          )}
          
          <div className="admin-meta">
            {event.location && (
              <span className="admin-meta__item">📍 {event.location}</span>
            )}
            <span className="admin-meta__item">
              👥 {event.participants?.length || 0} participantes
            </span>
            <span className="admin-meta__item">
              📅 {event.dates?.length || 0} fechas
            </span>
          </div>
        </header>

        {/* Actions */}
        <div className="admin-actions card">
          <h3>Acciones</h3>
          <div className="admin-actions__buttons">
            <Button 
              variant="primary" 
              onClick={() => setShowShareModal(true)}
              icon="🔗"
            >
              Compartir
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setShowDuplicateModal(true)}
              icon="📋"
            >
              Duplicar
            </Button>
            <Button 
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              icon="🗑️"
            >
              Eliminar
            </Button>
          </div>
        </div>

        {/* Best Dates */}
        <section className="admin-best-dates card">
          <h3>🎯 Mejores fechas</h3>
          
          {bestDates.length === 0 || event.participants?.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay votos. ¡Compartí el link!</p>
              <Button 
                variant="primary"
                onClick={() => setShowShareModal(true)}
              >
                Compartir evento
              </Button>
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
          <section className="admin-matrix card">
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

        {/* Comments */}
        <Comments eventId={event.id} participantName="Admin" isAdmin={true} />
      </div>

      <style>{`
        .admin-page {
          padding: var(--space-6) 0;
        }
        
        .admin-header {
          margin-bottom: var(--space-6);
        }
        
        .admin-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .admin-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
        }
        
        .admin-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .admin-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .admin-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }
        
        .admin-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .admin-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .admin-actions {
          margin-bottom: var(--space-6);
        }
        
        .admin-actions h3 {
          margin-bottom: var(--space-4);
        }
        
        .admin-actions__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        
        /* Share Links */
        .share-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .share-link-item {
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .share-link-item--warning {
          background: var(--color-warning-bg);
          border: 1px solid var(--color-warning-border);
        }
        
        .share-link-header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        
        .share-link-icon {
          font-size: var(--text-xl);
        }
        
        .share-link-header h4 {
          font-size: var(--text-sm);
          margin-bottom: var(--space-1);
        }
        
        .share-link-header p {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .share-link-actions {
          display: flex;
          gap: var(--space-2);
        }
        
        .share-link-actions .form-input {
          flex: 1;
          font-size: var(--text-xs);
        }
        
        /* Best Dates */
        .admin-best-dates {
          margin-bottom: var(--space-6);
        }
        
        .admin-best-dates h3 {
          margin-bottom: var(--space-4);
        }
        
        .empty-state {
          text-align: center;
          padding: var(--space-8);
        }
        
        .empty-state p {
          margin-bottom: var(--space-4);
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
          transition: width 0.5s ease;
        }
        
        .percentage-text {
          font-size: var(--text-sm);
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }
        
        /* Matrix */
        .admin-matrix {
          margin-bottom: var(--space-6);
        }
        
        .admin-matrix h3 {
          margin-bottom: var(--space-4);
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
          z-index: 1;
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
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        @media (max-width: 640px) {
          .admin-page {
            padding: var(--space-4) 0;
          }
          
          .admin-title {
            font-size: var(--text-2xl);
          }
          
          .admin-actions__buttons {
            flex-direction: column;
          }
          
          .admin-actions__buttons .btn {
            width: 100%;
          }
          
          .share-link-actions {
            flex-direction: column;
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
