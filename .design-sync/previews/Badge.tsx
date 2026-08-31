import * as React from 'react';
import { Badge, Icon } from 'aevita-design-system';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="teal">Bewezen effectief</Badge>
      <Badge variant="blue" icon={<Icon name="check" size={12} />}>
        GLP-1
      </Badge>
      <Badge variant="lilac">Voor haar</Badge>
      <Badge variant="sky">Balance</Badge>
      <Badge variant="coral">Nieuw</Badge>
      <Badge variant="dark">Archief</Badge>
    </div>
  );
}
