import * as React from 'react';

export interface FAQItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  question: React.ReactNode;
  children?: React.ReactNode;
  /** @default false */
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}

/** Single accordion row. Clean underline style (site's faq-item-clean). */
export function FAQItem({ question, children, defaultOpen = false, style, ...rest }: FAQItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="aev-faq-item" style={{ borderBottom: '1px solid var(--border)', ...style }} {...rest}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          cursor: 'pointer',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: open ? 'var(--teal)' : 'var(--dark)',
          gap: '16px',
          userSelect: 'none',
          transition: 'color 0.2s',
        }}
      >
        <span>{question}</span>
        <span
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            flexShrink: 0,
            transition: 'all 0.25s ease',
            background: open ? 'var(--teal)' : 'var(--light)',
            color: open ? '#fff' : 'var(--muted)',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? '400px' : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, padding 0.2s ease',
          fontSize: '0.88rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
          paddingBottom: open ? '18px' : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
