import * as React from 'react';

export interface GoogleReviewsBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** @default 4.8 */
  rating?: number;
  /** @default '1.200+' */
  count?: string;
  /** @default 'light' */
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}

/** Google-reviews trust badge — stars + rating + count. Light or dark surface. */
export function GoogleReviewsBadge({ rating = 4.8, count = '1.200+', theme = 'light', style, ...rest }: GoogleReviewsBadgeProps) {
  const dark = theme === 'dark';
  return (
    <div
      className="aev-google-reviews"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 18px 9px 11px',
        borderRadius: '100px',
        fontSize: '0.8rem',
        fontWeight: 500,
        width: 'fit-content',
        background: dark ? 'rgba(255,255,255,0.1)' : '#fff',
        border: dark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,35,39,0.09)',
        boxShadow: dark ? 'none' : '0 2px 10px rgba(0,35,39,0.08)',
        ...style,
      }}
      {...rest}
    >
      <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
        />
        <path
          fill="#34A853"
          d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
        />
        <path
          fill="#FBBC05"
          d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
        />
        <path
          fill="#EA4335"
          d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
        />
      </svg>
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.75rem', color: '#F5A623', lineHeight: 1, marginBottom: '2px', letterSpacing: '1px' }}>
          ★★★★★
        </span>
        <span style={{ fontSize: '0.73rem', lineHeight: 1, color: dark ? 'rgba(255,255,255,0.75)' : 'var(--muted)' }}>
          <strong style={{ color: dark ? '#fff' : 'var(--dark)', fontWeight: 700 }}>{rating}</strong> · {count} reviews
        </span>
      </span>
    </div>
  );
}
