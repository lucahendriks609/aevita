import * as React from 'react';
import { Card, SectionLabel } from 'aevita-design-system';

export function Surfaces() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
      <Card>
        <SectionLabel>Coaching</SectionLabel>
        <h3 style={{ margin: '6px 0' }}>Vaste verpleegkundige</h3>
        <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>Persoonlijke begeleiding, elke stap.</p>
      </Card>
      <Card variant="teal" hover={false}>
        <SectionLabel>Mint surface</SectionLabel>
        <h3 style={{ margin: '6px 0' }}>Rustige kaart</h3>
        <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>Tinted, zonder hover-lift.</p>
      </Card>
      <Card variant="blue" hover={false}>
        <SectionLabel color="var(--blue)">Blue surface</SectionLabel>
        <h3 style={{ margin: '6px 0' }}>Informatie</h3>
        <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>Voor uitleg en context.</p>
      </Card>
    </div>
  );
}
