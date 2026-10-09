import type { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  style,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: error ? 'var(--status-error)' : 'var(--text-primary)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-input)',
          border: `1px solid ${error ? 'var(--status-error)' : 'var(--border-medium)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          fontSize: '0.9375rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          ...style,
        }}
        className={`ui-input ${error ? 'ui-input-error' : ''} ${className}`}
        {...props}
      />
      {error ? (
        <span style={{ fontSize: '0.8125rem', color: 'var(--status-error)' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{helperText}</span>
      ) : null}
    </div>
  );
};
