import type { FC, ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cube-accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  style,
  ...props
}) => {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--brand-primary)',
          color: '#ffffff',
          border: '1px solid transparent',
          boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--bg-surface-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-medium)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--brand-primary)',
          border: '1px solid var(--brand-primary)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent',
        };
      case 'danger':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: 'var(--status-error)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      case 'cube-accent':
        return {
          background: 'var(--brand-gradient)',
          color: '#ffffff',
          border: 'none',
          boxShadow: 'var(--shadow-md), var(--shadow-glow-blue)',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 12px',
          fontSize: '0.875rem',
          borderRadius: 'var(--radius-sm)',
          gap: '6px',
        };
      case 'lg':
        return {
          padding: '14px 28px',
          fontSize: '1.0625rem',
          borderRadius: 'var(--radius-md)',
          gap: '10px',
        };
      case 'md':
      default:
        return {
          padding: '10px 20px',
          fontSize: '0.9375rem',
          borderRadius: 'var(--radius-sm)',
          gap: '8px',
        };
    }
  };

  const baseStyles: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.55 : 1,
    transition: 'all var(--transition-fast)',
    userSelect: 'none',
    textDecoration: 'none',
    outline: 'none',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={baseStyles}
      className={`ui-button ui-button-${variant} ui-button-${size} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.75s linear infinite',
          }}
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
