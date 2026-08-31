import * as React from 'react';

export type ButtonVariant = 'primary' | 'blue' | 'teal' | 'outline' | 'outline-white' | 'white' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Visual style. Primary/teal = Mindful Mint action; blue = Boost Blue brand. @default 'primary' */
  variant?: ButtonVariant;
  /** @default 'md' */
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Element/tag to render as when not a link. @default 'button' */
  as?: React.ElementType;
  /** Renders as an `<a>` when set. */
  href?: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

/**
 * Aevita Button — pill-shaped, weight-600 label, blue-tinted lift on hover.
 * Primary action = Mindful Mint (teal). Brand/secondary = Boost Blue.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  as = 'button',
  href,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const sizes: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '10px 20px', fontSize: '0.82rem' },
    md: { padding: '14px 30px', fontSize: '0.9rem' },
    lg: { padding: '17px 36px', fontSize: '0.975rem' },
    xl: { padding: '20px 44px', fontSize: '1.05rem' },
  };
  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: 'var(--teal)', color: '#fff', boxShadow: 'var(--shadow-teal)' },
    blue: { background: 'var(--blue)', color: '#fff', boxShadow: 'var(--shadow-blue)' },
    teal: { background: 'var(--teal)', color: '#fff', boxShadow: 'var(--shadow-teal)' },
    outline: { background: 'transparent', color: 'var(--blue)', border: '2px solid var(--blue)' },
    'outline-white': { background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.55)' },
    white: { background: '#fff', color: 'var(--blue)', boxShadow: 'var(--shadow-sm)' },
    ghost: { background: 'transparent', color: 'var(--blue)' },
  };
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-brand)',
    fontWeight: 600,
    lineHeight: 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '2px solid transparent',
    whiteSpace: 'nowrap',
    transition: 'var(--transition)',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };
  const Tag: React.ElementType = href ? 'a' : as;
  return (
    <Tag
      className="aev-btn"
      style={base}
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
