import { useState } from 'react'

function Comments({ 
  eventId, 
  comments = [], 
  onCommentAdded, 
  onCommentDeleted,
  readOnly = false,
  isAdmin = false,
  userName = '',
  userEmail = ''
}) {
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState(userName)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorEmail: userEmail,
          content: newComment.trim()
        })
      })
      
      if (response.ok) {
        const comment = await response.json()
        onCommentAdded?.(comment)
        setNewComment('')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (commentId) => {
    if (!window.confirm('¿Eliminar este comentario?')) return
    
    try {
      const response = await fetch(`/api/admin/${eventId}/comments/${commentId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        onCommentDeleted?.(commentId)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    
    // Less than 1 minute
    if (diff < 60000) return 'Ahora mismo'
    // Less than 1 hour
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`
    // Less than 24 hours
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} h`
    // Less than 7 days
    if (diff < 604800000) return `Hace ${Math.floor(diff / 86400000)} días`
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    })
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
      '#BB8FCE', '#85C1E9'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="comments-section">
      {/* Comment list */}
      {comments.length === 0 ? (
        <div className="comments-empty">
          <span className="empty-icon">💬</span>
          <p>No hay comentarios aún</p>
          {!readOnly && <p className="empty-hint">Sé el primero en comentar</p>}
        </div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment fade-in">
              <div 
                className="comment-avatar"
                style={{ background: getAvatarColor(comment.author_name) }}
              >
                {getInitials(comment.author_name)}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author_name}</span>
                  <span className="comment-time">{formatDate(comment.created_at)}</span>
                  {isAdmin && (
                    <button 
                      className="comment-delete"
                      onClick={() => handleDelete(comment.id)}
                      title="Eliminar comentario"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <p className="comment-text">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      {!readOnly && (
        <form className="comment-form" onSubmit={handleSubmit}>
          {!userName && (
            <input
              type="text"
              className="form-input comment-name-input"
              placeholder="Tu nombre"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={50}
            />
          )}
          <div className="comment-input-row">
            <input
              type="text"
              className="form-input comment-input"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={500}
            />
            <button 
              type="submit"
              className="btn btn-primary comment-submit"
              disabled={!newComment.trim() || !authorName.trim() || isSubmitting}
            >
              {isSubmitting ? '...' : '→'}
            </button>
          </div>
        </form>
      )}

      <style>{`
        .comments-section {
          margin-top: 1rem;
        }

        .comments-empty {
          text-align: center;
          padding: 2rem;
          color: var(--text-tertiary);
        }

        .empty-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }

        .empty-hint {
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .comment {
          display: flex;
          gap: 0.75rem;
        }

        .comment-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }

        .comment-content {
          flex: 1;
          min-width: 0;
        }

        .comment-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .comment-author {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .comment-time {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .comment-delete {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 0.25rem;
          font-size: 0.75rem;
          opacity: 0;
          transition: all 0.2s;
        }

        .comment:hover .comment-delete {
          opacity: 1;
        }

        .comment-delete:hover {
          color: var(--unavailable);
        }

        .comment-text {
          font-size: 0.9375rem;
          color: var(--text-primary);
          line-height: 1.4;
          word-break: break-word;
          margin: 0;
        }

        .comment-form {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .comment-name-input {
          margin-bottom: 0.5rem;
        }

        .comment-input-row {
          display: flex;
          gap: 0.5rem;
        }

        .comment-input {
          flex: 1;
        }

        .comment-submit {
          padding: 0.75rem 1rem;
          min-width: 48px;
        }

        /* Scrollbar styling */
        .comments-list::-webkit-scrollbar {
          width: 6px;
        }

        .comments-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .comments-list::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 3px;
        }

        .comments-list::-webkit-scrollbar-thumb:hover {
          background: var(--text-tertiary);
        }
      `}</style>
    </div>
  )
}

export default Comments


