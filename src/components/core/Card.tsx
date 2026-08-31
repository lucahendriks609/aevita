import * as React from 'react';

export type CardVariant = 'white' | 'teal' | 'blue';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  children?: React.ReactNode;
  /** @default 'white' */
  variant?: CardVariant;
  /** @default 'md' */
  size?: CardSize;
  /** Lifts 5px with a deeper shadow on hover. @default true */
  hover?: boolean;
  style?: React.CSSProperties;
}

/**
 * Aevita surface card — soft blue-tinted shadow, hairline border, 20px radius.
 * Lifts 5px on hover when `hover` is set (default true).
 */
export function Card({ children, variant = 'white', size = 'md', hover = true, style, ...rest }: CardProps) {
  const [lift, setLift] = React.useState(false);
  const sizes: Record<CardSize, React.CSSProperties> = {
    sm: { padding: '24px', borderRadius: 'var(--radius-sm)' },
    md: { padding: '32px', borderRadius: 'var(--radius)' },
    lg: { padding: '40px', borderRadius: 'var(--radius)' },
  };
  const variants: Record<CardVariant, React.CSSProperties> = {
    white: { background: '#fff', borderColor: 'var(--border-light)' },
    teal: { background: 'var(--teal-light)', borderColor: 'rgba(18,197,162,0.15)' },
    blue: { background: 'var(--blue-light)', borderColor: 'rgba(64,70,202,0.12)' },
  };
  return (
    <div
      className="aev-card"
      onMouseEnter={() => hover && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        border: '1px solid',
        boxShadow: lift ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'var(--transition-slow)',
        transform: lift ? 'translateY(-5px)' : 'none',
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
