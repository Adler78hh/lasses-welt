// ===================== Idas Welt: Welten im Design von Lasses Welt (Teil 1) =====================
// Welt 7 Duplo (Zoo, Bauernhof, Traumhaus), Welt 8 Monster (sechs Schauplätze wie Lasses Welt 3),
// Welt 9 Idas Kinderzimmer. Arne und Matze stehen in jedem Level je einmal an der Wand.
const I5_PL = ["#e2402f", "#2b5fd9", "#3fae4a", "#ffd23a", "#8b5cf6", "#ff8a1a", "#ff5fa2", "#4fd1c5"];
{
  const OLD = IDA_T1;
  // Onkel als Wandbild im Kachelstil des Schauplatzes; mitOnkeln stellt beide genau einmal pro Level an die Wand
  const onkelTile = (tileFn, fig, id) => () => asPerson(tileFn(`<g transform="translate(8 8) scale(.84)">${fig}</g>`), id);
  globalThis.I5_mitOnkeln = (wall, tileFn) => feierWalls(Array.isArray(wall) ? wall : [wall], () => [onkelTile(tileFn, ARNE, "arne")(), onkelTile(tileFn, MATZE, "matze")()]);
  // Gegenstände: Duplo-Steine (wie Lasses Duplostein, feste Farben) und Fangkugeln
  const dunkel = (c) => `color-mix(in srgb, ${c} 70%, #000)`;
  const duploStein = (c) => `<ellipse cx="50" cy="92" rx="38" ry="5" fill="#00000024"/>
    <rect x="6" y="14" width="88" height="78" rx="16" fill="${dunkel(c)}" stroke="#4a3728" stroke-width="3"/>
    <rect x="6" y="8" width="88" height="76" rx="16" fill="${c}" stroke="#4a3728" stroke-width="3"/>
    ${[[30, 30], [70, 30], [30, 62], [70, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y + 4}" r="15" fill="${dunkel(c)}"/>
      <circle cx="${x}" cy="${y}" r="15" fill="${c}" stroke="#4a3728" stroke-width="2.4"/>
      <circle cx="${x}" cy="${y}" r="7.5" fill="${dunkel(c)}" stroke="#4a3728" stroke-width="1.6"/>
      <path d="M${x - 10} ${y - 6}q4-6 10-7" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".5"/>`).join("")}`;
  document.querySelector("svg defs").insertAdjacentHTML("beforeend", I5_PL.map((c, i) =>
    `<symbol id="i5duplo-${i}" viewBox="0 0 100 100" overflow="visible">${duploStein(c)}</symbol>` +
    `<symbol id="i5kugel-${i}" viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/>${FANGKUGEL(c)}</symbol>`).join(""));

  // Ida in den Outfits der neuen Schauplätze
  const INK = "#2d3036";
  Object.assign(LASSE, {
    // Zoo: Zoowärterin in Khaki mit Safarihut
    i5_zoo: kIda8({ shirt: "#c9a86a", pants: "#4f7a3a", shoes: "#8a5a2b", body: `<path d="M44 44v24" stroke="#8a6a3c" stroke-width="2"/><rect x="54" y="52" width="9" height="7" rx="1.5" fill="#b8955a" stroke="${INK}" stroke-width="1.2"/>`,
      head: `<path d="M24 22q26-8 52 0l-4 4q-22-6-44 0z" fill="#d9bd85" stroke="${INK}" stroke-width="2"/><path d="M32 21q0-14 18-14t18 14z" fill="#d9bd85" stroke="${INK}" stroke-width="2"/><path d="M33 17h34" stroke="#8a6a3c" stroke-width="3"/>` }),
    // Bauernhof: Latzhose und Strohhut
    i5_hof: kIda8({ shirt: "#f2c4d0", pants: "#4a6fb3", shoes: "#8a5a2b", body: `<path d="M40 52h20v16H40z" fill="#4a6fb3" stroke="${INK}" stroke-width="1.4"/><path d="M40 52l-2-8M60 52l2-8" stroke="#4a6fb3" stroke-width="3"/><circle cx="41" cy="54" r="1.6" fill="#ffd23a"/><circle cx="59" cy="54" r="1.6" fill="#ffd23a"/>`,
      head: `<ellipse cx="50" cy="20" rx="27" ry="6" fill="#f2d37a" stroke="${INK}" stroke-width="2"/><path d="M35 19q0-13 15-13t15 13z" fill="#f2d37a" stroke="${INK}" stroke-width="2"/><path d="M35 17h30" stroke="#e2402f" stroke-width="3"/>` }),
    // Traumhaus: rosa Kleid und Krönchen
    i5_traum: kIda8({ shirt: "#ff9cc2", pants: "#ff9cc2", shoes: "#ffffff", body: `<path d="M36 62h28l6 12H30z" fill="#ff9cc2" stroke="${INK}" stroke-width="1.6"/><path d="M50 50l2 4 4 .4-3 3 1 4-4-2-4 2 1-4-3-3 4-.4z" fill="#ffffff"/>`,
      head: `<path d="M38 12l4 7 8-9 8 9 4-7v10H38z" fill="#ffd23a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="50" cy="16" r="2.2" fill="#ff5fa2"/>` }),
    // Kinderzimmer: Schlafanzug mit Sternen
    i5_kinder: kIda8({ shirt: "#c9b8f0", pants: "#c9b8f0", shoes: "#f2c4d0", body: [[42, 52], [57, 58], [46, 64]].map(([x, y]) => `<path d="M${x} ${y - 3}l1 2 2.4.3-1.7 1.6.4 2.4-2.1-1.2-2.1 1.2.4-2.4-1.7-1.6 2.4-.3z" fill="#ffd23a"/>`).join("") })
  });

  // (aus Lasses Welt übernommen, ohne das Schild mit Schrift)
  // ---------- Duplo-Zoo: dicke Duplo-Steine, darauf typische Zootiere ----------
  const dz = (c, inner) => `<svg viewBox="0 0 100 100">${duploBrick(c)}<g class="bob">${inner}</g></svg>`;
  const EYE = (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#4a3728"/><circle cx="${x + .9}" cy="${y - .9}" r=".9" fill="#ffffff"/>`;
  const zGiraffe = dz("#00852b", `<path d="M44 66l4-40h10l-2 40z" fill="#ffcd03" ${LG_OL}/>
    <g class="lg-nod"><ellipse cx="54" cy="22" rx="14" ry="10" fill="#ffcd03" ${LG_OL}/><path d="M46 14l-2-8M58 13l1-8" stroke="#4a3728" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="44" cy="5" r="3" fill="#8a5a2b" ${LG_OL}/><circle cx="59" cy="4" r="3" fill="#8a5a2b" ${LG_OL}/>
    <ellipse cx="64" cy="25" rx="6" ry="4.5" fill="#f2c27a" ${LG_OL}/>${EYE(53, 19)}</g>
    <circle cx="50" cy="40" r="3.4" fill="#c27a2c"/><circle cx="53" cy="54" r="3" fill="#c27a2c"/><circle cx="48" cy="60" r="2.4" fill="#c27a2c"/>`);
  const zElefant = dz("#0055bf", `<path d="M30 34q-12 2-10 18 8 6 14-4z" fill="#a9b1bd" ${LG_OL}/><path d="M70 34q12 2 10 18-8 6-14-4z" fill="#a9b1bd" ${LG_OL}/>
    <circle cx="50" cy="36" r="20" fill="#b8c0cb" ${LG_OL}/><path d="M50 44q-4 14 2 22 5 2 6-2-4-6-2-20z" fill="#b8c0cb" ${LG_OL}/>
    ${EYE(42, 33)}${EYE(58, 33)}<circle cx="38" cy="42" r="3" fill="#ff9db0" opacity=".6"/><circle cx="62" cy="42" r="3" fill="#ff9db0" opacity=".6"/>`);
  const zLoewe = dz("#ff7e14", `${Array.from({ length: 12 }, (_, i) => `<circle cx="${50 + 20 * Math.cos(i * Math.PI / 6)}" cy="${38 + 20 * Math.sin(i * Math.PI / 6)}" r="9" fill="#c25a14" ${LG_OL}/>`).join("")}
    <circle cx="50" cy="38" r="18" fill="#ffc53d" ${LG_OL}/>${EYE(43, 35)}${EYE(57, 35)}
    <path d="M46 43h8l-4 4z" fill="#8a4a2b"/><path d="M50 47q-3 4-7 2M50 47q3 4 7 2" fill="none" stroke="#4a3728" stroke-width="2" stroke-linecap="round"/>`);
  const zZebra = dz("#ffcd03", `<path d="M38 18q-4-10 2-12 4 4 4 12zM62 18q4-10-2-12-4 4-4 12z" fill="#ffffff" ${LG_OL}/>
    <path d="M34 34q0-20 16-20t16 20q0 24-16 30-16-6-16-30z" fill="#ffffff" ${LG_OL}/>
    <path d="M36 26h10M54 26h10M35 36h8M57 36h8M38 46h6M56 46h6" stroke="#4a3728" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M44 14q6-6 12 0" fill="none" stroke="#4a3728" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="50" cy="56" rx="10" ry="7" fill="#5b6475" ${LG_OL}/>${EYE(43, 32)}${EYE(57, 32)}`);
  const zAffe = dz("#8a5a2b", `<circle cx="30" cy="36" r="8" fill="#8a5a2b" ${LG_OL}/><circle cx="70" cy="36" r="8" fill="#8a5a2b" ${LG_OL}/>
    <circle cx="50" cy="34" r="20" fill="#8a5a2b" ${LG_OL}/><path d="M36 38q0-12 14-8 14-4 14 8 0 14-14 14t-14-14z" fill="#f2c9a0" ${LG_OL}/>
    ${EYE(44, 34)}${EYE(56, 34)}<path d="M44 44q6 5 12 0" fill="none" stroke="#4a3728" stroke-width="2.2" stroke-linecap="round"/>`);
  const zPinguin = dz("#9fd8ff", `<ellipse cx="50" cy="40" rx="18" ry="24" fill="#4a3728" ${LG_OL}/><ellipse cx="50" cy="46" rx="12" ry="17" fill="#ffffff"/>
    ${EYE(44, 28)}${EYE(56, 28)}<path d="M45 34l5 5 5-5z" fill="#ff7e14" ${LG_OL}/><path d="M42 64h7M51 64h7" stroke="#ff7e14" stroke-width="4" stroke-linecap="round"/>`);
  const zZaun = `<svg viewBox="0 0 100 100">${duploBrick("#00852b")}
    ${[16, 38, 60, 82].map(x => `<path d="M${x - 6} 70V26l6-8 6 8v44z" fill="#c98a4a" ${LG_OL}/>`).join("")}
    <rect x="6" y="34" width="88" height="8" rx="3" fill="#a96a2a" ${LG_OL}/><rect x="6" y="54" width="88" height="8" rx="3" fill="#a96a2a" ${LG_OL}/></svg>`;
  const ZOO_WALLS = [zGiraffe, zElefant, zLoewe, zZebra, zAffe, zPinguin, zZaun, `<svg viewBox="0 0 100 100">${duploTree}</svg>`];
  const zooFloor = (x, y) => plate("#5cb85c", "#6fcf6f", 2, x, y) + "</svg>";

  // ---------- Duplo-Bauernhof: gleiche dicke Duplo-Steine, darauf Hoftiere, Traktor, Scheune, Heu ----------
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
  const HOF_WALLS = [hKuh, hSchwein, hSchaf, hPferd, hHuhn, hTraktor, hScheune, hHeu, zZaun, `<svg viewBox="0 0 100 100">${duploTree}</svg>`];
  const hofFloor = (x, y) => plate("#8fcf5f", "#a3dc74", 2, x, y) + "</svg>";

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
  const TRAUM_WALLS = [tHaus, tBett, tWanne, tKueche, tSpiegel, tSchrank, tPool, tBlumen, tHerz];
  const traumFloor = (x, y) => plate("#f7b6d2", "#fcd0e3", 2, x, y) + "</svg>";

  // ---------- Duplo-Welt: Zoo, Bauernhof, Traumhaus, je zwei Level ----------
  const duploTile = (c) => (inner) => svgT(`${duploBrick(c)}${inner}`);
  const DUPLO_SC = [
    { name: "Duplo-Zoo", lasse: "i5_zoo", words: ["Mampf!", "Toll!"], walls: ZOO_WALLS, floor: zooFloor, uncle: "#ffcd03",
      pal: { "--bg": "#eaf7dc", "--bg-2": "#f8fdf2", "--floor-a": "#5cb85c", "--floor-b": "#5cb85c" } },
    { name: "Duplo-Bauernhof", lasse: "i5_hof", words: ["Muh!", "Oink!", "Kikeriki!"], walls: HOF_WALLS, floor: hofFloor, uncle: "#0055bf",
      pal: { "--bg": "#f3f8e2", "--bg-2": "#fbfdf3", "--floor-a": "#8fcf5f", "--floor-b": "#8fcf5f" } },
    { name: "Duplo-Traumhaus", lasse: "i5_traum", words: ["Hübsch!", "Klick!"], walls: TRAUM_WALLS, floor: traumFloor, uncle: "#9fd8ff",
      pal: { "--bg": "#fff0f7", "--bg-2": "#fffafd", "--floor-a": "#f7b6d2", "--floor-b": "#f7b6d2" } }
  ].map(d => { delete BASE_WALL[d.name]; delete EXTRA_WALLS[d.name]; OUTFIT[d.name] = d.lasse;
    return { name: d.name, lasse: d.lasse, words: d.words, pal: d.pal, floor: d.floor, deco: () => "", extras: () => birdHTML(),
      wall: I5_mitOnkeln(d.walls.map(w => () => w), duploTile(d.uncle)) }; });
  THEMES.i5duplo = theme2({
    title: "Duplo", worldName: "Duplo", emblem: "i5duplo-0", box: "i5duplo-0", mapIcon: "i5duplo-0", boxWord: "Steine", pushWord: "Schübe",
    hint: () => "Schieb jeden Duplo-Stein auf einen Bauplatz. Steine lassen sich nur schieben, nicht ziehen.",
    winTitle: () => "Gebaut!", winText: (m, p) => `Alle Steine sitzen. ${m} Schritte, ${p} Schübe.`,
    confetti: DUPLO_COLORS,
    prize: { symbol: "i5preis", title: "Goldener Stern!", text: (m) => `Welt „Duplo“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...OLD.lego.pal, "--accent": "#d97b98", "--accent-dark": "#b05a78" }, target: OLD.lego.target, scenes: DUPLO_SC,
    levelScenes: [0, 0, 1, 1, 2, 2].map(i => DUPLO_SC[i]), levelName: (l) => DUPLO_SC[[0, 0, 1, 1, 2, 2][l]].name,
    levelBox: () => "i5duplo-0", boxCycle: () => I5_PL.map((_, i) => `i5duplo-${i}`)
  });

  // ---------- Idas Kinderzimmer wie in Lasses Welt 10: Teddy, Puppen, Bett, Puppenhaus, Einhorn, Buch, Mobile ----------
  // Papa Sören, Mama Anna, Arne und Matze hängen je einmal als Bild an der Wand. Geschoben werden die Buchstaben-Klötze I, D, A.
  {
    const EK = `stroke="#4a3728" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`, E2 = `stroke="#4a3728" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
    const rosa = (inner) => svgT(`${pad("#ffe3f1", "#f2b6d3")}${inner}`);
    const decor = [() => teddy, doll,
      () => rosa(`<rect x="18" y="40" width="64" height="40" rx="8" fill="#c78bff" ${EK}/><rect x="18" y="30" width="22" height="20" rx="6" fill="#ffffff" ${EK}/><path d="M18 70h64" stroke="#ffffff" stroke-width="4"/>`),
      () => rosa(`<path d="M18 86V44l32-26 32 26v42z" fill="#fff" ${E2}/><path d="M12 46l38-32 38 32" fill="#ff8fb1" ${E2}/><rect x="28" y="54" width="16" height="14" fill="#9fd8ff" ${E2}/><rect x="56" y="54" width="16" height="14" fill="#9fd8ff" ${E2}/><rect x="42" y="70" width="16" height="16" fill="#c9a0ff" ${E2}/>`),
      () => rosa(`<use href="#einhorn" x="14" y="12" width="72" height="72"/>`),
      () => rosa(`<path d="M50 30v52M50 30q-20-10-34-4v52q14-6 34 4M50 30q20-10 34-4v52q-14-6-34 4" fill="#fff" ${E2}/><path d="M24 40q10-4 20 0M24 50q10-4 20 0M56 40q10-4 20 0M56 50q10-4 20 0" stroke="#ff8fb1" stroke-width="3"/>`),
      () => rosa(`<path d="M50 10v14" stroke="#4a3728" stroke-width="2"/><path d="M26 24h48" stroke="#4a3728" stroke-width="3"/>${[[30, "#ff8fb1"], [50, "#ffd23a"], [70, "#7ad6ff"]].map(([x, c]) => `<path d="M${x} 24v20" stroke="#4a3728" stroke-width="1.6"/><path d="M${x} 44l6 10h-12z" fill="${c}" ${E2}/>`).join("")}<g class="bob"><path d="M50 60l4 10 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1z" fill="#ffd23a" ${E2}/></g>`)];
    const leute = () => [portrait(SOEREN, "#ffe3f1", "#f2b6d3"), portrait(ANNA, "#ffe3f1", "#f2b6d3"),
      asPerson(rosa(`<g transform="translate(8 8) scale(.84)">${ARNE}</g>`), "arne"), asPerson(rosa(`<g transform="translate(8 8) scale(.84)">${MATZE}</g>`), "matze")];
    const name = "Idas Kinderzimmer";
    delete BASE_WALL[name]; delete EXTRA_WALLS[name]; OUTFIT[name] = "i5_kinder";
    const sc = { name, lasse: "i5_kinder", words: ["Kuschel!", "Toll!"], pal: { "--bg": "#fff0f6", "--bg-2": "#fffafc", "--floor-a": "#ffe3ee", "--floor-b": "#ffd7e6" },
      floor: famFloors.kinderzimmer, deco: () => "", extras: () => "", wall: feierWalls(decor, leute) };
    const F = OLD.fam;
    THEMES.i5kind = theme2({
      title: name, worldName: name, emblem: "klotz-I", box: "klotz-I", mapIcon: "klotz-I", boxWord: "Klötze", pushWord: "Schübe",
      hint: () => "Schieb jeden Buchstaben-Klotz auf ein Herzchen. Klötze lassen sich nur schieben, nicht ziehen.",
      winTitle: () => "Hab euch lieb!", winText: (m, p) => `Aufgeräumt! ${m} Schritte, ${p} Schübe.`,
      confetti: ["#ff8fb1", "#ffcc33", "#7ab8ff", "#c78bff"],
      prize: { symbol: "familienherz", title: "Aufgeräumt!", text: (m) => `Welt „${name}“ geschafft! Finale in ${m} Schritten.` },
      pal: { ...F.pal, "--accent": "#d97b98", "--accent-dark": "#b05a78" }, target: F.target, scenes: [sc], levelScenes: [sc, sc, sc, sc, sc, sc],
      levelName: () => name, levelBox: () => "klotz-I", boxCycle: () => ["klotz-I", "klotz-d", "klotz-a", "klotz-I2"]
    });
  }
}

// ---------- Idas Welt, Welt 8: Monster-Welt im Design von Lasses Welt 3 (Teil 1) ----------
// Sechs Schauplätze wie bei Lasse: Wasser, Pflanzen, Blitz, Kampf, Psycho, Feuer – gleiche Böden, Wandplatten,
// Hintergründe, Gegenstände und Effekte. Statt fremder Figuren eigene Fantasie-Monster (MON), statt Markenbällen Fangkugeln.
// Je Schauplatz ein Haupt-Monster in sechs Posen (wie Lasses Hauptrollen) und Ida im passenden Trainer-Outfit.
{
  const OLD = IDA_T1;
  const INK = "#2d3036";
  const EK = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`, E2 = EK, PKK = EK;
  const P1 = (top, side) => (inner) => svgT(`${pad(top, side)}${inner}`);
  const pWasser = P1("#4aa8f0", "#2a78c8"), pBusch = P1("#4fb058", "#2f8a3a"), pVolt = P1("#ffd84a", "#d9a90c"),
    pDojo = P1("#c9a06a", "#8a6a3c"), pPsy = P1("#b07ad6", "#7a4aa6"), pLava = P1("#5a3a34", "#3a2420");
  const pkPad = (top, side, ground) => `${pad(top, side)}<path d="M3 74q24-6 47 0t47 0v14q0 3-3 3H6q-3 0-3-3z" fill="${ground}"/>`;
  const tileWith = (padSvg) => (inner) => `<svg viewBox="0 0 100 100">${padSvg}<g transform="translate(4 4) scale(.92)">${inner}</g></svg>`;
  const KUGEL = (cap, x = 22, y = 18, s = .56) => `<g transform="translate(${x} ${y}) scale(${s})">${FANGKUGEL(cap)}</g>`;
  const monTile = (padSvg, name) => () => svgT(`${padSvg}<g transform="translate(6 2) scale(.88)">${MON(mn(name))}</g>`);

  // Haupt-Monster: Name → Typ (eigene Namen, eigene Zeichnung aus MON)
  const MT = { blubbi: "wasser", apfeli: "pflanze", funki: "blitz", boxi: "kampf", traumi: "psycho", glimmi: "feuer",
    menki: "kampf", abra: "psycho", traumato: "psycho", mew: "psycho", fukano: "feuer", ponita: "feuer", vulpix: "feuer",
    perli: "wasser", seerosi: "wasser", knospi: "pflanze", beeri: "pflanze", spuli: "blitz", steini: "kampf", wolki: "psycho", funkel: "feuer" };
  const mn = (n) => MT[n] + n;

  // Posen: normal, schlafend (Z), mit Gegenstand, jubelnd (Sterne), cool (Brille), mit Herz
  const zz = `<g fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M72 20h8l-8 9h8"/><path d="M82 8h6l-6 7h6"/></g>`;
  const sterne = [[14, 20], [86, 16], [12, 50]].map(([x, y]) => `<path d="M${x} ${y - 7}l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#ffd23a" stroke="${INK}" stroke-width="1.4"/>`).join("");
  const herz = `<path d="M80 30c-9-6-9-14-3-14 2 0 3 2 3 2s1-2 3-2c6 0 6 8-3 14z" fill="#ff5f8f" stroke="${INK}" stroke-width="1.6"/>`;
  const brille = `<path d="M34 53h32v5q-4 6-10 2l-4-4h-4l-4 4q-6 4-10-2z" fill="${INK}"/><path d="M38 55l5 3M58 55l5 3" stroke="#fff" stroke-width="1.6"/>`;
  const schlafAugen = (name) => { const [c] = MON_FARBE[MT[name]]; const d = 9 + (monHash(mn(name)) % 3);
    return [-1, 1].map(s => `<ellipse cx="${50 + s * d}" cy="58" rx="5.4" ry="6.2" fill="${c}"/><path d="M${50 + s * d - 4} 58q4 3 8 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join(""); };
  const gross = (svg) => `<g transform="translate(50 60) scale(1.18) translate(-50 -60)">${svg}</g>`;
  const posen = (name, front) => { const m = MON(mn(name)); return [m, m + schlafAugen(name) + zz, m + front, m + sterne, m + brille, m + herz].map(gross); };

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
    const wall0 = (x, y) => pick(x, y, 77, 10) < 3 ? cfg.extra[pick(x, y, 78, cfg.extra.length)](x, y)
      : pick(x, y, 31, 3) < 2 ? list[pick(x, y, 32, list.length)]() : b.wall(x, y);
    LASSE["i5_" + cfg.mon] = idaOutfit(...cfg.ida); OUTFIT[name] = "i5_" + cfg.mon;
    const jubel = MON(mn(cfg.mon)) + sterne;
    const wall = I5_mitOnkeln(wall0, cfg.tile);
    return { ...b, name, lasse: "i5_" + cfg.mon, wall, words: cfg.words, winTitle: cfg.win,
      side: { l: [`<svg viewBox="0 0 100 200"><g transform="translate(0 96)">${jubel}</g></svg>`], r: [] },
      introIcon: cfg.tile(jubel), companion: MON(mn(cfg.mon)) };
  });
  // ein Schauplatz pro Level, Fangkugeln in acht Farben
  THEMES.i5mon = theme2({
    title: "Monster", worldName: "Monster", emblem: "i5kugel-0", box: "i5kugel-0", mapIcon: "i5kugel-0", rolls: true, boxWord: "Fangkugeln", pushWord: "Würfe",
    hint: () => "Roll jede Fangkugel auf eine Arena-Plattform. Fangkugeln lassen sich nur schieben, nicht ziehen.",
    winTitle: () => "Volltreffer!", winText: (m, p) => `Alle Fangkugeln liegen bereit. ${m} Schritte, ${p} Würfe.`,
    confetti: ["#e2402f", "#ffffff", "#2d3036", "#ffd23a"],
    prize: { symbol: "orden", title: "Arena-Orden!", text: (m) => `Welt „Monster“ geschafft! Finale in ${m} Schritten.` },
    pal: { ...OLD.mon.pal, "--accent": "#d97b98", "--accent-dark": "#b05a78", "--floor-a": "#f3e2b3", "--floor-b": "#eed9a3" },
    target: OLD.mon.target, scenes: six, levelScenes: six,
    levelName: (l) => six[l].name, levelBox: () => "i5kugel-0", boxCycle: () => I5_PL.map((_, i) => `i5kugel-${i}`)
  });
}
