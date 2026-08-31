import * as React from 'react';
import { Button, Icon } from 'aevita-design-system';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" iconRight={<Icon name="arrow-right" size={16} />}>
        Doe de check
      </Button>
      <Button variant="blue">Boost Blue</Button>
      <Button variant="teal">Mindful Mint</Button>
      <Button variant="outline">Videoconsult</Button>
      <Button variant="ghost">Meer info</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
      <Button variant="primary" size="xl">
        Extra large
      </Button>
    </div>
  );
}
