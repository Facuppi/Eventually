import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

function Home() {
  const { user, events, loading, login, logout } = useUser()
  const [email, setEmail] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setIsLoggingIn(true)
    await login(email)
    setIsLoggingIn(false)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="page skeleton-page">
        <div className="skeleton-header">
          <div className="skeleton skeleton-logo"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="container">
          <div className="skeleton skeleton-card"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="page home-page">
      {/* Background decoration */}
      <div className="bg-gradient"></div>
      <div className="bg-pattern"></div>
      
      <div className="container home-container">
        {/* Hero Section */}
        <header className={`hero ${mounted ? 'hero-mounted' : ''}`}>
          <div className="logo-container">
            <div className="logo-glow"></div>
            <svg className="logo-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="16" width="64" height="56" rx="8" fill="url(#logoGrad)" />
              <rect x="8" y="16" width="64" height="16" rx="8" fill="url(#logoGradDark)" />
              <circle cx="24" cy="24" r="4" fill="white" opacity="0.9"/>
              <circle cx="56" cy="24" r="4" fill="white" opacity="0.9"/>
              <rect x="20" y="40" width="12" height="12" rx="3" fill="white" opacity="0.9"/>
              <rect x="36" y="40" width="12" height="12" rx="3" fill="white" opacity="0.6"/>
              <rect x="52" y="40" width="12" height="12" rx="3" fill="white" opacity="0.3"/>
              <rect x="20" y="56" width="12" height="12" rx="3" fill="white" opacity="0.6"/>
              <rect x="36" y="56" width="12" height="12" rx="3" fill="white" opacity="0.9"/>
              <rect x="52" y="56" width="12" height="12" rx="3" fill="white" opacity="0.6"/>
              <defs>
                <linearGradient id="logoGrad" x1="8" y1="16" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
                <linearGradient id="logoGradDark" x1="8" y1="16" x2="72" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4f46e5"/>
                  <stop offset="1" stopColor="#0284c7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="hero-title">
            <span className="title-gradient">Eventually</span>
          </h1>
          
          <p className="hero-subtitle">
            Encuentra el día perfecto para reunirte con tu equipo
          </p>

          {/* Feature pills */}
          <div className="feature-pills">
            <span className="feature-pill">
              <span className="pill-icon">⚡</span> Rápido
            </span>
            <span className="feature-pill">
              <span className="pill-icon">🎯</span> Simple
            </span>
            <span className="feature-pill">
              <span className="pill-icon">🤝</span> Colaborativo
            </span>
          </div>
        </header>

        {/* Main Content */}
        {!user ? (
          <div className={`login-card card ${mounted ? 'card-mounted' : ''}`}>
            <div className="login-illustration">
              <span>👋</span>
            </div>
            <h3>Empezar a coordinar</h3>
            <p className="login-description">
              Ingresa tu email para guardar tus eventos y acceder desde cualquier dispositivo
            </p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  className="form-input email-input"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="btn btn-primary btn-lg btn-glow"
                disabled={!email.includes('@') || isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Entrando...
                  </span>
                ) : (
                  <>Continuar <span className="btn-arrow">→</span></>
                )}
              </button>
            </form>

            <p className="login-hint">
              Sin contraseña • Tu email es tu cuenta
            </p>
          </div>
        ) : (
          <div className={`dashboard ${mounted ? 'dashboard-mounted' : ''}`}>
            {/* User header */}
            <div className="user-header card">
              <div className="user-info">
                <div className="user-avatar">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="user-label">Conectado como</span>
                  <div className="user-email">{user.email}</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={logout}>
                Cerrar sesión
              </button>
            </div>

            {/* Quick actions */}
            <div className="actions-grid">
              <Link to="/create" className="action-card action-primary">
                <div className="action-icon">
                  <span>✨</span>
                </div>
                <div className="action-content">
                  <h3>Crear evento nuevo</h3>
                  <p>Organiza una nueva reunión o encuentro</p>
                </div>
                <span className="action-arrow">→</span>
              </Link>
            </div>

            {/* Events history */}
            <div className="card events-card">
              <div className="card-header">
                <div className="header-title">
                  <span className="header-icon">📋</span>
                  <h3>Mis eventos</h3>
                </div>
                <span className="events-count">{events.length}</span>
              </div>

              {events.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-illustration">
                    <span>📭</span>
                  </div>
                  <p className="empty-title">Aún no tienes eventos</p>
                  <p className="empty-description">
                    Crea tu primer evento o participa en uno
                  </p>
                </div>
              ) : (
                <div className="events-list">
                  {events.map((event, index) => (
                    <Link
                      key={event.id}
                      to={event.role === 'created' ? `/admin/${event.admin_id}` : `/event/${event.id}`}
                      className="event-row"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="event-icon-wrapper">
                        <div className={`event-icon ${event.role === 'created' ? 'icon-admin' : 'icon-participant'}`}>
                          {event.role === 'created' ? '👑' : '🗳️'}
                        </div>
                      </div>
                      <div className="event-info">
                        <div className="event-name">{event.name}</div>
                        <div className="event-meta">
                          {formatDate(event.created_at)} • {event.selected_dates.length} fechas
                        </div>
                      </div>
                      <div className="event-status-wrapper">
                        <span className={`status-badge ${event.status}`}>
                          {event.status === 'open' ? 'Abierto' : 'Cerrado'}
                        </span>
                        <span className="event-arrow">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer / How it works */}
        <footer className={`footer ${mounted ? 'footer-mounted' : ''}`}>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-label">Crea</div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-label">Comparte</div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-label">Coordina</div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .home-page {
          position: relative;
          overflow: hidden;
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

        .bg-pattern {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(var(--border-light) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        .home-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 2rem 0 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .logo-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
        }

        .logo-glow {
          position: absolute;
          inset: -10px;
          background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);
          border-radius: 20px;
          filter: blur(20px);
          opacity: 0.3;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .logo-svg {
          position: relative;
          width: 80px;
          height: 80px;
          filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }

        .title-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 50%, #6366f1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 400px;
          margin: 0 auto;
        }

        .feature-pills {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 100px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .pill-icon {
          font-size: 1rem;
        }

        /* Login Card */
        .login-card {
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .card-mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .login-illustration {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }

        .login-description {
          font-size: 0.9375rem;
          margin-bottom: 1.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          pointer-events: none;
        }

        .email-input {
          text-align: left;
          padding-left: 2.75rem;
        }

        .btn-glow {
          position: relative;
          overflow: hidden;
        }

        .btn-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #6366f1, #0ea5e9, #6366f1);
          background-size: 200% auto;
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          animation: gradient-shift 3s ease infinite;
          transition: opacity 0.3s;
        }

        .btn-glow:hover::before {
          opacity: 1;
        }

        .btn-arrow {
          transition: transform 0.2s;
        }

        .btn-glow:hover .btn-arrow {
          transform: translateX(4px);
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

        .login-hint {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Dashboard */
        .dashboard {
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .dashboard-mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
        }

        .user-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .user-email {
          font-weight: 500;
        }

        /* Actions */
        .actions-grid {
          margin-bottom: 1.5rem;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .action-card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-md), 0 0 0 1px var(--accent);
          transform: translateY(-2px);
        }

        .action-primary .action-icon {
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .action-content {
          flex: 1;
        }

        .action-content h3 {
          margin-bottom: 0.25rem;
        }

        .action-content p {
          font-size: 0.875rem;
          margin: 0;
        }

        .action-arrow {
          font-size: 1.25rem;
          color: var(--text-tertiary);
          transition: transform 0.2s, color 0.2s;
        }

        .action-card:hover .action-arrow {
          transform: translateX(4px);
          color: var(--accent);
        }

        /* Events Card */
        .events-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-icon {
          font-size: 1.25rem;
        }

        .events-count {
          background: var(--bg-tertiary);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-illustration {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-title {
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .empty-description {
          font-size: 0.875rem;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .event-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
          animation: slideIn 0.3s ease backwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
        }

        .event-row:hover {
          background: var(--bg-hover);
          transform: translateX(4px);
        }

        .event-icon-wrapper {
          flex-shrink: 0;
        }

        .event-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .icon-admin {
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
        }

        .icon-participant {
          background: var(--adaptable);
        }

        .event-info {
          flex: 1;
          min-width: 0;
        }

        .event-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-meta {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .event-status-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .event-arrow {
          color: var(--text-tertiary);
          transition: transform 0.2s;
        }

        .event-row:hover .event-arrow {
          transform: translateX(4px);
        }

        /* Footer */
        .footer {
          margin-top: auto;
          padding-top: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
        }

        .footer-mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin: 0 auto 0.5rem;
          transition: all 0.3s;
        }

        .step:hover .step-number {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          transform: scale(1.1);
        }

        .step-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .step-connector {
          width: 40px;
          height: 2px;
          background: var(--border-color);
          margin-bottom: 1.5rem;
        }

        /* Skeleton */
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
        .skeleton-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          border-radius: 16px;
        }
        .skeleton-title {
          width: 200px;
          height: 48px;
          margin: 0 auto 1rem;
        }
        .skeleton-subtitle {
          width: 300px;
          height: 24px;
          margin: 0 auto;
        }
        .skeleton-card {
          max-width: 400px;
          height: 300px;
          margin: 2rem auto 0;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .feature-pills {
            gap: 0.5rem;
          }

          .feature-pill {
            padding: 0.375rem 0.75rem;
            font-size: 0.8125rem;
          }

          .user-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .user-info {
            flex-direction: column;
          }

          .action-card {
            flex-direction: column;
            text-align: center;
          }

          .action-arrow {
            transform: rotate(90deg);
          }

          .action-card:hover .action-arrow {
            transform: rotate(90deg) translateX(4px);
          }

          .event-status-wrapper {
            flex-direction: column;
            gap: 0.5rem;
          }

          .steps {
            flex-direction: column;
            gap: 0.25rem;
          }

          .step-connector {
            width: 2px;
            height: 20px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
