
// ===================== Teil 4 · Schristians große Welt – erwachsener Stil 2026 =====================
// Schristian mit natürlichen Proportionen: Hemd, Chino, Sneaker; je Welt nur eine kleine Abwandlung.
const T4_LINE = `stroke="#4a3f37" stroke-opacity=".55" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;
const T4_SKIN = "#ead2bd", T4_SKIN2 = "#dcbea6";
function kAdult({ shirt = "#b9c8d6", pants = "#c9b79c", shoes = "#f3efe8", style = "hemd", jacket = "", scarf = "", raute = false, tie = "" }) {
  const dk = (c) => `color-mix(in srgb, ${c} 82%, #2a2420)`;
  const top = jacket || shirt;
  const face = christianHead(50, 17)
    .replace(/<path d="M50 20q-3 6-1 8 2 1 4 0"[^>]*\/>/, `<path d="M50.5 19q-3.6 7.4-1.6 9.6 2.4 1.4 5 .2" fill="none" stroke="#b9917a" stroke-width="1.9" stroke-linecap="round"/>`)
    .replace(/<path d="M39 20q4-4 8 0M53 20q4-4 8 0"[^>]*\/>/, `<ellipse cx="43" cy="19.4" rx="1.9" ry="2.2" fill="#3a302a"/><ellipse cx="57" cy="19.4" rx="1.9" ry="2.2" fill="#3a302a"/>`)
    .replace(/<path d="M40 30q10 4 20 0-3 9-10 9t-10-9z"[^>]*\/>/, `<path d="M43.5 30.5q6.5 4.4 13 0" fill="none" stroke="#8a5f4f" stroke-width="2" stroke-linecap="round"/>`);
  const head = `<g transform="translate(50 15.5) scale(.54) translate(-50 -17)">${face}</g>`;
  const collar = style === "polo" ? `<path d="M45 30l5 5 5-5-2 7h-6z" fill="${dk(shirt)}"/><path d="M50 35v6" stroke="${dk(shirt)}" stroke-width=".9"/>`
    : style === "strick" ? `<path d="M44.5 30.5q5.5 5 11 0" fill="none" stroke="${dk(shirt)}" stroke-width="1.6"/><path d="M47 31l3 3 3-3" fill="#f3efe8"/>`
    : `<path d="M44.6 30l5.4 4.6L47.6 37zM55.4 30l-5.4 4.6 2.4 2.4z" fill="${jacket ? "#f6f3ee" : dk(shirt)}" opacity="${jacket ? 1 : .55}"/>${jacket ? "" : `<path d="M50 35v21" stroke="${dk(shirt)}" stroke-width=".7"/>${[40, 45, 50].map(y => `<circle cx="50" cy="${y}" r=".55" fill="#f3efe8"/>`).join("")}`}`;
  const jack = jacket ? `<path d="M50 34v4l-2 18H39l-1-23q4-3 7-3zM50 34v4l2 18h9l1-23q-4-3-7-3z" fill="${jacket}"/><path d="M45.5 30.5L50 38M54.5 30.5L50 38" stroke="${dk(jacket)}" stroke-width="1.2"/>${tie ? `<path d="M50 35l-1.2 2 1.2 9 1.2-9z" fill="${tie}"/>` : ""}` : "";
  const sleeve = (x1, y1, x2, y2, x3, y3) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${top}" stroke-width="6" stroke-linecap="round"/>` +
    (jacket || style === "strick" ? `<path d="M${x2} ${y2}L${x3} ${y3}" stroke="${top}" stroke-width="5" stroke-linecap="round"/>` :
      `<path d="M${x2} ${y2}L${x3} ${y3}" stroke="${T4_SKIN}" stroke-width="4.2" stroke-linecap="round"/><path d="M${x2 - .6} ${y2 - 1.6}l1.2 3.2" stroke="${dk(top)}" stroke-width="5.6" stroke-linecap="round" opacity=".55"/>`) +
    `<circle cx="${x3}" cy="${y3 + .8}" r="2.3" fill="${T4_SKIN}"/>`;
  return `<svg viewBox="0 0 100 100" overflow="visible">
  <ellipse class="shadow" cx="50" cy="95.5" rx="13" ry="2.4" fill="#3a302814"/>
  <g class="body">
    <path d="M43.4 56L42 90.5h6.2L50 64l1.8 26.5H58L56.6 56z" fill="${pants}"/><path d="M53 58l3.6 32.5h-3.4L51 62z" fill="#00000010"/>
    <path d="M45 66l-.6 22M55 66l.6 22" stroke="${dk(pants)}" stroke-width=".5" opacity=".6"/>
    <path d="M40.6 92.3q0-3 3-3h4.6l.4 3.8h-7.4q-.6 0-.6-.8zM51.4 93.1l.4-3.8h4.6q3 0 3 3 0 .8-.6.8z" fill="${shoes}" ${T4_LINE}/>
    <rect x="43" y="54" width="14" height="2.6" rx=".8" fill="#5b4638"/><rect x="48.8" y="54.2" width="2.4" height="2.2" rx=".4" fill="#c9b28a"/>
    <rect x="47.4" y="25.5" width="5.2" height="6" rx="2" fill="${T4_SKIN2}"/>
    <path d="M39.5 32.5q10.5-4.5 21 0l1.6 23.6H37.9z" fill="${shirt}"/>
    <path d="M55 31q5 .6 5.5 1.6l1.6 23.5H56z" fill="#00000010"/>
    ${scarf ? `<path d="M43.5 31q6.5 5 13 0l-.6 4q-6 3.6-11.8 0z" fill="${scarf}"/><path d="M45 34l-2 12h4l1.6-11" fill="${scarf}"/>` : ""}
    ${jack}${collar}
    ${raute ? `<path d="M56 37.5l2 2-2 2-2-2z" fill="#3f6ea8"/><path d="M56 38.6l.9.9-.9.9-.9-.9z" fill="#ffffff"/>` : ""}
    <g class="arms-dn">${sleeve(40, 33.5, 37.6, 45, 36.6, 55)}${sleeve(60, 33.5, 62.4, 45, 63.4, 55)}</g>
    <g class="arms-up">${sleeve(40, 33.5, 35, 24, 33.6, 14)}${sleeve(60, 33.5, 65, 24, 66.4, 14)}</g>
    <g class="pick"></g>
    <g>${head}</g>
  </g>
</svg>`;
}
{
  const V = {
    basis: {},
    fussball: { shirt: "#2f3d52", style: "polo", raute: true },
    hunde: { shirt: "#7a8ea5", pants: "#3f4550", shoes: "#efe9df" },
    garten3: { shirt: "#e9e2d4", pants: "#868866" },
    bauernhof: { shirt: "#a56a54", shoes: "#6d5242" },
    lego3: { shirt: "#9c9a94", pants: "#3f4550", style: "strick" },
    pinguine: { shirt: "#e4dccd", pants: "#3f4550", style: "strick", scarf: "#8a9b88" },
    urlaub: { shirt: "#c6d5da", pants: "#d8cdb9", shoes: "#8b6b57" },
    atschie: { shirt: "#f6f3ee", jacket: "#2f3d52" },
    atributschi: { shirt: "#4e5b4a" },
    enni: { shirt: "#a9b7a2", style: "strick" }
  };
  const SZ = { "Silvester in Dänemark": { shirt: "#6e3b3f", pants: "#3f4550", style: "strick", scarf: "#e4dccd" }, "Hochzeit": { shirt: "#f6f3ee", jacket: "#3b3c42", pants: "#3b3c42", shoes: "#2b2522", tie: "#9a8f86" } };
  for (const k of Object.keys(V)) { const th = THEMES[k]; if (!th) continue;
    (th.scenes || []).forEach(sc => { const key = "t4_" + k + "_" + sc.name; LASSE[key] = kAdult(SZ[sc.name] || V[k]); OUTFIT[sc.name] = key; }); }
  LASSE.avatar = LASSE.fussball = kAdult(V.basis);
}
// Startbild: Schristian groß, ohne Comic-Sterne
{ const baseRP = renderPlayers; renderPlayers = function () { baseRP(); const h = document.getElementById("hero"); if (h) h.innerHTML = `<div class="t4hero">${kAdult({})}</div>`; }; }

