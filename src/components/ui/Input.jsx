import { forwardRef, useState } from 'react'

const Input = forwardRef(function Input({
  label,
  hint,
  error,
  required = false,
  optional = false,
  maxLength,
  showCounter = false,
  className = '',
  ...props
}, ref) {
  const [charCount, setCharCount] = useState(props.value?.length || 0)
  const id = props.id || props.name || Math.random().toString(36).slice(2)
  
  const handleChange = (e) => {
    setCharCount(e.target.value.length)
    props.onChange?.(e)
  }

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="form-label__required">*</span>}
          {optional && <span className="form-label__optional">(opcional)</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`form-input ${error ? 'form-input--error' : ''} ${className}`}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
        onChange={handleChange}
      />
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">{hint}</p>
      )}
      {showCounter && maxLength && (
        <p className="form-counter">
          {charCount}/{maxLength}
        </p>
      )}
    </div>
  )
})

export { Input }

