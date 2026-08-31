import * as React from 'react';
import { Checkbox } from 'aevita-design-system';

export function Default() {
  return <Checkbox label="Ik ga akkoord met de voorwaarden en privacyverklaring van Aevita." defaultChecked />;
}

export function Unchecked() {
  return <Checkbox label="Ontvang updates over mijn traject per e-mail." />;
}
