export function ProgressBar({ 
  steps, 
  currentStep, 
  showLabels = true,
  showPercentage = true 
}) {
  const percentage = Math.round(((currentStep + 1) / steps.length) * 100)
  
  return (
    <div className="progress-container">
      {showPercentage && (
        <div className="progress-header">
          <span className="progress-step-label">
            Paso {currentStep + 1} de {steps.length}
          </span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
      )}
      
      <div className="progress" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div className="progress__bar" style={{ width: `${percentage}%` }} />
      </div>
      
      {showLabels && (
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`progress-step ${index <= currentStep ? 'progress-step--active' : ''} ${index < currentStep ? 'progress-step--completed' : ''}`}
            >
              <div className="progress-step__indicator">
                {index < currentStep ? (
                  <span aria-hidden="true">✓</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="progress-step__label">{step}</span>
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        .progress-container {
          margin-bottom: var(--space-8);
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-2);
          font-size: var(--text-sm);
        }
        
        .progress-step-label {
          color: var(--color-text-secondary);
        }
        
        .progress-percentage {
          font-weight: 600;
          color: var(--color-accent-primary);
        }
        
        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-4);
          gap: var(--space-2);
        }
        
        .progress-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          text-align: center;
        }
        
        .progress-step__indicator {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          border: 2px solid var(--color-border-default);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-tertiary);
          transition: all var(--transition-normal);
        }
        
        .progress-step--active .progress-step__indicator {
          background: var(--color-accent-primary);
          border-color: var(--color-accent-primary);
          color: white;
        }
        
        .progress-step--completed .progress-step__indicator {
          background: var(--color-success);
          border-color: var(--color-success);
          color: white;
        }
        
        .progress-step__label {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          max-width: 80px;
        }
        
        .progress-step--active .progress-step__label {
          color: var(--color-text-primary);
          font-weight: 500;
        }
        
        @media (max-width: 640px) {
          .progress-steps {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

