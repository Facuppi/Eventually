import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Button } from './ui/Button'

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Format date as YYYY-MM-DD
const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Parse date from YYYY-MM-DD
const parseDateKey = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Format for display
const formatDisplayDate = (dateKey) => {
  const date = parseDateKey(dateKey)
  return date.toLocaleDateString('es-AR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })
}

export function CalendarPicker({ 
  selectedDates = [], 
  onDatesChange,
  minDate = new Date(),
  showQuickButtons = true,
  showSelectedList = true,
  showLegend = true
}) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [currentMonth, setCurrentMonth] = useState(() => minDate.getMonth())
  const [currentYear, setCurrentYear] = useState(() => minDate.getFullYear())
  
  // Drag selection state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [draggedDates, setDraggedDates] = useState(new Set())
  const [dragMode, setDragMode] = useState('add') // 'add' or 'remove'
  
  const calendarRef = useRef(null)

  // Get days in month
  const getDaysInMonth = useCallback((month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }, [])

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = useCallback((month, year) => {
    return new Date(year, month, 1).getDay()
  }, [])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }, [currentMonth, currentYear, getDaysInMonth, getFirstDayOfMonth])

  // Navigate months
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Check if can go to previous month
  const canGoPrevious = useMemo(() => {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0)
    return lastDayOfPrevMonth >= today
  }, [currentMonth, currentYear, today])

  // Check if date is in past
  const isPastDate = useCallback((day) => {
    const date = new Date(currentYear, currentMonth, day)
    return date < today
  }, [currentMonth, currentYear, today])

  // Check if date is selected
  const isSelected = useCallback((day) => {
    if (!day) return false
    const dateKey = formatDateKey(new Date(currentYear, currentMonth, day))
    return selectedDates.includes(dateKey)
  }, [selectedDates, currentMonth, currentYear])

  // Check if date is being dragged
  const isBeingDragged = useCallback((day) => {
    if (!day || !isDragging) return false
    const dateKey = formatDateKey(new Date(currentYear, currentMonth, day))
    return draggedDates.has(dateKey)
  }, [isDragging, draggedDates, currentMonth, currentYear])

  // Mouse handlers for drag selection
  const handleMouseDown = (day, e) => {
    if (!day || isPastDate(day)) return
    e.preventDefault()
    
    const dateKey = formatDateKey(new Date(currentYear, currentMonth, day))
    const currentlySelected = selectedDates.includes(dateKey)
    
    setIsDragging(true)
    setDragStart(dateKey)
    setDragMode(currentlySelected ? 'remove' : 'add')
    setDraggedDates(new Set([dateKey]))
  }

  const handleMouseEnter = (day) => {
    if (!isDragging || !day || isPastDate(day)) return
    
    const dateKey = formatDateKey(new Date(currentYear, currentMonth, day))
    setDraggedDates(prev => new Set([...prev, dateKey]))
  }

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    let newDates
    if (dragMode === 'add') {
      newDates = [...new Set([...selectedDates, ...draggedDates])]
    } else {
      newDates = selectedDates.filter(d => !draggedDates.has(d))
    }
    
    onDatesChange?.(newDates.sort())
    setIsDragging(false)
    setDragStart(null)
    setDraggedDates(new Set())
  }, [isDragging, dragMode, selectedDates, draggedDates, onDatesChange])

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }
    
    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [isDragging, handleMouseUp])

  // Touch handlers for mobile
  const handleTouchStart = (day, e) => {
    if (!day || isPastDate(day)) return
    handleMouseDown(day, e)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const dayAttr = element?.getAttribute('data-day')
    
    if (dayAttr) {
      handleMouseEnter(parseInt(dayAttr))
    }
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  // Quick action buttons
  const handleThisWeek = () => {
    const dates = []
    const current = new Date(today)
    const endOfWeek = new Date(today)
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()))
    
    while (current <= endOfWeek) {
      dates.push(formatDateKey(current))
      current.setDate(current.getDate() + 1)
    }
    
    onDatesChange?.([...new Set([...selectedDates, ...dates])].sort())
  }

  const handleNextWeek = () => {
    const dates = []
    const startOfNextWeek = new Date(today)
    startOfNextWeek.setDate(startOfNextWeek.getDate() + (7 - startOfNextWeek.getDay()) + 1)
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfNextWeek)
      d.setDate(d.getDate() + i)
      dates.push(formatDateKey(d))
    }
    
    onDatesChange?.([...new Set([...selectedDates, ...dates])].sort())
  }

  const handleWeekdaysOnly = () => {
    const dates = []
    const current = new Date(today)
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 14)
    
    while (current <= endDate) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) {
        dates.push(formatDateKey(current))
      }
      current.setDate(current.getDate() + 1)
    }
    
    onDatesChange?.([...new Set([...selectedDates, ...dates])].sort())
  }

  const handleClearAll = () => {
    onDatesChange?.([])
  }

  const handleRemoveDate = (dateKey) => {
    onDatesChange?.(selectedDates.filter(d => d !== dateKey))
  }

  // Get visual class for day
  const getDayClass = useCallback((day) => {
    if (!day) return 'calendar-day calendar-day--empty'
    
    const classes = ['calendar-day']
    
    if (isPastDate(day)) {
      classes.push('calendar-day--disabled')
    } else {
      classes.push('calendar-day--selectable')
      
      if (isSelected(day)) {
        classes.push('calendar-day--selected')
      }
      
      if (isBeingDragged(day)) {
        classes.push(dragMode === 'add' ? 'calendar-day--drag-add' : 'calendar-day--drag-remove')
      }
      
      // Check if today
      const dateKey = formatDateKey(new Date(currentYear, currentMonth, day))
      const todayKey = formatDateKey(today)
      if (dateKey === todayKey) {
        classes.push('calendar-day--today')
      }
    }
    
    return classes.join(' ')
  }, [isPastDate, isSelected, isBeingDragged, dragMode, currentMonth, currentYear, today])

  return (
    <div className="calendar-picker">
      {/* Quick action buttons */}
      {showQuickButtons && (
        <div className="calendar-quick-actions">
          <Button variant="ghost" size="sm" onClick={handleThisWeek}>
            Esta semana
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNextWeek}>
            Próxima semana
          </Button>
          <Button variant="ghost" size="sm" onClick={handleWeekdaysOnly}>
            Solo días hábiles
          </Button>
          {selectedDates.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Limpiar todo
            </Button>
          )}
        </div>
      )}

      {/* Calendar header */}
      <div className="calendar-header">
        <button 
          className="calendar-nav-btn"
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          aria-label="Mes anterior"
        >
          ‹
        </button>
        
        <h3 className="calendar-month-title">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        
        <button 
          className="calendar-nav-btn"
          onClick={goToNextMonth}
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="calendar-day-headers">
        {DAYS.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div 
        ref={calendarRef}
        className="calendar-grid"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="grid"
        aria-label="Calendario para selección de fechas"
      >
        {calendarDays.map((day, index) => (
          <div
            key={index}
            data-day={day || undefined}
            className={getDayClass(day)}
            onMouseDown={day ? (e) => handleMouseDown(day, e) : undefined}
            onMouseEnter={day ? () => handleMouseEnter(day) : undefined}
            onTouchStart={day ? (e) => handleTouchStart(day, e) : undefined}
            role={day ? "gridcell" : undefined}
            aria-selected={day ? isSelected(day) : undefined}
            tabIndex={day && !isPastDate(day) ? 0 : -1}
          >
            {day && (
              <>
                <span className="calendar-day__number">{day}</span>
                {isSelected(day) && <span className="calendar-day__check">✓</span>}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color legend-color--selected"></div>
            <span>Seleccionado</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-default)' }}></div>
            <span>Disponible</span>
          </div>
          <div className="legend-item">
            <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)' }}>
              💡 Arrastrá para seleccionar varias fechas
            </span>
          </div>
        </div>
      )}

      {/* Selected dates list */}
      {showSelectedList && selectedDates.length > 0 && (
        <div className="calendar-selected-list">
          <div className="calendar-selected-header">
            <span className="calendar-selected-count">
              {selectedDates.length} {selectedDates.length === 1 ? 'fecha seleccionada' : 'fechas seleccionadas'}
            </span>
          </div>
          <div className="calendar-selected-tags">
            {selectedDates.slice().sort().map(dateKey => (
              <div key={dateKey} className="calendar-date-tag">
                <span>{formatDisplayDate(dateKey)}</span>
                <button 
                  className="calendar-date-tag__remove"
                  onClick={() => handleRemoveDate(dateKey)}
                  aria-label={`Quitar ${formatDisplayDate(dateKey)}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .calendar-picker {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
        }
        
        .calendar-quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        
        .calendar-nav-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);
          font-size: var(--text-xl);
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .calendar-nav-btn:hover:not(:disabled) {
          background: var(--color-bg-tertiary);
        }
        
        .calendar-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .calendar-month-title {
          font-size: var(--text-lg);
          font-weight: 600;
        }
        
        .calendar-day-headers {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: var(--space-2);
        }
        
        .calendar-day-header {
          text-align: center;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-text-tertiary);
          padding: var(--space-2);
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          user-select: none;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 500;
          position: relative;
          transition: all var(--transition-fast);
        }
        
        .calendar-day--empty {
          background: transparent;
        }
        
        .calendar-day--disabled {
          color: var(--color-text-tertiary);
          opacity: 0.5;
        }
        
        .calendar-day--selectable {
          background: var(--color-bg-tertiary);
          cursor: pointer;
        }
        
        .calendar-day--selectable:hover {
          background: var(--color-accent-primary-subtle);
          border-color: var(--color-accent-primary);
        }
        
        .calendar-day--today {
          border: 2px solid var(--color-accent-primary);
        }
        
        .calendar-day--selected {
          background: var(--color-accent-primary);
          color: white;
        }
        
        .calendar-day--selected:hover {
          background: var(--color-accent-primary-hover);
        }
        
        .calendar-day--drag-add {
          background: var(--color-accent-primary-muted);
          transform: scale(1.05);
        }
        
        .calendar-day--drag-remove {
          background: var(--color-error-bg);
          transform: scale(0.95);
        }
        
        .calendar-day__number {
          z-index: 1;
        }
        
        .calendar-day__check {
          position: absolute;
          bottom: 2px;
          font-size: 10px;
        }
        
        .calendar-legend {
          margin-top: var(--space-4);
        }
        
        .calendar-selected-list {
          margin-top: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .calendar-selected-header {
          margin-bottom: var(--space-3);
        }
        
        .calendar-selected-count {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-accent-primary);
        }
        
        .calendar-selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        
        .calendar-date-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-2);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
        }
        
        .calendar-date-tag__remove {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-accent-primary);
          cursor: pointer;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
        }
        
        .calendar-date-tag__remove:hover {
          background: var(--color-accent-primary);
          color: white;
        }
        
        @media (max-width: 640px) {
          .calendar-picker {
            padding: var(--space-4);
          }
          
          .calendar-quick-actions {
            justify-content: center;
          }
          
          .calendar-day {
            font-size: var(--text-xs);
          }
        }
      `}</style>
    </div>
  )
}

