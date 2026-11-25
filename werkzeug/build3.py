# Teil 3 „Christians Welt“ – Probe Welt 1. Grundlage ist Teil 2 (grosse-welt/index.html).
import json, os, re
SRC = "/home/user/lasses-welt/grosse-welt/index.html"
OUT = "/home/user/lasses-welt/christians-welt/index.html"
LV = json.load(open(os.path.join(os.path.dirname(__file__), "t3-levels.json") if os.path.exists(os.path.join(os.path.dirname(__file__), "t3-levels.json")) else os.path.join(os.path.dirname(__file__), "../solver/t3-levels.json")))
s = open(SRC, encoding="utf-8").read()
# ===== Bereinigung =====
# Der aus Lasses großer Welt übernommene Code enthält Figuren aus einer bekannten Spielserie. Dieser Teil ersetzt sie
# durch eigene Fantasie-Monster (MONSTER_JS) und eigene Fangkugeln und entfernt alle Namen und Bezeichnungen dazu.
import codecs
# Eigene Fantasie-Monster und Fangkugeln (JavaScript, wird beim Bauen eingefügt)
MONSTER_JS = r"""// ===================== Eigene Fantasie-Monster =====================
// Jedes Monster wird aus seinem Namen erzeugt: der Typ am Namensanfang (wasser, pflanze, blitz, feuer, stein, kampf, psycho, flug) bestimmt Farbe, Ohren und Schwanz.
const MON_FARBE = { wasser: ["#6ec6e8", "#e6f7ff"], pflanze: ["#86c96e", "#eaf8df"], blitz: ["#b9a6f2", "#f3eeff"], feuer: ["#f2875a", "#ffe8d6"], stein: ["#aaa49a", "#ecebe6"],
  kampf: ["#e3a05c", "#fff0de"], psycho: ["#f0a8d8", "#fff0fa"], flug: ["#d9c08a", "#fbf5e6"] };
const monHash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
function MON(name, size = 1) {
  const typ = Object.keys(MON_FARBE).find(t => String(name).startsWith(t)) || Object.keys(MON_FARBE)[monHash(name) % 8];
  const [c, b] = MON_FARBE[typ], h = monHash(name), r = 24 + (h % 5), O = `stroke="#2d3036" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const ohren = { wasser: `<path d="M30 46q-14-4-12-16 10 0 16 10zM70 46q14-4 12-16-10 0-16 10z" fill="${c}" ${O}/>`,
    pflanze: `<path d="M50 34q-4-18 10-24 4 14-10 24z" fill="#5fae4a" ${O}/><path d="M55 22l-4 10" stroke="#3f8a32" stroke-width="1.6"/>`,
    blitz: `<path d="M50 34v-14" stroke="#2d3036" stroke-width="2.4"/><path d="M50 8l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffe680" ${O}/>`,
    feuer: `<path d="M44 36q-6-14 6-24 0 8 6 10-2-6 4-10 4 14-6 24z" fill="#ffb03a" ${O}/>`,
    stein: `<path d="M38 38l4-14 8 10 8-12 4 16z" fill="#8fd0e8" ${O}/>`,
    kampf: `<path d="M28 44h44" stroke="#e2402f" stroke-width="6"/><path d="M72 44l10 6M72 44l8-6" stroke="#e2402f" stroke-width="4" stroke-linecap="round"/>`,
    psycho: `<path d="M36 40q-4-14 4-18 6 6 4 16zM64 40q4-14-4-18-6 6-4 16z" fill="${c}" ${O}/><circle cx="50" cy="44" r="3.6" fill="#8b5cf6" ${O}/>`,
    flug: `<path d="M24 62q-14-10-8-22 12 4 14 16zM76 62q14-10 8-22-12 4-14 16z" fill="#f4f1ea" ${O}/>` }[typ];
  const schwanz = { wasser: `<path d="M74 78q16-2 14-16-8 8-14 8z" fill="${c}" ${O}/>`, pflanze: `<path d="M74 80q14 0 16-12-10 2-16 6z" fill="#5fae4a" ${O}/>`,
    blitz: `<path d="M74 80q12-2 12-12" stroke="#2d3036" stroke-width="2.4" fill="none"/><circle cx="86" cy="66" r="4" fill="#ffe680" ${O}/>`,
    feuer: `<path d="M74 80q14-2 12-16" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M86 66q-4-8 2-12 0 6 4 6-2 6-6 6z" fill="#ffb03a"/>`,
    stein: "", kampf: "", psycho: `<path d="M74 80q16 2 16-14" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`, flug: "" }[typ];
  const augenAbstand = 9 + (h % 3), mund = h % 2 ? `<path d="M45 70q5 5 10 0" stroke="#2d3036" stroke-width="2" fill="none" stroke-linecap="round"/>` : `<path d="M46 69q4 6 8 0z" fill="#c0392b" ${O}/>`;
  return `<g transform="translate(50 56) scale(${size}) translate(-50 -56)">${schwanz}${ohren}
    <ellipse cx="50" cy="${66 - r / 6}" rx="${r}" ry="${r - 2}" fill="${c}" ${O}/><ellipse cx="50" cy="${72 - r / 8}" rx="${r * .6}" ry="${r * .5}" fill="${b}"/>
    <ellipse cx="38" cy="90" rx="8" ry="4" fill="${c}" ${O}/><ellipse cx="62" cy="90" rx="8" ry="4" fill="${c}" ${O}/>
    ${[-1, 1].map(d => `<ellipse cx="${50 + d * augenAbstand}" cy="58" rx="4.2" ry="5" fill="#2d3036"/><circle cx="${50 + d * augenAbstand + 1.4}" cy="56.4" r="1.6" fill="#ffffff"/>`).join("")}
    <ellipse cx="${50 - augenAbstand - 5}" cy="65" rx="3.4" ry="2" fill="#ff8fb1" opacity=".7"/><ellipse cx="${50 + augenAbstand + 5}" cy="65" rx="3.4" ry="2" fill="#ff8fb1" opacity=".7"/>${mund}</g>`;
}
const MON1 = (name) => `<g class="tier">${MON(name)}</g>`;
// Eigene Fangkugel: helle Kapsel, farbige Kappe mit Stern, keine Mittelband-Knopf-Optik
const FANGKUGEL = (cap = "#e2402f") => `<circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="${cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/><ellipse cx="36" cy="52" rx="5" ry="3" fill="#ffffff" opacity=".8"/>`;""" + "\n"
def _bereinigung():
    # Die Suchbegriffe stehen absichtlich nur verschlüsselt (ROT13) in dieser Datei.
    R = lambda x: codecs.decode(x, "rot13")
    W = R("cbxrzba")           # Kennung im Code
    WG = R("Cbxézba")     # Wort mit Akzent
    NEU6 = ["Wasser-Ufer", "Blätterwald", "Funkenfelsen", "Trainingshalle", "Traumwolke", "Feuerberg"]
    KURZ6 = ["Ufer", "Wald", "Felsen", "Halle", "Wolke", "Feuer"]
    KUGEL = lambda cap: f'<ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/><circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="{cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/>'

    # Lasses Spiele sagen seit November 2026 „Superball“; vor dem Bereinigen die alten Stellen zurückholen, damit hier weiter Fangkugeln stehen
    BALL_ALT = [('  obkJbeq: "Fhcreoäyyr", chfuJbeq: "Jüesr",\n  uvag: "Ebyy wrqra Fhcreonyy nhs rvar Neran-Cynggsbez. Fhcreoäyyr ynffra fvpu ahe fpuvrora, avpug mvrura.",\n  jvaGvgyr: "Ibyygerssre!", jvaGrkg: (z, c) => `Nyyr Fhcreoäyyr yvrtra orervg. ${z} Fpuevggr, ${c} Jüesr.`,', '  obkJbeq: "Cbxéoäyyr", chfuJbeq: "Jüesr",\n  uvag: "Ebyy wrqra Cbxéonyy nhs rvar Neran-Cynggsbez. Cbxéoäyyr ynffra fvpu ahe fpuvrora, avpug mvrura.",\n  jvaGvgyr: "Ibyygerssre!", jvaGrkg: (z, c) => `Nyyr Cbxéoäyyr yvrtra orervg. ${z} Fpuevggr, ${c} Jüesr.`,'), ('  gvgyr: "Gnfpurazbafgre", rzoyrz: "cbxronyy", obk: "x2cbxr", ebyyf: gehr, obkJbeq: "Fhcreoäyyr", chfuJbeq: "Jüesr",\n  uvag: "Ebyy wrqra Fhcreonyy va rvar Neran-Znexvrehat. Oäyyr ynffra fvpu ahe fpuvrora, avpug mvrura.",\n  jvaGvgyr: "Trsnatra!", jvaGrkg: (z, c) => `Nyyr Fhcreoäyyr orervg. ${z} Fpuevggr, ${c} Jüesr.`,', '  gvgyr: "Gnfpurazbafgre", rzoyrz: "cbxronyy", obk: "x2cbxr", ebyyf: gehr, obkJbeq: "Cbxéoäyyr", chfuJbeq: "Jüesr",\n  uvag: "Ebyy wrqra Cbxéonyy va rvar Neran-Znexvrehat. Oäyyr ynffra fvpu ahe fpuvrora, avpug mvrura.",\n  jvaGvgyr: "Trsnatra!", jvaGrkg: (z, c) => `Nyyr Cbxéoäyyr orervg. ${z} Fpuevggr, ${c} Jüesr.`,'), ('    // Fhcreoäyyr: Zrvfgreonyy, Cerzvreonyy, Urvyonyy (qre Ulcreonyy truöeg fpuba mh qra Fhcreoäyyra)', '    // Fhcreoäyyr: Zrvfgreonyy, Cerzvreonyy, Urvyonyy (qre Ulcreonyy truöeg fpuba mh qra Cbxéoäyyra)'), ('  // Rvtrar Ervurasbytra (Fhcreoäyyr, Vqnf Xyögmr) unora Ibeenat', '  // Rvtrar Ervurasbytra (Cbxéoäyyr, Vqnf Xyögmr) unora Ibeenat')]

    def neutralize(s, D):
        if "const MON_FARBE" in s:
            return s
        k = s.index("const P_BASE = "); k = s.rindex("\n// ", 0, k) + 1
        s = s[:k] + MONSTER_JS + "\n" + s[k:]
        # Einzelzeichnungen der fremden Figuren -> eigene Monster
        for m in list(re.finditer(r'const ([A-Z_]+) = `<g class="' + W[:4] + r'[^"]*">[\s\S]*?</g>`;', s))[::-1]:
            s = s[:m.start()] + f'const {m.group(1)} = MON1("{m.group(1).lower()}");' + s[m.end():]
        a = s.index("const PK = {"); b = s.index("\n};\n", a) + 4
        s = s[:a] + 'const PK = new Proxy({}, { get: (_, k) => typeof k === "string" ? () => MON(k) : undefined });\n' + s[b:]
        s = re.sub(r"LASSE\." + W + r" = `<svg[\s\S]*?</svg>`;", "LASSE." + W + ' = "";', s, count=1)
        a = s.index("// ===== Hauptrollen in den übrigen"); b = s.index("// ===== Begleiter und eigener Siegtitel je Schauplatz", a)
        s = s[:a] + s[b:]
        for sid, cap in [(W[:4] + "ball", "var(--c1, #e3350d)"), ("superball", "#2f7ae5")]:
            a = s.index(f'<symbol id="{sid}" viewBox="0 0 100 100">'); b = s.index("</symbol>", a)
            s = s[:a] + f'<symbol id="{sid}" viewBox="0 0 100 100">' + KUGEL(cap) + s[b:]
        for kid, cap in [("k2" + W[:4], "var(--c1, #e2402f)"), ("k2super", "#2b5fd9")]:
            a = s.index(f"  {kid}: `"); b = s.index("`,\n", a) + 3
            s = s[:a] + f'  {kid}: `${{FANGKUGEL("{cap}")}}`,\n' + s[b:]
        # Schauplätze der Monster-Welt neutral benennen (Reihenfolge wie im Code)
        alt = []
        for m in re.finditer(r'kScene\("([^"]+)", "' + W + r'2?"', s):
            if m.group(1) not in alt: alt.append(m.group(1))
        for a, b in sorted(zip(alt, NEU6), key=lambda p: -len(p[0])):
            s = s.replace(f'"{a}"', f'"{b}"').replace(a, b)
        s = re.sub(r"\.levelNames = COMIC \? \[[^\]]*\]", ".levelNames = COMIC ? " + str(KURZ6).replace("'", '"'), s)
        return s

    def scrub(s):
        """Namen der fremden Figuren durch neutrale Monster-Namen ersetzen."""
        neu, n = {}, {}
        BG = {"bgGrass": "wasser", "bgForest": "pflanze", "bgRock": "stein", "bgDojo": "kampf", "bgPsy": "psycho", "bgLava": "feuer"}
        for m in re.finditer(r'kMon\("[^"]*", "([a-z]+)"(?:, (bg[A-Za-z]+))?', s):
            k = m.group(1)
            if k not in neu: t = BG.get(m.group(2), "flug"); n[t] = n.get(t, 0) + 1; neu[k] = f"{t}{n[t]}"
        for m in re.finditer(r'const ([A-Z_]+) = MON1\("([a-z_]+)"\);', s):
            C, k = m.group(1), m.group(2)
            if k not in neu: n["monster"] = n.get("monster", 0) + 1; neu[k] = f"monster{n['monster']}"
            neu[C] = neu[k].upper()
        for k in sorted(neu, key=len, reverse=True):
            v = neu[k]
            s = re.sub(r"\b" + re.escape(k) + r"\b", v, s)
            if k.islower(): s = re.sub(r"\b" + re.escape(k.capitalize()) + r"\b", v.capitalize(), s)
        s = re.sub(r"/\* (\w+): Begleiter, gro\u00dfer \1 am Rand", "/* Begleiter, gro\u00dfes Monster am Rand", s)
        return s

    def rename(s):
        for a, b in [(R("Cbxéoäyyra"), "Fangkugeln"), (R("Cbxéoäyyr"), "Fangkugeln"), (R("Cbxéonyy"), "Fangkugel"),
                     ("Taschenmonster", "Monster"),  # Lasses Spiele sagen seit November 2026 „Taschenmonster“
                     (WG, "Monster"), (WG.upper(), "MONSTER"), (R("Cbxé"), "Fang"),
                     (W, "monsterwelt"), (W.capitalize(), "Monsterwelt"), (W.upper(), "MONSTERWELT"),
                     (W[:4].upper(), "TIER"), (W[:4].capitalize(), "Tier"), (W[:4], "tier")]:
            s = s.replace(a, b)
        return s

    def clean(s, D):
        for neu, alt in BALL_ALT: s = s.replace(R(neu), R(alt))
        return rename(scrub(neutralize(s, D)))

    return clean
