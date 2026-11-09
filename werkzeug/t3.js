// ===================== Teil 3 · Christians Welt =====================
// Christian (von heute) als Hauptfigur: Körper wie der Comic-Lasse, Kopf von Christian; Kopfbedeckungen leicht angepasst.
function kChristian(o) {
  const svg = kLasse({ ...o, head: "", hair: false });
  const a = svg.indexOf('<g transform="rotate(-6 50 28)">'), b = svg.lastIndexOf("</g>\n  </g>\n</svg>");
  // etwas größere Nase als in Teil 1 und 2
  const nose = `<path d="M50 27q-6 9-3 12 3 2.4 7 .4" fill="#efc09c" stroke="#b97c5a" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`;
  const head = `<g transform="translate(50 27) scale(.92) translate(-50 -27)">${christianHead(50, 27).replace(/<path d="M50 30q-3 6-1 8 2 1 4 0"[^>]*\/>/, nose)}</g>` +
    (o.head ? `<g transform="translate(0 3)">${o.head}</g>` : "");
  return svg.slice(0, a) + head + "\n    " + svg.slice(b);
}
const hsvScarf = `<path d="M38 44q12 8 24 0l-2 6q-10 5-20 0z" fill="#0a5cb0" ${kO2}/><path d="M44 48l-4 18h7l2-16" fill="#0a5cb0" ${kO2}/>${[54, 60].map(y => `<path d="M${41 - (y - 54) * .2} ${y}h6" stroke="#ffffff" stroke-width="2.4"/>`).join("")}<path d="M41 66h6" stroke="${KI}" stroke-width="2.4"/>`;
Object.assign(LASSE, {
  // Bolzplatz: HSV-Trikot der 2000er, Schweißband
  c_bolz: kChristian({ shirt: "#ffffff", pants: "#e2402f", shoes: KI, body: `<g transform="translate(57 52)">${kRaute}</g><path d="M36 50h28" stroke="#e2402f" stroke-width="2"/>`, hand: `<rect x="27" y="62" width="8" height="5" rx="2" fill="#0a5cb0" ${kO2}/>` }),
  // Volksparkstadion: blaue Trainingsjacke, Fanschal
  c_stadion: kChristian({ shirt: "#0a5cb0", pants: "#33507f", shoes: "#ffffff", body: `<path d="M50 44v24" stroke="#ffffff" stroke-width="1.6"/>${hsvScarf}` }),
  // Fankurve: schwarzer Kapuzenpulli, Trommel
  c_kurve: kChristian({ shirt: "#2d3036", pants: "#33507f", shoes: "#ffffff", body: `<g transform="translate(57 54)">${kRaute}</g>${hsvScarf}`,
    hand: `<ellipse cx="80" cy="74" rx="11" ry="5" fill="#f4f1ea" ${kO2}/><path d="M69 74v10q11 6 22 0V74" fill="#0a5cb0" ${kO2}/><path d="M72 60l10 10" stroke="#c9935a" stroke-width="3" stroke-linecap="round"/>` })
});
// Überall, wo sonst Lasse steht (Karte, Spielerliste), steht Christian
LASSE.fussball = LASSE.c_bolz; LASSE.avatar = LASSE.c_bolz;
Object.assign(OUTFIT, { "Bolzplatz": "c_bolz", "Volksparkstadion": "c_stadion", "Fankurve": "c_kurve" });

// ---------- Welt 1: Bolzplatz · Volksparkstadion · Fankurve ----------
{
  const fan = (x, y, shirt, scarfUp) => `<g class="fan">${kPerson(["#7a5233", "#f3c93f", KI, "#c9631f"][pick(x, y, 1, 4)], shirt, scarfUp)}</g>`;
  const scarfRow = (y) => `<path d="M6 ${y}h88" stroke="#0a5cb0" stroke-width="9"/>${[14, 34, 54, 74].map(x => `<path d="M${x} ${y - 4}h8v8h-8z" fill="#ffffff"/>`).join("")}<path d="M6 ${y}h88" stroke="${KI}" stroke-width="1" opacity=".4"/>`;
  const FK = [
    (x, y) => kB("#1b2a6b", `${fan(x, y, "#0a5cb0", 30)}${fan(x + 3, y, "#ffffff", 70)}<path d="M18 40l12-24M82 40L70 16" stroke="${KI}" stroke-width="2"/><path d="M30 16l20 6-20 6zM70 16l-20 6 20 6z" fill="#0a5cb0" ${kO2}/>`),
    () => kB("#ffffff", `<rect x="4" y="4" width="92" height="31" fill="#0a5cb0"/><rect x="4" y="35" width="92" height="30" fill="#ffffff"/><rect x="4" y="65" width="92" height="31" fill="${KI}"/><g transform="translate(50 50) scale(2.4)">${kRaute}</g>`),
    () => kB("#1b2a6b", `${scarfRow(30)}${scarfRow(56)}${scarfRow(82)}`),
    () => kB("#1b2a6b", `<ellipse cx="50" cy="40" rx="30" ry="12" fill="#f4f1ea" ${kO}/><path d="M20 40v30q30 16 60 0V40" fill="#0a5cb0" ${kO}/><path d="M22 52l28 18 28-18" fill="none" stroke="#ffffff" stroke-width="2.4"/><path d="M30 12l12 22M72 10L60 32" stroke="#c9935a" stroke-width="4" stroke-linecap="round"/>`),
    (x, y) => kB("#1b2a6b", `${[18, 50, 82].map((cx, i) => `<g class="fan" style="animation-delay:${i * .3}s"><path d="M${cx - 12} 96q0-24 12-24t12 24z" fill="${["#0a5cb0", "#ffffff", KI][(i + pick(x, y, 2, 3)) % 3]}" ${kO2}/><circle cx="${cx}" cy="60" r="9" fill="#f6cfae" ${kO2}/><path d="M${cx - 10} 70l-6-26M${cx + 10} 70l6-26" stroke="#f6cfae" stroke-width="4" stroke-linecap="round"/></g>`).join("")}<path d="M8 22h84" stroke="#0a5cb0" stroke-width="8"/>${[16, 36, 56, 76].map(xx => `<path d="M${xx} 18h8v8h-8z" fill="#fff"/>`).join("")}`),
    () => kB("#1b2a6b", `<path d="M14 92V30M14 30l60 10-60 14" fill="#ffffff" stroke="${KI}" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 30l60 10-60 14z" fill="#0a5cb0" opacity=".9"/><path d="M14 42l60-2" stroke="#ffffff" stroke-width="4"/><circle cx="76" cy="70" r="10" fill="#ff8a1a" opacity=".85"/><circle cx="76" cy="70" r="5" fill="#ffd23a"/>`)
  ];
  const FANKURVE = kScene("Fankurve", "fussball", PAL("#0b1640", "#1d2f6b", "#d6e2ff", "#ffffff"),
    kFloor("#a7adb5", "#a7adb5", (x, y) => `<path d="M0 34h100M0 68h100" stroke="#868c95" stroke-width="3"/><path d="M0 37h100M0 71h100" stroke="#c4c9d0" stroke-width="1.6"/>`),
    FK, () => bunting(["#0a5cb0", "#ffffff", "#2d3036"]));
  BASE_WALL["Fankurve"] = ["paneel", "#0a5cb0"];
  const F = THEMES.fussball;
  const bolz = F.scenes.find(sc => sc.name === "Bolzplatz"), volks = F.scenes.find(sc => sc.name === "Volksparkstadion");
  F.scenes = [bolz, volks, FANKURVE];
  F.levelName = (l) => ["Bolzplatz", "Bolzplatz", "Volksparkstadion", "Volksparkstadion", "Fankurve", "Fankurve"][l];
  F.prize = { symbol: "pokal", title: "Der Pott!", text: (m) => `Meister im Volkspark, Schristian! Finale in ${m} Schritten.` };
}

// ---------- Startseite: Christian groß im Y2K-Glanz ----------
const CHRISTIAN_HERO = `<svg viewBox="0 0 240 200" overflow="visible">
  <defs><radialGradient id="t3glow" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient></defs>
  <circle cx="120" cy="110" r="96" fill="url(#t3glow)"/>
  ${[[30, 40, 9], [205, 50, 12], [40, 160, 7], [210, 150, 8], [120, 12, 6]].map(([x, y, r]) => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="#fff6a0" stroke="#2d3036" stroke-width="1.6"/>`).join("")}
  <g transform="translate(40 8) scale(1.6)">${LASSE.c_bolz.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</g></svg>`;
{ const baseRP = renderPlayers; renderPlayers = function () { baseRP(); const h = document.getElementById("hero"); h.classList.remove("family"); h.classList.add("t3hero"); h.innerHTML = CHRISTIAN_HERO; }; }

// ---------- Welt 2: Musikalische Hunde (Playlist „Bello wuff wuff“) – ein Lied pro Level ----------
{
  // Comic-Hund im Sitzen: Fell, Ohrform, Flecken und Zubehör frei wählbar (Koordinaten 0–100)
  const dog = ({ fur = "#c9935a", dark = "#8a5a2b", ears = "flop", belly = "#f4e6cf", spot = false, mouth = "smile", acc = "", under = "", s = 1, x = 50, y = 52 }) => {
    const E = ears === "up" ? `<path d="M32 30l-4-22 16 14zM68 30l4-22-16 14z" fill="${dark}" ${kO2}/><path d="M33 26l-2-12 8 8zM67 26l2-12-8 8z" fill="#f2b5a8"/>`
      : ears === "big" ? `<path d="M34 32L12 6l30 18zM66 32L88 6 58 24z" fill="${fur}" ${kO2}/><path d="M33 28L18 12l18 12zM67 28L82 12 64 24z" fill="#f2b5a8"/>`
      : ears === "fluff" ? `<circle cx="28" cy="36" r="11" fill="${fur}" ${kO2}/><circle cx="72" cy="36" r="11" fill="${fur}" ${kO2}/><circle cx="50" cy="14" r="11" fill="${fur}" ${kO2}/>`
      : `<path d="M30 26q-12 4-10 22 6 4 12-2z" fill="${dark}" ${kO2}/><path d="M70 26q12 4 10 22-6 4-12-2z" fill="${dark}" ${kO2}/>`;
    const M = mouth === "bark" ? `<path d="M42 52q8 10 16 0-2-4-8-4t-8 4z" fill="#8a2f2a" ${kO2}/><path d="M46 56q4 4 8 0" fill="#ef7f7a"/>`
      : mouth === "howl" ? `<ellipse cx="50" cy="54" rx="5" ry="6" fill="#8a2f2a" ${kO2}/>`
      : `<path d="M42 50q8 6 16 0" fill="none" stroke="${KI}" stroke-width="2"/><path d="M48 52q2 8 6 0" fill="#ef7f7a" ${kO2}/>`;
    return `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -52)">${under}
      <ellipse cx="50" cy="84" rx="22" ry="14" fill="${fur}" ${kO}/><ellipse cx="50" cy="86" rx="11" ry="9" fill="${belly}"/>
      <ellipse cx="38" cy="96" rx="7" ry="4" fill="${fur}" ${kO2}/><ellipse cx="62" cy="96" rx="7" ry="4" fill="${fur}" ${kO2}/>
      ${E}<path d="M30 38q0-20 20-20t20 20q0 20-20 20T30 38z" fill="${fur}" ${kO}/>
      ${spot ? `<path d="M54 22q12 0 15 12-8 2-15-4z" fill="${dark}"/>` : ""}
      <ellipse cx="50" cy="46" rx="11" ry="8" fill="${belly}" ${kO2}/><ellipse cx="50" cy="41" rx="4" ry="3" fill="${KI}"/>
      <circle cx="42" cy="33" r="2.6" fill="${KI}"/><circle cx="58" cy="33" r="2.6" fill="${KI}"/><circle cx="43" cy="32" r=".9" fill="#fff"/><circle cx="59" cy="32" r=".9" fill="#fff"/>
      ${M}${acc}</g>`;
  };
  const shades = (y = 31) => `<path d="M37 ${y - 3}h11v4q0 3-3 3h-5q-3 0-3-3zM52 ${y - 3}h11v4q0 3-3 3h-5q-3 0-3-3z" fill="${KI}"/><path d="M48 ${y - 2}h4" stroke="${KI}" stroke-width="2"/><path d="M39 ${y - 2}l3 2" stroke="#fff" stroke-width="1.2"/>`;
  const sombrero = (y = 18, c = "#e2402f") => `<ellipse cx="50" cy="${y}" rx="32" ry="6" fill="#f2c94c" ${kO2}/><path d="M38 ${y - 1}q2-16 12-16t12 16z" fill="#f2c94c" ${kO2}/><path d="M38 ${y - 4}h24" stroke="${c}" stroke-width="3"/>`;
  const bubble = (x, y) => `<path d="M${x} ${y}q0-8 10-8h8q10 0 10 8t-10 8h-6l-6 6 1-6q-7-1-7-8z" fill="#fff" ${kO2}/><path d="M${x + 7} ${y - 2}l3 5 3-5 3 5 3-5" fill="none" stroke="${KI}" stroke-width="1.8"/>`;
  const star = (x, y, r, c = "#fff6a0") => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="${c}" ${kO2}/>`;
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a"];
  // Schallplatte: schwarze Rille, farbiges Etikett, Loch, Glanz
  document.querySelector("svg defs").insertAdjacentHTML("beforeend",
    PL.map((c, i) => `<symbol id="k3platte-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="92" rx="32" ry="5" fill="#0003"/>
      <circle cx="50" cy="52" r="38" fill="#1d1d24" ${kO}/>${[33, 27, 21].map(r => `<circle cx="50" cy="52" r="${r}" fill="none" stroke="#3a3a46" stroke-width="1.6"/>`).join("")}
      <circle cx="50" cy="52" r="14" fill="${c}" ${kO2}/><circle cx="50" cy="52" r="3" fill="#f4f1ea" ${kO2}/><path d="M28 36q8-10 20-12" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".45"/>
      <path d="M44 46q4-3 8-2" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/></symbol>`).join("") +
    `<symbol id="k3pfote" viewBox="0 0 100 100"><ellipse cx="50" cy="62" rx="20" ry="17" fill="#c9935a" ${kO}/>${[[26, 38], [42, 26], [58, 26], [74, 38]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="10" fill="#c9935a" ${kO2}/>`).join("")}</symbol>
     <symbol id="k3goldplatte" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>${[34, 27, 20].map(r => `<circle cx="50" cy="50" r="${r}" fill="none" stroke="#c99a00" stroke-width="1.6"/>`).join("")}<circle cx="50" cy="50" r="12" fill="#fff6c8" stroke="#9a6404" stroke-width="2"/><circle cx="50" cy="50" r="3" fill="#9a6404"/></symbol>`);
  const plattenspieler = kTarget(`${kGlow(`<rect x="10" y="16" width="80" height="70" opacity="0"/>`)}<rect x="10" y="18" width="80" height="68" rx="8" fill="none" stroke="#ffd23a" stroke-width="4" stroke-dasharray="9 6"/><circle cx="46" cy="52" r="26" fill="none" stroke="#ffd23a" stroke-width="3"/><circle cx="46" cy="52" r="4" fill="#ffd23a"/><path d="M80 24v34l-12 10" stroke="#ffd23a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`);

  // Christian je Lied
  Object.assign(LASSE, {
    h_beach: kChristian({ shirt: "#ff8a1a", pants: "#f2e3c6", shoes: "#2b5fd9", body: `${[[42, 52], [56, 50], [48, 62], [60, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ffd23a" ${kO2}/>`).join("")}`, head: shades(28) }),
    h_fiesta: kChristian({ shirt: "#3fae4a", pants: "#33507f", shoes: "#8a5a2b", body: `<path d="M36 50h28M36 56h28M36 62h28" stroke="#e2402f" stroke-width="3"/><path d="M36 53h28M36 59h28" stroke="#ffd23a" stroke-width="2"/>`, hand: `<g transform="translate(70 56)"><ellipse cx="6" cy="0" rx="6" ry="8" fill="#e2402f" ${kO2}/><path d="M6 8v8" stroke="#8a5a2b" stroke-width="3"/></g>`, head: sombrero(12) }),
    h_punk: kChristian({ shirt: KI, pants: "#33507f", shoes: KI, body: `<path d="M44 44l6 10 6-10" fill="#e2402f" ${kO2}/>${[[40, 50], [60, 50], [40, 58], [60, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#c9ced8"/>`).join("")}`, hand: `<path d="M70 70l16-30" stroke="#a8743f" stroke-width="4"/><path d="M66 74q-4-10 6-12 8 2 4 12-4 6-10 0z" fill="#e2402f" ${kO2}/>` }),
    h_kirmes: kChristian({ shirt: "#ff5fa2", pants: KI, shoes: "#ffffff", body: `${[[40, 50], [56, 48], [46, 58], [60, 62], [38, 64]].map(([x, y]) => star(x, y, 3, "#ffffff")).join("")}`, head: `<path d="M33 24q0-22 17-22t17 22" fill="none" stroke="${KI}" stroke-width="4"/><rect x="29" y="18" width="9" height="13" rx="4" fill="#4fd1ff" ${kO2}/><rect x="62" y="18" width="9" height="13" rx="4" fill="#4fd1ff" ${kO2}/>` }),
    h_west: kChristian({ shirt: "#ffffff", pants: "#2b3a67", shoes: "#ffffff", body: `<path d="M42 44q8 12 16 0" fill="none" stroke="#ffd23a" stroke-width="2.6"/><circle cx="50" cy="56" r="3" fill="#ffd23a" ${kO2}/>`, head: `<path d="M34 16q0-14 16-14t16 14z" fill="#2b5fd9" ${kO}/><path d="M30 16h36l-2 4H34z" fill="#2b5fd9" ${kO2}/>` + shades(28) }),
    h_miami: kChristian({ shirt: "#f4f1ea", pants: "#f4f1ea", shoes: "#c9935a", body: `<path d="M44 44l6 14 6-14" fill="#4fd1c5" ${kO2}/><path d="M38 46l8 20M62 46l-8 20" stroke="#c9c4ba" stroke-width="2"/>`, head: shades(28) })
  });

  // Wandbilder je Lied (ohne Schrift); dazu die übrigen sechs Lieder der Playlist als Bilder
  const pad = (bg, inner) => kB(bg, inner);
  const W1 = [ // Who Let The Dogs Out – Strandparty 2000
    () => pad("#4fd1ff", `${dog({ fur: "#c9935a", mouth: "bark", s: .8, x: 32, y: 56 })}${dog({ fur: "#f4f1ea", dark: "#c9c4ba", mouth: "bark", s: .8, x: 70, y: 56 })}${bubble(54, 16)}`),
    () => pad("#2b3a67", `<path d="M50 4v20" stroke="#c9ced8" stroke-width="2"/><circle cx="50" cy="50" r="26" fill="#c9ced8" ${kO}/>${[[40, 38], [52, 34], [62, 42], [44, 52], [58, 56], [48, 64], [36, 60]].map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#fff" opacity=".8"/>`).join("")}${[[14, 20], [86, 30], [20, 84], [82, 80]].map(([x, y]) => star(x, y, 5)).join("")}`),
    () => pad("#ffd36b", `<path d="M30 90q6-40 24-60" stroke="#8a5a2b" stroke-width="6" fill="none"/>${[-50, -20, 10, 40].map(a => `<path d="M54 30q${Math.cos(a / 57) * 30} ${Math.sin(a / 57) * 20 - 6} ${Math.cos(a / 57) * 38} ${Math.sin(a / 57) * 26 + 10}" stroke="#3fae4a" stroke-width="8" fill="none" stroke-linecap="round"/>`).join("")}<circle cx="80" cy="24" r="10" fill="#ffd23a" ${kO2}/>`),
    () => pad("#ff8fb1", `<rect x="14" y="30" width="72" height="44" rx="6" fill="#c9ced8" ${kO}/><circle cx="34" cy="52" r="12" fill="${KI}"/><circle cx="66" cy="52" r="12" fill="${KI}"/><circle cx="34" cy="52" r="5" fill="#9aa3b1"/><circle cx="66" cy="52" r="5" fill="#9aa3b1"/><path d="M28 30q22-16 44 0" fill="none" stroke="${KI}" stroke-width="4"/>`),
    () => pad("#ffe3f1", `${dog({ fur: "#f2b65a", s: .85, y: 58, acc: "" })}<path d="M72 10q-10 0-10 10 0 8 10 14 10-6 10-14 0-10-10-10z" fill="#e2402f" ${kO2}/><path d="M72 34v26" stroke="${KI}" stroke-width="1.4"/>`) // Dann schlägt dein Herz
  ];
  const W2 = [ // Chihuahua – Fiesta
    () => pad("#f2c94c", dog({ fur: "#e8b46a", dark: "#c98a3a", ears: "big", s: .82, y: 60, acc: `<g transform="translate(0 -6)">${sombrero(14)}</g>` })),
    () => pad("#3fae4a", `<path d="M50 90V24q0-10 8-10t8 10v66z" fill="#2f8a3a" ${kO}/><path d="M50 50H34V36q0-6 5-6t5 6v8M66 58h12V44q0-6-5-6t-5 6" fill="#2f8a3a" ${kO2}/><circle cx="58" cy="12" r="5" fill="#ff5fa2" ${kO2}/>`),
    () => pad("#ff8a1a", `<g transform="rotate(-20 40 50)"><ellipse cx="40" cy="36" rx="12" ry="16" fill="#e2402f" ${kO}/><path d="M40 52v34" stroke="#8a5a2b" stroke-width="5"/></g><g transform="rotate(20 62 50)"><ellipse cx="62" cy="36" rx="12" ry="16" fill="#2b5fd9" ${kO}/><path d="M62 52v34" stroke="#8a5a2b" stroke-width="5"/></g>`),
    () => pad("#ff5fa2", `<path d="M50 4v16" stroke="${KI}" stroke-width="2"/><path d="M24 30h52l-6 36H30z" fill="#4fd1ff" ${kO}/>${["#ffd23a", "#3fae4a", "#e2402f"].map((c, i) => `<path d="M26 ${40 + i * 9}h48" stroke="${c}" stroke-width="5"/>`).join("")}<path d="M38 66l-4 18M62 66l4 18" stroke="${KI}" stroke-width="3"/>`),
    () => pad("#1d2f6b", `<circle cx="70" cy="26" r="14" fill="#fff6c8" ${kO2}/>${dog({ fur: "#9aa3b1", dark: "#6b7280", ears: "up", mouth: "howl", s: .75, x: 38, y: 60 })}`) // Hijo de la Luna
  ];
  const W3 = [ // Claudia hat 'nen Schäferhund – Punk-Keller
    () => pad("#3a3548", dog({ fur: "#c98a3a", dark: "#2d3036", ears: "up", spot: true, s: .82, y: 58, acc: `<path d="M36 58q14 8 28 0" fill="none" stroke="${KI}" stroke-width="5"/>${[38, 44, 50, 56, 62].map(x => `<path d="M${x} 60l1-5 1 5" fill="#c9ced8"/>`).join("")}` })),
    () => pad("#e2402f", `<g transform="rotate(-30 50 50)"><rect x="46" y="6" width="8" height="48" fill="#a8743f" ${kO2}/><path d="M50 46q-24-2-22 20 2 24 22 24t22-24q2-22-22-20z" fill="${KI}" ${kO}/><path d="M38 62h24" stroke="#c9ced8" stroke-width="3"/></g>`),
    () => pad("#5a5450", `<rect x="16" y="20" width="68" height="66" rx="4" fill="${KI}" ${kO}/><circle cx="50" cy="56" r="20" fill="#3a3a46" ${kO2}/><circle cx="50" cy="56" r="8" fill="#1d1d24"/>${[30, 42, 54, 66].map(x => `<circle cx="${x}" cy="28" r="2.4" fill="#ffd23a"/>`).join("")}`),
    () => pad("#ffd23a", `<path d="M20 12h60v74H20z" fill="#ff5fa2" ${kO}/><path d="M30 30l40 40M70 30L30 70" stroke="${KI}" stroke-width="6"/><circle cx="50" cy="50" r="14" fill="#ffd23a" ${kO2}/>`),
    () => pad("#c9ced8", dog({ fur: "#f4f1ea", dark: "#c9c4ba", s: .82, y: 58, mouth: "smile", acc: `<path d="M38 44h24v12q-12 6-24 0z" fill="none" stroke="${KI}" stroke-width="2.4"/><path d="M44 44v14M50 44v15M56 44v14" stroke="${KI}" stroke-width="1.4"/>` })) // Hunde, die bellen, beißen nicht
  ];
  const W4 = [ // Hundi – Electrolore-Kirmes
    () => pad("#8b5cf6", dog({ fur: "#ffffff", dark: "#ffd6ec", ears: "fluff", s: .8, y: 60, acc: `${[[36, 80], [60, 76], [48, 90]].map(([x, y]) => star(x, y, 4, "#ffd23a")).join("")}` })),
    () => pad("#1d2f6b", `<circle cx="50" cy="46" r="32" fill="none" stroke="#ff5fa2" stroke-width="4"/>${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return `<path d="M50 46L${50 + Math.cos(a) * 32} ${46 + Math.sin(a) * 32}" stroke="#4fd1ff" stroke-width="2"/><rect x="${44 + Math.cos(a) * 32}" y="${42 + Math.sin(a) * 32}" width="12" height="9" rx="2" fill="${["#ffd23a", "#3fae4a", "#e2402f", "#ff8a1a"][i % 4]}" ${kO2}/>`; }).join("")}<path d="M38 92l12-46 12 46" stroke="#c9ced8" stroke-width="4" fill="none"/>`),
    () => pad("#ffe3f1", `<path d="M50 90L44 50" stroke="#c9935a" stroke-width="3"/><circle cx="40" cy="36" r="18" fill="#ff8fb1" ${kO}/><circle cx="54" cy="30" r="14" fill="#ffb3d1" ${kO2}/><circle cx="46" cy="22" r="10" fill="#ffd6ec" ${kO2}/>`),
    () => pad("#2b3a67", `${star(50, 46, 30, "#ff5fa2")}${star(50, 46, 16, "#4fd1ff")}`),
    () => pad("#ff8fb1", `${dog({ fur: "#f2b65a", s: .8, x: 44, y: 60 })}<ellipse cx="80" cy="44" rx="10" ry="16" fill="#c9ced8" ${kO2}/><ellipse cx="80" cy="44" rx="6" ry="11" fill="#9fd8ff"/><path d="M80 60v26" stroke="#8a5a2b" stroke-width="4"/>`) // Bello e impossibile
  ];
  const W5 = [ // Young, Wild & Free – Westküste
    () => pad("#ff8a1a", `<path d="M8 66q4-14 18-14h40q18 0 26 14v12H8z" fill="#e2402f" ${kO}/><circle cx="26" cy="80" r="9" fill="${KI}"/><circle cx="74" cy="80" r="9" fill="${KI}"/>${dog({ fur: "#9aa3b1", dark: "#6b7280", s: .55, x: 52, y: 48, acc: shades(33) })}`),
    () => pad("#4fd1ff", `<circle cx="50" cy="70" r="26" fill="#ffd23a"/><rect x="4" y="70" width="92" height="26" fill="#2b5fd9"/><path d="M8 78h20M40 84h24M70 78h20" stroke="#fff" stroke-width="2.4"/><path d="M76 70q-2-30 6-50" stroke="${KI}" stroke-width="5" fill="none"/>${[-60, -20, 20].map(a => `<path d="M82 20q${Math.cos(a / 57) * 20} ${Math.sin(a / 57) * 12} ${Math.cos(a / 57) * 26} ${Math.sin(a / 57) * 16 + 8}" stroke="#2f8a3a" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}`),
    () => pad("#3fae4a", `<rect x="14" y="44" width="72" height="12" rx="6" fill="#ff5fa2" ${kO}/><circle cx="26" cy="64" r="6" fill="#ffd23a" ${kO2}/><circle cx="74" cy="64" r="6" fill="#ffd23a" ${kO2}/>`),
    () => pad("#ffd36b", `<path d="M10 88h80" stroke="${KI}" stroke-width="3"/>${dog({ fur: "#c9935a", s: .6, x: 66, y: 66 })}<g transform="translate(14 14) scale(.62)">${LASSE.c_stadion.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</g><path d="M38 60q12 4 18 10" stroke="#e2402f" stroke-width="2" fill="none"/>`) // Ich und mein Hund
  ];
  const W6 = [ // Time of Our Lives – Miami-Dach
    () => pad("#2b3352", dog({ fur: "#9aa3b1", dark: "#6b7280", ears: "up", belly: "#e9e6df", s: .82, y: 58, acc: `${shades(34)}<path d="M38 64h24l-4 20H42z" fill="#f4f1ea" ${kO2}/>` })),
    () => pad("#12205e", `${[[30, 30, "#ff5fa2"], [70, 24, "#ffd23a"], [52, 56, "#4fd1ff"]].map(([x, y, c]) => Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M${x} ${y}l${Math.cos(a) * 14} ${Math.sin(a) * 14}" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`; }).join("")).join("")}`),
    () => pad("#5b2a86", `${[[8, 50], [22, 34], [38, 44], [54, 24], [70, 40], [84, 30]].map(([x, h]) => `<rect x="${x}" y="${h}" width="14" height="${92 - h}" fill="#1d1d24" ${kO2}/>${[0, 1, 2].map(k => `<rect x="${x + 4}" y="${h + 8 + k * 12}" width="5" height="5" fill="#ffd23a"/>`).join("")}`).join("")}`),
    () => pad("#4fd1c5", `<rect x="10" y="40" width="80" height="36" rx="6" fill="${KI}" ${kO}/><circle cx="32" cy="58" r="12" fill="#3a3a46" ${kO2}/><circle cx="68" cy="58" r="12" fill="#3a3a46" ${kO2}/>${[42, 48, 54].map(x => `<rect x="${x}" y="48" width="3" height="20" fill="#ff5fa2"/>`).join("")}`),
    () => pad("#1d1d24", dog({ fur: "#6b7280", dark: "#3a3a46", ears: "up", belly: "#c9ced8", s: .82, y: 58, acc: `<path d="M38 64h24l-2 22H40z" fill="#2b3352" ${kO2}/><path d="M50 64v20" stroke="#e2402f" stroke-width="3"/>` })) // The Big Bad Wolf
  ];
  const SC = [
    ["Who Let The Dogs Out", "h_beach", PAL("#bfe9ff", "#f2fbff"), kFloor("#f2d79b", "#f2d79b", (x, y) => pick(x, y, 1, 4) === 0 ? `<path d="M30 60q6-4 12 0" stroke="#d9b56a" stroke-width="2" fill="none"/>` : ""), W1, ["#e2402f", "#ffd23a", "#4fd1ff", "#ff5fa2"], ["bretter", "#c9935a"]],
    ["Chihuahua", "h_fiesta", PAL("#ffe9c8", "#fff6e8"), kFloor("#e8a06a", "#e8a06a", () => `<path d="M0 50h100M50 0v100" stroke="#c9804a" stroke-width="2"/>`), W2, ["#e2402f", "#ffd23a", "#3fae4a", "#ff5fa2", "#4fd1ff"], ["ziegel", "#d98a4a"]],
    ["Claudia hat 'nen Schäferhund", "h_punk", PAL("#1d1d24", "#3a3548", "#e9e6df", "#ffffff"), kFloor("#8a8f99", "#8a8f99", (x, y) => pick(x, y, 1, 5) === 0 ? `<path d="M30 40l10 8-4 10" stroke="#5a5f69" stroke-width="2" fill="none"/>` : ""), W3, ["#e2402f", "#2d3036", "#ffd23a"], ["ziegel", "#4a4448"]],
    ["Hundi", "h_kirmes", PAL("#2a1f5e", "#5b2a86", "#ffe3f1", "#ffffff"), kFloor("#ffd6ec", "#ffd6ec", (x, y) => pick(x, y, 1, 4) === 0 ? `<circle cx="${30 + pick(x, y, 2, 40)}" cy="50" r="3" fill="#ff8fb1"/>` : ""), W4, ["#ff5fa2", "#4fd1ff", "#ffd23a", "#8b5cf6"], ["paneel", "#8b5cf6"]],
    ["Young, Wild & Free", "h_west", PAL("#ffe0b8", "#fff2de"), kFloor("#c9b48a", "#c9b48a", () => `<path d="M0 20h100M0 60h100" stroke="#b39d70" stroke-width="2"/>`), W5, ["#ff8a1a", "#4fd1ff", "#ffd23a"], ["latten", "#e8d7a8"]],
    ["Time of Our Lives", "h_miami", PAL("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), kFloor("#d9dee6", "#d9dee6", () => `<rect x="4" y="4" width="92" height="92" fill="none" stroke="#c4c9d2" stroke-width="2"/>`), W6, ["#ff5fa2", "#4fd1ff", "#ffd23a", "#8b5cf6"], ["paneel", "#2b3352"]]
  ];
  const scenes = SC.map(([name, outfit, pal, floor, walls, bunt, base]) => { BASE_WALL[name] = base; OUTFIT[name] = outfit; return kScene(name, outfit, pal, floor, walls, () => bunting(bunt)); });
  const ids = PL.map((_, i) => `k3platte-${i}`);
  THEMES.hunde = theme2({
    title: "Musikalische Hunde", worldName: "Musikalische Hunde", emblem: "k3pfote", box: "k3platte-0", mapIcon: "k3platte-0", boxWord: "Schallplatten", pushWord: "Schübe",
    hint: "Leg jede Schallplatte auf einen Plattenspieler. Platten lassen sich nur schieben, nicht ziehen.",
    winTitle: "WUFF WUFF!", winText: (m, p) => `Alle Platten laufen. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldplatte", title: "Goldene Schallplatte!", text: (m) => `Die Playlist „Bello wuff wuff“ läuft komplett! Finale in ${m} Schritten.` },
    pal: { "--accent": "#8b5cf6", "--accent-dark": "#5b2a86" },
    target: plattenspieler, levelScenes: scenes, scenes,
    levelName: (l) => SC[l][0], levelBox: () => "k3platte-0", boxCycle: () => ids
  });
}

