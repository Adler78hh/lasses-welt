const { chromium } = require('playwright'); const fs = require('fs');
const OUT = process.env.OUT || require('path').join(__dirname, '../uebersicht-tmp'); require('fs').mkdirSync(OUT, { recursive: true });
(async () => { const b = await chromium.launch(); const all = {};
 for (const [d, t] of [['christians-welt', 't3'], ['christians-grosse-welt', 't4']]) {
  const p = await b.newPage({ viewport: { width: 420, height: 900 }, reducedMotion: 'reduce', colorScheme: 'light' });
  await p.goto(`file:///home/user/lasses-welt/${d}/index.html`); await p.waitForTimeout(1200);
  const worlds = [];
  for (let w = 0; w < 10; w++) { const lv = [];
   for (let l = 0; l < 6; l++) {
    const info = await p.evaluate(([w, l]) => { show('game'); loadLevel(w, l); document.querySelectorAll('.lv-intro').forEach(x => x.remove());
     const persons = [...new Set([...document.querySelectorAll('#board [data-person]')].map(e => e.getAttribute('data-person')))];
     return { scene: T.levelName ? T.levelName(l) : '', n: WORLDS[w].levels[l].n, opt: optOf(w, l), boxes: boxes.length, hint: document.getElementById('hint').textContent.trim(), persons, world: WORLDS[w].name }; }, [w, l]);
    await p.waitForTimeout(350);
    const el = await p.$('#board'); const file = `${t}-${w}-${l}.jpg`;
    await el.screenshot({ path: `${OUT}/${file}`, type: 'jpeg', quality: 72 });
    lv.push({ ...info, img: file }); }
   worlds.push({ name: lv[0].world, levels: lv }); }
  all[t] = worlds; await p.close(); }
 fs.writeFileSync(`${OUT}/data.json`, JSON.stringify(all, null, 1)); await b.close(); })();