// ---------- Symbole als feine Strichzeichnungen, eine Linienstärke ----------
{
  const L = `fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"`;
  const pent = (r, cx = 50, cy = 50) => Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const P = pent(10), O = pent(28);
  const I = {
    fussball: `<circle cx="50" cy="50" r="30" ${L}/><path d="M${P.map(p => p.map(v => v.toFixed(1)).join(" ")).join("L")}z" ${L}/>${P.map((p, i) => `<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${O[i][0].toFixed(1)} ${O[i][1].toFixed(1)}" ${L}/>`).join("")}`,
    hunde: `<circle cx="50" cy="50" r="30" ${L}/><circle cx="50" cy="50" r="10" ${L}/><circle cx="50" cy="50" r="2" fill="currentColor"/><path d="M50 28a22 22 0 0 1 21 15" ${L} stroke-width="2"/><path d="M29 57a22 22 0 0 0 12 13" ${L} stroke-width="2"/>`,
    garten3: `<path d="M22 48L50 25l28 23" ${L}/><path d="M28 43v33h44V43" ${L}/><path d="M44 76V60h12v16" ${L}/><rect x="33" y="50" width="8" height="8" ${L} stroke-width="2.6"/>`,
    bauernhof: `<path d="M20 50L35 30h30l15 20v28H20z" ${L}/><rect x="39" y="55" width="22" height="23" ${L}/><path d="M39 55l22 23M61 55L39 78" ${L} stroke-width="2.6"/><path d="M44 40h12" ${L}/>`,
    lego3: `<rect x="20" y="44" width="60" height="30" rx="4" ${L}/><rect x="28" y="33" width="14" height="11" rx="3" ${L}/><rect x="58" y="33" width="14" height="11" rx="3" ${L}/>`,
    pinguine: `<path d="M50 20c-12 0-18 12-18 28 0 18 6 30 18 30s18-12 18-30c0-16-6-28-18-28z" ${L}/><path d="M50 36c-6 0-9 8-9 18 0 12 4 18 9 18s9-6 9-18c0-10-3-18-9-18z" ${L} stroke-width="2.6"/><path d="M46 30l4 4 4-4" ${L} stroke-width="2.6"/><path d="M40 80h8M52 80h8" ${L}/>`,
    urlaub: `<circle cx="50" cy="44" r="12" ${L}/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(50 + 18 * Math.cos(a)).toFixed(1)} ${(44 + 18 * Math.sin(a)).toFixed(1)}L${(50 + 24 * Math.cos(a)).toFixed(1)} ${(44 + 24 * Math.sin(a)).toFixed(1)}" ${L}/>`; }).join("")}<path d="M18 78q8-6 16 0t16 0 16 0 16 0" ${L}/>`,
    atschie: `<circle cx="40" cy="56" r="16" ${L}/><circle cx="60" cy="56" r="16" ${L}/><path d="M34 37l6-8 6 8-6 4z" ${L} stroke-width="2.6"/>`,
    atributschi: `<path d="M28 24h18l-1 14a8 8 0 0 1-16 0zM37 46v22M30 68h14" ${L} transform="rotate(-10 37 46)"/><path d="M54 24h18l-1 14a8 8 0 0 1-16 0zM63 46v22M56 68h14" ${L} transform="rotate(10 63 46)"/><path d="M48 16l2-6M42 18l-3-4M56 18l3-4" ${L} stroke-width="2.6"/>`,
    enni: `<ellipse cx="50" cy="40" rx="16" ry="20" ${L}/><path d="M47 62l3-2 3 2" ${L} stroke-width="2.6"/><path d="M50 62q-6 8 0 14t0 12" ${L} stroke-width="2.6"/>`,
    atelier: `<path d="M24 76L66 34l8 8-42 42H24z" ${L}/><path d="M60 40l8 8" ${L} stroke-width="2.6"/><rect x="40" y="18" width="14" height="60" rx="2" ${L} transform="rotate(45 47 48)" stroke-width="2.6"/>`
  };
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", Object.entries(I).map(([k, v]) => `<symbol id="t4i-${k}" viewBox="0 0 100 100">${v}</symbol>`).join(""));
  for (const k of Object.keys(I)) if (THEMES[k]) { THEMES[k].mapIcon = "t4i-" + k; THEMES[k].emblem = "t4i-" + k; }
  // Bestwert: Goldpunkt statt Stern, geschafft: feines Häkchen
  const st = document.getElementById("stern"), ss = document.getElementById("stern-silber");
  if (st) st.innerHTML = `<circle cx="50" cy="50" r="20" fill="#c2a36b"/><circle cx="50" cy="50" r="20" fill="none" stroke="#fffdf9" stroke-width="5"/>`;
  if (ss) ss.innerHTML = `<path d="M30 52l13 13 27-30" fill="none" stroke="#7d8f73" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// ---------- Edle Akzentfarbe je Welt ----------
{
  const ACC = { fussball: ["#4f6a86", "#3a5068"], hunde: ["#8b6b57", "#6b5243"], garten3: ["#7f8f6e", "#626f54"], bauernhof: ["#b0765c", "#8c5c46"], lego3: ["#a8865a", "#866944"],
    pinguine: ["#5f7e86", "#48636a"], urlaub: ["#b98d63", "#94704c"], atschie: ["#a87c80", "#866064"], atributschi: ["#6e5a6e", "#554556"], enni: ["#b48a86", "#906b68"] };
  for (const [k, [a, d]] of Object.entries(ACC)) if (THEMES[k]) { THEMES[k].pal = { ...(THEMES[k].pal || {}), "--accent": a, "--accent-dark": d }; }
}

