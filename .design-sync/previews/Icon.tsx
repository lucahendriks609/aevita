import * as React from 'react';
import { Icon, ICON_NAMES } from 'aevita-design-system';

export function Gallery() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(76px,1fr))', gap: 10 }}>
      {ICON_NAMES.map((n) => (
        <div
          key={n}
          style={{
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: '10px 4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'var(--blue)',
          }}
        >
          <Icon name={n} size={20} />
          <code style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{n}</code>
        </div>
      ))}
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--blue)' }}>
      <Icon name="heart" size={16} />
      <Icon name="heart" size={24} />
      <Icon name="heart" size={32} />
      <Icon name="heart" size={48} />
    </div>
  );
}
