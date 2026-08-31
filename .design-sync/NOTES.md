# design-sync notes

## Provenance

This repo's component source (`src/components/**`) was **reconstructed**,
not authored fresh. The user supplied `Aevita Design System.html` — a
self-contained exported Claude Artifact (a style-guide page) that embedded
an already-compiled `_ds_bundle.js` (format 4, `@ds-bundle` header, real
`window.AevitaDesignSystem_3cb72a` namespace) produced by a prior
design-sync run against the real Aevita component library, plus the real
`styles.css` token file, the real Comfortaa webfonts, and real brand
imagery — all embedded as base64 resources inside the HTML's bundler
manifest.

That compiled bundle was decompiled by hand (the JSX had been transpiled to
readable `React.createElement(...)` calls with original JSDoc comments and
default values intact) back into clean TypeScript/TSX source under
`src/components/`, matching the compiled implementation line-for-line. The
real `styles.css` token block and the six real Comfortaa `.woff2` files were
extracted the same way. This is why the repo has no separate "before"
history — the reconstruction *is* the source of truth going forward.

Brand imagery (logo, patterns, photography, product photos, team photo) was
also extracted and committed to `brand-assets/` for reference; it is not
part of the synced component bundle (design-sync only ships code/tokens/
fonts, not marketing imagery).

## Re-sync risks

- **No upstream repo to diff against.** Future changes to Aevita's real
  component library (if the team builds one) won't automatically flow here
  — this reconstruction and any real upstream repo are two independent
  sources now. If a real source repo appears, re-point `.design-sync/config.json`
  at it (new `pkg`/paths) rather than hand-editing both forever.
- **Prop types are inferred, not authoritative.** `.d.ts` interfaces were
  written by reading the compiled JS (destructured params + defaults +
  demo usage), not extracted from original TypeScript. They're a close,
  validated match to observed usage but were never checked against a real
  spec.
- **Two UI-kit page compositions were NOT reconstructed**: the original
  bundle's `sourceHashes` also listed `ui_kits/app/AevitaLifeApp.jsx`,
  `ui_kits/app/AevitaLifeApp.standalone.jsx`, and
  `ui_kits/website/AevitaWebsite.jsx` (full click-through app/website
  demos), but they were never exposed as top-level exports on the DS
  namespace and aren't part of the 15-component library — only described
  as static text in the "UI kits" section of the original HTML. Out of
  scope for this sync.
- **Font weights may be approximate**: the original `styles.css` reuses the
  same 6 woff2 files (one per Unicode subset) for all five declared weights
  (300/400/500/600/700) — i.e. the shipped Comfortaa files may not actually
  vary by weight. Carried forward as-is from the source; flagged here in
  case it's a placeholder rather than intentional.
- **`_ds_bundle.css` is a near-empty placeholder.** This DS styles
  components entirely via inline `style` objects computed from JS + CSS
  custom properties — there is no separate component stylesheet
  (`[CSS_RUNTIME]`-adjacent, confirmed by inspecting the original render:
  computed styles came from inline attributes, no `.aev-*` CSS rule exists
  anywhere in the source). This is expected, not a bug.

## Known render warns

None — validate exits clean (0 bad, 0 thin, 0 variantsIdentical) after
authoring previews for all 15 components and fixing 2 `[GRID_OVERFLOW]`s
(`StatItem`, `Card`) with `cfg.overrides.<Name>.cardMode: "column"`.

## Upload status

**Not yet uploaded to claude.ai/design.** `DesignSync` requires interactive
design-system authorization (`/design-login`) that isn't available in this
headless/remote session — the tool call failed with:
"DesignSync needs design-system authorization, and /design-login cannot run
in this non-interactive session."

`ds-bundle/` is fully built and validated and ready to upload as-is. To
finish the sync:

1. Run `/design-login` once from an interactive Claude Code session on this
   machine (headless/SDK sessions then reuse that authorization) — or, from
   claude.ai/code, use Claude Design's "Send to Claude Code Web".
2. Re-run `/design-sync` (or just the upload sequence: pick/create a
   project via `DesignSync`, then follow base SKILL.md §3's incremental
   upload).
3. Since `ds-bundle/` and `_ds_sync.json` are already built and validated,
   no rebuild is needed unless source changed since this commit — just the
   upload plan + `finalize_plan`/`write_files` sequence.
