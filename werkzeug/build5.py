# Idas Welt: Grundlage ist die fertige Datei von Schristians Welt (Teil 3). Eigene Figur Ida, Arne und Matze als Onkel,
# 90 leichte Level aus Microban I, II und III, eigene Fantasie-Monster statt fremder Figuren, eigener Look in Grau und Pink.
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

# ---- fremde Figuren ersetzen: eigene Monster und Fangkugeln ----
MONJS = open(os.path.join(D, "t5-mon.js"), encoding="utf-8").read()
k = s.index("// ----- Pokémon (Welt 3) -----"); s = s[:k] + MONJS + "\n" + s[k:]
for name in ["SCHIGGY", "KARPADOR", "ENTON", "STERNDU", "BISASAM", "MYRAPLA", "ENDIVIE", "PIKACHU", "PICHU", "MAGNETILO"]:
    m = re.search(r"const " + name + r" = `[\s\S]*?`;\n", s); assert m, name
    s = s[:m.start()] + f'const {name} = MON1("{name.lower()}");\n' + s[m.end():]
a = s.index("const PK = {"); b = s.index("\n};\n", a) + 4
s = s[:a] + "const PK = new Proxy({}, { get: (_, k) => typeof k === \"string\" ? () => MON(k) : undefined });\n" + s[b:]
# alle übrigen Einzelzeichnungen fremder Figuren (eine Zeile je Figur) durch eigene Monster ersetzen
lines = s.split("\n")
for i, line in enumerate(lines):
    m = re.match(r'const ([A-Z_]+) = `<g class="poke">.*`;$', line)
    if m: lines[i] = f'const {m.group(1)} = MON1("{m.group(1).lower()}");'
s = "\n".join(lines)
for m in list(re.finditer(r'const ([A-Z_]+) = `<g class="poke[^"]*">[\s\S]*?</g>`;', s))[::-1]:
    s = s[:m.start()] + f'const {m.group(1)} = MON1("{m.group(1).lower()}");' + s[m.end():]
# Trainer-Look aus Lasses erstem Teil (mit fremder Figur auf der Schulter) entfernen; Ida bekommt ihren eigenen
s = re.sub(r"LASSE\.pokemon = `<svg[\s\S]*?</svg>`;", 'LASSE.pokemon = "";', s, count=1)
# Ortsnamen der Monster-Welt neutral benennen (Schlüssel überall gleich ersetzt)
for a, b in [("Glumandas Vulkan", "Feuerberg"), ("Arena Marmoria", "Funkenfelsen"), ("Vertania-Wald", "Blätterwald"), ("Psycho-Arena", "Traumwolke"), ("Kampf-Dojo", "Trainingshalle"),
             ('"Route 1"', '"Wasser-Ufer"'), ('"Vertania"', '"Blätterwald"'), ('"Marmoria"', '"Funkenfelsen"')]:
    s = s.replace(a, b)
# Hauptrollen-Abschnitt (fremde Figuren mit Namen und Rufen) ganz entfernen
a = s.index("// ===== Hauptrollen in den übrigen Pokémon-Leveln"); b = s.index("// ===== Begleiter und eigener Siegtitel je Schauplatz", a)
s = s[:a] + s[b:]
KUGEL = lambda cap: f'<ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/><circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="{cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/>'
for sid, cap in [("pokeball", "var(--c1, #e3350d)"), ("superball", "#2f7ae5")]:
    a = s.index(f'<symbol id="{sid}" viewBox="0 0 100 100">'); b = s.index("</symbol>", a)
    s = s[:a] + f'<symbol id="{sid}" viewBox="0 0 100 100">' + KUGEL(cap) + s[b:]
for kid, cap in [("k2poke", "var(--c1, #e2402f)"), ("k2super", "#2b5fd9")]:
    a = s.index(f"  {kid}: `"); b = s.index("`,\n", a) + 3
    s = s[:a] + f'  {kid}: `${{FANGKUGEL("{cap}")}}`,\n' + s[b:]

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

# ---- Level: 10 Welten mit je 9 Leveln ----
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
s = s[:i] + "const WORLD_LEVELS = " + json.dumps([[{"n": l["n"], "m": l["m"]} for l in LV[w * 9:w * 9 + 9]] for w in range(10)], ensure_ascii=False) + ";" + s[j:]
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"{w}-{k}": LV[w * 9 + k]["opt"] for w in range(10) for k in range(9)}) + ";" + s[j:]

# ---- Welten von Idas Welt (Welt 3: Monster-Welt) ----
rep('const theme = ["fussball", "hunde", "garten3", "bauernhof", "lego3", "pinguine", "urlaub", "atschie", "atributschi", "enni"][i] || "neutral";',
    'const theme = ["i5w1", "i5w2", "pokemon", "i5w4", "i5w5", "i5w6", "i5w7", "i5w8", "i5w9", "i5w10"][i] || "neutral";')
a = s.index('bonus: false, name: ["Fußball & HSV",'); b = s.index("][i]", a)
s = s[:a] + 'bonus: false, name: ["Rosa Ziegel", "Holzhaus", "Monster-Welt", "Heckengarten", "Steinburg", "Fliesenbad", "Bausteinstadt", "Felsenpfad", "Kuschelzimmer", "Sternenschloss"' + s[b:]

# ---- Ida, Welten, Look ----
k = s.index("function buildBoard() {"); s = s[:k] + open(os.path.join(D, "t5.js"), encoding="utf-8").read() + "\n" + s[k:]
k = s.rindex("</style>"); s = s[:k] + open(os.path.join(D, "t5.css"), encoding="utf-8").read() + s[k:]
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
