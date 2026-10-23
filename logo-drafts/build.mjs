// Generates the logo drafts: one standalone SVG per mark plus an index.html contact sheet.
// Run: node logo-drafts/build.mjs
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = dirname(fileURLToPath(import.meta.url))
const INK = '#111111'
const ACCENT = '#D9480F'

// All marks live on a 96x96 grid. `ink` and `acc` let the sheet recolor them for the dark tiles.
const marks = [
  {
    id: '01-gear-e',
    name: 'Gear E',
    note: 'The current idea, reduced: a toothed ring with a plain E inside. The middle arm is the accent.',
    body: (ink, acc) => `
      <circle cx="48" cy="48" r="38" fill="none" stroke="${ink}" stroke-width="10" stroke-dasharray="7.46 7.46" stroke-dashoffset="3.73"/>
      <circle cx="48" cy="48" r="32" fill="none" stroke="${ink}" stroke-width="6"/>
      <path d="M38 35h22v6H44v4h14v6H44v4h16v6H38z" fill="${ink}"/>
      <rect x="44" y="45" width="14" height="6" fill="${acc}"/>`,
  },
  {
    id: '02-truss-w',
    name: 'Truss W',
    note: 'A Warren truss that reads as a W for WHS. Ties straight into the bridge drawings on the site.',
    body: (ink, acc) => `
      <path d="M8 22H88M8 22L28 74L48 22L68 74L88 22" fill="none" stroke="${ink}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="square"/>
      <circle cx="8" cy="22" r="5" fill="${ink}"/><circle cx="88" cy="22" r="5" fill="${ink}"/>
      <circle cx="28" cy="74" r="5" fill="${ink}"/><circle cx="68" cy="74" r="5" fill="${ink}"/>
      <circle cx="48" cy="22" r="6" fill="${acc}"/>`,
  },
  {
    id: '03-set-square',
    name: 'Set square',
    note: 'The drafting triangle. Solid, simple, and the cut-out window carries the accent color.',
    body: (ink, acc) => `
      <path fill-rule="evenodd" fill="${ink}" d="M12 12L84 84H12zM26 45.8V70H50.2z"/>
      <path d="M26 45.8V70H50.2z" fill="${acc}"/>`,
  },
  {
    id: '04-datum',
    name: 'Datum',
    note: 'A drawing centermark: circle, crosshair and a dot. Quiet, and works at favicon size.',
    body: (ink, acc) => `
      <circle cx="48" cy="48" r="26" fill="none" stroke="${ink}" stroke-width="6"/>
      <path d="M48 4V22M48 74V92M4 48H22M74 48H92" stroke="${ink}" stroke-width="3"/>
      <circle cx="48" cy="48" r="6" fill="${acc}"/>`,
  },
  {
    id: '05-nut-e',
    name: 'Nut E',
    note: 'A hex nut with the E knocked out. The most compact mark, and one solid color.',
    body: (ink) => `
      <path fill-rule="evenodd" fill="${ink}" d="M88 48L68 82.6H28L8 48L28 13.4H68zM35 33H61V40H43V44H57V51H43V55H61V63H35z"/>`,
  },
  {
    id: '06-c-traces',
    name: 'C and traces',
    note: 'An open C with E-shaped traces ending in nodes. Keeps the circuit idea from the current logo.',
    body: (ink, acc) => `
      <g transform="translate(8 0)">
        <path d="M60.5 27.4A32 32 0 1 0 60.5 68.6" fill="none" stroke="${ink}" stroke-width="7"/>
        <path d="M24 33V63M24 33H62M24 48H62M24 63H62" fill="none" stroke="${ink}" stroke-width="5"/>
        <circle cx="74" cy="33" r="4.5" fill="${acc}"/><circle cx="74" cy="48" r="4.5" fill="${acc}"/><circle cx="74" cy="63" r="4.5" fill="${acc}"/>
      </g>`,
  },
]

const svg = (m, ink, acc, size = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"${size}>${m.body(ink, acc)}\n</svg>`

for (const m of marks) writeFileSync(join(out, `${m.id}.svg`), svg(m, INK, ACCENT, ' width="96" height="96"') + '\n')

const lockup = (m, ink, acc) => `
  <div class="lockup" style="color:${ink}">
    ${svg(m, ink, acc, ' width="44" height="44"')}
    <span>WHS Engineering Club</span>
  </div>`

const card = (m) => `
  <article>
    <header><h2>${m.name}</h2><span>${m.id.slice(0, 2)}</span></header>
    <div class="tile light">${svg(m, INK, ACCENT, ' class="big"')}</div>
    <div class="tile light">${lockup(m, INK, ACCENT)}</div>
    <div class="tile dark">${lockup(m, '#FFFFFF', '#F76707')}</div>
    <div class="row sizes">
      <div class="tile light">${svg(m, INK, ACCENT, ' width="32" height="32"')}${svg(m, INK, ACCENT, ' width="16" height="16"')}<small>32 / 16 px</small></div>
      <div class="tile mono">${svg(m, INK, INK, ' width="32" height="32"')}<small>one color</small></div>
    </div>
    <p>${m.note}</p>
  </article>`

writeFileSync(join(out, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>WHS Engineering Club logo drafts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Inter+Tight:wght@600&family=Inter:wght@400&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 48px 32px 64px; background: #F6F6F3; color: #3B3B38; font: 400 15px/1.55 Inter, "Segoe UI", sans-serif; }
  h1 { font: 600 28px "Inter Tight", "Segoe UI", sans-serif; color: #111; margin: 0 0 6px; }
  .lede { margin: 0 0 36px; color: #6C6C67; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; max-width: 1240px; margin: 0 auto; }
  article { min-width: 0; background: #fff; border: 1px solid #E2E2DC; border-radius: 10px; padding: 20px; display: grid; gap: 12px; }
  article header { display: flex; justify-content: space-between; align-items: baseline; }
  h2 { font: 600 18px "Inter Tight", "Segoe UI", sans-serif; color: #111; margin: 0; }
  header span { font: 500 12px "IBM Plex Mono", Consolas, monospace; color: #A6A6A0; }
  .tile { border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 84px; padding: 12px; }
  .tile.light { background: #F6F6F3; } .tile.mono { background: #F6F6F3; } .tile.dark { background: #111; }
  .tile:first-of-type { min-height: 220px; } .big { width: 150px; height: 150px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; } .row .tile { min-height: 84px; }
  .sizes .tile { gap: 14px; } small { font: 500 11px "IBM Plex Mono", Consolas, monospace; color: #A6A6A0; }
  .lockup { display: flex; align-items: center; gap: 10px; font: 600 15px "Inter Tight", "Segoe UI", sans-serif; letter-spacing: -.01em; white-space: nowrap; }
  article p { margin: 0; color: #6C6C67; font-size: 14px; }
</style></head>
<body>
  <h1>WHS Engineering Club: logo drafts</h1>
  <p class="lede">Six minimal directions. Each is shown large, as a nav lockup on light and dark, at favicon sizes, and in one color. Colors come from the site: ink #111111, accent #D9480F.</p>
  <div class="grid">${marks.map(card).join('')}
  </div>
</body></html>
`)
console.log('wrote', marks.length, 'marks + index.html')