clean = _bereinigung()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:70], c); s = s.replace(a, b)

# ---- Kopf, Titel, Spielstand ----
rep('<meta name="apple-mobile-web-app-title" content="Große Welt">', '<meta name="apple-mobile-web-app-title" content="Schristians Welt">')
rep('<meta name="theme-color" content="#e2402f">', '<meta name="theme-color" content="#1b2a6b">')
rep('<title>Lasses große Welt</title>', '<title>Schristians Welt</title>')
rep('<h1>Lasses <span class="big">große Welt</span></h1>', '<h1>Schristians <span class="big">Welt</span></h1>')
rep('<link rel="apple-touch-icon" href="icon-192.png?v=2">', '<link rel="apple-touch-icon" href="icon-192.png?v=3">')
rep('<link rel="icon" href="icon-192.png?v=2">', '<link rel="icon" href="icon-192.png?v=3">')
rep('const STORE = "lasses-grosse-welt-v1";', 'const STORE = "christians-welt-v1";')
rep('const KIT_NAME = "Lasses Werkstatt";', 'const KIT_NAME = "Schristians Werkstatt";')
rep('family=Bangers&', 'family=Bangers&family=Bungee&family=Audiowide&')
rep('''font-size="34" letter-spacing="1.5" fill="${c}" stroke="#2d3036" stroke-width="5" paint-order="stroke" stroke-linejoin="round">LASSES WELT</text>''',
    '''font-size="23" letter-spacing="1" fill="${c}" stroke="#2d3036" stroke-width="5" paint-order="stroke" stroke-linejoin="round">SCHRISTIANS WELT</text>''')

