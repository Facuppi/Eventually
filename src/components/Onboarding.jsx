import { useState, useEffect } from 'react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'

const ONBOARDING_KEY = 'eventually_onboarding_complete'

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_KEY)
    if (!hasSeenOnboarding) {
      // Small delay for better UX
      setTimeout(() => setShowOnboarding(true), 500)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShowOnboarding(false)
  }

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY)
    setCurrentStep(0)
    setShowOnboarding(true)
  }

  return {
    showOnboarding,
    currentStep,
    setCurrentStep,
    completeOnboarding,
    resetOnboarding
  }
}

const steps = [
  {
    icon: '🎯',
    title: '¡Bienvenido a Eventually!',
    description: 'La forma más fácil de coordinar eventos con tus amigos, familia o equipo de trabajo.',
    image: null
  },
  {
    icon: '📅',
    title: 'Creá tu evento',
    description: 'Dale un nombre a tu evento, agregá una descripción opcional y seleccioná las fechas posibles.',
    tip: 'Podés arrastrar para seleccionar múltiples fechas de una vez'
  },
  {
    icon: '🔗',
    title: 'Compartí el link',
    description: 'Enviá el link a los participantes por WhatsApp o cualquier otro medio. ¡Es así de simple!',
    tip: 'También podés compartir un link de solo lectura para ver resultados'
  },
  {
    icon: '✅',
    title: '¡Encontrá la mejor fecha!',
    description: 'Cada participante marca su disponibilidad y vos podés ver en tiempo real cuál es la mejor opción.',
    tip: 'Usá las acciones rápidas para marcar todo como disponible o no disponible'
  }
]

export function OnboardingModal({ 
  isOpen, 
  currentStep, 
  onStepChange, 
  onComplete 
}) {
  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      onStepChange(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleSkip} size="md">
      <div className="onboarding">
        {/* Progress dots */}
        <div className="onboarding__dots">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`onboarding__dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => onStepChange(index)}
              aria-label={`Ir al paso ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="onboarding__content" key={currentStep}>
          <div className="onboarding__icon">{step.icon}</div>
          <h2 className="onboarding__title">{step.title}</h2>
          <p className="onboarding__description">{step.description}</p>
          
          {step.tip && (
            <div className="onboarding__tip">
              <span className="onboarding__tip-icon">💡</span>
              <span>{step.tip}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="onboarding__actions">
          {!isFirstStep ? (
            <Button variant="ghost" onClick={handleBack}>
              Atrás
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleSkip}>
              Omitir
            </Button>
          )}
          
          <Button variant="primary" onClick={handleNext}>
            {isLastStep ? '¡Empezar!' : 'Siguiente'}
          </Button>
        </div>
      </div>

      <style>{`
        .onboarding {
          text-align: center;
        }
        
        .onboarding__dots {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }
        
        .onboarding__dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background: var(--color-bg-tertiary);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        
        .onboarding__dot:hover {
          background: var(--color-border-strong);
        }
        
        .onboarding__dot.active {
          width: 24px;
          background: var(--color-accent-primary);
        }
        
        .onboarding__dot.completed {
          background: var(--color-success);
        }
        
        .onboarding__content {
          animation: fade-in-up 0.4s ease;
        }
        
        .onboarding__icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
          animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .onboarding__title {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-3);
        }
        
        .onboarding__description {
          font-size: var(--text-base);
          color: var(--color-text-secondary);
          max-width: 380px;
          margin: 0 auto var(--space-5);
          line-height: var(--leading-relaxed);
        }
        
        .onboarding__tip {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          color: var(--color-accent-primary);
        }
        
        .onboarding__tip-icon {
          font-size: var(--text-lg);
        }
        
        .onboarding__actions {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-8);
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Modal>
  )
}

// Tutorial tooltips for specific elements
export function TutorialTooltip({ 
  target, 
  content, 
  position = 'bottom',
  isVisible,
  onDismiss 
}) {
  if (!isVisible) return null

  return (
    <div className={`tutorial-tooltip tutorial-tooltip--${position}`}>
      <div className="tutorial-tooltip__content">
        <p>{content}</p>
        <button 
          className="tutorial-tooltip__close"
          onClick={onDismiss}
          aria-label="Cerrar"
        >
          Entendido
        </button>
      </div>
      
      <style>{`
        .tutorial-tooltip {
          position: absolute;
          z-index: var(--z-tooltip);
          animation: tooltip-in 0.3s ease;
        }
        
        @keyframes tooltip-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
        }
        
        .tutorial-tooltip__content {
          background: var(--color-accent-primary);
          color: white;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          max-width: 280px;
        }
        
        .tutorial-tooltip__content p {
          color: white;
          font-size: var(--text-sm);
          margin-bottom: var(--space-3);
        }
        
        .tutorial-tooltip__close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
          font-size: var(--text-xs);
          font-weight: 500;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        
        .tutorial-tooltip__close:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

