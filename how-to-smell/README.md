# HOW TO SMELL LIKE YOU'RE THE PROBLEM

Visual system for the @thatfragrancesguy TikTok carousel series: fictional antiheroes paired with real fragrances. Dark, cinematic, fashion-editorial, deadpan.

## Build

```
npm install
CHROMIUM_PATH=/path/to/chrome node build.mjs carousels/<spec>.json   # 7 slides, 1080x1920 PNG -> out/<spec>/
CHROMIUM_PATH=/path/to/chrome node sheets.mjs <spec>                 # system sheets -> out/system/
```

A carousel is one JSON file (see `carousels/wolverine-black-afgano.json`): character, fragrance, accent, copy per slide, image path per slide. A missing image renders as IMAGE PENDING with its art-direction brief. Supplied copy is never rewritten.

## System

- Canvas 1080 x 1920. Margins: left 96, right 132, top 96, bottom 232. No vital copy in the bottom 220 px or right 120 px.
- Colour: Obsidian #080808, Ink #11100F, Charcoal #1A1918, Graphite #252321, Bone #E9E2D6, Smoke #A39D94. Accents: Blood #81191C, Oxblood #451012, Gold #A48145, Emerald #153B32, Violet #33233D, Steel #7A8284. One accent per carousel (`accent` in the spec).
- Type: Cormorant Garamond 500/600 (+500 italic) and Inter 500. Two families, three weights.
- Components: Frame, Series label, Slide index, Editorial text block, Fragrance identification plate (slide 6), Closing stamp (slide 7).
- Slides: 1 title, 2 restrained, 3 close-up, 4 image/text collision, 5 darkest, 6 fragrance reveal, 7 last frame.

Tokens: `tokens.css`. Components: `slides.css`. Slide layouts: `templates.mjs`.

## Sample

`carousels/wolverine-black-afgano.json` is a sample. Slides 4 and 5 copy are placeholder lines, not supplied copy.
