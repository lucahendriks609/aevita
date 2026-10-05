import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { slide, page } from "./templates.mjs";

const specPath = process.argv[2] ?? "carousels/wolverine-black-afgano.json";
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const slug = path.basename(specPath, ".json");
const outDir = path.resolve("out", slug);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
for (let n = 1; n <= spec.total; n++) {
  const html = path.resolve(`.tmp-${slug}-${n}.html`);
  fs.writeFileSync(html, page(slide(spec, n)));
  const p = await ctx.newPage();
  await p.goto("file://" + html);
  await p.waitForSelector("body[data-ready]");
  await p.screenshot({ path: path.join(outDir, `${String(n).padStart(2, "0")}.png`) });
  await p.close();
  fs.unlinkSync(html);
}
await browser.close();
console.log("done ->", outDir);
