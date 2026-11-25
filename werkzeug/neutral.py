# Gemeinsame Bereinigung für Schristians Welt, Schristians große Welt und Idas Welt:
# fremde Figuren aus dem übernommenen Code entfernen bzw. durch eigene Fantasie-Monster ersetzen,
# eigene Fangkugeln statt der Ball-Designs, danach überall „Taschenmonster“ als Bezeichnung.
import os, re

def neutralize(s, D):
    if "const MON_TYP" in s:  # schon bereinigt
        return s
    # ---- fremde Figuren ersetzen: eigene Monster und Fangkugeln ----
    MONJS = open(os.path.join(D, "t5-mon.js"), encoding="utf-8").read()
    k = s.index("// ----- Pok\u00e9mon (Welt 3) -----"); s = s[:k] + MONJS + "\n" + s[k:]
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
    W = "pok" + "emon"
    s = re.sub(r"LASSE\." + W + r" = `<svg[\s\S]*?</svg>`;", "LASSE." + W + ' = "";', s, count=1)
    # Ortsnamen der Monster-Welt neutral benennen (Schlüssel überall gleich ersetzt)
    for a, b in [("Glumandas Vulkan", "Feuerberg"), ("Arena Marmoria", "Funkenfelsen"), ("Vertania-Wald", "Blätterwald"), ("Psycho-Arena", "Traumwolke"), ("Kampf-Dojo", "Trainingshalle"),
                 ('"Route 1"', '"Wasser-Ufer"'), ('"Vertania"', '"Blätterwald"'), ('"Marmoria"', '"Funkenfelsen"')]:
        s = s.replace(a, b)
    # Hauptrollen-Abschnitt (fremde Figuren mit Namen und Rufen) ganz entfernen
    a = s.index("// ===== Hauptrollen in den übrigen Pok\u00e9mon-Leveln"); b = s.index("// ===== Begleiter und eigener Siegtitel je Schauplatz", a)
    s = s[:a] + s[b:]
    KUGEL = lambda cap: f'<ellipse cx="50" cy="90" rx="26" ry="5" fill="#00000024"/><circle cx="50" cy="54" r="32" fill="#fbf7ef" stroke="#2d3036" stroke-width="3"/><path d="M22 40q28-26 56 0q-28 10-56 0z" fill="{cap}" stroke="#2d3036" stroke-width="3" stroke-linejoin="round"/><path d="M50 22l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#ffd23a" stroke="#2d3036" stroke-width="1.6"/><path d="M30 66q20 14 40 0" stroke="#d9d2c4" stroke-width="3" fill="none"/>'
    for sid, cap in [("pokeball", "var(--c1, #e3350d)"), ("superball", "#2f7ae5")]:
        a = s.index(f'<symbol id="{sid}" viewBox="0 0 100 100">'); b = s.index("</symbol>", a)
        s = s[:a] + f'<symbol id="{sid}" viewBox="0 0 100 100">' + KUGEL(cap) + s[b:]
    for kid, cap in [("k2poke", "var(--c1, #e2402f)"), ("k2super", "#2b5fd9")]:
        a = s.index(f"  {kid}: `"); b = s.index("`,\n", a) + 3
        s = s[:a] + f'  {kid}: `${{FANGKUGEL("{cap}")}}`,\n' + s[b:]


    return s

def rename(s):
    for a, b in [("Pok\u00e9b\u00e4llen", "Fangkugeln"), ("Pok\u00e9b\u00e4lle", "Fangkugeln"), ("Pok\u00e9ball", "Fangkugel"), ("Pok\u00e9mon", "Taschenmonster"), ("POK\u00c9MON", "TASCHENMONSTER"),
                 ("Pok\u00e9", "Fang"), ("pok" + "emon", "taschenmonster"), ("Pok" + "emon", "Taschenmonster"), ("POK" + "EMON", "TASCHENMONSTER")]:
        s = s.replace(a, b)
    return s
