// ===================== Idas Welt (Grundlage: Lasses Welt, Teil 1) =====================
// Teil A: wird vor dem Aufbau der Designs eingefügt. Ida im Zeichenstil von Lasse, zehn Welten:
// 1–6 und 10 schlicht (Grundwand, ruhiger Boden, Bildkacheln), 7 Duplo, 8 Taschenmonster, 9 Idas Kinderzimmer (aus Lasses Welt).
const IDA5 = {};
{
  // ---------- Ida im Stil von Lasse: gleicher Körper (lasseBase), eigener Kopf mit Bauernzopf ----------
  const HAAR = "#d2ab6b", HAAR2 = "#b48b4c", PINK = "#f2c4d0", GRAU = "#9a9ea6";
  const HEADC = `<circle cx="50" cy="32" r="24" fill="${SKIN}" stroke="${INK}" stroke-width="2.4"/>`;
  // Zopf über der rechten Schulter (vor dem Körper, hinter dem Kopf)
  const BACK = `${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${67 + i * .8}" cy="${46 + i * 6}" rx="${6.4 - i * .5}" ry="4.4" fill="${HAAR}" stroke="${INK}" stroke-width="1.8"/>`).join("")}
    <rect x="67" y="79" width="9" height="4.4" rx="2" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/><path d="M70 84q1 6 3 7M73 84q1 5 2 6" stroke="${HAAR}" stroke-width="2.6" stroke-linecap="round"/>`;
  // Haare vorn: Scheitel mit Stirnhaar, geflochtener Zopf über den Kopf, Spange
  const FRONT = `<path d="M26 36q-4-30 24-30t24 30q-4-13-13-16-5 5-11 5t-11-5q-9 3-13 16z" fill="${HAAR}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    ${[[50, 8], [50, 14.5], [50, 21]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="3.8" fill="${HAAR2}" stroke="${INK}" stroke-width="1.5"/>`).join("")}
    ${[[26, 40], [74, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${HAAR}" stroke="${INK}" stroke-width="1.4"/>`).join("")}
    <path d="M64 12l7-4 1 7z" fill="${PINK}" stroke="${INK}" stroke-width="1.5"/>`;
  // Gesicht: eher schmale, lachende Augen, Brauen, Backen, Lächeln mit Zähnen
  const FACE_IDA = `
  <g class="eyes"><path d="M35 37q6-4.4 12 0q-6 2.6-12 0zM53 37q6-4.4 12 0q-6 2.6-12 0z" fill="#4a3728"/></g>
  <path d="M35 31q5-3 10 0M55 31q5-3 10 0" stroke="${HAAR2}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="34" cy="43" rx="4.5" ry="3" fill="#ff8fa8" opacity=".6"/><ellipse cx="66" cy="43" rx="4.5" ry="3" fill="#ff8fa8" opacity=".6"/>
  <path d="M50 38q-2 3.4.6 4.6" stroke="#d1a488" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M44 45q6 6 12 0" fill="#ffffff" stroke="#4a3728" stroke-width="2.2" stroke-linecap="round"/>`;
  // Macht aus einer Lasse-Figur (lasseBase) Ida: Strubbelhaare weg, Kopf und Gesicht von Ida
  IDA5.idaify = (svg) => {
    if (!svg || !svg.includes(HEADC) || !svg.includes(FACE)) return svg;
    return svg.split(HAIR_STRUBBEL).join("").replace(HEADC, BACK + HEADC + FRONT).replace(FACE, FACE_IDA);
  };
  IDA5.ida = (shirt, pants, shoes, body = "", head = "") => IDA5.idaify(lasseBase(shirt, pants, shoes, body, head));
  // Grundoutfit: blasspinker Pulli mit grauem Kragen und Herz, graue Leggings, weiße Schuhe
  LASSE.ida = IDA5.ida(PINK, GRAU, "#ffffff", `<path d="M42 50q8 6 16 0" stroke="${GRAU}" stroke-width="3" fill="none"/><path d="M50 68c-5-4-5-8-2-8 1 0 2 1 2 1s1-1 2-1c3 0 3 4-2 8z" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/>`);
  LASSE.i5_hof = IDA5.ida("#f2c4d0", "#4a6fb3", "#8a5a2b", `<path d="M38 60h24v16H38z" fill="#4a6fb3" stroke="${INK}" stroke-width="1.6"/><path d="M38 60l-2-10M62 60l2-10" stroke="#4a6fb3" stroke-width="3.4"/><circle cx="40" cy="62" r="1.8" fill="#ffd23a"/><circle cx="60" cy="62" r="1.8" fill="#ffd23a"/>`,
    `<ellipse cx="50" cy="16" rx="34" ry="7" fill="#f2d37a" stroke="${INK}" stroke-width="2.2"/><path d="M30 15q0-14 20-14t20 14z" fill="#f2d37a" stroke="${INK}" stroke-width="2.2"/><path d="M30 12h40" stroke="#e2402f" stroke-width="3.4"/>`);
  LASSE.i5_traum = IDA5.ida("#ff9cc2", "#ff9cc2", "#ffffff", `<path d="M33 70h34l7 12H26z" fill="#ff9cc2" stroke="${INK}" stroke-width="1.8"/><path d="M50 56l2 4 4.4.4-3.2 3 1 4.4-4.2-2.2-4.2 2.2 1-4.4-3.2-3 4.4-.4z" fill="#ffffff"/>`,
    `<path d="M36 10l5 8 9-10 9 10 5-8v12H36z" fill="#ffd23a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="15" r="2.4" fill="#ff5fa2"/>`);

  // ---------- Hilfen aus Lasses großer Welt für die schlichten Welten: Kachel, Boden, Grundwand ----------
  const KI = "#2d3036";
  const kO = `stroke="${KI}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const kLum = (h) => { const n = parseInt(h.slice(1), 16); return ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) / 255; };
  const kCalm = (a) => /^#[0-9a-f]{6}$/i.test(a) && kLum(a) < .42 ? `color-mix(in srgb, ${a} 72%, #fff)` : a;
  const kB = (fill, inner = "", r = 12) => svgT(`<rect x="4" y="4" width="92" height="92" rx="${r}" fill="${fill}"/>
  <path d="M96 60v24q0 12-12 12H16q-12 0-12-12v-6q30 4 56-8 22-10 36-10z" fill="#2d30361c"/>${inner}<rect x="4" y="4" width="92" height="92" rx="${r}" fill="none" ${kO}/>`);
  const kFloor = (a, extra = () => "") => (x, y, ctx) => svgT(`<rect width="100" height="100" fill="${kCalm(a)}"/>${extra(x, y, ctx)}`);
  const kTarget = (shape, fx = "#ffd23a") => () => svgT(`${shape}<g class="fx" fill="${fx}"><path d="M12 8l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/><path d="M86 4l2.5 5.5 6 .8-4.3 4 1 6-5.2-3-5.2 3 1-6-4.3-4 6-.8z"/></g>`);
  const kGlow = (shape) => `<g class="glow" style="fill:#fff6a0">${shape}</g>`;
  const bwDark = (c, k = .28) => `color-mix(in srgb, ${c} ${100 - k * 100}%, #000)`;
  const bwLight = (c, k = .35) => `color-mix(in srgb, ${c} ${100 - k * 100}%, #fff)`;
  const BW = {
    ziegel: (c) => kB(c, `${[24, 44, 64, 84].map((y, i) => `<path d="M5 ${y}h90" stroke="${bwDark(c)}" stroke-width="2"/>${[0, 1, 2].map(j => `<path d="M${(i % 2 ? 22 : 38) + j * 30} ${y - 20}v20" stroke="${bwDark(c)}" stroke-width="2"/>`).join("")}`).join("")}`),
    bretter: (c) => kB(c, `${[26, 48, 70].map(y => `<path d="M5 ${y}h90" stroke="${bwDark(c)}" stroke-width="2.4"/>`).join("")}<circle cx="16" cy="15" r="2" fill="${bwDark(c, .45)}"/><circle cx="84" cy="59" r="2" fill="${bwDark(c, .45)}"/><path d="M30 37q10-3 20 0" stroke="${bwDark(c, .15)}" stroke-width="1.6" fill="none"/>`),
    hecke: (c) => kB(c, `${[[22, 26], [52, 18], [80, 30], [34, 52], [66, 48], [20, 78], [50, 80], [80, 74]].map(([x, y]) => `<path d="M${x - 11} ${y + 4}q0-12 11-12t11 12" fill="${bwLight(c, .18)}" stroke="${bwDark(c)}" stroke-width="1.8"/>`).join("")}`),
    stein: (c) => kB(c, `<path d="M5 34h30l4-28M39 34h56M24 34l-4 30M5 64h60l6-30M65 64h30M44 64l-4 30" fill="none" stroke="${bwDark(c)}" stroke-width="2.2"/>`),
    paneel: (c) => kB(c, `<rect x="12" y="12" width="76" height="76" rx="6" fill="none" stroke="${bwDark(c, .22)}" stroke-width="2.4"/>${[[18, 18], [82, 18], [18, 82], [82, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${bwDark(c, .35)}"/>`).join("")}`),
    fliesen: (c) => kB(c, `<path d="M5 35h90M5 65h90M35 5v90M65 5v90" stroke="${bwLight(c, .5)}" stroke-width="2.4"/>`, 8),
    farbe: (c) => kB(c, `<path d="M5 62h90" stroke="${bwDark(c, .25)}" stroke-width="4"/><path d="M5 70h90" stroke="${bwLight(c, .3)}" stroke-width="2"/>`)
  };
  const motifCell = (x, y) => (x + 2 * y) % 3 === 0;

  // ---------- Arne und Matze: je einmal pro Level an der Wand (Kachel im Stil des Schauplatzes) ----------
  IDA5.onkel = (tileFn) => [[ARNE, "arne"], [MATZE, "matze"]].map(([fig, id]) => asPerson(tileFn(`<g transform="translate(8 8) scale(.84)">${fig}</g>`), id).replace("<svg", '<svg data-onkel="1"'));
  IDA5.padTile = (top, side) => (inner) => svgT(`${pad(top, side)}${inner}`);

  // ---------- Pastell-Grundfarben im Stil von Lasses Welt ----------
  const PAL5 = { "--ink": "#4a3728", "--muted": "#8a7f8c", "--accent": "#e2557f", "--accent-dark": "#a83a5b", "--soft": "#ffeaf1", "--edge": "#f1d3dd", "--on-bg": "#7a6f86" };
  IDA5.PAL5 = PAL5;
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const O = `stroke="#2d3036" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
  const ITEMS = {
    kiste: (c) => `<rect x="16" y="26" width="68" height="60" rx="4" fill="#d9a774" ${O}/><path d="M16 46h68M16 66h68" stroke="#a8743f" stroke-width="2"/><rect x="38" y="20" width="24" height="70" fill="${c}" ${O}/>`,
    geschenk: (c) => `<rect x="18" y="40" width="64" height="46" rx="4" fill="${c}" ${O}/><rect x="14" y="30" width="72" height="14" rx="3" fill="${c}" ${O}/><path d="M50 30v56" stroke="#ffffff" stroke-width="7"/><path d="M50 30q-14-18-20-6 4 8 20 6zM50 30q14-18 20-6-4 8-20 6z" fill="#ffffff" ${O}/>`,
    ball: (c) => `<circle cx="50" cy="54" r="32" fill="${c}" ${O}/><path d="M18 54q32-14 64 0M50 22q-12 32 0 64" stroke="#ffffff" stroke-width="4" fill="none"/>`,
    eimer: (c) => `<path d="M24 38h52l-6 48H30z" fill="${c}" ${O}/><path d="M24 38q26-30 52 0" fill="none" stroke="#2d3036" stroke-width="3"/><path d="M28 50h44" stroke="#ffffff" stroke-width="3" opacity=".6"/>`,
    truhe: (c) => `<rect x="16" y="44" width="68" height="40" rx="4" fill="#b5803f" ${O}/><path d="M16 44q34-26 68 0z" fill="${c}" ${O}/><rect x="44" y="44" width="12" height="16" rx="2" fill="#ffd23a" ${O}/>`,
    ballon: (c) => `<path d="M50 70q-4 10 2 22" stroke="#2d3036" stroke-width="2" fill="none"/><ellipse cx="50" cy="42" rx="24" ry="28" fill="${c}" ${O}/><path d="M46 70h8l-4-6z" fill="${c}" ${O}/><ellipse cx="41" cy="31" rx="5" ry="8" fill="#ffffff" opacity=".6"/>`,
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
  const fenster = B("#cfe8ff", `<rect x="18" y="14" width="64" height="72" rx="4" fill="#9fd8ff" ${O}/><path d="M50 14v72M18 50h64" stroke="#ffffff" stroke-width="5"/><path d="M18 14q32 18 0 72M82 14q-32 18 0 72" fill="#f2c4d0" opacity=".85"/>`);
  const ballon = (c) => B("#e6f4ff", `<ellipse cx="50" cy="40" rx="20" ry="25" fill="${c}" ${O}/><path d="M50 65q-6 12 2 26" stroke="#2d3036" stroke-width="1.6" fill="none"/>`);
  const regenbogen = B("#e6f4ff", `${["#e2402f", "#ff8a1a", "#ffd23a", "#3fae4a", "#2b5fd9"].map((c, i) => `<path d="M${14 + i * 6} 76a${36 - i * 6} ${36 - i * 6} 0 0 1 ${72 - i * 12} 0" stroke="${c}" stroke-width="6" fill="none"/>`).join("")}`);
  const bild = B("#f4efe8", `<rect x="14" y="18" width="72" height="56" fill="#ffffff" stroke="#a8743f" stroke-width="6"/><path d="M20 66l18-22 14 14 10-10 18 18z" fill="#86c96e"/><circle cx="66" cy="34" r="6" fill="#ffd23a"/>`);
  const DECO = [herz("#ff8fb1"), stern("#ffd23a"), blume("#f2a7bb"), mond, fenster, ballon("#b9a6f2"), regenbogen, bild, herz("#b9a6f2"), stern("#f2a7bb"), blume("#9fd8ff"), ballon("#ff8fb1")];
  // Welten: [Schlüssel, Name, Grundwand-Stil, drei Farben (je Schauplatz), Bodenfarben, Gegenstand]; null = Welt aus Lasses Welt (Teil B)
  const W = [
    null, // i5w1: eigene Datei
    null, // i5w2: eigene Datei
    null, // i5w3: eigene Datei
    null, // i5w4: eigene Datei
    null, // i5w5: eigene Datei
    null, // i5w6: eigene Datei
    null, null, null,
    ["i5w10", "Sternenschloss", "paneel", ["#8f8fc0", "#b9a6d2", "#a3a8c8"], ["#f0f0f8", "#f4f0f8", "#eef0f6"], "laterne"]
  ];
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="14" fill="none" stroke="#e58fac" stroke-width="5" stroke-dasharray="10 7"/><path d="M50 66C36 56 36 42 44 41c3 0 5 2 6 4 1-2 3-4 6-4 8 1 8 15-6 25z" fill="#f2a7bb"/>`);
  const NAMEN = { kiste: ["Kiste", "Kisten"], geschenk: ["Geschenk", "Geschenke"], ball: ["Ball", "Bälle"], truhe: ["Truhe", "Truhen"], eimer: ["Eimer", "Eimer"], laterne: ["Laterne", "Laternen"], ballon: ["Ballon", "Ballons"] };
  const JEDE = { kiste: "jede", geschenk: "jedes", ball: "jeden", truhe: "jede", eimer: "jeden", laterne: "jede", ballon: "jeden" };
  W.forEach((w, wi) => { if (!w) return;
    const [key, title, style, cols, floors, item] = w;
    const scenes = cols.map((c, si) => {
      const base = BW[style](c), deco = DECO.slice((wi + si) % 4, (wi + si) % 4 + 6);
      const fw = feierWalls(deco, () => IDA5.onkel((inner) => kB("#fff7f0", inner)));
      // Motivfelder und die beiden Onkel; sonst Grundwand (jede Grundwand-Kachel eindeutig, damit keine Ersatzmotive nachrücken)
      const wall = (x, y) => { const h = fw(x, y); return motifCell(x, y) || /data-onkel=/.test(h) ? h : base.replace("<svg", `<svg data-g="${x},${y}"`); };
      return { name: `${title} ${si + 1}`, lasse: "ida", i5own: true, pal: { "--bg": floors[si], "--bg-2": "#ffffff", "--floor-a": kCalm(floors[si]), "--floor-b": kCalm(floors[si]) },
        floor: kFloor(floors[si], (x, y) => pick(x, y, 1, 6) === 0 ? `<circle cx="30" cy="40" r="2.4" fill="${c}" opacity=".35"/>` : ""),
        wall, deco: () => "", extras: () => "" }; });
    const [ein, mehr] = NAMEN[item];
    THEMES[key] = {
      title, worldName: title, emblem: `i5em-${item}`, box: `i5${item}-0`, rolls: false, squish: false, boxWord: mehr, pushWord: "Schübe",
      hint: `Schieb ${JEDE[item]} ${ein} auf ein Feld mit Herz. ${mehr} lassen sich nur schieben, nicht ziehen.`,
      winTitle: ["SUPER!", "TOLL!", "JUCHHU!", "KLASSE!"][wi % 4], winText: (m, p) => `Geschafft! ${m} Schritte, ${p} Schübe.`,
      confetti: ["#ff8fb1", "#ffd23a", "#b9a6f2", "#9fd8ff"],
      prize: { symbol: "i5preis", title: "Goldener Stern!", text: (m) => `Welt „${title}“ geschafft! Finale in ${m} Schritten.` },
      pal: { ...PAL5, "--bg": floors[0], "--bg-2": "#ffffff", "--floor-a": floors[0], "--floor-b": floors[0] }, target: platz, scenes,
      levelScenes: [0, 0, 1, 1, 2, 2].map(i => scenes[i]),
      levelName: () => title, levelBox: () => `i5${item}-0`, boxCycle: () => PL.map((_, i) => `i5${item}-${i}`)
    };
  });
}
