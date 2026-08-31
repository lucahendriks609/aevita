import * as React from 'react';
import { TrustBar, Icon } from 'aevita-design-system';

export function Default() {
  return (
    <TrustBar
      items={[
        { icon: <Icon name="shield" size={15} />, label: 'Nederlandse artsen' },
        { icon: <Icon name="pill" size={15} />, label: 'Eigen apotheek' },
        { icon: <Icon name="user" size={15} />, label: 'Vaste verpleegkundige' },
        { icon: <Icon name="truck" size={15} />, label: 'Gratis thuisbezorgd' },
      ]}
    />
  );
}
