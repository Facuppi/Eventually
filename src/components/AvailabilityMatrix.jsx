import { useMemo } from 'react'

function AvailabilityMatrix({ dates, responses }) {
  const sortedDates = useMemo(() => {
    return [...dates].sort((a, b) => new Date(a) - new Date(b))
  }, [dates])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      month: date.toLocaleDateString('es-ES', { month: 'short' })
    }
  }

  const getStatusSymbol = (status) => {
    switch (status) {
      case 'available': return '✓'
      case 'adaptable': return '~'
      case 'unavailable': return '✗'
      default: return '–'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'matrix-cell-available'
      case 'adaptable': return 'matrix-cell-adaptable'
      case 'unavailable': return 'matrix-cell-unavailable'
      default: return 'matrix-cell-none'
    }
  }

  // Calculate summary for each date
  const dateSummary = useMemo(() => {
    return sortedDates.map(date => {
      let available = 0
      let adaptable = 0
      let unavailable = 0
      
      responses.forEach(r => {
        const status = r.availability[date]
        if (status === 'available') available++
        else if (status === 'adaptable') adaptable++
        else if (status === 'unavailable') unavailable++
      })
      
      return { date, available, adaptable, unavailable }
    })
  }, [sortedDates, responses])

  if (responses.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
        Aún no hay respuestas
      </div>
    )
  }

  return (
    <div className="matrix-container">
      <div className="matrix-scroll">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-header-cell matrix-sticky-col">Participante</th>
              {sortedDates.map(date => {
                const { day, weekday, month } = formatDate(date)
                return (
                  <th key={date} className="matrix-header-cell matrix-date-header">
                    <div className="matrix-date-weekday">{weekday}</div>
                    <div className="matrix-date-day">{day}</div>
                    <div className="matrix-date-month">{month}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {responses.map(response => (
              <tr key={response.participant_email || response.participant_name}>
                <td className="matrix-name-cell matrix-sticky-col">
                  {response.participant_name}
                </td>
                {sortedDates.map(date => {
                  const status = response.availability[date] || 'none'
                  return (
                    <td 
                      key={date} 
                      className={`matrix-cell ${getStatusClass(status)}`}
                    >
                      {getStatusSymbol(status)}
                    </td>
                  )
                })}
              </tr>
            ))}
            {/* Summary row */}
            <tr className="matrix-summary-row">
              <td className="matrix-name-cell matrix-sticky-col" style={{ fontWeight: '600' }}>
                Resumen
              </td>
              {dateSummary.map(({ date, available, adaptable, unavailable }) => (
                <td key={date} className="matrix-cell matrix-summary-cell">
                  <div className="matrix-summary-content">
                    {available > 0 && <span className="summary-available">✓{available}</span>}
                    {adaptable > 0 && <span className="summary-adaptable">~{adaptable}</span>}
                    {unavailable > 0 && <span className="summary-unavailable">✗{unavailable}</span>}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <style>{`
        .matrix-container {
          margin-top: 1rem;
        }
        
        .matrix-scroll {
          overflow-x: auto;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        
        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        
        .matrix-header-cell {
          padding: 0.5rem;
          text-align: center;
          background: var(--bg-tertiary);
          font-weight: 500;
          border-bottom: 1px solid var(--border-light);
          white-space: nowrap;
        }
        
        .matrix-sticky-col {
          position: sticky;
          left: 0;
          background: var(--bg-secondary);
          z-index: 1;
          border-right: 1px solid var(--border-light);
        }
        
        .matrix-date-header {
          min-width: 60px;
        }
        
        .matrix-date-weekday {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        
        .matrix-date-day {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.2;
        }
        
        .matrix-date-month {
          font-size: 0.65rem;
          color: var(--text-tertiary);
        }
        
        .matrix-name-cell {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .matrix-cell {
          padding: 0.5rem;
          text-align: center;
          font-weight: 600;
          min-width: 60px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .matrix-cell-available {
          background: var(--available-bg);
          color: var(--available);
        }
        
        .matrix-cell-adaptable {
          background: var(--adaptable-bg);
          color: var(--adaptable);
        }
        
        .matrix-cell-unavailable {
          background: var(--unavailable-bg);
          color: var(--unavailable);
        }
        
        .matrix-cell-none {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
        }
        
        .matrix-summary-row {
          background: var(--bg-tertiary);
        }
        
        .matrix-summary-row .matrix-sticky-col {
          background: var(--bg-tertiary);
        }
        
        .matrix-summary-cell {
          background: var(--bg-secondary) !important;
        }
        
        .matrix-summary-content {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          font-size: 0.7rem;
        }
        
        .summary-available {
          color: var(--available);
        }
        
        .summary-adaptable {
          color: var(--adaptable);
        }
        
        .summary-unavailable {
          color: var(--unavailable);
        }
      `}</style>
    </div>
  )
}

export default AvailabilityMatrix

