// Spielt jedes Level von Teil 3 mit der hinterlegten Lösung durch und prüft den Sieg
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const LV = JSON.parse(fs.readFileSync(process.argv[3])); const b = await chromium.launch();
 const p = await b.newPage({ viewport: { width: 1400, height: 1200 }, reducedMotion: 'reduce' }); const errs = []; p.on('pageerror', e => errs.push(e.message));
 await p.goto('file://' + process.argv[2]); await p.waitForTimeout(500);
 const res = await p.evaluate(async (LV) => { const out = []; const D = { u: 'u', d: 'd', l: 'l', r: 'r' };
  for (let w = 0; w < WORLDS.length; w++) { if (WORLDS[w].custom) continue; for (let l = 0; l < NL(w); l++) {
   const lv = LV.find(x => x.n === WORLDS[w].levels[l].n); if (!lv) { out.push(`W${w + 1}L${l + 1}: keine Lösung`); continue; }
   show('game'); loadLevel(w, l);
   const missing = [...document.querySelectorAll('#board .box use')].map(u => u.getAttribute('href').slice(1)).filter(id => !document.getElementById(id));
   if (missing.length) out.push(`W${w + 1}L${l + 1}: Gegenstand ohne Bild: ${[...new Set(missing)].join(', ')} (NICHT ok)`);
   if (!document.getElementById('hint').textContent.trim()) out.push(`W${w + 1}L${l + 1}: kein Hinweistext (NICHT ok)`);
   // gedrehte Level (im Uhrzeigersinn): oben→rechts, rechts→unten, unten→links, links→oben
   const RD = ROT ? { u: 'r', r: 'd', d: 'l', l: 'u' } : D;
   for (const c of lv.sol) { step(RD[c.toLowerCase()]); await new Promise(r => setTimeout(r, 0)); }
   await new Promise(r => setTimeout(r, 1500));
   const won = !document.getElementById('win').hidden; out.push(`W${w + 1}L${l + 1} ${lv.n}: ${won ? 'gewonnen' : 'NICHT gewonnen'} (${moves} Schritte, Bestwert ${optOf(w, l)})`); } }
  return out; }, LV);
 res.forEach(r => console.log(r)); console.log('Fehler:', errs); await b.close();
 process.exit(res.some(r => !/gewonnen \(/.test(r) || /NICHT/.test(r)) || errs.length ? 1 : 0); })();
