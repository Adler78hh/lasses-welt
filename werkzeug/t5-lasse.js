// ---------- Idas Welt, Welt 7–9: Schauplätze aus Lasses Welt (Teil 1) ----------
// Die Welten nutzen Lasses Themen direkt (lego, pokemon, familie) und passen sie an.
// 7 Duplo: Duplo-Zoo aus Lasses Lego-Welt, dazu Duplo-Bauernhof und Duplo-Traumhaus im gleichen Duplo-Stil (je zwei Level)
// 8 Taschenmonster: Lasses Taschenmonster-Welt mit allen sechs Schauplätzen (ein Schauplatz pro Level)
// 9 Idas Kinderzimmer: aus Lasses Familien-Welt (alle sechs Level)
{
  // ---------- Duplo-Bauernhof: dicke Duplo-Steine wie im Zoo, darauf Hoftiere, Traktor, Scheune, Heu ----------
  const hKuh = dz("#00852b", `<ellipse cx="29" cy="30" rx="9" ry="5" fill="#ffffff" ${LG_OL} transform="rotate(-20 29 30)"/><ellipse cx="71" cy="30" rx="9" ry="5" fill="#ffffff" ${LG_OL} transform="rotate(20 71 30)"/>
    <path d="M40 20q-5-8 0-13M60 20q5-8 0-13" stroke="#e8d9b0" stroke-width="4.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="50" cy="36" rx="18" ry="20" fill="#ffffff" ${LG_OL}/><path d="M36 24q8-6 10 4-4 7-11 3z" fill="#4a3728"/><path d="M60 40q6-4 6 4-3 4-6 1z" fill="#4a3728"/>
    <ellipse cx="50" cy="51" rx="14" ry="9" fill="#ffb3c6" ${LG_OL}/><circle cx="45" cy="51" r="2.2" fill="#4a3728"/><circle cx="55" cy="51" r="2.2" fill="#4a3728"/>${EYE(43, 34)}${EYE(57, 34)}`);
  const hSchwein = dz("#ffcd03", `<path d="M32 24l-6-14 14 8zM68 24l6-14-14 8z" fill="#ff9fbf" ${LG_OL}/>
    <circle cx="50" cy="38" r="21" fill="#ffb3cc" ${LG_OL}/><ellipse cx="50" cy="45" rx="10" ry="7" fill="#ff8fb1" ${LG_OL}/>
    <ellipse cx="46.5" cy="45" rx="2" ry="3" fill="#a8466a"/><ellipse cx="53.5" cy="45" rx="2" ry="3" fill="#a8466a"/>${EYE(42, 33)}${EYE(58, 33)}
    <circle cx="36" cy="44" r="3" fill="#ff6f9a" opacity=".5"/><circle cx="64" cy="44" r="3" fill="#ff6f9a" opacity=".5"/>`);
  const hSchaf = dz("#0055bf", `${Array.from({ length: 10 }, (_, i) => `<circle cx="${50 + 20 * Math.cos(i * Math.PI / 5)}" cy="${38 + 18 * Math.sin(i * Math.PI / 5)}" r="9" fill="#ffffff" ${LG_OL}/>`).join("")}
    <circle cx="50" cy="38" r="18" fill="#ffffff"/><path d="M30 34q-8 0-8 6 6 2 10-2zM70 34q8 0 8 6-6 2-10-2z" fill="#4a3728"/>
    <ellipse cx="50" cy="42" rx="12" ry="14" fill="#4a3728" ${LG_OL}/>${EYE(45, 39).replace(/#4a3728/, "#ffffff")}${EYE(55, 39).replace(/#4a3728/, "#ffffff")}
    <circle cx="50" cy="26" r="7" fill="#ffffff" ${LG_OL}/>`);
  const hPferd = dz("#e3000b", `<path d="M40 18l-4-10 9 6zM60 18l4-10-9 6z" fill="#a8652a" ${LG_OL}/>
    <path d="M36 30q0-18 14-18t14 18v18q0 14-14 14t-14-14z" fill="#b8742f" ${LG_OL}/>
    <path d="M44 12q6-4 12 0l-2 22q-4 2-8 0z" fill="#4a2a14" ${LG_OL}/>
    <ellipse cx="50" cy="54" rx="12" ry="9" fill="#e8c9a2" ${LG_OL}/><circle cx="46" cy="55" r="1.8" fill="#4a3728"/><circle cx="54" cy="55" r="1.8" fill="#4a3728"/>${EYE(41, 34)}${EYE(59, 34)}`);
  const hHuhn = dz("#9fd8ff", `<path d="M44 16q2-8 6-4 2-6 6 0 4-2 3 6z" fill="#e3000b" ${LG_OL}/>
    <ellipse cx="54" cy="44" rx="22" ry="18" fill="#ffffff" ${LG_OL}/><circle cx="46" cy="28" r="13" fill="#ffffff" ${LG_OL}/>
    <path d="M33 28l-9 3 9 4z" fill="#ffcd03" ${LG_OL}/><path d="M38 36q-2 6 2 8" fill="#e3000b" stroke="#e3000b" stroke-width="3"/>${EYE(44, 25)}
    <path d="M58 40q10-4 14 6-10 4-14-6z" fill="#e9eef5" ${LG_OL}/><path d="M74 36q8-6 10 0-4 6-10 4z" fill="#ffffff" ${LG_OL}/>
    <g transform="translate(18 52)"><circle cx="6" cy="6" r="6" fill="#ffe14d" ${LG_OL}/><path d="M0 6l-4 1 4 2z" fill="#ff7e14"/></g>`);
  const hTraktor = dz("#ffcd03", `<rect x="40" y="10" width="28" height="26" rx="3" fill="#9fd8ff" ${LG_OL}/><rect x="36" y="8" width="36" height="6" rx="3" fill="#e3000b" ${LG_OL}/>
    <rect x="14" y="30" width="62" height="20" rx="5" fill="#e3000b" ${LG_OL}/><rect x="22" y="20" width="6" height="12" rx="2" fill="#4a3728" ${LG_OL}/>
    <circle cx="64" cy="54" r="15" fill="#4a3728" ${LG_OL}/><circle cx="64" cy="54" r="6" fill="#ffcd03" ${LG_OL}/>
    <circle cx="24" cy="58" r="9" fill="#4a3728" ${LG_OL}/><circle cx="24" cy="58" r="3.4" fill="#ffcd03"/>`);
  const hScheune = `<svg viewBox="0 0 100 100">${duploBrick("#ffcd03")}<path d="M12 40L50 10l38 30v38H12z" fill="#e3000b" ${LG_OL}/><path d="M8 42L50 8l42 34" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
    <rect x="34" y="46" width="32" height="32" fill="#a3000b" ${LG_OL}/><path d="M34 46l32 32M66 46L34 78" stroke="#ffffff" stroke-width="4"/><rect x="34" y="46" width="32" height="32" fill="none" stroke="#ffffff" stroke-width="3"/>
    <circle cx="50" cy="32" r="6" fill="#ffffff" ${LG_OL}/></svg>`;
  const hHeu = dz("#8a5a2b", `${[[32, 44], [68, 44], [50, 24]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="#f2cf5b" ${LG_OL}/><circle cx="${x}" cy="${y}" r="10" fill="none" stroke="#c9a032" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#c9a032" stroke-width="2"/>`).join("")}`);
  const HOF = [hKuh, hSchwein, hSchaf, hPferd, hHuhn, hTraktor, hScheune, hHeu, zZaun, `<svg viewBox="0 0 100 100">${duploTree}</svg>`];

  // ---------- Duplo-Traumhaus: rosa Haus, Bett, Badewanne, Küche, Schminktisch, Kleiderschrank, Pool mit Rutsche ----------
  const tHaus = `<svg viewBox="0 0 100 100">${duploBrick("#c9a0ff")}<path d="M14 44L50 12l36 32v36H14z" fill="#ff8fc8" ${LG_OL}/><path d="M8 46L50 8l42 38" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
    <rect x="22" y="50" width="18" height="16" rx="3" fill="#9fd8ff" ${LG_OL}/><rect x="60" y="50" width="18" height="16" rx="3" fill="#9fd8ff" ${LG_OL}/>
    <path d="M42 80V64q8-10 16 0v16" fill="#ffffff" ${LG_OL}/><path d="M50 40c-7-5-7-11-2-11 1.4 0 2 1 2 1s.6-1 2-1c5 0 5 6-2 11z" fill="#ffffff" ${LG_OL} stroke-width="1.6"/></svg>`;
  const tBett = dz("#9fd8ff", `<path d="M18 44V22q0-10 10-10h44q10 0 10 10v22" fill="#ff8fc8" ${LG_OL}/><path d="M50 30c-6-4-6-10-1.6-10 1 0 1.6 1 1.6 1s.6-1 1.6-1c4.4 0 4.4 6-1.6 10z" fill="#ffffff"/>
    <rect x="12" y="40" width="76" height="22" rx="6" fill="#ffffff" ${LG_OL}/><rect x="16" y="34" width="22" height="12" rx="5" fill="#ffffff" ${LG_OL}/>
    <path d="M36 40h52v14q0 8-8 8H36z" fill="#ffc6dc" ${LG_OL}/>${[[50, 48], [64, 52], [78, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffffff"/>`).join("")}`);
  const tWanne = dz("#9fd8ff", `${[[30, 24, 7], [44, 16, 9], [60, 22, 8], [72, 14, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" ${LG_OL} stroke-width="1.6"/>`).join("")}
    <path d="M12 30h76v8q0 22-22 22H34q-22 0-22-22z" fill="#ffffff" ${LG_OL}/><path d="M16 34h68" stroke="#ffb3d1" stroke-width="5"/>
    <path d="M26 60l-4 8M74 60l4 8" stroke="#ffcd03" stroke-width="5" stroke-linecap="round"/><path d="M80 30V14q0-4 4-4h4" fill="none" stroke="#c0c6d0" stroke-width="4"/>`);
  const tKueche = dz("#ffcd03", `<rect x="16" y="14" width="68" height="52" rx="6" fill="#ff8fc8" ${LG_OL}/><rect x="24" y="30" width="52" height="30" rx="4" fill="#ffd9ea" ${LG_OL}/>
    ${[30, 44, 58, 72].map(x => `<circle cx="${x - 2}" cy="22" r="3" fill="#ffffff" ${LG_OL} stroke-width="1.4"/>`).join("")}
    <g transform="translate(36 34)"><path d="M2 14h24l-2 10H4z" fill="#c9935a" ${LG_OL} stroke-width="1.6"/><path d="M2 14q0-10 12-10t12 10z" fill="#ffffff" ${LG_OL} stroke-width="1.6"/><circle cx="14" cy="3" r="3" fill="#e3000b"/></g>`);
  const tSpiegel = dz("#c9a0ff", `<rect x="18" y="50" width="64" height="12" rx="3" fill="#ffffff" ${LG_OL}/><ellipse cx="50" cy="28" rx="18" ry="22" fill="#ffcd03" ${LG_OL}/><ellipse cx="50" cy="28" rx="13" ry="17" fill="#dff3ff" ${LG_OL}/>
    <path d="M44 20q4-5 9-5" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="24" y="40" width="7" height="12" rx="2" fill="#e3000b" ${LG_OL} stroke-width="1.6"/><circle cx="72" cy="45" r="6" fill="#ff8fc8" ${LG_OL} stroke-width="1.6"/>`);
  const tSchrank = dz("#ff8fc8", `<rect x="22" y="8" width="56" height="58" rx="5" fill="#ffffff" ${LG_OL}/><path d="M50 8v58" stroke="#4a3728" stroke-width="2.4"/>
    <path d="M24 14q13 3 24 0" stroke="#c0c6d0" stroke-width="2.4" fill="none"/><path d="M30 16h12l4 22H26z" fill="#c9a0ff" ${LG_OL} stroke-width="1.8"/><path d="M33 16l3 6 3-6" fill="none" stroke="#4a3728" stroke-width="1.4"/>
    <path d="M56 16h14l4 30H52z" fill="#ff5fa2" ${LG_OL} stroke-width="1.8"/><circle cx="46" cy="44" r="2" fill="#ffcd03"/><circle cx="54" cy="44" r="2" fill="#ffcd03"/>`);
  const tPool = dz("#00852b", `<path d="M66 64V14l8 2v48" fill="#ffcd03" ${LG_OL}/><path d="M70 18Q44 26 36 56" fill="none" stroke="#ff8fc8" stroke-width="9" stroke-linecap="round"/><path d="M70 18Q44 26 36 56" fill="none" stroke="#ffc6dc" stroke-width="4" stroke-linecap="round"/>
    <rect x="10" y="44" width="56" height="22" rx="8" fill="#ffffff" ${LG_OL}/><rect x="15" y="48" width="46" height="14" rx="5" fill="#5cc8f2"/><path d="M18 56q5-4 10 0t10 0 10 0 10 0" stroke="#ffffff" stroke-width="2" fill="none"/>`);
  const tBlumen = dz("#ff7e14", `<path d="M32 66l-4-26h44l-4 26z" fill="#ffffff" ${LG_OL}/><path d="M50 40V22M38 40l-6-12M62 40l6-12" stroke="#3fae4a" stroke-width="3.4"/>
    ${flower(50, 18, "#ff5fa2", 6)}${flower(30, 26, "#c9a0ff", 5)}${flower(70, 26, "#ff8fc8", 5)}`);
  const tHerz = `<svg viewBox="0 0 100 100">${duploBrick("#ff8fc8")}<g class="bob"><path d="M50 76C16 54 16 26 34 24c8 0 12 5 16 11 4-6 8-11 16-11 18 2 18 30-16 52z" fill="#ffffff" ${LG_OL}/><path d="M50 64C30 50 30 34 40 33c4 0 7 3 10 7 3-4 6-7 10-7 10 1 10 17-10 31z" fill="#ff5fa2"/></g></svg>`;
  const TRAUM = [tHaus, tBett, tWanne, tKueche, tSpiegel, tSchrank, tPool, tBlumen, tHerz];

  const LG = THEMES.lego, zoo = LG.levelScenes.find(s => s.name === "Duplo-Zoo");
  const duploTile = (c) => (inner) => svgT(`${duploBrick(c)}${inner}`);
  const eigen = (name, lasse, words, list, floor, pal, uncle) => ({ name, lasse, box: "duplostein", words, pal, floor, i5own: true,
    wall: feierWalls(list.map(w => () => w), () => IDA5.onkel(duploTile(uncle))), deco: () => "", extras: () => birdHTML() });
  const hof = eigen("Duplo-Bauernhof", "i5_hof", ["Muh!", "Oink!", "Kikeriki!"], HOF, (x, y) => plate("#8fcf5f", "#a3dc74", 2, x, y) + "</svg>",
    { "--bg": "#f3f8e2", "--bg-2": "#fbfdf3", "--floor-a": "#8fcf5f", "--floor-b": "#8fcf5f" }, "#0055bf");
  const traum = eigen("Duplo-Traumhaus", "i5_traum", ["Hübsch!", "Klick!"], TRAUM, (x, y) => plate("#f7b6d2", "#fcd0e3", 2, x, y) + "</svg>",
    { "--bg": "#fff0f7", "--bg-2": "#fffafd", "--floor-a": "#f7b6d2", "--floor-b": "#f7b6d2" }, "#9fd8ff");
  const DUPLO = [zoo, zoo, hof, hof, traum, traum];
  Object.assign(LG, { title: "Duplo", worldName: "Duplo", box: "duplostein", levelScenes: DUPLO,
    levelNames: ["Zoo", "Zoo", "Bauernhof", "Bauernhof", "Traumhaus", "Traumhaus"], levelBox: () => "duplostein",
    hint: "Schieb jeden Duplo-Stein auf ein Bauplatz-Feld. Steine lassen sich nur schieben, nicht ziehen.",
    prize: { symbol: "goldstein", title: "Goldener Stein!", text: (m) => `Du hast die Duplo-Welt gemeistert! Finale in ${m} Schritten.` } });

  // ---------- Taschenmonster: Lasses Welt mit allen sechs Schauplätzen ----------
  const PK = THEMES.pokemon;
  Object.assign(PK, { worldName: "Taschenmonster",
    prize: { ...PK.prize, text: (m) => `Du hast die Taschenmonster-Welt gemeistert! Finale in ${m} Schritten.` } });

  // ---------- Idas Kinderzimmer: aus Lasses Familien-Welt, in allen sechs Leveln ----------
  const FA = THEMES.familie, kz = FA.levelScenes.find(s => s.name === "Idas Kinderzimmer");
  Object.assign(FA, { title: "Idas Kinderzimmer", worldName: "Idas Kinderzimmer", levelScenes: [kz, kz, kz, kz, kz, kz],
    box: "klotz-I", levelName: () => "Idas Kinderzimmer", levelBox: () => "klotz-I", boxCycle: () => ["klotz-I", "klotz-d", "klotz-a", "klotz-I2"],
    winText: (m, p) => `Idas Kinderzimmer aufgeräumt! ${m} Schritte, ${p} Schübe.`,
    prize: { ...FA.prize, title: "Aufgeräumt!", text: (m) => `Du hast Idas Kinderzimmer geschafft! Finale in ${m} Schritten.` } });
}
