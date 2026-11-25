
// ===================== Idas Welt, Teil B (am Ende, nach Lasses Taschenmonster-Einbau) =====================
{
  // ---------- Idas Kinderzimmer: Lasses Wandbilder, dazu Papa Sören, Mama Anna, Arne und Matze je einmal ----------
  const kz = THEMES.familie.levelScenes[0], ex = EXTRA_WALLS[kz.name] || [];
  delete EXTRA_WALLS[kz.name];
  const rosa = IDA5.padTile("#ffe3f1", "#f2b6d3");
  kz.wall = feierWalls([() => teddy, doll, ...ex], () => [portrait(SOEREN, "#ffe3f1", "#f2b6d3"), portrait(ANNA, "#ffe3f1", "#f2b6d3"), ...IDA5.onkel(rosa)]);
  kz.i5own = true;

  // ---------- Alle Schauplätze von Idas Welt: Ida statt Lasse, Arne und Matze je einmal pro Level ----------
  const scenes = new Set();
  WORLDS.forEach(w => { const T = THEMES[w.theme]; if (!T || w.custom) return; (T.levelScenes || T.scenes || []).forEach(s => s && scenes.add(s)); });
  const done = new Set();
  for (const S of scenes) {
    if (S.lasse && LASSE[S.lasse] && !done.has(S.lasse)) { LASSE[S.lasse] = IDA5.idaify(LASSE[S.lasse]); done.add(S.lasse); }
    if (S.i5own) continue;
    const ex = EXTRA_WALLS[S.name], share = (typeof EXTRA_SHARE !== "undefined" && EXTRA_SHARE[S.name]) || 4, base = S.wall;
    delete EXTRA_WALLS[S.name];
    const wall0 = ex ? (x, y) => pick(x, y, 77, 10) < share ? ex[pick(x, y, 78, ex.length)](x, y) : base(x, y) : base;
    const tile = S.name.startsWith("Duplo") ? (inner) => svgT(`${duploBrick("#ffcd03")}${inner}`) : IDA5.padTile("#fff7ec", "#e4cfb4");
    S.wall = feierWalls([wall0], () => IDA5.onkel(tile));
  }
  LASSE.avatar = LASSE.fussball = LASSE.neutral = LASSE.ida;

  // ---------- Startbild: Ida ----------
  const baseRP = renderPlayers;
  renderPlayers = function () { baseRP(); const h = document.getElementById("hero"); if (h) { h.classList.remove("family"); h.innerHTML = LASSE.ida; } };

  // ---------- Weltkarte: Arne und Matze, die beiden Onkel, stehen bei Welt 1 ----------
  mapDeco = function (shown, open, pts) {
    let html = "";
    if (!pts || !pts[0]) return html;
    [[ARNE_FULL, 20], [MATZE_FULL, 32]].forEach(([svg, dx], k) => {
      html += `<div class="mapdeco mapfig" style="left:${Math.min(92, pts[0][0] + dx)}%;top:${pts[0][1] - 6}px;width:34px;height:68px;animation-delay:${-k * .8}s">${svg}</div>`; });
    return html;
  };
  if (screen === "players") renderPlayers();
}