// ---------- Ruhige Rückmeldungen: kein Comic-Wort, kein Pups, sachliche Hinweise, „Geschafft.“ ----------
for (const th of Object.values(THEMES)) {
  (th.scenes || []).forEach(sc => { sc.fart = false; });
  if (typeof th.hint === "function") { const h0 = th.hint; th.hint = (l) => String(h0(l) || "").replace(/\s*[^.!]*lassen sich nur schieben, nicht ziehen\./, "").replace(/\s*Sie\s*$/, "").trim(); }
  if (th === THEMES.bauernhof) { const w0 = th.winTitle; th.winTitle = (l) => String(w0(l)).replace("!", "."); } else th.winTitle = () => "Geschafft.";
}
FX.place = (x, y) => { const b = document.getElementById("board"); if (!b || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = document.createElement("div"); el.className = "fx-pop fx-soft"; el.style.cssText = `--x:${x};--y:${y}`; b.appendChild(el); setTimeout(() => el.remove(), 900); };
// ---------- Wände: ruhige, flache Flächen; Motive hängen als gerahmte Bilder darauf ----------
for (const k of Object.keys(BW)) { const o = BW[k]; BW[k] = (c) => svgT(`<rect width="100" height="100" fill="${c}"/><g opacity=".12">${o(c)}</g>`); }
