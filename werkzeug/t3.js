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
