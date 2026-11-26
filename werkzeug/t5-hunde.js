// ---------- Hunde für Idas Welt (Welt 4 „Helden“): naturgetreue Köpfe mit Schultern, Fell schattiert ----------
// Alle Zeichnungen 100 × 100, Blick nach vorn. Rassen: Dalmatiner, Schäferhund, Englische Bulldogge, Labrador, Mischling,
// Cockapoo und Australian Cattle Dogs (blau gesprenkelt). Uniformen nach deutschem Vorbild.
const HUND = (() => {
  const L = `stroke="#2b2420" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;
  const LL = `stroke="#2b2420" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;
  let gid = 0;
  // Verlauf direkt in der Zeichnung (eindeutige Kennung)
  const grad = (c1, c2, r = false, x = 50, y = 35) => { const id = "hg" + (gid++);
    return [id, r ? `<radialGradient id="${id}" cx="${x}%" cy="${y}%" r="70%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`
      : `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`]; };
  const hair = (pts, c, w = .9, op = .55) => pts.map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" opacity="${op}" stroke-linecap="round"/>`).join("");
  // Augen: dunkelbraune Iris, Pupille, Lichtpunkt, Lidrand
  const auge = (x, y, iris = "#5a3418", r = 3.4, zu = false) => zu
    ? `<path d="M${x - 4.4} ${y}q4.4 3 8.8 0" stroke="#1d1714" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="${y}" rx="${r + 1.4}" ry="${r + .6}" fill="#1d1714"/><circle cx="${x}" cy="${y + .2}" r="${r}" fill="${iris}"/><circle cx="${x}" cy="${y + .2}" r="${r * .55}" fill="#120d0b"/>
      <circle cx="${x - r * .35}" cy="${y - r * .4}" r="${r * .32}" fill="#ffffff"/><circle cx="${x + r * .4}" cy="${y + r * .35}" r="${r * .14}" fill="#ffffff" opacity=".7"/>`;
  // Nase: breit, feucht glänzend, Nasenlöcher
  const nase = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 -2q0-5 7-5t7 5q0 4-3.4 5.4-1.6.6-2.6 2.6h-2q-1-2-2.6-2.6Q-7 2-7 -2z" fill="#1d1714"/>
    <path d="M-4.6 0q1.4-1.6 2.8 0M1.8 0q1.4-1.6 2.8 0" stroke="#000" stroke-width="1.4" fill="none"/><ellipse cx="-2" cy="-4.2" rx="3" ry="1.3" fill="#ffffff" opacity=".35"/></g>`;
  const maul = (x, y, w = 8, zunge = false) => `<path d="M${x} ${y - 4}v4" stroke="#1d1714" stroke-width="1.3"/><path d="M${x - w} ${y + 1}q${w / 2} ${3} ${w} -1q${w / 2} ${4} ${w} 1" fill="none" stroke="#1d1714" stroke-width="1.4" stroke-linecap="round"/>
    ${zunge ? `<path d="M${x - 3.4} ${y + 1.6}q3.4 9 6.8 0z" fill="#e26a7a" stroke="#9a3a4a" stroke-width=".8"/><path d="M${x} ${y + 2}v4" stroke="#b84a5a" stroke-width=".7"/>` : ""}`;

  // ---------- Uniformen (Schultern bis Bildrand), nach deutschem Vorbild ----------
  const schulter = (fill, extra = "") => `<path d="M8 100q2-26 24-31 18-4 36 0 22 5 24 31z" fill="${fill}" ${L}/>${extra}`;
  const streifen = (y) => `<path d="M10 ${y}q40-6 80 0" stroke="#e8ff3a" stroke-width="5" fill="none"/><path d="M10 ${y}q40-6 80 0" stroke="#c9ccd2" stroke-width="1.8" fill="none"/>`;
  const UNIF = {
    // Feuerwehr: dunkelblaue Einsatzjacke mit gelb-silbernen Reflexstreifen, roter Kragenrand
    feuerwehr: () => schulter("#1d2b4f", `${streifen(90)}<path d="M36 70l14 10 14-10" fill="none" stroke="#c8202a" stroke-width="3"/><path d="M50 80v20" stroke="#0f1830" stroke-width="1.6"/>
      <rect x="62" y="84" width="10" height="7" rx="1.4" fill="#c8202a" ${LL}/><path d="M64 87.5h6" stroke="#ffffff" stroke-width="1.2"/>`),
    // Polizei: blaue Jacke, silberner Stern auf der Brust, Schulterklappen
    polizei: () => schulter("#203a72", `<path d="M36 70l14 9 14-9" fill="#e9eef7" ${LL}/><path d="M46 74l4 6 4-6" fill="#203a72"/><path d="M50 80v20" stroke="#142a56" stroke-width="1.6"/>
      <path d="M68 86l1.6 3.4 3.8.4-2.8 2.6.8 3.8-3.4-1.9-3.4 1.9.8-3.8-2.8-2.6 3.8-.4z" fill="#d9dde6" ${LL}/><path d="M16 80l14-6M84 80l-14-6" stroke="#142a56" stroke-width="4" stroke-linecap="round"/>`),
    // Technisches Hilfswerk: blau mit gelben Streifen
    thw: () => schulter("#1c3f9a", `<path d="M10 88q40-6 80 0" stroke="#ffd200" stroke-width="5" fill="none"/><path d="M36 70l14 10 14-10" fill="none" stroke="#ffd200" stroke-width="3"/><path d="M50 80v20" stroke="#122c70" stroke-width="1.6"/>`),
    // Wasserrettung: rot-gelb
    wasser: () => schulter("#d8202a", `<path d="M8 100q2-14 10-20h64q8 6 10 20z" fill="#ffd200" ${LL}/><path d="M36 70l14 9 14-9" fill="none" stroke="#ffd200" stroke-width="3"/><circle cx="66" cy="86" r="5" fill="none" stroke="#ffffff" stroke-width="2.4"/><circle cx="66" cy="86" r="5" fill="none" stroke="#d8202a" stroke-width="2.4" stroke-dasharray="4 4"/>`),
    // Stadtreinigung: orange Warnjacke mit Reflexstreifen
    reinigung: () => schulter("#f57a1a", `${streifen(84)}${streifen(94)}<path d="M50 72v28" stroke="#c45a0a" stroke-width="1.6"/>`),
    // Luftrettung: dunkelblauer Fliegeroverall, Rettungs-Abzeichen
    luft: () => schulter("#2a3446", `<path d="M36 70l14 10 14-10" fill="none" stroke="#9aa3b1" stroke-width="2.4"/><path d="M50 80v20" stroke="#9aa3b1" stroke-width="1.6"/><rect x="60" y="82" width="14" height="10" rx="2" fill="#ffffff" ${LL}/><path d="M67 84v6M64 87h6" stroke="#d8202a" stroke-width="2.2"/>`),
    // Alltag (blaue Hunde): Halstuch oder Halsband
    halsband: (c) => `<path d="M30 70q20 8 40 0" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="80" r="3.4" fill="#f2c94c" ${LL}/>`,
    tuch: (c) => `<path d="M30 68q20 10 40 0l-6 8q-14 12-28 0z" fill="${c}" ${L}/><path d="M38 78q12 8 24 0" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-dasharray="2 3"/>`
  };
  // ---------- Kopfbedeckungen ----------
  const HUT = {
    // Feuerwehrhelm (tagesleuchtend gelb, Visier, Reflexstreifen, Nackenleder)
    feuerwehr: () => `<path d="M24 26q2-22 26-22t26 22l3 4H21z" fill="#d9f02a" ${L}/><path d="M28 16q22-8 44 0" stroke="#c9ccd2" stroke-width="3" fill="none"/><path d="M50 4v24" stroke="#b8cc1a" stroke-width="3"/>
      <path d="M22 28h56l-3 6H25z" fill="#2b2b2b" opacity=".85"/><path d="M26 30h48" stroke="#ffffff" stroke-width="1" opacity=".5"/>`,
    // Polizeimütze (dunkelblau, blaues Band, silberner Stern, schwarzer Schirm)
    polizei: () => `<path d="M20 18q30-16 60 0l-4 10H24z" fill="#1d2f5e" ${L}/><rect x="25" y="22" width="50" height="7" fill="#2f5cc8" ${LL}/><path d="M22 29q28 8 56 0l-2 4q-26 6-52 0z" fill="#111" ${LL}/>
      <path d="M50 10l1.8 3.8 4.2.5-3.1 2.9.8 4.2-3.7-2.1-3.7 2.1.8-4.2-3.1-2.9 4.2-.5z" fill="#e3e7ef" ${LL}/>`,
    // THW-Helm (blau)
    thw: () => `<path d="M24 28q0-24 26-24t26 24z" fill="#1c3f9a" ${L}/><path d="M24 28h52l-2 4H26z" fill="#ffd200" ${LL}/><path d="M50 4v24" stroke="#122c70" stroke-width="2.4"/>`,
    // Wasserrettung: gelbe Kappe
    wasser: () => `<path d="M26 24q0-18 24-18t24 18z" fill="#ffd200" ${L}/><path d="M26 24q24 4 48 0l14 4q-30 6-62-2z" fill="#d8202a" ${LL}/>`,
    // Stadtreinigung: orange Strickmütze
    reinigung: () => `<path d="M26 26q0-22 24-22t24 22z" fill="#f57a1a" ${L}/><rect x="24" y="22" width="52" height="8" rx="3" fill="#d9640e" ${LL}/>${[30, 38, 46, 54, 62, 70].map(x => `<path d="M${x} 22v8" stroke="#b85008" stroke-width="1"/>`).join("")}`,
    // Fliegerhelm mit Brille
    luft: () => `<path d="M24 28q0-24 26-24t26 24z" fill="#e9eaee" ${L}/><path d="M24 28h52" stroke="#d8202a" stroke-width="3"/><g transform="translate(0 2)"><ellipse cx="40" cy="18" rx="8" ry="6" fill="#9fd8ff" ${L}/><ellipse cx="60" cy="18" rx="8" ry="6" fill="#9fd8ff" ${L}/><path d="M48 18h4" stroke="#2b2420" stroke-width="2"/><ellipse cx="38" cy="16" rx="3" ry="2" fill="#ffffff" opacity=".7"/><ellipse cx="58" cy="16" rx="3" ry="2" fill="#ffffff" opacity=".7"/></g>`
  };

  // ---------- Rassen ----------
  // Dalmatiner: weiß mit schwarzen Tupfen, hängende Ohren mit Tupfen, lange Schnauze
  function dalmatiner(o = {}) {
    const [g1, d1] = grad("#ffffff", "#d8d2c8", true, 50, 30), [g2, d2] = grad("#f4f1ea", "#cfc8bc");
    const tupf = [[38, 22, 2.6], [60, 18, 2], [66, 30, 2.4], [33, 34, 1.8], [56, 28, 1.6], [44, 14, 1.6], [64, 42, 1.4], [36, 46, 1.8], [58, 54, 1.3], [42, 56, 1.1]];
    return `<defs>${d1}${d2}</defs>
      <path d="M28 64q4 10 22 12 18-2 22-12v14H28z" fill="url(#${g2})" ${L}/>
      <path d="M30 24q-14 2-16 20-1 12 6 20 5 2 8-4 2-14 6-24z" fill="#ece7de" ${L}/><ellipse cx="20" cy="46" rx="2.4" ry="3" fill="#1d1714"/><ellipse cx="24" cy="56" rx="2" ry="2.4" fill="#1d1714"/><ellipse cx="18" cy="38" rx="1.6" ry="2" fill="#1d1714"/>
      <path d="M70 24q14 2 16 20 1 12-6 20-5 2-8-4-2-14-6-24z" fill="#ece7de" ${L}/><ellipse cx="80" cy="46" rx="2.6" ry="3.2" fill="#1d1714"/><ellipse cx="76" cy="34" rx="1.8" ry="2.2" fill="#1d1714"/>
      <path d="M50 8q-21 0-22 22-1 14 6 24 4 6 6 14 4 6 10 6t10-6q2-8 6-14 7-10 6-24-1-22-22-22z" fill="url(#${g1})" ${L}/>
      ${tupf.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.2}" fill="#1d1714" transform="rotate(${(x * 7) % 40 - 20} ${x} ${y})"/>`).join("")}
      <path d="M44 30q6-3 12 0" stroke="#c9c1b4" stroke-width="1.2" fill="none"/>
      ${auge(41, 36, "#6a3c1a", 3.2, o.zu)}${auge(59, 36, "#6a3c1a", 3.2, o.zu)}
      <path d="M36 31q5-3 9-1M55 30q4-2 9 1" stroke="#8a8078" stroke-width="1" fill="none"/>
      ${plastisch("#6a5a4a", .12)}${[[44, 60], [42, 62], [56, 60], [58, 62], [45, 63]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".7" fill="#3a302a"/>`).join("")}
      ${nase(50, 56, 1)}${maul(50, 64, 7, o.zunge)}
      ${hair([[34, 60, 32, 64], [66, 60, 68, 64], [40, 66, 39, 70], [60, 66, 61, 70]], "#b8b0a4")}`;
  }
  // Deutscher Schäferhund: hohe Stehohren, schwarzer Sattel und Maske, lohfarbene Wangen
  function schaeferhund(o = {}) {
    const [g1, d1] = grad("#d89a52", "#9a5e24", true, 50, 55), [g2, d2] = grad("#3a2c22", "#120c08", false);
    return `<defs>${d1}${d2}</defs>
      <path d="M30 34L20 0q14 4 22 22z" fill="#2a1e16" ${L}/><path d="M29 28l-6-22q8 4 13 15z" fill="#e8c9a0" opacity=".85"/>${hair([[26, 18, 30, 20], [27, 24, 31, 24], [29, 12, 32, 16]], "#a87850", 1, .8)}
      <path d="M70 34l10-34q-14 4-22 22z" fill="#2a1e16" ${L}/><path d="M71 28l6-22q-8 4-13 15z" fill="#e8c9a0" opacity=".85"/>${hair([[74, 18, 70, 20], [73, 24, 69, 24], [71, 12, 68, 16]], "#a87850", 1, .8)}
      <path d="M50 12q-20 0-22 22-2 16 8 26 5 6 6 12 3 6 8 6t8-6q1-6 6-12 10-10 8-26-2-22-22-22z" fill="url(#${g1})" ${L}/>
      <path d="M32 26q4-14 18-14t18 14q-6-4-10-2-4 4-8 4t-8-4q-4-2-10 2z" fill="url(#${g2})"/>
      <path d="M44 30q6 4 12 0l3 12q2 12-4 20-5 4-10 0-6-8-4-20z" fill="#2a1d14" opacity=".9"/>
      <path d="M34 40q4-4 8-2M66 40q-4-4-8-2" stroke="#2a1d14" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>
      <path d="M40 64q10 8 20 0q-2 8-10 9-8-1-10-9z" fill="#e8c08a" opacity=".85"/>${plastisch("#5a3010", .14)}
      ${hair([[30, 44, 27, 50], [70, 44, 73, 50], [34, 52, 31, 58], [66, 52, 69, 58], [38, 58, 36, 64], [62, 58, 64, 64]], "#7a4416", 1.1, .6)}
      ${auge(41, 36, "#4a2a12", 3.2, o.zu)}${auge(59, 36, "#4a2a12", 3.2, o.zu)}
      <path d="M36 31q4-3 9 0M55 31q5-3 9 0" stroke="#e2b06e" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${nase(50, 60, 1)}${maul(50, 67, 6, o.zunge)}`;
  }
  // Englische Bulldogge: breiter Kopf, Falten, Rosenohren, Unterbiss, Lefzen
  function bulldogge(o = {}) {
    const [g1, d1] = grad("#f4e6d4", "#cfae86", true, 50, 35);
    return `<defs>${d1}</defs>
      <path d="M22 24q-10-4-12 8 6 2 14 0z" fill="#b88a5e" ${L}/><path d="M78 24q10-4 12 8-6 2-14 0z" fill="#b88a5e" ${L}/>
      <path d="M50 12q-28 0-30 24-2 22 12 32 8 6 18 6t18-6q14-10 12-32-2-24-30-24z" fill="url(#${g1})" ${L}/>
      <path d="M40 16q10 6 20 0" stroke="#d8b892" stroke-width="5" fill="none" opacity=".7"/><path d="M50 12v18" stroke="#ffffff" stroke-width="6" opacity=".55"/>
      <path d="M36 26q14-5 28 0M38 30q12-4 24 0" stroke="#a8845a" stroke-width="1.2" fill="none"/>
      ${auge(37, 38, "#5a3418", 3.4, o.zu)}${auge(63, 38, "#5a3418", 3.4, o.zu)}
      <path d="M38 46q12-6 24 0" stroke="#a8845a" stroke-width="1.4" fill="none"/>
      ${nase(50, 48, 1.1)}
      <path d="M32 54q8-4 18 2 10-6 18-2 4 12-6 16-12 4-24 0-10-4-6-16z" fill="#efdcc4" ${L}/>
      <path d="M40 62q10 6 20 0v4q-10 6-20 0z" fill="#3a1a1a"/><path d="M42 62l2 3 2-3M54 62l2 3 2-3" fill="#ffffff" stroke="#2b2420" stroke-width=".5"/>
      <path d="M32 54q-4 8 2 14M68 54q4 8-2 14" stroke="#a8845a" stroke-width="1.2" fill="none"/>`;
  }
  // Labrador (schokobraun oder blond): breiter Kopf, Hängeohren, freundlich
  function labrador(o = {}) {
    const c = o.farbe || "#6e4126", hell = o.hell || "#8e5a36", dunkel = o.dunkel || "#4a2a16";
    const [g1, d1] = grad(hell, dunkel, true, 50, 30);
    return `<defs>${d1}</defs>
      <path d="M30 22q-14 2-14 20 0 14 6 18 6 2 8-6 0-16 4-26z" fill="${dunkel}" ${L}/>
      <path d="M70 22q14 2 14 20 0 14-6 18-6 2-8-6 0-16-4-26z" fill="${dunkel}" ${L}/>
      <path d="M50 10q-22 0-23 22-1 14 6 24 4 6 6 12 4 8 11 8t11-8q2-6 6-12 7-10 6-24-1-22-23-22z" fill="url(#${g1})" ${L}/>
      <path d="M44 40q6 2 12 0 4 10-6 16-10-6-6-16z" fill="${c}" opacity=".7"/>
      <path d="M50 12v20" stroke="${hell}" stroke-width="5" opacity=".5"/>${plastisch("#000", .14)}
      ${auge(41, 35, "#3a2010", 3.2, o.zu)}${auge(59, 35, "#3a2010", 3.2, o.zu)}
      <path d="M36 30q5-3 9 0M55 30q4-3 9 0" stroke="${dunkel}" stroke-width="1.2" fill="none"/>
      ${nase(50, 56, 1.05)}${maul(50, 64, 7, o.zunge !== false)}
      ${hair([[36, 56, 34, 62], [64, 56, 66, 62]], dunkel)}`;
  }
  // Mischling: grau-weiß, struppig, ein Ohr hoch, eins geknickt
  function mischling(o = {}) {
    const [g1, d1] = grad("#c9c6c0", "#8a8680", true, 50, 30);
    return `<defs>${d1}</defs>
      <path d="M32 26L24 6q10 2 16 14z" fill="#7a7670" ${L}/><path d="M68 26l10-14q4 8-4 14z" fill="#7a7670" ${L}/><path d="M74 14l8 6-6 4z" fill="#6a6660" ${LL}/>
      <path d="M50 12q-21 0-22 22-1 14 6 22 4 6 6 12 4 6 10 6t10-6q2-6 6-12 7-8 6-22-1-22-22-22z" fill="url(#${g1})" ${L}/>
      <path d="M42 42q8-4 16 0 4 12-8 26-12-14-8-26z" fill="#f0eee8"/>${plastisch("#000", .1)}
      ${hair([[34, 22, 30, 18], [40, 16, 38, 11], [60, 16, 62, 11], [66, 22, 70, 18], [30, 40, 26, 42], [70, 40, 74, 42], [32, 52, 28, 56], [68, 52, 72, 56], [44, 66, 42, 70], [56, 66, 58, 70]], "#5a5650", 1.2, .7)}
      <path d="M36 28q5-4 9-1M55 27q4-3 9 1" stroke="#5a5650" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      ${auge(41, 35, "#4a2c16", 3.2, o.zu)}${auge(59, 35, "#4a2c16", 3.2, o.zu)}
      ${nase(50, 55, .95)}${maul(50, 62, 6, o.zunge)}`;
  }
  // Cockapoo: apricotfarben, lockig (viele kleine Locken), Schlappohren
  function cockapoo(o = {}) {
    const [g1, d1] = grad("#f3c896", "#c98a52", true, 50, 30);
    const locken = (cx, cy, rx, ry, n, c) => Array.from({ length: n }, (_, i) => { const a = i * 2.39996, r = Math.sqrt(i / n); return `<circle cx="${(cx + Math.cos(a) * rx * r).toFixed(1)}" cy="${(cy + Math.sin(a) * ry * r).toFixed(1)}" r="3.4" fill="${c}" stroke="#a8683a" stroke-width=".6"/>`; }).join("");
    return `<defs>${d1}</defs>
      <ellipse cx="24" cy="46" rx="10" ry="18" fill="#d99a5e" ${L}/>${locken(24, 46, 8, 15, 18, "#e0a468")}
      <ellipse cx="76" cy="46" rx="10" ry="18" fill="#d99a5e" ${L}/>${locken(76, 46, 8, 15, 18, "#e0a468")}
      <path d="M50 12q-22 0-23 22-1 16 8 26 6 8 15 8t15-8q9-10 8-26-1-22-23-22z" fill="url(#${g1})" ${L}/>
      ${locken(50, 22, 18, 10, 26, "#f0be86")}
      ${auge(41, 38, "#3a2010", 3.4, o.zu)}${auge(59, 38, "#3a2010", 3.4, o.zu)}
      ${locken(50, 52, 12, 8, 14, "#f6d0a4")}
      ${nase(50, 50, .9)}${maul(50, 58, 5, o.zunge)}`;
  }
  // Australian Cattle Dog (blau gesprenkelt): Stehohren, lohfarbene Abzeichen, dunkle Augenflecken
  function blauerHund(o = {}) {
    const blau = o.blau || "#6f86a6", dunkel = o.dunkel || "#3e4f6a", loh = o.loh || "#c88848", welpe = !!o.welpe;
    const [g1, d1] = grad(o.hell || "#9fb1c8", blau, true, 50, 30);
    const s = welpe ? .92 : 1;
    const flecken = Array.from({ length: 70 }, (_, i) => { const a = i * 2.39996, r = Math.sqrt(i / 70); return `<circle cx="${(50 + Math.cos(a) * 20 * r).toFixed(1)}" cy="${(36 + Math.sin(a) * 24 * r).toFixed(1)}" r="${(.5 + (i % 3) * .3).toFixed(1)}" fill="${i % 3 ? "#e6ecf4" : dunkel}" opacity=".55"/>`; }).join("");
    const hals = `<path d="M30 54q-6 26-24 46h88q-18-20-24-46z" fill="${blau}" ${L}/>${Array.from({ length: 40 }, (_, i) => `<circle cx="${(24 + (i * 37) % 52).toFixed(0)}" cy="${(64 + (i * 23) % 34).toFixed(0)}" r=".8" fill="${i % 2 ? "#e6ecf4" : dunkel}" opacity=".6"/>`).join("")}<path d="M40 70q10 10 20 0q2 14-10 26-12-12-10-26z" fill="#e6ecf4" opacity=".55"/>`;
    const maske = o.maske === "links" ? `<ellipse cx="41" cy="35" rx="8" ry="7" fill="${dunkel}"/>` : o.maske === "keine" ? "" : `<ellipse cx="41" cy="35" rx="8" ry="7" fill="${dunkel}"/><ellipse cx="59" cy="35" rx="8" ry="7" fill="${dunkel}"/>`;
    return `<defs>${d1}</defs>${o.ohneHals ? "" : hals}<g transform="translate(50 50) scale(${s * 1.1} ${s}) translate(-50 -50)">
      <path d="M30 30L22 ${welpe ? 10 : 4}q12 4 18 18z" fill="${blau}" ${L}/><path d="M29 26l-4-14q6 4 10 12z" fill="#e8d2c4" opacity=".7"/>
      <path d="M70 30l8-${welpe ? 20 : 26}q-12 4-18 18z" fill="${blau}" ${L}/><path d="M71 26l4-14q-6 4-10 12z" fill="#e8c9b4" opacity=".8"/>
      <path d="M50 12q-21 0-22 22-1 14 6 24 4 6 6 10 4 6 10 6t10-6q2-4 6-10 7-10 6-24-1-22-22-22z" fill="url(#${g1})" ${L}/>
      ${flecken}
      <path d="M48 14q2 10 2 20" stroke="#f2f4f8" stroke-width="4" opacity=".8" stroke-linecap="round"/>
      ${maske}
      <path d="M33 29q4-4 7-1M60 28q3-3 7 1" stroke="${loh}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M34 46q4 10 12 14M66 46q-4 10-12 14" stroke="${loh}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M43 44q7-3 14 0 2 10-7 16-9-6-7-16z" fill="#dfe6ee" opacity=".55"/>${plastisch("#1a2230", .14)}
      ${auge(41, 36, "#4a2a12", welpe ? 4 : 3.2, o.zu)}${auge(59, 36, "#4a2a12", welpe ? 4 : 3.2, o.zu)}
      ${nase(50, 56, .95)}${maul(50, 63, 6, o.zunge)}</g>`;
  }
  // Schnauzenrücken und Wangenschatten (lässt den Kopf plastisch wirken)
  const plastisch = (c = "#000", op = .16) => `<path d="M44 41q-3 9-2 17M56 41q3 9 2 17" stroke="${c}" stroke-width="1.6" fill="none" opacity="${op * 2}" stroke-linecap="round"/>
    <path d="M30 36q0 16 10 24M70 36q0 16-10 24" stroke="${c}" stroke-width="5" fill="none" opacity="${op}" stroke-linecap="round"/>
    <path d="M42 66q8 5 16 0" stroke="${c}" stroke-width="2" fill="none" opacity="${op}"/>`;
  const RASSEN = { dalmatiner, schaeferhund, bulldogge, labrador, mischling, cockapoo, blauerHund };
  // Held: Rasse + Uniform + Kopfbedeckung
  const held = (rasse, dienst, o = {}) => `${UNIF[dienst]()}${RASSEN[rasse](o)}${HUT[dienst] && o.hut !== false ? HUT[dienst]() : ""}`;
  const blau = (o = {}) => `${blauerHund(o)}${o.tuch ? UNIF.tuch(o.tuch) : UNIF.halsband(o.band || "#e2402f")}${o.extra || ""}`;
  return { held, blau, RASSEN, UNIF, HUT };
})();
