import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const dataFile = process.argv[2] || path.join(root, 'data', 'recipes.json');
const outName = process.argv[3] || 'aevita-kookboek';

const data = JSON.parse(await readFile(dataFile, 'utf8'));
const styles = await readFile(path.join(__dirname, 'styles.css'), 'utf8');

const sectionById = Object.fromEntries(data.sections.map(s => [s.id, s]));

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
  const sections = data.sections.map(sec => {
    const items = data.recipes.filter(r => r.section === sec.id);
    if (!items.length) return '';
    const rows = items.map(r => `
      <div class="toc-row">
        <span>${esc(r.title)}</span>
        <span class="toc-num" style="background:${sec.bg};color:${sec.color}">${String(pageNumById[r.id]).padStart(2, '0')}</span>
      </div>`).join('');
    return `
      <div class="toc-section">
        <span class="cat-label" style="background:${sec.bg};color:${sec.color}">${esc(sec.label)}</span>
        ${rows}
      </div>`;
  }).join('');

  return `
  <section class="page toc">
    <h2>Inhoud</h2>
    <div class="toc-lead">Alle recepten in dit boek zijn samengesteld door Aevita.</div>
    <div class="toc-columns">${sections}</div>
  </section>`;
}

function guidelinesPage() {
  return `
  <section class="page guidelines">
    <h2>Dagelijkse richtlijnen</h2>
    <div class="guidelines-lead">Drie waarden om op te letten als je met deze recepten aan de slag gaat: calorieën, eiwit en vezels. Hieronder de algemene richtlijn voor een gezonde volwassene.</div>

    <div class="guideline-cards">
      <div class="guideline-card" style="background:${'#FFF0EC'}">
        <div class="g-val" style="color:#E85C3A">±2000-2500</div>
        <div class="g-label">Kcal per dag</div>
        <div class="g-sub">Vrouw ±2000 · man ±2500<br>(EU-referentie-inname)</div>
      </div>
      <div class="guideline-card" style="background:${'#E8ECFE'}">
        <div class="g-val" style="color:#3753F0">0,8 g/kg</div>
        <div class="g-label">Eiwit per dag</div>
        <div class="g-sub">Per kg lichaamsgewicht<br>(Gezondheidsraad)</div>
      </div>
      <div class="guideline-card" style="background:${'#E0F7F1'}">
        <div class="g-val" style="color:#00A37C">30-40 g</div>
        <div class="g-label">Vezels per dag</div>
        <div class="g-sub">Voor volwassenen<br>(Gezondheidsraad)</div>
      </div>
    </div>

    <div class="source-note">
      <div class="note-icon">i</div>
      <div class="note-text"><b>Let op —</b> dit zijn algemene richtlijnen voor een gezonde volwassene (Voedingscentrum / Gezondheidsraad / EU-referentie-inname), geen persoonlijk advies. Bij gewichtsverlies, GLP-1-behandeling of vermoeidheid ligt de aanbevolen eiwitinname vaak hoger dan de 0,8 g/kg — vraag je eigen streefwaarde na bij je diëtist.</div>
    </div>
  </section>`;
}

function nutritionRow(r) {
  const cells = [];
  if (r.eiwit) cells.push(`<div class="nutrition-cell"><div class="val">${esc(r.eiwit)}</div><div class="lbl">Eiwit</div></div>`);
  if (r.kcal) cells.push(`<div class="nutrition-cell"><div class="val">${esc(r.kcal)}</div><div class="lbl">Kcal</div></div>`);
  if (!cells.length) return '';
  return `<div class="nutrition-row">${cells.join('')}</div>`;
}

function recipePage(r, pageNum) {
  const sec = sectionById[r.section];
  const ingredients = r.ingredients.map(i => `<li>${esc(i)}</li>`).join('');
  const steps = r.steps.map(s => `<li>${esc(s)}</li>`).join('');

  return `
  <section class="page recipe">
    <div class="recipe-header">
      <span class="cat-pill" style="background:${sec.bg};color:${sec.color}">${esc(sec.label)}</span>
      <h2>${esc(r.title)}</h2>
    </div>

    ${nutritionRow(r)}

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

    <div class="source-note">
      <div class="note-icon">i</div>
      <div class="note-text"><b>${esc(sec.label)} —</b> onderdeel van "${esc(sec.source_title)}", samengesteld door Aevita.</div>
    </div>

    <div class="page-footer">
      <span>AEVITA KOOKBOEK</span>
      <span>${String(pageNum).padStart(2, '0')}</span>
    </div>
  </section>`;
}

const pageNumById = Object.fromEntries(data.recipes.map((r, i) => [r.id, i + 4]));

const pages = [
  coverPage(),
  guidelinesPage(),
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
