import type { FC, HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0 a 100
  height?: number;
  color?: 'primary' | 'basic' | 'intermediate' | 'advanced' | 'gradient';
  showLabel?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  height = 8,
  color = 'primary',
  showLabel = false,
  className = '',
  style,
  ...props
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const getFillBackground = () => {
    switch (color) {
      case 'basic':
        return 'var(--level-basic)';
      case 'intermediate':
        return 'var(--level-intermediate)';
      case 'advanced':
        return 'var(--level-advanced)';
      case 'gradient':
        return 'var(--brand-gradient)';
      case 'primary':
      default:
        return 'var(--brand-primary)';
    }
  };

  return (
    <div style={{ width: '100%', ...style }} className={`ui-progress-wrapper ${className}`} {...props}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
          }}
        >
          <span>Progresso</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            width: `${clampedValue}%`,
            height: '100%',
            background: getFillBackground(),
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-smooth)',
          }}
        />
      </div>
    </div>
  );
};
