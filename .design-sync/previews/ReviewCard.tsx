import * as React from 'react';
import { ReviewCard } from 'aevita-design-system';

export function Reviews() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <ReviewCard
        stars={5}
        medication="Ozempic"
        text="Voor het eerst voelt afvallen niet als vechten. De begeleiding maakt echt het verschil."
        author="Els D."
        meta="deelnemer sinds maart"
      />
      <ReviewCard
        stars={5}
        medication="Wegovy"
        text="Mijn vaste verpleegkundige denkt met me mee. Ik heb me nog nooit zo gesteund gevoeld."
        author="Marco V."
        meta="−9 kg in 4 maanden"
      />
    </div>
  );
}
