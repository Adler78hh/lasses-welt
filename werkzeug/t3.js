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
  T.boxCycle = (l) => ids(l); T.levelBox = (l) => ids(l)[0]; T.slotIcon = (l, i) => ids(l)[i % 4];
  T.boxWord = "Scrabble-Steine";
  T.hint = (l) => `Schieb die Scrabble-Steine ${[...WORDS[l]].join(", ")} auf die Felder – zusammen ergeben sie ${WORDS[l]}. Steine lassen sich nur schieben, nicht ziehen.`;
  T.winTitle = (l) => WORDS[l] + "!";
  T.winText = (m, p) => `Wort gelegt! ${m} Schritte, ${p} Schübe.`;
}
