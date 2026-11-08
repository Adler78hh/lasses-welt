// ===================== Teil 3 · Christians Welt =====================
// Christian (von heute) als Hauptfigur: Körper wie der Comic-Lasse, Kopf von Christian; Kopfbedeckungen leicht angepasst.
function kChristian(o) {
  const svg = kLasse({ ...o, head: "", hair: false });
  const a = svg.indexOf('<g transform="rotate(-6 50 28)">'), b = svg.lastIndexOf("</g>\n  </g>\n</svg>");
  const head = `<g transform="translate(50 27) scale(.92) translate(-50 -27)">${christianHead(50, 27)}</g>` +
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
  F.prize = { symbol: "pokal", title: "Der Pott!", text: (m) => `Meister im Volkspark, Christian! Finale in ${m} Schritten.` };
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
