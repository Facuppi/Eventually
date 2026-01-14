import { forwardRef } from 'react'

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'md' && `btn--${size}`,
    fullWidth && 'btn--full',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="btn__icon" aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="btn__icon" aria-hidden="true">{icon}</span>
      )}
    </button>
  )
})

export { Button }

