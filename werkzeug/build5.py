# Idas Welt: Grundlage ist Lasses Welt (Teil 1, index.html) mit Rahmen, Weltkarte, Knöpfen und Schauplätzen von Lasse.
# Ida (8 Jahre) im Zeichenstil von Lasse, Arne und Matze als Onkel (je einmal pro Level an der Wand),
# 60 leichte Level aus Microban I, II und III (6 je Welt, nach Bestwert sortiert).
# Welten 1–6 und 10 schlicht (t5.js), 7 Duplo, 8 Taschenmonster, 9 Idas Kinderzimmer aus Lasses Welt (t5-lasse.js),
# am Ende Ida statt Lasse und die Onkel in allen Schauplätzen (t5-ende.js).
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, "../index.html")
OUT = os.path.join(D, "../idas-welt/index.html")
LV = json.load(open(os.path.join(D, "t5-levels.json")))
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:70], c); s = s.replace(a, b)

# ---- Kopf, Titel, Spielstand ----
rep('<meta name="theme-color" content="#2a6ae0">', '<meta name="theme-color" content="#ff8fb1">')
rep('<meta name="apple-mobile-web-app-title" content="Lasses Welt">', '<meta name="apple-mobile-web-app-title" content="Idas Welt">')
rep('<link rel="apple-touch-icon" href="icon-192.png">', '<link rel="apple-touch-icon" href="icon-192.png?v=2">')
rep('<link rel="icon" href="icon-192.png">', '<link rel="icon" href="icon-192.png?v=2">')
rep("<title>Lasses Welt</title>", "<title>Idas Welt</title>")
rep("<h1>Lasses Welt</h1>", "<h1>Idas Welt</h1>")
rep('<h2 id="map-title">Lasse<small>', '<h2 id="map-title">Ida<small>')
rep("Level: Microban von David W. Skinner, frei weitergegeben mit Nennung des Autors.", "Level: Microban I, II und III von David W. Skinner, frei weitergegeben mit Nennung des Autors.")
rep('const STORE = "lasses-welt-v1";', 'const STORE = "idas-welt-v1";')
rep('let store = { players: [{ id: "lasse", name: "Lasse", solved: {}, seen: 1 }], current: null };', 'let store = { players: [{ id: "ida", name: "Ida", solved: {}, seen: 1 }], current: null };')
rep('${p.id === "lasse" ? "" :', '${p.id === "ida" ? "" :')
# Lasses Umrechnung alter Spielstände (9 Level je Welt) gilt hier nicht
rep("if (!store.v6) {", "if (false) {")

# ---- Level: 10 Welten mit je 6 Leveln, kein Einstiegslevel von Lasse, kein Bonus-Garten ----
i = s.index("const WORLD_LEVELS = "); j = s.index("\n", i)
s = s[:i] + "const WORLD_LEVELS = " + json.dumps([[{"n": l["n"], "m": l["m"]} for l in LV[w * 6:w * 6 + 6]] for w in range(10)], ensure_ascii=False) + ";" + s[j:]
rep('WORLD_LEVELS[0][0] = { n: "Lasse 1",', '// (kein eigenes Einstiegslevel) WORLD_LEVELS[0][0] = { n: "Lasse 1",')
rep("WORLD_LEVELS.push([{ n: 155, m: [", "if (false) WORLD_LEVELS.push([{ n: 155, m: [")
i = s.index("const OPTIMAL = "); j = s.index("\n", i)
s = s[:i] + "const OPTIMAL = " + json.dumps({f"{w}-{k}": LV[w * 6 + k]["opt"] for w in range(10) for k in range(6)}) + ";" + s[j:]

# ---- Welten von Idas Welt ----
s, k = re.subn(r'const theme = \[[^\]]*\]\[i\] \|\| "neutral";', 'const theme = ["i5w1", "i5w2", "i5w3", "i5w4", "i5w5", "i5w6", "lego", "pokemon", "familie", "i5w10"][i] || "neutral";', s); assert k == 1
rep("bonus: i === 10, name: (THEMES[theme] && THEMES[theme].worldName) || [", 'bonus: false, name: ["Rosa Ziegel", "Holzhaus", "Wolkenzimmer", "Heckengarten", "Steinburg", "Fliesenbad", "Duplo", "Taschenmonster", "Idas Kinderzimmer", "Sternenschloss"][i] || [')

# ---- Ida, schlichte Welten, Welten aus Lasses Welt (vor dem Aufbau der Designs), Abschluss am Ende ----
A = open(os.path.join(D, "t5.js"), encoding="utf-8").read() + "\n" + open(os.path.join(D, "t5-lasse.js"), encoding="utf-8").read() + "\n"
rep("// ---------- versteckte Welt für eigene Level ----------", A + "// ---------- versteckte Welt für eigene Level ----------")
k = s.index('<script>if ("serviceWorker" in navigator)'); k = s.rindex("</script>", 0, k)
s = s[:k] + open(os.path.join(D, "t5-ende.js"), encoding="utf-8").read() + s[k:]

# ---- Lösungsbuch: die Lösungen dieses Spiels, über den Levelnamen den Leveln zugeordnet ----
SOL = json.dumps({l["n"]: l["sol"] for l in LV}, ensure_ascii=False)
s, k = re.subn(r"const LOESUNGEN = \{[^\n]*?\};", lambda m: f"const LOESUNGEN_N = {SOL};\nconst LOESUNGEN = new Proxy({{}}, {{ get: (_, k) => {{ const [w, l] = String(k).split(\"-\").map(Number), lv = WORLDS[w] && WORLDS[w].levels[l]; return lv ? LOESUNGEN_N[lv.n] : undefined; }} }});", s)
assert k == 1, "Lösungsbuch nicht gefunden"
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(s)
print("geschrieben", OUT, len(s))
