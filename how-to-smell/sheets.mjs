import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(".");
const out = path.join(root, "out", "system");
fs.mkdirSync(out, { recursive: true });
const slug = process.argv[2] ?? "wolverine-black-afgano";
const dir = path.join(root, "out", slug);

const sheetCss = `
@import url("tokens.css");
*{margin:0;padding:0;box-sizing:border-box}
body{width:2400px;background:var(--obsidian);color:var(--bone);font-family:var(--sans);padding:120px}
h1{font:600 120px/1 var(--serif);letter-spacing:.01em}
.k{font:500 22px/1.5 var(--sans);letter-spacing:.38em;text-transform:uppercase;color:var(--smoke)}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1.5px solid rgba(233,226,214,.25);padding-bottom:48px;margin-bottom:80px}
.grid{display:grid;gap:28px}
.sw{height:300px;display:flex;flex-direction:column;justify-content:flex-end;padding:28px;border:1.5px solid rgba(233,226,214,.18)}
.sw b{font:600 40px/1.1 var(--serif)} .sw span{font:500 20px/1.5 var(--sans);letter-spacing:.2em;margin-top:6px}
.note{font:500 26px/1.6 var(--sans);color:var(--smoke);max-width:1100px}
.row{display:grid;grid-template-columns:420px 1fr;gap:60px;padding:44px 0;border-top:1.5px solid rgba(233,226,214,.15);align-items:baseline}
`;
const sw = (name, hex, dark = true, tag = "") =>
  `<div class="sw" style="background:${hex};color:${dark ? "#E9E2D6" : "#080808"}"><b>${name}</b><span>${hex}${tag ? " · " + tag : ""}</span></div>`;

const palette = `
<div class="top"><div><div class="k">How to smell like you’re the problem / System 01</div><h1 style="margin-top:28px">Colour</h1></div><div class="k">One accent per carousel</div></div>
<div class="k" style="margin-bottom:24px">Foundation</div>
<div class="grid" style="grid-template-columns:repeat(6,1fr);margin-bottom:80px">
${sw("Obsidian Black", "#080808")}${sw("Ink Black", "#11100F")}${sw("Charcoal", "#1A1918")}${sw("Deep Graphite", "#252321")}${sw("Bone Paper", "#E9E2D6", false)}${sw("Smoked Grey", "#A39D94", false)}
</div>
<div class="k" style="margin-bottom:24px">Accent (pick one, small highlights only)</div>
<div class="grid" style="grid-template-columns:repeat(6,1fr);margin-bottom:80px">
${sw("Blood Red", "#81191C")}${sw("Oxblood", "#451012")}${sw("Antique Gold", "#A48145")}${sw("Deep Emerald", "#153B32")}${sw("Bruised Violet", "#33233D")}${sw("Cold Steel", "#7A8284")}
</div>
<div class="k" style="margin-bottom:24px">Character → accent</div>
<div class="note">Batman / Wolverine / Venom / Kingpin: cold steel, deep emerald or oxblood.<br>Joker / Loki: bruised violet or antique gold.<br>Harley Quinn / Scarlet Witch: blood red or faded pink-red.<br>Darkseid: oxblood or burnt gold.<br>Doctor Strange: ember red or antique gold.</div>
<div class="note" style="margin-top:56px;font-size:22px">Deep accents (emerald, violet, oxblood) sit near-black. On slides they are used through a lifted tone for hairlines and small type: steel #A9B2B4 · emerald #3F7A68 · oxblood #9A3A3D · blood #C4474B · violet #8A6C9C · gold #C9A769.</div>`;

const type = `
<div class="top"><div><div class="k">How to smell like you’re the problem / System 02</div><h1 style="margin-top:28px">Typography</h1></div><div class="k">Two families · three weights</div></div>
<div class="row"><div class="k">A · Series label<br>Inter 500 · 18–28 px · +0.3em</div><div class="k" style="font-size:28px;color:var(--bone)">How to smell like you’re the problem &nbsp;/&nbsp; Issue 01 / Character study</div></div>
<div class="row"><div class="k">B · Character name<br>Cormorant 600 · 100–160 px · caps</div><div style="font:600 160px/1 var(--serif);letter-spacing:.02em">WOLVERINE</div></div>
<div class="row"><div class="k">C · Instruction<br>Cormorant 500 or Inter 500 · 45–72 px · 2–4 lines</div><div><div style="font:500 70px/1.08 var(--serif)">Sleep four hours.<br>Call it discipline,<br>not emotional avoidance.</div><div style="font:500 54px/1.22 var(--sans);margin-top:40px;letter-spacing:-.015em">Make a bad decision.<br>Make it look like a look.</div></div></div>
<div class="row"><div class="k">D · Fragrance<br>Inter 500 brand · Cormorant 600 name · 48–70 px</div><div><div class="k" style="font-size:28px;color:var(--bone)">Nasomatto</div><div style="font:600 70px/1.1 var(--serif);margin-top:12px">Black Afgano</div></div></div>
<div class="row"><div class="k">E · Footer<br>Inter 500 · 18 px · +0.34em</div><div class="k">Scent study / 06 &nbsp;·&nbsp; Fictional damage, real fragrance</div></div>
<div class="row"><div class="k">Italic<br>Cormorant 500 italic · quiet lines, descriptions</div><div style="font:italic 500 56px/1.2 var(--serif);color:var(--smoke)">Smell like heartbreak with administrative privileges.</div></div>
<div class="note" style="margin-top:20px;font-size:22px">Fonts: Cormorant Garamond (headlines) and Inter (utility). Left-aligned by default. Centred only on the title slide.</div>`;

