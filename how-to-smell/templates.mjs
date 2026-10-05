import fs from "node:fs";
import path from "node:path";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const pad = (n) => String(n).padStart(2, "0");

function image(spec, n, extra = "") {
  const src = spec.images?.[n];
  if (src) {
    const abs = path.resolve(src);
    return `<div class="img" style="background-image:url('file://${abs}');${extra}"></div>`;
  }
  const brief = spec.imageBriefs?.[n] ?? "";
  return `<div class="img ph" style="${extra}"></div>
    <div class="ph-note"><b>Image pending</b><i>${esc(brief)}</i></div>`;
}

const grade = (dim = 0.25, vig = true) =>
  `<div class="grade dim" style="--dim:${dim}"></div>${vig ? '<div class="grade vig"></div>' : ""}<div class="grade grain"></div>`;

const label = (spec, short = false) =>
  `<div class="series ${short ? "short" : ""}">${esc(short ? "HTSLYTP" : spec.seriesLabel)}</div>`;
const idx = (n, total) => `<div class="index">${pad(n)} / ${pad(total)}</div>`;
const lines = (arr) => arr.map(esc).join("<br>");

/* Fit a single-line element to a max width by shrinking its font-size. Runs in-page. */
export const fitScript = `
document.fonts.ready.then(() => {
  document.querySelectorAll("[data-fit]").forEach((el) => {
    const max = parseFloat(el.dataset.fit);
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > max && size > 90) { size -= 2; el.style.fontSize = size + "px"; }
  });
  document.body.dataset.ready = "1";
});`;