// Spitzname: ein früher angelegtes Profil „Christian“ heißt jetzt „Schristian“
store.players.forEach(p => { if (p.id === "christian" && p.name === "Christian") { p.name = "Schristian"; save(); } });

// ---------- Welt 3: Reihenendhaus in Langenhorn – Einzug, Renovieren, Garten, Gartenhaus, Grillabend, Hanf-Ecke ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a"];
  const st = (x, y, r, c = "#fff6a0") => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="${c}" ${kO2}/>`;
  const hanf = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">${[-60, -30, 0, 30, 60].map((a, i) => `<path d="M0 0q${Math.sin(a / 57) * 6} -16 ${Math.sin(a / 57) * 20} ${-34 + Math.abs(a) / 3}q${-Math.sin(a / 57) * 2} 14 ${-Math.sin(a / 57) * 20} ${34 - Math.abs(a) / 3}z" fill="${i % 2 ? "#3fae4a" : "#2f8a3a"}" stroke="${KI}" stroke-width="1.4" stroke-linejoin="round"/>`).join("")}</g>`;
  // Geschobene Gegenstände je Schauplatz, jeder in eigener Farbe
  const ITEMS = {
    karton: (c) => `<rect x="14" y="30" width="72" height="54" rx="3" fill="#c9935a" ${kO}/><path d="M14 44h72" stroke="${KI}" stroke-width="2"/><rect x="42" y="26" width="16" height="58" fill="${c}" opacity=".9"/><path d="M14 30l10-10h52l10 10" fill="#d9a870" ${kO2}/><rect x="22" y="56" width="16" height="10" fill="#fff" ${kO2}/>`,
    eimer: (c) => `<path d="M24 34h52l-6 50H30z" fill="#c9ced8" ${kO}/><ellipse cx="50" cy="34" rx="26" ry="7" fill="${c}" ${kO}/><path d="M26 40h48" stroke="${c}" stroke-width="6"/><path d="M60 36q4 14 0 22" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M24 34q26-30 52 0" fill="none" stroke="${KI}" stroke-width="2.4"/>`,
    topf: (c) => `<path d="M28 56h44l-6 32H34z" fill="#c8643c" ${kO}/><rect x="25" y="50" width="50" height="9" rx="3" fill="#d9744c" ${kO2}/><path d="M50 50V28" stroke="#2f8a3a" stroke-width="3"/><path d="M50 40q-12-4-14-12 10 0 14 8M50 36q12-4 14-12-10 0-14 8" fill="#3fae4a" ${kO2}/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${50 + Math.cos(a / 57) * 7}" cy="${22 + Math.sin(a / 57) * 7}" rx="6" ry="6" fill="${c}" ${kO2}/>`).join("")}<circle cx="50" cy="22" r="4" fill="#ffd23a" ${kO2}/>`,
    kanne: (c) => `<path d="M26 44h40v38q0 4-4 4H30q-4 0-4-4z" fill="${c}" ${kO}/><path d="M66 56l22-20" stroke="${c}" stroke-width="7" stroke-linecap="round"/><path d="M66 56l22-20" stroke="${KI}" stroke-width="1.4" opacity=".5"/><path d="M84 32l8 2-4 8z" fill="${c}" ${kO2}/><path d="M30 44q16-20 32 0" fill="none" stroke="${KI}" stroke-width="5"/><path d="M30 52h32" stroke="#fff" stroke-width="2" opacity=".5"/>`,
    kuehlbox: (c) => `<rect x="14" y="36" width="72" height="48" rx="8" fill="${c}" ${kO}/><rect x="10" y="28" width="80" height="14" rx="6" fill="#f4f1ea" ${kO}/><path d="M36 28v-8h28v8" fill="none" stroke="${KI}" stroke-width="4"/><path d="M22 52h56" stroke="#fff" stroke-width="3" opacity=".5"/>`,
    hanf: (c) => `<path d="M30 60h40l-5 28H35z" fill="${c}" ${kO}/><rect x="27" y="54" width="46" height="9" rx="3" fill="${c}" ${kO2}/><path d="M30 60h40" stroke="${KI}" stroke-width="1.4" opacity=".5"/>${hanf(50, 56, .95)}`
  };
  const KINDS = ["karton", "eimer", "topf", "kanne", "kuehlbox", "hanf"];
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", KINDS.map(k => PL.map((c, i) =>
    `<symbol id="k3${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="91" rx="32" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="k3haus" viewBox="0 0 100 100"><path d="M14 50L50 18l36 32v38H14z" fill="#a8473a" ${kO}/><path d="M8 52L50 14l42 38" fill="none" stroke="${KI}" stroke-width="7" stroke-linecap="round"/><rect x="24" y="56" width="18" height="16" fill="#fff" ${kO2}/><rect x="56" y="60" width="16" height="28" fill="#2b5fd9" ${kO2}/></symbol>
     <symbol id="k3schluessel" viewBox="0 0 100 100"><circle cx="32" cy="50" r="20" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><circle cx="32" cy="50" r="8" fill="#fff6c8" stroke="#9a6404" stroke-width="2"/><path d="M50 46h40v8h-6v10h-8V54h-6v8h-8v-8H50z" fill="url(#gold)" stroke="#9a6404" stroke-width="3" stroke-linejoin="round"/></symbol>`);
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="10" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/><path d="M38 52l8 8 16-18" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);

  // Schristian je Schauplatz
  Object.assign(LASSE, {
    w3_einzug: kChristian({ shirt: "#8a97a6", pants: "#33507f", shoes: "#ffffff", body: `<path d="M44 44q6 6 12 0" fill="none" stroke="${KI}" stroke-width="2"/>`, head: `<path d="M34 16q0-14 16-14t16 14z" fill="#e2402f" ${kO}/><path d="M60 14h10l-1 4h-9z" fill="#e2402f" ${kO2}/>` }),
    w3_maler: kChristian({ shirt: "#f4f1ea", pants: "#f4f1ea", shoes: "#9aa3b1", body: `<path d="M40 44v24M60 44v24" stroke="#c9c4ba" stroke-width="3"/>${[[44, 52, "#2b5fd9"], [56, 60, "#ffd23a"], [48, 66, "#e2402f"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${c}"/>`).join("")}`, hand: `<path d="M70 70l10-26" stroke="#a8743f" stroke-width="3"/><rect x="72" y="34" width="18" height="10" rx="3" fill="#2b5fd9" ${kO2}/>`, head: `<path d="M30 18l20-16 20 16z" fill="#f4f1ea" ${kO}/><path d="M36 14h28" stroke="#9aa3b1" stroke-width="1.2"/>` }),
    w3_garten: kChristian({ shirt: "#3fae4a", pants: "#6b5034", shoes: "#3f7a35", body: `<path d="M40 50h20v18H40z" fill="#2f6b4f" ${kO2}/>`, hand: `<path d="M70 72l12-36" stroke="#a8743f" stroke-width="4"/><path d="M78 30l10 3-3 10-10-3z" fill="#c9ced8" ${kO2}/>`, head: `<ellipse cx="50" cy="16" rx="26" ry="6" fill="#e8d7a8" ${kO2}/><path d="M36 15q0-14 14-14t14 14z" fill="#e8d7a8" ${kO2}/><path d="M36 12h28" stroke="#e2402f" stroke-width="3"/>` }),
    w3_gartenhaus: kChristian({ shirt: "#c0392b", pants: "#33507f", shoes: "#8a5a2b", glove: "#f2c94c", body: `<path d="M37 52h26M36 60h28M44 46v22M56 46v22" stroke="#8a231a" stroke-width="2"/>` }),
    w3_grill: kChristian({ shirt: "#ffffff", pants: "#33507f", shoes: KI, body: `<path d="M40 48h20l2 22H38z" fill="${KI}" ${kO2}/><path d="M44 56h12" stroke="#ffd23a" stroke-width="2"/>`, hand: `<path d="M70 70l16-24M74 72l16-24" stroke="#9aa3b1" stroke-width="3" stroke-linecap="round"/><ellipse cx="88" cy="44" rx="6" ry="3" fill="#b5532a" ${kO2}/>` }),
    w3_chill: kChristian({ shirt: "#8b5cf6", pants: "#33507f", shoes: "#ffffff", body: `${[["#e2402f", 46], ["#ffd23a", 52], ["#3fae4a", 58], ["#2b5fd9", 64]].map(([c, y]) => `<path d="M37 ${y}q13 -5 26 0" stroke="${c}" stroke-width="3" fill="none"/>`).join("")}`, head: `<path d="M33 18q0-16 17-16t17 16z" fill="#3a3548" ${kO}/><path d="M33 18h34" stroke="#ff5fa2" stroke-width="3"/>` })
  });

  // Freunde in den Wänden
  const who = (fig, id, bg) => () => asPerson(kB(bg, `<g transform="translate(8 10) scale(.84)">${fig}</g>`), id);
  // Im Reihenendhaus wohnen Schristian, Alex und Enni; zum Grillabend kommen Anna, Lasse, Sören, Ida, Arne und Matze, in die Hanf-Ecke Arne und Matze
  const AL = who(ALEX, "alex", "#ffe3f1"), EN = who(ENNI, "enni", "#e6f5d8"), AN = who(ANNA, "anna", "#fff0d8"), SO = who(SOEREN, "soeren", "#dfeefb"), ID = who(IDA, "ida", "#f3e6ff"), AR = who(ARNE, "arne", "#fff0d8"), MA = who(MATZE, "matze", "#dfeefb");
  const LA = () => asPerson(kB("#fff6c8", `<g transform="translate(14 8) scale(.72)">${LASSE.familie.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</g>`), "lasse");
  // Reihenhaus-Motive (Klinker, weiße Fenster, Giebel), U1 Langenhorn Markt
  const B = (bg, inner) => () => kB(bg, inner);
  const fassade = B("#bfe3ff", `<path d="M10 92V44l40-30 40 30v48z" fill="#a8473a" ${kO}/>${[52, 62, 72, 82].map(y => `<path d="M12 ${y}h76" stroke="#7a2f28" stroke-width="1.2" opacity=".6"/>`).join("")}<rect x="20" y="54" width="20" height="18" fill="#fff" ${kO2}/><path d="M30 54v18M20 63h20" stroke="#9fc7e8" stroke-width="2"/><rect x="58" y="60" width="18" height="32" fill="#2f6b4f" ${kO2}/><circle cx="72" cy="76" r="1.6" fill="#ffd23a"/><path d="M4 46L50 10l46 36" fill="none" stroke="${KI}" stroke-width="6" stroke-linecap="round"/>`);
  const ubahn = B("#d9dee6", `<rect x="22" y="14" width="56" height="56" rx="6" fill="#2b5fd9" ${kO}/><path d="M38 26v22q0 10 12 10t12-10V26" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M50 70v22" stroke="${KI}" stroke-width="5"/>`);
  const moebelwagen = B("#bfe3ff", `<rect x="8" y="30" width="56" height="44" rx="3" fill="#f4f1ea" ${kO}/><path d="M64 44h16l10 14v16H64z" fill="#2b5fd9" ${kO}/><rect x="70" y="48" width="10" height="9" fill="#9fd8ff" ${kO2}/><circle cx="24" cy="78" r="8" fill="${KI}"/><circle cx="76" cy="78" r="8" fill="${KI}"/><path d="M14 44h44" stroke="#e2402f" stroke-width="4"/>`);
  const sofa = B("#f4e6cf", `<rect x="12" y="44" width="76" height="30" rx="8" fill="#2b5fd9" ${kO}/><rect x="18" y="32" width="64" height="20" rx="8" fill="#3d6fe0" ${kO2}/><path d="M18 74v8M82 74v8" stroke="${KI}" stroke-width="4"/><rect x="24" y="50" width="22" height="14" rx="4" fill="#ffd23a" ${kO2}/>`);
  const briefkasten = B("#a8473a", `${[24, 44, 64, 84].map(y => `<path d="M4 ${y}h92" stroke="#7a2f28" stroke-width="1.2" opacity=".6"/>`).join("")}<rect x="28" y="30" width="44" height="34" rx="4" fill="#2f6b4f" ${kO}/><rect x="36" y="38" width="28" height="5" rx="2" fill="${KI}"/><circle cx="50" cy="54" r="3" fill="#ffd23a" ${kO2}/>`);
  const leiter = B("#e9e4d6", `<path d="M30 92L44 10M70 92L56 10" stroke="#c9ced8" stroke-width="6"/>${[24, 40, 56, 72].map(y => `<path d="M${30 + (92 - y) * .17} ${y}h${40 - (92 - y) * .34}" stroke="#9aa3b1" stroke-width="4"/>`).join("")}<rect x="54" y="20" width="18" height="14" fill="#ffd23a" ${kO2}/>`);
  const tapete = B("#e9e4d6", `<rect x="16" y="22" width="22" height="64" rx="4" fill="#fff6dc" ${kO}/><ellipse cx="27" cy="22" rx="11" ry="4" fill="#f2e3c6" ${kO2}/>${[34, 50, 66].map(y => `<path d="M20 ${y}l14 6" stroke="#ff8fb1" stroke-width="2"/>`).join("")}<path d="M56 30h28v12H56z" fill="#ffd23a" ${kO2}/><path d="M70 42v10M70 52h-4v32h8V52z" fill="#9aa3b1" ${kO2}/>`);
  const bohrer = B("#e9e4d6", `<path d="M20 40h40q8 0 8 10t-8 10H20z" fill="#3fae4a" ${kO}/><path d="M68 50h20" stroke="#9aa3b1" stroke-width="4"/><path d="M30 60l-6 26h18l2-26z" fill="${KI}" ${kO2}/>`);
  const werkzeug = B("#e9e4d6", `<rect x="14" y="44" width="72" height="40" rx="4" fill="#e2402f" ${kO}/><path d="M36 44v-10h28v10" fill="none" stroke="${KI}" stroke-width="5"/><path d="M14 58h72" stroke="${KI}" stroke-width="2"/><path d="M26 30l16 14M70 26l-10 18" stroke="#9aa3b1" stroke-width="4"/>`);
  const schubkarre = B("#bfe3ff", `<path d="M20 44h50l-8 26H28z" fill="#3fae4a" ${kO}/><circle cx="40" cy="80" r="9" fill="${KI}"/><path d="M70 44l20-8M30 70l-8 18M60 70l6 18" stroke="${KI}" stroke-width="4"/><path d="M26 44q20-14 40 0" fill="#7a5233"/>`);
  const zwerg = B("#9ad97a", `<path d="M36 44l14-36 14 36z" fill="#e2402f" ${kO}/><circle cx="50" cy="50" r="12" fill="#f6cfae" ${kO2}/><path d="M38 54q12 20 24 0q-4 14-12 14t-12-14z" fill="#fff" ${kO2}/><path d="M34 92q0-24 16-24t16 24z" fill="#2b5fd9" ${kO2}/>`);
  const beet = B("#7a5233", `${[24, 50, 76].map(x => `<path d="M${x} 60l-5 28h10z" fill="#ff8a1a" ${kO2}/><path d="M${x} 60q-8-14-4-24M${x} 60q8-14 4-24M${x} 60V30" stroke="#3fae4a" stroke-width="3" fill="none"/>`).join("")}`);
  const vogelhaus = B("#bfe3ff", `<path d="M50 92V54" stroke="#8a5a2b" stroke-width="5"/><path d="M26 44L50 22l24 22v18H26z" fill="#c9935a" ${kO}/><path d="M20 46L50 18l30 28" fill="none" stroke="#e2402f" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="48" r="6" fill="${KI}"/>`);
  const gartenhaus = B("#bfe3ff", `<path d="M14 90V46l36-24 36 24v44z" fill="#a8743f" ${kO}/>${[22, 34, 46, 58, 70, 82].map(x => `<path d="M${x} 46v44" stroke="#8a5a2b" stroke-width="1.4"/>`).join("")}<path d="M8 48l42-30 42 30" fill="none" stroke="#2f6b4f" stroke-width="7" stroke-linecap="round"/><rect x="40" y="60" width="20" height="30" fill="#5b3a20" ${kO2}/>`);
  const maeher = B("#9ad97a", `<rect x="20" y="52" width="46" height="22" rx="6" fill="#e2402f" ${kO}/><circle cx="28" cy="78" r="7" fill="${KI}"/><circle cx="58" cy="78" r="7" fill="${KI}"/><path d="M66 56l20-36h6" stroke="${KI}" stroke-width="4" fill="none"/>`);
  const schirm = B("#bfe3ff", `<path d="M12 44q38-40 76 0z" fill="#ffd23a" ${kO}/><path d="M31 44q19-36 0 0M69 44q-19-36 0 0" fill="#ff8a1a"/><path d="M50 44v46" stroke="${KI}" stroke-width="4"/>`);
  const waesche = B("#bfe3ff", `<path d="M6 30q44 14 88 0" stroke="${KI}" stroke-width="2" fill="none"/>${[[18, "#e2402f"], [40, "#2b5fd9"], [62, "#ffd23a"], [80, "#ff8fb1"]].map(([x, c]) => `<path d="M${x - 8} ${34 + (x > 50 ? 100 - x : x) * .1}h16v22h-16z" fill="${c}" ${kO2}/>`).join("")}`);
  const grill = B("#d9c9a8", `<path d="M22 46h56q0 26-28 26T22 46z" fill="${KI}" ${kO}/><path d="M20 46h60" stroke="#9aa3b1" stroke-width="4"/>${[32, 44, 56, 68].map(x => `<rect x="${x - 5}" y="40" width="10" height="5" rx="2.5" fill="#b5532a" ${kO2}/>`).join("")}<path d="M36 72l-8 18M64 72l8 18M50 72v18" stroke="${KI}" stroke-width="3"/><path class="steam" d="M40 34q-4-8 0-14M60 34q-4-8 0-14" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  const lichter = B("#2b3a67", `<path d="M4 26q46 26 92 0" stroke="${KI}" stroke-width="2" fill="none"/>${[14, 30, 46, 62, 78].map((x, i) => `<circle cx="${x}" cy="${30 + Math.sin(i) * 3 + 6}" r="5" fill="${["#ffd23a", "#ff5fa2", "#4fd1ff", "#3fae4a", "#ff8a1a"][i]}" ${kO2}/>`).join("")}<path d="M4 60q46 26 92 0" stroke="${KI}" stroke-width="2" fill="none"/>${[20, 40, 60, 80].map((x, i) => `<circle cx="${x}" cy="${70 - Math.abs(50 - x) / 8}" r="5" fill="${["#4fd1ff", "#ffd23a", "#ff5fa2", "#3fae4a"][i]}" ${kO2}/>`).join("")}`);
  const bierbank = B("#d9c9a8", `<rect x="8" y="44" width="84" height="10" rx="2" fill="#a8743f" ${kO}/><path d="M18 54v30M82 54v30" stroke="#8a5a2b" stroke-width="5"/><rect x="26" y="26" width="10" height="18" rx="2" fill="#ffd23a" fill-opacity=".85" ${kO2}/><rect x="60" y="30" width="22" height="14" rx="4" fill="#fff" ${kO2}/><path d="M64 34h14" stroke="#3fae4a" stroke-width="4"/>`);
  const feuerschale = B("#1d2f6b", `<path d="M22 60h56q-4 20-28 20t-28-20z" fill="#5b3a20" ${kO}/><path class="flame" d="M34 60q-2-20 10-30 0 12 6 14 2-10 10-14-2 16 6 30z" fill="#ff8a1a" ${kO2}/><path d="M42 60q0-10 8-14 6 6 6 14z" fill="#ffd23a"/>${[[16, 20], [84, 14], [70, 30]].map(([x, y]) => st(x, y, 4)).join("")}`);
  const haengematte = B("#1d2f6b", `<path d="M10 20v70M90 20v70" stroke="#8a5a2b" stroke-width="5"/><path d="M10 34q40 40 80 0" fill="#ff8a1a" ${kO}/>${[30, 50, 70].map(x => `<path d="M${x} ${50 - Math.abs(50 - x) / 3}v8" stroke="#ffd23a" stroke-width="3"/>`).join("")}<circle cx="80" cy="14" r="8" fill="#fff6c8" ${kO2}/>`);
  const lava = B("#3a3548", `<path d="M38 20h24l8 54H30z" fill="#ff5fa2" fill-opacity=".85" ${kO}/><ellipse cx="48" cy="40" rx="6" ry="8" fill="#ffd23a"/><ellipse cx="56" cy="58" rx="5" ry="6" fill="#ffd23a"/><path d="M28 74h44l-4 14H32z" fill="#c9ced8" ${kO2}/><path d="M38 20h24l-2-8H40z" fill="#c9ced8" ${kO2}/>`);
  const gitarre = B("#1d2f6b", `<g transform="rotate(-35 50 50)"><rect x="46" y="4" width="8" height="46" fill="#a8743f" ${kO2}/><path d="M50 44q-22-2-22 20 0 24 22 24t22-24q0-22-22-20z" fill="#c9935a" ${kO}/><circle cx="50" cy="66" r="6" fill="${KI}"/></g>`);
  const sterne = B("#12205e", `<circle cx="66" cy="36" r="16" fill="#fff6c8" ${kO2}/><circle cx="74" cy="30" r="14" fill="#12205e"/>${[[20, 24], [34, 60], [80, 74], [16, 80], [50, 14]].map(([x, y]) => st(x, y, 5)).join("")}`);

  const SC = [
    ["Einzug in Langenhorn", "w3_einzug", PAL("#dff1ff", "#f4fbff"), kFloor("#e9cf9f", "#e9cf9f", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#d1b47e" stroke-width="2"/>`), [fassade, ubahn, moebelwagen, sofa, briefkasten], "karton", ["ziegel", "#a8473a"],
      "Bring jeden Umzugskarton an seinen Platz. Kartons lassen sich nur schieben, nicht ziehen."],
    ["Renovieren", "w3_maler", PAL("#f4efe4", "#fbf8f2"), kFloor("#e6e2da", "#e6e2da", (x, y) => pick(x, y, 1, 3) === 0 ? `<circle cx="${30 + pick(x, y, 2, 40)}" cy="${30 + pick(x, y, 3, 40)}" r="3" fill="${["#2b5fd9", "#ffd23a", "#e2402f"][pick(x, y, 4, 3)]}" opacity=".6"/>` : ""), [leiter, tapete, bohrer, werkzeug], "eimer", ["farbe", "#d9cdb8"],
      "Stell jeden Farbeimer an seinen Platz. Eimer lassen sich nur schieben, nicht ziehen."],
    ["Garten anlegen", "w3_garten", PAL("#dff6d8", "#f4fbf0"), kFloor("#8fd16a", "#8fd16a", (x, y) => pick(x, y, 1, 3) === 0 ? `<path d="M30 60l3-8 3 8M60 40l3-8 3 8" stroke="#5fae4a" stroke-width="2" fill="none"/>` : ""), [schubkarre, zwerg, beet, vogelhaus], "topf", ["hecke", "#4f8a3a"],
      "Stell jeden Blumentopf an seinen Platz. Töpfe lassen sich nur schieben, nicht ziehen."],
    ["Gartenhaus", "w3_gartenhaus", PAL("#dff6d8", "#f4fbf0"), kFloor("#9ad97a", "#9ad97a", (x, y) => pick(x, y, 1, 4) === 0 ? `<ellipse cx="50" cy="50" rx="18" ry="12" fill="#c9c4ba" stroke="#a8a294" stroke-width="2"/>` : ""), [gartenhaus, maeher, schirm, waesche], "kanne", ["latten", "#a8743f"],
      "Bring jede Gießkanne an ihren Platz. Kannen lassen sich nur schieben, nicht ziehen."],
    ["Grillabend", "w3_grill", PAL("#ffe0b8", "#fff2de"), kFloor("#d9c9a8", "#d9c9a8", () => `<path d="M0 50h100M50 0v50M25 50v50M75 50v50" stroke="#bfae8a" stroke-width="2"/>`), [grill, lichter, bierbank], "kuehlbox", ["ziegel", "#a8473a"],
      "Stell jede Kühlbox an ihren Platz. Kühlboxen lassen sich nur schieben, nicht ziehen."],
    ["Hanf-Ecke", "w3_chill", PAL("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), kFloor("#bfb08e", "#bfb08e", () => `<path d="M0 50h100M50 0v50M25 50v50M75 50v50" stroke="#a89a78" stroke-width="2"/>`), [feuerschale, haengematte, lava, gitarre, sterne], "hanf", ["hecke", "#2f6b3f"],
      "Stell jeden Hanf-Kübel an seinen Platz. Kübel lassen sich nur schieben, nicht ziehen."]
  ];
  const bunt = [["#e2402f", "#ffffff", "#2b5fd9"], ["#2b5fd9", "#ffd23a", "#e2402f"], ["#3fae4a", "#ffd23a", "#ff8fb1"], ["#3fae4a", "#ffd23a", "#ff8fb1"], ["#ffd23a", "#ff5fa2", "#4fd1ff", "#3fae4a", "#ff8a1a"], ["#ffd23a", "#ff5fa2", "#4fd1ff", "#3fae4a"]];
  // Wer in welchem Schauplatz in den Wänden steht – jede Person genau einmal
  const WHO = [[AL, EN], [AL, EN], [AL, EN], [AL, EN], [AL, EN, AN, LA, SO, ID, AR, MA], [AL, AR, MA]];
  const scenes = SC.map(([name, outfit, pal, floor, walls, kind, base], i) => { BASE_WALL[name] = base; OUTFIT[name] = outfit;
    const sc = kScene(name, outfit, pal, floor, walls, () => bunting(bunt[i])); sc.wall = feierWalls(walls, () => WHO[i].map(f => f())); return sc; });
  THEMES.garten3 = theme2({
    title: "Reihenendhaus", worldName: "Reihenendhaus", emblem: "k3haus", box: "k3karton-0", mapIcon: "k3haus", boxWord: "Sachen", pushWord: "Schübe",
    hint: (l) => SC[l][7],
    winTitle: "ZUHAUSE!", winText: (m, p) => `Alles am Platz. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3schluessel", title: "Goldener Hausschlüssel!", text: (m) => `Das Reihenendhaus in Langenhorn ist fertig! Finale in ${m} Schritten.` },
    pal: { "--accent": "#a8473a", "--accent-dark": "#7a2f28" },
    target: platz, levelScenes: scenes, scenes,
    levelName: (l) => SC[l][0], levelBox: (l) => `k3${SC[l][5]}-0`, boxCycle: (l) => PL.map((_, i) => `k3${SC[l][5]}-${i}`)
  });
}

// ---------- Welt 4: Bauernhof – Stall, Feld, Hofladen (nur Level mit vier Zielen) ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a"];
  const ITEMS = {
    stroh: (c) => `<rect x="12" y="34" width="76" height="48" rx="8" fill="#f0c94a" ${kO}/>${[44, 56, 68].map(y => `<path d="M16 ${y}q34 4 68 0" stroke="#c99a2a" stroke-width="2" fill="none"/>`).join("")}<path d="M34 34v48M66 34v48" stroke="${c}" stroke-width="5"/><path d="M14 40l-6-4M86 40l6-4M14 76l-6 4" stroke="#c99a2a" stroke-width="2"/>`,
    silo: (c) => `<ellipse cx="50" cy="60" rx="34" ry="24" fill="${c}" ${kO}/><ellipse cx="34" cy="60" rx="14" ry="20" fill="color-mix(in srgb, ${c} 75%, #fff)" ${kO2}/><path d="M34 44v32M26 52h16M26 66h16" stroke="color-mix(in srgb, ${c} 60%, #000)" stroke-width="1.6"/><path d="M60 40q14 4 20 18" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>`,
    kanne: (c) => `<path d="M36 22h28v10l8 10v42q0 4-4 4H32q-4 0-4-4V42l8-10z" fill="#c9ced8" ${kO}/><rect x="34" y="14" width="32" height="10" rx="3" fill="${c}" ${kO2}/><path d="M28 54h44" stroke="${c}" stroke-width="7"/><path d="M28 54h44" stroke="${KI}" stroke-width="1.2" opacity=".4"/><path d="M38 30q-14 6-10 20" stroke="${KI}" stroke-width="3" fill="none"/><path d="M40 64v14" stroke="#fff" stroke-width="3" opacity=".6"/>`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(ITEMS).map(k => PL.map((c, i) =>
    `<symbol id="k3hof${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="32" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="k3kuh" viewBox="0 0 100 100"><ellipse cx="50" cy="54" rx="30" ry="26" fill="#ffffff" ${kO}/><path d="M28 40q8 4 6 14-10 0-12-8zM62 60q10-6 16 2-4 10-14 6z" fill="${KI}"/><path d="M24 34l-10-8M76 34l10-8" stroke="#e8d7a8" stroke-width="6" stroke-linecap="round"/><ellipse cx="50" cy="70" rx="16" ry="10" fill="#ffb3c6" ${kO2}/><circle cx="44" cy="70" r="2.4" fill="${KI}"/><circle cx="56" cy="70" r="2.4" fill="${KI}"/><circle cx="40" cy="48" r="3" fill="${KI}"/><circle cx="60" cy="48" r="3" fill="${KI}"/></symbol>
     <symbol id="k3goldglocke" viewBox="0 0 100 100"><path d="M50 10v10" stroke="#9a6404" stroke-width="5"/><path d="M24 74q0-50 26-52 26 2 26 52z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><path d="M18 74h64" stroke="#9a6404" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="82" r="7" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/></symbol>`);
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="10" fill="none" stroke="#fff6a0" stroke-width="5" stroke-dasharray="10 7"/><path d="M30 64q20-30 40 0" stroke="#fff6a0" stroke-width="4" fill="none"/><path d="M26 64h48" stroke="#fff6a0" stroke-width="4"/>`);

  Object.assign(LASSE, {
    hof_stall: kChristian({ shirt: "#c0392b", pants: "#2b5fd9", shoes: "#3f7a35", body: `<path d="M40 48h20v20H40z" fill="#2b5fd9" ${kO2}/><path d="M40 48l-3-6M60 48l3-6" stroke="#2b5fd9" stroke-width="3"/><path d="M40 82h8v8h-8zM52 82h8v8h-8z" fill="#3f7a35"/>`, hand: `<path d="M70 70L86 30" stroke="#a8743f" stroke-width="3.6" stroke-linecap="round"/><path d="M80 32l4-14M85 34l5-13M90 36l5-12M80 32q8 4 15 4" stroke="#9aa3b1" stroke-width="2.4" fill="none" stroke-linecap="round"/>` }),
    hof_feld: kChristian({ shirt: "#2b5fd9", pants: "#33507f", shoes: "#8a5a2b", body: `<path d="M37 52h26M36 60h28M44 46v22M56 46v22" stroke="#1f3f8a" stroke-width="2"/>`, head: `<path d="M34 16q0-14 16-14t16 14z" fill="#3fae4a" ${kO}/><path d="M30 16h36l-2 4H34z" fill="#3fae4a" ${kO2}/>` }),
    hof_laden: kChristian({ shirt: "#ffffff", pants: "#33507f", shoes: KI, body: `<path d="M40 50h20v20H40z" fill="#3fae4a" ${kO2}/><path d="M44 56h12" stroke="#fff" stroke-width="2"/>`, hand: `<path d="M24 58h14l-2 12H26z" fill="#c9935a" ${kO2}/><path d="M26 58q5-8 10 0" stroke="#8a5a2b" stroke-width="2" fill="none"/><ellipse cx="30" cy="58" rx="3" ry="4" fill="#fff6dc"/>` })
  });
  const B = (bg, inner) => () => kB(bg, inner);
  const st = (x, y, r) => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="#fff6a0" ${kO2}/>`;
  const kuh = B("#9ad97a", `<use href="#k3kuh" x="12" y="10" width="76" height="76"/>`);
  const schwein = B("#9ad97a", `<ellipse cx="50" cy="58" rx="30" ry="22" fill="#ffb3c6" ${kO}/><path d="M28 40l-6-12 12 6M72 40l6-12-12 6" fill="#ffb3c6" ${kO2}/><ellipse cx="50" cy="62" rx="10" ry="7" fill="#ff8fb1" ${kO2}/><circle cx="46" cy="62" r="2" fill="${KI}"/><circle cx="54" cy="62" r="2" fill="${KI}"/><circle cx="40" cy="48" r="3" fill="${KI}"/><circle cx="60" cy="48" r="3" fill="${KI}"/><path d="M80 56q8-4 6 6" stroke="#ff8fb1" stroke-width="3" fill="none"/>`);
  const huhn = B("#e8d7a8", `<ellipse cx="50" cy="58" rx="22" ry="20" fill="#ffffff" ${kO}/><circle cx="62" cy="36" r="12" fill="#ffffff" ${kO}/><path d="M58 24q4-8 8 0 4-6 6 2" fill="#e2402f" ${kO2}/><path d="M72 38l10 3-10 3z" fill="#ff8a1a" ${kO2}/><circle cx="64" cy="35" r="2" fill="${KI}"/><path d="M44 78v12M56 78v12" stroke="#ff8a1a" stroke-width="3"/><ellipse cx="26" cy="84" rx="8" ry="6" fill="#fff6dc" ${kO2}/>`);
  const pferd = B("#9ad97a", `<path d="M30 92V60q0-26 20-34l10-12 4 12q16 10 14 34v32z" fill="#8a5a2b" ${kO}/><path d="M40 30q-8 20 0 40" stroke="#3b2418" stroke-width="7" fill="none"/><circle cx="58" cy="44" r="3" fill="${KI}"/><ellipse cx="64" cy="66" rx="10" ry="8" fill="#a8743f" ${kO2}/>`);
  const schaf = B("#9ad97a", `${[[34, 50], [50, 44], [66, 50], [40, 64], [60, 64], [50, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="#f4f1ea" ${kO2}/>`).join("")}<ellipse cx="76" cy="44" rx="9" ry="11" fill="${KI}"/><circle cx="79" cy="42" r="2" fill="#fff"/><path d="M40 74v14M58 74v14" stroke="${KI}" stroke-width="4"/>`);
  const traktor = B("#bfe3ff", `<rect x="40" y="34" width="34" height="30" rx="4" fill="#3fae4a" ${kO}/><rect x="46" y="38" width="20" height="14" fill="#9fd8ff" ${kO2}/><rect x="14" y="48" width="30" height="18" fill="#3fae4a" ${kO}/><circle cx="62" cy="72" r="16" fill="${KI}"/><circle cx="62" cy="72" r="7" fill="#ffd23a"/><circle cx="24" cy="76" r="10" fill="${KI}"/><circle cx="24" cy="76" r="4" fill="#ffd23a"/><path d="M20 48V36" stroke="${KI}" stroke-width="4"/>`);
  const scheuche = B("#f2d79b", `<path d="M50 92V30M24 46h52" stroke="#8a5a2b" stroke-width="5"/><circle cx="50" cy="26" r="12" fill="#f0c94a" ${kO2}/><path d="M34 18h32l-4-10H38z" fill="#2b3a67" ${kO2}/><path d="M36 46h28v26H36z" fill="#e2402f" ${kO2}/><path d="M24 46l-8 6M76 46l8 6" stroke="#f0c94a" stroke-width="3"/><path d="M80 20l6 4" stroke="${KI}" stroke-width="3"/>`);
  const silo = B("#bfe3ff", `<rect x="30" y="20" width="40" height="70" fill="#c9ced8" ${kO}/><path d="M30 20q20-16 40 0" fill="#e2402f" ${kO}/>${[34, 48, 62, 76].map(y => `<path d="M30 ${y}h40" stroke="#9aa3b1" stroke-width="2"/>`).join("")}`);
  const korn = B("#bfe3ff", `${[20, 36, 52, 68, 84].map(x => `<path d="M${x} 92V44" stroke="#c99a2a" stroke-width="3"/>${[30, 38, 46].map(y => `<ellipse cx="${x}" cy="${y}" rx="4" ry="6" fill="#f0c94a" ${kO2}/>`).join("")}`).join("")}`);
  const scheune = B("#bfe3ff", `<path d="M14 92V44l36-26 36 26v48z" fill="#c0392b" ${kO}/><path d="M36 92V60h28v32" fill="#a8301f" ${kO2}/><path d="M36 60l28 32M64 60L36 92" stroke="#fff" stroke-width="3"/><path d="M8 46l42-30 42 30" fill="none" stroke="#fff" stroke-width="4"/>`);
  const eier = B("#f4e6cf", `<rect x="12" y="50" width="76" height="30" rx="4" fill="#c9935a" ${kO}/>${[24, 40, 56, 72].map(x => `<ellipse cx="${x + 4}" cy="48" rx="7" ry="9" fill="${x % 32 ? "#fff6dc" : "#e8c79a"}" ${kO2}/>`).join("")}`);
  const kuerbis = B("#f4e6cf", `${[[32, 64, 18], [66, 66, 16], [50, 42, 14]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="#ff8a1a" ${kO}/><path d="M${x} ${y - r * .8}v-6" stroke="#2f8a3a" stroke-width="3"/><path d="M${x - r / 2} ${y - r * .6}q-4 ${r * .6} 0 ${r * 1.2}M${x + r / 2} ${y - r * .6}q4 ${r * .6} 0 ${r * 1.2}" stroke="#d9741a" stroke-width="1.6" fill="none"/>`).join("")}`);
  const marmelade = B("#f4e6cf", `${[[26, "#e2402f"], [50, "#8b5cf6"], [74, "#ff8a1a"]].map(([x, c]) => `<rect x="${x - 10}" y="44" width="20" height="30" rx="4" fill="${c}" ${kO2}/><rect x="${x - 11}" y="38" width="22" height="8" rx="2" fill="#fff" ${kO2}/><path d="M${x - 11} 42h22" stroke="#e2402f" stroke-width="1.4" stroke-dasharray="3 2"/>`).join("")}`);
  const gemuese = B("#f4e6cf", `<rect x="10" y="56" width="80" height="28" rx="3" fill="#a8743f" ${kO}/>${[[24, "#e2402f"], [40, "#ff8a1a"], [56, "#3fae4a"], [72, "#8b5cf6"]].map(([x, c]) => `<circle cx="${x}" cy="52" r="8" fill="${c}" ${kO2}/>`).join("")}<path d="M10 56h80" stroke="${KI}" stroke-width="2"/>`);
  const hund = B("#9ad97a", `<ellipse cx="50" cy="74" rx="22" ry="14" fill="#2d3036" ${kO}/><path d="M30 38q0-20 20-20t20 20q0 20-20 20T30 38z" fill="#2d3036" ${kO}/><ellipse cx="50" cy="46" rx="10" ry="7" fill="#f4f1ea"/><ellipse cx="50" cy="42" rx="4" ry="3" fill="${KI}"/><circle cx="42" cy="34" r="2.6" fill="#fff"/><circle cx="58" cy="34" r="2.6" fill="#fff"/><path d="M30 28q-10 6-6 18M70 28q10 6 6 18" stroke="#2d3036" stroke-width="7" fill="none" stroke-linecap="round"/>`);
  const SC = [
    ["Stall", "hof_stall", PAL("#f2e3c6", "#fbf4e6"), kFloor("#d9b56a", "#d9b56a", (x, y) => pick(x, y, 1, 3) === 0 ? `<path d="M30 60l12-4M56 40l10 6M40 30l-8 6" stroke="#b8902a" stroke-width="2"/>` : ""), [kuh, schwein, huhn, pferd, schaf], "stroh", ["bretter", "#8a5a2b"],
      "Bring jeden Strohballen an seinen Platz im Stall. Ballen lassen sich nur schieben, nicht ziehen."],
    ["Feld", "hof_feld", PAL("#dff1ff", "#f4fbff"), kFloor("#b88a52", "#b88a52", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#9a7040" stroke-width="3"/>`), [traktor, scheuche, silo, korn, scheune, hund], "silo", ["hecke", "#4f8a3a"],
      "Fahr jeden Siloballen an seinen Platz. Ballen lassen sich nur schieben, nicht ziehen."],
    ["Hofladen", "hof_laden", PAL("#fff3df", "#fffaf2"), kFloor("#e9cf9f", "#e9cf9f", () => `<path d="M0 50h100M50 0v100" stroke="#d1b47e" stroke-width="2"/>`), [eier, kuerbis, marmelade, gemuese, huhn], "kanne", ["latten", "#a8743f"],
      "Stell jede Milchkanne an ihren Platz im Hofladen. Kannen lassen sich nur schieben, nicht ziehen."]
  ];
  const scenes = SC.map(([name, outfit, pal, floor, walls, kind, base]) => { BASE_WALL[name] = base; OUTFIT[name] = outfit; return kScene(name, outfit, pal, floor, walls, () => bunting(["#e2402f", "#ffffff", "#3fae4a"])); });
  const at = (l) => Math.min(2, Math.floor(l / 2));
  THEMES.bauernhof = theme2({
    title: "Bauernhof", worldName: "Bauernhof", emblem: "k3kuh", box: "k3hofstroh-0", mapIcon: "k3kuh", boxWord: "Sachen", pushWord: "Schübe",
    hint: (l) => SC[at(l)][7],
    winTitle: "MUH!", winText: (m, p) => `Alles auf dem Hof an seinem Platz. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldglocke", title: "Goldene Kuhglocke!", text: (m) => `Der Bauernhof läuft, Schristian! Finale in ${m} Schritten.` },
    pal: { "--accent": "#3fae4a", "--accent-dark": "#2f6b3f" },
    target: platz, scenes,
    levelName: (l) => SC[at(l)][0], levelBox: (l) => `k3hof${SC[at(l)][5]}-0`, boxCycle: (l) => PL.map((_, i) => `k3hof${SC[at(l)][5]}-${i}`)
  });
}

// ---------- Welt 4: Scrabble-Steine – jedes Level ein Wort mit vier Buchstaben ----------
{
  const WORDS = ["HANF", "HAND", "HALS", "HERZ", "HAUT", "NASE"];
  const PTS = { A: 1, D: 1, E: 1, F: 4, H: 2, L: 2, N: 1, R: 1, S: 1, T: 1, U: 1, Z: 3 };
  const COL = ["#e2402f", "#2b5fd9", "#2f8a3a", "#8b5cf6"];
  // Scrabble-Stein: Holz, Kante, Buchstabe in eigener Farbe, Punktzahl unten rechts
  const tile = (ch, c) => `<rect x="12" y="16" width="76" height="76" rx="9" fill="#c9a06a" ${kO}/><rect x="12" y="12" width="76" height="72" rx="9" fill="#f2dcae" ${kO}/>
    <path d="M18 20h60" stroke="#fff6dc" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <text x="48" y="66" text-anchor="middle" font-family="Bungee, Arial Black, Impact, sans-serif" font-size="44" fill="${c}" stroke="${KI}" stroke-width="1.6" paint-order="stroke">${ch}</text>
    <text x="77" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="${KI}">${PTS[ch]}</text>`;
  const ids = (l) => [...WORDS[l]].map((ch, i) => `k3sc-${ch}-${i}`);
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", [...new Set(WORDS.flatMap((w) => [...w].map((ch, i) => ch + i)))].map(k =>
    `<symbol id="k3sc-${k[0]}-${k[1]}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="94" rx="34" ry="4" fill="#0003"/>${tile(k[0], COL[+k[1]])}</symbol>`).join(""));
  const T = THEMES.bauernhof;
  // Startbuchstaben so verteilt, dass nach der Lösung aus dem Lösungsbuch das Wort lesbar im Ziel liegt
  // (je Level: Rang des Zielfelds für jeden Stein in Lesereihenfolge; [ungedreht, gedreht])
  const ENDWORT = {"II-57": [[2, 0, 3, 1], [1, 0, 3, 2]], "II-50": [[2, 0, 3, 1], [2, 0, 3, 1]], "II-64": [[0, 1, 2, 3], [3, 1, 0, 2]], "II-62": [[1, 2, 3, 0], [2, 1, 0, 3]], "II-122": [[0, 2, 3, 1], [1, 2, 3, 0]], "II-98": [[0, 2, 1, 3], [3, 1, 2, 0]], "III-72": [[2, 0, 1, 3], [1, 3, 2, 0]], "III-103": [[2, 0, 1, 3], [1, 3, 2, 0]], "III-16": [[2, 3, 0, 1], [2, 3, 0, 1]], "II-45": [[3, 0, 1, 2], [2, 1, 3, 0]], "II-26": [[1, 0, 3, 2], [3, 2, 0, 1]], "III-37": [[2, 3, 0, 1], [2, 3, 0, 1]]};
  const lvId = (l) => { const w = WORLDS.find(x => x.theme === "bauernhof"); return w && w.levels[l] && w.levels[l].n; };
  T.boxCycle = (l) => { const pm = ENDWORT[lvId(l)]; return pm ? pm[ROT ? 1 : 0].map(r => ids(l)[r]) : ids(l); }; T.levelBox = (l) => ids(l)[0]; T.slotIcon = (l, i) => ids(l)[i % 4];
  T.boxWord = "Scrabble-Steine";
  T.hint = (l) => `Schieb die Scrabble-Steine ${[...WORDS[l]].join(", ")} auf die Felder – zusammen ergeben sie ${WORDS[l]}. Steine lassen sich nur schieben, nicht ziehen.`;
  T.winTitle = (l) => WORDS[l] + "!";
  T.winText = (m, p) => `Wort gelegt! ${m} Schritte, ${p} Schübe.`;
}

// ---------- Welt 5: Lego – Schiffe, Lego-Markt, Lego City ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a"];
  const YEL = "#ffd21f";
  // Schristian als Minifigur: gelbe Haut statt Hautton
  const mini = (o) => ["#f6d2b4", "#f0c3a0", "#efc09c", SKIN10, "#e2a983"].reduce((s, c) => s.split(c).join(YEL), kChristian(o));
  Object.assign(LASSE, {
    lg_kapitaen: mini({ shirt: "#1f2a44", pants: "#1f2a44", shoes: KI, body: `${[50, 58].map(y => `<circle cx="46" cy="${y}" r="1.6" fill="#ffd23a"/><circle cx="54" cy="${y}" r="1.6" fill="#ffd23a"/>`).join("")}`, head: `<path d="M32 16q0-12 18-12t18 12z" fill="#ffffff" ${kO}/><path d="M30 16h40l-4 6H34z" fill="${KI}" ${kO2}/><path d="M46 9l4-3 4 3-4 3z" fill="#ffd23a"/>` }),
    lg_markt: mini({ shirt: "#2b5fd9", pants: KI, shoes: KI, body: `<path d="M37 56h26" stroke="#ff8a1a" stroke-width="5"/><rect x="53" y="48" width="8" height="5" fill="#fff" ${kO2}/>` }),
    lg_feuerwehr: mini({ shirt: "#1f2a44", pants: "#1f2a44", shoes: KI, body: `<path d="M37 60h26M37 68h26" stroke="#ffd23a" stroke-width="3"/>`, head: `<path d="M30 18q0-16 20-16t20 16z" fill="#e2402f" ${kO}/><path d="M26 18h48l-2 5H28z" fill="#e2402f" ${kO2}/><rect x="45" y="5" width="10" height="9" rx="2" fill="#ffd23a" ${kO2}/>` })
  });
  // Gegenstände: Lego-Container, Einkaufswagen, Lego-Auto
  const ITEMS = {
    container: (c) => `<rect x="10" y="30" width="80" height="50" rx="3" fill="${c}" ${kO}/>${[22, 34, 46, 58, 70, 82].map(x => `<path d="M${x} 34v42" stroke="color-mix(in srgb, ${c} 65%, #000)" stroke-width="2.4"/>`).join("")}${[26, 50, 74].map(x => `<rect x="${x - 7}" y="22" width="14" height="9" rx="3" fill="${c}" ${kO2}/>`).join("")}<path d="M14 40h72" stroke="#fff" stroke-width="2" opacity=".35"/>`,
    wagen: (c) => `<path d="M10 26h14l10 38h46l8-28H30" fill="none" stroke="${KI}" stroke-width="4" stroke-linejoin="round"/><path d="M30 36h58l-8 28H36z" fill="${c}" fill-opacity=".85" ${kO}/>${[44, 56, 68].map(x => `<path d="M${x} 38v24" stroke="#fff" stroke-width="2" opacity=".6"/>`).join("")}<circle cx="40" cy="80" r="7" fill="${KI}"/><circle cx="74" cy="80" r="7" fill="${KI}"/><path d="M36 64l4 10M78 64l-4 10" stroke="${KI}" stroke-width="3"/>`,
    auto: (c) => `<path d="M12 62V48q0-6 6-6h8l10-14h28l10 14h8q6 0 6 6v14z" fill="${c}" ${kO}/><path d="M40 32h22l7 10H33z" fill="#9fd8ff" ${kO2}/>${[26, 50, 74].map(x => `<rect x="${x - 6}" y="20" width="12" height="7" rx="2" fill="${c}" ${kO2}/>`).join("")}<circle cx="30" cy="66" r="10" fill="${KI}"/><circle cx="70" cy="66" r="10" fill="${KI}"/><circle cx="30" cy="66" r="4" fill="#c9ced8"/><circle cx="70" cy="66" r="4" fill="#c9ced8"/><rect x="82" y="50" width="6" height="5" fill="#fff6a0" ${kO2}/>`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(ITEMS).map(k => PL.map((c, i) =>
    `<symbol id="k3lg${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="34" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="k3legostein" viewBox="0 0 100 100"><rect x="12" y="34" width="76" height="50" rx="5" fill="#e2402f" ${kO}/>${[30, 50, 70].map(x => `<rect x="${x - 8}" y="22" width="16" height="12" rx="3" fill="#e2402f" ${kO2}/>`).join("")}<path d="M18 44h64" stroke="#fff" stroke-width="3" opacity=".4"/></symbol>
     <symbol id="k3goldstein" viewBox="0 0 100 100"><rect x="12" y="34" width="76" height="50" rx="5" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>${[30, 50, 70].map(x => `<rect x="${x - 8}" y="22" width="16" height="12" rx="3" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>`).join("")}</symbol>`);
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="6" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/>${[[32, 34], [68, 34], [32, 68], [68, 68]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#ffffff" stroke-width="3"/>`).join("")}`);
  // Bauplatten-Boden mit Noppen
  const plate = (c, extra = () => "") => kFloor(c, c, (x, y, ctx) => [[25, 25], [75, 25], [25, 75], [75, 75]].map(([a, b]) => `<circle cx="${a}" cy="${b + 2}" r="11" fill="color-mix(in srgb, ${c} 80%, #000)"/><circle cx="${a}" cy="${b}" r="11" fill="color-mix(in srgb, ${c} 88%, #fff)" stroke="color-mix(in srgb, ${c} 70%, #000)" stroke-width="1.6"/>`).join("") + extra(x, y, ctx));
  const B = (bg, inner) => () => kB(bg, inner);
  const studs = (c, y = 10) => [26, 50, 74].map(x => `<rect x="${x - 7}" y="${y}" width="14" height="8" rx="3" fill="${c}" ${kO2}/>`).join("");
  // Schiffe
  const containerschiff = B("#4fa3e0", `<path d="M8 60h84l-10 22H18z" fill="#e2402f" ${kO}/><path d="M8 60h84" stroke="#fff" stroke-width="3"/>${[["#2b5fd9", 14], ["#3fae4a", 36], ["#ffd23a", 58]].map(([c, x]) => `<rect x="${x}" y="40" width="20" height="20" fill="${c}" ${kO2}/>`).join("")}<rect x="76" y="34" width="12" height="26" fill="#fff" ${kO2}/><path d="M4 86q10-4 20 0t20 0 20 0 20 0 16 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  const leuchtturm = B("#4fa3e0", `<path d="M38 88l6-62h12l6 62z" fill="#ffffff" ${kO}/><path d="M40 70h20M42 50h16" stroke="#e2402f" stroke-width="8"/><rect x="40" y="16" width="20" height="12" fill="#ffd23a" ${kO2}/><path d="M38 16h24l-12-10z" fill="#e2402f" ${kO2}/><path d="M60 22l30-10v20z" fill="#fff6a0" opacity=".6"/>`);
  const kran = B("#9fd8ff", `<path d="M30 92V20h8v72M34 20h52M34 20l20 18" stroke="#ffd23a" stroke-width="6" fill="none"/><path d="M34 20h52M34 20l20 18" stroke="${KI}" stroke-width="1.4" fill="none" opacity=".4"/><path d="M78 20v34" stroke="${KI}" stroke-width="2"/><rect x="68" y="54" width="20" height="14" fill="#2b5fd9" ${kO2}/>`);
  const kutter = B("#4fa3e0", `<path d="M14 56h72l-10 22H24z" fill="#3fae4a" ${kO}/><rect x="42" y="36" width="20" height="20" fill="#fff" ${kO2}/><path d="M30 56V20M30 24l-14 26" stroke="${KI}" stroke-width="3"/><path d="M4 84q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  const anker = B("#2b5fd9", `<circle cx="50" cy="20" r="7" fill="none" stroke="#ffd23a" stroke-width="5"/><path d="M50 27v56M34 40h32M20 62q4 22 30 22t30-22" fill="none" stroke="#ffd23a" stroke-width="7" stroke-linecap="round"/>`);
  const moewe = B("#bfe3ff", `<ellipse cx="50" cy="56" rx="24" ry="14" fill="#ffffff" ${kO}/><circle cx="72" cy="44" r="9" fill="#ffffff" ${kO2}/><path d="M80 44l10 3-10 3z" fill="#ffd23a" ${kO2}/><circle cx="74" cy="42" r="1.8" fill="${KI}"/><path d="M30 52q-10-14-22-12 10 6 18 18z" fill="#c9ced8" ${kO2}/><path d="M44 70v14M56 70v14" stroke="#ff8a1a" stroke-width="3"/>`);
  // Lego-Markt (ohne Schrift: Schild in Blau-Orange mit Lego-„L“)
  const ladenschild = B("#ffffff", `<rect x="10" y="20" width="80" height="44" rx="6" fill="#1f3f8a" ${kO}/><path d="M18 30h64M18 54h64" stroke="#ff8a1a" stroke-width="5"/><path d="M40 34v18h18" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>${studs("#1f3f8a", 12)}`);
  const regal = B("#e9e6df", `${[30, 56, 82].map(y => `<path d="M8 ${y}h84" stroke="#9aa3b1" stroke-width="4"/>`).join("")}${[[14, 18, "#e2402f"], [30, 18, "#ffd23a"], [46, 18, "#3fae4a"], [64, 18, "#2b5fd9"], [20, 44, "#ff8a1a"], [40, 44, "#fff6dc"], [60, 44, "#e2402f"], [78, 44, "#8b5cf6"], [24, 70, "#3fae4a"], [50, 70, "#ffd23a"], [72, 70, "#2b5fd9"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="12" height="12" rx="2" fill="${c}" ${kO2}/>`).join("")}`);
  const kasse = B("#e9e6df", `<rect x="8" y="50" width="84" height="34" rx="3" fill="#9aa3b1" ${kO}/><path d="M12 56h56" stroke="${KI}" stroke-width="5"/>${[20, 34, 48].map((x, i) => `<rect x="${x}" y="44" width="10" height="10" rx="2" fill="${["#e2402f", "#ffd23a", "#3fae4a"][i]}" ${kO2}/>`).join("")}<rect x="70" y="30" width="18" height="20" rx="3" fill="${KI}" ${kO2}/><rect x="73" y="33" width="12" height="8" fill="#4fd1c5"/>`);
  const obst = B("#e9e6df", `<rect x="14" y="54" width="72" height="30" rx="3" fill="#c9935a" ${kO}/>${[[26, "#e2402f"], [40, "#3fae4a"], [54, "#ffd23a"], [68, "#ff8a1a"]].map(([x, c]) => `<circle cx="${x}" cy="50" r="8" fill="${c}" ${kO2}/>`).join("")}${[[33, "#e2402f"], [47, "#ffd23a"], [61, "#3fae4a"]].map(([x, c]) => `<circle cx="${x}" cy="40" r="8" fill="${c}" ${kO2}/>`).join("")}`);
  const pfand = B("#e9e6df", `<rect x="22" y="12" width="56" height="78" rx="6" fill="#3fae4a" ${kO}/><rect x="32" y="24" width="36" height="22" rx="3" fill="${KI}"/><circle cx="50" cy="64" r="10" fill="${KI}"/><path d="M44 62l6-6 6 6M50 56v12" stroke="#fff" stroke-width="2.4" fill="none"/>`);
  // Lego City
  const feuerwehr = B("#9fd8ff", `<rect x="8" y="40" width="58" height="30" rx="3" fill="#e2402f" ${kO}/><path d="M66 46h16l10 12v12H66z" fill="#e2402f" ${kO}/><rect x="70" y="50" width="12" height="8" fill="#9fd8ff" ${kO2}/><path d="M10 34h52M14 34l40-10" stroke="#c9ced8" stroke-width="4"/><circle cx="24" cy="74" r="8" fill="${KI}"/><circle cx="78" cy="74" r="8" fill="${KI}"/><rect x="74" y="40" width="8" height="6" fill="#4fd1ff" class="siren"/>`);
  const polizei = B("#9fd8ff", `<rect x="12" y="34" width="76" height="56" fill="#ffffff" ${kO}/><path d="M12 34l38-22 38 22" fill="#1f3f8a" ${kO2}/><rect x="40" y="60" width="20" height="30" fill="#1f3f8a" ${kO2}/>${[22, 68].map(x => `<rect x="${x}" y="44" width="12" height="12" fill="#9fd8ff" ${kO2}/>`).join("")}<circle cx="50" cy="46" r="5" fill="#ffd23a" ${kO2}/>`);
  const bus = B("#9fd8ff", `<rect x="8" y="30" width="84" height="44" rx="6" fill="#ffd23a" ${kO}/>${[14, 32, 50, 68].map(x => `<rect x="${x}" y="36" width="14" height="14" fill="#9fd8ff" ${kO2}/>`).join("")}<circle cx="26" cy="76" r="8" fill="${KI}"/><circle cx="74" cy="76" r="8" fill="${KI}"/>`);
  const ampel = B("#9fd8ff", `<path d="M50 92V60" stroke="${KI}" stroke-width="5"/><rect x="38" y="10" width="24" height="52" rx="6" fill="${KI}" ${kO2}/><circle cx="50" cy="22" r="6" fill="#e2402f"/><circle cx="50" cy="36" r="6" fill="#ffd23a" opacity=".4"/><circle cx="50" cy="50" r="6" fill="#3fae4a" opacity=".4"/>`);
  const baecker = B("#9fd8ff", `<rect x="12" y="30" width="76" height="60" fill="#f2dcae" ${kO}/><path d="M8 30h84l-6-14H14z" fill="#e2402f" ${kO2}/>${[22, 38, 54, 70].map(x => `<path d="M${x} 16v14" stroke="#fff" stroke-width="4"/>`).join("")}<rect x="22" y="48" width="56" height="20" fill="#9fd8ff" ${kO2}/><path d="M30 60q8-10 16 0M54 60q8-10 16 0" stroke="#c9935a" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  const SC = [
    ["Lego-Schiffe", "lg_kapitaen", PAL("#cfe8ff", "#eef7ff"), plate("#9aa3b1"), [containerschiff, leuchtturm, kran, kutter, anker, moewe], "container", ["lego", "#2b5fd9"],
      "Verlad jeden Container an seinen Platz. Container lassen sich nur schieben, nicht ziehen."],
    ["Lego-Markt", "lg_markt", PAL("#e8eefc", "#f8faff"), plate("#d9dee6"), [ladenschild, regal, kasse, obst, pfand], "wagen", ["lego", "#ffffff"],
      "Park jeden Einkaufswagen an seinem Platz. Wagen lassen sich nur schieben, nicht ziehen."],
    ["Lego City", "lg_feuerwehr", PAL("#dff1ff", "#f4fbff"), plate("#3fae4a", (x, y, ctx) => y === ctx.midY ? `<rect x="0" y="36" width="100" height="28" fill="#6b7280"/><path d="M0 50h100" stroke="#fff" stroke-width="3" stroke-dasharray="12 8"/>` : ""), [feuerwehr, polizei, bus, ampel, baecker], "auto", ["lego", "#e2402f"],
      "Park jedes Lego-Auto auf seinem Platz. Autos lassen sich nur schieben, nicht ziehen."]
  ];
  const at = (l) => Math.min(2, Math.floor(l / 2));
  const scenes = SC.map(([name, outfit, pal, floor, walls, kind, base]) => { BASE_WALL[name] = base; OUTFIT[name] = outfit; return kScene(name, outfit, pal, floor, walls, () => bunting(["#e2402f", "#ffd23a", "#2b5fd9", "#3fae4a"])); });
  THEMES.lego3 = theme2({
    title: "Lego", worldName: "Lego", emblem: "k3legostein", box: "k3lgcontainer-0", mapIcon: "k3legostein", boxWord: "Steine", pushWord: "Schübe",
    hint: (l) => SC[at(l)][7],
    winTitle: "KLACK!", winText: (m, p) => `Alles fest verbaut. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldstein", title: "Goldener Legostein!", text: (m) => `Meisterbauer Schristian! Finale in ${m} Schritten.` },
    pal: { "--accent": "#e2402f", "--accent-dark": "#a82f22" },
    target: platz, scenes,
    levelName: (l) => SC[at(l)][0], levelBox: (l) => `k3lg${SC[at(l)][5]}-0`, boxCycle: (l) => PL.map((_, i) => `k3lg${SC[at(l)][5]}-${i}`)
  });
}

// ---------- Welt 6: Pinguine – rund um den Kuscheltier-Pinguin ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  // Kuschel-Pinguin: weiches, rundes Plüschtier mit Naht, Schal und Bommelmütze in der Farbe
  const plush = (c, s = 1, x = 50, y = 52) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -52)">
    <ellipse cx="50" cy="60" rx="28" ry="30" fill="#2b3352" ${kO}/><ellipse cx="50" cy="66" rx="18" ry="22" fill="#f4f1ea"/>
    <path d="M23 56q-10 10-4 22 6-6 8-16M77 56q10 10 4 22-6-6-8-16" fill="#2b3352" ${kO2}/>
    <ellipse cx="40" cy="90" rx="9" ry="4" fill="#ff8a1a" ${kO2}/><ellipse cx="60" cy="90" rx="9" ry="4" fill="#ff8a1a" ${kO2}/>
    <circle cx="42" cy="44" r="3.4" fill="${KI}"/><circle cx="58" cy="44" r="3.4" fill="${KI}"/><circle cx="43" cy="43" r="1.1" fill="#fff"/><circle cx="59" cy="43" r="1.1" fill="#fff"/>
    <path d="M45 50l5 6 5-6z" fill="#ff8a1a" ${kO2}/><ellipse cx="36" cy="52" rx="4" ry="2.4" fill="#ff9a8a" opacity=".6"/><ellipse cx="64" cy="52" rx="4" ry="2.4" fill="#ff9a8a" opacity=".6"/>
    <path d="M50 70v18" stroke="#c9c4ba" stroke-width="1.4" stroke-dasharray="2 2"/>
    <path d="M28 58q22 10 44 0v7q-22 10-44 0z" fill="${c}" ${kO2}/><path d="M60 64l4 16 7-2-3-15" fill="${c}" ${kO2}/>
    <path d="M30 34q0-20 20-20t20 20z" fill="${c}" ${kO2}/><path d="M30 33h40" stroke="#fff" stroke-width="4"/><circle cx="50" cy="12" r="6" fill="#fff" ${kO2}/></g>`;
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) =>
    `<symbol id="k3pingu-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="93" rx="28" ry="4" fill="#0003"/>${plush(c, .9, 50, 50)}</symbol>`).join("") +
    `<symbol id="k3pinguin" viewBox="0 0 100 100">${plush("#4fd1c5")}</symbol>
     <symbol id="k3goldpingu" viewBox="0 0 100 100"><ellipse cx="50" cy="60" rx="28" ry="30" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><ellipse cx="50" cy="66" rx="18" ry="22" fill="#fff6c8"/><circle cx="42" cy="44" r="3.4" fill="#9a6404"/><circle cx="58" cy="44" r="3.4" fill="#9a6404"/><path d="M45 50l5 6 5-6z" fill="#ff8a1a"/><path d="M30 34q0-20 20-20t20 20z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/></symbol>`);
  const platz = kTarget(`${kGlow(`<ellipse cx="50" cy="56" rx="38" ry="30" opacity="0"/>`)}<ellipse cx="50" cy="56" rx="38" ry="30" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/><path d="M38 56q12 12 24 0" stroke="#ffffff" stroke-width="4" fill="none"/>`);
  Object.assign(LASSE, {
    pi_kuschel: kChristian({ shirt: "#8fbfe0", pants: "#33507f", shoes: "#c9ced8", body: `<path d="M44 44q6 6 12 0" fill="none" stroke="${KI}" stroke-width="2"/>`, hand: `<g transform="translate(60 48) scale(.32)">${plush("#4fd1c5")}</g>` }),
    pi_zoo: kChristian({ shirt: "#3fae4a", pants: "#c9a875", shoes: "#8a5a2b", body: `<path d="M40 46l3 22M60 46l-3 22" stroke="#8a5a2b" stroke-width="3"/>`, head: `<path d="M34 16q0-14 16-14t16 14z" fill="#e8d7a8" ${kO}/><path d="M28 16h44" stroke="#e8d7a8" stroke-width="5"/><path d="M34 13h32" stroke="#3fae4a" stroke-width="3"/>`, hand: `<g transform="translate(62 50) scale(.28)">${plush("#e2402f")}</g>` }),
    pi_polar: kChristian({ shirt: "#e2402f", pants: "#2b3a67", shoes: KI, glove: "#2b5fd9", body: `<path d="M50 44v24" stroke="${KI}" stroke-width="2"/><path d="M38 46h24" stroke="#f4f1ea" stroke-width="5"/>`, head: `<path d="M32 22q0-20 18-20t18 20z" fill="#2b5fd9" ${kO}/><path d="M32 20h36" stroke="#fff" stroke-width="4"/><circle cx="50" cy="2" r="5" fill="#fff" ${kO2}/>` })
  });
  const B = (bg, inner) => () => kB(bg, inner);
  const st = (x, y, r, c = "#fff6a0") => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="${c}" ${kO2}/>`;
  const realPingu = (x, y, s = 1, flip = 1) => `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})"><ellipse cx="0" cy="0" rx="12" ry="20" fill="${KI}" ${kO2}/><ellipse cx="0" cy="4" rx="7" ry="14" fill="#fff"/><circle cx="-3" cy="-11" r="1.6" fill="#fff"/><path d="M2 -9l8 2-8 2z" fill="#ff8a1a"/><path d="M-6 20h5M2 20h5" stroke="#ff8a1a" stroke-width="3"/><path d="M-12 -2l-6 12" stroke="${KI}" stroke-width="4" stroke-linecap="round"/></g>`;
  // Kuschelecke
  const grossPingu = B("#ffe3f1", plush("#4fd1c5", .95, 50, 50));
  const bett = B("#cfe2ff", `<rect x="8" y="50" width="84" height="30" rx="4" fill="#ffffff" ${kO}/><rect x="8" y="58" width="84" height="22" fill="#8fbfe0" ${kO2}/><rect x="12" y="40" width="26" height="16" rx="6" fill="#fff" ${kO2}/><g transform="translate(46 34) scale(.38)">${plush("#ffd23a")}</g><path d="M8 80v10M92 80v10" stroke="${KI}" stroke-width="4"/>`);
  const regal = B("#f4e6cf", `${[34, 64].map(y => `<path d="M8 ${y}h84" stroke="#a8743f" stroke-width="4"/>`).join("")}<g transform="translate(8 2) scale(.32)">${plush("#e2402f")}</g><g transform="translate(36 2) scale(.32)">${plush("#3fae4a")}</g><g transform="translate(64 2) scale(.32)">${plush("#8b5cf6")}</g><rect x="14" y="44" width="10" height="20" fill="#2b5fd9" ${kO2}/><rect x="26" y="40" width="10" height="24" fill="#ffd23a" ${kO2}/><circle cx="66" cy="54" r="10" fill="#ff8a1a" ${kO2}/>`);
  const nachtlicht = B("#2b3a67", `<circle cx="50" cy="50" r="30" fill="#fff6a0" opacity=".25"/><path d="M38 70q-2-30 12-36 14 6 12 36z" fill="#fff6c8" ${kO2}/>${[[18, 20], [80, 24], [22, 78], [82, 74]].map(([x, y]) => st(x, y, 5)).join("")}`);
  const decke = B("#ffd6ec", `${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => `<rect x="${8 + c * 21}" y="${8 + r * 21}" width="21" height="21" fill="${(r + c) % 2 ? "#ffb3d1" : "#fff"}"/>`).join("")).join("")}<rect x="8" y="8" width="84" height="84" fill="none" stroke="${KI}" stroke-width="2"/>`);
  // Zoo
  const gehege = B("#9fd8ff", `<rect x="4" y="60" width="92" height="32" fill="#4fa3e0"/><path d="M4 64q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/><path d="M8 60l20-30 22 30z" fill="#e9eef5" ${kO2}/>${realPingu(66, 44, .9)}${realPingu(84, 48, .7, -1)}`);
  const eimer = B("#e9eef5", `<path d="M26 40h48l-6 44H32z" fill="#9aa3b1" ${kO}/><path d="M26 40q24-26 48 0" fill="none" stroke="${KI}" stroke-width="3"/>${[[36, 38], [48, 34], [60, 38]].map(([x, y]) => `<path d="M${x - 8} ${y}q8-8 16 0-8 8-16 0z M${x + 8} ${y}l5-5v10z" fill="#9fd8ff" ${kO2}/>`).join("")}`);
  const scheibe = B("#cfe2ff", `<rect x="8" y="10" width="84" height="80" rx="4" fill="#9fd8ff" fill-opacity=".6" ${kO}/><path d="M18 20l20 20M30 14l14 14" stroke="#fff" stroke-width="4" opacity=".7"/>${realPingu(56, 58, 1.1)}`);
  const shop = B("#ffe3c8", `<rect x="10" y="40" width="80" height="50" fill="#fff" ${kO}/><path d="M6 40h88l-6-16H12z" fill="#2b5fd9" ${kO2}/>${[20, 36, 52, 68].map(x => `<path d="M${x} 24v16" stroke="#fff" stroke-width="4"/>`).join("")}<g transform="translate(14 44) scale(.4)">${plush("#e2402f")}</g><g transform="translate(48 44) scale(.4)">${plush("#ffd23a")}</g>`);
  const fels = B("#cfe2ff", `<path d="M10 90l14-40 22-14 18 10 20 20 6 24z" fill="#9aa3b1" ${kO}/><path d="M24 50l22-14 18 10" fill="#e9eef5"/>${realPingu(46, 30, .7)}`);
  // Antarktis-Traum
  const iglu = B("#bfe3ff", `<path d="M14 84q0-48 36-48t36 48z" fill="#f4f8ff" ${kO}/><path d="M18 70h64M24 56h52M50 36v14M34 56v14M66 56v14" stroke="#c9d6ea" stroke-width="2"/><path d="M40 84q0-16 10-16t10 16z" fill="#2b3a67" ${kO2}/>`);
  const polarlicht = B("#12205e", `<path d="M0 50q25-30 50-10t50-20" stroke="#4fd1c5" stroke-width="10" fill="none" opacity=".7"/><path d="M0 64q25-24 50-8t50-18" stroke="#8b5cf6" stroke-width="8" fill="none" opacity=".6"/>${[[20, 20], [80, 14], [60, 80]].map(([x, y]) => st(x, y, 4)).join("")}`);
  const kolonie = B("#e9eef5", `${[[22, 52, .8, 1], [42, 46, .9, -1], [62, 54, .8, 1], [80, 48, .7, -1], [34, 74, .7, 1], [56, 76, .75, -1]].map(([x, y, s, f]) => realPingu(x, y, s, f)).join("")}`);
  const scholle = B("#4fa3e0", `<path d="M10 60l20-14h44l18 16-12 14H22z" fill="#f4f8ff" ${kO}/><path d="M10 60l12 16h58" fill="none" stroke="#c9d6ea" stroke-width="3"/>${realPingu(50, 40, .8)}<path d="M4 84q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  const SC = [
    ["Kuschelecke", "pi_kuschel", PAL("#ffe9f3", "#fff7fb"), kFloor("#f2e3d3", "#f2e3d3", (x, y) => pick(x, y, 1, 4) === 0 ? `<circle cx="${30 + pick(x, y, 2, 40)}" cy="${30 + pick(x, y, 3, 40)}" r="3" fill="#ffb3d1"/>` : ""), [grossPingu, bett, regal, nachtlicht, decke], ["farbe", "#8fbfe0"],
      "Bring jeden Kuschel-Pinguin an seinen Kuschelplatz. Pinguine lassen sich nur schieben, nicht ziehen."],
    ["Pinguine im Zoo", "pi_zoo", PAL("#dff1ff", "#f4fbff"), kFloor("#d9dee6", "#d9dee6", () => `<path d="M0 50h100M50 0v100" stroke="#c4c9d2" stroke-width="2"/>`), [gehege, eimer, scheibe, shop, fels, grossPingu], ["stein", "#9aa3b1"],
      "Setz jeden Kuschel-Pinguin auf seinen Platz am Gehege. Pinguine lassen sich nur schieben, nicht ziehen."],
    ["Traum von der Antarktis", "pi_polar", PAL("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), kFloor("#f4f8ff", "#f4f8ff", (x, y) => pick(x, y, 1, 3) === 0 ? `<path d="M30 60l10-6 12 4" stroke="#c9d6ea" stroke-width="2" fill="none"/>` : ""), [iglu, polarlicht, kolonie, scholle, grossPingu], ["fels", "#9fc7e8"],
      "Bring jeden Kuschel-Pinguin zu seinem Platz im Eis. Pinguine lassen sich nur schieben, nicht ziehen."]
  ];
  const at = (l) => Math.min(2, Math.floor(l / 2));
  const scenes = SC.map(([name, outfit, pal, floor, walls, base]) => { BASE_WALL[name] = base; OUTFIT[name] = outfit; return kScene(name, outfit, pal, floor, walls, () => bunting(["#4fd1c5", "#ffffff", "#2b5fd9", "#ff5fa2"])); });
  THEMES.pinguine = theme2({
    title: "Pinguine", worldName: "Pinguine", emblem: "k3pinguin", box: "k3pingu-0", mapIcon: "k3pinguin", boxWord: "Kuschel-Pinguine", pushWord: "Schübe",
    hint: (l) => SC[at(l)][6],
    winTitle: "KUSCHELN!", winText: (m, p) => `Alle Pinguine am Kuschelplatz. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldpingu", title: "Goldener Pinguin!", text: (m) => `Der Kuschel-Pinguin ist stolz auf dich, Schristian! Finale in ${m} Schritten.` },
    pal: { "--accent": "#2b5fd9", "--accent-dark": "#1f3f8a" },
    target: platz, scenes,
    levelName: (l) => SC[at(l)][0], levelBox: () => "k3pingu-0", boxCycle: () => PL.map((_, i) => `k3pingu-${i}`)
  });
}

// ---------- Welt 7: Urlaub – Kreta und Fuerteventura mit Matze und Arne, Silvester in Dänemark mit allen acht ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const B = (bg, inner) => () => kB(bg, inner);
  const st = (x, y, r, c = "#fff6a0") => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="${c}" ${kO2}/>`;
  const flagDK = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v-22" stroke="${KI}" stroke-width="1.6"/><rect x="0" y="-22" width="16" height="11" fill="#c8102e" stroke="${KI}" stroke-width="1"/><path d="M5 -22v11M0 -16.5h16" stroke="#fff" stroke-width="2.2"/></g>`;
  // Kransekage: gestapelte Marzipanringe mit Zuckerguss-Zickzack und Dänemark-Fähnchen
  const kranse = (s = 1, x = 50, y = 52, bow = "#c8102e") => `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -52)">
    ${Array.from({ length: 7 }, (_, i) => { const w = 34 - i * 4.4, yy = 86 - i * 9; return `<ellipse cx="50" cy="${yy}" rx="${w}" ry="5.5" fill="#d9a35a" ${kO2}/><path d="M${50 - w + 3} ${yy - 2}${Array.from({ length: Math.round(w / 3) }, (_, k) => `l3 ${k % 2 ? -3 : 3}`).join("")}" fill="none" stroke="#fffaf0" stroke-width="1.8"/>`; }).join("")}
    ${flagDK(56, 30, .8)}${flagDK(36, 54, .7)}${flagDK(66, 66, .7)}
    <path d="M40 80q10 6 20 0l-2 6q-8 4-16 0z" fill="${bow}" ${kO2}/><circle cx="50" cy="82" r="3" fill="${bow}" ${kO2}/></g>`;
  const ITEMS = {
    koffer: (c) => `<rect x="18" y="30" width="64" height="54" rx="8" fill="${c}" ${kO}/><path d="M38 30v-8q0-4 4-4h16q4 0 4 4v8" fill="none" stroke="${KI}" stroke-width="4"/><path d="M30 34v46M70 34v46" stroke="color-mix(in srgb, ${c} 65%, #000)" stroke-width="3"/><rect x="40" y="52" width="20" height="12" rx="2" fill="#fff" ${kO2}/><circle cx="28" cy="88" r="4" fill="${KI}"/><circle cx="72" cy="88" r="4" fill="${KI}"/>`,
    surf: (c) => `<g transform="rotate(-35 50 52)"><path d="M50 4q16 20 14 50t-14 40q-14-10-14-40T50 4z" fill="${c}" ${kO}/><path d="M50 8v84" stroke="#fff" stroke-width="3"/><path d="M42 30q8-4 16 0" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><path d="M46 86l-6 8h20l-6-8" fill="${KI}"/></g>`,
    kranse: (c) => kranse(.82, 50, 54, c),
    wuerfel: (c) => `<path d="M24 38l26-14 26 14v32L50 84 24 70z" fill="${c}" ${kO}/><path d="M24 38l26 14 26-14M50 52v32" fill="none" stroke="${KI}" stroke-width="2.2"/><path d="M24 38l26-14 26 14-26 14z" fill="color-mix(in srgb, ${c} 70%, #fff)"/><path d="M24 38l26-14 26 14-26 14z" fill="none" ${kO2}/><path d="M50 52v32L24 70V38z" fill="color-mix(in srgb, ${c} 82%, #000)" opacity=".5"/>`,
    affe: (c) => `<circle cx="22" cy="40" r="10" fill="${c}" ${kO2}/><circle cx="78" cy="40" r="10" fill="${c}" ${kO2}/><circle cx="22" cy="40" r="5" fill="#f6cfae"/><circle cx="78" cy="40" r="5" fill="#f6cfae"/>
      <ellipse cx="50" cy="74" rx="20" ry="16" fill="${c}" ${kO}/><circle cx="50" cy="40" r="24" fill="${c}" ${kO}/><ellipse cx="50" cy="48" rx="16" ry="12" fill="#f6cfae" ${kO2}/><path d="M40 30q4-6 8 0M52 30q4-6 8 0" fill="#f6cfae" ${kO2}/>
      <circle cx="43" cy="36" r="3" fill="${KI}"/><circle cx="57" cy="36" r="3" fill="${KI}"/><path d="M42 52q8 7 16 0" fill="#8a2f2a" ${kO2}/><path d="M70 80q16 0 14-16" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    maske: (c) => `<path d="M18 30l8-22 16 16h16l16-16 8 22q6 30-32 54-38-24-32-54z" fill="${c}" ${kO}/><path d="M24 14l4 10 8 2M76 14l-4 10-8 2" fill="#ffb3c6" stroke="${KI}" stroke-width="1.4"/><path d="M30 44q8-8 16 0-8 8-16 0zM54 44q8-8 16 0-8 8-16 0z" fill="#ffd23a" ${kO2}/><path d="M38 40v8M62 40v8" stroke="${KI}" stroke-width="2.4"/><path d="M46 60l4 4 4-4z" fill="#ff8fb1" ${kO2}/>${[[-1, 58], [-1, 64], [1, 58], [1, 64]].map(([d, y]) => `<path d="M${50 + d * 8} ${y}l${d * 22} ${y < 60 ? -4 : 2}" stroke="#fff" stroke-width="1.6"/>`).join("")}`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(ITEMS).map(k => PL.map((c, i) =>
    `<symbol id="k3ur${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="92" rx="32" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="k3sonne" viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="#ffd23a" ${kO}/>${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M${50 + Math.cos(a) * 30} ${50 + Math.sin(a) * 30}L${50 + Math.cos(a) * 42} ${50 + Math.sin(a) * 42}" stroke="#ff8a1a" stroke-width="6" stroke-linecap="round"/>`; }).join("")}</symbol>
     <symbol id="k3goldkoffer" viewBox="0 0 100 100"><rect x="18" y="30" width="64" height="54" rx="8" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><path d="M38 30v-8q0-4 4-4h16q4 0 4 4v8" fill="none" stroke="#9a6404" stroke-width="4"/>${flagDK(58, 70, 1.2)}</symbol>`);
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="10" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/>${st(50, 52, 12, "#ffffff")}`);
  Object.assign(LASSE, {
    ur_kreta: kChristian({ shirt: "#f4f1ea", pants: "#4fa3e0", shoes: "#c9935a", body: `<path d="M44 44l6 8 6-8" fill="none" stroke="#c9c4ba" stroke-width="2"/>`, head: `<ellipse cx="50" cy="15" rx="26" ry="6" fill="#e8d7a8" ${kO2}/><path d="M36 14q0-13 14-13t14 13z" fill="#e8d7a8" ${kO2}/><path d="M36 11h28" stroke="#2b5fd9" stroke-width="3"/><path d="M37 25h11v4q0 3-3 3h-5q-3 0-3-3zM52 25h11v4q0 3-3 3h-5q-3 0-3-3z" fill="${KI}"/>` }),
    ur_surf: kChristian({ shirt: "#1f2a44", pants: "#1f2a44", shoes: "#1f2a44", glove: "#f6d2b4", body: `<path d="M37 50h26" stroke="#4fd1c5" stroke-width="4"/><path d="M50 44v24" stroke="#4fd1c5" stroke-width="2"/>`, hand: `<g transform="rotate(-20 82 56)"><path d="M82 20q8 12 7 34t-7 30q-7-8-7-30t7-34z" fill="#ff8a1a" ${kO2}/></g>` }),
    ur_klong: kChristian({ shirt: "#4fa3e0", pants: "#f2e3c6", shoes: "#c9935a", body: `${[[42, 52], [56, 50], [48, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffffff"/>`).join("")}`, hand: `${[0, 1, 2].map(i => `<rect x="${68 + i * 5}" y="${44 - i * 3}" width="12" height="17" rx="2" fill="${["#f4f1ea", "#ffd23a", "#c9935a"][i]}" ${kO2} transform="rotate(${-10 + i * 12} ${74 + i * 5} 52)"/>`).join("")}` }),
    ur_cats: kChristian({ shirt: "#1f2a44", pants: KI, shoes: KI, body: `<path d="M44 44l6 6 6-6" fill="#fff" ${kO2}/>`, head: `<path d="M34 12l4-12 8 9zM66 12l-4-12-8 9z" fill="${KI}" ${kO2}/><path d="M35 8l2-4 3 3zM65 8l-2-4-3 3z" fill="#ff8fb1"/><path d="M50 7q-14-4-16 6M50 7q14-4 16 6" stroke="${KI}" stroke-width="2.4" fill="none"/>${[-1, 1].map(d => `<path d="M${50 + d * 6} 33l${d * 12} -3M${50 + d * 6} 35l${d * 12} 1" stroke="${KI}" stroke-width="1.4"/>`).join("")}<circle cx="50" cy="31" r="2" fill="${KI}"/>` }),
    ur_jungle: kChristian({ shirt: "#c8102e", pants: "#2b3a67", shoes: KI, body: `<path d="M37 56h26" stroke="#fff" stroke-width="4"/><path d="M48 46v22" stroke="#fff" stroke-width="4"/>`, hand: `<rect x="66" y="56" width="20" height="16" rx="4" fill="#ffd23a" ${kO2}/><circle cx="76" cy="58" r="7" fill="#e2402f" ${kO2}/>` }),
    ur_dk: kChristian({ shirt: "#c8102e", pants: "#2b3a67", shoes: KI, body: `<path d="M37 56h26" stroke="#fff" stroke-width="4"/><path d="M48 46v22" stroke="#fff" stroke-width="4"/>`, hand: `<path d="M72 66l12-30" stroke="#9aa3b1" stroke-width="2"/>${st(85, 32, 7, "#fff6a0")}`, head: `<path d="M32 20q0-18 18-18t18 18z" fill="#ffffff" ${kO}/><path d="M32 18h36" stroke="#c8102e" stroke-width="5"/><circle cx="50" cy="2" r="5" fill="#c8102e" ${kO2}/>` })
  });
  const who = (fig, id, bg) => () => asPerson(kB(bg, `<g transform="translate(8 10) scale(.84)">${fig}</g>`), id);
  const AL = who(ALEX, "alex", "#ffe3f1"), EN = who(ENNI, "enni", "#e6f5d8"), AN = who(ANNA, "anna", "#fff0d8"), SO = who(SOEREN, "soeren", "#dfeefb"), ID = who(IDA, "ida", "#f3e6ff"), AR = who(ARNE, "arne", "#fff0d8"), MA = who(MATZE, "matze", "#dfeefb");
  const LA = () => asPerson(kB("#fff6c8", `<g transform="translate(14 8) scale(.72)">${LASSE.familie.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</g>`), "lasse");
  const sea = (y = 74) => `<rect x="4" y="${y}" width="92" height="${96 - y}" fill="#2b9fe0"/><path d="M4 ${y + 6}q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/>`;
  // Kreta
  const haeuser = B("#9fd8ff", `${sea()}<rect x="12" y="40" width="30" height="34" fill="#ffffff" ${kO2}/><path d="M12 40q15-16 30 0" fill="#2b5fd9" ${kO2}/><rect x="48" y="30" width="36" height="44" fill="#ffffff" ${kO2}/><rect x="56" y="48" width="10" height="14" fill="#2b5fd9" ${kO2}/><rect x="70" y="40" width="8" height="8" fill="#2b5fd9" ${kO2}/><rect x="22" y="56" width="10" height="18" fill="#2b5fd9" ${kO2}/>`);
  const olive = B("#f2e3c6", `<path d="M48 92q-4-24 4-40" stroke="#8a6a3c" stroke-width="7" fill="none"/>${[[30, 40], [50, 28], [70, 40], [40, 54], [62, 54]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="11" fill="#7a9a4a" ${kO2}/>`).join("")}${[[34, 44], [56, 30], [66, 46]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="4" fill="#3a3548"/>`).join("")}`);
  const taverne = B("#f2e3c6", `<rect x="10" y="50" width="80" height="10" rx="2" fill="#2b5fd9" ${kO}/><path d="M18 60v28M82 60v28" stroke="#2b5fd9" stroke-width="5"/><path d="M30 50l-4-24h48l-4 24" fill="#ffffff" ${kO2}/><ellipse cx="50" cy="44" rx="12" ry="5" fill="#fff" ${kO2}/><path d="M42 42q8-10 16 0" fill="#c9935a" ${kO2}/><rect x="24" y="34" width="8" height="16" rx="2" fill="#f4f8ff" fill-opacity=".85" ${kO2}/><rect x="68" y="34" width="8" height="16" rx="2" fill="#f4f8ff" fill-opacity=".85" ${kO2}/>`);
  const windmuehle = B("#9fd8ff", `<path d="M36 92l4-50h20l4 50z" fill="#ffffff" ${kO}/><path d="M36 42q14-12 28 0" fill="#c8643c" ${kO2}/><circle cx="50" cy="36" r="4" fill="${KI}"/>${[0, 90, 180, 270].map(a => `<g transform="rotate(${a + 20} 50 36)"><path d="M50 36L50 6" stroke="${KI}" stroke-width="2"/><path d="M50 8l10 4-10 14z" fill="#f4f1ea" ${kO2}/></g>`).join("")}`);
  const sonne = B("#9fd8ff", `${sea(66)}<use href="#k3sonne" x="22" y="6" width="56" height="56"/>`);
  // Fuerteventura
  const duene = B("#9fd8ff", `<path d="M4 70q20-26 46-10t46 0v30H4z" fill="#f2c97a" ${kO2}/><path d="M4 82q30-14 92 0" stroke="#e0b062" stroke-width="2" fill="none"/>${st(76, 22, 8)}`);
  const strandbar = B("#9fd8ff", `<path d="M10 40h80l-8-18H18z" fill="#f2c97a" ${kO}/>${[20, 34, 48, 62, 76].map(x => `<path d="M${x} 40v6" stroke="#c99a2a" stroke-width="3"/>`).join("")}<rect x="16" y="54" width="68" height="34" fill="#a8743f" ${kO}/><rect x="28" y="40" width="10" height="14" rx="2" fill="#ffd23a" fill-opacity=".85" ${kO2}/><rect x="60" y="40" width="10" height="14" rx="2" fill="#ff8a1a" fill-opacity=".85" ${kO2}/>`);
  const welle = B("#2b9fe0", `<path d="M4 80q10-40 50-50 24 0 32 20-20-10-30 4 10 0 14 10-26-10-40 16z" fill="#4fd1ff" ${kO2}/><path d="M54 30q24 0 32 20" stroke="#fff" stroke-width="4" fill="none"/>`);
  const palme = B("#f2c97a", `<path d="M52 92q-6-36 4-60" stroke="#8a5a2b" stroke-width="7" fill="none"/>${[-60, -20, 20, 60, 180].map(a => `<path d="M56 32q${Math.cos(a / 57) * 24} ${Math.sin(a / 57) * 14 - 8} ${Math.cos(a / 57) * 34} ${Math.sin(a / 57) * 20 + 8}" stroke="#2f8a3a" stroke-width="8" fill="none" stroke-linecap="round"/>`).join("")}<circle cx="52" cy="38" r="4" fill="#8a5a2b"/><circle cx="60" cy="38" r="4" fill="#8a5a2b"/>`);
  const windsurfer = B("#2b9fe0", `<path d="M20 78h60" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M50 76V18l26 50z" fill="#ff5fa2" ${kO2}/><path d="M50 18l-22 52h22" fill="#ffd23a" ${kO2}/><path d="M4 88q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  // Klong! auf Kreta: Drache, Dungeon-Plan, Artefakte, Karten, Beutel, Figuren
  const drache = B("#3a2a22", `<path d="M20 70q0-30 30-34 26 0 34 20-10-4-14 2 8 4 8 14-14-6-22 2-20 10-36-4z" fill="#c0392b" ${kO}/><path d="M50 36l-6-18 12 10 6-14 4 18" fill="#c0392b" ${kO2}/><circle cx="64" cy="48" r="3.4" fill="#ffd23a"/><path d="M80 56q8 2 12-4" stroke="#ff8a1a" stroke-width="4" fill="none" class="flame"/><path d="M28 56q-14-14-20-2 10 0 14 10" fill="#a8301f" ${kO2}/>`);
  const dungeon = B("#c9a875", `<rect x="10" y="10" width="80" height="80" rx="4" fill="#e8d7a8" ${kO}/>${[[22, 22], [50, 30], [76, 22], [30, 54], [62, 58], [24, 80], [72, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#8a6a3c" ${kO2}/>`).join("")}<path d="M22 22L50 30 76 22M50 30L30 54 62 58 72 80M30 54L24 80" stroke="#8a6a3c" stroke-width="2.4" fill="none"/><path d="M60 40l6-4 4 6z" fill="#c0392b"/>`);
  const artefakt = B("#3a2a22", `<path d="M30 60q20-30 40 0-20 24-40 0z" fill="#ffd23a" ${kO}/><circle cx="50" cy="58" r="8" fill="#4fd1c5" ${kO2}/><path d="M24 30l8 8M76 30l-8 8M50 20v12" stroke="#fff6a0" stroke-width="3" stroke-linecap="round"/>`);
  const karten = B("#3a2a22", `${[0, 1, 2, 3].map(i => `<rect x="${22 + i * 10}" y="${24 + (i % 2) * 4}" width="30" height="44" rx="4" fill="${["#f4f1ea", "#c9a875", "#f4f1ea", "#8b5cf6"][i]}" ${kO2} transform="rotate(${-15 + i * 10} ${37 + i * 10} 70)"/>`).join("")}<circle cx="70" cy="40" r="6" fill="#ffd23a" ${kO2}/>`);
  const beutel = B("#3a2a22", `<path d="M30 40q-12 30 0 46h40q12-16 0-46z" fill="#2d3036" ${kO}/><path d="M30 40q20-10 40 0" fill="none" stroke="#c9935a" stroke-width="4"/><path d="M42 30l8 10 8-10" fill="none" stroke="#c9935a" stroke-width="3"/>${[[42, 64, "#e2402f"], [54, 70, "#2b5fd9"], [60, 58, "#3fae4a"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="8" height="8" fill="${c}" ${kO2}/>`).join("")}`);
  const figuren = B("#c9a875", `${[[26, "#e2402f"], [50, "#2b5fd9"], [74, "#3fae4a"]].map(([x, c]) => `<circle cx="${x}" cy="36" r="8" fill="${c}" ${kO2}/><path d="M${x - 10} 74q0-30 10-30t10 30z" fill="${c}" ${kO2}/>`).join("")}`);
  // PS2 Jungle Party: Röhrenfernseher, Konsole, Buzzer, Dschungel, pupsende Affen
  const affeW = (c, x = 50) => `<g transform="translate(${x - 50} 0)">${ITEMS.affe(c)}</g>`;
  const fernseher = B("#2b3a67", `<rect x="10" y="16" width="80" height="62" rx="10" fill="#9aa3b1" ${kO}/><rect x="18" y="24" width="56" height="46" rx="6" fill="#3fae4a" ${kO2}/><path d="M18 60q14-10 28 0t28 0" fill="#2f8a3a"/><g transform="translate(28 26) scale(.36)">${ITEMS.affe("#ff8a1a")}</g><circle cx="82" cy="34" r="4" fill="${KI}"/><circle cx="82" cy="48" r="4" fill="${KI}"/><path d="M30 78l-6 12M70 78l6 12" stroke="${KI}" stroke-width="4"/>`);
  const konsole = B("#2b3a67", `<rect x="16" y="40" width="68" height="18" rx="3" fill="#1d1d24" ${kO}/><rect x="20" y="58" width="60" height="16" rx="3" fill="#2d3036" ${kO}/><path d="M26 49h30" stroke="#4a4a56" stroke-width="3"/><circle cx="72" cy="49" r="3" fill="#2b5fd9"/>`);
  const buzzer = B("#2b3a67", `${[[22, "#e2402f"], [50, "#2b5fd9"], [78, "#3fae4a"]].map(([x, c]) => `<rect x="${x - 12}" y="44" width="24" height="34" rx="6" fill="${c}" ${kO2}/><circle cx="${x}" cy="50" r="9" fill="#e2402f" ${kO2}/><circle cx="${x - 3}" cy="47" r="3" fill="#fff" opacity=".6"/>`).join("")}`);
  const liane = B("#2f8a3a", `<path d="M20 4q10 40-6 92M50 4q-8 30 6 60M80 4q8 36-4 90" stroke="#7a5a2a" stroke-width="4" fill="none"/>${[[24, 30], [52, 40], [76, 26], [16, 70], [80, 64]].map(([x, y]) => `<path d="M${x} ${y}q10-8 18 0-10 8-18 0z" fill="#3fae4a" ${kO2}/>`).join("")}`);
  const bananen = B("#2f8a3a", `${[0, 1, 2].map(i => `<path d="M${30 + i * 8} 30q-14 30 10 50 4-2 2-6-16-18-6-44z" fill="#ffd23a" ${kO2}/>`).join("")}<path d="M42 26l6-8" stroke="#7a5a2a" stroke-width="4"/>`);
  const pupsAffe = B("#2f8a3a", `${affeW("#8b5cf6", 58)}${[[16, 74, 9], [28, 82, 11], [14, 88, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#9ad97a" fill-opacity=".9" ${kO2}/>`).join("")}`);
  const fenster = B("#c8102e", `<rect x="16" y="16" width="68" height="68" fill="#12205e" ${kO}/><path d="M50 16v68M16 50h68" stroke="#fff" stroke-width="5"/>${[[28, 28], [66, 30], [36, 64], [72, 70], [58, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff"/>`).join("")}`);
  // Showabend mit Cats: Katzen-Darsteller, Mond, Scheinwerfer, Schrottplatz-Kulisse
  const catPerf = (fur, eye = "#ffd23a") => `<path d="M30 92q0-30 20-30t20 30z" fill="${fur}" ${kO}/><path d="M30 40l2-24 14 12h8l14-12 2 24q2 22-20 24-22-2-20-24z" fill="${fur}" ${kO}/><path d="M34 22l2 10 6 2M66 22l-2 10-6 2" fill="#ffb3c6" stroke="${KI}" stroke-width="1"/><path d="M38 40q5-5 10 0-5 5-10 0zM52 40q5-5 10 0-5 5-10 0z" fill="${eye}" ${kO2}/><path d="M43 37v6M57 37v6" stroke="${KI}" stroke-width="2"/><path d="M47 50l3 3 3-3z" fill="#ff8fb1"/>${[-1, 1].map(d => `<path d="M${50 + d * 6} 52l${d * 18} -4M${50 + d * 6} 55l${d * 18} 2" stroke="#fff" stroke-width="1.2"/>`).join("")}<path d="M44 26l6 6 6-6" stroke="#fff" stroke-width="2" fill="none"/>`;
  const buehneKatze1 = B("#2a1f5e", `<circle cx="78" cy="18" r="10" fill="#fff6c8" ${kO2}/>${catPerf("#f4f1ea")}`);
  const buehneKatze2 = B("#2a1f5e", `${catPerf("#c98a3a", "#4fd1c5")}<path d="M30 86q20-6 40 0" stroke="#e2402f" stroke-width="3" fill="none"/>`);
  const buehneKatze3 = B("#2a1f5e", `${catPerf("#2d3036", "#3fae4a")}${[[16, 16], [84, 26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join("")}`);
  const vollmond = B("#12205e", `<circle cx="50" cy="44" r="30" fill="#fff6c8" ${kO}/><circle cx="40" cy="38" r="5" fill="#f2e3a8"/><circle cx="60" cy="52" r="7" fill="#f2e3a8"/><path d="M14 92l14-22 14 22M56 92l12-18 12 18" fill="${KI}"/>`);
  const scheinwerfer = B("#12205e", `<path d="M30 20l-16 72h72l-16-72z" fill="#fff6a0" opacity=".25"/><rect x="34" y="6" width="32" height="18" rx="4" fill="${KI}" ${kO2}/><circle cx="50" cy="22" r="8" fill="#fff6a0"/>`);
  const schrott = B("#3a3548", `<rect x="14" y="54" width="28" height="36" rx="3" fill="#9aa3b1" ${kO}/><path d="M12 54h32" stroke="${KI}" stroke-width="5"/><path d="M50 90l6-30h26l6 30z" fill="#c9935a" ${kO}/><circle cx="70" cy="40" r="12" fill="none" stroke="#6b7280" stroke-width="5"/><path d="M20 40l20-12" stroke="#8a5a2b" stroke-width="5"/>`);
  const publikum = B("#2a1f5e", `${[22, 50, 78].map((x, i) => `<g class="fan" style="animation-delay:${i * .3}s"><path d="M${x - 12} 96q0-22 12-22t12 22z" fill="${["#e2402f", "#2b5fd9", "#3fae4a"][i]}" ${kO2}/><circle cx="${x}" cy="64" r="9" fill="#f6cfae" ${kO2}/></g>`).join("")}<path d="M4 50h92" stroke="#e2402f" stroke-width="10"/><path d="M4 46h92" stroke="#ffd23a" stroke-width="2"/>`);
  // Dänemark an Silvester
  const ferienhaus = B("#12205e", `<rect x="14" y="48" width="72" height="42" fill="#b5302a" ${kO}/>${[24, 36, 48, 60, 72].map(x => `<path d="M${x} 50v40" stroke="#8a1f1a" stroke-width="1.6"/>`).join("")}<path d="M8 50l42-26 42 26" fill="${KI}" ${kO2}/><rect x="24" y="58" width="16" height="14" fill="#fff6a0" ${kO2}/><rect x="58" y="62" width="14" height="28" fill="#fff" ${kO2}/>${flagDK(88, 40, .9)}`);
  const feuerwerk = B("#12205e", `${[[28, 30, "#ff5fa2"], [70, 26, "#ffd23a"], [52, 60, "#4fd1ff"]].map(([x, y, c]) => Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M${x} ${y}l${Math.cos(a) * 15} ${Math.sin(a) * 15}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`; }).join("")).join("")}`);
  const kransekage = B("#fff6dc", kranse(.95, 50, 52));
  const dannebrog = B("#9fd8ff", `<path d="M20 92V10" stroke="${KI}" stroke-width="4"/><rect x="20" y="12" width="64" height="44" fill="#c8102e" ${kO}/><path d="M42 12v44M20 34h64" stroke="#fff" stroke-width="9"/>`);
  const sekt = B("#2b3a67", `<path d="M30 92h20l-2-50q8-10 0-26h-16q-8 16 0 26z" fill="#2f6b3f" ${kO}/><rect x="34" y="6" width="12" height="12" fill="#ffd23a" ${kO2}/>${[58, 74].map(x => `<path d="M${x - 8} 40h16l-2 18q-6 6-12 0z" fill="#fff6c8" fill-opacity=".8" ${kO2}/><path d="M${x} 58v20M${x - 6} 80h12" stroke="${KI}" stroke-width="2"/>`).join("")}`);
  const kamin = B("#e9e4d6", `<rect x="16" y="20" width="68" height="70" fill="#b5302a" ${kO}/><path d="M28 90V52q0-14 22-14t22 14v38z" fill="${KI}"/><path class="flame" d="M38 90q-2-20 8-26 0 10 4 12 2-8 8-12 0 16 4 26z" fill="#ff8a1a"/><rect x="10" y="16" width="80" height="8" fill="#8a5a2b" ${kO2}/>`);
  const schnee = B("#bfe3ff", `<path d="M4 76q24-12 46-2t46 0v20H4z" fill="#ffffff" ${kO2}/>${[[20, 20], [44, 34], [70, 18], [84, 44], [30, 52], [62, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`).join("")}`);
  const SC = [
    ["Kreta", "ur_kreta", PAL("#dff3ff", "#f4fbff"), kFloor("#f4efe4", "#f4efe4", () => `<path d="M0 50h100M50 0v100" stroke="#e2d8c6" stroke-width="2"/>`), [haeuser, olive, taverne, windmuehle, sonne], "koffer", ["stein", "#f2efe6"], [AR, MA],
      "Bring jeden Koffer auf sein Zimmer. Koffer lassen sich nur schieben, nicht ziehen."],
    ["Klong! auf Kreta", "ur_klong", PAL("#f2e3c6", "#fbf4e6"), kFloor("#d9b98a", "#d9b98a", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#c4a272" stroke-width="2"/>`), [drache, dungeon, artefakt, karten, beutel, figuren], "wuerfel", ["stein", "#f2efe6"], [AR, MA],
      "Bring jeden Klong-Würfel an seinen Platz. Würfel lassen sich nur schieben, nicht ziehen."],
    ["Fuerteventura", "ur_surf", PAL("#ffe8c8", "#fff6e8"), kFloor("#f2d79b", "#f2d79b", (x, y) => pick(x, y, 1, 4) === 0 ? `<path d="M30 60q6-4 12 0" stroke="#d9b56a" stroke-width="2" fill="none"/>` : ""), [duene, strandbar, welle, palme, windsurfer], "surf", ["fels", "#8a5a3a"], [AR, MA],
      "Leg jedes Surfbrett an seinen Platz. Bretter lassen sich nur schieben, nicht ziehen."],
    ["Showabend mit Cats", "ur_cats", PAL("#1d1640", "#3a2a6b", "#ffe3f1", "#ffffff"), kFloor("#5b3a20", "#5b3a20", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#4a2e18" stroke-width="2"/>`), [buehneKatze1, buehneKatze2, buehneKatze3, vollmond, scheinwerfer, schrott, publikum], "maske", ["paneel", "#2a1f5e"], [AR, MA],
      "Bring jede Katzenmaske auf ihren Platz auf der Bühne. Masken lassen sich nur schieben, nicht ziehen."],
    ["Silvester in Dänemark", "ur_dk", PAL("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), kFloor("#d9b98a", "#d9b98a", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#c4a272" stroke-width="2"/>`), [ferienhaus, feuerwerk, kransekage, dannebrog, sekt, kamin, schnee], "kranse", ["bretter", "#b5302a"], [AL, EN, AN, LA, SO, ID, AR, MA],
      "Stell jedes Kransekage-Türmchen an seinen Platz. Sie lassen sich nur schieben, nicht ziehen."],
    ["Jungle Party", "ur_jungle", PAL("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), kFloor("#d9b98a", "#d9b98a", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#c4a272" stroke-width="2"/>`), [fernseher, konsole, buzzer, liane, bananen, pupsAffe, fenster], "affe", ["bretter", "#b5302a"], [AL, EN, AN, LA, SO, ID, AR, MA],
      "Bring jeden bunten Affen auf seinen Platz – Vorsicht, sie pupsen! Affen lassen sich nur schieben, nicht ziehen."]
  ];
  // Kreta, Klong!, Fuerteventura, Showabend, Silvester in Dänemark, Jungle Party (auch in Dänemark)
  const at = (l) => [0, 1, 2, 3, 4, 5][l];
  const bunt = [["#2b5fd9", "#ffffff"], ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a"], ["#ff8a1a", "#ffd23a", "#4fd1ff"], ["#ff5fa2", "#ffd23a", "#8b5cf6"], ["#c8102e", "#ffffff"], ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a"]];
  const scenes = SC.map(([name, outfit, pal, floor, walls, kind, base, people], i) => { BASE_WALL[name] = base; OUTFIT[name] = outfit;
    const sc = kScene(name, outfit, pal, floor, walls, () => bunting(bunt[i])); sc.wall = feierWalls(walls, () => people.map(f => f()));
    if (kind === "affe") { sc.fart = true; sc.words = ["PUPS!", "PFFRT!", "HUH-HUH!"]; } return sc; });
  THEMES.urlaub = theme2({
    title: "Urlaub", worldName: "Urlaub", emblem: "k3sonne", box: "k3urkoffer-0", mapIcon: "k3sonne", boxWord: "Sachen", pushWord: "Schübe",
    hint: (l) => SC[at(l)][8],
    winTitle: (l) => at(l) === 5 ? "PUPS-PARTY!" : at(l) === 4 ? "GODT NYTÅR!" : at(l) === 3 ? "MIAU!" : at(l) === 1 ? "KLONG!" : "URLAUB!", winText: (m, p) => `Alles am Platz. ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldkoffer", title: "Goldener Koffer!", text: (m) => `Kreta, Fuerteventura mit Showabend und Silvester in Dänemark – was für Urlaube! Finale in ${m} Schritten.` },
    pal: { "--accent": "#2b9fe0", "--accent-dark": "#1f6fa8" },
    target: platz, scenes, levelScenes: [0, 1, 2, 3, 4, 5].map(l => scenes[at(l)]),
    levelName: (l) => SC[at(l)][0], levelBox: (l) => `k3ur${SC[at(l)][5]}-0`, boxCycle: (l) => PL.map((_, i) => `k3ur${SC[at(l)][5]}-${i}`)
  });
}

// ---------- Welt 8: Atschibella (Alex) – Hochzeit, Hamburg, Klassenzimmer; Aperol zieht sich durch ----------
{
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const B = (bg, inner) => () => kB(bg, inner);
  const heart = (x, y, r, c) => `<path d="M${x} ${y + r * .9}c${-r * 1.6} ${-r} ${-r * 1.4} ${-r * 2.2} ${-r * .5} ${-r * 2.2} ${r * .3} 0 ${r * .5} ${r * .3} ${r * .5} ${r * .3}s${r * .2} ${-r * .3} ${r * .5} ${-r * .3}c${r * .9} 0 ${r * 1.1} ${r * 1.2} ${-r * .5} ${r * 2.2}z" fill="${c}" ${kO2}/>`;
  const aperolGlas = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -24h28q2 22-14 28-16-6-14-28z" fill="#ff7a1a" fill-opacity=".88" ${kO2}/><path d="M0 4v16M-9 22h18" stroke="${KI}" stroke-width="2.2"/><circle cx="12" cy="-24" r="6" fill="#ffb02e" ${kO2}/><circle cx="12" cy="-24" r="3.6" fill="#ffd36b"/><path d="M-6 -24l-4-14" stroke="#ef4b4b" stroke-width="2"/></g>`;
  const ITEMS = {
    geschenk: (c) => `<rect x="18" y="38" width="64" height="48" rx="4" fill="${c}" ${kO}/><rect x="14" y="30" width="72" height="14" rx="3" fill="${c}" ${kO}/><path d="M50 30v56" stroke="#fff" stroke-width="7"/><path d="M50 30q-18-20-22-6 4 8 22 6zM50 30q18-20 22-6-4 8-22 6z" fill="#fff" ${kO2}/>`,
    ballon: (c) => `<path d="M50 70q-2 10 4 22" stroke="${KI}" stroke-width="1.6" fill="none"/>${heart(50, 50, 26, c)}<path d="M36 30q4-6 10-6" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/><path d="M46 70l4 6 4-6z" fill="${c}" ${kO2}/>`,
    heft: (c) => `<g transform="rotate(-8 50 52)"><rect x="22" y="16" width="54" height="72" rx="3" fill="${c}" ${kO}/><rect x="30" y="28" width="38" height="16" rx="2" fill="#fff" ${kO2}/><path d="M34 34h28M34 39h20" stroke="${KI}" stroke-width="1.6"/><path d="M22 16v72" stroke="color-mix(in srgb, ${c} 60%, #000)" stroke-width="5"/></g>`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(ITEMS).map(k => PL.map((c, i) =>
    `<symbol id="k3at${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="92" rx="30" ry="5" fill="#0003"/>${ITEMS[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="k3herz" viewBox="0 0 100 100">${heart(50, 54, 30, "#ff5fa2")}${aperolGlas(70, 74, .6)}</symbol>
     <symbol id="k3goldring" viewBox="0 0 100 100"><circle cx="42" cy="56" r="24" fill="none" stroke="url(#gold)" stroke-width="10"/><circle cx="62" cy="50" r="24" fill="none" stroke="url(#gold)" stroke-width="10"/><circle cx="42" cy="56" r="24" fill="none" stroke="#9a6404" stroke-width="2"/><path d="M58 22l6-10 6 10z" fill="#9fe8ff" stroke="#2d3036" stroke-width="2"/></symbol>`);
  const platz = kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="12" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/>${heart(50, 50, 14, "#ffffff")}`);
  Object.assign(LASSE, {
    at_hochzeit: kChristian({ shirt: KI, pants: KI, shoes: KI, body: `<path d="M44 44l6 14 6-14z" fill="#fff" ${kO2}/><path d="M44 46l6 3 6-3-6 3z" fill="${KI}"/><circle cx="60" cy="50" r="3.4" fill="#ff5fa2" ${kO2}/><path d="M60 54v4" stroke="#3fae4a" stroke-width="2"/>` }),
    at_hamburg: kChristian({ shirt: "#ffd23a", pants: "#2b3a67", shoes: KI, body: `<path d="M50 44v24" stroke="${KI}" stroke-width="2"/>${[50, 58, 64].map(y => `<circle cx="54" cy="${y}" r="1.6" fill="${KI}"/>`).join("")}`, head: `<path d="M32 18q0-12 18-12t18 12z" fill="#1f2a44" ${kO}/><path d="M28 18h40l-4 4H32z" fill="${KI}" ${kO2}/><path d="M34 12h32" stroke="#ffd23a" stroke-width="1.6"/>` }),
    at_schule: kChristian({ shirt: "#3fae4a", pants: "#33507f", shoes: "#ffffff", body: `<path d="M40 46l3 22M60 46l-3 22" stroke="#e2402f" stroke-width="3.4"/>`, hand: `<path d="M66 38l20 6-10 34z" fill="#ff5fa2" ${kO2}/><path d="M66 38l20 6" stroke="#ffd23a" stroke-width="4"/><path d="M70 32q6 4 14 8" stroke="#3fae4a" stroke-width="3" fill="none"/>` })
  });
  // Alex: als Braut mit Schleier, sonst wie immer
  const alexTile = (bg, extra = "") => () => asPerson(kB(bg, `<g transform="translate(8 10) scale(.84)">${ALEX}</g>${extra}`), "alex");
  const schleier = `<path d="M22 22q28-26 56 0l8 60q-36 10-72 0z" fill="#ffffff" fill-opacity=".55" stroke="#e9e6df" stroke-width="1.4"/><path d="M34 16q16-8 32 0" stroke="#fff" stroke-width="4" fill="none"/>${[36, 50, 64].map(x => `<circle cx="${x}" cy="14" r="3" fill="#ff8fb1" ${kO2}/>`).join("")}`;
  const ALH = alexTile("#ffe3f1", schleier), AL = alexTile("#fff0e0"), ALS = alexTile("#e6f2e6", aperolGlas(80, 40, .5));
  // Hochzeit
  const torte = B("#fff0f6", `${[[50, 80, 34, 16], [50, 62, 26, 14], [50, 46, 18, 12]].map(([x, y, w, h]) => `<rect x="${x - w}" y="${y - h}" width="${w * 2}" height="${h}" rx="4" fill="#fffaf0" ${kO2}/><path d="M${x - w} ${y - h + 4}q${w / 2} 6 ${w} 0t${w} 0" stroke="#ff8fb1" stroke-width="2" fill="none"/>`).join("")}${heart(50, 26, 7, "#e2402f")}`);
  const ringe = B("#fff0f6", `<circle cx="40" cy="56" r="18" fill="none" stroke="#ffd23a" stroke-width="7"/><circle cx="60" cy="50" r="18" fill="none" stroke="#ffd23a" stroke-width="7"/><path d="M56 28l5-8 5 8z" fill="#9fe8ff" ${kO2}/>`);
  const bogen = B("#e6f5d8", `<path d="M16 92V40q34-40 68 0v52" fill="none" stroke="#3fae4a" stroke-width="8"/>${[[18, 50], [30, 26], [50, 16], [70, 26], [82, 50]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="${["#ff5fa2", "#fff", "#ffd23a", "#fff", "#ff5fa2"][i]}" ${kO2}/>`).join("")}`);
  const kirche = B("#bfe3ff", `<rect x="30" y="44" width="40" height="48" fill="#f4f1ea" ${kO}/><path d="M26 46L50 24l24 22" fill="#c0392b" ${kO2}/><path d="M50 24V6M44 12h12" stroke="${KI}" stroke-width="3"/><path d="M42 92V70q8-10 16 0v22" fill="#a8743f" ${kO2}/>`);
  const anstossen = B("#fff0f6", `${aperolGlas(36, 62, 1)}${aperolGlas(64, 62, 1)}<path d="M44 28l6-8 6 8" stroke="#ffd23a" stroke-width="3" fill="none"/>`);
  // Hamburg
  const elphi = B("#9fd8ff", `<path d="M14 92V50h72v42z" fill="#a8473a" ${kO2}/><path d="M14 50q10-20 20-6 8-18 18-4 10-16 18 0 8-12 16 10z" fill="#e6eef6" ${kO}/>${[24, 40, 56, 72].map(x => `<path d="M${x} 52v8" stroke="#9fd8ff" stroke-width="4"/>`).join("")}<rect x="4" y="88" width="92" height="8" fill="#2b9fe0"/>`);
  const michel = B("#bfe3ff", `<path d="M40 92V44h20v48z" fill="#a8473a" ${kO}/><path d="M42 44V30h16v14" fill="#3f8a6a" ${kO2}/><path d="M44 30l6-24 6 24z" fill="#3f8a6a" ${kO2}/><circle cx="50" cy="56" r="5" fill="#ffd23a" ${kO2}/>`);
  const bruecken = B("#9fd8ff", `<rect x="8" y="56" width="84" height="22" fill="#c9935a" ${kO}/><rect x="62" y="24" width="16" height="32" fill="#c9935a" ${kO2}/><circle cx="70" cy="34" r="5" fill="#fff" ${kO2}/><path d="M60 24l10-10 10 10" fill="#3f8a6a" ${kO2}/><rect x="4" y="80" width="92" height="16" fill="#2b9fe0"/>`);
  const faehre = B("#2b9fe0", `<path d="M14 56h72l-8 18H22z" fill="#ffffff" ${kO}/><rect x="30" y="40" width="40" height="16" fill="#e2402f" ${kO2}/>${[36, 48, 60].map(x => `<rect x="${x}" y="44" width="6" height="6" fill="#9fd8ff"/>`).join("")}<path d="M4 84q12-4 24 0t24 0 24 0 20 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  const schloss = B("#f2e3c6", `<path d="M10 40h80" stroke="#9aa3b1" stroke-width="4"/>${[[24, "#ff5fa2"], [50, "#e2402f"], [76, "#ffd23a"]].map(([x, c]) => `<path d="M${x - 6} 44v-6q0-6 6-6t6 6v6" fill="none" stroke="${KI}" stroke-width="2.4"/>${heart(x, 54, 10, c)}`).join("")}`);
  const aperolHH = B("#fff0e0", `${aperolGlas(40, 62, 1.1)}<path d="M64 90V40h20v50" fill="#ff7a1a" fill-opacity=".85" ${kO2}/><rect x="66" y="30" width="16" height="10" fill="${KI}"/>`);
  // Klassenzimmer: Mathe und Englisch an der Grundschule
  const tafelMathe = B("#8a5a2b", `<rect x="8" y="12" width="84" height="64" fill="#2f6b4f" ${kO}/><text x="50" y="40" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-weight="700" font-size="17" fill="#ffffff">1 + 1 = 2</text><text x="50" y="64" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-weight="700" font-size="17" fill="#ffd23a">3 · 4 = 12</text><path d="M30 80h40" stroke="#f4f1ea" stroke-width="4"/>`);
  const tafelEnglisch = B("#8a5a2b", `<rect x="8" y="12" width="84" height="64" fill="#2f6b4f" ${kO}/><text x="50" y="38" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-weight="700" font-size="16" fill="#ffffff">Hello!</text><text x="50" y="62" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-weight="700" font-size="11" fill="#ffffff">How are you?</text>`);
  const rechenschieber = B("#fff6dc", `<rect x="10" y="16" width="80" height="68" fill="none" stroke="#a8743f" stroke-width="6"/>${[28, 42, 56, 70].map((y, r) => `<path d="M12 ${y}h76" stroke="${KI}" stroke-width="1.4"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${20 + i * 8 + (r % 2) * 30}" cy="${y}" r="4.4" fill="${i < 3 ? "#e2402f" : "#ffffff"}" ${kO2}/>`).join("")}`).join("")}`);
  const wortkarte = B("#fff6dc", `<rect x="14" y="14" width="72" height="72" rx="6" fill="#ffffff" ${kO}/><circle cx="50" cy="44" r="18" fill="#c9935a" ${kO2}/><circle cx="44" cy="40" r="2.4" fill="${KI}"/><circle cx="56" cy="40" r="2.4" fill="${KI}"/><ellipse cx="50" cy="48" rx="4" ry="3" fill="${KI}"/><path d="M34 32q-6 8-2 16M66 32q6 8 2 16" stroke="#8a5a2b" stroke-width="5" fill="none"/><text x="50" y="80" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-weight="700" font-size="14" fill="#2b5fd9">dog</text>`);
  const unionjack = B("#fff6dc", `<path d="M4 20q46 14 92 0" stroke="${KI}" stroke-width="1.6" fill="none"/>${[18, 42, 66, 88].map((x, i) => `<g transform="translate(${x - 9} ${22 + (i % 2) * 3})"><path d="M0 0h18l-9 16z" fill="#1f3f8a" ${kO2}/><path d="M9 0v14M2 4l14 0" stroke="#fff" stroke-width="3"/><path d="M9 0v14M2 4l14 0" stroke="#e2402f" stroke-width="1.4"/></g>`).join("")}${[[26, 66, "#ffd23a"], [60, 70, "#3fae4a"]].map(([x, y, c]) => `<rect x="${x - 14}" y="${y - 14}" width="28" height="26" fill="#fff" ${kO2}/><circle cx="${x}" cy="${y - 2}" r="7" fill="${c}"/>`).join("")}`);
  const pult = B("#fff6dc", `<rect x="10" y="50" width="80" height="10" rx="2" fill="#a8743f" ${kO}/><path d="M18 60v30M82 60v30" stroke="#8a5a2b" stroke-width="5"/><rect x="20" y="38" width="26" height="12" fill="#2b5fd9" ${kO2}/>${aperolGlas(70, 44, .7)}`);
  const SC = [
    ["Hochzeit", "at_hochzeit", PAL("#fff0f6", "#fffafc"), kFloor("#fbe8ee", "#fbe8ee", (x, y) => pick(x, y, 1, 4) === 0 ? `<path d="M50 60c-8-6-8-14-2-14 2 0 2 2 2 2s0-2 2-2c6 0 6 8-2 14z" fill="#ff8fb1" opacity=".6"/>` : ""), [torte, ringe, bogen, kirche, anstossen], "geschenk", ["latten", "#ffffff"], [ALH],
      "Bring jedes Hochzeitsgeschenk an seinen Platz. Geschenke lassen sich nur schieben, nicht ziehen."],
    ["Hamburg", "at_hamburg", PAL("#dff1ff", "#f4fbff"), kFloor("#c9ced8", "#c9ced8", () => `<path d="M0 50h100M50 0v50M25 50v50M75 50v50" stroke="#aeb4bf" stroke-width="2"/>`), [elphi, michel, bruecken, faehre, aperolHH], "ballon", ["ziegel", "#a8473a"], [AL],
      "Bring jeden Herz-Ballon an seinen Platz an der Elbe. Ballons lassen sich nur schieben, nicht ziehen."],
    ["Klassenzimmer", "at_schule", PAL("#fff6dc", "#fffcf2"), kFloor("#e8c795", "#e8c795", () => `<path d="M0 25h100M0 50h100M0 75h100" stroke="#d1ad75" stroke-width="2"/>`), [tafelMathe, tafelEnglisch, rechenschieber, wortkarte, unionjack, pult], "heft", ["farbe", "#9fc7e8"], [ALS],
      "Leg jedes Schulheft auf seinen Tisch. Hefte lassen sich nur schieben, nicht ziehen."]
  ];
  const at = (l) => Math.min(2, Math.floor(l / 2));
  const bunt = [["#ff5fa2", "#ffffff", "#ffd23a"], ["#2b5fd9", "#ffffff", "#e2402f"], ["#1f3f8a", "#ffffff", "#e2402f"]];
  const scenes = SC.map(([name, outfit, pal, floor, walls, kind, base, people], i) => { BASE_WALL[name] = base; OUTFIT[name] = outfit;
    const sc = kScene(name, outfit, pal, floor, walls, () => bunting(bunt[i])); sc.wall = feierWalls(walls, () => people.map(f => f()));
    if (kind === "heft") sc.allowText = true; return sc; });
  THEMES.atschie = theme2({
    title: "Atschibella", worldName: "Atschibella", emblem: "k3herz", box: "k3atgeschenk-0", mapIcon: "k3herz", boxWord: "Sachen", pushWord: "Schübe",
    hint: (l) => SC[at(l)][8],
    winTitle: (l) => ["JA, ICH WILL!", "MOIN!", "VERY GOOD!"][at(l)], winText: (m, p) => `Cheers mit Aperol! ${m} Schritte, ${p} Schübe.`,
    prize: { symbol: "k3goldring", title: "Goldene Ringe!", text: (m) => `Für Atschibella – Liebe, Hamburg und Aperol! Finale in ${m} Schritten.` },
    pal: { "--accent": "#ff5fa2", "--accent-dark": "#c2418a" },
    target: platz, scenes,
    levelName: (l) => SC[at(l)][0], levelBox: (l) => `k3at${SC[at(l)][5]}-0`, boxCycle: (l) => PL.map((_, i) => `k3at${SC[at(l)][5]}-${i}`)
  });
}

// ---------- Hilfen für Welt 9 und 10: Welt mit sechs eigenen Schauplätzen ----------
const k3World = ({ key, prefix, title, emblem, items, emblemSvg, prizeSym, prizeSvg, prize, accent, accentDark, target, winTitles, winText, SC }) => {
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.keys(items).map(k => PL.map((c, i) =>
    `<symbol id="${prefix}${k}-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="92" rx="30" ry="5" fill="#0003"/>${items[k](c)}</symbol>`).join("")).join("") +
    `<symbol id="${emblem}" viewBox="0 0 100 100">${emblemSvg}</symbol><symbol id="${prizeSym}" viewBox="0 0 100 100">${prizeSvg}</symbol>`);
  const scenes = SC.map(s => { BASE_WALL[s.name] = s.base; OUTFIT[s.name] = s.outfit;
    const sc = kScene(s.name, s.outfit, s.pal, s.floor, s.walls, () => bunting(s.bunt || ["#ffd23a", "#ff5fa2", "#4fd1ff", "#3fae4a"]));
    if (s.people) sc.wall = feierWalls(s.walls, () => s.people.map(f => f()));
    if (s.allowText) sc.allowText = true; if (s.words) sc.words = s.words; return sc; });
  THEMES[key] = theme2({
    title, worldName: title, emblem, box: `${prefix}${SC[0].kind}-0`, mapIcon: emblem, boxWord: "Sachen", pushWord: "Schübe",
    hint: (l) => SC[l].hint, winTitle: (l) => winTitles[l], winText,
    prize: { symbol: prizeSym, title: prize[0], text: prize[1] },
    pal: { "--accent": accent, "--accent-dark": accentDark }, target, scenes, levelScenes: scenes,
    levelName: (l) => SC[l].name, levelBox: (l) => `${prefix}${SC[l].kind}-0`, boxCycle: (l) => PL.map((_, i) => `${prefix}${SC[l].kind}-${i}`)
  });
};
const k3B = (bg, inner) => () => kB(bg, inner);
const k3Who = (fig, id, bg) => () => asPerson(kB(bg, `<g transform="translate(8 10) scale(.84)">${fig}</g>`), id);
const k3Star = (x, y, r, c = "#fff6a0") => `<path d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="${c}" ${kO2}/>`;
const k3Platz = (deco) => kTarget(`${kGlow(`<rect x="12" y="14" width="76" height="74" opacity="0"/>`)}<rect x="12" y="14" width="76" height="74" rx="12" fill="none" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 7"/>${deco}`);

// ---------- Welt 9: Atributschi – Anna, Sören, Matze, Arne, Alex und Schristian ----------
{
  const AN = k3Who(ANNA, "anna", "#fff0d8"), SO = k3Who(SOEREN, "soeren", "#dfeefb"), MA = k3Who(MATZE, "matze", "#dfeefb"), AR = k3Who(ARNE, "arne", "#fff0d8"), AL = k3Who(ALEX, "alex", "#ffe3f1");
  const FR = [AN, SO, MA, AR, AL];
  const pips = (n) => ({ 1: [[50, 50]], 2: [[36, 36], [64, 64]], 3: [[34, 34], [50, 50], [66, 66]], 4: [[36, 36], [64, 36], [36, 64], [64, 64]], 5: [[34, 34], [66, 34], [50, 50], [34, 66], [66, 66]], 6: [[36, 32], [64, 32], [36, 50], [64, 50], [36, 68], [64, 68]] })[n];
  const items = {
    wuerfel: (c) => `<rect x="18" y="18" width="64" height="64" rx="12" fill="${c}" ${kO}/><path d="M24 26h40" stroke="#fff" stroke-width="3" opacity=".4" stroke-linecap="round"/>${pips(5).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff" ${kO2}/>`).join("")}`,
    figur: (c) => `<circle cx="50" cy="26" r="14" fill="${c}" ${kO}/><path d="M30 86q-4-20 8-34 6-8 12-8t12 8q12 14 8 34z" fill="${c}" ${kO}/><path d="M24 54q8-8 14-2M76 54q-8-8-14-2" stroke="${c}" stroke-width="10" stroke-linecap="round"/><path d="M40 22q4-6 10-6" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`,
    topf: (c) => `<path d="M16 44h68v32q0 10-10 10H26q-10 0-10-10z" fill="#c9ced8" ${kO}/><path d="M8 50h8M84 50h8" stroke="${KI}" stroke-width="5" stroke-linecap="round"/><path d="M14 44q36-20 72 0z" fill="${c}" ${kO}/><circle cx="50" cy="30" r="5" fill="${c}" ${kO2}/><path class="steam" d="M36 22q-4-8 0-14M64 22q-4-8 0-14" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    auflauf: (c) => `<rect x="10" y="40" width="80" height="40" rx="8" fill="${c}" ${kO}/><path d="M4 52h8M88 52h8" stroke="${KI}" stroke-width="5" stroke-linecap="round"/><path d="M16 44h68v8q-34 8-68 0z" fill="#ffd36b" ${kO2}/>${[[28, 46], [46, 48], [64, 45], [76, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#c0392b"/>`).join("")}`,
    kiste: (c) => `<rect x="12" y="34" width="76" height="52" rx="4" fill="${c}" ${kO}/><rect x="36" y="40" width="28" height="10" rx="5" fill="${KI}"/>${[24, 40, 56, 72].map(x => `<rect x="${x - 6}" y="16" width="12" height="20" rx="3" fill="#7a4a1a" ${kO2}/><rect x="${x - 3}" y="10" width="6" height="8" fill="#ffd23a" ${kO2}/>`).join("")}<path d="M12 60h76" stroke="color-mix(in srgb, ${c} 60%, #000)" stroke-width="2"/>`,
    flasche: (c) => `<path d="M40 30V12h20v18q12 8 12 22v34q0 6-6 6H34q-6 0-6-6V52q0-14 12-22z" fill="${c}" fill-opacity=".9" ${kO}/><rect x="38" y="6" width="24" height="8" rx="2" fill="#ffd23a" ${kO2}/><rect x="30" y="54" width="40" height="22" rx="3" fill="#fff" ${kO2}/>${k3Star(50, 65, 7, "#ffd23a")}<path d="M36 34v40" stroke="#fff" stroke-width="3" opacity=".4"/>`
  };
  Object.assign(LASSE, {
    ab_spiel: kChristian({ shirt: "#8b5cf6", pants: "#33507f", shoes: "#ffffff", body: `<rect x="44" y="50" width="12" height="12" rx="3" fill="#fff" ${kO2}/><circle cx="47" cy="53" r="1.4" fill="${KI}"/><circle cx="53" cy="59" r="1.4" fill="${KI}"/>` }),
    ab_duell: kChristian({ shirt: KI, pants: "#33507f", shoes: "#ffffff", body: k3Star(50, 56, 6, "#ffd23a"), head: `<path d="M32 16l6-12 6 8 6-10 6 10 6-8 6 12z" fill="url(#gold)" stroke="#9a6404" stroke-width="2"/>` }),
    ab_koch: kChristian({ shirt: "#ffffff", pants: "#33507f", shoes: KI, body: `<path d="M40 48h20v22H40z" fill="#e2402f" ${kO2}/>`, head: `<path d="M36 16h28v-6q6-2 4-8-2-6-10-2-3-6-8-4-6-2-8 4-8-4-10 2-2 6 4 8z" fill="#ffffff" ${kO}/>`, hand: `<path d="M70 70l14-28" stroke="#a8743f" stroke-width="3.4" stroke-linecap="round"/><ellipse cx="86" cy="38" rx="5" ry="7" fill="#a8743f" ${kO2}/>` }),
    ab_essen: kChristian({ shirt: "#2b5fd9", pants: "#33507f", shoes: KI, body: `<path d="M44 44l6 4 6-4v24H44z" fill="#fff" ${kO2}/>` , hand: `<path d="M72 70V44M78 70V44M84 70V44M70 44h16" stroke="#9aa3b1" stroke-width="2.4"/>` }),
    ab_prost: kChristian({ shirt: "#3fae4a", pants: "#33507f", shoes: "#ffffff", body: `<path d="M44 44q6 6 12 0" fill="none" stroke="${KI}" stroke-width="2"/>`, hand: `<rect x="68" y="44" width="16" height="22" rx="3" fill="#ffd23a" fill-opacity=".9" ${kO2}/><path d="M68 44q8-6 16 0" fill="#fff" ${kO2}/><path d="M84 50h4v10h-4" fill="none" stroke="${KI}" stroke-width="2.4"/>` }),
    ab_absacker: kChristian({ shirt: "#ff5fa2", pants: KI, shoes: "#ffffff", body: `${[[42, 52], [56, 50], [48, 62]].map(([x, y]) => k3Star(x, y, 3, "#ffffff")).join("")}`, head: `<path d="M40 16l10-18 10 18z" fill="#4fd1ff" ${kO2}/><circle cx="50" cy="-2" r="3" fill="#ffd23a" ${kO2}/>` })
  });
  const B = k3B;
  const spielbrett = B("#c9935a", `<rect x="10" y="10" width="80" height="80" rx="4" fill="#3fae4a" ${kO}/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${16 + i * 12}" y="16" width="10" height="10" fill="${["#e2402f", "#ffd23a", "#2b5fd9", "#fff", "#e2402f", "#ffd23a"][i]}" ${kO2}/>`).join("")}<rect x="16" y="76" width="70" height="8" fill="#fff" opacity=".5"/><circle cx="50" cy="52" r="14" fill="#fff6dc" ${kO2}/>`);
  const chips = B("#2b3a67", `<path d="M14 64q36 24 72 0l-6 22H20z" fill="#ff8a1a" ${kO}/>${[[30, 60], [44, 54], [58, 56], [70, 62], [50, 64]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="#ffd36b" ${kO2}/>`).join("")}`);
  const karten = B("#2b3a67", `${[0, 1, 2].map(i => `<rect x="${24 + i * 14}" y="${24 + i * 4}" width="30" height="44" rx="4" fill="#fff" ${kO2} transform="rotate(${-12 + i * 12} ${39 + i * 14} 70)"/>`).join("")}<path d="M62 40l4 6 6-2-2 6 4 4-6 2v6l-4-4-6 2 2-6-4-4 6-2z" fill="#e2402f"/>`);
  const sanduhr = B("#c9935a", `<path d="M30 14h40M30 86h40M34 14q0 26 16 36-16 10-16 36M66 14q0 26-16 36 16 10 16 36" fill="none" stroke="${KI}" stroke-width="3.4"/><path d="M38 24h24q-2 14-12 20-10-6-12-20zM40 80q2-12 10-16 8 4 10 16z" fill="#ffd36b"/>`);
  const siedler = B("#4fa3e0", `${[[34, 30, "#3fae4a"], [66, 30, "#ffd23a"], [18, 58, "#c0392b"], [50, 58, "#9aa3b1"], [82, 58, "#f2c97a"], [34, 86, "#2f8a3a"], [66, 86, "#ffd23a"]].map(([x, y, c]) => `<path d="M${x} ${y - 16}l14 8v16l-14 8-14-8v-16z" fill="${c}" ${kO2}/>`).join("")}`);
  const pokal = B("#2b3a67", `<path d="M30 20h40v20q0 18-20 18T30 40z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><path d="M30 26q-12 0-12 10t12 10M70 26q12 0 12 10t-12 10" fill="none" stroke="#9a6404" stroke-width="4"/><path d="M50 58v14M36 86h28l-4-14H40z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>`);
  const herd = B("#e9e4d6", `<rect x="10" y="40" width="80" height="50" rx="4" fill="#ffffff" ${kO}/><rect x="10" y="40" width="80" height="12" fill="${KI}"/>${[30, 70].map(x => `<ellipse cx="${x}" cy="46" rx="12" ry="4" fill="#e2402f"/>`).join("")}<rect x="22" y="58" width="56" height="26" rx="3" fill="${KI}" ${kO2}/><rect x="28" y="62" width="44" height="18" fill="#ff8a1a" opacity=".6"/>`);
  const schneidebrett = B("#e9e4d6", `<rect x="12" y="38" width="76" height="40" rx="10" fill="#c9935a" ${kO}/>${[[28, "#e2402f"], [44, "#3fae4a"], [60, "#ff8a1a"]].map(([x, c]) => `<circle cx="${x}" cy="56" r="7" fill="${c}" ${kO2}/>`).join("")}<path d="M66 50l20-24 4 4-18 26z" fill="#c9ced8" ${kO2}/>`);
  const kraeuter = B("#e9e4d6", `${[24, 50, 76].map((x, i) => `<path d="M${x - 12} 60h24l-4 26h-16z" fill="#c8643c" ${kO2}/>${[-8, 0, 8].map(d => `<path d="M${x} 60q${d} -14 ${d * 1.5} -26" stroke="#3fae4a" stroke-width="4" fill="none"/><circle cx="${x + d * 1.5}" cy="34" r="5" fill="#5fbf4a"/>`).join("")}`).join("")}`);
  const lasagne = B("#f4e6cf", `<rect x="12" y="36" width="76" height="36" rx="6" fill="#ffffff" ${kO}/>${[44, 52, 60].map(y => `<path d="M16 ${y}h68" stroke="${y === 52 ? "#e2402f" : "#ffd36b"}" stroke-width="6"/>`).join("")}<path d="M16 40h68" stroke="#ffd36b" stroke-width="6"/>`);
  const tafel = B("#f4e6cf", `<rect x="6" y="54" width="88" height="10" rx="2" fill="#a8743f" ${kO}/>${[24, 50, 76].map(x => `<ellipse cx="${x}" cy="52" rx="10" ry="4" fill="#fff" ${kO2}/>`).join("")}<path d="M40 26v26M60 26v26" stroke="#fffaf0" stroke-width="4"/><path d="M40 22q-2-6 0-8 2 2 0 8zM60 22q-2-6 0-8 2 2 0 8z" fill="#ff8a1a"/>`);
  const brot = B("#f4e6cf", `<ellipse cx="50" cy="60" rx="34" ry="18" fill="#d9a35a" ${kO}/>${[36, 50, 64].map(x => `<path d="M${x - 4} 50l8 16" stroke="#a8743f" stroke-width="3"/>`).join("")}`);
  const theke = B("#3a2a22", `<rect x="6" y="56" width="88" height="32" fill="#8a5a2b" ${kO}/><path d="M6 56h88" stroke="#c9935a" stroke-width="5"/>${[24, 40, 56].map((x, i) => `<rect x="${x}" y="34" width="12" height="22" rx="3" fill="${["#ffd23a", "#ff8a1a", "#e2402f"][i]}" fill-opacity=".85" ${kO2}/><path d="M${x} 34q6-5 12 0" fill="#fff" ${kO2}/>`).join("")}<path d="M74 56V30h8v26" fill="#c9ced8" ${kO2}/>`);
  const lichterkette = B("#2b3a67", `<path d="M4 30q46 26 92 0" stroke="${KI}" stroke-width="2" fill="none"/>${[14, 30, 46, 62, 78].map((x, i) => `<circle cx="${x}" cy="${34 + Math.sin(i) * 3 + 6}" r="5" fill="${["#ffd23a", "#ff5fa2", "#4fd1ff", "#3fae4a", "#ff8a1a"][i]}" ${kO2}/>`).join("")}`);
  const prostGlaeser = B("#3a2a22", `<g transform="rotate(-14 36 56)"><rect x="24" y="34" width="22" height="40" rx="4" fill="#ffd23a" fill-opacity=".9" ${kO2}/><path d="M24 34q11-8 22 0" fill="#fff" ${kO2}/></g><g transform="rotate(14 64 56)"><rect x="54" y="34" width="22" height="40" rx="4" fill="#ffd23a" fill-opacity=".9" ${kO2}/><path d="M54 34q11-8 22 0" fill="#fff" ${kO2}/></g><path d="M44 22l6-10 6 10" stroke="#fff" stroke-width="3" fill="none"/>`);
  const disco = B("#1d1d24", `<path d="M50 4v16" stroke="#c9ced8" stroke-width="2"/><circle cx="50" cy="46" r="26" fill="#c9ced8" ${kO}/>${[[40, 34], [52, 30], [62, 40], [44, 50], [58, 54], [48, 62]].map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#fff" opacity=".8"/>`).join("")}${[[14, 20, "#ff5fa2"], [86, 28, "#4fd1ff"], [20, 84, "#ffd23a"], [82, 80, "#3fae4a"]].map(([x, y, c]) => k3Star(x, y, 5, c)).join("")}`);
  const pizzakarton = B("#1d1d24", `<rect x="14" y="40" width="72" height="40" rx="3" fill="#f2e3c6" ${kO}/><path d="M14 40l10-14h52l10 14" fill="#e9d7b2" ${kO2}/><circle cx="50" cy="60" r="12" fill="#e2402f" ${kO2}/>`);
  const mond = B("#12205e", `<circle cx="54" cy="44" r="22" fill="#fff6c8" ${kO2}/><circle cx="64" cy="38" r="20" fill="#12205e"/>${[[20, 24], [30, 70], [80, 76], [78, 20]].map(([x, y]) => k3Star(x, y, 5)).join("")}`);
  const P = (bg, a, b) => PAL(bg, a, b);
  const fl = (c, line = "") => kFloor(c, c, () => line);
  k3World({ key: "atributschi", prefix: "k3ab", title: "Atributschi", emblem: "k3abemblem", items,
    emblemSvg: `${items.wuerfel("#e2402f").replace('x="18" y="18" width="64" height="64"', 'x="10" y="22" width="52" height="52"')}<g transform="translate(40 20) scale(.6)">${items.flasche("#3fae4a")}</g>`,
    prizeSym: "k3abpreis", prizeSvg: `<path d="M30 20h40v20q0 18-20 18T30 40z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/><path d="M50 58v14M36 86h28l-4-14H40z" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>${pips(5).map(([x, y]) => `<circle cx="${30 + x * .4}" cy="${16 + y * .4}" r="2" fill="#9a6404"/>`).join("")}`,
    prize: ["Goldener Atributschi-Pokal!", (m) => `Spielen, Kochen, Essen und Prost – die beste Runde der Welt! Finale in ${m} Schritten.`],
    accent: "#8b5cf6", accentDark: "#5b2a86", target: k3Platz(k3Star(50, 52, 12, "#ffffff")),
    winTitles: ["GEWONNEN!", "SIEG!", "LECKER!", "MAHLZEIT!", "PROST!", "PROST!"], winText: (m, p) => `Die Atributschi sind zufrieden. ${m} Schritte, ${p} Schübe.`,
    SC: [
      { name: "Spieleabend", outfit: "ab_spiel", pal: P("#ece4ff", "#f8f4ff"), floor: fl("#e8c795", `<path d="M0 50h100" stroke="#d1ad75" stroke-width="2"/>`), walls: [spielbrett, chips, karten, sanduhr], kind: "wuerfel", base: ["farbe", "#b9a6e8"], people: FR, hint: "Bring jeden Würfel an seinen Platz. Würfel lassen sich nur schieben, nicht ziehen." },
      { name: "Brettspiel-Duell", outfit: "ab_duell", pal: P("#ece4ff", "#f8f4ff"), floor: fl("#e8c795", `<path d="M0 50h100" stroke="#d1ad75" stroke-width="2"/>`), walls: [siedler, pokal, sanduhr, karten], kind: "figur", base: ["bretter", "#8a5a32"], people: FR, hint: "Zieh jede Spielfigur auf ihr Feld. Figuren lassen sich nur schieben, nicht ziehen." },
      { name: "Gemeinsam kochen", outfit: "ab_koch", pal: P("#fff3df", "#fffaf2"), floor: fl("#e6e2da", `<path d="M0 50h100M50 0v100" stroke="#cfcac0" stroke-width="2"/>`), walls: [herd, schneidebrett, kraeuter], kind: "topf", base: ["fliesen", "#4fa3e0"], people: FR, hint: "Stell jeden Topf auf seinen Platz. Töpfe lassen sich nur schieben, nicht ziehen." },
      { name: "Großes Essen", outfit: "ab_essen", pal: P("#fff3df", "#fffaf2"), floor: fl("#e8c795", `<path d="M0 25h100M0 75h100" stroke="#d1ad75" stroke-width="2"/>`), walls: [lasagne, tafel, brot], kind: "auflauf", base: ["farbe", "#e8a06a"], people: FR, hint: "Stell jede Auflaufform auf die Tafel. Formen lassen sich nur schieben, nicht ziehen." },
      { name: "Prost-Runde", outfit: "ab_prost", pal: P("#2a1f5e", "#5b2a86", "#ffe3f1", "#ffffff"), floor: fl("#c9935a", `<path d="M0 25h100M0 50h100M0 75h100" stroke="#a8743f" stroke-width="2"/>`), walls: [theke, lichterkette, prostGlaeser], kind: "kiste", base: ["ziegel", "#8a3a2a"], people: FR, words: ["PROST!", "PROSIT!", "SKÅL!"], hint: "Stell jede Getränkekiste an ihren Platz. Kisten lassen sich nur schieben, nicht ziehen." },
      { name: "Absacker", outfit: "ab_absacker", pal: P("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), floor: fl("#c9b48a", `<path d="M0 50h100M50 0v100" stroke="#b39d70" stroke-width="2"/>`), walls: [disco, pizzakarton, mond, lichterkette], kind: "flasche", base: ["paneel", "#2b3352"], people: FR, words: ["PROST!", "NOCH EINEN!", "HICKS!"], hint: "Stell jede Flasche an ihren Platz. Flaschen lassen sich nur schieben, nicht ziehen." }
    ] });
}

// ---------- Welt 10: Enni (2) – Duplo, Tanzen, Spielplatz, Planschen, Gute Nacht ----------
{
  const EN = k3Who(ENNI, "enni", "#e6f5d8"), AL = k3Who(ALEX, "alex", "#ffe3f1");
  const duploStein = (c) => `<rect x="12" y="34" width="76" height="50" rx="8" fill="${c}" ${kO}/>${[32, 68].map(x => `<rect x="${x - 12}" y="18" width="24" height="18" rx="8" fill="${c}" ${kO2}/>`).join("")}<path d="M20 44h60" stroke="#fff" stroke-width="3" opacity=".4"/>`;
  const items = {
    duplo: duploStein,
    tier: (c) => `${duploStein(c).replace(/y="34"/, 'y="44"').replace(/height="50"/, 'height="40"')}<circle cx="50" cy="34" r="20" fill="#f4f1ea" ${kO}/><circle cx="34" cy="18" r="7" fill="#f4f1ea" ${kO2}/><circle cx="66" cy="18" r="7" fill="#f4f1ea" ${kO2}/><circle cx="43" cy="32" r="3" fill="${KI}"/><circle cx="57" cy="32" r="3" fill="${KI}"/><ellipse cx="50" cy="42" rx="7" ry="5" fill="#ffb3c6" ${kO2}/>`,
    ballon: (c) => `<path d="M50 70q-4 10 2 22" stroke="${KI}" stroke-width="1.6" fill="none"/><ellipse cx="50" cy="40" rx="24" ry="30" fill="${c}" ${kO}/><path d="M46 70l4 6 4-6z" fill="${c}" ${kO2}/><path d="M38 24q6-8 12-8" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>`,
    eimer: (c) => `<path d="M24 40h52l-6 46H30z" fill="${c}" ${kO}/><path d="M24 40q26-30 52 0" fill="none" stroke="${KI}" stroke-width="3"/><path d="M28 40h44" stroke="#fff" stroke-width="3" opacity=".5"/><path d="M60 30l16-20 4 4-14 18" fill="#ffd23a" ${kO2}/>`,
    ente: (c) => `<path d="M18 62q0-20 26-20h6q-4-16 12-20 14 0 16 14 2 8-4 14 14 2 14 16 0 18-34 18-36 0-36-22z" fill="${c}" ${kO}/><path d="M78 34l12 4-12 6z" fill="#ff8a1a" ${kO2}/><circle cx="66" cy="32" r="3" fill="${KI}"/><path d="M30 60q12 8 24 0" stroke="color-mix(in srgb, ${c} 70%, #000)" stroke-width="3" fill="none"/>`,
    teddy: (c) => `<circle cx="30" cy="22" r="9" fill="${c}" ${kO}/><circle cx="70" cy="22" r="9" fill="${c}" ${kO}/><ellipse cx="50" cy="72" rx="22" ry="18" fill="${c}" ${kO}/><circle cx="50" cy="38" r="20" fill="${c}" ${kO}/><ellipse cx="50" cy="44" rx="8" ry="6" fill="#fff6dc" ${kO2}/><ellipse cx="50" cy="41" rx="3" ry="2.2" fill="${KI}"/><circle cx="42" cy="34" r="2.4" fill="${KI}"/><circle cx="58" cy="34" r="2.4" fill="${KI}"/><path d="M38 58l12 4 12-4v8l-12-4-12 4z" fill="#fff" ${kO2}/>`
  };
  Object.assign(LASSE, {
    en_duplo: kChristian({ shirt: "#3fae4a", pants: "#33507f", shoes: "#ffffff", hand: `<g transform="translate(64 46) scale(.28)">${duploStein("#e2402f")}</g>` }),
    en_hof: kChristian({ shirt: "#ff8a1a", pants: "#33507f", shoes: "#ffffff", hand: `<g transform="translate(64 44) scale(.28)">${items.tier("#2b5fd9")}</g>` }),
    en_tanz: kChristian({ shirt: "#ff5fa2", pants: KI, shoes: "#ffffff", body: `${[[42, 52], [56, 48], [48, 62]].map(([x, y]) => k3Star(x, y, 3, "#ffd23a")).join("")}` }),
    en_spielplatz: kChristian({ shirt: "#ffd23a", pants: "#33507f", shoes: "#3fae4a", head: `<path d="M34 16q0-14 16-14t16 14z" fill="#2b5fd9" ${kO}/><path d="M60 14h10l-1 4h-9z" fill="#2b5fd9" ${kO2}/>`, hand: `<g transform="translate(64 50) scale(.26)">${items.eimer("#e2402f")}</g>` }),
    en_planschen: kChristian({ shirt: "#4fd1c5", pants: "#2b5fd9", shoes: SKIN10, body: `<path d="M38 50q12 8 24 0" stroke="#fff" stroke-width="2" fill="none"/>`, hand: `<g transform="translate(62 50) scale(.26)">${items.ente("#ffd23a")}</g>` }),
    en_nacht: kChristian({ shirt: "#8fbfe0", pants: "#8fbfe0", shoes: "#2b5fd9", body: `${[[42, 52], [56, 50], [48, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#ffd23a"/>`).join("")}`, hand: `<rect x="66" y="48" width="20" height="16" rx="2" fill="#e2402f" ${kO2}/><path d="M76 48v16" stroke="#fff" stroke-width="1.6"/>` })
  });
  const B = k3B;
  const turm = B("#fff6dc", `${[[30, 72, "#e2402f"], [30, 52, "#2b5fd9"], [30, 32, "#ffd23a"], [66, 72, "#3fae4a"], [66, 52, "#ff8a1a"]].map(([x, y, c]) => `<rect x="${x - 16}" y="${y}" width="32" height="20" rx="4" fill="${c}" ${kO2}/>${[-7, 7].map(d => `<rect x="${x + d - 5}" y="${y - 6}" width="10" height="7" rx="3" fill="${c}" ${kO2}/>`).join("")}`).join("")}`);
  const zug = B("#bfe3ff", `<rect x="10" y="44" width="34" height="26" rx="4" fill="#e2402f" ${kO}/><rect x="16" y="30" width="16" height="14" fill="#2b5fd9" ${kO2}/><rect x="50" y="48" width="36" height="22" rx="4" fill="#ffd23a" ${kO}/>${[20, 36, 58, 78].map(x => `<circle cx="${x}" cy="76" r="7" fill="${KI}"/>`).join("")}`);
  const teppich = B("#9ad97a", `<rect x="10" y="10" width="80" height="80" rx="10" fill="#bfe3a0" ${kO2}/><path d="M18 60h64M50 18v64" stroke="#7a7a7a" stroke-width="10"/><path d="M18 60h64M50 18v64" stroke="#fff" stroke-width="2" stroke-dasharray="6 6"/><path d="M24 30l10-8 10 8v12H24z" fill="#ff8fb1" ${kO2}/>`);
  const kuhD = B("#9ad97a", `<rect x="16" y="44" width="68" height="34" rx="8" fill="#ffffff" ${kO}/><path d="M24 50q10 4 8 14-10 0-12-8zM60 56q10-6 14 4-6 8-14 4z" fill="${KI}"/><circle cx="74" cy="38" r="14" fill="#ffffff" ${kO2}/><ellipse cx="78" cy="44" rx="7" ry="5" fill="#ffb3c6"/><path d="M24 78v10M70 78v10" stroke="${KI}" stroke-width="6"/>`);
  const traktorD = B("#bfe3ff", `<rect x="40" y="34" width="34" height="30" rx="6" fill="#3fae4a" ${kO}/><rect x="14" y="48" width="30" height="18" rx="4" fill="#3fae4a" ${kO}/><circle cx="62" cy="72" r="14" fill="${KI}"/><circle cx="62" cy="72" r="6" fill="#ffd23a"/><circle cx="24" cy="76" r="10" fill="${KI}"/>`);
  const tuell = B("#ffe3f1", `<circle cx="50" cy="24" r="10" fill="#ffd9bf" ${kO2}/><path d="M24 70q26-40 52 0z" fill="#ff8fb1" fill-opacity=".8" ${kO2}/><path d="M28 70q22-30 44 0" fill="#ffb3d1" fill-opacity=".8"/><path d="M42 34h16v20H42z" fill="#ff5fa2" ${kO2}/><path d="M44 70l-4 18M56 70l4 18" stroke="#ffd9bf" stroke-width="5"/>${k3Star(80, 20, 6)}`);
  const noten = B("#2a1f5e", `${[[28, 60, "#ff5fa2"], [52, 42, "#4fd1ff"], [74, 60, "#ffd23a"]].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="6" fill="${c}" ${kO2}/><path d="M${x + 7} ${y}V${y - 30}l10 6" stroke="${c}" stroke-width="3" fill="none"/>`).join("")}`);
  const discoE = B("#2a1f5e", `<path d="M50 4v16" stroke="#c9ced8" stroke-width="2"/><circle cx="50" cy="46" r="24" fill="#c9ced8" ${kO}/>${[[42, 36], [54, 32], [62, 44], [46, 52], [58, 56]].map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#fff" opacity=".8"/>`).join("")}`);
  const rutsche = B("#bfe3ff", `<path d="M20 92V30h14v62M20 42h14M20 56h14M20 70h14" stroke="#e2402f" stroke-width="4" fill="none"/><path d="M34 30q20 0 26 30t28 32" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M34 30q20 0 26 30t28 32" stroke="${KI}" stroke-width="2" fill="none"/>`);
  const sandkasten = B("#bfe3ff", `<rect x="10" y="54" width="80" height="34" rx="4" fill="#f2d79b" ${kO}/><path d="M10 54h80" stroke="#a8743f" stroke-width="6"/><path d="M30 70l10-14 10 14z" fill="#e8c27a" ${kO2}/><path d="M64 56l10-20" stroke="#e2402f" stroke-width="4"/>`);
  const schaukel = B("#bfe3ff", `<path d="M14 92L30 16h40l16 76M30 16h40" stroke="#a8743f" stroke-width="5" fill="none"/><path d="M42 16v52M58 16v52" stroke="${KI}" stroke-width="2"/><rect x="38" y="66" width="24" height="6" rx="2" fill="#e2402f" ${kO2}/>`);
  const wanne = B("#bfe3ff", `<path d="M10 50h80v14q0 22-22 22H32q-22 0-22-22z" fill="#ffffff" ${kO}/>${[[24, 46], [40, 40], [60, 44], [76, 48], [50, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#ffffff" ${kO2}/>`).join("")}<path d="M22 86l-4 6M78 86l4 6" stroke="${KI}" stroke-width="4"/>`);
  const blasen = B("#9fd8ff", `${[[24, 30, 10], [50, 22, 7], [70, 40, 12], [36, 62, 8], [64, 76, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" fill-opacity=".4" stroke="#ffffff" stroke-width="2"/>`).join("")}`);
  const planschbecken = B("#9ad97a", `<ellipse cx="50" cy="62" rx="40" ry="20" fill="#ff8fb1" ${kO}/><ellipse cx="50" cy="60" rx="32" ry="13" fill="#4fd1ff"/><path d="M28 60q6-4 12 0t12 0" stroke="#fff" stroke-width="2" fill="none"/>`);
  const bettchen = B("#cfe2ff", `<rect x="10" y="40" width="80" height="44" rx="4" fill="#ffffff" ${kO}/>${[20, 32, 44, 56, 68, 80].map(x => `<path d="M${x} 40v44" stroke="#c9d6ea" stroke-width="3"/>`).join("")}<rect x="16" y="60" width="68" height="20" fill="#ffb3d1" ${kO2}/>`);
  const nachtlichtE = B("#2b3a67", `<circle cx="50" cy="50" r="28" fill="#fff6a0" opacity=".25"/><path d="M36 74q0-34 14-40 14 6 14 40z" fill="#fff6c8" ${kO2}/>${[[18, 20], [82, 26], [20, 80]].map(([x, y]) => k3Star(x, y, 5)).join("")}`);
  const buch = B("#cfe2ff", `<path d="M10 70q20-10 40 0 20-10 40 0V30q-20-10-40 0-20-10-40 0z" fill="#ffffff" ${kO}/><path d="M50 30v40" stroke="${KI}" stroke-width="2"/><circle cx="30" cy="46" r="7" fill="#fff6c8" ${kO2}/>${k3Star(70, 44, 7)}`);
  const P = (bg, a, b, c) => PAL(bg, a, b, c);
  const fl = (c, line = "") => kFloor(c, c, () => line);
  k3World({ key: "enni", prefix: "k3en", title: "Enni", emblem: "k3enemblem", items,
    emblemSvg: duploStein("#ff5fa2"), prizeSym: "k3enpreis", prizeSvg: `<rect x="12" y="34" width="76" height="50" rx="8" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>${[32, 68].map(x => `<rect x="${x - 12}" y="18" width="24" height="18" rx="8" fill="url(#gold)" stroke="#9a6404" stroke-width="3"/>`).join("")}${k3Star(50, 60, 12, "#fff6c8")}`,
    prize: ["Goldener Duplo-Stein!", (m) => `Enni ist stolz auf Papa Schristian! Alle zehn Welten geschafft. Finale in ${m} Schritten.`],
    accent: "#ff5fa2", accentDark: "#c2418a", target: k3Platz(`<circle cx="50" cy="52" r="10" fill="none" stroke="#ffffff" stroke-width="4"/>`),
    winTitles: ["JUCHUU!", "JUCHUU!", "TANZ!", "JUCHUU!", "PLATSCH!", "GUTE NACHT!"], winText: (m, p) => `Enni lacht. ${m} Schritte, ${p} Schübe.`,
    SC: [
      { name: "Duplo-Turm", outfit: "en_duplo", pal: P("#fff6dc", "#fffcf2"), floor: fl("#e8c795", `<path d="M0 50h100" stroke="#d1ad75" stroke-width="2"/>`), walls: [turm, zug, teppich], kind: "duplo", base: ["farbe", "#ff8fb1"], people: [EN], hint: "Bring jeden Duplo-Stein an seinen Platz. Steine lassen sich nur schieben, nicht ziehen." },
      { name: "Duplo-Bauernhof", outfit: "en_hof", pal: P("#e6f5d8", "#f6fbf0"), floor: fl("#9ad97a", ""), walls: [kuhD, traktorD, teppich], kind: "tier", base: ["latten", "#c9935a"], people: [EN], hint: "Bring jedes Duplo-Tier in den Stall. Tiere lassen sich nur schieben, nicht ziehen." },
      { name: "Tanzparty", outfit: "en_tanz", pal: P("#2a1f5e", "#5b2a86", "#ffe3f1", "#ffffff"), floor: fl("#ffd6ec", ""), walls: [tuell, noten, discoE], kind: "ballon", base: ["paneel", "#8b5cf6"], people: [EN, AL], words: ["TANZ!", "HOPS!", "DREH!"], hint: "Bring jeden Luftballon an seinen Platz. Ballons lassen sich nur schieben, nicht ziehen." },
      { name: "Spielplatz", outfit: "en_spielplatz", pal: P("#dff1ff", "#f4fbff"), floor: fl("#f2d79b", ""), walls: [rutsche, sandkasten, schaukel], kind: "eimer", base: ["hecke", "#4f8a3a"], people: [EN], hint: "Stell jeden Sandeimer an seinen Platz. Eimer lassen sich nur schieben, nicht ziehen." },
      { name: "Planschen", outfit: "en_planschen", pal: P("#dff6ff", "#f4fbff"), floor: fl("#bfe9ff", `<path d="M20 60q8-6 16 0t16 0" stroke="#ffffff" stroke-width="2" fill="none"/>`), walls: [wanne, blasen, planschbecken], kind: "ente", base: ["fliesen", "#4fd1c5"], people: [EN], words: ["PLATSCH!", "QUIETSCH!", "BLUBB!"], hint: "Bring jedes Quietscheentchen an seinen Platz. Enten lassen sich nur schieben, nicht ziehen." },
      { name: "Gute Nacht", outfit: "en_nacht", pal: P("#12205e", "#2a2f8f", "#d6e2ff", "#ffffff"), floor: fl("#ffe3ee", ""), walls: [bettchen, nachtlichtE, buch], kind: "teddy", base: ["farbe", "#8fbfe0"], people: [EN, AL], hint: "Bring jeden Teddy ins Bett. Teddys lassen sich nur schieben, nicht ziehen." }
    ] });
}
