import * as React from 'react';

export interface TrustBarItem {
  icon: React.ReactNode;
  label: React.ReactNode;
}

export interface TrustBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  items?: TrustBarItem[];
  style?: React.CSSProperties;
}

/**
 * Horizontal row of trust signals (icon chip + short label). Sits on a soft
 * gradient strip below the hero or above the footer.
 */
export function TrustBar({ items = [], style, ...rest }: TrustBarProps) {
  return (
    <div
      className="aev-trust-bar"
      style={{
        background: 'var(--gradient-soft)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '20px clamp(20px,5vw,40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(20px,4vw,56px)',
        flexWrap: 'wrap',
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-xs)',
              flexShrink: 0,
              color: 'var(--teal)',
            }}
          >
            {item.icon}
          </span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
