import type { FC, HTMLAttributes, CSSProperties } from 'react';
import type { FaceColor } from '../../types';

export type CardVariant = 'default' | 'elevated' | 'interactive' | 'outline';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  facetColor?: FaceColor;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  facetColor,
  padding = 'md',
  className = '',
  style,
  ...props
}) => {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return 'var(--space-4)';
      case 'lg':
        return 'var(--space-8)';
      case 'md':
      default:
        return 'var(--space-6)';
    }
  };

  const getFacetBorder = (): CSSProperties => {
    if (!facetColor) return {};
    const colorMap: Record<FaceColor, string> = {
      white: 'var(--cube-white)',
      yellow: 'var(--cube-yellow)',
      green: 'var(--cube-green)',
      blue: 'var(--cube-blue)',
      red: 'var(--cube-red)',
      orange: 'var(--cube-orange)',
    };
    return {
      borderTop: `3px solid ${colorMap[facetColor]}`,
    };
  };

  const getBackground = () => {
    switch (variant) {
      case 'elevated':
        return 'var(--bg-surface-elevated)';
      case 'outline':
        return 'transparent';
      case 'default':
      case 'interactive':
      default:
        return 'var(--bg-surface)';
    }
  };

  const baseStyles: CSSProperties = {
    backgroundColor: getBackground(),
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)',
    padding: getPaddingStyle(),
    boxShadow: variant === 'elevated' ? 'var(--shadow-lg)' : 'var(--shadow-md)',
    position: 'relative',
    transition: 'transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)',
    cursor: variant === 'interactive' ? 'pointer' : 'default',
    ...getFacetBorder(),
    ...style,
  };

  return (
    <div
      style={baseStyles}
      className={`ui-card ${variant === 'interactive' ? 'card-interactive' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