# ---- Level: Microban II, nach kürzester Lösung sortiert; Probe: nur Welt 1 ----
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
NW = 10  # fertige Welten
worlds = [[{"n": l["n"], "m": l["m"]} for l in LV[w * 6:w * 6 + 6]] for w in range(NW)]
s = s[:i] + "const WORLD_LEVELS = " + json.dumps(worlds, ensure_ascii=False) + ";" + s[j:]
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"{w}-{k}": LV[w * 6 + k]["opt"] for w in range(NW) for k in range(6)}) + ";" + s[j:]
rep("// Level: 30 Reserve-Level aus Teil 1 + 30 weitere Microban-Level, nach Schwierigkeit sortiert, 6 pro Welt.",
    "// Level: Microban II von David W. Skinner, nach kürzester Lösung sortiert, 6 pro Welt.")
rep("Level: Microban von David W. Skinner, frei weitergegeben mit Nennung des Autors.", "Level: Microban II von David W. Skinner, frei weitergegeben mit Nennung des Autors.")


# ---- Spieler „Christian“ statt „Lasse“, keine Ehrenrunde aus Teil 2 (kommt später als eigener Bonus) ----
rep('let store = { players: [{ id: "lasse", name: "Lasse", solved: {}, seen: 1 }], current: null };', 'let store = { players: [{ id: "christian", name: "Schristian", solved: {}, seen: 1 }], current: null };')
rep('WORLD_LEVELS.push([{ n: 154, m: [', 'if (false) WORLD_LEVELS.push([{ n: 154, m: [')
rep('["start", "Lasse"]', '["start", "Schristian"]')


