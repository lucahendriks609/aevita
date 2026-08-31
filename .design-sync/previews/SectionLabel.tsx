import * as React from 'react';
import { SectionLabel } from 'aevita-design-system';

export function Default() {
  return <SectionLabel>Zo werkt het</SectionLabel>;
}

export function CustomColor() {
  return <SectionLabel color="var(--blue)">Blue surface</SectionLabel>;
}
