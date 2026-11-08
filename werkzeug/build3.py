# Teil 3 „Christians Welt“ – Probe Welt 1. Grundlage ist Teil 2 (grosse-welt/index.html).
import json, os, re
SRC = "/home/user/lasses-welt/grosse-welt/index.html"
OUT = "/home/user/lasses-welt/christians-welt/index.html"
LV = json.load(open(os.path.join(os.path.dirname(__file__), "t3-levels.json") if os.path.exists(os.path.join(os.path.dirname(__file__), "t3-levels.json")) else os.path.join(os.path.dirname(__file__), "../solver/t3-levels.json")))
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:70], c); s = s.replace(a, b)

# ---- Kopf, Titel, Spielstand ----
rep('<meta name="apple-mobile-web-app-title" content="Große Welt">', '<meta name="apple-mobile-web-app-title" content="Christians Welt">')
rep('<meta name="theme-color" content="#e2402f">', '<meta name="theme-color" content="#1b2a6b">')
rep('<title>Lasses große Welt</title>', '<title>Christians Welt</title>')
rep('<h1>Lasses <span class="big">große Welt</span></h1>', '<h1>Christians <span class="big">Welt</span></h1>')
rep('const STORE = "lasses-grosse-welt-v1";', 'const STORE = "christians-welt-v1";')
rep('const KIT_NAME = "Lasses Werkstatt";', 'const KIT_NAME = "Christians Werkstatt";')
rep('family=Bangers&', 'family=Bangers&family=Bungee&family=Audiowide&')
rep('''font-size="34" letter-spacing="1.5" fill="${c}" stroke="#2d3036" stroke-width="5" paint-order="stroke" stroke-linejoin="round">LASSES WELT</text>''',
    '''font-size="25" letter-spacing="1" fill="${c}" stroke="#2d3036" stroke-width="5" paint-order="stroke" stroke-linejoin="round">CHRISTIANS WELT</text>''')

# ---- Level: Microban II, nach kürzester Lösung sortiert; Probe: nur Welt 1 ----
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
world1 = [{"n": l["n"], "m": l["m"]} for l in LV[:6]]
s = s[:i] + "const WORLD_LEVELS = " + json.dumps([world1], ensure_ascii=False) + ";" + s[j:]
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"0-{k}": LV[k]["opt"] for k in range(6)}) + ";" + s[j:]
rep("// Level: 30 Reserve-Level aus Teil 1 + 30 weitere Microban-Level, nach Schwierigkeit sortiert, 6 pro Welt.",
    "// Level: Microban II von David W. Skinner, nach kürzester Lösung sortiert, 6 pro Welt.")
rep("Level: Microban von David W. Skinner, frei weitergegeben mit Nennung des Autors.", "Level: Microban II von David W. Skinner, frei weitergegeben mit Nennung des Autors.")


# ---- Spieler „Christian“ statt „Lasse“, keine Ehrenrunde aus Teil 2 (kommt später als eigener Bonus) ----
rep('let store = { players: [{ id: "lasse", name: "Lasse", solved: {}, seen: 1 }], current: null };', 'let store = { players: [{ id: "christian", name: "Christian", solved: {}, seen: 1 }], current: null };')
rep('WORLD_LEVELS.push([{ n: 154, m: [', 'if (false) WORLD_LEVELS.push([{ n: 154, m: [')
rep('["start", "Lasse"]', '["start", "Christian"]')

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
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
