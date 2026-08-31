import * as React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Checkbox with brand-blue accent and inline label copy. */
export function Checkbox({ label, checked, defaultChecked, onChange, style, ...rest }: CheckboxProps) {
  return (
    <label className="aev-check" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', ...style }}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        style={{ width: '18px', height: '18px', accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
        {...rest}
      />
      <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{label}</span>
    </label>
  );
}
