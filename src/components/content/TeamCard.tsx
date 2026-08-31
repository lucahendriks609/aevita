import * as React from 'react';
import { Button } from '../core/Button';

export interface TeamCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  photo?: string;
  name: string;
  role?: string;
  bio?: string;
  cta?: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}

/** Team member card — portrait, name, teal role, short bio. */
export function TeamCard({ photo, name, role, bio, cta, onCta, style, ...rest }: TeamCardProps) {
  const [lift, setLift] = React.useState(false);
  return (
    <div
      className="aev-team-card"
      onMouseEnter={() => setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        background: '#fff',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: lift ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        border: '1px solid var(--border-light)',
        transition: 'var(--transition-slow)',
        transform: lift ? 'translateY(-6px)' : 'none',
        textAlign: 'center',
        ...style,
      }}
      {...rest}
    >
      <div style={{ height: '260px', background: 'var(--gradient-soft)' }}>
        {photo && (
          <img
            src={photo}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        )}
      </div>
      <div style={{ padding: '24px 20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{name}</h3>
        {role && <div style={{ fontSize: '0.82rem', color: 'var(--teal-dark)', fontWeight: 600, marginBottom: '12px' }}>{role}</div>}
        {bio && <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{bio}</p>}
        {cta && (
          <div style={{ marginTop: '16px' }}>
            <Button variant="outline" size="sm" onClick={onCta}>
              {cta}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
