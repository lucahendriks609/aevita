import * as React from 'react';

export interface StatItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  number: React.ReactNode;
  label: React.ReactNode;
  /** @default 'var(--blue)' */
  color?: string;
  /** Wraps the number/label in a card surface. @default true */
  boxed?: boolean;
  style?: React.CSSProperties;
}

/** Big number + label. Used in stat grids and hero strips. */
export function StatItem({ number, label, color = 'var(--blue)', boxed = true, style, ...rest }: StatItemProps) {
  return (
    <div
      className="aev-stat"
      style={{
        textAlign: 'center',
        ...(boxed
          ? {
              background: '#fff',
              borderRadius: 'var(--radius)',
              padding: '24px 20px',
              boxShadow: 'var(--shadow-xs)',
              border: '1px solid var(--border-light)',
            }
          : {}),
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          display: 'block',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 700,
          color,
          lineHeight: 1,
          marginBottom: '6px',
          letterSpacing: '-0.02em',
        }}
      >
        {number}
      </span>
      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}
