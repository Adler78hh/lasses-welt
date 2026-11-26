// ---------- Idas Welt, Welten 4–6: Helden, Brettspiele, Prinzessin (Zeichenstil von Lasses Welt) ----------
{
  const K = `stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`, K1 = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const tile = (top, side, s = .92) => (inner) => svgT(`${pad(top, side)}<g transform="translate(${50 - 50 * s} ${48 - 50 * s}) scale(${s})">${inner}</g>`);
  const fz = (fns) => fns.map(f => typeof f === "function" ? f : () => f);
  const boden = (a, b, extra = () => "") => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/>${extra(x, y)}`);
  const funkel = (x, y) => pick(x, y, 3, 5) === 0 ? `<path d="M${30 + pick(x, y, 4, 40)} ${30 + pick(x, y, 5, 40)}l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffffff" opacity=".8"/>` : "";
  const szene = (name, lasse, pal, floor, walls, t, extras = () => "") => ({ name, lasse, pal, floor, i5own: true, wall: feierWalls(fz(walls), () => IDA5.onkel(t)), deco: () => "", extras });
  const symbol = (id, inner) => `<symbol id="${id}" viewBox="0 0 100 100" overflow="visible">${inner}</symbol>`;
  const ziel = (rand, innen) => () => `<svg viewBox="0 0 100 100"><ellipse class="glow" cx="50" cy="52" rx="40" ry="36" fill="#fff3b0"/>${innen}<ellipse cx="50" cy="52" rx="38" ry="34" fill="none" stroke="${rand}" stroke-width="4" stroke-dasharray="9 6"/><g class="fx" fill="#ffd23a"><path d="M12 8l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/><path d="M86 4l2.5 5.5 6 .8-4.3 4 1 6-5.2-3-5.2 3 1-6-4.3-4 6-.8z"/></g></svg>`;

  // ===================== Welt 4: Helden =====================
  // Level 1–3: Hunde in deutschen Uniformen (Feuerwehr, Polizei, Rettungsteam). Level 4–6: blaue Hunde (Australian Cattle Dogs) zu Hause.
  const dog = (svg, id) => (t) => () => asPerson(t(svg), id);
  const tF = tile("#f4e4dc", "#c9907a", .94), tP = tile("#e2e8f4", "#9aa8c4", .94), tR = tile("#e6f0f6", "#8fb0c4", .94);
  const feuerwehrauto = `<rect x="8" y="34" width="62" height="38" rx="4" fill="#d8202a" ${K}/><path d="M70 44h14l8 12v16H70z" fill="#d8202a" ${K}/><rect x="74" y="48" width="10" height="9" rx="2" fill="#bfe3f5" ${K1}/>${[16, 30, 44, 58].map(x => `<rect x="${x - 4}" y="40" width="8" height="12" rx="1" fill="#f4f1ea" ${K1}/>`).join("")}<path d="M8 62h84" stroke="#ffffff" stroke-width="3"/><path d="M10 30h54" stroke="#c9ccd2" stroke-width="4"/>${[16, 26, 36, 46, 56].map(x => `<path d="M${x} 26v8" stroke="#c9ccd2" stroke-width="2"/>`).join("")}<rect x="72" y="38" width="10" height="5" rx="2" fill="#2f7ae5" class="siren"/><circle cx="24" cy="76" r="9" fill="#2d3036" ${K1}/><circle cx="78" cy="76" r="9" fill="#2d3036" ${K1}/><circle cx="24" cy="76" r="3" fill="#c9ccd2"/><circle cx="78" cy="76" r="3" fill="#c9ccd2"/>`;
  const hydrant = `<rect x="36" y="30" width="28" height="52" rx="6" fill="#d8202a" ${K}/><path d="M32 30q18-18 36 0z" fill="#d8202a" ${K}/><rect x="26" y="46" width="48" height="10" rx="4" fill="#b8181f" ${K1}/><rect x="32" y="80" width="36" height="8" rx="2" fill="#9a9ea6" ${K1}/><circle cx="50" cy="20" r="4" fill="#b8181f" ${K1}/>`;
  const schlauch = `<circle cx="50" cy="52" r="30" fill="#c9ccd2" ${K}/>${[24, 18, 12, 6].map(r => `<circle cx="50" cy="52" r="${r}" fill="none" stroke="#e8e2d4" stroke-width="4"/>`).join("")}<circle cx="50" cy="52" r="5" fill="#9a9ea6" ${K1}/><path d="M78 60l12 12" stroke="#c9a032" stroke-width="6" stroke-linecap="round"/>`;
  const streifenwagen = `<path d="M14 58l10-18h44l12 18z" fill="#e9eef7" ${K}/><rect x="8" y="56" width="84" height="18" rx="5" fill="#e9eef7" ${K}/><path d="M8 64h84" stroke="#2f5cc8" stroke-width="5"/><rect x="40" y="32" width="20" height="7" rx="2" fill="#2f7ae5" class="siren blue"/><path d="M28 44h16v12H24zM50 44h16l6 12H50z" fill="#bfe3f5" ${K1}/><circle cx="26" cy="76" r="8" fill="#2d3036" ${K1}/><circle cx="74" cy="76" r="8" fill="#2d3036" ${K1}/>`;
  const blaulicht = `<rect x="30" y="56" width="40" height="16" rx="4" fill="#2d3036" ${K}/><path d="M34 56q0-28 16-28t16 28z" fill="#2f7ae5" class="siren" ${K}/><path d="M42 42q2-8 8-8" stroke="#ffffff" stroke-width="3" opacity=".7" fill="none"/>${[[20, 34], [80, 34], [16, 50], [84, 50]].map(([x, y]) => `<path d="M${x} ${y}l${x < 50 ? -6 : 6} -4" stroke="#7ab8ff" stroke-width="3" stroke-linecap="round"/>`).join("")}`;
  const kelle = `<path d="M50 88V52" stroke="#2d3036" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="36" r="22" fill="#ffffff" stroke="#d8202a" stroke-width="7"/><circle cx="50" cy="36" r="22" fill="none" ${K1}/>`;
  const hubschrauber = `<path d="M10 22h80" stroke="#2d3036" stroke-width="3"/><path d="M50 22v8" stroke="#2d3036" stroke-width="3"/><path d="M22 52q0-22 30-22h8q20 0 24 22z" fill="#d8202a" ${K}/><path d="M60 32q16 2 20 20H60z" fill="#bfe3f5" ${K1}/><path d="M22 46L4 40v12z" fill="#d8202a" ${K1}/><rect x="34" y="38" width="12" height="10" rx="2" fill="#ffffff" ${K1}/><path d="M40 39v8M36 43h8" stroke="#d8202a" stroke-width="2"/><path d="M30 62h50M38 52v10M70 52v10" stroke="#2d3036" stroke-width="3"/>`;
  const boot = `<path d="M10 54h80l-12 18H24z" fill="#ffd200" ${K}/><path d="M24 54V40h30l8 14" fill="#ffffff" ${K1}/><path d="M10 80q10-5 20 0t20 0 20 0 20 0" stroke="#5aa8e0" stroke-width="3" fill="none"/><circle cx="72" cy="44" r="7" fill="none" stroke="#d8202a" stroke-width="3"/>`;
  const radlader = `<rect x="18" y="38" width="44" height="26" rx="3" fill="#1c3f9a" ${K}/><rect x="40" y="24" width="20" height="18" rx="2" fill="#bfe3f5" ${K1}/><path d="M62 50l18-6v18H62z" fill="#ffd200" ${K}/><circle cx="28" cy="70" r="10" fill="#2d3036" ${K1}/><circle cx="56" cy="70" r="10" fill="#2d3036" ${K1}/><path d="M18 52h44" stroke="#ffd200" stroke-width="3"/>`;
  const kehrwagen = `<rect x="14" y="40" width="54" height="28" rx="4" fill="#f57a1a" ${K}/><rect x="56" y="30" width="24" height="24" rx="3" fill="#f57a1a" ${K}/><rect x="60" y="34" width="14" height="10" rx="2" fill="#bfe3f5" ${K1}/><path d="M14 56h66" stroke="#e8ff3a" stroke-width="3"/><circle cx="26" cy="74" r="8" fill="#2d3036" ${K1}/><circle cx="66" cy="74" r="8" fill="#2d3036" ${K1}/><ellipse cx="84" cy="78" rx="8" ry="4" fill="#ffd200" ${K1}/>`;
  const H = HUND;
  const HELDEN_FEUER = [dog(H.held("dalmatiner", "feuerwehr"), "dalma0"), dog(H.held("dalmatiner", "feuerwehr", { zunge: true }), "dalma1"), dog(H.held("dalmatiner", "feuerwehr", { hut: false }), "dalma2")];
  const HELDEN_POLIZEI = [dog(H.held("schaeferhund", "polizei"), "schaef0"), dog(H.held("schaeferhund", "polizei", { zunge: true }), "schaef1"), dog(H.held("schaeferhund", "polizei", { hut: false }), "schaef2")];
  const HELDEN_TEAM = [dog(H.held("bulldogge", "thw"), "bull"), dog(H.held("labrador", "wasser"), "labi"), dog(H.held("mischling", "reinigung"), "misch"), dog(H.held("cockapoo", "luft"), "cocka")];
  // Blaue Hunde: Eltern, zwei Welpen, Tante (verschiedene Blautöne und Masken)
  const BLAU = [
    H.blau({ band: "#e2402f" }),
    H.blau({ blau: "#5a6f90", hell: "#8ea2be", dunkel: "#33425a", maske: "links", band: "#3fae4a" }),
    H.blau({ welpe: true, tuch: "#ff8fb1", zunge: true }),
    H.blau({ welpe: true, blau: "#7d95b4", hell: "#b2c2d6", maske: "links", tuch: "#ffd23a" }),
    H.blau({ blau: "#8aa0bc", hell: "#c2cfdf", maske: "keine", band: "#8b5cf6", zunge: true })
  ];
  const blauDog = (i, t) => () => asPerson(t(BLAU[i]), "blau" + i);
  const tG = tile("#dff0d0", "#8fbf6a", .94), tZ = tile("#f2e6f6", "#b9a2c8", .94), tS = tile("#fbefd2", "#d9b878", .94);
  const trampolin = `<ellipse cx="50" cy="56" rx="40" ry="14" fill="#2d3036" ${K}/><ellipse cx="50" cy="54" rx="34" ry="10" fill="#4a4a52"/><path d="M14 58l-4 24M86 58l4 24M34 66l-2 18M66 66l2 18" stroke="#9aa3b1" stroke-width="4"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${12 + i * 8.4} ${54 - Math.sin(i / 9 * Math.PI) * 4}V22" stroke="#9aa3b1" stroke-width="1.4"/>`).join("")}<path d="M10 22h80" stroke="#3fae4a" stroke-width="3"/><g class="bob"><circle cx="50" cy="34" r="7" fill="#ff8a1a" ${K1}/></g>`;
  const schaukel = `<path d="M14 88L28 14h44l14 74" fill="none" stroke="#8a5a2b" stroke-width="5"/><path d="M28 14h44" stroke="#8a5a2b" stroke-width="6"/><path d="M40 16v46M60 16v46" stroke="${INK}" stroke-width="1.6"/><rect x="36" y="60" width="28" height="6" rx="2" fill="#e2402f" ${K1}/>`;
  const sandkasten = `<rect x="10" y="50" width="80" height="34" rx="4" fill="#e9c98a" ${K}/><path d="M10 50h80" stroke="#c9935a" stroke-width="5"/><path d="M28 70q4-14 10 0z" fill="#d9b06a" ${K1}/><path d="M60 58l10 18h-14z" fill="#2b5fd9" ${K1}/><path d="M70 58l8-14" stroke="#e2402f" stroke-width="3"/>`;
  const knochenSpiel = `<g transform="rotate(-20 50 50)"><rect x="22" y="44" width="56" height="12" rx="6" fill="#f4ecdc" ${K}/>${[[22, 44], [22, 56], [78, 44], [78, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#f4ecdc" ${K}/>`).join("")}</g>`;
  const hundekorb = `<ellipse cx="50" cy="64" rx="38" ry="18" fill="#c9935a" ${K}/><ellipse cx="50" cy="58" rx="30" ry="12" fill="#e8b4c6" ${K1}/><path d="M24 56q26-30 52 0" fill="none" stroke="#c9935a" stroke-width="7"/>`;
  const spielkiste = `<rect x="16" y="40" width="68" height="44" rx="4" fill="#ffd23a" ${K}/><path d="M16 52h68" stroke="${INK}" stroke-width="1.6"/><circle cx="30" cy="34" r="9" fill="#e2402f" ${K1}/><rect x="44" y="22" width="18" height="18" rx="2" fill="#2b5fd9" ${K1}/><path d="M66 40l6-20 8 2-4 18z" fill="#3fae4a" ${K1}/>`;
  const sofa = `<rect x="10" y="44" width="80" height="30" rx="8" fill="#5fae8f" ${K}/><rect x="16" y="30" width="68" height="20" rx="6" fill="#6fc09e" ${K}/><rect x="6" y="40" width="14" height="30" rx="6" fill="#5fae8f" ${K}/><rect x="80" y="40" width="14" height="30" rx="6" fill="#5fae8f" ${K}/><rect x="30" y="36" width="16" height="14" rx="4" fill="#ff8fb1" ${K1}/><path d="M18 74v8M82 74v8" stroke="#8a5a2b" stroke-width="4"/>`;
  const schirm = `<path d="M50 88V28" stroke="#8a5a2b" stroke-width="3"/><path d="M12 36q38-36 76 0z" fill="#ff5fa2" ${K}/>${[25, 50, 75].map(x => `<path d="M50 6Q${x} 18 ${x} 36" fill="none" stroke="#ffffff" stroke-width="3"/>`).join("")}`;
  const sandburg = `<path d="M14 84V52h14v-8h8v8h28v-8h8v8h14v32z" fill="#e9c98a" ${K}/><path d="M40 52V32h20v20" fill="#e9c98a" ${K}/><path d="M50 32V16" stroke="${INK}" stroke-width="1.6"/><path d="M50 16l12 4-12 4z" fill="#e2402f"/><path d="M44 84V72q6-6 12 0v12" fill="#c9a06a"/>`;
  const muschel = `<path d="M50 80L22 44q28-30 56 0z" fill="#ffc6b0" ${K}/>${[-24, -12, 0, 12, 24].map(d => `<path d="M50 80L${50 + d} 30" stroke="#e8987a" stroke-width="2"/>`).join("")}<circle cx="74" cy="76" r="6" fill="#ffffff" ${K1}/>`;
  const wasserball = `<circle cx="50" cy="50" r="30" fill="#ffffff" ${K}/>${["#e2402f", "#ffd23a", "#2b5fd9"].map((c, i) => `<path d="M50 50L${50 + 30 * Math.cos(i * 2.1)} ${50 + 30 * Math.sin(i * 2.1)}A30 30 0 0 1 ${50 + 30 * Math.cos(i * 2.1 + 1.05)} ${50 + 30 * Math.sin(i * 2.1 + 1.05)}z" fill="${c}"/>`).join("")}<circle cx="50" cy="50" r="30" fill="none" ${K}/><circle cx="50" cy="50" r="5" fill="#ffffff" ${K1}/>`;
  const wellen = `${[40, 58, 76].map(y => `<path d="M8 ${y}q7-6 14 0t14 0 14 0 14 0 14 0 14 0" fill="none" stroke="#ffffff" stroke-width="3"/>`).join("")}`;
  LASSE.i5_held = IDA5.ida("#f57a1a", "#1d2b4f", "#2d3036", `<path d="M33 66h34M33 72h34" stroke="#e8ff3a" stroke-width="3"/><path d="M50 50v26" stroke="#c45a0a" stroke-width="1.6"/>`,
    `<path d="M26 26q0-22 24-22t24 22z" fill="#d9f02a" stroke="${INK}" stroke-width="2.2"/><path d="M26 26h48" stroke="#c9ccd2" stroke-width="3"/>`);
  LASSE.i5_hundefreundin = IDA5.ida("#ff8fb1", "#4a6fb3", "#ffffff", `<path d="M42 50q8 6 16 0" stroke="#ffffff" stroke-width="3" fill="none"/><g transform="translate(43 58) scale(.14)">${H.RASSEN.blauerHund({ ohneHals: true })}</g>`);
  const HELDEN = [
    szene("Feuerwache", "i5_held", { "--bg": "#fbe6dc", "--bg-2": "#fff8f4", "--floor-a": "#cfc8c2", "--floor-b": "#c7c0ba" }, boden("#cfc8c2", "#c7c0ba"),
      [...HELDEN_FEUER.map(f => f(tF)), () => tF(feuerwehrauto), () => tF(hydrant), () => tF(schlauch), HELDEN_TEAM[0](tF), () => tF(H.HUT.feuerwehr())], tF),
    szene("Polizeiwache", "i5_held", { "--bg": "#e2e8f4", "--bg-2": "#f7f9fd", "--floor-a": "#c9cdd6", "--floor-b": "#c1c5ce" }, boden("#c9cdd6", "#c1c5ce"),
      [...HELDEN_POLIZEI.map(f => f(tP)), () => tP(streifenwagen), () => tP(blaulicht), () => tP(kelle), HELDEN_TEAM[2](tP)], tP),
    szene("Rettungsteam", "i5_held", { "--bg": "#e2f0f6", "--bg-2": "#f6fbfd", "--floor-a": "#cdd5d8", "--floor-b": "#c5cdd0" }, boden("#cdd5d8", "#c5cdd0"),
      [...HELDEN_TEAM.map(f => f(tR)), () => tR(hubschrauber), () => tR(boot), () => tR(radlader), () => tR(kehrwagen), HELDEN_FEUER[0](tR), HELDEN_POLIZEI[0](tR)], tR),
    szene("Garten mit Trampolin", "i5_hundefreundin", { "--bg": "#e6f5d8", "--bg-2": "#f8fcf3", "--floor-a": "#a8db86", "--floor-b": "#9fd47c" }, boden("#a8db86", "#9fd47c"),
      [blauDog(0, tG), blauDog(1, tG), blauDog(2, tG), blauDog(3, tG), () => tG(trampolin), () => tG(schaukel), () => tG(sandkasten), () => tG(knochenSpiel)], tG, () => birdHTML()),
    szene("Spielzimmer", "i5_hundefreundin", { "--bg": "#f3eaf6", "--bg-2": "#fcf9fd", "--floor-a": "#e3c79c", "--floor-b": "#dcbf92" }, boden("#e3c79c", "#dcbf92"),
      [blauDog(0, tZ), blauDog(2, tZ), blauDog(3, tZ), blauDog(4, tZ), () => tZ(sofa), () => tZ(spielkiste), () => tZ(hundekorb), () => tZ(knochenSpiel)], tZ),
    szene("Am Strand", "i5_hundefreundin", { "--bg": "#dff1fb", "--bg-2": "#f5fbff", "--floor-a": "#f2dca8", "--floor-b": "#ecd49c" }, boden("#f2dca8", "#ecd49c"),
      [blauDog(1, tS), blauDog(2, tS), blauDog(3, tS), blauDog(4, tS), () => tS(schirm), () => tS(sandburg), () => tS(muschel), () => tS(wasserball), () => tile("#bfe3f5", "#86bfd9")(wellen)], tS, () => birdHTML())
  ];
  // Hundeknochen in acht Farben, Ziel: Napf
  const knochen = (c) => `<ellipse cx="50" cy="84" rx="30" ry="5" fill="#00000024"/><g transform="rotate(-20 50 54)"><rect x="22" y="47" width="56" height="14" rx="7" fill="${c}" ${K}/>${[[22, 47], [22, 61], [78, 47], [78, 61]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" ${K}/>`).join("")}<rect x="24" y="49" width="52" height="10" fill="${c}"/><path d="M28 50h40" stroke="#ffffff" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>`;
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) => symbol(`i5knochen-${i}`, knochen(c))).join(""));
  THEMES.i5w4 = { title: "Helden", worldName: "Helden", emblem: "i5knochen-1", box: "i5knochen-0", rolls: false, squish: true, boxWord: "Knochen", pushWord: "Schübe",
    hint: "Bring jeden Knochen zu einem Napf. Knochen lassen sich nur schieben, nicht ziehen.",
    winTitle: (l) => l < 3 ? "Einsatz erfüllt!" : "Wuff wuff!", winText: (m, p, l) => `${HELDEN[l].name} geschafft! ${m} Schritte, ${p} Schübe.`, confetti: ["#d8202a", "#2f5cc8", "#ffd200", "#6f86a6"],
    prize: { symbol: "i5knochen-3", title: "Heldenmedaille!", text: (m) => `Welt „Helden“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#fbe6dc", "--bg-2": "#fff8f4", "--floor-a": "#cfc8c2", "--floor-b": "#c7c0ba" },
    target: ziel("#8a5a2b", `<ellipse cx="50" cy="62" rx="26" ry="10" fill="#9aa3b1" opacity=".5"/><ellipse cx="50" cy="58" rx="20" ry="6" fill="#c9cdd6" opacity=".6"/>`),
    scenes: HELDEN, levelScenes: HELDEN, levelName: (l) => HELDEN[l].name, levelNames: ["Feuerwehr", "Polizei", "Rettung", "Garten", "Spielzimmer", "Strand"],
    levelBox: () => "i5knochen-0", boxCycle: () => PL.map((_, i) => `i5knochen-${i}`) };

  // ===================== Welt 5: Brettspiele =====================
  const F = FIG;
  const tH = tile("#f4e4c8", "#c9a06a"), tK = tile("#e2f0e8", "#8fbfa2"), tN = tile("#3a3a62", "#22223e"), tM = tile("#fbe2e2", "#d89a9a");
  const sanduhr = `<path d="M30 14h40M30 86h40" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/><path d="M34 16q0 22 16 34-16 12-16 34h32q0-22-16-34 16-12 16-34z" fill="#dff3ff" fill-opacity=".7" ${K1}/><path d="M40 30q10 10 20 0zM38 82q12-14 24 0z" fill="#e9c98a"/>`;
  const schachtel = `<rect x="12" y="50" width="76" height="34" rx="3" fill="#2b5fd9" ${K}/><rect x="16" y="36" width="70" height="20" rx="3" fill="#e2402f" ${K}/><rect x="20" y="22" width="62" height="18" rx="3" fill="#3fae4a" ${K}/>${[[30, 70, "#ffd23a"], [52, 46, "#ffffff"], [40, 30, "#ffd23a"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}" ${K1}/>`).join("")}`;
  const kegelGruppe = `${[["#e2402f", 4, 30], ["#ffd23a", 34, 24], ["#3fae4a", 30, 46], ["#2b5fd9", 0, 50]].map(([c, x, y]) => `<g transform="translate(${x} ${y}) scale(.5)">${F.poeppel(c)}</g>`).join("")}<g transform="translate(56 40) scale(.4)">${F.wuerfel(3)}</g>`;
  const BRETT = [() => tH(F.brett()), () => tH(F.wuerfel(6)), () => tH(F.wuerfel(3, "#e2402f", "#ffffff")), () => tH(kegelGruppe), () => tH(F.poeppel("#e2402f")), () => tH(schachtel), () => tH(sanduhr), () => tH(F.wuerfel(1, "#2b5fd9", "#ffffff"))];
  const KARTEN = [() => tK(F.fächer()), () => tK(F.stapel()), () => tK(F.karte("#e2402f", 7)), () => tK(F.karte("#2b5fd9", 4, -8)), () => tK(F.karte("#3fae4a", 9, 6)), () => tK(F.karte("#ffd23a", 5, -4)), () => tK(F.joker(-6)), () => tK(F.karte("#e2402f", "+2", 4))];
  const SPUK = [() => tN(F.gespenst({ mund: "huhu" })), () => tN(F.gespenst({ blick: -3 })), () => tN(F.gespenst({ blick: 3, extra: `<path d="M74 66q8-10 4-22" stroke="#c9a032" stroke-width="3" fill="none"/><rect x="72" y="66" width="10" height="12" rx="2" fill="#ffd86a" ${K1}/>` })),
    () => tN(F.spukschloss()), () => tN(F.kerzen()), () => tN(F.bild()), () => tN(F.fledermaus()), () => tN(F.schlüssel())];
  const ZIRKUS = [() => tM(F.klein(F.clown())), () => tM(F.klein(F.dompteur())), () => tM(F.klein(F.jongleur())), () => tM(F.seil()), () => tM(F.turm()), () => tM(F.einrad()), () => tM(F.zelt()), () => tM(F.podest())];
  LASSE.i5_spiel = IDA5.ida("#2b5fd9", "#9a9ea6", "#ffffff", `<g transform="translate(40 54) scale(.2)">${F.wuerfel(5)}</g>`);
  LASSE.i5_spuk = IDA5.ida("#5a4a8a", "#2d3036", "#2d3036", `<path d="M30 54q20 30 40 0l4 24H26z" fill="#2d2a4a" stroke="${INK}" stroke-width="1.6"/>`, `<path d="M28 26q22-30 44 0z" fill="#2d2a4a" stroke="${INK}" stroke-width="2"/><path d="M50 2l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="#ffd86a"/>`);
  LASSE.i5_zirkus = IDA5.ida("#e2402f", "#ffffff", "#2d3036", `<path d="M44 50v26M56 50v26" stroke="#ffd23a" stroke-width="2"/>${[56, 64, 72].map(y => `<circle cx="50" cy="${y}" r="1.8" fill="#ffd23a"/>`).join("")}`, `<rect x="38" y="-2" width="24" height="18" rx="2" fill="#1d1714" stroke="${INK}" stroke-width="1.8"/><rect x="30" y="14" width="40" height="5" rx="2" fill="#1d1714"/><path d="M38 10h24" stroke="#e2402f" stroke-width="3"/>`);
  const SPIELE = [
    szene("Spieleabend", "i5_spiel", { "--bg": "#fbf1dc", "--bg-2": "#fffbf2", "--floor-a": "#e3c79c", "--floor-b": "#dcbf92" }, boden("#e3c79c", "#dcbf92"), BRETT, tH),
    szene("Kartenrunde", "i5_spiel", { "--bg": "#e2f0e8", "--bg-2": "#f6fbf8", "--floor-a": "#3f8a5a", "--floor-b": "#3a8254" }, boden("#3f8a5a", "#3a8254", (x, y) => pick(x, y, 2, 4) === 0 ? `<path d="M20 20l60 60M80 20L20 80" stroke="#ffffff" stroke-width="1" opacity=".08"/>` : ""), KARTEN, tK),
    szene("Wer war es?", "i5_spuk", { "--bg": "#2a2a52", "--bg-2": "#4a3a6a", "--floor-a": "#5a4a6a", "--floor-b": "#54446a", "--on-bg": "#e6dcff", "--on-bg-strong": "#ffffff" }, boden("#5a4a6a", "#54446a", (x, y) => pick(x, y, 2, 6) === 0 ? `<rect x="10" y="10" width="80" height="80" fill="none" stroke="#7a6a8a" stroke-width="2"/>` : ""), SPUK, tN),
    szene("Meeple-Zirkus", "i5_zirkus", { "--bg": "#fde4e4", "--bg-2": "#fff7f7", "--floor-a": "#e9c98a", "--floor-b": "#e2c080" }, boden("#e9c98a", "#e2c080", (x, y) => pick(x, y, 2, 5) === 0 ? `<circle cx="${20 + pick(x, y, 3, 60)}" cy="${20 + pick(x, y, 4, 60)}" r="2" fill="#c9a060"/>` : ""), ZIRKUS, tM, () => birdHTML())
  ];
  const SPIELE_L = [0, 0, 1, 1, 2, 3];
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) => symbol(`i5poeppel-${i}`, F.poeppel(c)) + symbol(`i5karte-${i}`, `<ellipse cx="50" cy="90" rx="26" ry="4" fill="#00000024"/><rect x="24" y="12" width="52" height="76" rx="7" fill="#ffffff" ${K1}/><rect x="28" y="16" width="44" height="68" rx="5" fill="${c}"/><ellipse cx="50" cy="50" rx="15" ry="25" fill="#ffffff" transform="rotate(30 50 50)"/><path d="M50 38l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="${c}"/>`) + symbol(`i5meeple-${i}`, F.meeple(c))).join(""));
  const boxOf = (l) => ["i5poeppel", "i5poeppel", "i5karte", "i5karte", "i5truhe", "i5meeple"][l];
  THEMES.i5w5 = { title: "Brettspiele", worldName: "Brettspiele", emblem: "i5meeple-0", box: "i5poeppel-0", rolls: false, squish: true, boxWord: "Spielsachen", pushWord: "Züge",
    hint: (l) => ["Zieh jeden Pöppel auf ein Spielfeld.", "Zieh jeden Pöppel auf ein Spielfeld.", "Leg jede Karte auf einen Ablagestapel.", "Leg jede Karte auf einen Ablagestapel.", "Schieb jede Truhe in den Zauberkreis. Wer war es?", "Bring jeden Meeple in die Manege."][l] + " Alles lässt sich nur schieben, nicht ziehen.",
    winTitle: (l) => ["Gewonnen!", "Gewonnen!", "Letzte Karte!", "Letzte Karte!", "Huhu, geschafft!", "Manege frei!"][l], winText: (m, p, l) => `${SPIELE[SPIELE_L[l]].name} geschafft! ${m} Schritte, ${p} Züge.`, confetti: PL.slice(0, 4),
    prize: { symbol: "i5meeple-3", title: "Goldener Meeple!", text: (m) => `Welt „Brettspiele“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#fbf1dc", "--bg-2": "#fffbf2", "--floor-a": "#e3c79c", "--floor-b": "#dcbf92" },
    target: (l) => (l === 4 ? ziel("#c9a0ff", `<circle cx="50" cy="52" r="24" fill="none" stroke="#c9a0ff" stroke-width="2"/><path d="M50 30l6 14 15 1-12 9 4 15-13-8-13 8 4-15-12-9 15-1z" fill="#c9a0ff" opacity=".5"/>`)
      : l === 5 ? ziel("#e2402f", `<path d="M50 30l6 14 15 1-12 9 4 15-13-8-13 8 4-15-12-9 15-1z" fill="#ffd23a" opacity=".6"/>`)
      : l >= 2 ? ziel("#ffffff", `<rect x="32" y="26" width="36" height="52" rx="5" fill="#ffffff" opacity=".55" stroke="#ffffff" stroke-width="2" stroke-dasharray="5 4"/>`)
      : ziel("#3a2a1e", `<circle cx="50" cy="52" r="16" fill="#ffffff" opacity=".6"/>`))(),
    scenes: SPIELE, levelScenes: SPIELE_L.map(i => SPIELE[i]), levelName: (l) => SPIELE[SPIELE_L[l]].name, levelNames: ["Klassiker", "Klassiker", "Karten", "Karten", "Wer war es?", "Zirkus"],
    levelBox: (l) => `${boxOf(l)}-0`, boxCycle: (l) => PL.map((_, i) => `${boxOf(l)}-${i}`) };

  // ===================== Welt 6: Prinzessin =====================
  const tR1 = tile("#ffe3f1", "#f2a6c8"), tR2 = tile("#fbe0f4", "#d9a0d2"), tR3 = tile("#f0e6ff", "#c4a8f0");
  const diamant = (c, s = 1, x = 50, y = 52) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -52)"><path d="M26 36l10-14h28l10 14-24 40z" fill="${c}" ${K}/><path d="M26 36h48M36 22l6 14 8-14 8 14 6-14M42 36l8 40 8-40" stroke="#ffffff" stroke-width="1.6" fill="none" opacity=".75"/><path d="M38 28l4 6" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/></g>`;
  const glitzer = (pts) => pts.map(([x, y, r]) => `<path class="twinkle-d" d="M${x} ${y - r}l${r * .25} ${r * .75} ${r * .75} ${r * .25}-${r * .75} ${r * .25}-${r * .25} ${r * .75}-${r * .25}-${r * .75}-${r * .75}-${r * .25} ${r * .75}-${r * .25}z" fill="#ffffff"/>`).join("");
  const krone = (c = "#ffd23a") => `<path d="M18 70V34l16 16 16-24 16 24 16-16v36z" fill="${c}" ${K}/><rect x="16" y="66" width="68" height="10" rx="3" fill="${c}" ${K}/>${[[34, 50, "#ff5fa2"], [50, 26, "#8b5cf6"], [66, 50, "#4fd1c5"]].map(([x, y, g]) => `<circle cx="${x}" cy="${y}" r="5" fill="${g}" ${K1}/>`).join("")}${[30, 50, 70].map(x => `<circle cx="${x}" cy="71" r="3" fill="#ff5fa2"/>`).join("")}<path d="M24 40l4 10" stroke="#ffffff" stroke-width="3" opacity=".6"/>`;
  const tiara = `<ellipse cx="50" cy="74" rx="34" ry="10" fill="#ff8fc8" ${K}/><path d="M22 62q28-40 56 0" fill="none" stroke="#e6e9ef" stroke-width="5"/><path d="M50 26l6 14-6 10-6-10z" fill="#ff5fa2" ${K1}/>${[[32, 46], [68, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#8be0ff" ${K1}/>`).join("")}${glitzer([[80, 30, 6], [22, 28, 4]])}`;
  const schloss = `<path d="M18 88V40h12v-8h6v8h8V22h-4l10-16 10 16h-4v18h8v-8h6v8h12v48z" fill="#ffd6ea" ${K}/>${[[24, 40], [70, 40]].map(([x]) => `<path d="M${x - 8} 34l${8} -18 ${8} 18z" fill="#ff5fa2" ${K}/>`).join("")}<path d="M42 22l8-18 8 18z" fill="#ff5fa2" ${K}/><path d="M50 4V-4" stroke="${INK}" stroke-width="1.6"/><path d="M50 -4l10 3-10 3z" fill="#ffd23a"/>${[[26, 54], [66, 54], [46, 34]].map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="12" rx="4" fill="#bfe3f5" ${K1}/>`).join("")}<path d="M42 88V72q8-10 16 0v16" fill="#c9a0ff" ${K1}/>${glitzer([[84, 20, 5]])}`;
  // Fliegendes Einhorn (Seitenansicht, Flügel, Regenbogenmähne)
  const EINHORN = (o = {}) => {
  const L = `stroke="#7a5478" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  const M = o.mähne || ["#ff8fc8", "#c9a0ff", "#8be0ff", "#ffe08a"];
  const W = "#fffafd", S = "#f1dcea";
  const stern = (x, y, r, c = "#ffd23a") => `<path d="M${x} ${y - r}l${r * .3} ${r * .7} ${r * .7} ${r * .3}-${r * .7} ${r * .3}-${r * .3} ${r * .7}-${r * .3}-${r * .7}-${r * .7}-${r * .3} ${r * .7}-${r * .3}z" fill="${c}"/>`;
  return `<g class="float">
    ${M.map((c, i) => `<path d="M24 ${54 + i * 2}C12 ${52 + i * 6} 8 ${62 + i * 6} 4 ${74 + i * 3}C14 ${72 + i * 3} 20 ${66 + i * 2} 26 ${60 + i}" fill="${c}" stroke="#7a5478" stroke-width=".9"/>`).join("")}
    <path d="M30 64q-6 6-14 6-3 0-2 3 8 2 18-4z" fill="${S}" ${L}/><path d="M38 66q-2 10-10 14-2 2 1 3 10-2 14-14z" fill="${S}" ${L}/>
    <path d="M24 52q2-14 24-14t24 12q2 14-22 18-24 2-26-16z" fill="${W}" ${L}/>
    <path d="M60 64q6 6 14 4 3 0 2 3-8 4-18-1z" fill="${W}" ${L}/><path d="M54 66q4 8 12 10 3 1 1 3-10 0-16-10z" fill="${W}" ${L}/>
    <path d="M14 70l3 2M27 82l3 1M75 70l3 0M67 78l3 1" stroke="#c9a032" stroke-width="3" stroke-linecap="round"/>
    <path d="M60 46q4-14 12-22l12 6q-6 10-10 24z" fill="${W}" ${L}/>
    <path d="M70 22q6-8 16-6 8 2 10 10 2 8-4 10-6 2-10-2-4 2-10-2z" fill="${W}" ${L}/>
    <ellipse cx="91" cy="32" rx="5" ry="4" fill="#ffe3f1"/><circle cx="92.5" cy="31.6" r=".9" fill="#7a5478"/>
    <path d="M76 16l-2-8 7 5z" fill="${W}" ${L}/><path d="M76 13.4l-.8-3 2.4 1.8z" fill="#ffc6dc"/>
    <path d="M80 14l8-14 3 1.6-6 14z" fill="#ffd23a" ${L}/><path d="M82.6 10l4.4-1M84.4 6.4l3.6-.8" stroke="#e2a81a" stroke-width="1.2"/>
    <path d="M80 23q2.4-2.6 5 0" stroke="#7a5478" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M80.4 22l-1.2-1.8M82.4 21l-.2-2.2M84.6 22l1.2-1.8" stroke="#7a5478" stroke-width="1"/>
    <ellipse cx="84" cy="28" rx="3.4" ry="2" fill="#ff8fb1" opacity=".55"/><path d="M90 37q-2 2-4 1" stroke="#7a5478" stroke-width="1.2" fill="none"/>
    ${M.map((c, i) => `<path d="M${74 - i * 2.4} ${15 + i * 3}C${64 - i * 3} ${22 + i * 4} ${60 - i * 2} ${34 + i * 4} ${60 - i * 3} ${46 + i * 3}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join("")}
    <path d="M38 44C30 30 30 14 40 6c0 8 4 12 8 12 2-8 8-10 12-8-4 4-4 10-2 14 6-2 10 0 10 4-8 4-14 12-16 20z" fill="${W}" ${L}/>
    <path d="M42 36q0-14 4-22M48 38q4-10 10-16M54 40q6-8 12-10" stroke="${S}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M36 54q8 6 20 2" stroke="${S}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    ${stern(12, 24, 5)}${stern(96, 58, 3.4, "#ff8fc8")}${stern(50, 88, 4)}</g>`;
};
  const einhornFlug = (m) => EINHORN(m ? { mähne: m } : {});
  const regenbogen = `${["#ff5fa2", "#ff8a1a", "#ffd23a", "#3fae4a", "#2b5fd9", "#8b5cf6"].map((c, i) => `<path d="M${12 + i * 5} 74a${38 - i * 5} ${38 - i * 5} 0 0 1 ${76 - i * 10} 0" stroke="${c}" stroke-width="5" fill="none"/>`).join("")}<circle cx="16" cy="76" r="9" fill="#ffffff" ${K1}/><circle cx="84" cy="76" r="9" fill="#ffffff" ${K1}/>`;
  const thron = `<path d="M26 88V30q0-18 24-18t24 18v58" fill="#ff5fa2" ${K}/><path d="M34 88V36q0-12 16-12t16 12v52" fill="#ffd6ea" ${K1}/><rect x="22" y="58" width="56" height="14" rx="5" fill="#c9a0ff" ${K}/><circle cx="50" cy="18" r="5" fill="#ffd23a" ${K1}/>${krone().replace(/^/, `<g transform="translate(38 30) scale(.24)">`)}</g>`;
  const spiegel = `<ellipse cx="50" cy="44" rx="24" ry="30" fill="#ffd23a" ${K}/><ellipse cx="50" cy="44" rx="18" ry="24" fill="#e6f6ff" ${K1}/><path d="M40 32q6-8 14-8" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M44 74h12l4 12H40z" fill="#ffd23a" ${K1}/>${glitzer([[66, 26, 4]])}`;
  const leuchter = `<path d="M50 4v16" stroke="${INK}" stroke-width="2"/><path d="M18 40q32 20 64 0" fill="none" stroke="#ffd23a" stroke-width="5"/>${[18, 34, 50, 66, 82].map((x, i) => `<path d="M${x} ${40 + (i % 4 ? 8 : 0)}v-10" stroke="#ffd23a" stroke-width="3"/><path class="flame" d="M${x} ${24 + (i % 4 ? 8 : 0)}q4 4 0 8-4-4 0-8z" fill="#ffb02e"/>`).join("")}${[30, 50, 70].map(x => `<path d="M${x} 58l3 8-3 8-3-8z" fill="#bfe3f5" ${K1}/>`).join("")}`;
  const torte = `<rect x="22" y="56" width="56" height="26" rx="4" fill="#ffc6dc" ${K}/><rect x="30" y="36" width="40" height="22" rx="4" fill="#ffe3f1" ${K}/><path d="M22 60q7 6 14 0t14 0 14 0 14 0M30 40q5 5 10 0t10 0 10 0 10 0" fill="none" stroke="#ffffff" stroke-width="3"/>${[40, 50, 60].map(x => `<rect x="${x - 2}" y="22" width="4" height="14" fill="#8be0ff" ${K1}/><path class="flame" d="M${x} 14q4 4 0 8-4-4 0-8z" fill="#ffb02e"/>`).join("")}<circle cx="50" cy="48" r="4" fill="#e2402f"/>`;
  const kutsche = `<path d="M22 66q0-34 28-34t28 34z" fill="#ff8fc8" ${K}/><rect x="40" y="42" width="20" height="16" rx="8" fill="#bfe3f5" ${K1}/><path d="M50 32v-8" stroke="#ffd23a" stroke-width="3"/>${krone().replace(/^/, `<g transform="translate(40 8) scale(.2)">`)}</g><circle cx="30" cy="74" r="10" fill="#ffd23a" ${K1}/><circle cx="70" cy="74" r="10" fill="#ffd23a" ${K1}/><path d="M30 64v20M20 74h20M70 64v20M60 74h20" stroke="#c9a032" stroke-width="2"/>`;
  const herzen = `${[[30, 40, 14, "#ff5fa2"], [64, 34, 10, "#ff8fc8"], [56, 66, 12, "#c9a0ff"]].map(([x, y, r, c]) => `<path class="bob" d="M${x} ${y + r}c-${r * 1.4}-${r}-${r * 1.4}-${r * 2}-${r * .5}-${r * 2}c${r * .3} 0 ${r * .5} ${r * .3} ${r * .5} ${r * .3}s${r * .2}-${r * .3} ${r * .5}-${r * .3}c${r * .9} 0 ${r * .9} ${r}-${r * .5} ${r * 2}z" fill="${c}" ${K1}/>`).join("")}${glitzer([[80, 80, 5], [16, 20, 5]])}`;
  const rosen = `${[[30, 52, "#ff5fa2"], [52, 40, "#ff8fc8"], [70, 56, "#e2402f"]].map(([x, y, c]) => `<path d="M${x} ${y + 10}v24" stroke="#3fae4a" stroke-width="3"/><circle cx="${x}" cy="${y}" r="10" fill="${c}" ${K1}/><path d="M${x - 5} ${y}q5-6 10 0q-5 5-10 0" fill="none" stroke="#ffffff" stroke-width="1.6" opacity=".7"/>`).join("")}<path d="M14 86h72" stroke="#3fae4a" stroke-width="6" stroke-linecap="round"/>`;
  const brunnen = `<ellipse cx="50" cy="72" rx="34" ry="12" fill="#ffd6ea" ${K}/><ellipse cx="50" cy="68" rx="28" ry="8" fill="#8be0ff"/><rect x="45" y="38" width="10" height="30" fill="#ffd6ea" ${K1}/><ellipse cx="50" cy="38" rx="16" ry="5" fill="#ffd6ea" ${K}/><path class="bob" d="M50 32q-10 2-14 14M50 32q10 2 14 14" stroke="#8be0ff" stroke-width="3" fill="none"/><path d="M50 32l-4-10 4 4 4-4z" fill="#ffd23a" ${K1}/>`;
  const wolke = `<g class="float"><circle cx="34" cy="54" r="14" fill="#ffffff" ${K1}/><circle cx="52" cy="44" r="18" fill="#ffffff" ${K1}/><circle cx="70" cy="56" r="12" fill="#ffffff" ${K1}/><rect x="24" y="54" width="54" height="14" rx="7" fill="#ffffff"/>${glitzer([[80, 26, 6], [20, 30, 4]])}</g>`;
  const sterne = `${[[28, 30, 12], [70, 40, 9], [44, 70, 10]].map(([x, y, r]) => `<path class="twinkle-d" d="M${x} ${y - r}l${r * .3} ${r * .7} ${r * .7} ${r * .1}-${r * .55} ${r * .5} ${r * .18} ${r * .75}-${r * .63}-${r * .4}-${r * .63} ${r * .4} ${r * .18}-${r * .75}-${r * .55}-${r * .5} ${r * .7}-${r * .1}z" fill="#ffd23a" ${K1}/>`).join("")}`;
  const PRINZ_GARTEN = [schloss, einhornFlug(), rosen, brunnen, kutsche, regenbogen, herzen, diamant("#ff5fa2", .9)].map(s => () => tR1(s));
  const PRINZ_SAAL = [thron, krone(), tiara, spiegel, leuchter, torte, diamant("#8be0ff", .9), diamant("#c9a0ff", .9)].map(s => () => tR2(s));
  const PRINZ_WOLKE = [einhornFlug(["#8be0ff", "#b9f2c8", "#ffe08a", "#ff8fc8"]), einhornFlug(), wolke, regenbogen, sterne, herzen, schloss, diamant("#ff8fc8", .9), krone("#ffd6ea")].map(s => () => tR3(s));
  LASSE.i5_prinzessin = IDA5.ida("#ff8fc8", "#ff8fc8", "#ffffff", `<path d="M30 66h40l12 16H18z" fill="#ffc6dc" stroke="${INK}" stroke-width="1.8"/><path d="M26 74q24 6 48 0" stroke="#ffffff" stroke-width="2" fill="none"/><path d="M50 54l2 4 4.4.4-3.2 3 1 4.4-4.2-2.2-4.2 2.2 1-4.4-3.2-3 4.4-.4z" fill="#ffffff"/>${[[38, 70], [62, 72], [50, 78]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#ffffff"/>`).join("")}`,
    `<g transform="translate(34 -4) scale(.32)">${krone()}</g>`);
  const rosaBoden = (a, b) => boden(a, b, funkel);
  const PRINZ = [
    szene("Schlossgarten", "i5_prinzessin", { "--bg": "#ffe3f1", "--bg-2": "#fff7fb", "--floor-a": "#ffd0e4", "--floor-b": "#ffc6dc" }, rosaBoden("#ffd0e4", "#ffc6dc"), PRINZ_GARTEN, tR1, () => birdHTML()),
    szene("Thronsaal", "i5_prinzessin", { "--bg": "#fbe0f4", "--bg-2": "#fff6fc", "--floor-a": "#f6d0ee", "--floor-b": "#eec4e6" }, rosaBoden("#f6d0ee", "#eec4e6"), PRINZ_SAAL, tR2),
    szene("Wolkenreich", "i5_prinzessin", { "--bg": "#efe4ff", "--bg-2": "#fbf8ff", "--floor-a": "#f4ecff", "--floor-b": "#ece0ff" }, rosaBoden("#f4ecff", "#ece0ff"), PRINZ_WOLKE, tR3)
  ];
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) => symbol(`i5diamant-${i}`, `<ellipse cx="50" cy="84" rx="26" ry="5" fill="#00000024"/>${diamant(c)}${glitzer([[76, 24, 6]])}`)).join("") + symbol("i5krone", krone()));
  THEMES.i5w6 = { title: "Prinzessin", worldName: "Prinzessin", emblem: "i5krone", box: "i5diamant-0", rolls: false, squish: true, boxWord: "Diamanten", pushWord: "Schübe",
    hint: "Schieb jeden Diamanten auf ein Samtkissen. Diamanten lassen sich nur schieben, nicht ziehen.",
    winTitle: (l) => ["Zauberhaft!", "Bezaubernd!", "Traumhaft!", "Zauberhaft!", "Märchenhaft!", "Prinzessin Ida!"][l], winText: (m, p) => `Alles glitzert! ${m} Schritte, ${p} Schübe.`, confetti: ["#ff5fa2", "#ff8fc8", "#c9a0ff", "#ffd23a"],
    prize: { symbol: "i5krone", title: "Goldene Krone!", text: (m) => `Welt „Prinzessin“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#ffe3f1", "--bg-2": "#fff7fb", "--floor-a": "#ffd0e4", "--floor-b": "#ffc6dc" },
    target: ziel("#ff5fa2", `<rect x="26" y="36" width="48" height="34" rx="12" fill="#c9a0ff" opacity=".55"/><circle cx="26" cy="36" r="3" fill="#ffd23a"/><circle cx="74" cy="36" r="3" fill="#ffd23a"/><circle cx="26" cy="70" r="3" fill="#ffd23a"/><circle cx="74" cy="70" r="3" fill="#ffd23a"/>`),
    scenes: PRINZ, levelScenes: [0, 0, 1, 1, 2, 2].map(i => PRINZ[i]), levelName: (l) => PRINZ[[0, 0, 1, 1, 2, 2][l]].name,
    levelBox: () => "i5diamant-0", boxCycle: () => PL.map((_, i) => `i5diamant-${i}`) };
}
