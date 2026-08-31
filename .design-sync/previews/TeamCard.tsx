import * as React from 'react';
import { TeamCard } from 'aevita-design-system';
import savita from '../../brand-assets/product/team-savita.png';

export function Default() {
  return (
    <div style={{ maxWidth: 280 }}>
      <TeamCard photo={savita} name="Savita van Twillert" role="Verpleegkundig specialist" bio="Jouw vaste begeleider tijdens het traject." />
    </div>
  );
}

export function WithCta() {
  return (
    <div style={{ maxWidth: 280 }}>
      <TeamCard
        photo={savita}
        name="Savita van Twillert"
        role="Verpleegkundig specialist"
        bio="Jouw vaste begeleider tijdens het traject."
        cta="Stel een vraag"
      />
    </div>
  );
}
