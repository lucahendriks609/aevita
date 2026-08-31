# Aevita design system — build conventions

Aevita is a Dutch medical-weightloss service ("méér jezelf dan ooit" — warm,
personal, never clinical). Two brand colours carry everything: **Mindful
Mint** `#00BC8E` for actions, **Boost Blue** `#3753F0` for brand/headings.
Read this before composing anything with these components.

## Setup — no provider needed

There is no theme/context provider to wrap. Every component is self-contained
and reads styling only from CSS custom properties already defined in
`styles.css`. Just link the two files once:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

```jsx
const { Button, Card } = window.AevitaDesignSystem;
ReactDOM.createRoot(document.getElementById('root')).render(<Card><Button>Doe de check</Button></Card>);
```

## Styling idiom — CSS custom properties, not utility classes

Components carry an `aev-*` className for hooking/testing only — it carries
**no styling**. All visual styling comes from inline style objects driven by
component props (`variant`, `size`, `tone`, `color`, `featured`, `hover`) and
from `var(--token-name)` CSS custom properties. **Never invent a utility
class** (`className="aev-btn-lg"` etc.) — it does nothing. Compose your own
layout glue (wrappers, grids, section padding) the same way the components
do: inline styles reading these real tokens.

Real token families (full list in `styles.css`):

- **Colour**: `--blue` `#3753F0`, `--teal` `#00BC8E`, `--dark` `#002327`
  (text only), `--muted` `#4A6B70`, `--cream` `#FAFFFE` (page bg), `--coral`
  `#FF6B47` (sparing accent), `--blue-light` / `--teal-light` (tint
  surfaces), `--gradient` (135° mint→blue signature wash).
- **Radius**: `--radius-sm` 12px, `--radius` 20px (default card),
  `--radius-lg` 32px, `--radius-pill` 100px (all buttons/badges).
- **Shadow**: `--shadow-xs` … `--shadow-lg` — all blue-tinted
  (`rgba(55,83,240,α)`), never grey. `--shadow-teal` / `--shadow-blue` for
  coloured action-button glows.
- **Spacing**: 4px-based scale, `--space-1` (4px) … `--space-30` (120px).
- **Type**: one family, `--font-brand` (Comfortaa, 300–700). Headings are
  Bold with `--ls-display` (-0.02em) tracking, in `--blue`; body is Regular
  at `--lh-body` (1.8) line-height.

## Where things are

- `styles.css` — every token + `@font-face`. Read it before styling
  anything custom.
- `components/<group>/<Name>/<Name>.prompt.md` — real usage JSX per
  component, ported from the DS team's own composition (not invented).
- `guidelines/colour.md`, `guidelines/tone-of-voice.md` — brand rules
  (colour pairing, Dutch copy voice: informal je/jij, sentence case, never
  shaming).

## A real composition

```jsx
const { Card, SectionLabel, StatItem, Button } = window.AevitaDesignSystem;

<Card>
  <SectionLabel>Coaching</SectionLabel>
  <h3 style={{ margin: '6px 0' }}>Vaste verpleegkundige</h3>
  <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
    Persoonlijke begeleiding, elke stap.
  </p>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginTop: 16 }}>
    <StatItem number="22,5%" label="gewichtsverlies in studies" />
    <StatItem number="4,8★" label="1.200+ reviews" color="var(--teal)" />
  </div>
  <Button variant="primary" style={{ marginTop: 16 }}>Doe de check</Button>
</Card>
```

Buttons and badges are **always fully-rounded pills** — never override
`border-radius`. Cards lift 5px on hover by default (`hover={false}` to
disable, e.g. inside another hoverable surface).
