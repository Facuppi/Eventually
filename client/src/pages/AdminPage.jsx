import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import AvailabilityMatrix from '../components/AvailabilityMatrix'
import Calendar from '../components/Calendar'
import Comments from '../components/Comments'

function AdminPage() {
  const { adminId } = useParams()
  const navigate = useNavigate()
  const { user, refreshEvents } = useUser()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [showAllOptions, setShowAllOptions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editDates, setEditDates] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [copied, setCopied] = useState({ share: false, admin: false, readonly: false })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    fetchData()
    setMounted(true)
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [adminId])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/${adminId}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
        setEditDates(result.selected_dates)
        if (result.recommendations.length > 0 && !selectedWinner) {
          setSelectedWinner(result.recommendations[0].date)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleClose = async () => {
    if (!selectedWinner) return
    
    const confirmed = window.confirm(
      `¿Confirmar "${formatDateLong(selectedWinner)}" como fecha final?\n\nEsta acción cerrará la votación.`
    )
    if (!confirmed) return
    
    setIsClosing(true)
    try {
      await fetch(`/api/admin/${adminId}/close`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winnerDate: selectedWinner })
      })
      fetchData()
      refreshEvents()
    } catch (error) {
      console.error('Error closing event:', error)
    }
    setIsClosing(false)
  }

  const handleReopen = async () => {
    const confirmed = window.confirm('¿Reabrir la votación? Esto permitirá que los participantes vuelvan a votar.')
    if (!confirmed) return

    try {
      await fetch(`/api/admin/${adminId}/reopen`, { method: 'POST' })
      fetchData()
      refreshEvents()
    } catch (error) {
      console.error('Error reopening event:', error)
    }
  }

  const handleSaveDates = async () => {
    setIsSaving(true)
    try {
      await fetch(`/api/admin/${adminId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedDates: editDates })
      })
      setIsEditing(false)
      fetchData()
    } catch (error) {
      console.error('Error saving dates:', error)
    }
    setIsSaving(false)
  }

  const handleDuplicate = async () => {
    try {
      const response = await fetch(`/api/admin/${adminId}/duplicate`, { method: 'POST' })
      const result = await response.json()
      refreshEvents()
      navigate(result.adminUrl)
    } catch (error) {
      console.error('Error duplicating event:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/${adminId}`, { method: 'DELETE' })
      refreshEvents()
      navigate('/')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const copyLink = (type, url) => {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopied(prev => ({ ...prev, [type]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
  }

  const shareWhatsApp = (url, message) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + '\n\n' + window.location.origin + url)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareNative = async (url, title, text) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.origin + url })
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLink('share', url)
        }
      }
    } else {
      copyLink('share', url)
    }
  }

  const handleCommentAdded = (comment) => {
    setData(prev => ({
      ...prev,
      comments: [...(prev.comments || []), comment]
    }))
  }

  const handleCommentDeleted = (commentId) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.filter(c => c.id !== commentId)
    }))
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
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

  if (!data) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center fade-in">
          <div className="empty-illustration">🔐</div>
          <h2>Evento no encontrado</h2>
          <p>El link de administrador puede estar incorrecto.</p>
          <Link to="/" className="btn btn-primary mt-2">Ir al inicio</Link>
        </div>
      </div>
    )
  }

  const visibleRecommendations = showAllOptions 
    ? data.recommendations 
    : data.recommendations.slice(0, 4)
  
  const hasMoreOptions = data.recommendations.length > 4

  return (
    <div className="page admin-page">
      <div className="bg-gradient"></div>
      
      <div className="page-header">
        <Link to="/" className="back-link">← Inicio</Link>
        
        <div className="title-row">
          <h1>{data.name}</h1>
          <div className="badges">
            <span className={`status-badge ${data.status}`}>
              {data.status === 'open' ? '🟢 Abierto' : '🔴 Cerrado'}
            </span>
            <span className="admin-badge">👑 Admin</span>
          </div>
        </div>
        
        {data.description && <p className="event-description">{data.description}</p>}
        {data.location && <p className="event-location">📍 {data.location}</p>}
      </div>

      <div className="container">
        {data.status === 'closed' && (
          <div className="winner-banner fade-in">
            <div className="winner-content">
              <div className="winner-icon">🎉</div>
              <div>
                <h2>Fecha confirmada</h2>
                <div className="winner-date">{formatDateLong(data.winner_date)}</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleReopen}>
              Reabrir votación
            </button>
          </div>
        )}

        {/* Quick actions grid */}
        <div className={`actions-grid ${mounted ? 'mounted' : ''}`}>
          {/* Share */}
          <div className="action-card">
            <div className="action-header">
              <span className="action-icon">📤</span>
              <h3>Compartir</h3>
            </div>
            <p>Envía este link a los participantes</p>
            <div className="share-input-row">
              <input
                type="text"
                className="share-input"
                value={window.location.origin + `/event/${data.id}`}
                readOnly
              />
            </div>
            <div className="share-buttons">
              <button 
                className={`btn btn-sm ${copied.share ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => copyLink('share', `/event/${data.id}`)}
              >
                {copied.share ? '✓ Copiado' : 'Copiar'}
              </button>
              <button 
                className="btn btn-sm btn-whatsapp"
                onClick={() => shareWhatsApp(`/event/${data.id}`, `¡Hola! Te invito a votar por las fechas para "${data.name}". Marca tu disponibilidad aquí:`)}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
              {navigator.share && (
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => shareNative(`/event/${data.id}`, data.name, `Vota por las fechas para "${data.name}"`)}
                >
                  📤
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="action-card stats-card">
            <div className="action-header">
              <span className="action-icon">📊</span>
              <h3>Estadísticas</h3>
            </div>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{data.responses.length}</div>
                <div className="stat-label">Respuestas</div>
              </div>
              <div className="stat">
                <div className="stat-value">{data.expected_participants}</div>
                <div className="stat-label">Esperados</div>
              </div>
              <div className="stat">
                <div className="stat-value">{data.selected_dates.length}</div>
                <div className="stat-label">Fechas</div>
              </div>
            </div>
          </div>

          {/* Readonly link */}
          <div className="action-card">
            <div className="action-header">
              <span className="action-icon">👁️</span>
              <h3>Solo lectura</h3>
            </div>
            <p>Link para ver resultados sin votar</p>
            <div className="share-buttons" style={{ marginTop: 'auto' }}>
              <button 
                className={`btn btn-sm ${copied.readonly ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => copyLink('readonly', `/results/${data.readonly_id}`)}
              >
                {copied.readonly ? '✓ Copiado' : 'Copiar link'}
              </button>
            </div>
          </div>
        </div>

        {/* Event management */}
        <div className="card management-card">
          <div className="management-header">
            <h3>⚙️ Gestionar evento</h3>
            <div className="management-actions">
              <button className="btn btn-sm btn-secondary" onClick={handleDuplicate}>
                📋 Duplicar
              </button>
              <button 
                className="btn btn-sm btn-danger" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>

          {/* Edit dates */}
          {!isEditing ? (
            <div className="dates-preview">
              <p>Fechas del evento ({data.selected_dates.length})</p>
              <div className="dates-chips">
                {data.selected_dates.slice(0, 6).map(date => (
                  <span key={date} className="date-chip">{formatDate(date)}</span>
                ))}
                {data.selected_dates.length > 6 && (
                  <span className="date-chip more">+{data.selected_dates.length - 6} más</span>
                )}
              </div>
              <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(true)}>
                ✏️ Editar fechas
              </button>
            </div>
          ) : (
            <div className="dates-edit">
              <Calendar
                selectedDates={editDates}
                onDatesChange={setEditDates}
                mode="select"
              />
              <div className="edit-actions">
                <button className="btn btn-secondary" onClick={() => {
                  setEditDates(data.selected_dates)
                  setIsEditing(false)
                }}>
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveDates}
                  disabled={isSaving || editDates.length === 0}
                >
                  {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-icon">⚠️</div>
              <h3>¿Eliminar evento?</h3>
              <p>Esta acción es irreversible. Se eliminarán todas las respuestas y comentarios.</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Eliminar definitivamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Availability Matrix */}
        <div className="card">
          <div className="card-header">
            <h3>📋 Disponibilidad del grupo</h3>
            <p>Vista detallada por fecha y participante</p>
          </div>
          
          {data.responses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>Aún no hay respuestas</p>
              <p className="empty-hint">Comparte el link para recibir respuestas</p>
            </div>
          ) : (
            <AvailabilityMatrix 
              dates={data.selected_dates} 
              responses={data.responses} 
            />
          )}

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

        {/* Recommendations */}
        {data.status === 'open' && data.recommendations.length > 0 && (
          <div className="card recommendations-card">
            <div className="card-header">
              <div>
                <h3>🏆 Mejores opciones</h3>
                <p>Selecciona una fecha para confirmar</p>
              </div>
              <button 
                className="btn btn-success"
                disabled={!selectedWinner || isClosing}
                onClick={handleClose}
              >
                {isClosing ? 'Cerrando...' : '✓ Confirmar fecha'}
              </button>
            </div>
            
            <div className="recommendation-list">
              {visibleRecommendations.map((rec, i) => (
                <div 
                  key={rec.date}
                  className={`recommendation-item ${rec.isPerfect ? 'perfect' : rec.isGood ? 'good' : ''} ${selectedWinner === rec.date ? 'selected' : ''}`}
                  onClick={() => setSelectedWinner(rec.date)}
                >
                  <div className="rec-left">
                    <div className={`rec-rank ${rec.isPerfect ? 'perfect' : rec.isGood ? 'good' : ''}`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="rec-date">{formatDate(rec.date)}</div>
                      {rec.isPerfect && (
                        <span className="rec-label perfect">✨ Día perfecto — todos pueden</span>
                      )}
                      {!rec.isPerfect && rec.isGood && (
                        <span className="rec-label good">👍 Nadie tiene conflicto</span>
                      )}
                    </div>
                  </div>
                  <div className="rec-stats">
                    <span className="rec-stat available" title="Pueden">✓ {rec.available}</span>
                    <span className="rec-stat adaptable" title="Se adaptan">~ {rec.adaptable}</span>
                    <span className="rec-stat unavailable" title="No pueden">✗ {rec.unavailable}</span>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreOptions && (
              <button
                className="btn btn-secondary btn-expand"
                onClick={() => setShowAllOptions(!showAllOptions)}
              >
                {showAllOptions 
                  ? '↑ Mostrar menos' 
                  : `↓ Ver más opciones (${data.recommendations.length - 4} más)`}
              </button>
            )}

            {selectedWinner && (
              <div className="selected-preview">
                <span>Fecha seleccionada:</span>
                <strong>{formatDateLong(selectedWinner)}</strong>
              </div>
            )}
          </div>
        )}

        {/* Participants */}
        {data.responses.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h3>👥 Participantes ({data.responses.length}/{data.expected_participants})</h3>
            </div>
            <div className="participants-list">
              {data.responses.map(response => (
                <div key={response.participant_email || response.participant_name} className="participant-chip">
                  {response.participant_name}
                </div>
              ))}
              {data.expected_participants > data.responses.length && (
                <div className="participant-chip pending">
                  +{data.expected_participants - data.responses.length} pendientes
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="card">
          <div className="card-header">
            <h3>💬 Comentarios</h3>
          </div>
          <Comments 
            eventId={adminId}
            comments={data.comments || []}
            onCommentAdded={handleCommentAdded}
            onCommentDeleted={handleCommentDeleted}
            isAdmin={true}
            userName={user?.email?.split('@')[0] || 'Admin'}
            userEmail={user?.email}
          />
        </div>

        {/* Auto-refresh indicator */}
        <div className="refresh-indicator">
          🔄 Los datos se actualizan automáticamente cada 10 segundos
        </div>
      </div>

      <style>{`
        .admin-page {
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
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .badges {
          display: flex;
          gap: 0.5rem;
        }

        .admin-badge {
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .event-description {
          max-width: 500px;
          margin: 0.5rem auto;
        }

        .event-location {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .winner-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: linear-gradient(135deg, var(--available) 0%, #2ecc71 100%);
          color: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .winner-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .winner-icon {
          font-size: 2.5rem;
        }

        .winner-date {
          font-size: 1.25rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease;
        }

        .actions-grid.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .action-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .action-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .action-icon {
          font-size: 1.25rem;
        }

        .action-card p {
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .share-input-row {
          margin-bottom: 0.75rem;
        }

        .share-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-family: monospace;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        .share-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-whatsapp {
          background: #25D366;
          color: white;
          padding: 0.5rem;
        }

        .btn-whatsapp:hover {
          background: #20bd5a;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          text-align: center;
          margin-top: auto;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 600;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .management-card {
          margin-bottom: 1.5rem;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .management-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-danger {
          background: var(--unavailable-bg);
          color: var(--unavailable);
          border: 1px solid var(--unavailable);
        }

        .btn-danger:hover {
          background: var(--unavailable);
          color: white;
        }

        .dates-preview {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dates-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .date-chip {
          padding: 0.375rem 0.75rem;
          background: var(--bg-tertiary);
          border-radius: 100px;
          font-size: 0.8125rem;
        }

        .date-chip.more {
          color: var(--text-tertiary);
        }

        .dates-edit {
          margin-top: 1rem;
        }

        .edit-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .edit-actions .btn-primary {
          flex: 1;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: 2rem;
          max-width: 400px;
          text-align: center;
          animation: modalIn 0.2s ease;
        }

        @keyframes modalIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .modal h3 {
          margin-bottom: 0.5rem;
        }

        .modal p {
          margin-bottom: 1.5rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-hint {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .recommendations-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .recommendation-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .recommendation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .recommendation-item:hover {
          background: var(--bg-hover);
        }

        .recommendation-item.selected {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .recommendation-item.perfect {
          background: var(--available-bg);
        }

        .recommendation-item.good {
          background: var(--adaptable-bg);
        }

        .rec-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rec-rank {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .rec-rank.perfect {
          background: var(--available);
          color: white;
        }

        .rec-rank.good {
          background: var(--adaptable);
          color: white;
        }

        .rec-date {
          font-weight: 600;
        }

        .rec-label {
          font-size: 0.75rem;
        }

        .rec-label.perfect {
          color: var(--available);
        }

        .rec-label.good {
          color: var(--adaptable);
        }

        .rec-stats {
          display: flex;
          gap: 0.75rem;
        }

        .rec-stat {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .rec-stat.available { color: var(--available); }
        .rec-stat.adaptable { color: var(--adaptable); }
        .rec-stat.unavailable { color: var(--unavailable); }

        .btn-expand {
          width: 100%;
          margin-top: 1rem;
        }

        .selected-preview {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          text-align: center;
          font-size: 0.9375rem;
        }

        .selected-preview span {
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }

        .participants-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .participant-chip {
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .participant-chip.pending {
          color: var(--text-tertiary);
          border: 1px dashed var(--border-color);
          background: transparent;
        }

        .refresh-indicator {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
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
          background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%);
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
          max-width: 800px;
          height: 400px;
          margin: 2rem auto 0;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 640px) {
          .winner-banner {
            flex-direction: column;
            text-align: center;
          }

          .winner-content {
            flex-direction: column;
          }

          .title-row {
            flex-direction: column;
          }

          .management-header {
            flex-direction: column;
            align-items: stretch;
          }

          .management-actions {
            justify-content: center;
          }

          .recommendations-card .card-header {
            flex-direction: column;
          }

          .recommendation-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .rec-stats {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminPage
