import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const dataFile = process.argv[2] || path.join(root, 'data', 'recipes.sample.json');
const outName = process.argv[3] || 'aevita-kookboek-preview';

const data = JSON.parse(await readFile(dataFile, 'utf8'));
const styles = await readFile(path.join(__dirname, 'styles.css'), 'utf8');

const catById = Object.fromEntries(data.categories.map(c => [c.id, c]));

const icons = {
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  servings: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v6a2 2 0 0 0 2 2v12"/><path d="M8 2v6a2 2 0 0 1-2 2v0"/><path d="M17 2c-1.5 2-2 4-2 7 0 2 1 3 2 3v10"/></svg>',
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function coverPage() {
  return `
  <section class="page cover">
    <div class="wordmark">AEVITA</div>
    <div class="cover-main">
      <div class="eyebrow">Kookboek</div>
      <h1>${esc(data.book.title)}</h1>
      <div class="subtitle">${esc(data.book.subtitle)}</div>
    </div>
    <div class="tagline">${esc(data.book.tagline)}</div>
  </section>`;
}

function tocPage(pageNumById) {
  const sections = data.categories.map(cat => {
    const items = data.recipes.filter(r => r.category === cat.id);
    if (!items.length) return '';
    const rows = items.map(r => `
      <div class="toc-row">
        <span>${esc(r.title)}</span>
        <span class="dots">${String(pageNumById[r.id]).padStart(2, '0')}</span>
      </div>`).join('');
    return `
      <div class="toc-section">
        <span class="cat-label" style="background:${cat.bg};color:${cat.color}">${esc(cat.label)}</span>
        ${rows}
      </div>`;
  }).join('');

  return `
  <section class="page toc">
    <h2>Inhoud</h2>
    <div class="toc-lead">Alle recepten in dit boek zijn samengesteld en goedgekeurd door de officiële diëtist van Aevita.</div>
    ${sections}
  </section>`;
}

function recipePage(r, pageNum) {
  const cat = catById[r.category];
  const ingredients = r.ingredients.map(i => `<li>${esc(i)}</li>`).join('');
  const steps = r.steps.map(s => `<li>${esc(s)}</li>`).join('');
  const n = r.nutrition;

  return `
  <section class="page recipe">
    <div class="recipe-header">
      <span class="cat-pill" style="background:${cat.bg};color:${cat.color}">${esc(cat.label)}</span>
      <h2>${esc(r.title)}</h2>
      <div class="recipe-subtitle">${esc(r.subtitle)}</div>
    </div>

    <div class="meta-row">
      <span class="meta-chip">${icons.clock}${esc(r.prep_time)}</span>
      <span class="meta-chip">${icons.servings}${esc(r.servings)}</span>
    </div>

    <div class="nutrition-grid">
      <div class="nutrition-cell"><div class="val">${n.kcal}</div><div class="lbl">kcal</div></div>
      <div class="nutrition-cell"><div class="val">${n.eiwit_g}g</div><div class="lbl">Eiwit</div></div>
      <div class="nutrition-cell"><div class="val">${n.koolhydraten_g}g</div><div class="lbl">Koolhydraten</div></div>
      <div class="nutrition-cell"><div class="val">${n.vet_g}g</div><div class="lbl">Vet</div></div>
    </div>

    <div class="body-grid">
      <div class="ingredients">
        <h3>Ingrediënten</h3>
        <ul>${ingredients}</ul>
      </div>
      <div class="steps">
        <h3>Bereiding</h3>
        <ol>${steps}</ol>
      </div>
    </div>

    <div class="dietist-tip">
      <div class="tip-icon">i</div>
      <div class="tip-text"><b>Tip van de diëtist —</b> ${esc(r.dietist_tip)}</div>
    </div>

    <div class="page-footer">
      <span>AEVITA KOOKBOEK</span>
      <span>${String(pageNum).padStart(2, '0')}</span>
    </div>
  </section>`;
}

const pageNumById = Object.fromEntries(data.recipes.map((r, i) => [r.id, i + 3]));

const pages = [
  coverPage(),
  tocPage(pageNumById),
  ...data.recipes.map(r => recipePage(r, pageNumById[r.id])),
];

const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<style>${styles}</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>`;

const outDir = path.join(root, 'output');
const htmlPath = path.join(outDir, `${outName}.html`);
const pdfPath = path.join(outDir, `${outName}.pdf`);

await writeFile(htmlPath, html, 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();

console.log(`PDF written to ${pdfPath}`);