# ---- Welten von Teil 3 ----
s, k = re.subn(r'const theme = \[[^\]]*\]\[i\] \|\| "neutral";', 'const theme = ["fussball", "hunde", "garten3", "bauernhof", "lego3", "pinguine", "urlaub", "atschie", "atributschi", "enni"][i] || "neutral";', s); assert k == 1
rep('bonus: i === 10, name: (THEMES[theme] && THEMES[theme].worldName) || ["Fußball", "Reiten",', 'bonus: false, name: ["Fußball & HSV", "Musikalische Hunde", "Reihenendhaus", "Bauernhof", "Lego", "Pinguine", "Urlaub", "Atschibella", "Atributschi", "Enni"][i] || (THEMES[theme] && THEMES[theme].worldName) || ["Fußball & HSV", "Reiten",')


# ---- Fortschrittskreise: eigenes Bild je Kreis möglich (z. B. Buchstaben eines Wortes) ----
rep('slots.innerHTML = [...goals].map(() => `<span class="slot"><svg viewBox="0 0 100 100"><use href="#${T.boxIn || boxId()}"/></svg></span>`).join("");',
    'slots.innerHTML = [...goals].map((_, i) => `<span class="slot"><svg viewBox="0 0 100 100"><use href="#${T.slotIcon ? T.slotIcon(curLevel, i) : (T.boxIn || boxId())}"/></svg></span>`).join("");')


