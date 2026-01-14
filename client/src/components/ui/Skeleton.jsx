export function Skeleton({ 
  variant = 'text', 
  width, 
  height,
  className = '',
  count = 1
}) {
  const baseClass = `skeleton skeleton--${variant}`
  
  const style = {
    width: width || undefined,
    height: height || undefined
  }

  if (count > 1) {
    return (
      <div className="skeleton-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} ${className}`} style={style} />
        ))}
      </div>
    )
  }

  return <div className={`${baseClass} ${className}`} style={style} />
}

export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton variant="title" width="60%" />
      <div style={{ marginTop: '16px' }}>
        <Skeleton variant="text" count={3} />
      </div>
    </div>
  )
}

export function CalendarSkeleton() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Skeleton width="100px" height="32px" />
        <Skeleton width="60px" height="32px" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} height="40px" />
        ))}
      </div>
    </div>
  )
}