export function slide(spec, n) {
  const total = spec.total;
  const s = spec.slides[n] ?? {};
  const wrap = (inner, extra = "") =>
    `<div class="slide" data-accent="${spec.accent}" ${extra}>${inner}</div>`;

  switch (n) {
    /* 1 — Character title: high impact, name dominates */
    case 1: {
      const name = spec.character.lines
        .map((l) => `<div class="name" data-fit="852">${esc(l)}</div>`).join("");
      return wrap(`
        ${image(spec, 1)}${grade(0.2)}
        <div class="grade" style="background:linear-gradient(180deg,rgba(8,8,8,0) 38%,rgba(8,8,8,.88) 66%,rgba(8,8,8,.97) 100%)"></div>
        <div class="frame"></div>
        ${label(spec)}${idx(n, total)}
        <div class="block" style="left:var(--m-left);right:var(--m-right);top:1120px;text-align:center">
          <div class="kicker">How to smell like</div>
          <div class="rule" style="margin:34px auto 38px"></div>
          ${name}
        </div>
        <div class="foot" style="left:var(--m-left);right:var(--m-right);text-align:center">Issue ${spec.issue} / Character study</div>`);
    }
    /* 2 — restrained, lots of negative space, text bottom-left */
    case 2:
      return wrap(`
        ${image(spec, 2, "top:0;bottom:700px;")}${grade(0.35)}
        <div class="grade" style="background:linear-gradient(180deg,rgba(17,16,15,0) 40%,var(--ink) 66%)"></div>
        ${label(spec)}${idx(n, total)}
        <div class="block" style="left:var(--m-left);right:var(--m-right);top:1180px">
          <div class="rule" style="margin-bottom:44px"></div>
          <div class="copy-serif">${lines(s.lines)}</div>
        </div>`);
    /* 3 — strange close-up, ink panel collides with the crop */
    case 3:
      return wrap(`
        ${image(spec, 3, "transform:scale(1.55);transform-origin:70% 60%;")}${grade(0.3)}
        ${label(spec, true)}${idx(n, total)}
        <div class="block ink" style="left:0;top:300px;width:700px">
          <div class="copy-sans" style="padding-left:36px">${lines(s.lines)}</div>
        </div>
        <div class="foot">Behaviour / 03</div>`);
    /* 4 — bolder image/text collision: full-bleed bar + vertical edge label */
    case 4:
      return wrap(`
        ${image(spec, 4)}${grade(0.15)}
        <div class="series short" style="left:56px;top:1170px;transform-origin:0 0;transform:rotate(-90deg) translateX(-50%);white-space:nowrap">HTSLYTP</div>
        ${idx(n, total)}
        <div class="block" style="left:0;right:0;top:1000px;height:340px;background:rgba(8,8,8,.86);border-top:1.5px solid var(--accent-lift);border-bottom:1.5px solid var(--accent-lift)"></div>
        <div class="block" style="left:150px;right:var(--m-right);top:1090px">
          <div class="copy-serif" style="font-size:78px;font-style:italic">${lines(s.lines)}</div>
        </div>`);
    /* 5 — darkest, most unsettling: centred-left vertical rule */
    case 5:
      return wrap(`
        ${image(spec, 5, "filter:brightness(.55) contrast(1.15) saturate(.7);")}${grade(0.45)}
        <div class="grade" style="background:radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,0,0,.55),rgba(0,0,0,.92))"></div>
        ${label(spec, true)}${idx(n, total)}
        <div class="block" style="left:var(--m-left);right:var(--m-right);top:760px;display:flex;gap:44px">
          <div style="width:2px;background:var(--accent-lift);flex:none"></div>
          <div class="copy-serif" style="font-size:64px">${lines(s.lines)}</div>
        </div>
        <div class="foot">Descent / 05</div>`);
    /* 6 — fragrance reveal: bottle hero + identification plate */
    case 6: {
      const f = spec.fragrance;
      const bottle = spec.images?.["6"]
        ? `<div class="img" style="top:340px;bottom:auto;height:880px;left:200px;right:200px;background-size:contain;background-repeat:no-repeat;background-image:url('file://${path.resolve(spec.images["6"])}')"></div>`
        : `<div style="position:absolute;left:260px;right:260px;top:360px;height:840px;border:1.5px dashed rgba(163,157,148,.45);display:flex;align-items:center;justify-content:center;text-align:center;color:var(--smoke)">
             <div><div style="font:500 22px/1 var(--sans);letter-spacing:.42em;text-transform:uppercase">Image pending</div>
             <div style="font:italic 500 30px/1.3 var(--serif);margin-top:20px">${esc(spec.imageBriefs?.["6"] ?? "Bottle")}</div></div></div>`;
      return wrap(`
        <div class="img" style="background:radial-gradient(ellipse 55% 38% at 50% 40%,rgba(164,129,69,0) 0%,transparent 100%),radial-gradient(ellipse 60% 40% at 50% 38%,#2a2826 0%,var(--obsidian) 72%)"></div>
        <div class="grade" style="background:radial-gradient(ellipse 40% 30% at 50% 40%,color-mix(in srgb,var(--accent-lift) 18%,transparent),transparent)"></div>
        ${bottle}${grade(0.0, true)}
        <div class="frame accent"></div>
        ${label(spec)}${idx(n, total)}
        <div class="copy-serif" style="position:absolute;left:var(--m-left);top:190px;font-size:72px">${esc(s.wear)}</div>
        <div class="copy-serif" style="position:absolute;left:var(--m-left);right:var(--m-right);top:1236px;font-size:40px;font-style:italic;color:var(--smoke)">${lines(s.desc)}</div>
        <div class="plate" style="top:1360px">
          <div class="p-top"><span>Character study</span><span>${esc(spec.character.lines.join(" "))}</span></div>
          <div class="p-brand">${esc(f.brand)}</div>
          <div class="p-name">${esc(f.name)}</div>
          <div class="p-mood">${f.mood.map(esc).join(" &nbsp;/&nbsp; ")}</div>
        </div>
        <div class="foot" style="left:auto;right:96px">${esc(spec.footers?.["6"] ?? "")}</div>`);
    }
    /* 7 — closing line: last frame of a film */
    case 7: {
      const bars = [34,58,22,50,40,58,18,46,58,30,52,24,58,38,48,20,58,42,28,54]
        .map((h) => `<span style="height:${h}px;width:${h % 3 ? 3 : 5}px"></span>`).join("");
      return wrap(`
        ${image(spec, 7, "opacity:.55;")}${grade(0.2)}
        <div class="grade" style="background:linear-gradient(180deg,rgba(8,8,8,.1) 0%,var(--obsidian) 58%)"></div>
        <div class="frame"></div>
        ${label(spec)}${idx(n, total)}
        <div class="block" style="left:var(--m-left);right:var(--m-right);top:1010px">
          <div class="copy-serif" style="font-size:72px;line-height:1.1">${lines(s.lines)}</div>
        </div>
        <div class="stamp" style="left:var(--m-left);top:1560px;display:flex;align-items:center;gap:36px">
          <svg width="116" height="116" viewBox="0 0 116 116">
            <defs><path id="c" d="M58,58 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
            <circle cx="58" cy="58" r="55" fill="none" stroke="var(--accent-lift)" stroke-width="1.5" opacity=".8"/>
            <circle cx="58" cy="58" r="30" fill="none" stroke="var(--smoke)" stroke-width="1" opacity=".6"/>
            <text font-family="Inter" font-weight="500" font-size="9.5" letter-spacing="3.2" fill="var(--smoke)"><textPath href="#c">ISSUE ${spec.issue} · CHARACTER STUDY · ARCHIVE ·</textPath></text>
            <text x="58" y="64" text-anchor="middle" font-family="Cormorant Garamond" font-weight="600" font-size="22" style="font-variant-numeric:lining-nums" fill="var(--bone)">${spec.issue}</text>
          </svg>
          <div class="bars">${bars}</div>
        </div>
        <div class="foot">${esc(spec.footers?.["7"] ?? "")}</div>`);
    }
  }
}

export function page(inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="slides.css"></head><body>${inner}<script>${fitScript}</script></body></html>`;
}
