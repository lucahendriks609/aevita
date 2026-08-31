import * as React from 'react';
import { Input } from 'aevita-design-system';

export function TextField() {
  return <Input label="Voornaam" placeholder="Bijv. Els" defaultValue="Els" />;
}

export function Select() {
  return <Input label="Onderwerp" as="select" options={['Algemeen', 'Medicatie', 'Facturatie']} />;
}

export function Textarea() {
  return <Input label="Bericht" as="textarea" placeholder="Waar kunnen we mee helpen?" />;
}

export function WithHint() {
  return <Input label="E-mailadres" type="email" placeholder="jij@voorbeeld.nl" hint="We gebruiken dit alleen voor je account." />;
}
