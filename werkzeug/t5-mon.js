// ===================== Idas Welt: eigene Fantasie-Monster statt fremder Figuren =====================
// Jedes Monster wird aus seinem Namen erzeugt: Typ (Wasser, Pflanze, Blitz, Feuer, Stein, Kampf, Psycho, Flug) bestimmt Farbe, Ohren und Schwanz.
const MON_TYP = { schiggy: "wasser", karpador: "wasser", enton: "wasser", sterndu: "wasser", bisasam: "pflanze", myrapla: "pflanze", endivie: "pflanze", raupy: "pflanze",
  pikachu: "blitz", pichu: "blitz", magnetilo: "blitz", glumanda: "feuer", glutexo: "feuer", glurak: "feuer", onix: "stein", kleinstein: "stein",
  lucario: "kampf", machollo: "kampf", mewtu: "psycho", psiana: "psycho", taubsi: "flug" };
const MON_FARBE = { wasser: ["#6ec6e8", "#e6f7ff"], pflanze: ["#86c96e", "#eaf8df"], blitz: ["#b9a6f2", "#f3eeff"], feuer: ["#f2875a", "#ffe8d6"], stein: ["#aaa49a", "#ecebe6"],
  kampf: ["#e3a05c", "#fff0de"], psycho: ["#f0a8d8", "#fff0fa"], flug: ["#d9c08a", "#fbf5e6"] };
const monHash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
function MON(name, size = 1) {
  const typ = MON_TYP[name] || ["wasser", "pflanze", "blitz", "feuer", "stein", "kampf", "psycho", "flug"][monHash(name) % 8];
  const [c, b] = MON_FARBE[typ], h = monHash(name), r = 24 + (h % 5), O = `stroke="#2d3036" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const ohren = { wasser: `<path d="M30 46q-14-4-12-16 10 0 16 10zM70 46q14-4 12-16-10 0-16 10z" fill="${c}" ${O}/>`,
    pflanze: `<path d="M50 34q-4-18 10-24 4 14-10 24z" fill="#5fae4a" ${O}/><path d="M55 22l-4 10" stroke="#3f8a32" stroke-width="1.6"/>`,
    blitz: `<path d="M50 34v-14" stroke="#2d3036" stroke-width="2.4"/><path d="M50 8l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffe680" ${O}/>`,
    feuer: `<path d="M44 36q-6-14 6-24 0 8 6 10-2-6 4-10 4 14-6 24z" fill="#ffb03a" ${O}/>`,
    stein: `<path d="M38 38l4-14 8 10 8-12 4 16z" fill="#8fd0e8" ${O}/>`,
    kampf: `<path d="M28 44h44" stroke="#e2402f" stroke-width="6"/><path d="M72 44l10 6M72 44l8-6" stroke="#e2402f" stroke-width="4" stroke-linecap="round"/>`,
    psycho: `<path d="M36 40q-4-14 4-18 6 6 4 16zM64 40q4-14-4-18-6 6-4 16z" fill="${c}" ${O}/><circle cx="50" cy="44" r="3.6" fill="#8b5cf6" ${O}/>`,
    flug: `<path d="M24 62q-14-10-8-22 12 4 14 16zM76 62q14-10 8-22-12 4-14 16z" fill="#f4f1ea" ${O}/>` }[typ];
  const schwanz = { wasser: `<path d="M74 78q16-2 14-16-8 8-14 8z" fill="${c}" ${O}/>`, pflanze: `<path d="M74 80q14 0 16-12-10 2-16 6z" fill="#5fae4a" ${O}/>`,
    blitz: `<path d="M74 80q12-2 12-12" stroke="#2d3036" stroke-width="2.4" fill="none"/><circle cx="86" cy="66" r="4" fill="#ffe680" ${O}/>`,
    feuer: `<path d="M74 80q14-2 12-16" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M86 66q-4-8 2-12 0 6 4 6-2 6-6 6z" fill="#ffb03a"/>`,
    stein: "", kampf: "", psycho: `<path d="M74 80q16 2 16-14" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`, flug: "" }[typ];
  const augenAbstand = 9 + (h % 3), mund = h % 2 ? `<path d="M45 70q5 5 10 0" stroke="#2d3036" stroke-width="2" fill="none" stroke-linecap="round"/>` : `<path d="M46 69q4 6 8 0z" fill="#c0392b" ${O}/>`;
  return `<g transform="translate(50 56) scale(${size}) translate(-50 -56)">${schwanz}${ohren}
    <ellipse cx="50" cy="${66 - r / 6}" rx="${r}" ry="${r - 2}" fill="${c}" ${O}/><ellipse cx="50" cy="${72 - r / 8}" rx="${r * .6}" ry="${r * .5}" fill="${b}"/>
    <ellipse cx="38" cy="90" rx="8" ry="4" fill="${c}" ${O}/><ellipse cx="62" cy="90" rx="8" ry="4" fill="${c}" ${O}/>
    ${[-1, 1].map(d => `<ellipse cx="${50 + d * augenAbstand}" cy="58" rx="4.2" ry="5" fill="#2d3036"/><circle cx="${50 + d * augenAbstand + 1.4}" cy="56.4" r="1.6" fill="#ffffff"/>`).join("")}
    <ellipse cx="${50 - augenAbstand - 5}" cy="65" rx="3.4" ry="2" fill="#ff8fb1" opacity=".7"/><ellipse cx="${50 + augenAbstand + 5}" cy="65" rx="3.4" ry="2" fill="#ff8fb1" opacity=".7"/>${mund}</g>`;
}
const MON1 = (name) => `<g class="poke">${MON(name)}</g>`;
// Eigene Fangkugel: helle Kapsel, farbige Kappe mit Stern, keine Mittelband-Knopf-Optik
const FANGKUGEL = (cap = "#e2402f") => `<circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="${cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/><ellipse cx="36" cy="52" rx="5" ry="3" fill="#ffffff" opacity=".8"/>`;
