import * as React from 'react';
import { Button } from '../core/Button';

export interface PricingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  name: string;
  subtitle?: string;
  price: React.ReactNode;
  period?: string;
  image?: string;
  /** @default 'Kies dit plan' */
  cta?: string;
  /** Flips to the brand gradient fill and shows a "Meest gekozen" ribbon. @default false */
  featured?: boolean;
  onSelect?: () => void;
  style?: React.CSSProperties;
}

/**
 * Medication / plan pricing card. `featured` flips to the brand gradient fill.
 * Mirrors the site's pricing-card and med-card patterns.
 */
export function PricingCard({
  name,
  subtitle,
  price,
  period,
  image,
  cta = 'Kies dit plan',
  featured = false,
  onSelect,
  style,
  ...rest
}: PricingCardProps) {
  const [lift, setLift] = React.useState(false);
  return (
    <div
      className="aev-pricing-card"
      onMouseEnter={() => setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '32px 28px',
        border: featured ? '2px solid transparent' : '2px solid var(--border)',
        background: featured ? 'var(--gradient)' : '#fff',
        color: featured ? '#fff' : 'inherit',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition-slow)',
        transform: featured ? (lift ? 'scale(1.03) translateY(-4px)' : 'scale(1.03)') : lift ? 'translateY(-6px)' : 'none',
        boxShadow: featured ? 'var(--shadow-lg)' : lift ? 'var(--shadow-md)' : 'none',
        borderColor: !featured && lift ? 'var(--blue)' : undefined,
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {featured && (
        <span
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-pill)',
            padding: '4px 12px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Meest gekozen
        </span>
      )}
      {image && <img src={image} alt={name} style={{ height: '80px', objectFit: 'contain', margin: '0 auto 20px' }} />}
      <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>{name}</div>
      {subtitle && (
        <div
          style={{
            fontSize: '0.82rem',
            color: featured ? 'rgba(255,255,255,0.75)' : 'var(--muted)',
            marginBottom: '16px',
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          margin: '16px 0 24px',
          padding: '16px 0',
          borderTop: `1px solid ${featured ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`,
          borderBottom: `1px solid ${featured ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`,
        }}
      >
        <span style={{ fontSize: '2.2rem', fontWeight: 700, color: featured ? '#fff' : 'var(--blue)', lineHeight: 1 }}>
          {price}
        </span>
        {period && (
          <div style={{ fontSize: '0.82rem', color: featured ? 'rgba(255,255,255,0.7)' : 'var(--muted)', marginTop: '4px' }}>
            {period}
          </div>
        )}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Button variant={featured ? 'white' : 'primary'} onClick={onSelect} style={{ width: '100%' }}>
          {cta}
        </Button>
      </div>
    </div>
  );
}
