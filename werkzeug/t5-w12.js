// ---------- Idas Welt, Welt 1 „Warnowblick“ und Welt 2 „Bützow“ (Zeichenstil von Lasses Welt) ----------
// Welt 1: an der Warnow, im Park, im Garten mit Rehen (je zwei Level). Geschoben werden Blumentöpfe auf Beete.
// Welt 2: Level 1–3 Bützower Altstadt (Stiftskirche, Rathaus, Krummes Haus und Schloss), Backsteine auf Bauplätze;
//         Level 4–6 Schulkind in Bützow (Klassenzimmer, Schulhof, Schulweg), Schulranzen an die Haken.
{
  const K = `stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`, K1 = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (top, side) => (inner) => () => svgT(`${pad(top, side)}${inner}`);
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const baum = (x, y, s = 1, c = "#5fb04a") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-3 30V4h6v26z" fill="#8a5a2b" ${K1}/><circle cx="0" cy="-6" r="16" fill="${c}" ${K}/><circle cx="-6" cy="-12" r="5" fill="#ffffff" opacity=".25"/></g>`;
  const welle = (y, c = "#ffffff") => `<path d="M8 ${y}q7-5 14 0t14 0 14 0 14 0 14 0 14 0" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;

  // ===== Welt 1: Warnowblick =====
  const pW = P("#bfe3f5", "#86bfd9"), pG = P("#cdebb0", "#8fbf6a"), pB = P("#f3e7cf", "#cfb68a");
  const ufer = [
    pW(`${welle(40)}${welle(60)}${welle(78, "#e8f6ff")}<path d="M14 88V52M20 88V44M26 88V56" stroke="#5f9a3a" stroke-width="3"/><ellipse cx="20" cy="40" rx="3" ry="7" fill="#8a5a2b"/>`),
    pW(`${welle(76)}<g class="bob"><ellipse cx="52" cy="62" rx="22" ry="12" fill="#ffffff" ${K}/><path d="M64 58q8-24-4-30-10-2-10 8 0 6 6 8" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M64 58q8-24-4-30-10-2-10 8 0 6 6 8" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/><path d="M50 36l-8 3 8 2z" fill="#ff8a1a" ${K1}/><circle cx="56" cy="32" r="1.8" fill="${INK}"/><path d="M38 58q10-6 18 2" fill="none" stroke="#dfe7ee" stroke-width="3"/></g>`),
    pW(`${welle(76)}<g class="bob"><ellipse cx="50" cy="60" rx="18" ry="10" fill="#8a6a3c" ${K}/><path d="M40 56q8-6 16 0" stroke="#5a3a1a" stroke-width="2" fill="none"/><circle cx="58" cy="46" r="9" fill="#2f8a3a" ${K}/><path d="M50 52l-8 2 8 2z" fill="#ffd23a" ${K1}/><circle cx="58" cy="44" r="1.8" fill="#ffffff"/></g>`),
    pW(`${welle(80)}<g class="bob"><path d="M14 58h72l-10 12H24z" fill="#e2402f" ${K}/><path d="M20 58q30-6 60 0" fill="none" stroke="#ffffff" stroke-width="2"/><path d="M30 30l40 40" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><ellipse cx="72" cy="72" rx="5" ry="8" fill="#8a5a2b" transform="rotate(-45 72 72)"/></g>`),
    pB(`<path d="M8 66q42-30 84 0" fill="none" stroke="#8a5a2b" stroke-width="10"/><path d="M8 66q42-30 84 0" fill="none" stroke="#c9935a" stroke-width="6"/>${[20, 35, 50, 65, 80].map(x => `<path d="M${x} ${66 - Math.sin((x - 8) / 84 * Math.PI) * 22}v-14" stroke="#8a5a2b" stroke-width="3"/>`).join("")}<path d="M10 54q40-30 80 0" fill="none" stroke="#8a5a2b" stroke-width="3"/>${welle(84, "#86bfd9")}`),
    pB(`${[20, 34, 48, 62, 76].map(x => `<rect x="${x - 6}" y="30" width="12" height="44" rx="2" fill="#c9935a" ${K1}/>`).join("")}<path d="M14 80v8M86 80v8" stroke="#8a5a2b" stroke-width="5"/><circle cx="80" cy="24" r="6" fill="#ffffff" ${K1}/><path d="M74 24h12M80 18v12" stroke="#e2402f" stroke-width="2"/>`),
    pW(`${welle(80)}${[18, 30, 44, 60, 74, 84].map((x, i) => `<path d="M${x} 88V${30 + (i % 3) * 8}" stroke="#4f8a32" stroke-width="3"/><ellipse cx="${x}" cy="${36 + (i % 3) * 8}" rx="3.4" ry="8" fill="#8a5a2b" ${K1}/>`).join("")}`)
  ];
  const park = [
    pG(`${baum(50, 50, 1.6)}`),
    pG(`${baum(50, 52, 1.5, "#3f8a3a")}${[[40, 34], [60, 30], [52, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#c9631f" ${K1}/>`).join("")}`),
    pB(`<rect x="14" y="40" width="72" height="8" rx="3" fill="#c9935a" ${K}/><rect x="14" y="52" width="72" height="8" rx="3" fill="#c9935a" ${K}/><path d="M22 60v20M78 60v20M22 40V32M78 40V32" stroke="#4a4a52" stroke-width="5" stroke-linecap="round"/><rect x="14" y="26" width="72" height="8" rx="3" fill="#c9935a" ${K}/>`),
    pG(`<path d="M50 88V30" stroke="#2d3036" stroke-width="5"/><path d="M38 30h24l-4-12H42z" fill="#2d3036" ${K1}/><path d="M42 30h16v10H42z" fill="#fff4b0" ${K1}/><rect x="42" y="82" width="16" height="6" rx="2" fill="#2d3036"/>`),
    pB(`<ellipse cx="50" cy="70" rx="34" ry="12" fill="#a9b1bd" ${K}/><ellipse cx="50" cy="66" rx="28" ry="8" fill="#86c8ef"/><path d="M50 64V38" stroke="#a9b1bd" stroke-width="7"/><path class="bob" d="M50 34q-12 4-16 22M50 34q12 4 16 22M50 30v-10" stroke="#86c8ef" stroke-width="3.4" fill="none" stroke-linecap="round"/>`),
    pG(`<path d="M50 88V40" stroke="#8a5a2b" stroke-width="5"/><path d="M50 40l-24 8 24 8M50 52l24 8-24 8" fill="#ffd23a" ${K}/><circle cx="50" cy="34" r="5" fill="#8a5a2b" ${K1}/>`),
    pG(`<rect x="32" y="40" width="36" height="28" rx="3" fill="#c9935a" ${K}/><path d="M28 42L50 22l22 20z" fill="#e2402f" ${K}/><circle cx="50" cy="54" r="6" fill="${INK}"/><path d="M50 68v20" stroke="#8a5a2b" stroke-width="5"/><g class="bob"><circle cx="70" cy="30" r="5" fill="#2b5fd9" ${K1}/><path d="M74 30l5 1-5 2z" fill="#ffd23a"/></g>`),
    pB(`<path d="M24 70h40l6-24H30z" fill="#7ab8ff" ${K}/><path d="M30 46q10-16 26-8" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="30" cy="78" r="7" fill="#4a4a52" ${K1}/><circle cx="62" cy="78" r="7" fill="#4a4a52" ${K1}/><path d="M66 46l12-12" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
  ];
  const garten = [
    pG(`<g class="bob"><path d="M36 86V62M44 86V64M60 86V62M68 86V64" stroke="#a8652a" stroke-width="5" stroke-linecap="round"/><ellipse cx="52" cy="58" rx="22" ry="12" fill="#c9843f" ${K}/><path d="M30 54q-4-16 4-24l8 4q0 10-4 22z" fill="#c9843f" ${K}/><ellipse cx="34" cy="30" rx="9" ry="7" fill="#c9843f" ${K}/><path d="M30 24l-4-10 6 4M38 24l2-10-6 6" fill="#c9843f" ${K1}/><circle cx="32" cy="29" r="1.8" fill="${INK}"/><circle cx="26" cy="32" r="2" fill="${INK}"/>${[[48, 54], [58, 52], [66, 58], [54, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#ffffff"/>`).join("")}</g>`),
    pG(`<g class="bob"><path d="M44 86V64M56 86V66" stroke="#a8652a" stroke-width="4" stroke-linecap="round"/><ellipse cx="50" cy="60" rx="14" ry="9" fill="#d99a55" ${K}/><path d="M38 56q-4-12 2-18l6 3q0 8-3 15z" fill="#d99a55" ${K}/><ellipse cx="41" cy="38" rx="7" ry="5.4" fill="#d99a55" ${K}/><circle cx="39" cy="37" r="1.6" fill="${INK}"/>${[[46, 56], [54, 58], [50, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#ffffff"/>`).join("")}</g>${flower(76, 70, "#ffffff", 4)}`),
    pB(`<rect x="12" y="56" width="76" height="26" rx="6" fill="#8a5a2b" ${K}/>${[[24, 50, "#ff5fa2"], [40, 44, "#ffd23a"], [56, 50, "#8b5cf6"], [72, 44, "#e2402f"]].map(([x, y, c]) => `<path d="M${x} 60V${y + 6}" stroke="#3fae4a" stroke-width="3"/>${flower(x, y, c, 6)}`).join("")}`),
    pG(`<path d="M50 88V40" stroke="#3fae4a" stroke-width="5"/><path d="M50 62q-14-4-16 6 12 2 16-6zM50 54q14-4 16 6-12 2-16-6z" fill="#3fae4a" ${K1}/>${Array.from({ length: 12 }, (_, i) => `<ellipse cx="50" cy="16" rx="5" ry="11" fill="#ffd23a" ${K1} transform="rotate(${i * 30} 50 30)"/>`).join("")}<circle cx="50" cy="30" r="10" fill="#8a5a2b" ${K}/>`),
    pG(`${baum(50, 50, 1.6, "#4faa45")}${[[38, 36], [60, 32], [54, 50], [40, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#e2402f" ${K1}/>`).join("")}`),
    pG(`${[18, 38, 58, 78].map(x => `<path d="M${x - 7} 84V36l7-8 7 8v48z" fill="#ffffff" ${K}/>`).join("")}<rect x="8" y="46" width="84" height="7" rx="3" fill="#ffffff" ${K}/><rect x="8" y="66" width="84" height="7" rx="3" fill="#ffffff" ${K}/>`),
    pG(`<g class="bob"><path d="M28 66q0-22 24-22 22 0 24 22z" fill="#7a5a3a" ${K}/>${Array.from({ length: 9 }, (_, i) => `<path d="M${32 + i * 5} ${50 - (i % 2) * 3}l-2-10" stroke="${INK}" stroke-width="2"/>`).join("")}<path d="M74 62q8 2 8 6-6 2-10 0z" fill="#e8c9a2" ${K1}/><circle cx="76" cy="62" r="1.6" fill="${INK}"/><circle cx="82" cy="66" r="1.6" fill="${INK}"/></g>`),
    pB(`${[[34, 58, "#e2402f", 14], [62, 64, "#e2402f", 11], [48, 74, "#c9843f", 8]].map(([x, y, c, r]) => `<path d="M${x - 3} ${y + 14}V${y}h6v${14}z" fill="#fff4e0" ${K1}/><path d="M${x - r} ${y}q${r}-${r * 1.4} ${r * 2} 0z" fill="${c}" ${K}/>${c === "#e2402f" ? `<circle cx="${x - r / 3}" cy="${y - r / 2}" r="2" fill="#fff"/><circle cx="${x + r / 3}" cy="${y - r / 3}" r="1.6" fill="#fff"/>` : ""}`).join("")}`),
    pB(`<path d="M24 50h40v30H24z" fill="#3fae4a" ${K}/><path d="M64 56l18-14" stroke="#3fae4a" stroke-width="6" stroke-linecap="round"/><ellipse cx="84" cy="40" rx="5" ry="3" fill="#3fae4a" ${K1}/><path d="M24 56q-10 0-10-10 0-8 10-8" fill="none" stroke="${INK}" stroke-width="3"/>${[84, 88, 80].map((x, i) => `<path d="M${x} ${46 + i * 4}l2 6" stroke="#7ab8ff" stroke-width="2"/>`).join("")}`)
  ];
  // Blumentöpfe mit Blumen in acht Farben, Ziel: Beet mit Herz
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) =>
    `<symbol id="i5topf-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/><path d="M50 52V30M50 44q-10-6-14 0 8 4 14 0z" stroke="#3fae4a" stroke-width="3.4" fill="#3fae4a"/>${flower(50, 26, c, 9)}<path d="M28 52h44l-6 36H34z" fill="#c9733a" ${K}/><rect x="25" y="48" width="50" height="9" rx="3" fill="#d9844a" ${K}/></symbol>` +
    `<symbol id="i5ziegel-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="88" rx="36" ry="5" fill="#00000024"/><path d="M14 40l14-12h60L74 40z" fill="color-mix(in srgb, ${c} 70%, #fff)" ${K}/><path d="M88 28v34L74 76V40z" fill="color-mix(in srgb, ${c} 70%, #000)" ${K}/><rect x="14" y="40" width="60" height="36" rx="2" fill="${c}" ${K}/><path d="M14 58h60M34 40v18M54 58v18" stroke="#00000033" stroke-width="2.4"/></symbol>` +
    `<symbol id="i5ranzen-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="28" ry="5" fill="#00000024"/><path d="M38 24q12-14 24 0" fill="none" stroke="${INK}" stroke-width="5"/><rect x="22" y="22" width="56" height="64" rx="12" fill="${c}" ${K}/><path d="M22 46q28 10 56 0" fill="color-mix(in srgb, ${c} 75%, #000)" ${K}/><rect x="42" y="50" width="16" height="9" rx="3" fill="#e9eaee" ${K1}/><rect x="28" y="64" width="44" height="14" rx="4" fill="color-mix(in srgb, ${c} 75%, #fff)" ${K1}/><circle cx="34" cy="71" r="3" fill="#ffd23a" ${K1}/></symbol>`).join(""));
  const zielBeet = () => `<svg viewBox="0 0 100 100"><rect class="glow" x="10" y="12" width="80" height="78" rx="16" fill="#fff3b0"/><rect x="10" y="12" width="80" height="78" rx="16" fill="#8a5a2b" opacity=".35"/><rect x="10" y="12" width="80" height="78" rx="16" fill="none" stroke="#5a3a1a" stroke-width="4" stroke-dasharray="9 7"/><path d="M50 70C34 58 34 42 43 41c3 0 5 2 7 5 2-3 4-5 7-5 9 1 9 17-7 29z" fill="#ff8fb1" opacity=".8"/><g class="fx" fill="#ffd23a"><path d="M12 8l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/><path d="M86 4l2.5 5.5 6 .8-4.3 4 1 6-5.2-3-5.2 3 1-6-4.3-4 6-.8z"/></g></svg>`;
  const zielPlatz = (c) => () => `<svg viewBox="0 0 100 100"><rect class="glow" x="10" y="12" width="80" height="78" rx="12" fill="#fff3b0"/><rect x="10" y="12" width="80" height="78" rx="12" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="10 7"/><path d="M50 30l6 13 14 1-11 9 4 14-13-8-13 8 4-14-11-9 14-1z" fill="${c}" opacity=".3"/><g class="fx" fill="#ffd23a"><path d="M12 8l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/><path d="M86 4l2.5 5.5 6 .8-4.3 4 1 6-5.2-3-5.2 3 1-6-4.3-4 6-.8z"/></g></svg>`;

  // Ida: Gummistiefel und Regenjacke an der Warnow, Sommerkleid im Park, Gartenschürze im Garten
  Object.assign(LASSE, {
    i5_warnow: IDA5.ida("#ffd23a", "#4a6fb3", "#2b5fd9", `<path d="M50 50v26" stroke="${INK}" stroke-width="1.6"/><circle cx="45" cy="60" r="1.6" fill="${INK}"/><circle cx="45" cy="68" r="1.6" fill="${INK}"/>`),
    i5_park: IDA5.ida("#9fd8ff", "#9fd8ff", "#ffffff", `<path d="M33 70h34l6 10H27z" fill="#9fd8ff" stroke="${INK}" stroke-width="1.8"/>${flower(42, 62, "#ffffff", 3)}${flower(58, 66, "#ff8fb1", 3)}`),
    i5_garten: IDA5.ida("#f2c4d0", "#9a9ea6", "#3fae4a", `<path d="M38 58h24v18H38z" fill="#3fae4a" stroke="${INK}" stroke-width="1.6"/><path d="M38 58l-4-8M62 58l4-8" stroke="#3fae4a" stroke-width="3"/>${flower(50, 66, "#ffd23a", 3)}`),
    i5_stadt: IDA5.ida("#f2c4d0", "#9a9ea6", "#ffffff", `<path d="M42 50q8 6 16 0" stroke="#9a9ea6" stroke-width="3" fill="none"/><path d="M40 54l-6 22M60 54l6 22" stroke="#6e0f4c" stroke-width="3"/>`),
    // Schulkind: Schulranzen auf dem Rücken (Träger vorn), Ranzen hinter der Schulter sichtbar
    i5_schule: IDA5.ida("#c9b8f0", "#4a6fb3", "#ff5fa2", `<path d="M38 50v26M62 50v26" stroke="#ff5fa2" stroke-width="4.4"/><rect x="66" y="48" width="14" height="24" rx="4" fill="#ff5fa2" stroke="${INK}" stroke-width="1.8"/>`)
  });

  const wiese = (a, b) => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/>${pick(x, y, 1, 5) === 0 ? flower(30 + pick(x, y, 2, 40), 30 + pick(x, y, 3, 40), ["#ffffff", "#ffd23a", "#ff8fb1"][pick(x, y, 4, 3)], 3.4) : ""}`);
  const kies = (a, b) => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/>${[[20, 30], [60, 20], [40, 70], [80, 60]].map(([cx, cy], i) => pick(x, y, 5 + i, 3) === 0 ? `<circle cx="${cx}" cy="${cy}" r="2.4" fill="#00000018"/>` : "").join("")}`);
  const wo = (tile) => () => IDA5.onkel(tile);
  const szene = (name, lasse, pal, floor, decor, tile, extras = () => "") => ({ name, lasse, pal, floor, i5own: true,
    wall: feierWalls(decor, wo(tile)), deco: () => "", extras });
  const warnow = [
    szene("An der Warnow", "i5_warnow", { "--bg": "#dff1fb", "--bg-2": "#f4fbff", "--floor-a": "#e9dcb8", "--floor-b": "#e3d4ac" }, kies("#e9dcb8", "#e3d4ac"), ufer, (i) => svgT(`${pad("#e8f6ff", "#86bfd9")}${i}`), () => birdHTML()),
    szene("Im Park", "i5_park", { "--bg": "#e6f5d8", "--bg-2": "#f8fcf3", "--floor-a": "#e7dcc6", "--floor-b": "#e0d3b9" }, kies("#e7dcc6", "#e0d3b9"), park, (i) => svgT(`${pad("#eef8e2", "#8fbf6a")}${i}`), () => birdHTML()),
    szene("Garten mit Rehen", "i5_garten", { "--bg": "#eef7e2", "--bg-2": "#fbfdf6", "--floor-a": "#a8db86", "--floor-b": "#9fd47c" }, wiese("#a8db86", "#9fd47c"), garten, (i) => svgT(`${pad("#eef8e2", "#8fbf6a")}${i}`), () => birdHTML())
  ];
  THEMES.i5w1 = { title: "Warnowblick", worldName: "Warnowblick", emblem: "i5topf-6", box: "i5topf-0", rolls: false, squish: true, boxWord: "Blumentöpfe", pushWord: "Schübe",
    hint: "Schieb jeden Blumentopf auf ein Beet. Töpfe lassen sich nur schieben, nicht ziehen.",
    winTitle: "Wunderschön!", winText: (m, p) => `Alles blüht an der Warnow! ${m} Schritte, ${p} Schübe.`, confetti: ["#ff8fb1", "#ffd23a", "#3fae4a", "#86bfd9"],
    prize: { symbol: "i5preis", title: "Goldener Stern!", text: (m) => `Welt „Warnowblick“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#dff1fb", "--bg-2": "#f4fbff", "--floor-a": "#e9dcb8", "--floor-b": "#e3d4ac" }, target: zielBeet,
    scenes: warnow, levelScenes: [0, 0, 1, 1, 2, 2].map(i => warnow[i]), levelName: (l) => warnow[[0, 0, 1, 1, 2, 2][l]].name,
    levelBox: () => "i5topf-0", boxCycle: () => PL.map((_, i) => `i5topf-${i}`) };

  // ===== Welt 2: Bützow =====
  const pZ = P("#f2d8c8", "#c98a6a"), pS = P("#e9e4ec", "#b9aec2"), pT = P("#e3f1f7", "#9cc2d6");
  const backstein = (x, y, w, h, c = "#b5533c") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${K}/>${Array.from({ length: Math.floor(h / 6) }, (_, i) => `<path d="M${x} ${y + 6 + i * 6}h${w}" stroke="#00000022" stroke-width="1.2"/>`).join("")}`;
  const spitz = (x, w, top, base, c) => `<path d="M${x} ${base}L${x + w / 2} ${top}L${x + w} ${base}z" fill="${c}" ${K}/>`;
  const gotik = (x, y, w, h, c = "#86c8ef") => `<path d="M${x} ${y + h}V${y + w / 2}q0-${w / 2} ${w / 2}-${w / 2 + 4}q${w / 2} ${4} ${w / 2} ${w / 2 + 4}V${y + h}z" fill="${c}" ${K1}/><path d="M${x + w / 2} ${y}v${h}" stroke="${INK}" stroke-width="1.2"/>`;
  const altstadt = [
    // Stiftskirche: Backsteinturm mit grüner Spitze
    pZ(`${backstein(36, 34, 28, 52)}${spitz(34, 32, 4, 36, "#5fae8f")}${gotik(44, 46, 12, 18)}<circle cx="50" cy="74" r="5" fill="#ffd23a" ${K1}/>`),
    // Kirchenschiff mit gotischen Fenstern
    pZ(`${backstein(12, 40, 76, 46)}<path d="M8 42L50 18l42 24z" fill="#6b4a3a" ${K}/>${[20, 42, 64].map(x => gotik(x, 50, 14, 26)).join("")}`),
    // Sonnenuhr an der Kirchenwand
    pZ(`${backstein(14, 14, 72, 72, "#c46a4e")}<circle cx="50" cy="50" r="26" fill="#f4e9d8" ${K}/>${Array.from({ length: 9 }, (_, i) => `<path d="M50 50L${50 + 24 * Math.cos(Math.PI * (i / 8))} ${50 + 24 * Math.sin(Math.PI * (i / 8))}" stroke="${INK}" stroke-width="1.2"/>`).join("")}<path d="M50 50l18 10" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/><circle cx="50" cy="38" r="5" fill="#ffd23a" ${K1}/>`),
    // Orgelpfeifen
    pS(`<rect x="14" y="60" width="72" height="26" rx="3" fill="#8a5a2b" ${K}/>${[18, 26, 34, 42, 50, 58, 66, 74].map((x, i) => `<rect x="${x}" y="${20 + Math.abs(i - 3.5) * 6}" width="7" height="${42 - Math.abs(i - 3.5) * 6}" rx="2" fill="#d9dde3" ${K1}/>`).join("")}<path d="M14 60h72" stroke="#ffd23a" stroke-width="3"/>`),
    // Rathaus im Tudorgotik-Stil: Zinnen und Ecktürmchen
    pS(`${backstein(20, 36, 60, 50, "#d9a066")}${[20, 74].map(x => `${backstein(x - 4, 22, 14, 64, "#c98a4a")}<path d="M${x - 4} 22v-6h4v4h6v-4h4v6z" fill="#c98a4a" ${K1}/>`).join("")}<path d="M24 36v-6h6v4h8v-4h6v4h8v-4h6v4h8v-4h6v6" fill="none" stroke="${INK}" stroke-width="2"/>${[30, 46, 62].map(x => gotik(x, 46, 10, 16, "#ffe9a8")).join("")}<path d="M44 86V72q6-8 12 0v14" fill="#8a5a2b" ${K1}/>`),
    // Markt mit Brunnen
    pS(`<ellipse cx="50" cy="72" rx="32" ry="12" fill="#a9b1bd" ${K}/><ellipse cx="50" cy="68" rx="26" ry="8" fill="#86c8ef"/><rect x="45" y="36" width="10" height="32" fill="#a9b1bd" ${K1}/><ellipse cx="50" cy="36" rx="14" ry="5" fill="#a9b1bd" ${K}/><path class="bob" d="M50 30q-10 2-12 14M50 30q10 2 12 14" stroke="#86c8ef" stroke-width="3" fill="none"/>`),
    // Krummes Haus: schiefes Fachwerkhaus
    pS(`<g transform="rotate(-6 50 86)"><path d="M18 86V40h64v46z" fill="#f4ead2" ${K}/><path d="M18 40h64M18 62h64M40 40v46M62 40v46M18 40l22 22M62 62l20-22" stroke="#6b4a3a" stroke-width="3.4"/><path d="M12 42L50 12l38 30z" fill="#b5533c" ${K}/>${[[24, 46], [46, 46], [68, 46], [24, 68], [68, 68]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="10" fill="#86c8ef" ${K1}/>`).join("")}<rect x="44" y="68" width="12" height="18" fill="#8a5a2b" ${K1}/></g>`),
    // Schloss mit Turm
    pT(`${backstein(14, 46, 54, 40, "#e6d3b0")}${backstein(62, 26, 24, 60, "#d9c29a")}<path d="M60 28L74 8l14 20z" fill="#5fae8f" ${K}/>${[22, 38, 54].map(x => `<rect x="${x}" y="56" width="9" height="13" rx="4" fill="#86c8ef" ${K1}/>`).join("")}<rect x="69" y="40" width="9" height="13" rx="4" fill="#86c8ef" ${K1}/><path d="M12 48L40 30l30 18" fill="#b5533c" ${K}/>`),
    // Fachwerkhaus
    pS(`<path d="M20 86V42h60v44z" fill="#ffffff" ${K}/><path d="M20 42h60M20 64h60M35 42v44M65 42v44M20 64l15-22M65 42l15 22" stroke="#6b4a3a" stroke-width="3.4"/><path d="M14 44L50 16l36 28z" fill="#c46a4e" ${K}/><rect x="42" y="66" width="16" height="20" fill="#2f8a3a" ${K1}/>`),
    // Miniaturstadt: kleine Häuser auf einer Platte
    pT(`<rect x="10" y="62" width="80" height="20" rx="4" fill="#9fd47c" ${K}/>${[[20, "#e2402f"], [40, "#ffd23a"], [60, "#2b5fd9"]].map(([x, c]) => `<rect x="${x}" y="50" width="14" height="14" fill="#f4ead2" ${K1}/><path d="M${x - 2} 50l9-9 9 9z" fill="${c}" ${K1}/>`).join("")}${backstein(76, 36, 8, 28)}<path d="M74 36l6-12 6 12z" fill="#5fae8f" ${K1}/>`),
    // Denkmal: Figur auf dem Sockel mit Blumen
    pS(`<rect x="34" y="62" width="32" height="24" rx="2" fill="#c9c4bc" ${K}/><rect x="30" y="58" width="40" height="6" rx="2" fill="#b0aaa0" ${K1}/><path d="M42 58V40h16v18z" fill="#8fae9a" ${K}/><circle cx="50" cy="32" r="8" fill="#8fae9a" ${K}/><path d="M58 44l10-10" stroke="#8fae9a" stroke-width="5" stroke-linecap="round"/>${flower(28, 80, "#ff5fa2", 4)}${flower(72, 80, "#ffd23a", 4)}`),
    // Bützower See mit Boot
    pT(`<rect x="10" y="46" width="80" height="40" rx="8" fill="#86c8ef" ${K}/>${welle(60)}${welle(74)}<g class="bob"><path d="M30 52h40l-6 8H36z" fill="#ffffff" ${K}/><path d="M50 52V26l16 22z" fill="#ff8fb1" ${K}/></g><path d="M14 46V34M20 46V30" stroke="#5f9a3a" stroke-width="3"/>`)
  ];
  const tafel = (inner) => `<rect x="10" y="18" width="80" height="54" rx="4" fill="#2f5a46" stroke="#8a5a2b" stroke-width="5"/>${inner}<rect x="30" y="72" width="40" height="5" fill="#8a5a2b"/>`;
  const klasse = [
    pB(tafel(`<path d="M22 34a8 8 0 1 0 0.1 0" fill="none" stroke="#ffffff" stroke-width="2.4"/><path d="M38 28l8 16 8-16M60 28v16h10" fill="none" stroke="#ffffff" stroke-width="2.4"/><path d="M22 56q14-8 28 0t28 0" fill="none" stroke="#ffd23a" stroke-width="2.4"/>`)),
    pB(tafel(`<circle cx="30" cy="38" r="8" fill="none" stroke="#ffd23a" stroke-width="2.4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${30 + 11 * Math.cos(i * Math.PI / 4)} ${38 + 11 * Math.sin(i * Math.PI / 4)}l${4 * Math.cos(i * Math.PI / 4)} ${4 * Math.sin(i * Math.PI / 4)}" stroke="#ffd23a" stroke-width="2"/>`).join("")}<path d="M52 60V44l10-8 10 8v16z" fill="none" stroke="#ffffff" stroke-width="2.4"/>`)),
    pB(`<circle cx="50" cy="44" r="24" fill="#86c8ef" ${K}/><path d="M36 34q8-6 12 2-4 8 2 12-8 4-14-2zM56 50q8-4 10 4-6 6-12 2z" fill="#5fae4a"/><path d="M50 68v12M36 84h28" stroke="#8a5a2b" stroke-width="5"/><path d="M50 18v52" stroke="#8a5a2b" stroke-width="2" fill="none"/>`),
    pB(`<rect x="16" y="16" width="68" height="70" rx="3" fill="#c9935a" ${K}/>${[38, 60].map(y => `<path d="M16 ${y}h68" stroke="${INK}" stroke-width="2.4"/>`).join("")}${[[20, 22, "#e2402f"], [28, 24, "#2b5fd9"], [36, 20, "#3fae4a"], [46, 24, "#ffd23a"], [22, 44, "#8b5cf6"], [30, 42, "#ff8a1a"], [40, 46, "#ff5fa2"], [56, 44, "#4fd1c5"], [24, 66, "#ffd23a"], [34, 64, "#e2402f"], [44, 66, "#2b5fd9"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="7" height="${(y < 38 ? 38 : y < 60 ? 60 : 84) - y}" fill="${c}" ${K1}/>`).join("")}`),
    pB(`<circle cx="50" cy="48" r="28" fill="#ffffff" ${K}/>${Array.from({ length: 12 }, (_, i) => `<path d="M${50 + 23 * Math.cos(i * Math.PI / 6)} ${48 + 23 * Math.sin(i * Math.PI / 6)}l${3 * Math.cos(i * Math.PI / 6)} ${3 * Math.sin(i * Math.PI / 6)}" stroke="${INK}" stroke-width="2"/>`).join("")}<path d="M50 48V30M50 48l12 6" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`),
    pB(`${PL.slice(0, 6).map((c, i) => `<g transform="rotate(${-20 + i * 8} 50 86)"><rect x="${30 + i * 7}" y="22" width="6" height="60" fill="${c}" ${K1}/><path d="M${30 + i * 7} 22l3-8 3 8z" fill="#f2d3a8" ${K1}/></g>`).join("")}<path d="M24 86h52l-4-18H28z" fill="#e9eaee" ${K}/>`),
    pB(`<rect x="22" y="20" width="56" height="64" rx="4" fill="#ffffff" ${K}/>${[34, 46, 58, 70].map(y => `<path d="M30 ${y}h40" stroke="#9fd8ff" stroke-width="2"/>`).join("")}<path d="M30 28h28" stroke="#e2402f" stroke-width="3"/><path d="M60 64l14-26 6 4-12 26z" fill="#ffd23a" ${K1}/>`),
    pB(`<rect x="18" y="56" width="64" height="8" rx="2" fill="#c9935a" ${K}/><path d="M24 64v22M76 64v22" stroke="#a9b1bd" stroke-width="5"/><rect x="30" y="40" width="22" height="16" rx="2" fill="#86c8ef" ${K1}/><path d="M60 56V40l10-4v20" fill="#ff8fb1" ${K1}/>`)
  ];
  const hof = [
    pG(`<path d="M20 88V30h60v58" fill="none" stroke="#e2402f" stroke-width="5"/><path d="M20 30h60M20 50h60M20 70h60" stroke="#2b5fd9" stroke-width="4"/><path d="M50 30v58" stroke="#ffd23a" stroke-width="4"/>`),
    pG(`<path d="M24 88L36 24h28l12 64" fill="none" stroke="#8a5a2b" stroke-width="5"/><path d="M36 24h28" stroke="#8a5a2b" stroke-width="6"/><path d="M42 26v40M58 26v40" stroke="${INK}" stroke-width="1.6"/><rect x="38" y="64" width="24" height="6" rx="2" fill="#e2402f" ${K1}/>`),
    pG(`<rect x="14" y="44" width="72" height="20" rx="3" fill="#2b8a5a" ${K}/><path d="M50 44v20M14 54h72" stroke="#ffffff" stroke-width="2"/><path d="M24 64v20M76 64v20" stroke="#4a4a52" stroke-width="5"/><circle cx="36" cy="38" r="4" fill="#ffffff" ${K1}/>`),
    pG(`<path d="M70 88V22" stroke="#4a4a52" stroke-width="6"/><rect x="48" y="18" width="34" height="22" rx="2" fill="#ffffff" ${K}/><ellipse cx="56" cy="44" rx="10" ry="3" fill="none" stroke="#e2402f" stroke-width="3"/><path d="M47 44l4 12M65 44l-4 12M52 44l2 12M60 44l-2 12" stroke="#ffffff" stroke-width="1.6"/><circle cx="30" cy="70" r="10" fill="#ff8a1a" ${K}/><path d="M20 70h20M30 60v20" stroke="${INK}" stroke-width="1.4"/>`),
    pG(`${baum(50, 50, 1.6, "#4faa45")}`),
    pB(`${[24, 44, 64].map(x => `<circle cx="${x}" cy="66" r="12" fill="none" stroke="#4a4a52" stroke-width="3"/><circle cx="${x + 14}" cy="66" r="12" fill="none" stroke="#4a4a52" stroke-width="3"/><path d="M${x} 66l7-14h7l-7 14" fill="none" stroke="${PL[x % 7]}" stroke-width="3"/>`).join("")}`),
    pG(`<path d="M30 88V28h40v60" fill="none" stroke="#8a5a2b" stroke-width="5"/><path d="M30 28h40" stroke="#8a5a2b" stroke-width="6"/><path d="M42 28v34M58 28v34" stroke="${INK}" stroke-width="1.4"/><rect x="38" y="60" width="24" height="6" rx="2" fill="#2b5fd9" ${K1}/><path class="bob" d="M18 60q6-10 12 0" fill="none" stroke="#ffd23a" stroke-width="3"/>`)
  ];
  const weg = [
    pS(`<rect x="40" y="14" width="20" height="50" rx="6" fill="#2d3036" ${K}/><circle cx="50" cy="26" r="6" fill="#e2402f"/><circle cx="50" cy="40" r="6" fill="#5a4a2a"/><circle cx="50" cy="54" r="6" fill="#3fbf5a"/><path d="M50 64v24" stroke="#4a4a52" stroke-width="5"/>`),
    pS(`<circle cx="50" cy="38" r="22" fill="#ffffff" stroke="#e2402f" stroke-width="6"/><path d="M42 50l4-14 6 2 4 12M52 38l6-6" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="46" cy="30" r="3" fill="${INK}"/><circle cx="56" cy="28" r="2.4" fill="${INK}"/><path d="M50 60v28" stroke="#4a4a52" stroke-width="5"/>`),
    pT(`<rect x="12" y="34" width="76" height="40" rx="8" fill="#ffd23a" ${K}/>${[20, 36, 52].map(x => `<rect x="${x}" y="40" width="12" height="12" rx="2" fill="#86c8ef" ${K1}/>`).join("")}<rect x="70" y="40" width="12" height="22" rx="2" fill="#86c8ef" ${K1}/><circle cx="28" cy="76" r="7" fill="#2d3036" ${K1}/><circle cx="72" cy="76" r="7" fill="#2d3036" ${K1}/><path d="M12 60h58" stroke="#2d3036" stroke-width="2"/>`),
    pS(`${backstein(14, 30, 72, 56, "#b5533c")}<path d="M8 32L50 10l42 22z" fill="#5a4a5a" ${K}/>${[22, 42, 62].map(x => `<rect x="${x}" y="42" width="14" height="14" rx="2" fill="#ffe9a8" ${K1}/>`).join("")}<path d="M42 86V68q8-8 16 0v18" fill="#2b5fd9" ${K1}/><path d="M74 12v-8l10 4z" fill="#e2402f" ${K1}/>`),
    pS(`<path d="M30 86h40l-4-30H34z" fill="#ffffff" ${K}/>${[[36, 46, "#e2402f"], [50, 40, "#ffd23a"], [64, 46, "#2b5fd9"]].map(([x, y, c]) => `<path d="M${x} ${y}l-6-24h12z" fill="${c}" ${K1}/>`).join("")}<path d="M24 56h52" stroke="#ff5fa2" stroke-width="4"/>`),
    pG(`${baum(50, 50, 1.6)}`),
    pS(`<path d="M20 86V44h60v42" fill="#f4ead2" ${K}/><path d="M14 46L50 18l36 28z" fill="#c46a4e" ${K}/>${[28, 56].map(x => `<rect x="${x}" y="54" width="16" height="14" fill="#86c8ef" ${K1}/>`).join("")}<rect x="44" y="70" width="12" height="16" fill="#8a5a2b" ${K1}/>`)
  ];
  const pflaster = (a, b) => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/>${[0, 1, 2, 3].map(r => `<path d="M0 ${r * 25 + 25}h100" stroke="#00000014" stroke-width="2"/>${[0, 1, 2, 3].map(c => `<path d="M${c * 25 + (r % 2 ? 12 : 0)} ${r * 25}v25" stroke="#00000014" stroke-width="2"/>`).join("")}`).join("")}`);
  const parkett = (a, b) => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/><path d="M0 33h100M0 66h100" stroke="#00000014" stroke-width="2"/>`);
  const asphalt = (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? "#b9b4bd" : "#c2bdc6"}"/>${pick(x, y, 9, 6) === 0 ? `<rect x="20" y="20" width="26" height="26" fill="none" stroke="#ffffff" stroke-width="3"/><rect x="54" y="54" width="26" height="26" fill="none" stroke="#ffffff" stroke-width="3"/>` : ""}`);
  const stadtTile = (i) => svgT(`${pad("#f3ece6", "#c9b6a6")}${i}`);
  const buez = [
    szene("Stiftskirche", "i5_stadt", { "--bg": "#f1e6e8", "--bg-2": "#fbf7f8", "--floor-a": "#d9cfc6", "--floor-b": "#d1c6bc" }, pflaster("#d9cfc6", "#d1c6bc"), altstadt.slice(0, 4).concat(altstadt.slice(8, 10)), stadtTile, () => birdHTML()),
    szene("Rathaus am Markt", "i5_stadt", { "--bg": "#ece8ef", "--bg-2": "#faf8fb", "--floor-a": "#d6d0d8", "--floor-b": "#cec7d0" }, pflaster("#d6d0d8", "#cec7d0"), [altstadt[4], altstadt[5], altstadt[8], altstadt[10], altstadt[0], altstadt[6]], stadtTile, () => birdHTML()),
    szene("Krummes Haus", "i5_stadt", { "--bg": "#e6f0f4", "--bg-2": "#f7fbfc", "--floor-a": "#d8d4cc", "--floor-b": "#d0cbc2" }, pflaster("#d8d4cc", "#d0cbc2"), [altstadt[6], altstadt[7], altstadt[9], altstadt[11], altstadt[10], altstadt[8]], stadtTile, () => birdHTML()),
    szene("Klassenzimmer", "i5_schule", { "--bg": "#fff3e2", "--bg-2": "#fffbf4", "--floor-a": "#e3c79c", "--floor-b": "#dcbf92" }, parkett("#e3c79c", "#dcbf92"), klasse, (i) => svgT(`${pad("#f3e7cf", "#cfb68a")}${i}`)),
    szene("Schulhof", "i5_schule", { "--bg": "#e8f2fb", "--bg-2": "#f7fbff", "--floor-a": "#bdb8c1", "--floor-b": "#bdb8c1" }, asphalt, hof, (i) => svgT(`${pad("#eef8e2", "#8fbf6a")}${i}`), () => birdHTML()),
    szene("Schulweg", "i5_schule", { "--bg": "#ede9f0", "--bg-2": "#faf8fb", "--floor-a": "#d6d0d8", "--floor-b": "#cec7d0" }, pflaster("#d6d0d8", "#cec7d0"), weg, stadtTile, () => birdHTML())
  ];
  const schule = (l) => l >= 3;
  THEMES.i5w2 = { title: "Bützow", worldName: "Bützow", emblem: "i5ziegel-0", box: "i5ziegel-0", rolls: false, squish: false, boxWord: "Steine", pushWord: "Schübe",
    hint: (l) => schule(l) ? "Bring jeden Schulranzen an seinen Platz. Ranzen lassen sich nur schieben, nicht ziehen." : "Schieb jeden Backstein auf einen Bauplatz. Steine lassen sich nur schieben, nicht ziehen.",
    winTitle: (l) => schule(l) ? "Schule aus!" : "Schön gebaut!", winText: (m, p, l) => `${buez[l].name} geschafft! ${m} Schritte, ${p} Schübe.`, confetti: ["#b5533c", "#6e0f4c", "#ffd23a", "#86c8ef"],
    prize: { symbol: "i5preis", title: "Goldener Stern!", text: (m) => `Welt „Bützow“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#f1e6e8", "--bg-2": "#fbf7f8", "--floor-a": "#d9cfc6", "--floor-b": "#d1c6bc" },
    target: (l) => (schule(l) ? zielPlatz("#6e0f4c") : zielPlatz("#8a4a2a"))(),
    scenes: buez, levelScenes: buez, levelName: (l) => buez[l].name, levelNames: ["Kirche", "Rathaus", "Schloss", "Klasse", "Schulhof", "Schulweg"],
    levelBox: (l) => schule(l) ? "i5ranzen-0" : "i5ziegel-0", boxCycle: (l) => PL.map((_, i) => `${schule(l) ? "i5ranzen" : "i5ziegel"}-${i}`) };
}
