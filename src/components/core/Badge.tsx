import * as React from 'react';

export type BadgeVariant = 'blue' | 'teal' | 'coral' | 'lilac' | 'sky' | 'dark';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  children?: React.ReactNode;
  /** @default 'blue' */
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Small pill label. Tinted background + matching text colour. */
export function Badge({ children, variant = 'blue', icon, style, ...rest }: BadgeProps) {
  const variants: Record<BadgeVariant, React.CSSProperties> = {
    blue: { background: 'var(--blue-light)', color: 'var(--blue)' },
    teal: { background: 'var(--teal-light)', color: 'var(--teal-dark)' },
    coral: { background: 'var(--coral-light)', color: 'var(--coral)' },
    lilac: { background: 'rgba(189,194,255,0.25)', color: '#5060D0' },
    sky: { background: 'rgba(51,142,240,0.12)', color: 'var(--balance-blue)' },
    dark: { background: 'rgba(0,35,39,0.08)', color: 'var(--dark)' },
  };
  return (
    <span
      className="aev-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 14px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        lineHeight: 1.4,
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
