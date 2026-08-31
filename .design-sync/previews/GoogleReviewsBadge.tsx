import * as React from 'react';
import { GoogleReviewsBadge } from 'aevita-design-system';

export function Light() {
  return <GoogleReviewsBadge rating={4.8} count="1.200+" />;
}

export function Dark() {
  return (
    <div style={{ background: 'var(--dark)', padding: '12px 16px', borderRadius: 12, display: 'inline-block' }}>
      <GoogleReviewsBadge theme="dark" rating={4.8} count="1.200+" />
    </div>
  );
}
