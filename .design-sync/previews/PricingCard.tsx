import * as React from 'react';
import { PricingCard } from 'aevita-design-system';
import penWegovy from '../../brand-assets/product/pen-wegovy.png';
import penOzempic from '../../brand-assets/product/pen-ozempic.png';
import penMounjaro from '../../brand-assets/product/pen-mounjaro.png';

export function Group() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignItems: 'stretch' }}>
      <PricingCard name="Wegovy" subtitle="Semaglutide · wekelijkse pen" price="€229" period="per maand" image={penWegovy} cta="Bekijk plan" />
      <PricingCard
        name="Ozempic"
        subtitle="Semaglutide · wekelijkse pen"
        price="€199"
        period="per maand"
        image={penOzempic}
        featured
        cta="Bekijk plan"
      />
      <PricingCard name="Mounjaro" subtitle="Tirzepatide · wekelijkse pen" price="€249" period="per maand" image={penMounjaro} cta="Bekijk plan" />
    </div>
  );
}
