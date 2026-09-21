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
    <h2>Bereken je eigen richtlijn</h2>
    <div class="guidelines-lead">Er is niet één juist getal voor calorieën, eiwit en vezels — je behoefte hangt af van je gewicht, lengte, leeftijd, activiteitsniveau en doel. Zo bereken je een richtlijn die bij jou past.</div>

    <div class="formula-section">
      <span class="cat-label" style="background:#FFF0EC;color:#E85C3A">Calorieën</span>
      <div class="formula-box" style="background:#FFF0EC">
        <div class="f-formula">Stap 1 — basaalmetabolisme (BMR), Mifflin-St Jeor:</div>
        <div class="f-steps">
          Man: 10 × gewicht (kg) + 6,25 × lengte (cm) − 5 × leeftijd + 5<br>
          Vrouw: 10 × gewicht (kg) + 6,25 × lengte (cm) − 5 × leeftijd − 161
        </div>
        <div class="f-formula" style="margin-top:4mm">Stap 2 — vermenigvuldig met activiteitsniveau:</div>
        <div class="f-steps">
          Weinig beweging × 1,2 &nbsp;·&nbsp; Licht actief (1-3x/week) × 1,375<br>
          Matig actief (3-5x/week) × 1,55 &nbsp;·&nbsp; Zeer actief (6-7x/week) × 1,725
        </div>
        <div class="f-example">Voorbeeld: vrouw, 70 kg, 165 cm, 35 jaar, matig actief → BMR ≈ 1395, × 1,55 ≈ <b>2160 kcal/dag</b> (onderhoud). Voor gewichtsverlies: hier 300-500 kcal vanaf.</div>
      </div>
    </div>

    <div class="formula-section">
      <span class="cat-label" style="background:#E8ECFE;color:#3753F0">Eiwit</span>
      <div class="formula-box" style="background:#E8ECFE">
        <div class="f-formula">Formule: lichaamsgewicht (kg) × factor, afhankelijk van doel</div>
        <div class="f-steps">
          Algemeen onderhoud: × 0,8 g/kg &nbsp;·&nbsp; Actief/sporten: × 1,2-1,6 g/kg<br>
          Gewichtsverlies of GLP-1-behandeling (spierbehoud): × 1,6-2,0 g/kg
        </div>
        <div class="f-example">Voorbeeld: 70 kg, bij gewichtsverlies → 70 × 1,6 = <b>112 g eiwit/dag</b>.</div>
      </div>
    </div>

    <div class="formula-section">
      <span class="cat-label" style="background:#E0F7F1;color:#00A37C">Vezels</span>
      <div class="formula-box" style="background:#E0F7F1">
        <div class="f-formula">Formule (Gezondheidsraad): 14 g vezel per 1000 kcal inname</div>
        <div class="f-example">Voorbeeld: bij 2000 kcal/dag → (2000 ÷ 1000) × 14 = <b>28 g vezels/dag</b>.</div>
      </div>
    </div>

    <div class="source-note">
      <div class="note-icon">i</div>
      <div class="note-text"><b>Let op —</b> dit zijn algemeen erkende rekenmethodes (Mifflin-St Jeor, Gezondheidsraad), geen persoonlijk advies. Gebruik je medicatie, heb je een medische aandoening of ben je onder behandeling (bijvoorbeeld voor GLP-1), overleg je streefwaarden dan met je eigen diëtist of behandelaar.</div>
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