# ---- Comic-Wörter je Schauplatz (S.words) und Pups-Wolke beim Schieben (S.fart) ----
rep('const words = () => WORDS[L && L.theme] || ["ZACK!", "BÄM!", "WUMMS!", "YES!"];', 'const words = () => (S && S.words) || WORDS[L && L.theme] || ["ZACK!", "BÄM!", "WUMMS!", "YES!"];')
rep("""      if (pushed) dust(pushed.x - dx, pushed.y - dy, dx, dy, true);
    },""", """      if (pushed) dust(pushed.x - dx, pushed.y - dy, dx, dy, true);
      if (pushed && S && S.fart && Math.random() < .5) { const t = ["PUPS!", "PFFRT!", "PÖRT!"][Math.floor(Math.random() * 3)];
        add("fx-dust", pushed.x - dx, pushed.y - dy, `<svg viewBox="-20 -20 140 140" overflow="visible">${[[30, 60, 16], [50, 50, 20], [70, 62, 15]].map(([cx, cy, r]) => `<circle cx="${cx - dx * 18}" cy="${cy}" r="${r}" fill="#9ad97a" fill-opacity=".85" stroke="${NI}" stroke-width="2"/>`).join("")}<text x="50" y="30" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" fill="#3fae4a" stroke="${NI}" stroke-width="1.6" paint-order="stroke">${t}</text></svg>`, 700); }
    },""")


