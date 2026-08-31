import * as React from 'react';
import { CheckList } from 'aevita-design-system';

export function Teal() {
  return <CheckList items={['Medicatie uit eigen apotheek', 'Vaste verpleegkundige', 'Gratis thuisbezorgd']} />;
}

export function Blue() {
  return <CheckList tone="blue" items={['Nederlandse artsen', 'Maandelijks opzegbaar', 'Eigen veilige app']} />;
}
