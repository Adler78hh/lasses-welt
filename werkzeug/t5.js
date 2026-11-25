
// ===================== Idas Welt =====================
// Ida, 8 Jahre: rundes Gesicht, eher schmale Augen, dunkelblonde Locken im Bauernzopf, Kleidung in Grau und blassem Pink.
const IDA8_HAAR = "#a07a44", IDA8_HAAR2 = "#86642f", IDA8_HAUT = "#f3d6bf", IDA8_PINK = "#f2c4d0", IDA8_GRAU = "#9a9ea6";
const idaHead8 = (extra = "") => `
  <g>
    ${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${64 + i * .5}" cy="${38 + i * 5}" rx="${5.4 - i * .45}" ry="3.8" fill="${IDA8_HAAR}" stroke="#2d3036" stroke-width="1.6"/>`).join("")}
    <rect x="61.5" y="66" width="6" height="3.4" rx="1.4" fill="${IDA8_PINK}" stroke="#2d3036" stroke-width="1.4"/><path d="M63 70q1 6 3 7M66 70q1 5 2 6" stroke="${IDA8_HAAR}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M28 31q-5-24 22-25 27 1 22 25 2 7-2 10-4-14-20-16-16 2-20 16-4-3-2-10z" fill="${IDA8_HAAR}" stroke="#2d3036" stroke-width="2.2" stroke-linejoin="round"/>
    <ellipse cx="32.5" cy="30" rx="3.4" ry="4.4" fill="${IDA8_HAUT}" stroke="#2d3036" stroke-width="1.6"/><ellipse cx="67.5" cy="30" rx="3.4" ry="4.4" fill="${IDA8_HAUT}" stroke="#2d3036" stroke-width="1.6"/>
    <circle cx="50" cy="29" r="17.5" fill="${IDA8_HAUT}" stroke="#2d3036" stroke-width="2.4"/>
    <path d="M33 26q2-14 17-15 15 1 17 15-6-7-11-8-3 3-6 3t-6-3q-5 1-11 8z" fill="${IDA8_HAAR}" stroke="#2d3036" stroke-width="2" stroke-linejoin="round"/>
    ${[[50, 9], [50, 14.5], [50, 20]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.2" fill="${IDA8_HAAR2}" stroke="#2d3036" stroke-width="1.3"/>`).join("")}
    ${[[32, 33], [31, 39], [68, 33]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${IDA8_HAAR}" stroke="#2d3036" stroke-width="1.2"/>`).join("")}
    <path d="M38 27q4-2 7 0M55 27q4-2 7 0" stroke="${IDA8_HAAR2}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M38.5 31.5q3.5-2.6 7 0q-3.5 1.6-7 0zM54.5 31.5q3.5-2.6 7 0q-3.5 1.6-7 0z" fill="#2d3036"/>
    <ellipse cx="39" cy="37" rx="3.6" ry="2.2" fill="#f7a8b8" opacity=".75"/><ellipse cx="61" cy="37" rx="3.6" ry="2.2" fill="#f7a8b8" opacity=".75"/>
    <path d="M50 33q-1.6 3 .4 4" stroke="#d1a488" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M45 40q5 4 10 0" stroke="#2d3036" stroke-width="2" fill="#ffffff" stroke-linecap="round"/>
    <path d="M60 14l5-3 1 5z" fill="${IDA8_PINK}" stroke="#2d3036" stroke-width="1.3"/>${extra}
  </g>`;
function kIda8(o = {}) {
  const svg = kLasse({ shirt: IDA8_PINK, pants: IDA8_GRAU, shoes: "#ffffff", glove: IDA8_HAUT, ...o, head: "", hair: false });
  const a = svg.indexOf('<g transform="rotate(-6 50 28)">'), b = svg.lastIndexOf("</g>\n  </g>\n</svg>");
  return svg.slice(0, a) + idaHead8(o.head || "") + "\n    " + svg.slice(b);
}
// Grundoutfit: blasspinker Pulli mit grauem Kragen und Herz, graue Leggings, weiße Schuhe
LASSE.ida = kIda8({ body: `<path d="M42 44q8 6 16 0" stroke="${IDA8_GRAU}" stroke-width="3" fill="none"/><path d="M50 60c-5-4-5-8-2-8 1 0 2 1 2 1s1-1 2-1c3 0 3 4-2 8z" fill="#ffffff" stroke="#2d3036" stroke-width="1.2"/>` });
// Monster-Trainerin: graue Jacke über dem pinken Shirt, Kappe in Pink und Grau
LASSE.ida_trainer = kIda8({ shirt: IDA8_GRAU, body: `<path d="M44 44v24" stroke="${IDA8_PINK}" stroke-width="5"/><path d="M50 44v24" stroke="#2d3036" stroke-width="1.2"/>`,
  head: `<path d="M31 22q0-17 19-17t19 17z" fill="${IDA8_PINK}" stroke="#2d3036" stroke-width="2.2"/><path d="M31 22h38" stroke="${IDA8_GRAU}" stroke-width="4"/><path d="M62 21h14l-2 4H62z" fill="${IDA8_GRAU}" stroke="#2d3036" stroke-width="1.6"/><path d="M50 10l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="#ffffff"/>` });
LASSE.avatar = LASSE.fussball = LASSE.familie = LASSE.taschenmonster = LASSE.taschenmonster2 = LASSE.ida;
for (const k of Object.keys(LASSE)) if (/^(c_|w3_|hd_|lg_|pg_|ur_|at_|ab_|en_|bh_)/.test(k)) LASSE[k] = LASSE.ida;
const IDA8_HERO = `<svg viewBox="0 0 240 200" overflow="visible"><circle cx="120" cy="110" r="92" fill="#f8e6ec"/>${[[34, 44, 7, "#f2c4d0"], [206, 54, 9, "#c9ccd2"], [44, 160, 6, "#c9ccd2"], [204, 150, 7, "#f2c4d0"]].map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join("")}<g transform="translate(40 8) scale(1.6)">${LASSE.ida.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</g></svg>`;
{ const baseRP = renderPlayers; renderPlayers = function () { baseRP(); const h = document.getElementById("hero"); if (h) { h.classList.remove("family"); h.classList.add("t3hero"); h.innerHTML = IDA8_HERO; } }; }

// ---------- Neun schlichte Welten: Grundwand, ruhiger Boden, einfache Bildkacheln; Arne und Matze je einmal pro Level ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const O = `stroke="#2d3036" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
  const ITEMS = {
    kiste: (c) => `<rect x="16" y="26" width="68" height="60" rx="4" fill="#d9a774" ${O}/><path d="M16 46h68M16 66h68" stroke="#a8743f" stroke-width="2"/><rect x="38" y="20" width="24" height="70" fill="${c}" ${O}/>`,
    geschenk: (c) => `<rect x="18" y="40" width="64" height="46" rx="4" fill="${c}" ${O}/><rect x="14" y="30" width="72" height="14" rx="3" fill="${c}" ${O}/><path d="M50 30v56" stroke="#ffffff" stroke-width="7"/><path d="M50 30q-14-18-20-6 4 8 20 6zM50 30q14-18 20-6-4 8-20 6z" fill="#ffffff" ${O}/>`,
    ball: (c) => `<circle cx="50" cy="54" r="32" fill="${c}" ${O}/><path d="M18 54q32-14 64 0M50 22q-12 32 0 64" stroke="#ffffff" stroke-width="4" fill="none"/>`,
    kissen: (c) => `<path d="M16 32q34-10 68 0 6 22 0 44-34 10-68 0-6-22 0-44z" fill="${c}" ${O}/><path d="M50 44c-8-6-8-14-2-14 2 0 2 2 2 2s0-2 2-2c6 0 6 8-2 14z" fill="#ffffff"/>`,
    eimer: (c) => `<path d="M24 38h52l-6 48H30z" fill="${c}" ${O}/><path d="M24 38q26-30 52 0" fill="none" stroke="#2d3036" stroke-width="3"/><path d="M28 50h44" stroke="#ffffff" stroke-width="3" opacity=".6"/>`,
    wuerfel: (c) => `<rect x="20" y="22" width="60" height="60" rx="12" fill="${c}" ${O}/>${[[36, 38], [64, 38], [50, 52], [36, 66], [64, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffffff"/>`).join("")}`,
    klotz: (c) => `<rect x="14" y="36" width="72" height="48" rx="5" fill="${c}" ${O}/>${[30, 50, 70].map(x => `<rect x="${x - 8}" y="24" width="16" height="13" rx="4" fill="${c}" ${O}/>`).join("")}`,
    truhe: (c) => `<rect x="16" y="44" width="68" height="40" rx="4" fill="#b5803f" ${O}/><path d="M16 44q34-26 68 0z" fill="${c}" ${O}/><rect x="44" y="44" width="12" height="16" rx="2" fill="#ffd23a" ${O}/>`,
    laterne: (c) => `<path d="M50 10v12" stroke="#2d3036" stroke-width="3"/><path d="M26 30q24-12 48 0v40q-24 16-48 0z" fill="${c}" ${O}/><circle cx="50" cy="52" r="10" fill="#fff6a0" opacity=".85"/>`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(ITEMS).map(k => PL.map((c, i) =>
    `<symbol id="i5${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="30" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    Object.keys(ITEMS).map(k => `<symbol id="i5em-${k}" viewBox="0 0 100 100">${ITEMS[k]("#f2a7bb")}</symbol>`).join("") +
    `<symbol id="i5preis" viewBox="0 0 100 100"><path d="M50 10l12 26 28 3-21 19 6 28-25-14-25 14 6-28-21-19 28-3z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/></symbol>`);
  const B = (bg, inner) => () => kB(bg, inner);
  const herz = (c) => B("#fbe6ec", `<path d="M50 78C20 58 20 30 38 28c6 0 10 4 12 8 2-4 6-8 12-8 18 2 18 30-12 50z" fill="${c}" ${O}/>`);
  const stern = (c) => B("#e9eaf0", `<path d="M50 14l10 22 24 3-18 16 5 24-21-12-21 12 5-24-18-16 24-3z" fill="${c}" ${O}/>`);
  const blume = (c) => B("#eef6e8", `<path d="M50 92V56" stroke="#3fae4a" stroke-width="5"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="50" cy="30" rx="9" ry="14" fill="${c}" ${O} transform="rotate(${a} 50 44)"/>`).join("")}<circle cx="50" cy="44" r="8" fill="#ffd23a" ${O}/>`);
  const mond = B("#2f3560", `<circle cx="54" cy="46" r="24" fill="#fff6c8" ${O}/><circle cx="66" cy="38" r="22" fill="#2f3560"/>${[[20, 22], [30, 76], [80, 78]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ffffff"/>`).join("")}`);
  const fenster = B("#cfe8ff", `<rect x="18" y="14" width="64" height="72" rx="4" fill="#9fd8ff" ${O}/><path d="M50 14v72M18 50h64" stroke="#ffffff" stroke-width="5"/><path d="M18 14q32 18 0 72M82 14q-32 18 0 72" fill="${"#f2c4d0"}" opacity=".85"/>`);
  const ballon = (c) => B("#e6f4ff", `<ellipse cx="50" cy="40" rx="20" ry="25" fill="${c}" ${O}/><path d="M50 65q-6 12 2 26" stroke="#2d3036" stroke-width="1.6" fill="none"/>`);
  const regenbogen = B("#e6f4ff", `${["#e2402f", "#ff8a1a", "#ffd23a", "#3fae4a", "#2b5fd9"].map((c, i) => `<path d="M${14 + i * 6} 76a${36 - i * 6} ${36 - i * 6} 0 0 1 ${72 - i * 12} 0" stroke="${c}" stroke-width="6" fill="none"/>`).join("")}`);
  const bild = B("#f4efe8", `<rect x="14" y="18" width="72" height="56" fill="#ffffff" stroke="#a8743f" stroke-width="6"/><path d="M20 66l18-22 14 14 10-10 18 18z" fill="#86c96e"/><circle cx="66" cy="34" r="6" fill="#ffd23a"/>`);
  const onkel = (fig, id, bg) => () => asPerson(kB(bg, `<g transform="translate(8 10) scale(.84)">${fig}</g>`), id);
  const AR = onkel(ARNE, "arne", "#fff0e6"), MA = onkel(MATZE, "matze", "#e6eef9");
  const DECO = [herz("#ff8fb1"), stern("#ffd23a"), blume("#f2a7bb"), mond, fenster, ballon("#b9a6f2"), regenbogen, bild, herz("#b9a6f2"), stern("#f2a7bb"), blume("#9fd8ff"), ballon("#ff8fb1")];
  // Welten: [Schlüssel, Name, Grundwand-Stil, drei Farben (je Schauplatz), Bodenfarben, Gegenstand]
  const W = [
    ["i5w1", "Rosa Ziegel", "ziegel", ["#e6a3b4", "#c9ccd2", "#d9b0c8"], ["#f6eef0", "#eef0f4", "#f4eef6"], "kiste"],
    ["i5w2", "Holzhaus", "bretter", ["#c9a27a", "#a9adb5", "#d6b6a0"], ["#f3ece4", "#eceef2", "#f6efe9"], "geschenk"],
    null,
    ["i5w4", "Heckengarten", "hecke", ["#7fb36a", "#9fc48a", "#86b8a0"], ["#eef6e8", "#f3f6ec", "#ecf5f0"], "ball"],
    ["i5w5", "Steinburg", "stein", ["#a8a7b0", "#b8acb6", "#9ea9b0"], ["#f0f0f3", "#f4eff3", "#eef2f4"], "truhe"],
    ["i5w6", "Fliesenbad", "fliesen", ["#9fd0e0", "#f2c4d0", "#c9ccd2"], ["#f2f8fb", "#fbf2f5", "#f3f4f6"], "eimer"],
    ["i5w7", "Bausteinstadt", "lego", ["#e6a3b4", "#9fb8e0", "#c9ccd2"], ["#f4f0f2", "#eff3f9", "#f2f3f5"], "klotz"],
    ["i5w8", "Felsenpfad", "fels", ["#a88c78", "#9a9ea6", "#b8a08c"], ["#f3eee8", "#eff0f2", "#f5efe8"], "wuerfel"],
    ["i5w9", "Kuschelzimmer", "farbe", ["#e6c3d0", "#c9ccd2", "#d8c8e8"], ["#fbf3f6", "#f3f4f6", "#f6f2fb"], "kissen"],
    ["i5w10", "Sternenschloss", "paneel", ["#8f8fc0", "#b9a6d2", "#a3a8c8"], ["#f0f0f8", "#f4f0f8", "#eef0f6"], "laterne"]
  ];
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="14" fill="none" stroke="#e58fac" stroke-width="5" stroke-dasharray="10 7"/><path d="M50 66C36 56 36 42 44 41c3 0 5 2 6 4 1-2 3-4 6-4 8 1 8 15-6 25z" fill="#f2a7bb"/>`);
  const NAMEN = { kiste: ["Kiste", "Kisten"], geschenk: ["Geschenk", "Geschenke"], ball: ["Ball", "Bälle"], truhe: ["Truhe", "Truhen"], eimer: ["Eimer", "Eimer"], klotz: ["Baustein", "Bausteine"], wuerfel: ["Würfel", "Würfel"], kissen: ["Kissen", "Kissen"], laterne: ["Laterne", "Laternen"] };
  const JEDE = { kiste: "jede", geschenk: "jedes", ball: "jeden", truhe: "jede", eimer: "jeden", klotz: "jeden", wuerfel: "jeden", kissen: "jedes", laterne: "jede" };
  W.forEach((w, wi) => { if (!w) return;
    const [key, title, style, cols, floors, item] = w;
    const scenes = cols.map((c, si) => { const name = `${title} ${si + 1}`; BASE_WALL[name] = [style, c]; OUTFIT[name] = "ida";
      const sc = kScene(name, "ida", PAL(floors[si], "#ffffff"), kFloor(floors[si], floors[si], (x, y) => pick(x, y, 1, 6) === 0 ? `<circle cx="30" cy="40" r="2.4" fill="${c}" opacity=".35"/>` : ""), DECO.slice((wi + si) % 4, (wi + si) % 4 + 6), () => "");
      sc.wall = feierWalls(sc.list, () => [AR(), MA()]); return sc; });
    const [ein, mehr] = NAMEN[item];
    THEMES[key] = theme2({
      title, worldName: title, emblem: `i5em-${item}`, box: `i5${item}-0`, mapIcon: `i5em-${item}`, boxWord: mehr, pushWord: "Schübe",
      hint: () => `Schieb ${JEDE[item]} ${ein} auf ein Feld mit Herz. ${mehr} lassen sich nur schieben, nicht ziehen.`,
      winTitle: () => ["SUPER!", "TOLL!", "JUCHHU!", "KLASSE!"][wi % 4], winText: (m, p) => `Geschafft! ${m} Schritte, ${p} Schübe.`,
      prize: { symbol: "i5preis", title: "Goldener Stern!", text: (m) => `Welt „${title}“ geschafft! Finale in ${m} Schritten.` },
      pal: { "--accent": "#d97b98", "--accent-dark": "#b05a78" }, target: platz, scenes,
      levelScenes: [0, 0, 0, 1, 1, 1, 2, 2, 2].map(i => scenes[i]),
      levelName: (l) => title, levelBox: () => `i5${item}-0`, boxCycle: () => PL.map((_, i) => `i5${item}-${i}`)
    });
  });
}

// ---------- Monster-Welt (Welt 3): eigene Fantasie-Monster, Ida als Trainerin, eigene Fangkugeln ----------
{
  const T = THEMES.taschenmonster, six = T.levelScenes.slice(0, 6);
  const NAMEN6 = T.levelScenes.slice(0, 6).map(sc => sc.name);
  const pick9 = [0, 0, 1, 2, 2, 3, 4, 4, 5];
  six.forEach(sc => { OUTFIT[sc.name] = "ida_trainer"; sc.lasse = "ida_trainer"; });
  T.levelScenes = pick9.map(i => six[i]); T.scenes = six;
  Object.assign(T, { title: "Monster-Welt", worldName: "Monster-Welt", boxWord: "Fangkugeln", levelNames: pick9.map(i => NAMEN6[i]),
    levelName: (l) => NAMEN6[pick9[l]],
    hint: () => "Roll jede Fangkugel auf ihren Platz. Kugeln lassen sich nur schieben, nicht ziehen.",
    winTitle: () => "GEFANGEN!", winText: (m, p) => `Alle Kugeln am Platz! ${m} Schritte, ${p} Würfe.`,
    prize: { symbol: "orden", title: "Monster-Orden!", text: (m) => `Du hast die Monster-Welt gemeistert, Ida! Finale in ${m} Schritten.` } });
  six.forEach((sc, i) => { sc.winTitle = undefined; });
}

// ---------- Weltkarte: nur Arne und Matze, die beiden Onkel, stehen bei Welt 1 ----------
queueMicrotask(() => {
  mapDeco = function (shown, open, pts) {
    let html = `<div class="lb-spot" aria-hidden="true"></div>`;
    if (!pts || !pts[0]) return html;
    [[ARNE_FULL, 20], [MATZE_FULL, 32]].forEach(([svg, dx], k) => {
      html += `<div class="mapdeco mapfig" style="left:${Math.min(92, pts[0][0] + dx)}%;top:${pts[0][1] - 6}px;width:34px;height:68px;animation-delay:${-k * .8}s">${svg}</div>`; });
    return html;
  };
});
