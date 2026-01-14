import { useState, useMemo, useCallback } from 'react'
import { Button } from './ui/Button'

// Availability states
const STATES = {
  NONE: null,
  AVAILABLE: 'available',
  FLEXIBLE: 'flexible',
  UNAVAILABLE: 'unavailable'
}

const STATE_ORDER = [STATES.NONE, STATES.AVAILABLE, STATES.FLEXIBLE, STATES.UNAVAILABLE]

const STATE_CONFIG = {
  [STATES.AVAILABLE]: {
    label: 'Disponible',
    icon: '✓',
    colorClass: 'state--available'
  },
  [STATES.FLEXIBLE]: {
    label: 'Quizás',
    icon: '~',
    colorClass: 'state--flexible'
  },
  [STATES.UNAVAILABLE]: {
    label: 'No disponible',
    icon: '✕',
    colorClass: 'state--unavailable'
  }
}

// Format date for display
const formatDate = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return {
    weekday: date.toLocaleDateString('es-AR', { weekday: 'short' }),
    day: day,
    month: date.toLocaleDateString('es-AR', { month: 'short' }),
    full: date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }
}

// Group dates by month for calendar view
const groupDatesByMonth = (dates) => {
  const groups = {}
  dates.forEach(dateKey => {
    const [year, month] = dateKey.split('-')
    const key = `${year}-${month}`
    if (!groups[key]) {
      groups[key] = {
        year: parseInt(year),
        month: parseInt(month) - 1,
        dates: []
      }
    }
    groups[key].dates.push(dateKey)
  })
  return Object.values(groups)
}

