import type { FC, HTMLAttributes, CSSProperties } from 'react';
import type { CubeLevel, FaceColor } from '../../types';

export type BadgeVariant =
  | 'default'
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'success'
  | 'warning'
  | 'error'
  | 'face';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  level?: CubeLevel;
  faceColor?: FaceColor;
  size?: 'sm' | 'md';
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  level,
  faceColor,
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const effectiveVariant = level ? level : variant;

  const getVariantStyles = (): CSSProperties => {
    switch (effectiveVariant) {
      case 'basic':
        return {
          backgroundColor: 'var(--level-basic-bg)',
          border: '1px solid var(--level-basic-border)',
          color: 'var(--level-basic)',
        };
      case 'intermediate':
        return {
          backgroundColor: 'var(--level-intermediate-bg)',
          border: '1px solid var(--level-intermediate-border)',
          color: 'var(--level-intermediate)',
        };
      case 'advanced':
        return {
          backgroundColor: 'var(--level-advanced-bg)',
          border: '1px solid var(--level-advanced-border)',
          color: 'var(--level-advanced)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--status-success)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: 'var(--status-warning)',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: 'var(--status-error)',
        };
      case 'face':
        return {
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          color: faceColor ? `var(--cube-${faceColor})` : 'var(--text-primary)',
        };
      case 'default':
      default:
        return {
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
        };
    }
  };

  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: size === 'sm' ? '0.75rem' : '0.8125rem',
    padding: size === 'sm' ? '2px 8px' : '4px 10px',
    borderRadius: 'var(--radius-full)',
    lineHeight: 1.2,
    userSelect: 'none',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <span style={baseStyles} className={`ui-badge ui-badge-${effectiveVariant} ${className}`} {...props}>
      {children}
    </span>
  );
};
