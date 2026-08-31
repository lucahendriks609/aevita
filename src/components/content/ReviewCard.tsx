import * as React from 'react';

export interface ReviewCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  text: string;
  author: string;
  meta?: string;
  medication?: string;
  /** Filled stars out of 5. @default 5 */
  stars?: number;
  avatar?: string;
  style?: React.CSSProperties;
}

/** Customer review card — gold stars, quote, author + medication pill. */
export function ReviewCard({ text, author, meta, medication, stars = 5, avatar, style, ...rest }: ReviewCardProps) {
  return (
    <div
      className="aev-review-card"
      style={{
        background: '#fff',
        borderRadius: 'var(--radius)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      <div style={{ color: '#FFB800', fontSize: '1rem', marginBottom: '12px', letterSpacing: '2px' }}>
        {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)}
      </div>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text)', marginBottom: '20px', flex: 1 }}>
        {text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--gradient)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {avatar ? (
            <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : typeof author === 'string' ? (
            author[0]
          ) : (
            ''
          )}
        </span>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--dark)' }}>{author}</div>
          {meta && <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{meta}</div>}
        </div>
        {medication && (
          <span
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontWeight: 500,
              color: 'var(--teal)',
              background: 'rgba(0,188,142,0.1)',
              borderRadius: '20px',
              padding: '2px 10px',
            }}
          >
            {medication}
          </span>
        )}
      </div>
    </div>
  );
}