export function VotingCalendar({
  eventDates = [],
  availability = {},
  onAvailabilityChange,
  participantName = '',
  readOnly = false,
  viewMode = 'calendar', // 'calendar' | 'list'
  onViewModeChange,
  showQuickActions = true
}) {
  const [hoveredDate, setHoveredDate] = useState(null)
  
  // Sort dates
  const sortedDates = useMemo(() => 
    [...eventDates].sort((a, b) => a.localeCompare(b)),
    [eventDates]
  )

  // Group by month for calendar view
  const monthGroups = useMemo(() => 
    groupDatesByMonth(sortedDates),
    [sortedDates]
  )

  // Get current state of a date
  const getDateState = useCallback((dateKey) => {
    return availability[dateKey] || STATES.NONE
  }, [availability])

  // Cycle through states on click
  const cycleState = useCallback((dateKey) => {
    if (readOnly) return
    
    const currentState = getDateState(dateKey)
    const currentIndex = STATE_ORDER.indexOf(currentState)
    const nextIndex = (currentIndex + 1) % STATE_ORDER.length
    const nextState = STATE_ORDER[nextIndex]
    
    onAvailabilityChange?.({
      ...availability,
      [dateKey]: nextState
    })
  }, [readOnly, getDateState, availability, onAvailabilityChange])

  // Set specific state for a date
  const setDateState = useCallback((dateKey, state) => {
    if (readOnly) return
    
    onAvailabilityChange?.({
      ...availability,
      [dateKey]: state
    })
  }, [readOnly, availability, onAvailabilityChange])

  // Quick actions - set all dates to a state
  const setAllToState = useCallback((state) => {
    if (readOnly) return
    
    const newAvailability = {}
    sortedDates.forEach(dateKey => {
      newAvailability[dateKey] = state
    })
    onAvailabilityChange?.(newAvailability)
  }, [readOnly, sortedDates, onAvailabilityChange])

  // Count states
  const stateCounts = useMemo(() => {
    const counts = {
      [STATES.AVAILABLE]: 0,
      [STATES.FLEXIBLE]: 0,
      [STATES.UNAVAILABLE]: 0,
      [STATES.NONE]: 0
    }
    
    sortedDates.forEach(dateKey => {
      const state = getDateState(dateKey)
      counts[state]++
    })
    
    return counts
  }, [sortedDates, getDateState])

  // Render date cell for calendar view
  const renderDateCell = (dateKey) => {
    const state = getDateState(dateKey)
    const formatted = formatDate(dateKey)
    const config = state ? STATE_CONFIG[state] : null
    
    return (
      <div
        key={dateKey}
        className={`vote-cell ${config?.colorClass || 'state--none'} ${readOnly ? 'vote-cell--readonly' : ''}`}
        onClick={() => cycleState(dateKey)}
        onMouseEnter={() => setHoveredDate(dateKey)}
        onMouseLeave={() => setHoveredDate(null)}
        role="button"
        aria-label={`${formatted.full}: ${config?.label || 'Sin respuesta'}`}
        aria-pressed={!!state}
        tabIndex={readOnly ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            cycleState(dateKey)
          }
        }}
      >
        <div className="vote-cell__date">
          <span className="vote-cell__weekday">{formatted.weekday}</span>
          <span className="vote-cell__day">{formatted.day}</span>
          <span className="vote-cell__month">{formatted.month}</span>
        </div>
        
        <div className="vote-cell__indicator">
          {config ? (
            <span className="vote-cell__icon">{config.icon}</span>
          ) : (
            <span className="vote-cell__empty">-</span>
          )}
        </div>
        
        {!readOnly && hoveredDate === dateKey && (
          <div className="vote-cell__hint">
            Click para cambiar
          </div>
        )}
      </div>
    )
  }

  // Render list row
  const renderListRow = (dateKey) => {
    const state = getDateState(dateKey)
    const formatted = formatDate(dateKey)
    
    return (
      <div key={dateKey} className="vote-list-row">
        <div className="vote-list-row__date">
          <span className="vote-list-row__weekday">{formatted.weekday}</span>
          <span className="vote-list-row__full">{formatted.full}</span>
        </div>
        
        {!readOnly && (
          <div className="vote-list-row__actions">
            {Object.entries(STATE_CONFIG).map(([stateKey, config]) => (
              <button
                key={stateKey}
                className={`vote-state-btn ${config.colorClass} ${state === stateKey ? 'active' : ''}`}
                onClick={() => setDateState(dateKey, stateKey)}
                aria-label={config.label}
                aria-pressed={state === stateKey}
              >
                <span className="vote-state-btn__icon">{config.icon}</span>
                <span className="vote-state-btn__label">{config.label}</span>
              </button>
            ))}
          </div>
        )}
        
        {readOnly && (
          <div className={`vote-list-row__status ${STATE_CONFIG[state]?.colorClass || ''}`}>
            {STATE_CONFIG[state]?.icon || '-'}
            <span>{STATE_CONFIG[state]?.label || 'Sin respuesta'}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="voting-calendar">
      {/* Header with view toggle and quick actions */}
      <div className="voting-header">
        <div className="voting-header__left">
          {participantName && (
            <span className="voting-participant">
              Votando como: <strong>{participantName}</strong>
            </span>
          )}
        </div>
        
        <div className="voting-header__right">
          {/* View toggle */}
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => onViewModeChange?.('calendar')}
            >
              📅 Calendario
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange?.('list')}
            >
              📋 Lista
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      {showQuickActions && !readOnly && (
        <div className="voting-quick-actions">
          <span className="voting-quick-label">Acciones rápidas:</span>
          <div className="voting-quick-buttons">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllToState(STATES.AVAILABLE)}
              icon="✓"
            >
              Todo disponible
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllToState(STATES.FLEXIBLE)}
              icon="~"
            >
              Todo flexible
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllToState(STATES.UNAVAILABLE)}
              icon="✕"
            >
              Todo no disponible
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllToState(STATES.NONE)}
              icon="↺"
            >
              Limpiar
            </Button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="voting-legend">
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color legend-color--available"></div>
            <span>Disponible</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-color--flexible"></div>
            <span>Quizás</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-color--unavailable"></div>
            <span>No disponible</span>
          </div>
        </div>
        
        {!readOnly && (
          <p className="voting-hint">
            💡 Hacé click en cada fecha para cambiar tu disponibilidad
          </p>
        )}
      </div>

      {/* Calendar view */}
      {viewMode === 'calendar' && (
        <div className="voting-grid">
          {sortedDates.map(dateKey => renderDateCell(dateKey))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="voting-list">
          {sortedDates.map(dateKey => renderListRow(dateKey))}
        </div>
      )}

      {/* Summary */}
      <div className="voting-summary">
        <div className="voting-summary__item state--available">
          <span className="voting-summary__count">{stateCounts[STATES.AVAILABLE]}</span>
          <span className="voting-summary__label">Disponible</span>
        </div>
        <div className="voting-summary__item state--flexible">
          <span className="voting-summary__count">{stateCounts[STATES.FLEXIBLE]}</span>
          <span className="voting-summary__label">Quizás</span>
        </div>
        <div className="voting-summary__item state--unavailable">
          <span className="voting-summary__count">{stateCounts[STATES.UNAVAILABLE]}</span>
          <span className="voting-summary__label">No disponible</span>
        </div>
        <div className="voting-summary__item state--none">
          <span className="voting-summary__count">{stateCounts[STATES.NONE]}</span>
          <span className="voting-summary__label">Sin respuesta</span>
        </div>
      </div>

      <style>{`
        .voting-calendar {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
        }
        
        .voting-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        
        .voting-participant {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .voting-quick-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }
        
        .voting-quick-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .voting-quick-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        
        .voting-legend {
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .voting-hint {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-top: var(--space-3);
        }
        
        /* Calendar grid view */
        .voting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        
        .vote-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-border-default);
          background: var(--color-bg-tertiary);
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
        }
        
        .vote-cell:hover:not(.vote-cell--readonly) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .vote-cell--readonly {
          cursor: default;
        }
        
        .vote-cell__date {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: var(--space-2);
        }
        
        .vote-cell__weekday {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          text-transform: uppercase;
        }
        
        .vote-cell__day {
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1;
        }
        
        .vote-cell__month {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .vote-cell__indicator {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          font-size: var(--text-lg);
          font-weight: 600;
        }
        
        .vote-cell__empty {
          color: var(--color-text-tertiary);
        }
        
        .vote-cell__hint {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          white-space: nowrap;
        }
        
        /* State colors */
        .state--none .vote-cell__indicator {
          background: var(--color-bg-secondary);
        }
        
        .state--available {
          border-color: var(--color-available);
          background: var(--color-available-bg);
        }
        
        .state--available .vote-cell__indicator {
          background: var(--color-available);
          color: white;
        }
        
        .state--flexible {
          border-color: var(--color-flexible);
          background: var(--color-flexible-bg);
        }
        
        .state--flexible .vote-cell__indicator {
          background: var(--color-flexible);
          color: white;
        }
        
        .state--unavailable {
          border-color: var(--color-unavailable);
          background: var(--color-unavailable-bg);
        }
        
        .state--unavailable .vote-cell__indicator {
          background: var(--color-unavailable);
          color: white;
        }
        
        /* List view */
        .voting-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }
        
        .vote-list-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          gap: var(--space-3);
        }
        
        .vote-list-row__date {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .vote-list-row__weekday {
          font-weight: 600;
          color: var(--color-accent-primary);
          width: 40px;
        }
        
        .vote-list-row__full {
          color: var(--color-text-primary);
        }
        
        .vote-list-row__actions {
          display: flex;
          gap: var(--space-2);
        }
        
        .vote-list-row__status {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 500;
        }
        
        .vote-state-btn {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border-default);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .vote-state-btn:hover {
          background: var(--color-bg-tertiary);
        }
        
        .vote-state-btn.active {
          border-color: currentColor;
        }
        
        .vote-state-btn.state--available.active {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .vote-state-btn.state--flexible.active {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .vote-state-btn.state--unavailable.active {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .vote-state-btn__label {
          display: none;
        }
        
        /* Summary */
        .voting-summary {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .voting-summary__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
        }
        
        .voting-summary__count {
          font-size: var(--text-xl);
          font-weight: 700;
        }
        
        .voting-summary__label {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .voting-summary__item.state--available {
          background: var(--color-available-bg);
        }
        
        .voting-summary__item.state--available .voting-summary__count {
          color: var(--color-available);
        }
        
        .voting-summary__item.state--flexible {
          background: var(--color-flexible-bg);
        }
        
        .voting-summary__item.state--flexible .voting-summary__count {
          color: var(--color-flexible);
        }
        
        .voting-summary__item.state--unavailable {
          background: var(--color-unavailable-bg);
        }
        
        .voting-summary__item.state--unavailable .voting-summary__count {
          color: var(--color-unavailable);
        }
        
        @media (max-width: 640px) {
          .voting-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .vote-list-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .vote-list-row__actions {
            justify-content: space-between;
          }
          
          .vote-state-btn__label {
            display: inline;
          }
          
          .voting-summary {
            flex-wrap: wrap;
            gap: var(--space-2);
          }
          
          .voting-quick-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .voting-quick-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