# ---- Schrift auf Wandkacheln: je Schauplatz erlaubbar (S.allowText, z. B. Tafel im Klassenzimmer) ----
rep('const unwantedWall = (h) => /<text\\b/.test(h) ||', 'const unwantedWall = (h) => (!(S && S.allowText) && /<text\\b/.test(h)) ||')

# ---- Christian als Hauptfigur, Fankurve, Y2K-Look ----
T3_JS = open(os.path.join(os.path.dirname(__file__), "t3.js"), encoding="utf-8").read()
T3_CSS = open(os.path.join(os.path.dirname(__file__), "t3.css"), encoding="utf-8").read()
# nach allen Themen und Figuren, vor dem Spielaufbau einhängen
anchor = "// Felder unter dem Namensschild vorab bestimmen"
k = s.index("function buildBoard() {")
s = s[:k] + T3_JS + "\n" + s[k:]
k = s.rindex("</style>")
s = s[:k] + T3_CSS + s[k:]
os.makedirs(os.path.dirname(OUT), exist_ok=True)
s = clean(s, os.path.dirname(os.path.abspath(__file__)))
# ---- Lösungsbuch: die Lösungen dieses Spiels, über den Levelnamen den Leveln zugeordnet ----
SOL = json.dumps({l["n"]: l["sol"] for l in LV}, ensure_ascii=False)
s, k = re.subn(r"const LOESUNGEN_N = \{[^\n]*?\};", lambda m: f"const LOESUNGEN_N = {SOL};", s)
if not k:
    s, k = re.subn(r"const LOESUNGEN = \{[^\n]*?\};", lambda m: f"const LOESUNGEN_N = {SOL};\nconst LOESUNGEN = new Proxy({{}}, {{ get: (_, k) => {{ const [w, l] = String(k).split(\"-\").map(Number), lv = WORLDS[w] && WORLDS[w].levels[l]; return lv ? LOESUNGEN_N[lv.n] : undefined; }} }});", s)
assert k == 1, "Lösungsbuch nicht gefunden"
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
