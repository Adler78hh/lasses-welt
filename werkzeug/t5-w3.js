// ---------- Idas Welt, Welt 3 „Dinosaurier“ (Zeichenstil von Lasses Welt) ----------
// Idas Lieblingsdinosaurier, der Triceratops, ist überall dabei: in vielen Haltungen in den Wänden, als Begleiter hinter Ida
// und groß am Rand. Schauplätze: Langhälse und Pflanzenfresser · Flugsaurier · Gefährliche Fleischfresser (je zwei Level).
// Geschoben werden Dino-Eier in acht Farben in die Nester. Ida ist Dino-Forscherin.
{
  const K = `stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`, K1 = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  const PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
  const eye = (x, y, zu) => zu ? `<path d="M${x - 3} ${y}q3 3 6 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>` : `<circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/><circle cx="${x + .9}" cy="${y - .9}" r=".9" fill="#ffffff"/>`;

  // ---------- Triceratops: grün mit orangem Nackenschild, drei Hörner, Schnabel ----------
  const TRI = "#7cc46a", TRI2 = "#5aa84a", FRILL = "#ff9a4a";
  const tri = ({ face = "auf", extra = "", front = "" } = {}) => `<g class="bob">
    <path d="M80 60q16 2 16 12-8 2-18-4z" fill="${TRI}" ${K}/>
    <rect x="44" y="68" width="10" height="18" rx="4" fill="${TRI2}" ${K}/><rect x="70" y="68" width="10" height="18" rx="4" fill="${TRI2}" ${K}/>
    <ellipse cx="62" cy="58" rx="26" ry="18" fill="${TRI}" ${K}/>
    ${[[56, 46], [68, 44], [78, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${TRI2}"/>`).join("")}
    <rect x="36" y="70" width="10" height="16" rx="4" fill="${TRI}" ${K}/><rect x="60" y="70" width="10" height="16" rx="4" fill="${TRI}" ${K}/>
    <path d="M40 54q-6-34 16-36 10 14-2 40z" fill="${FRILL}" ${K}/>${[[44, 26], [50, 22], [54, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#ffd23a"/>`).join("")}
    <ellipse cx="30" cy="54" rx="17" ry="13" fill="${TRI}" ${K}/>
    <path d="M28 44l-6-20 9 18zM40 44l2-20 4 20z" fill="#fff4dc" ${K1}/>
    <path d="M16 50l-6-10 9 7z" fill="#fff4dc" ${K1}/>
    <path d="M14 54q-8 4-2 10l8-2z" fill="#e8d9b0" ${K1}/>
    ${eye(30, 50, face === "zu")}
    ${face === "jubel" ? `<path d="M18 60q6 6 12 0z" fill="#c0392b" ${K1}/>` : face === "mampf" ? `<path d="M18 60q5 3 10 0" stroke="${INK}" stroke-width="2" fill="none"/>` : `<path d="M19 60q5 4 10 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`}
    <ellipse cx="36" cy="58" rx="3.4" ry="2" fill="#ff8fa8" opacity=".6"/>${front}</g>${extra}`;
  const zz = `<g fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"><path d="M14 14h8l-8 8h8"/><path d="M4 4h6l-6 6h6"/></g>`;
  const sterne = [[12, 18], [88, 14], [10, 40]].map(([x, y]) => `<path d="M${x} ${y - 6}l2 4 4.4.6-3.2 3 .8 4.4-4-2.2-4 2.2.8-4.4-3.2-3 4.4-.6z" fill="#ffd23a" stroke="${INK}" stroke-width="1.2"/>`).join("");
  const herz = `<path d="M86 22c-8-6-8-13-3-13 2 0 3 2 3 2s1-2 3-2c5 0 5 7-3 13z" fill="#ff5f8f" ${K1}/>`;
  const farnZweig = `<g transform="translate(6 60) rotate(-30)"><path d="M0 0h20" stroke="#3f8a32" stroke-width="2"/>${[4, 9, 14].map(x => `<ellipse cx="${x}" cy="-3" rx="3" ry="5" fill="#5fae4a"/><ellipse cx="${x}" cy="3" rx="3" ry="5" fill="#5fae4a"/>`).join("")}</g>`;
  const POSEN = [tri(), tri({ face: "zu", extra: zz }), tri({ face: "mampf", front: farnZweig }), tri({ face: "jubel", extra: sterne }), tri({ extra: herz }), tri({ face: "jubel", front: `<path d="M8 30l6-6M4 40l8-2" stroke="#ffd23a" stroke-width="3" stroke-linecap="round"/>` })];
  // Der Triceratops darf öfter vorkommen (bis zu viermal pro Haltung, mit Abstand)
  const triTile = (tile) => POSEN.map((p, i) => () => asPerson(tile(`<g transform="translate(4 6) scale(.9)">${p}</g>`), "tri" + i));

  // ---------- weitere Dinosaurier und Urzeit ----------
  const langhals = `<g class="bob"><path d="M30 70q-4-40 18-56 8-4 12 2-6 2-10 10-8 18-6 44z" fill="#8fb8d9" ${K}/><ellipse cx="56" cy="16" rx="9" ry="6" fill="#8fb8d9" ${K}/>${eye(58, 14)}<ellipse cx="54" cy="70" rx="28" ry="14" fill="#8fb8d9" ${K}/><path d="M80 70q14 0 16 8-10 2-18-2z" fill="#8fb8d9" ${K}/>${[34, 48, 62, 74].map(x => `<rect x="${x}" y="76" width="9" height="12" rx="3" fill="#7aa3c6" ${K1}/>`).join("")}</g>`;
  const stego = `<g class="bob">${[30, 42, 54, 66].map((x, i) => `<path d="M${x - 7} ${52 - (i % 2) * 2}l7-${16 + (i % 2) * 4} 7 ${16 + (i % 2) * 4}z" fill="#ff8a4a" ${K1}/>`).join("")}<ellipse cx="50" cy="62" rx="30" ry="14" fill="#c9a84a" ${K}/><path d="M80 62q12-4 16 4l-4 2 2 4-14-4z" fill="#c9a84a" ${K}/><ellipse cx="20" cy="66" rx="9" ry="7" fill="#c9a84a" ${K}/>${eye(17, 64)}${[30, 64].map(x => `<rect x="${x}" y="70" width="9" height="16" rx="3" fill="#b0903a" ${K1}/>`).join("")}</g>`;
  const ankylo = `<g class="bob"><ellipse cx="50" cy="62" rx="30" ry="14" fill="#9a8f80" ${K}/>${[30, 42, 54, 66].map(x => `<path d="M${x - 5} 52l5-8 5 8z" fill="#ffffff" ${K1}/>`).join("")}<path d="M80 62q10 0 12-4" stroke="#9a8f80" stroke-width="6" fill="none"/><circle cx="92" cy="56" r="6" fill="#7a7468" ${K1}/><ellipse cx="18" cy="66" rx="9" ry="7" fill="#9a8f80" ${K}/>${eye(15, 64)}${[30, 62].map(x => `<rect x="${x}" y="70" width="9" height="14" rx="3" fill="#7a7468" ${K1}/>`).join("")}</g>`;
  const ptero = (c = "#ff9fbf") => `<g class="bob"><path d="M50 50L8 30q8 14 2 26zM50 50l42-20q-8 14-2 26z" fill="${c}" ${K}/><ellipse cx="50" cy="52" rx="8" ry="10" fill="${c}" ${K}/><path d="M50 42l-6-10 22-4-14 8z" fill="${c}" ${K}/><path d="M52 32l12-10-2 8z" fill="#ffd23a" ${K1}/>${eye(50, 38)}</g>`;
  const trex = `<g class="bob"><path d="M66 58q22 4 30 16-16 0-30-6z" fill="#8a6a4a" ${K}/><ellipse cx="56" cy="58" rx="18" ry="16" fill="#8a6a4a" ${K}/><path d="M48 46q-4-24 16-28 18 2 14 18-4 8-20 10z" fill="#8a6a4a" ${K}/><path d="M62 38q8 2 14-2" stroke="${INK}" stroke-width="2" fill="none"/>${[64, 68, 72].map(x => `<path d="M${x} 38l1 4 1-4" fill="#ffffff" stroke="${INK}" stroke-width="1"/>`).join("")}${eye(62, 26)}<path d="M44 56l-6 4" stroke="#8a6a4a" stroke-width="4" stroke-linecap="round"/><rect x="46" y="70" width="10" height="16" rx="3" fill="#7a5a3a" ${K1}/><rect x="60" y="70" width="10" height="16" rx="3" fill="#7a5a3a" ${K1}/></g>`;
  const raptor = `<g class="bob"><path d="M40 52q-24-2-34 6 14 6 34 2z" fill="#5f7a9a" ${K}/><ellipse cx="50" cy="54" rx="14" ry="10" fill="#5f7a9a" ${K}/><path d="M58 48q4-14 18-14 8 2 6 8-6 4-18 10z" fill="#5f7a9a" ${K}/>${eye(72, 38)}<path d="M76 44l6 1" stroke="${INK}" stroke-width="1.6"/><path d="M46 62l-4 22M54 62l4 22" stroke="#4a6080" stroke-width="5" stroke-linecap="round"/><path d="M58 84l6 2M40 84l6 2" stroke="${INK}" stroke-width="2"/>${[46, 52, 58].map(x => `<path d="M${x} 46l2-4" stroke="#ff8a4a" stroke-width="2"/>`).join("")}</g>`;
  const farn = `${[-50, -25, 0, 25, 50].map(a => `<g transform="rotate(${a} 50 86)"><path d="M50 86V30" stroke="#3f8a32" stroke-width="3"/>${[40, 52, 64, 76].map(y => `<ellipse cx="44" cy="${y}" rx="6" ry="3" fill="#5fae4a"/><ellipse cx="56" cy="${y}" rx="6" ry="3" fill="#5fae4a"/>`).join("")}</g>`).join("")}`;
  const palmfarn = `<path d="M46 88l2-40h6l2 40z" fill="#a8743f" ${K1}/>${[[-60, 0], [-30, 0], [0, 0], [30, 0], [60, 0]].map(([a]) => `<path d="M51 46q${a / 2} -20 ${a} -24" fill="none" stroke="#3fae4a" stroke-width="7" stroke-linecap="round"/>`).join("")}`;
  const vulkan = `<path d="M10 86l26-46h28l26 46z" fill="#7a5a4a" ${K}/><path d="M36 40q14-8 28 0" fill="#ff7a1a" ${K1}/><path class="lava" d="M44 42l-6 22M56 42l4 18" stroke="#ff7a1a" stroke-width="4" fill="none"/><g class="steam"><circle cx="46" cy="24" r="8" fill="#d9d2cc"/><circle cx="58" cy="18" r="10" fill="#e6e0da"/></g>`;
  const nest = (n = 3) => `<ellipse cx="50" cy="70" rx="34" ry="14" fill="#c9935a" ${K}/><path d="M18 66q32 10 64 0" stroke="#8a5a2b" stroke-width="2" fill="none"/>${PL.slice(0, n).map((c, i) => `<ellipse cx="${36 + i * 14}" cy="58" rx="8" ry="11" fill="${c}" ${K1}/><circle cx="${34 + i * 14}" cy="54" r="2" fill="#ffffff" opacity=".7"/>`).join("")}`;
  const spur = `${[[30, 70], [54, 50], [38, 26]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="4" rx="6" ry="7" fill="#7a5a3a"/>${[-6, 0, 6].map(d => `<path d="M0 0L${d} -10" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>`).join("")}</g>`).join("")}`;
  const knochen = `<g transform="rotate(-30 50 50)"><rect x="24" y="44" width="52" height="12" rx="6" fill="#f4ecdc" ${K}/>${[[24, 44], [24, 56], [76, 44], [76, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#f4ecdc" ${K}/>`).join("")}</g>`;
  const felsen = `<path d="M14 86l10-30 14-8 12 10 14-16 16 12 6 32z" fill="#a89a8a" ${K}/><path d="M38 48l4 14M64 42l-2 16" stroke="#8a7c6c" stroke-width="2"/>`;
  const wolken = `<g class="float"><circle cx="34" cy="42" r="12" fill="#ffffff" ${K1}/><circle cx="50" cy="36" r="15" fill="#ffffff" ${K1}/><circle cx="66" cy="44" r="11" fill="#ffffff" ${K1}/><rect x="26" y="42" width="48" height="12" rx="6" fill="#ffffff"/></g>`;

  // ---------- Kacheln, Böden, Schauplätze ----------
  const tile = (top, side) => (inner) => svgT(`${pad(top, side)}<g transform="translate(4 4) scale(.92)">${inner}</g>`);
  const tGrün = tile("#d9efc4", "#8fbf6a"), tHimmel = tile("#d6ecfa", "#8fb8d9"), tFels = tile("#e6d6c4", "#a8865a");
  const decor = (t, list) => list.map(x => () => t(x));
  const boden = (a, b, extra) => (x, y) => svgT(`<rect width="100" height="100" fill="${(x + y) % 2 ? a : b}"/>${extra && pick(x, y, 2, 5) === 0 ? extra : ""}`);
  const FORSCHERIN = IDA5.ida("#d9bd85", "#8a6a3c", "#8a5a2b", `<path d="M50 50v26" stroke="${INK}" stroke-width="1.6"/><g transform="translate(36 54) scale(.24)">${tri()}</g>`,
    `<path d="M22 24q28-10 56 0l-4 5q-24-7-48 0z" fill="#d9bd85" stroke="${INK}" stroke-width="2"/><path d="M30 22q0-16 20-16t20 16z" fill="#d9bd85" stroke="${INK}" stroke-width="2"/><path d="M31 18h38" stroke="#7cc46a" stroke-width="3.4"/>`);
  LASSE.i5_dino = FORSCHERIN;
  const groß = `<svg viewBox="0 0 100 200"><g transform="translate(0 96)"><g class="sl-sleep">${tri({ face: "zu", extra: zz })}</g><g class="sl-awake">${tri({ face: "jubel", extra: sterne })}</g></g></svg>`;
  const szene = (name, pal, floor, t, things, words, win) => {
    const list = [...triTile(t), ...decor(t, things)];
    return { name, lasse: "i5_dino", pal, floor, i5own: true, words, winTitle: win, companion: tri(),
      side: { l: [groß], r: [] }, introIcon: t(tri({ face: "jubel" })),
      wall: feierWalls(list, () => IDA5.onkel(t)), deco: () => "", extras: () => "" };
  };
  const DINO = [
    szene("Pflanzenfresser", { "--bg": "#e6f5d8", "--bg-2": "#f7fcf1", "--floor-a": "#b5dc8f", "--floor-b": "#acd585" },
      boden("#b5dc8f", "#acd585", `<path d="M40 70l6-16 6 16M54 72l4-12 4 12" stroke="#5fae4a" stroke-width="3" fill="none"/>`), tGrün,
      [langhals, stego, ankylo, farn, palmfarn, vulkan, nest(3)], ["Mampf!", "Stapf!"], "Triceratops ist satt!"),
    szene("Flugsaurier", { "--bg": "#dff0fb", "--bg-2": "#f5fbff", "--floor-a": "#e6dccb", "--floor-b": "#ded3c0" },
      boden("#e6dccb", "#ded3c0", `<circle cx="50" cy="50" r="3" fill="#00000018"/>`), tHimmel,
      [ptero("#ff9fbf"), ptero("#b9a6f2"), ptero("#ffd23a"), wolken, felsen, nest(4)], ["Flatter!", "Hui!"], "Triceratops staunt!"),
    szene("Fleischfresser", { "--bg": "#f6e6da", "--bg-2": "#fdf6f0", "--floor-a": "#c9a984", "--floor-b": "#c09f79" },
      boden("#c9a984", "#c09f79", `<path d="M30 60l10-4M60 40l8 6" stroke="#8a6a4a" stroke-width="2"/>`), tFels,
      [trex, raptor, spur, knochen, vulkan, felsen, farn], ["Roooar!", "Stampf!"], "Triceratops ist mutig!")
  ];
  // Dino-Eier in acht Farben, Ziel: Nest
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", PL.map((c, i) =>
    `<symbol id="i5ei-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="88" rx="24" ry="5" fill="#00000024"/><ellipse cx="50" cy="54" rx="24" ry="32" fill="${c}" ${K}/>${[[40, 40], [58, 56], [44, 70], [60, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ffffff" opacity=".55"/>`).join("")}<ellipse cx="40" cy="34" rx="5" ry="9" fill="#ffffff" opacity=".45"/></symbol>`).join("") +
    `<symbol id="i5tri" viewBox="0 0 100 100" overflow="visible">${tri({ face: "jubel" })}</symbol>`);
  const nestZiel = () => `<svg viewBox="0 0 100 100"><ellipse class="glow" cx="50" cy="56" rx="40" ry="30" fill="#fff3b0"/><ellipse cx="50" cy="62" rx="38" ry="22" fill="none" stroke="#8a5a2b" stroke-width="6" stroke-dasharray="7 5"/><ellipse cx="50" cy="62" rx="26" ry="12" fill="#c9935a" opacity=".45"/><g class="fx" fill="#ffd23a"><path d="M12 8l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/><path d="M86 4l2.5 5.5 6 .8-4.3 4 1 6-5.2-3-5.2 3 1-6-4.3-4 6-.8z"/></g></svg>`;
  THEMES.i5w3 = { title: "Dinosaurier", worldName: "Dinosaurier", emblem: "i5tri", box: "i5ei-0", rolls: true, squish: false, boxWord: "Dino-Eier", pushWord: "Schübe",
    hint: "Roll jedes Dino-Ei in ein Nest. Eier lassen sich nur schieben, nicht ziehen.",
    winTitle: "Roooar!", winText: (m, p) => `Alle Eier sind im Nest! ${m} Schritte, ${p} Schübe.`, confetti: ["#7cc46a", "#ff9a4a", "#ffd23a", "#8fb8d9"],
    prize: { symbol: "i5tri", title: "Triceratops-Orden!", text: (m) => `Welt „Dinosaurier“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...IDA5.PAL5, "--bg": "#e6f5d8", "--bg-2": "#f7fcf1", "--floor-a": "#b5dc8f", "--floor-b": "#acd585" }, target: nestZiel,
    scenes: DINO, levelScenes: [0, 0, 1, 1, 2, 2].map(i => DINO[i]), levelName: (l) => DINO[[0, 0, 1, 1, 2, 2][l]].name,
    levelNames: ["Langhälse", "Langhälse", "Flugsaurier", "Flugsaurier", "Fleischfresser", "Fleischfresser"],
    levelBox: () => "i5ei-0", boxCycle: () => PL.map((_, i) => `i5ei-${i}`) };
}
