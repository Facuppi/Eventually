import { useState, useRef, useCallback, useMemo, useEffect } from 'react'

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const MONTHS_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const AVAILABILITY_STATES = ['available', 'adaptable', 'unavailable']

function Calendar({ 
  selectedDates = [], 
  availability = {},
  onDatesChange,
  onDateClick,
  onAvailabilityChange,
  mode = 'select', // 'select' for admin creating, 'respond' for participants
  viewMode = 'days' // 'days' or 'weeks'
}) {
  const [currentDate, setCurrentDate] = useState(() => {
    if (mode === 'respond' && selectedDates.length > 0) {
      const firstDate = new Date(selectedDates.sort()[0])
      return new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)
    }
    return new Date()
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [dragMode, setDragMode] = useState(null)
  const [draggedDates, setDraggedDates] = useState(new Set())
  const [touchStart, setTouchStart] = useState(null)
  const calendarRef = useRef(null)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  
  let startDay = firstDayOfMonth.getDay() - 1
  if (startDay < 0) startDay = 6
  
  const daysInMonth = lastDayOfMonth.getDate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Touch handling for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextMonth()
      else prevMonth()
    }
    setTouchStart(null)
  }

  const monthsWithDates = useMemo(() => {
    if (mode !== 'respond') return []
    
    const months = new Map()
    selectedDates.forEach(dateStr => {
      const date = new Date(dateStr)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!months.has(key)) {
        months.set(key, {
          year: date.getFullYear(),
          month: date.getMonth(),
          count: 0
        })
      }
      months.get(key).count++
    })
    
    return Array.from(months.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })
  }, [selectedDates, mode])

  const formatDateKey = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Select entire week
  const selectWeek = (weekDates) => {
    if (mode !== 'select') return
    const futureDates = weekDates.filter(d => new Date(d) >= today)
    const allSelected = futureDates.every(d => selectedDates.includes(d))
    
    if (allSelected) {
      onDatesChange?.(selectedDates.filter(d => !futureDates.includes(d)))
    } else {
      onDatesChange?.([...new Set([...selectedDates, ...futureDates])].sort())
    }
  }

  // Select entire month
  const selectMonth = () => {
    if (mode !== 'select') return
    const monthDates = []
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      if (date >= today) {
        monthDates.push(formatDateKey(date))
      }
    }
    
    const allSelected = monthDates.every(d => selectedDates.includes(d))
    if (allSelected) {
      onDatesChange?.(selectedDates.filter(d => !monthDates.includes(d)))
    } else {
      onDatesChange?.([...new Set([...selectedDates, ...monthDates])].sort())
    }
  }

  // Select only weekdays
  const selectWeekdays = () => {
    if (mode !== 'select') return
    const weekdayDates = []
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayOfWeek = date.getDay()
      if (date >= today && dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdayDates.push(formatDateKey(date))
      }
    }
    
    const allSelected = weekdayDates.every(d => selectedDates.includes(d))
    if (allSelected) {
      onDatesChange?.(selectedDates.filter(d => !weekdayDates.includes(d)))
    } else {
      onDatesChange?.([...new Set([...selectedDates, ...weekdayDates])].sort())
    }
  }

  // Clear all selections
  const clearAll = () => {
    if (mode !== 'select') return
    onDatesChange?.([])
  }

  // Single click to toggle
  const handleDayClick = (day, e) => {
    const date = new Date(year, month, day)
    const dateKey = formatDateKey(date)
    
    if (mode === 'select') {
      if (date < today) return
      
      // Simple toggle on click
      if (selectedDates.includes(dateKey)) {
        onDatesChange?.(selectedDates.filter(d => d !== dateKey))
      } else {
        onDatesChange?.([...selectedDates, dateKey].sort())
      }
    } else if (mode === 'respond') {
      if (!selectedDates.includes(dateKey)) return
      
      const currentState = availability[dateKey] || 'available'
      const currentIndex = AVAILABILITY_STATES.indexOf(currentState)
      const nextIndex = (currentIndex + 1) % AVAILABILITY_STATES.length
      const newState = AVAILABILITY_STATES[nextIndex]
      
      onAvailabilityChange?.({ ...availability, [dateKey]: newState })
    }
  }

  // Drag selection handlers for select mode
  const handleMouseDown = (day, e) => {
    if (mode !== 'select') return
    
    const date = new Date(year, month, day)
    if (date < today) return
    
    const dateKey = formatDateKey(date)
    const isSelected = selectedDates.includes(dateKey)
    
    setIsDragging(true)
    setDragStart(dateKey)
    setDragMode(isSelected ? 'remove' : 'add')
    setDraggedDates(new Set([dateKey]))
    
    e.preventDefault()
  }

  const handleMouseEnter = (day) => {
    if (!isDragging || mode !== 'select') return
    
    const date = new Date(year, month, day)
    if (date < today) return
    
    const dateKey = formatDateKey(date)
    setDraggedDates(prev => new Set([...prev, dateKey]))
  }

  const handleMouseUp = useCallback(() => {
    if (!isDragging || mode !== 'select') return
    
    // Only apply if dragged over multiple dates
    if (draggedDates.size > 1) {
      const newDates = dragMode === 'add'
        ? [...new Set([...selectedDates, ...draggedDates])]
        : selectedDates.filter(d => !draggedDates.has(d))
      
      onDatesChange?.(newDates.sort())
    }
    
    setIsDragging(false)
    setDragStart(null)
    setDraggedDates(new Set())
  }, [isDragging, mode, dragMode, selectedDates, draggedDates, onDatesChange])

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [isDragging, handleMouseUp])

  const getDayClass = (day) => {
    const date = new Date(year, month, day)
    const dateKey = formatDateKey(date)
    const isToday = date.getTime() === today.getTime()
    const isPast = date < today
    
    let classes = ['calendar-day']
    
    if (isToday) classes.push('today')
    
    if (mode === 'select') {
      if (isPast) classes.push('disabled')
      
      if (draggedDates.has(dateKey) && draggedDates.size > 1) {
        classes.push(dragMode === 'add' ? 'dragging-add' : 'dragging-remove')
      } else if (selectedDates.includes(dateKey)) {
        classes.push('selected')
      }
    } else if (mode === 'respond') {
      if (!selectedDates.includes(dateKey)) {
        classes.push('disabled')
      } else {
        const status = availability[dateKey] || 'available'
        classes.push(status)
      }
    }
    
    return classes.join(' ')
  }

  // Group days by week for week selection
  const getWeeksInMonth = () => {
    const weeks = []
    let currentWeek = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    
    // Fill remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }
    
    return weeks
  }

  const weeks = getWeeksInMonth()

  return (
    <div 
      className="calendar" 
      ref={calendarRef} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Month pills for quick navigation (respond mode only) */}
      {mode === 'respond' && monthsWithDates.length > 1 && (
        <div className="calendar-months-nav">
          <span className="calendar-months-label">
            Meses con opciones:
          </span>
          <div className="calendar-month-pills">
            {monthsWithDates.map(({ year: y, month: m, count }) => {
              const isActive = y === year && m === month
              return (
                <button
                  key={`${y}-${m}`}
                  className={`calendar-month-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentDate(new Date(y, m, 1))}
                >
                  {MONTHS_SHORT[m]} {y !== new Date().getFullYear() ? y : ''}
                  <span className="pill-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick selection buttons (select mode only) */}
      {mode === 'select' && (
        <div className="calendar-quick-actions">
          <div className="quick-actions-row">
            <button 
              type="button" 
              className="quick-action-btn"
              onClick={selectMonth}
            >
              <span className="quick-icon">📅</span>
              Todo el mes
            </button>
            <button 
              type="button" 
              className="quick-action-btn"
              onClick={selectWeekdays}
            >
              <span className="quick-icon">💼</span>
              Solo L-V
            </button>
            {selectedDates.length > 0 && (
              <button 
                type="button" 
                className="quick-action-btn danger"
                onClick={clearAll}
              >
                <span className="quick-icon">✕</span>
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth} type="button" aria-label="Mes anterior">‹</button>
          <span className="calendar-month">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} type="button" aria-label="Mes siguiente">›</button>
        </div>
      </div>
      
      <div 
        className="calendar-grid"
        onMouseLeave={() => isDragging && handleMouseUp()}
      >
        {WEEKDAYS.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        
        {weeks.map((week, weekIndex) => {
          const weekDates = week
            .filter(d => d !== null)
            .map(d => formatDateKey(new Date(year, month, d)))
          
          return week.map((day, dayIndex) => {
            if (day === null) {
              return <div key={`empty-${weekIndex}-${dayIndex}`} className="calendar-day empty"></div>
            }
            
            const date = new Date(year, month, day)
            const isPast = date < today
            const dateKey = formatDateKey(date)
            const isSelectable = mode === 'respond' ? selectedDates.includes(dateKey) : !isPast
            const isSelected = selectedDates.includes(dateKey)
            
            return (
              <div
                key={day}
                className={getDayClass(day)}
                onMouseDown={(e) => mode === 'select' && isSelectable && handleMouseDown(day, e)}
                onMouseEnter={() => mode === 'select' && isSelectable && handleMouseEnter(day)}
                onClick={(e) => handleDayClick(day, e)}
                style={{ cursor: isSelectable ? 'pointer' : 'default' }}
              >
                <span className="day-number">{day}</span>
                {mode === 'select' && isSelected && !isPast && (
                  <span className="day-check">✓</span>
                )}
              </div>
            )
          })
        })}
      </div>

      {/* Selection help for select mode */}
      {mode === 'select' && (
        <div className="calendar-help">
          <div className="help-item">
            <span className="help-icon">👆</span>
            <span>Clic para seleccionar/deseleccionar</span>
          </div>
          <div className="help-item">
            <span className="help-icon">↔️</span>
            <span>Arrastra para seleccionar varios</span>
          </div>
          <div className="help-item">
            <span className="help-icon">👆👆</span>
            <span>Usa los botones rápidos arriba</span>
          </div>
        </div>
      )}

      <style>{`
        .calendar {
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-y;
        }

        .calendar-quick-actions {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .quick-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .quick-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          font-size: 0.8125rem;
          font-weight: 500;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          color: var(--text-primary);
        }

        .quick-action-btn:hover {
          background: var(--bg-hover);
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        .quick-action-btn:active {
          transform: translateY(0);
        }

        .quick-action-btn.danger {
          color: var(--unavailable);
          border-color: var(--unavailable);
        }

        .quick-action-btn.danger:hover {
          background: var(--unavailable-bg);
          border-color: var(--unavailable);
        }

        .quick-icon {
          font-size: 1rem;
        }

        .calendar-day {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .day-number {
          position: relative;
          z-index: 1;
        }

        .day-check {
          position: absolute;
          bottom: 2px;
          right: 2px;
          font-size: 0.625rem;
          color: white;
          background: var(--accent);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: popIn 0.2s ease;
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .calendar-day.dragging-add {
          background: var(--accent) !important;
          color: white !important;
          border-color: var(--accent) !important;
          animation: pulse-select 0.5s ease infinite;
        }

        .calendar-day.dragging-remove {
          background: var(--unavailable-bg) !important;
          border-color: var(--unavailable) !important;
          color: var(--unavailable) !important;
          opacity: 0.7;
        }

        @keyframes pulse-select {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .calendar-help {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .help-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .help-icon {
          font-size: 1rem;
        }

        .calendar-months-nav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .calendar-months-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-right: 0.5rem;
        }
        
        .calendar-month-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        
        .calendar-month-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          color: var(--text-secondary);
        }
        
        .calendar-month-pill:hover {
          background: var(--bg-hover);
          border-color: var(--accent);
        }
        
        .calendar-month-pill.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        
        .calendar-month-pill.active .pill-count {
          background: rgba(255,255,255,0.2);
          color: white;
        }
        
        .pill-count {
          background: var(--bg-hover);
          padding: 0.125rem 0.375rem;
          border-radius: 100px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .quick-actions-row {
            justify-content: center;
          }

          .quick-action-btn {
            flex: 1;
            min-width: 0;
            justify-content: center;
            padding: 0.625rem 0.5rem;
          }

          .calendar-help {
            flex-direction: column;
            gap: 0.5rem;
          }

          .help-item {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default Calendar
