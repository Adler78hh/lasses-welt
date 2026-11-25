# Gemeinsame Bereinigung für Schristians Welt und Schristians große Welt.
# Der aus Lasses großer Welt übernommene Code enthält Figuren aus einer bekannten Spielserie. Dieses Werkzeug ersetzt sie
# durch eigene Fantasie-Monster (monster.js) und eigene Fangkugeln und entfernt alle Namen und Bezeichnungen dazu.
# Die Suchbegriffe stehen absichtlich nur verschlüsselt (ROT13) in dieser Datei.
import os, re, codecs
R = lambda x: codecs.decode(x, "rot13")
W = R("cbxrzba")           # Kennung im Code
WG = R("Cbxézba")     # Wort mit Akzent
NEU6 = ["Wasser-Ufer", "Blätterwald", "Funkenfelsen", "Trainingshalle", "Traumwolke", "Feuerberg"]
KURZ6 = ["Ufer", "Wald", "Felsen", "Halle", "Wolke", "Feuer"]
KUGEL = lambda cap: f'<ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/><circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="{cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/>'

def neutralize(s, D):
    if "const MON_FARBE" in s:
        return s
    k = s.index("const P_BASE = "); k = s.rindex("\n// ", 0, k) + 1
    s = s[:k] + open(os.path.join(D, "monster.js"), encoding="utf-8").read() + "\n" + s[k:]
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
                 (WG, "Monster"), (WG.upper(), "MONSTER"), (R("Cbxé"), "Fang"),
                 (W, "monsterwelt"), (W.capitalize(), "Monsterwelt"), (W.upper(), "MONSTERWELT"),
                 (W[:4].upper(), "TIER"), (W[:4].capitalize(), "Tier"), (W[:4], "tier")]:
        s = s.replace(a, b)
    return s

def clean(s, D):
    return rename(scrub(neutralize(s, D)))
