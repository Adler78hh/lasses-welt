// ---------- Spielfiguren für Idas Welt (Welt 5 „Brettspiele“): Meeple aus Holz, Pöppel, Würfel, Spielkarten, Gespenst ----------
const FIG = (() => {
  const L = `stroke="#3a2a1e" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  let gid = 0;
  const lin = (c1, c2, x2 = 0, y2 = 1) => { const id = "fg" + (gid++); return [id, `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`]; };
  const rad = (c1, c2, cx = 40, cy = 30) => { const id = "fg" + (gid++); return [id, `<radialGradient id="${id}" cx="${cx}%" cy="${cy}%" r="75%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`]; };
  const hell = (c, k = 30) => `color-mix(in srgb, ${c} ${100 - k}%, #fff)`, dunkel = (c, k = 35) => `color-mix(in srgb, ${c} ${100 - k}%, #000)`;

  // ---------- Meeple: Holzfigur mit sichtbarer Seitenkante, Maserung und Glanz ----------
  const MEEPLE = "M50 8c-9 0-15 7-15 15 0 5 2 8 4.6 10.4C26 35.6 12 39.6 10 46c-1.6 5.4 6 8 15 8L19 82c-1 5 2 8 7 8h13l11-15 11 15h13c5 0 8-3 7-8l-6-28c9 0 16.6-2.6 15-8-2-6.4-16-10.4-29.6-12.6C63 31 65 28 65 23c0-8-6-15-15-15z";
  function meeple(c, o = {}) {
    const [g, d] = lin(hell(c, 22), dunkel(c, 12), .3, 1);
    const tf = o.t || "";
    return `<defs>${d}</defs><g transform="${tf}">
      <ellipse cx="52" cy="92" rx="34" ry="5" fill="#00000026"/>
      <path d="${MEEPLE}" transform="translate(3.4 3.4)" fill="${dunkel(c, 40)}" ${L}/>
      <path d="${MEEPLE}" fill="url(#${g})" ${L}/>
      <path d="M44 14q6-4 12 0M18 46q10-6 24-8M34 70q2-8 6-14M66 70q-2-8-6-14" stroke="${dunkel(c, 25)}" stroke-width="1" fill="none" opacity=".5"/>
      <path d="M41 16q4-5 10-5" stroke="#ffffff" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/><path d="M16 46q4-3 9-4" stroke="#ffffff" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>
      ${o.gesicht ? `<circle cx="45" cy="22" r="2" fill="#3a2a1e"/><circle cx="55" cy="22" r="2" fill="#3a2a1e"/><path d="M45 28q5 4 10 0" stroke="#3a2a1e" stroke-width="1.6" fill="none" stroke-linecap="round"/>` : ""}
      ${o.extra || ""}</g>`;
  }
  // Zirkus-Meeple
  const clown = () => meeple("#ffd23a", { gesicht: true, extra: `<circle cx="50" cy="25" r="3.4" fill="#e2402f" ${L}/><path d="M36 12l14-14 14 14z" fill="#2b5fd9" ${L}/><circle cx="50" cy="-2" r="3" fill="#ffffff" ${L}/>${[[30, 44], [44, 44], [58, 44], [72, 44]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="5" fill="${["#e2402f", "#ffffff", "#2b5fd9", "#ffffff"][i]}" ${L}/>`).join("")}` });
  const dompteur = () => meeple("#c8202a", { gesicht: true, extra: `<rect x="40" y="-6" width="20" height="14" rx="2" fill="#1d1714" ${L}/><rect x="34" y="6" width="32" height="4" rx="2" fill="#1d1714" ${L}/><path d="M40 4h20" stroke="#ffd23a" stroke-width="2"/><path d="M44 40v34M56 40v34" stroke="#ffd23a" stroke-width="2"/>${[48, 56, 64].map(y => `<circle cx="50" cy="${y}" r="1.8" fill="#ffd23a"/>`).join("")}<path d="M84 48q10-14 4-30" stroke="#8a5a2b" stroke-width="2.4" fill="none"/>` });
  const jongleur = () => `${meeple("#8b5cf6", { gesicht: true })}${[[22, 6, "#e2402f"], [50, -8, "#ffd23a"], [78, 6, "#3fae4a"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}" ${L}/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#ffffff" opacity=".6"/>`).join("")}<path d="M22 14q28-26 56 0" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-dasharray="2 3" opacity=".8"/>`;
  const seil = () => `<path d="M0 66q50 8 100 0" stroke="#5a3a1a" stroke-width="2.4" fill="none"/><path d="M4 66v28M96 66v28" stroke="#8a5a2b" stroke-width="3"/><g transform="translate(20 16) scale(.6)">${meeple("#ff5fa2", { gesicht: true, extra: `<path d="M-30 40h160" stroke="#8a5a2b" stroke-width="3.4" stroke-linecap="round"/><circle cx="-30" cy="40" r="5" fill="#ffd23a"/><circle cx="130" cy="40" r="5" fill="#ffd23a"/>` })}</g>`;
  const turm = () => `<g transform="translate(4 58) scale(.36)">${meeple("#2b5fd9")}</g><g transform="translate(32 58) scale(.36)">${meeple("#e2402f")}</g><g transform="translate(60 58) scale(.36)">${meeple("#3fae4a")}</g><g transform="translate(18 30) scale(.36)">${meeple("#ffd23a")}</g><g transform="translate(46 30) scale(.36)">${meeple("#ff8a1a")}</g><g transform="translate(32 2) scale(.36)">${meeple("#ff5fa2", { gesicht: true })}</g>`;
  const einrad = () => `<circle cx="50" cy="82" r="12" fill="none" stroke="#2d3036" stroke-width="3.4"/>${[0, 45, 90, 135].map(a => `<path d="M${50 - 11 * Math.cos(a * Math.PI / 180)} ${82 - 11 * Math.sin(a * Math.PI / 180)}L${50 + 11 * Math.cos(a * Math.PI / 180)} ${82 + 11 * Math.sin(a * Math.PI / 180)}" stroke="#9aa3b1" stroke-width="1.2"/>`).join("")}<path d="M50 82V66" stroke="#2d3036" stroke-width="3"/><path d="M44 66h12" stroke="#2d3036" stroke-width="3"/><g transform="translate(22 18) scale(.56)">${meeple("#4fd1c5", { gesicht: true })}</g>`;
  const zelt = () => { const [g, d] = lin("#fff4f4", "#e9d8d8"), cid = "fz" + (gid++); return `<defs>${d}<clipPath id="${cid}"><path d="M8 88L50 14l42 74z"/></clipPath></defs><path d="M8 88L50 14l42 74z" fill="url(#${g})" ${L}/><g clip-path="url(#${cid})">${[0, 1, 2, 3, 4].map(i => `<path d="M50 14L${8 + i * 21} 88l${10.5} 0z" fill="#e2402f" opacity=".92"/>`).join("")}</g><path d="M8 88L50 14l42 74z" fill="none" ${L}/><path d="M50 14V2" stroke="#3a2a1e" stroke-width="2"/><path d="M50 2l14 4-14 4z" fill="#ffd23a" ${L}/><path d="M38 88q12-28 24 0z" fill="#3a1a10" ${L}/><path d="M12 82q38-10 76 0" stroke="#ffd23a" stroke-width="3" fill="none"/>`; };
  const podest = () => `<ellipse cx="50" cy="80" rx="32" ry="9" fill="#2b5fd9" ${L}/><path d="M18 64v16q32 18 64 0V64z" fill="#2b5fd9" ${L}/><ellipse cx="50" cy="64" rx="32" ry="9" fill="#e2402f" ${L}/>${[24, 40, 60, 76].map(x => `<path d="M${x} 72l3 4-3 4-3-4z" fill="#ffd23a"/>`).join("")}<g transform="translate(26 14) scale(.48)">${meeple("#ffffff", { gesicht: true })}</g>`;

  // ---------- Pöppel (Kegelfigur) und Würfel ----------
  function poeppel(c) { const [g, d] = lin(hell(c, 30), dunkel(c, 20), 1, .4);
    return `<defs>${d}</defs><ellipse cx="50" cy="90" rx="22" ry="5" fill="#00000026"/><path d="M30 86q0-6 6-8l6-30q-8-4-8-12a16 16 0 1 1 32 0q0 8-8 12l6 30q6 2 6 8z" fill="url(#${g})" ${L}/>
      <ellipse cx="50" cy="86" rx="20" ry="4" fill="${dunkel(c, 30)}" ${L}/><ellipse cx="44" cy="30" rx="4" ry="6" fill="#ffffff" opacity=".55"/><path d="M42 50q8 3 16 0" stroke="#ffffff" stroke-width="1.4" opacity=".4" fill="none"/>`; }
  function wuerfel(n = 5, c = "#ffffff", p = "#1d1714") { const P = { 1: [[50, 50]], 2: [[34, 34], [66, 66]], 3: [[32, 32], [50, 50], [68, 68]], 4: [[34, 34], [66, 34], [34, 66], [66, 66]], 5: [[32, 32], [68, 32], [50, 50], [32, 68], [68, 68]], 6: [[34, 30], [66, 30], [34, 50], [66, 50], [34, 70], [66, 70]] }[n];
    return `<rect x="17" y="19" width="68" height="68" rx="14" fill="${dunkel(c, 25)}" ${L}/><rect x="14" y="14" width="68" height="68" rx="14" fill="${c}" ${L}/>${P.map(([x, y]) => `<circle cx="${x - 2}" cy="${y - 2}" r="6" fill="${p}"/>`).join("")}<path d="M22 24q4-6 12-6" stroke="#ffffff" stroke-width="3" opacity=".7" fill="none" stroke-linecap="round"/>`; }
  // Spielbrett im Kreuzmuster mit vier Farbecken
  const brett = () => { const F = ["#e2402f", "#ffd23a", "#3fae4a", "#2b5fd9"];
    let s = `<rect x="8" y="8" width="84" height="84" rx="6" fill="#f6ecd2" ${L}/>`;
    [[18, 18], [82, 18], [82, 82], [18, 82]].forEach(([x, y], i) => { s += `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="3" fill="${F[i]}" opacity=".85"/>`; [[-4, -4], [4, -4], [-4, 4], [4, 4]].forEach(([a, b]) => s += `<circle cx="${x + a}" cy="${y + b}" r="2.4" fill="#ffffff" ${L} stroke-width=".8"/>`); });
    for (let i = 0; i < 5; i++) { s += `<circle cx="${38 + i * 6}" cy="44" r="2.2" fill="#ffffff" stroke="#3a2a1e" stroke-width=".8"/><circle cx="${38 + i * 6}" cy="56" r="2.2" fill="#ffffff" stroke="#3a2a1e" stroke-width=".8"/><circle cx="44" cy="${32 + i * 6}" r="2.2" fill="#ffffff" stroke="#3a2a1e" stroke-width=".8"/><circle cx="56" cy="${44 + i * 6}" r="2.2" fill="#ffffff" stroke="#3a2a1e" stroke-width=".8"/>`; }
    return s + `<g transform="translate(46 34) scale(.18)">${poeppel("#e2402f")}</g><g transform="translate(30 50) scale(.18)">${poeppel("#2b5fd9")}</g>`; };
  // Spielkarten (Zahl und Farbe), Rückseite
  const karte = (c, z, dreh = 0) => `<g transform="rotate(${dreh} 50 50)"><rect x="24" y="10" width="52" height="80" rx="7" fill="#ffffff" ${L}/><rect x="28" y="14" width="44" height="72" rx="5" fill="${c}"/>
    <ellipse cx="50" cy="50" rx="17" ry="28" fill="#ffffff" transform="rotate(30 50 50)"/><text x="50" y="61" text-anchor="middle" font-family="Fredoka, Arial Black, sans-serif" font-weight="800" font-size="30" fill="${c}" stroke="#1d1714" stroke-width="1.4" paint-order="stroke">${z}</text>
    <text x="33" y="24" font-family="Fredoka, sans-serif" font-weight="800" font-size="9" fill="#ffffff">${z}</text></g>`;
  const joker = (dreh = 0) => `<g transform="rotate(${dreh} 50 50)"><rect x="24" y="10" width="52" height="80" rx="7" fill="#ffffff" ${L}/><rect x="28" y="14" width="44" height="72" rx="5" fill="#1d1714"/>
    <g transform="rotate(30 50 50)"><clipPath id="jk${dreh}"><ellipse cx="50" cy="50" rx="17" ry="28"/></clipPath><g clip-path="url(#jk${dreh})"><rect x="30" y="20" width="20" height="30" fill="#e2402f"/><rect x="50" y="20" width="20" height="30" fill="#2b5fd9"/><rect x="30" y="50" width="20" height="30" fill="#ffd23a"/><rect x="50" y="50" width="20" height="30" fill="#3fae4a"/></g></g></g>`;
  const fächer = () => `${karte("#2b5fd9", 7, -24)}${karte("#3fae4a", 3, -8)}${karte("#ffd23a", 9, 8)}${karte("#e2402f", 2, 24)}`;
  const stapel = () => `${[0, 1, 2, 3].map(i => `<rect x="${26 + i}" y="${14 - i * 2}" width="52" height="80" rx="7" fill="#1d1714" stroke="#ffffff" stroke-width="1.4"/>`).join("")}<rect x="29" y="8" width="52" height="80" rx="7" fill="#1d1714" stroke="#ffffff" stroke-width="2"/><ellipse cx="55" cy="48" rx="16" ry="27" fill="#e2402f" transform="rotate(30 55 48)"/><ellipse cx="55" cy="48" rx="10" ry="18" fill="#ffd23a" transform="rotate(30 55 48)"/>`;

  // ---------- Gespenst: weich leuchtend, durchscheinend, wehender Saum ----------
  function gespenst(o = {}) { const [g, d] = rad("#ffffff", "#dfe6f4", 40, 26), [h, dh] = rad("#fff9d6", "#fff9d600", 50, 50);
    const blick = o.blick || 0;
    return `<defs>${d}${dh}</defs><ellipse cx="50" cy="48" rx="46" ry="44" fill="url(#${h})" opacity=".8"/>
      <g class="float"><path d="M24 50q0-38 26-38t26 38v30q-4 8-9 2-4-6-8 2-5 8-9 0-4-8-9 0-5 6-8-2-4-8-9-2z" fill="url(#${g})" fill-opacity=".94" stroke="#7b86a8" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M24 56q-12 2-16-6 6 0 10-4M76 56q12 2 16-6-6 0-10-4" fill="#eef2fa" stroke="#7b86a8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M34 24q8-8 16-8" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="${41 + blick}" cy="42" rx="5.4" ry="7.4" fill="#1d1d2e"/><ellipse cx="${59 + blick}" cy="42" rx="5.4" ry="7.4" fill="#1d1d2e"/>
      <circle cx="${39.4 + blick}" cy="39" r="2" fill="#ffffff"/><circle cx="${57.4 + blick}" cy="39" r="2" fill="#ffffff"/>
      ${o.mund === "huhu" ? `<ellipse cx="50" cy="58" rx="5" ry="6.4" fill="#1d1d2e"/><ellipse cx="50" cy="61" rx="3" ry="2.4" fill="#e88aa0"/>` : `<path d="M44 56q6 6 12 0" stroke="#1d1d2e" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
      <ellipse cx="33" cy="52" rx="4" ry="2.4" fill="#ffb3c6" opacity=".55"/><ellipse cx="67" cy="52" rx="4" ry="2.4" fill="#ffb3c6" opacity=".55"/>${o.extra || ""}</g>`; }
  const spukschloss = () => `<rect x="6" y="6" width="88" height="88" rx="8" fill="#2a2a52"/><circle cx="74" cy="22" r="10" fill="#fff6c8"/><circle cx="78" cy="19" r="9" fill="#2a2a52"/>${[[16, 16], [36, 10], [60, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#ffffff"/>`).join("")}
    <path d="M18 92V44h12v-8h6v8h8V30h-4l10-16 10 16h-4v14h8v-8h6v8h12v48z" fill="#4a4a6a" ${L}/>${[[24, 56], [64, 56], [46, 40]].map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="11" rx="4" fill="#ffd86a"/>`).join("")}<path d="M42 92V76q8-10 16 0v16" fill="#2a1a10"/>
    <g transform="translate(58 58) scale(.3)">${gespenst({ mund: "huhu" })}</g>`;
  const kerzen = () => `<path d="M30 84h40M50 84V54M30 54h40M30 54v-6M50 54v-10M70 54v-6" stroke="#c9a032" stroke-width="4" fill="none" stroke-linecap="round"/>${[[30, 40, 8], [50, 30, 14], [70, 40, 8]].map(([x, y, h]) => `<rect x="${x - 4}" y="${y}" width="8" height="${h}" fill="#fff4dc" ${L}/><path class="flame" d="M${x} ${y - 12}q5 6 0 11-5-5 0-11z" fill="#ffb02e"/>`).join("")}`;
  const schlüssel = () => `<circle cx="34" cy="50" r="14" fill="none" stroke="#e2b23a" stroke-width="7"/><path d="M48 50h38M74 50v12M84 50v9" stroke="#e2b23a" stroke-width="7" stroke-linecap="round"/><circle cx="34" cy="50" r="14" fill="none" stroke="#9a7414" stroke-width="1.4"/>`;
  const fledermaus = () => `<g class="float"><path d="M50 46q-10-12-22-6 4 2 4 8-6-2-12 4 10-2 14 6 4-6 8-4 2-4 8-8zM50 46q10-12 22-6-4 2-4 8 6-2 12 4-10-2-14 6-4-6-8-4-2-4-8-8z" fill="#3a2e4a" ${L}/><ellipse cx="50" cy="50" rx="6" ry="8" fill="#3a2e4a" ${L}/><circle cx="48" cy="48" r="1.4" fill="#ffd86a"/><circle cx="52" cy="48" r="1.4" fill="#ffd86a"/></g>`;
  const bild = () => `<rect x="20" y="14" width="60" height="72" rx="4" fill="#c9a032" ${L}/><rect x="26" y="20" width="48" height="60" fill="#5a4a6a"/><g transform="translate(30 30) scale(.4)">${gespenst({ blick: 4 })}</g>`;
  // in die Kachel einpassen (Hüte und Bälle ragen sonst heraus)
  const klein = (svg) => `<g transform="translate(12 20) scale(.76)">${svg}</g>`;
  return { klein, meeple, clown, dompteur, jongleur, seil, turm, einrad, zelt, podest, poeppel, wuerfel, brett, karte, joker, fächer, stapel, gespenst, spukschloss, kerzen, schlüssel, fledermaus, bild };
})();
