# Idas Welt: Grundlage ist die fertige Datei von Schristians Welt (Teil 3). Eigene Figur Ida, Arne und Matze als Onkel,
# 60 leichte Level aus Microban I, II und III (6 je Welt, nach Bestwert sortiert), zehn Welten im gleichen schlichten Design, eigener Look in Grau und Pink.
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, "../christians-welt/index.html")
OUT = os.path.join(D, "../idas-welt/index.html")
LV = json.load(open(os.path.join(D, "t5-levels.json")))
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:70], c); s = s.replace(a, b)

# ---- Y2K-Look von Teil 3 entfernen ----
rep(open(os.path.join(D, "t3.css"), encoding="utf-8").read(), "")

# Schristians Welt ist schon bereinigt (Bereinigung in build3.py): keine fremden Figuren, keine fremden Namen

# ---- Kopf, Titel, Spielstand ----
rep('<meta name="theme-color" content="#1b2a6b">', '<meta name="theme-color" content="#f6e9ee">')
rep('content="Schristians Welt">', 'content="Idas Welt">')
s = s.replace("icon-192.png?v=3", "icon-192.png?v=1")
rep("<title>Schristians Welt</title>", "<title>Idas Welt</title>")
rep('<h1>Schristians <span class="big">Welt</span></h1>', '<h1>Idas <span class="big">Welt</span></h1>')
rep("Level: Microban II von David W. Skinner, frei weitergegeben mit Nennung des Autors.", "Level: Microban I, II und III von David W. Skinner, frei weitergegeben mit Nennung des Autors.")
rep('const KIT_NAME = "Schristians Werkstatt";', 'const KIT_NAME = "Idas Werkstatt";')
rep('const STORE = "christians-welt-v1";', 'const STORE = "idas-welt-v1";')
rep('let store = { players: [{ id: "christian", name: "Schristian", solved: {}, seen: 1 }], current: null };', 'let store = { players: [{ id: "ida", name: "Ida", solved: {}, seen: 1 }], current: null };')
a = s.index('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'); b = s.index(">", a) + 1
s = s[:a] + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;700;800&display=swap">' + s[b:]

# ---- Level: 10 Welten mit je 6 Leveln ----
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
s = s[:i] + "const WORLD_LEVELS = " + json.dumps([[{"n": l["n"], "m": l["m"]} for l in LV[w * 6:w * 6 + 6]] for w in range(10)], ensure_ascii=False) + ";" + s[j:]
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"{w}-{k}": LV[w * 6 + k]["opt"] for w in range(10) for k in range(6)}) + ";" + s[j:]

# ---- Welten von Idas Welt: zehn schlichte Welten ----
rep('const theme = ["fussball", "hunde", "garten3", "bauernhof", "lego3", "pinguine", "urlaub", "atschie", "atributschi", "enni"][i] || "neutral";',
    'const theme = ["i5w1", "i5w2", "i5w3", "i5w4", "i5w5", "i5w6", "i5w7", "i5w8", "i5w9", "i5w10"][i] || "neutral";')
a = s.index('bonus: false, name: ["Fußball & HSV",'); b = s.index("][i]", a)
s = s[:a] + 'bonus: false, name: ["Rosa Ziegel", "Holzhaus", "Wolkenzimmer", "Heckengarten", "Steinburg", "Fliesenbad", "Bausteinstadt", "Felsenpfad", "Kuschelzimmer", "Sternenschloss"' + s[b:]

# ---- Ida, Welten, Look ----
k = s.index("function buildBoard() {"); s = s[:k] + open(os.path.join(D, "t5.js"), encoding="utf-8").read() + "\n" + s[k:]
k = s.rindex("</style>"); s = s[:k] + open(os.path.join(D, "t5.css"), encoding="utf-8").read() + s[k:]
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
