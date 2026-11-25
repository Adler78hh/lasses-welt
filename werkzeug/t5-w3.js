// ---------- Idas Welt, Welt 3: Monster-Welt im Design von Lasses Welt 3 (Teil 1) ----------
// Sechs Schauplätze wie bei Lasse: Wasser, Pflanzen, Blitz, Kampf, Psycho, Feuer – gleiche Böden, Wandplatten,
// Hintergründe, Gegenstände und Effekte. Statt fremder Figuren eigene Fantasie-Monster (MON), statt Markenbällen Fangkugeln.
// Je Schauplatz ein Haupt-Monster in sechs Posen (wie Lasses Hauptrollen) und Ida im passenden Trainer-Outfit.
{
  const T = THEMES.taschenmonster, OLD = IDA_T1_MON;
  const INK = "#2d3036";
  const EK = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`, E2 = EK, PKK = EK;
  const P1 = (top, side) => (inner) => svgT(`${pad(top, side)}${inner}`);
  const pWasser = P1("#4aa8f0", "#2a78c8"), pBusch = P1("#4fb058", "#2f8a3a"), pVolt = P1("#ffd84a", "#d9a90c"),
    pDojo = P1("#c9a06a", "#8a6a3c"), pPsy = P1("#b07ad6", "#7a4aa6"), pLava = P1("#5a3a34", "#3a2420");
  const pkPad = (top, side, ground) => `${pad(top, side)}<path d="M3 74q24-6 47 0t47 0v14q0 3-3 3H6q-3 0-3-3z" fill="${ground}"/>`;
  const tileWith = (padSvg) => (inner) => `<svg viewBox="0 0 100 100">${padSvg}<g transform="translate(4 4) scale(.92)">${inner}</g></svg>`;
  const KUGEL = (cap, x = 22, y = 18, s = .56) => `<g transform="translate(${x} ${y}) scale(${s})">${FANGKUGEL(cap)}</g>`;
  const monTile = (padSvg, name) => () => svgT(`${padSvg}<g transform="translate(6 2) scale(.88)">${MON(name)}</g>`);

  // Haupt-Monster: Name → Typ (eigene Namen, eigene Zeichnung aus MON)
  Object.assign(MON_TYP, { blubbi: "wasser", apfeli: "pflanze", funki: "blitz", boxi: "kampf", traumi: "psycho", glimmi: "feuer",
    menki: "kampf", abra: "psycho", traumato: "psycho", mew: "psycho", fukano: "feuer", ponita: "feuer", vulpix: "feuer",
    perli: "wasser", seerosi: "wasser", knospi: "pflanze", beeri: "pflanze", spuli: "blitz", steini: "kampf", wolki: "psycho", funkel: "feuer" });

  // Posen: normal, schlafend (Z), mit Gegenstand, jubelnd (Sterne), cool (Brille), mit Herz
  const zz = `<g fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M72 20h8l-8 9h8"/><path d="M82 8h6l-6 7h6"/></g>`;
  const sterne = [[14, 20], [86, 16], [12, 50]].map(([x, y]) => `<path d="M${x} ${y - 7}l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#ffd23a" stroke="${INK}" stroke-width="1.4"/>`).join("");
  const herz = `<path d="M80 30c-9-6-9-14-3-14 2 0 3 2 3 2s1-2 3-2c6 0 6 8-3 14z" fill="#ff5f8f" stroke="${INK}" stroke-width="1.6"/>`;
  const brille = `<path d="M34 53h32v5q-4 6-10 2l-4-4h-4l-4 4q-6 4-10-2z" fill="${INK}"/><path d="M38 55l5 3M58 55l5 3" stroke="#fff" stroke-width="1.6"/>`;
  const schlafAugen = (name) => { const [c] = MON_FARBE[MON_TYP[name]]; const d = 9 + (monHash(name) % 3);
    return [-1, 1].map(s => `<ellipse cx="${50 + s * d}" cy="58" rx="5.4" ry="6.2" fill="${c}"/><path d="M${50 + s * d - 4} 58q4 3 8 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join(""); };
  const gross = (svg) => `<g transform="translate(50 60) scale(1.18) translate(-50 -60)">${svg}</g>`;
  const posen = (name, front) => [MON(name), MON(name) + schlafAugen(name) + zz, MON(name) + front, MON(name) + sterne, MON(name) + brille, MON(name) + herz].map(gross);

  // Ida als Trainerin, Outfit in den Farben des Schauplatzes, Kappe mit Stern
  const idaOutfit = (shirt, pants, cap) => kIda8({ shirt, pants, shoes: "#ffffff",
    body: `<path d="M44 44v24" stroke="${cap}" stroke-width="5"/><path d="M50 44v24" stroke="${INK}" stroke-width="1.2"/>`,
    head: `<path d="M31 22q0-17 19-17t19 17z" fill="${cap}" stroke="${INK}" stroke-width="2.2"/><path d="M31 22h38" stroke="#ffffff" stroke-width="4"/><path d="M62 21h14l-2 4H62z" fill="${cap}" stroke="${INK}" stroke-width="1.6"/><path d="M50 10l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="#ffffff"/>` });

  // Apfelkuchen und Äpfel für den Pflanzen-Schauplatz (bei Lasse: Apfel-Monster mit Kuchen)
  const kuchen = (c) => `<ellipse cx="50" cy="66" rx="32" ry="14" fill="#e9eaee" ${E2}/><path d="M22 62q0-20 28-20t28 20q-28 10-56 0z" fill="#e0a85a" ${E2}/><path d="M30 54l40 0M34 48l32 0" stroke="#b9772f" stroke-width="3"/><circle cx="50" cy="40" r="6" fill="${c}" ${E2}/><path d="M50 34q2-6 6-6" stroke="#3f8a32" stroke-width="2.4" fill="none"/>`;
  const apfelBaum = `<path d="M50 90V50" stroke="#8a5a2b" stroke-width="7"/><circle cx="50" cy="38" r="26" fill="#4faa45" ${E2}/>${[[38, 32, "#e2402f"], [60, 28, "#e2402f"], [54, 48, "#ffd23a"], [36, 48, "#e2402f"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5.4" fill="${c}" ${E2} stroke-width="1.6"/>`).join("")}`;
  const korb = `<path d="M18 50h64l-8 34H26z" fill="#c9935a" ${E2}/><path d="M24 60h52M28 72h44" stroke="#8a5a2b" stroke-width="2.4"/>${[[34, 44, "#e2402f"], [50, 40, "#ffd23a"], [66, 44, "#3fae4a"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" ${E2}/>`).join("")}<path d="M24 50q26-34 52 0" fill="none" stroke="#8a5a2b" stroke-width="4"/>`;

  // Haupt-Monster je Schauplatz: Kachel, Gegenstände (wie bei Lasse, ohne Schrift), Ida-Farben, Rufe
  const STARS = {
    Wasser: { mon: "blubbi", tile: tileWith(pkPad("#e3f4ff", "#9fc6e6", "#7fc8f0")),
      front: `<g transform="translate(66 60)"><rect x="0" y="0" width="22" height="12" rx="4" fill="#ff8a1a" ${PKK}/><rect x="16" y="10" width="6" height="10" rx="2" fill="#ff8a1a" ${PKK}/></g>`,
      items: [`<ellipse cx="50" cy="60" rx="30" ry="24" fill="#c27b3e" ${PKK}/><path d="M30 50h40M24 62h52M30 74h40M50 36v48" stroke="#8a5a2b" stroke-width="3"/><ellipse cx="50" cy="60" rx="30" ry="24" fill="none" stroke="#f3e0a6" stroke-width="4"/>`,
        `<path d="M20 70q30-40 60 0z" fill="#f6b6c6" ${PKK}/>${[30, 40, 50, 60, 70].map(x => `<path d="M50 70L${x} 42" stroke="#d87a92" stroke-width="2"/>`).join("")}<circle cx="70" cy="40" r="6" fill="#fff" ${PKK}/><circle cx="30" cy="44" r="4" fill="#fff" ${PKK}/>`,
        `<path d="M18 54h64v8q-4 10-14 4l-8-6h-4l-8 6q-10 6-14-4z" fill="${INK}"/><path d="M28 56l10 6M64 56l10 6" stroke="#fff" stroke-width="2.4"/>`],
      ida: ["#7fc8f0", "#3d6fb3", "#2a78c8"], words: ["Blubb!", "Platsch!"], win: "Blubbi jubelt!",
      extra: [monTile(waterPad, "perli"), monTile(waterPad, "seerosi"),
        () => svgT(`${waterPad}<ellipse cx="36" cy="58" rx="20" ry="10" fill="#5fae4f" ${EK}/><path d="M36 58l16-6" stroke="#3f8a3a" stroke-width="2"/>${flower(40, 50, "#ff9ab8", 5)}<ellipse cx="70" cy="74" rx="12" ry="6" fill="#5fae4f" ${EK}/>`),
        () => svgT(`${waterPad}<path d="M20 80q8-34 30-38 22 4 30 38z" fill="#9a8f80" ${EK}/><path d="M34 60q8-6 16-2" stroke="#ffffff55" stroke-width="3" fill="none"/>`),
        () => pWasser(KUGEL("#2b9fd9")),
        () => pWasser(`<path d="M20 70q10-30 30-30t30 30z" fill="#a59a8c" ${E2}/><path d="M60 40l8-24 6 4-6 22" fill="#8a5a2b" ${E2}/><path d="M66 18q14 6 20 22" fill="none" stroke="${INK}" stroke-width="1.6"/>`),
        () => pWasser(`<ellipse cx="50" cy="62" rx="30" ry="12" fill="#3fae4a" ${E2}/><path d="M50 50l-4-20M50 50l8-18M50 50l-14-12" stroke="#3fae4a" stroke-width="4"/><circle cx="58" cy="40" r="7" fill="#ff8fb1" ${E2}/>`)] },
    Pflanzen: { mon: "apfeli", tile: tileWith(pkPad("#eef8e2", "#a9cf8f", "#86c96e")),
      front: `<g transform="translate(64 62) scale(.4)"><circle cx="20" cy="20" r="18" fill="#e2402f" ${PKK}/><path d="M20 2q4-8 10-8" stroke="#3f8a32" stroke-width="4" fill="none"/></g>`,
      items: [kuchen("#e2402f"), kuchen("#ffd23a"), apfelBaum, korb],
      ida: ["#86c96e", "#4f7a3a", "#e2402f"], words: ["Lecker!", "Mampf!"], win: "Apfeli ist satt!",
      extra: [monTile(bushPad, "knospi"), monTile(bushPad, "beeri"),
        () => svgT(`${bushPad}${[[30, 40], [50, 30], [66, 46], [40, 60], [60, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#8b5cf6" ${EK} stroke-width="1.4"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#fff" opacity=".6"/>`).join("")}`),
        () => pBusch(KUGEL("#3fae4a")),
        () => pBusch(`<path d="M50 86V40" stroke="#8a5a2b" stroke-width="6"/><circle cx="50" cy="36" r="26" fill="#3fae4a" ${E2}/>${[[38, 30], [58, 26], [52, 46], [36, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#2b5fd9" ${E2}/>`).join("")}`)] },
    Blitz: { mon: "funki", tile: tileWith(pkPad("#fff6d6", "#e6cf8a", "#b6dc7a")),
      front: `<g transform="translate(70 56)"><rect x="0" y="6" width="14" height="28" rx="5" fill="#e8423a" ${PKK}/><path d="M3 6l4-8 4 8z" fill="#fff" ${PKK}/><rect x="2" y="16" width="10" height="8" fill="#fff"/></g>`,
      items: [`<rect x="38" y="24" width="24" height="56" rx="10" fill="#e8423a" ${PKK}/><path d="M42 24l8-14 8 14z" fill="#fff" ${PKK}/><rect x="40" y="44" width="20" height="16" fill="#fff"/>`,
        `<path d="M56 10L30 54h18l-8 36 32-46H54l12-34z" fill="#ffd23a" ${PKK}/>`,
        `${[[36, 50, "#e8423a"], [56, 46, "#2b5fd9"], [46, 64, "#ffd23a"], [64, 64, "#e8423a"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="10" fill="${c}" ${PKK}/><path d="M${x} ${y - 10}q2-6 6-8" fill="none" stroke="#3fae4a" stroke-width="3"/>`).join("")}`],
      ida: ["#ffd84a", "#8a5a2b", "#e8423a"], words: ["Bzzt!", "Funki!"], win: "Funki freut sich!",
      extra: [monTile(voltPad, "spuli"),
        () => svgT(`${voltPad}<rect x="22" y="22" width="56" height="44" rx="6" fill="#9aa3b1" ${EK}/><rect x="30" y="30" width="40" height="16" rx="3" fill="${INK}"/><path class="lava" d="M34 38h8l4-6 6 12 4-6h10" stroke="#7dff9a" stroke-width="2.4" fill="none"/><circle cx="36" cy="56" r="4" fill="#e0483a"/><circle cx="50" cy="56" r="4" fill="#3fae4a"/>`),
        () => svgT(`${voltPad}<rect x="30" y="20" width="40" height="60" rx="8" fill="#3fae4a" ${EK}/><rect x="42" y="14" width="16" height="8" rx="3" fill="#9aa3b1" ${EK}/><path d="M54 30L42 52h10l-6 20 14-26H50z" fill="#f7d02c" ${EK} stroke-width="1.6"/>`),
        () => pVolt(KUGEL("#ffd23a", 22, 14)),
        () => pVolt(`<path d="M50 10l-20 40h16l-8 38 28-48H50l10-30z" fill="#fff" ${E2}/>`),
        () => pVolt(`<rect x="24" y="22" width="52" height="44" rx="6" fill="${INK}" ${E2}/><path d="M30 46l8-10 8 14 8-20 8 16h8" fill="none" stroke="#3fbf7a" stroke-width="3"/><circle cx="34" cy="60" r="3" fill="#e2402f"/><circle cx="44" cy="60" r="3" fill="#ffd23a"/>`)] },
    Kampf: { mon: "boxi", tile: tileWith(pkPad("#f3e6d2", "#c9a87a", "#b8a58a")),
      front: `<g transform="translate(8 74)"><rect x="0" y="6" width="34" height="5" rx="2" fill="#5b6475" ${PKK}/><rect x="2" y="0" width="7" height="17" rx="2" fill="${INK}" ${PKK}/><rect x="25" y="0" width="7" height="17" rx="2" fill="${INK}" ${PKK}/></g>`,
      items: [`<path d="M14 84l14-30 16 12 12-26 18 22 12 22z" fill="#a9a49a" ${PKK}/><circle cx="40" cy="70" r="3" fill="#7a7468"/><circle cx="64" cy="60" r="3" fill="#7a7468"/>`,
        `<rect x="14" y="46" width="72" height="8" rx="3" fill="#5b6475" ${PKK}/>${[18, 28, 64, 74].map(x => `<rect x="${x}" y="34" width="8" height="32" rx="3" fill="${INK}" ${PKK}/>`).join("")}`,
        `<path d="M50 16l26 14v28L50 76 24 58V30z" fill="#a9a49a" ${PKK}/><path d="M50 26l16 8v18L50 62 34 52V34z" fill="#8e887c" ${PKK}/>`],
      ida: ["#a9a49a", "#5b6475", "#e2402f"], words: ["Rumms!", "Hau ruck!"], win: "Boxi ist stark!",
      extra: [monTile(dojoPad, "steini"),
        () => svgT(`${dojoPad}<path d="M30 90V36M70 90V36" stroke="#8a5a2b" stroke-width="5"/><path d="M24 36h52" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="60" r="16" fill="#e0483a" ${EK}/><path d="M50 36v8" stroke="${INK}" stroke-width="3"/>`),
        () => pDojo(`${[[36, "#e2402f"], [64, "#2b5fd9"]].map(([x, c]) => `<path d="M${x - 14} 30q0-12 14-12t14 12v30q0 12-14 12t-14-12z" fill="${c}" ${E2}/><rect x="${x - 12}" y="66" width="24" height="12" rx="3" fill="#fff" ${E2}/>`).join("")}`),
        () => pDojo(`<rect x="10" y="44" width="80" height="10" rx="4" fill="#5b6475" ${E2}/>${[16, 26, 74, 84].map((x, i) => `<rect x="${x - 4}" y="${i % 3 ? 34 : 28}" width="8" height="${i % 3 ? 30 : 42}" rx="3" fill="${INK}" ${E2}/>`).join("")}`),
        () => pDojo(`<use href="#orden" x="18" y="14" width="64" height="64"/>`)] },
    Psycho: { mon: "traumi", tile: tileWith(pkPad("#f3ecff", "#c9b4e6", "#c9a8e8")),
      front: `<g><circle cx="50" cy="18" r="11" fill="#7a3fb0" opacity=".85" ${PKK}/><circle cx="50" cy="18" r="6" fill="#d9c4ff"/></g>`,
      items: [`<circle cx="50" cy="50" r="24" fill="#7a3fb0" ${PKK}/><circle cx="50" cy="50" r="14" fill="#d9c4ff"/><circle cx="44" cy="44" r="5" fill="#fff" opacity=".7"/>`,
        `<rect x="34" y="16" width="32" height="68" rx="14" fill="#cfe9ff" fill-opacity=".7" ${PKK}/><path d="M38 60q12 6 24 0v16q-12 8-24 0z" fill="#9fd8ff"/><rect x="30" y="80" width="40" height="8" rx="3" fill="#5b6475" ${PKK}/>`,
        `<path d="M40 88V50q0-6 6-6" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M40 88V50q0-6 6-6" fill="none" stroke="#e9eaee" stroke-width="7" stroke-linecap="round"/><path d="M46 44q4-26 18-28" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M46 44q4-26 18-28" fill="none" stroke="#e9eaee" stroke-width="7" stroke-linecap="round"/><ellipse cx="66" cy="14" rx="9" ry="11" fill="#e9eaee" ${PKK}/>`],
      ida: ["#e6e2ef", "#9b6bc9", "#9b6bc9"], words: ["Psi!", "Wow!"], win: "Traumi staunt!",
      extra: [monTile(psyPad, "wolki"),
        () => svgT(`${psyPad}<g class="float">${[[34, 44], [62, 36], [50, 64]].map(([x, y]) => `<path d="M${x} ${y - 10}l7 10-7 10-7-10z" fill="#e7b8ff" ${EK} stroke-width="1.4"/>`).join("")}</g>`),
        () => svgT(`${psyPad}<circle cx="50" cy="52" r="24" fill="#f6e8ff" ${EK}/><path d="M34 52q16-14 32 0-16 14-32 0z" fill="#ffffff" ${EK}/><circle cx="50" cy="52" r="6" fill="#8b5cf6"/>`),
        () => pPsy(`<circle cx="50" cy="44" r="24" fill="#e3d4ff" ${E2}/><path d="M38 34q8-8 16-2" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M34 70h32l-6 14H40z" fill="#4a3a7a" ${E2}/>`),
        () => pPsy(`<path d="M40 86V50q0-6 6-6" fill="none" stroke="#e9eaee" stroke-width="7" stroke-linecap="round"/><path d="M46 44q4-28 18-30" fill="none" stroke="#e9eaee" stroke-width="7" stroke-linecap="round"/><ellipse cx="66" cy="16" rx="8" ry="10" fill="#e9eaee" ${E2}/>`),
        () => pPsy(`<path d="M62 18a28 28 0 1 0 0 64 22 22 0 1 1 0-64z" fill="#ffd23a" ${E2}/>${[[30, 26], [40, 52], [24, 70]].map(([x, y]) => `<path d="M${x} ${y - 5}l2 3 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="#fff"/>`).join("")}`)] },
    Feuer: { mon: "glimmi", tile: tileWith(pkPad("#fde3d0", "#d9a07a", "#b8764a")),
      front: `<path class="flame" d="M40 40q-16-4-30 4 14 6 30 2z" fill="#ffb02e" ${PKK}/><path d="M40 42q-10-2-20 2 10 3 20 1z" fill="#fff3a0"/>`,
      items: [`<path d="M24 82l52-12M24 70l52 12" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><path class="flame" d="M50 74q-22-18-6-46 4 12 10 8 2-12 10-18 12 26-14 56z" fill="#ff8a1a" ${PKK}/><path d="M50 72q-8-8-2-20 6 8 8 2 6 10-6 18z" fill="#ffd23a"/>`,
        `<path d="M50 20l12 22-12 40-12-40z" fill="#e2402f" ${PKK}/><path d="M38 42h24" stroke="#ffd23a" stroke-width="2"/>`,
        `<path d="M14 84l22-40h28l22 40z" fill="#7a3a26" ${PKK}/><path d="M36 44q4-16 14-6 10-10 14 6" fill="#ff8a3d" ${PKK}/><path d="M42 44l4 20M58 44l-2 16" stroke="#ffb02e" stroke-width="4"/>`],
      ida: ["#ffa25a", "#e8702a", "#e8702a"], words: ["Fauch!", "Feuer!"], win: "Glimmi brüllt vor Freude!",
      extra: [monTile(lavaPad, "funkel"),
        () => svgT(`${lavaPad}<path d="M30 90l12-50h16l12 50z" fill="#4a3730" ${EK}/><path class="tailflame" d="M50 40q14-14 4-30-6 10-12 6-4 14 8 24z" fill="#ff7a1a"/><path d="M50 36q6-6 2-14-4 6-6 4 0 6 4 10z" fill="#ffd36b"/>`),
        () => svgT(`${lavaPad}<path d="M24 86q10-30 26-30t26 30z" fill="#6b4a40" ${EK}/><path d="M38 76q12-8 24 0" stroke="#ff7a1a" stroke-width="3" fill="none" class="lava"/><circle cx="64" cy="40" r="6" fill="#ff7a1a" opacity=".6"/>`),
        () => pLava(`<path d="M24 82l52-12M24 70l52 12" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><path class="flame" d="M50 74q-22-18-6-46 4 12 10 8 2-12 10-18 12 26-14 56z" fill="#ff8a1a" ${E2}/><path d="M50 72q-8-8-2-20 6 8 8 2 6 10-6 18z" fill="#ffd23a"/>`),
        () => pLava(KUGEL("#e2402f")),
        () => pLava(`<path d="M50 20l12 22-12 40-12-40z" fill="#e2402f" ${E2}/><path d="M38 42h24M50 20v62" stroke="#ffd23a" stroke-width="2" opacity=".8"/>`)] }
  };

  // Grundlage: die sechs Schauplätze von Lasses Welt 3 (Wasser, Pflanzen, Blitz aus Welt 3, Kampf, Psycho, Feuer aus „Taschenmonster 2“)
  const KEYS = ["Wasser", "Pflanzen", "Blitz", "Kampf", "Psycho", "Feuer"];
  const basis = [...OLD.mon.scenes, ...OLD.mon2.scenes];
  const six = KEYS.map((k, i) => {
    const b = basis[i], cfg = STARS[k], name = `${k}-Monster`;
    const people = posen(cfg.mon, cfg.front).map((p, j) => () => asPerson(cfg.tile(p), cfg.mon + j));
    const things = cfg.items.map(it => () => cfg.tile(it));
    const list = [...people, ...people, ...things];
    // wie bei Lasse: drei Zehntel Zusatzmotive, sonst zwei Drittel Haupt-Monster und Gegenstände, ein Drittel Grundwand
    const wall = (x, y) => pick(x, y, 77, 10) < 3 ? cfg.extra[pick(x, y, 78, cfg.extra.length)](x, y)
      : pick(x, y, 31, 3) < 2 ? list[pick(x, y, 32, list.length)]() : b.wall(x, y);
    LASSE["i5_" + cfg.mon] = idaOutfit(...cfg.ida); OUTFIT[name] = "i5_" + cfg.mon;
    const jubel = MON(cfg.mon) + sterne;
    return { ...b, name, lasse: "i5_" + cfg.mon, wall, words: cfg.words, winTitle: cfg.win,
      side: { l: [`<svg viewBox="0 0 100 200"><g transform="translate(0 96)">${jubel}</g></svg>`], r: [] },
      introIcon: cfg.tile(jubel), companion: MON(cfg.mon) };
  });
  const pick9 = [0, 0, 1, 2, 2, 3, 4, 4, 5];
  T.scenes = six; T.levelScenes = pick9.map(i => six[i]);
  T.levelNames = pick9.map(i => six[i].name); T.levelName = (l) => six[pick9[l]].name;
  T.target = OLD.mon.target;
  Object.assign(T.pal, { "--floor-a": "#f3e2b3", "--floor-b": "#eed9a3" });
}
