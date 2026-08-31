import * as React from 'react';

export type CheckListTone = 'teal' | 'blue' | 'coral';

export interface CheckListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'style'> {
  items?: React.ReactNode[];
  /** @default 'teal' */
  tone?: CheckListTone;
  style?: React.CSSProperties;
}

/** Vertical list of ticked items with a soft circular check chip. */
export function CheckList({ items = [], tone = 'teal', style, ...rest }: CheckListProps) {
  const tones: Record<CheckListTone, React.CSSProperties> = {
    teal: { background: 'var(--teal-light)', color: 'var(--teal-dark)' },
    blue: { background: 'var(--blue-light)', color: 'var(--blue)' },
    coral: { background: 'var(--coral-light)', color: 'var(--coral)' },
  };
  return (
    <ul
      className="aev-checklist"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '13px',
            fontSize: '0.9rem',
            lineHeight: 1.65,
            color: 'var(--text)',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              flexShrink: 0,
              marginTop: '2px',
              ...tones[tone],
            }}
          >
            {'✓'}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
