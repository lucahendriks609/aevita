import * as React from 'react';

export interface InputOption {
  value?: string;
  label?: string;
}

export interface InputProps {
  label?: React.ReactNode;
  /** HTML input type, when `as="input"`. @default 'text' */
  type?: string;
  /** Which field element to render. @default 'input' */
  as?: 'input' | 'textarea' | 'select';
  /** Options when `as="select"` — plain strings or `{value, label}`. */
  options?: Array<string | InputOption>;
  hint?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  defaultValue?: string;
  placeholder?: string;
  [key: string]: unknown;
}

/** Text input / textarea / select with the Aevita blue focus ring. */
export function Input({ label, type = 'text', as = 'input', options = [], hint, style, id, ...rest }: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const field: React.CSSProperties = {
    width: '100%',
    padding: '13px 18px',
    border: `1.5px solid ${focus ? 'var(--blue)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    color: 'var(--text)',
    background: '#fff',
    outline: 'none',
    boxShadow: focus ? '0 0 0 3px rgba(55,83,240,0.1)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ...(as === 'textarea' ? { minHeight: '130px', resize: 'vertical', lineHeight: 1.7 } : {}),
    ...style,
  };
  return (
    <div className="aev-form-group" style={{ marginBottom: '20px' }}>
      {label && (
        <label htmlFor={fieldId} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>
          {label}
        </label>
      )}
      {as === 'textarea' ? (
        <textarea id={fieldId} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...(rest as any)} />
      ) : as === 'select' ? (
        <select id={fieldId} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...(rest as any)}>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value ?? opt.label} value={opt.value ?? opt.label}>
                {opt.label ?? opt.value}
              </option>
            );
          })}
        </select>
      ) : (
        <input id={fieldId} type={type} style={field} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...(rest as any)} />
      )}
      {hint && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '6px' }}>{hint}</div>}
    </div>
  );
}
