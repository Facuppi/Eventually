import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { OnboardingModal, useOnboarding } from '../components/Onboarding'

export default function Home() {
  const navigate = useNavigate()
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding, resetOnboarding } = useOnboarding()
  
  // Event history from localStorage
  const [eventHistory, setEventHistory] = useState([])

  useEffect(() => {
    // Get all events the user has participated in from localStorage
    const history = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('eventually_participant_')) {
        try {
          const eventId = key.replace('eventually_participant_', '')
          const data = JSON.parse(localStorage.getItem(key))
          history.push({
            id: eventId,
            name: data.name,
            eventTitle: data.eventTitle || null,
            votedAt: data.votedAt || null
          })
        } catch (e) {
          // Skip invalid entries
        }
      }
    }
    // Sort by most recent
    history.sort((a, b) => {
      if (!a.votedAt) return 1
      if (!b.votedAt) return -1
      return new Date(b.votedAt) - new Date(a.votedAt)
    })
    setEventHistory(history)
  }, [])

  return (
    <div className="page home-page">
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onComplete={completeOnboarding}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__gradient"></div>
          <div className="hero__pattern"></div>
        </div>
        
        <div className="container hero__content">
          <div className="hero__badge animate-fade-in-up">
            ✨ Gratis y sin registro
          </div>
          
          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Encontrá el día perfecto
            <br />
            <span className="hero__title-accent">para tu evento</span>
          </h1>
          
          <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Coordiná con amigos, familia o equipo de trabajo.
            <br />
            Todos votan su disponibilidad y vos encontrás la mejor fecha.
          </p>
          
          <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="primary" 
              size="xl"
              onClick={() => navigate('/create')}
              icon="📅"
            >
              Crear evento
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              onClick={resetOnboarding}
              icon="❓"
            >
              ¿Cómo funciona?
            </Button>
          </div>
        </div>
      </section>

      {/* Event History Section */}
      {eventHistory.length > 0 && (
        <section className="history">
          <div className="container">
            <div className="history-card card">
              <h3 className="history-title">📋 Tus eventos recientes</h3>
              <p className="history-subtitle">Eventos en los que participaste desde este dispositivo</p>
              <div className="history-list">
                {eventHistory.map(evt => (
                  <div 
                    key={evt.id} 
                    className="history-item"
                    onClick={() => navigate(`/event/${evt.id}`)}
                  >
                    <div className="history-item__info">
                      <span className="history-item__name">
                        {evt.eventTitle || `Evento #${evt.id.slice(0, 6)}`}
                      </span>
                      <span className="history-item__participant">
                        Votaste como: {evt.name}
                        {evt.votedAt && ` · ${new Date(evt.votedAt).toLocaleDateString('es-AR')}`}
                      </span>
                    </div>
                    <span className="history-item__arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features__grid stagger-children">
            <div className="feature-card">
              <div className="feature-card__icon">📅</div>
              <h3 className="feature-card__title">Seleccioná fechas</h3>
              <p className="feature-card__description">
                Elegí las fechas posibles arrastrando en el calendario
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">🔗</div>
              <h3 className="feature-card__title">Compartí el link</h3>
              <p className="feature-card__description">
                Envialo por WhatsApp, email o cualquier medio
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">✓</div>
              <h3 className="feature-card__title">Votá disponibilidad</h3>
              <p className="feature-card__description">
                Cada participante marca: disponible, quizás o no disponible
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">🎯</div>
              <h3 className="feature-card__title">¡Listo!</h3>
              <p className="feature-card__description">
                Mirá en tiempo real cuál es la mejor opción para todos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta__card">
            <h2 className="cta__title">¿Listo para coordinar?</h2>
            <p className="cta__subtitle">Creá tu primer evento en segundos</p>
            <Button 
              variant="primary" 
              size="xl"
              onClick={() => navigate('/create')}
            >
              Empezar ahora →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            Eventually © 2024 · Hecho con 💜
          </p>
        </div>
      </footer>

      <style>{`
        .home-page {
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: var(--space-16) 0;
        }
        
        .hero__background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .hero__gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, var(--color-accent-primary-subtle) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
        }
        
        .hero__pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--color-border-subtle) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
        }
        
        .hero__content {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-6);
        }
        
        .hero__title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: var(--space-6);
          letter-spacing: -0.03em;
        }
        
        .hero__title-accent {
          background: linear-gradient(135deg, var(--color-accent-primary), #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero__subtitle {
          font-size: var(--text-xl);
          color: var(--color-text-secondary);
          max-width: 500px;
          margin: 0 auto var(--space-8);
          line-height: var(--leading-relaxed);
        }
        
        .hero__actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* Features Section */
        .features {
          padding: var(--space-16) 0;
          background: var(--color-bg-tertiary);
        }
        
        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-6);
        }
        
        .feature-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          transition: all var(--transition-normal);
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .feature-card__icon {
          font-size: 48px;
          margin-bottom: var(--space-4);
        }
        
        .feature-card__title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }
        
        .feature-card__description {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        /* CTA Section */
        .cta {
          padding: var(--space-16) 0;
        }
        
        .cta__card {
          text-align: center;
          padding: var(--space-12);
          background: linear-gradient(135deg, var(--color-accent-primary-subtle), rgba(168, 85, 247, 0.1));
          border: 1px solid var(--color-accent-primary-muted);
          border-radius: var(--radius-2xl);
        }
        
        .cta__title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .cta__subtitle {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }
        
        /* History Section */
        .history {
          padding: var(--space-8) 0 0;
        }
        
        .history-card {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .history-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-1);
        }
        
        .history-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-bottom: var(--space-4);
        }
        
        .history-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        
        .history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .history-item:hover {
          background: var(--color-accent-primary-subtle);
          transform: translateX(4px);
        }
        
        .history-item__info {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        
        .history-item__name {
          font-weight: 500;
        }
        
        .history-item__participant {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .history-item__arrow {
          color: var(--color-accent-primary);
          font-size: var(--text-lg);
        }
        
        /* Footer */
        .footer {
          padding: var(--space-8) 0;
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .footer__text {
          text-align: center;
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        @media (max-width: 640px) {
          .hero {
            min-height: auto;
            padding: var(--space-12) 0;
          }
          
          .hero__subtitle {
            font-size: var(--text-base);
          }
          
          .hero__actions {
            flex-direction: column;
            align-items: center;
          }
          
          .cta__card {
            padding: var(--space-8);
          }
        }
      `}</style>
    </div>
  )
}
