import * as React from 'react';

export interface SectionLabelProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  children?: React.ReactNode;
  /** @default 'var(--teal-dark)' */
  color?: string;
  style?: React.CSSProperties;
}

/** Uppercase eyebrow that sits above section headings. Teal by default. */
export function SectionLabel({ children, color = 'var(--teal-dark)', style, ...rest }: SectionLabelProps) {
  return (
    <span
      className="aev-section-label"
      style={{
        display: 'inline-block',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
