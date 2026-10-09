import type { FC, HTMLAttributes, CSSProperties } from 'react';

export interface NotationBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  notation: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NotationBadge: FC<NotationBadgeProps> = ({
  notation,
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const getSizeStyles = (): CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '0.8125rem',
          padding: '2px 6px',
          minWidth: '24px',
        };
      case 'lg':
        return {
          fontSize: '1.25rem',
          padding: '6px 14px',
          minWidth: '38px',
        };
      case 'md':
      default:
        return {
          fontSize: '0.95rem',
          padding: '4px 10px',
          minWidth: '30px',
        };
    }
  };

  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    backgroundColor: 'var(--bg-surface-elevated)',
    border: '1px solid var(--border-medium)',
    borderBottomWidth: '3px',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--cube-white)',
    boxShadow: 'var(--shadow-sm)',
    userSelect: 'none',
    letterSpacing: '0.02em',
    ...getSizeStyles(),
    ...style,
  };

  return (
    <span style={baseStyles} className={`ui-notation-badge ${className}`} {...props}>
      {notation}
    </span>
  );
};
