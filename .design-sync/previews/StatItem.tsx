import * as React from 'react';
import { StatItem } from 'aevita-design-system';

export function Grid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
      <StatItem number="22,5%" label="gewichtsverlies in studies" />
      <StatItem number="−4,2 kg" label="gemiddeld na 12 weken" color="var(--teal)" />
      <StatItem number="4,8★" label="1.200+ reviews" color="var(--teal)" />
      <StatItem number="100%" label="online, altijd menselijk" />
    </div>
  );
}

export function Unboxed() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <StatItem number="−9 kg" label="gemiddeld in 4 maanden" boxed={false} color="var(--teal)" />
      <StatItem number="1.200+" label="tevreden deelnemers" boxed={false} />
    </div>
  );
}
