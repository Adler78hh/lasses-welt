# Teil 4 „Schristians große Welt“: Teil 3 als Grundlage, neues Design (20er Jahre: Beige, Pastell, klar), neue Level.
import json, os, re, colorsys
D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, "../christians-welt/index.html")
OUT = os.path.join(D, "../christians-grosse-welt/index.html")
LV = json.load(open(os.path.join(D, "t4-levels.json")))
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:70], c); s = s.replace(a, b)

# ---- Y2K-Look von Teil 3 entfernen ----
T3_CSS = open(os.path.join(D, "t3.css"), encoding="utf-8").read()
rep(T3_CSS, "")

# ---- Kopf, Titel, Spielstand ----
rep('content="Schristians Welt">', 'content="Große Welt S²">')
rep('<meta name="theme-color" content="#1b2a6b">', '<meta name="theme-color" content="#f3ede4">')
rep('<title>Schristians Welt</title>', '<title>Schristians große Welt</title>')
rep('<h1>Schristians <span class="big">Welt</span></h1>', '<h1>Schristians <span class="big">große Welt</span></h1>')
s = s.replace('icon-192.png?v=3', 'icon-192.png?v=1')
rep('const STORE = "christians-welt-v1";', 'const STORE = "christians-grosse-welt-v1";')
rep('href="https://fonts.googleapis.com/css2?family=Bangers&family=Bungee&family=Audiowide&family=Comic+Neue:wght@400;700&family=Permanent+Marker&display=swap"',
    'href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"')
for a in ["Bangers", "Bungee", "Fredoka", "Audiowide", "Baloo 2"]: s = s.replace(a, "Fraunces")
for a in ["Comic Neue", "Permanent Marker", "Nunito", "Comic Sans MS"]: s = s.replace(a, "DM Sans")

# ---- Level: weitere Microban-II-Level ----
NW = 10
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
s = s[:i] + "const WORLD_LEVELS = " + json.dumps([[{"n": l["n"], "m": l["m"]} for l in LV[w * 6:w * 6 + 6]] for w in range(NW)], ensure_ascii=False) + ";" + s[j:]
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"{w}-{k}": LV[w * 6 + k]["opt"] for w in range(NW) for k in range(6)}) + ";" + s[j:]

s = s.replace("Level: Microban II von David W. Skinner, frei weitergegeben mit Nennung des Autors.", "Level: Microban II und III von David W. Skinner, frei weitergegeben mit Nennung des Autors.")
s = s.replace("// Level: Microban II von David W. Skinner, nach kürzester Lösung sortiert, 6 pro Welt.", "// Level: weitere Level aus Microban II und III von David W. Skinner, nach kürzester Lösung sortiert, 6 pro Welt.")

# ---- Feinere, warme Konturen ----
rep('const kO = `stroke="${KI}" stroke-width="2.4"', 'const kO = `stroke="${KI}" stroke-width="1.8"')
rep('const kO2 = `stroke="${KI}" stroke-width="1.7"', 'const kO2 = `stroke="${KI}" stroke-width="1.3"')

# ---- Teil 4 im Stil 2026: Atelier statt Werkstatt, Bildkacheln gerahmt, leise Töne, Goldpunkt statt Stern ----
rep('const KIT_NAME = "Schristians Werkstatt";', 'const KIT_NAME = "Schristians Atelier";')
rep('const KIT_ICON = "werkstatt";', 'const KIT_ICON = "t4i-atelier";')
rep('class="tray on">Werkstatt<small>', 'class="tray on">Atelier<small>')
s = s.replace("in der Werkstatt", "im Atelier").replace("Zurück in die Werkstatt", "Zurück ins Atelier").replace("Bau in der Werkstatt", "Bau im Atelier")
s = re.sub(r'(<button type="button" class="back" data-go="toolbox">.*?</svg>)Werkstatt</button>', r'\1Atelier</button>', s)
i = s.index("const kB = (fill, inner = \"\", r = 12) => svgT("); j = s.index("\n", s.index("\n", i) + 1)
s = s[:i] + 'const kB = (fill, inner = "", r = 12) => svgT(`<rect x="0" y="0" width="100" height="100" fill="${fill}"/>${inner}`);' + s[j:]
rep('html += `<div class="tile wall" ${pos}>${w}</div>`;', 'html += `<div class="tile wall${bw ? " motif" : ""}" ${pos}>${bw ? `${bw}<div class="print">${w}</div>` : w}</div>`;')
rep('<span class="wgold">★ ${g}</span>', '<span class="wgold">● ${g}</span>')
rep("  let ctx = null, muted = false;", """  let ctx = null, muted = false;
  // Teil 4: alle Töne leiser und weicher (gemeinsamer Ausgang mit Tiefpass)
  const t4out = (c) => c._t4 || (c._t4 = (() => { const g = c.createGain(), f = c.createBiquadFilter(); g.gain.value = .32; f.type = "lowpass"; f.frequency.value = 1800; g.connect(f).connect(c.destination); return g; })());""")
k0 = s.index("const t4out"); k1 = s.index("\n", k0)
s = s[:k1] + s[k1:].replace("c.destination", "t4out(c)", 10)

# ---- Alle Farben pastellig und warm: weniger Sättigung, heller, ein Hauch Beige ----
BEIGE = (239, 230, 216)
def pastel(m):
    pre, h = m.group(1), m.group(2)
    if len(h) in (3, 4): h = "".join(c * 2 for c in h)
    a = h[6:] if len(h) == 8 else ""
    r, g, b = (int(h[k:k + 2], 16) / 255 for k in (0, 2, 4))
    hh, l, ss = colorsys.rgb_to_hls(r, g, b)
    ss = min(1, ss * .62); l = .34 + l * .64
    r, g, b = colorsys.hls_to_rgb(hh, l, ss)
    r, g, b = (round(v * 255 * .8 + bb * .2) for v, bb in zip((r, g, b), BEIGE))
    return f"{pre}#{r:02x}{g:02x}{b:02x}{a}"
def recolor(m):
    if re.search(r'(href=["\']?|url\(["\']?)$', m.string[max(0, m.start() - 6):m.start()]): return m.group(0)
    return pastel(m)
k = s.index("<body>")  # Kopf (Meta-Farbe) bleibt
s = s[:k] + re.sub(r'(?<![\w&#])()#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])', recolor, s[k:])

s = re.sub(r'const KI = "#[0-9a-f]{6}"', 'const KI = "#5b524a"', s)
T4_JS = open(os.path.join(D, "t4.js"), encoding="utf-8").read()
k = s.index("function buildBoard() {"); s = s[:k] + T4_JS + "\n" + s[k:]
T4_CSS = open(os.path.join(D, "t4.css"), encoding="utf-8").read()
k = s.rindex("</style>"); s = s[:k] + T4_CSS + s[k:]
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