const grid = `
<div class="top"><div><div class="k">How to smell like you’re the problem / System 03</div><h1 style="margin-top:28px">Layout &amp; safe zones</h1></div><div class="k">1080 × 1920 · 9:16</div></div>
<div style="display:flex;gap:120px;align-items:flex-start">
  <div style="position:relative;width:810px;height:1440px;background:var(--ink);border:1.5px solid rgba(233,226,214,.3);flex:none">
    <div style="position:absolute;left:0;right:0;bottom:0;height:165px;background:rgba(129,25,28,.28);border-top:1.5px dashed #C4474B"></div>
    <div style="position:absolute;top:0;bottom:0;right:0;width:90px;background:rgba(129,25,28,.28);border-left:1.5px dashed #C4474B"></div>
    <div style="position:absolute;inset:27px;border:1.5px solid rgba(233,226,214,.4)"></div>
    <div style="position:absolute;left:72px;top:72px;right:99px;bottom:174px;border:1.5px dashed rgba(122,130,132,.9)"></div>
    <div class="k" style="position:absolute;left:72px;top:72px;font-size:13px;letter-spacing:.3em">Series label</div>
    <div class="k" style="position:absolute;right:72px;top:72px;font-size:13px;letter-spacing:.3em">01 / 07</div>
    <div class="k" style="position:absolute;left:72px;top:700px;font-size:18px;color:var(--bone)">Editorial text block<br>(vital copy lives here)</div>
    <div class="k" style="position:absolute;left:72px;bottom:60px;font-size:13px">Footer · non-vital only</div>
    <div class="k" style="position:absolute;right:8px;top:700px;writing-mode:vertical-rl;font-size:13px;color:#C4474B">Right 120 px · TikTok rail</div>
    <div class="k" style="position:absolute;left:0;right:0;bottom:70px;text-align:center;font-size:13px;color:#C4474B;display:none">Bottom 220 px</div>
  </div>
  <div style="max-width:1000px">
    <div class="k" style="margin-bottom:24px">Rules</div>
    <div class="note">Canvas 1080 × 1920 px.<br>Margins: left 96 · right 132 · top 96 · bottom 232.<br>Vital copy never in the bottom 220 px or right 120 px (red).<br>Frame: 1.5 px, inset 36 px. Title, reveal and closing slides.<br>Series label top-left. Index top-right as 01 / 07.<br>Alternate density slide to slide. No two compositions repeat.</div>
    <div class="k" style="margin:64px 0 24px">Components</div>
    <div class="note">1 Frame · 2 Series label · 3 Slide index · 4 Editorial text block · 5 Fragrance identification plate (slide 6 only) · 6 Closing stamp (slide 7 only)</div>
    <div class="k" style="margin:64px 0 24px">Slide sequence</div>
    <div class="note">01 Title · 02 Restrained · 03 Close-up detail · 04 Image/text collision · 05 Darkest frame · 06 Fragrance reveal · 07 Last frame</div>
  </div>
</div>`;

const imgs = Array.from({ length: 7 }, (_, i) => `<img src="file://${dir}/0${i + 1}.png" style="width:100%;display:block;border:1.5px solid rgba(233,226,214,.2)">`).join("");
const overview = `
<div class="top"><div><div class="k">How to smell like you’re the problem / Sample carousel</div><h1 style="margin-top:28px">Wolverine × Nasomatto</h1></div><div class="k">7 slides · sample copy · images pending</div></div>
<div class="grid" style="grid-template-columns:repeat(7,1fr);gap:20px">${imgs}</div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [name, body, h] of [["00-colour", palette, 1700], ["01-typography", type, 1900], ["02-layout-safe-zones", grid, 1800], ["03-sample-overview", overview, 1000]]) {
  const html = path.join(root, `.tmp-${name}.html`);
  fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8"><style>${sheetCss}</style></head><body>${body}</body></html>`);
  const p = await browser.newPage({ viewport: { width: 2400, height: h } });
  await p.goto("file://" + html);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(out, `${name}.png`), fullPage: true });
  await p.close();
  fs.unlinkSync(html);
}
await browser.close();
console.log("done ->", out);
