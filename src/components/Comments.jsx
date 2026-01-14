import { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/Button'
import { useToast } from './ui/Toast'

export default function Comments({ eventId, participantName = 'Anónimo', isAdmin = false }) {
  const toast = useToast()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  // Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const trimmedComment = newComment.trim()
    if (!trimmedComment) return
    
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: participantName,
          content: trimmedComment
        })
      })

      if (!response.ok) {
        throw new Error('Error al enviar comentario')
      }

      const comment = await response.json()
      setComments(prev => [...prev, comment])
      setNewComment('')
      toast.success('Comentario agregado')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al enviar el comentario')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete comment (admin only)
  const handleDelete = async (commentId) => {
    if (!confirm('¿Eliminar este comentario?')) return

    try {
      const response = await fetch(`/api/events/${eventId}/comments/${commentId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error al eliminar comentario')
      }

      setComments(prev => prev.filter(c => c.id !== commentId))
      toast.success('Comentario eliminado')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al eliminar el comentario')
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="comments-section card">
      <h3 className="comments-title">
        💬 Comentarios {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* Comments list */}
      <div className="comments-list">
        {isLoading ? (
          <p className="comments-empty">Cargando comentarios...</p>
        ) : comments.length === 0 ? (
          <p className="comments-empty">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment__header">
                <span className="comment__avatar">
                  {comment.author.charAt(0).toUpperCase()}
                </span>
                <span className="comment__author">{comment.author}</span>
                <span className="comment__date">{formatDate(comment.created_at)}</span>
                {isAdmin && (
                  <button 
                    className="comment__delete"
                    onClick={() => handleDelete(comment.id)}
                    aria-label="Eliminar comentario"
                  >
                    🗑️
                  </button>
                )}
              </div>
              <p className="comment__content">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* New comment form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-form__input-wrapper">
          <textarea
            className="form-input form-textarea"
            placeholder={`Comentar como ${participantName}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            maxLength={500}
          />
        </div>
        <div className="comment-form__actions">
          <span className="comment-form__counter">
            {newComment.length}/500
          </span>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!newComment.trim() || isSubmitting}
            loading={isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </form>

      <style>{`
        .comments-section {
          margin-bottom: var(--space-6);
        }
        
        .comments-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
        }
        
        .comments-list {
          margin-bottom: var(--space-4);
          max-height: 400px;
          overflow-y: auto;
        }
        
        .comments-empty {
          text-align: center;
          color: var(--color-text-tertiary);
          padding: var(--space-6);
          font-size: var(--text-sm);
        }
        
        .comment {
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-3);
        }
        
        .comment:last-child {
          margin-bottom: 0;
        }
        
        .comment__header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
        }
        
        .comment__avatar {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }
        
        .comment__author {
          font-weight: 600;
          font-size: var(--text-sm);
        }
        
        .comment__date {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          margin-left: auto;
        }
        
        .comment__delete {
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity var(--transition-fast);
        }
        
        .comment__delete:hover {
          opacity: 1;
        }
        
        .comment__content {
          font-size: var(--text-sm);
          color: var(--color-text-primary);
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .comment-form {
          border-top: 1px solid var(--color-border-subtle);
          padding-top: var(--space-4);
        }
        
        .comment-form__input-wrapper {
          margin-bottom: var(--space-2);
        }
        
        .comment-form__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .comment-form__counter {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
      `}</style>
    </section>
  )
}
