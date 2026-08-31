import * as React from 'react';
import { FAQItem } from 'aevita-design-system';

export function Accordion() {
  return (
    <div>
      <FAQItem question="Is medisch afvallen veilig?" defaultOpen>
        Ja. Elke behandeling wordt voorgeschreven en gecontroleerd door een Nederlandse arts, met begeleiding van je vaste
        verpleegkundige.
      </FAQItem>
      <FAQItem question="Kom ik in aanmerking?">Doe de gratis geschiktheidscheck. We kijken naar je BMI en gezondheidssituatie.</FAQItem>
      <FAQItem question="Kan ik altijd opzeggen?">Ja, je bent maandelijks en gratis opzegbaar.</FAQItem>
    </div>
  );
}
