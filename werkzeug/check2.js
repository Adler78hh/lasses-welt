const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
 const errs = []; p.on('pageerror', e => errs.push(e.message));
 await p.goto('file://' + process.argv[2]); await p.waitForTimeout(500);
 const r = await p.evaluate(() => { const out = []; let n = 0, base = 0, motif = 0, txt = 0;
  WORLDS.forEach((w, wi) => { if (w.custom) return; w.levels.forEach((_, l) => { show('game'); loadLevel(wi, l); n++;
   const at = {}; document.querySelectorAll('#board .tile.wall').forEach(t => { if (t.classList.contains('base')) base++; else { motif++; if (/<text\b/.test(t.innerHTML)) txt++; }
     const m = t.innerHTML.match(/data-person="([^"]+)"/); if (m) (at[m[1]] = at[m[1]] || []).push([+t.style.getPropertyValue('--x'), +t.style.getPropertyValue('--y')]); });
   for (const [id, ps] of Object.entries(at)) { let md = 99; ps.forEach((a, i) => ps.forEach((c, j) => { if (i < j) md = Math.min(md, Math.max(Math.abs(a[0] - c[0]), Math.abs(a[1] - c[1]))); }));
     if (ps.length > 4 || md < 3) out.push(`W${wi + 1}L${l + 1}: ${id} ${ps.length}x Abstand ${md}`); }
   if (false) { const ids = Object.keys(at).filter(k => /justus|peter|bob|^[0-2]$/.test(k)); out.push(`W${wi + 1}L${l + 1} Detektive: ${Object.keys(at).join(',')}`); }
  }); });
  return { n, base, motif, txt, out }; });
 console.log(JSON.stringify(r, null, 1), errs); await b.close(); })();
