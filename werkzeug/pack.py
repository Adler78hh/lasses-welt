# Aus der Web-App-Datei (Repo) entstehen: Einzeldatei, Web-App-ZIP, aktualisierte Download-Seite, neuer Service-Worker-Cache
import sys, re, base64, zipfile, io, hashlib, os
part = sys.argv[1]                      # "t1" oder "t2"
REPO = "/home/user/lasses-welt"
here = os.path.dirname(os.path.abspath(__file__))
src = f"{REPO}/index.html" if part == "t1" else f"{REPO}/grosse-welt/index.html"
folder = "lasses-welt" if part == "t1" else "lasses-grosse-welt"
key = folder
names = {"t1": ("Lasses-Welt.html", "Lasses-Welt-WebApp.zip"), "t2": ("Lasses-grosse-Welt.html", "Lasses-grosse-Welt-WebApp.zip")}[part]
idx = open(src, encoding="utf-8").read()
# Service-Worker-Cache auf den neuen Stand setzen, damit installierte Web-Apps aktualisieren
swp = os.path.join(os.path.dirname(src), "sw.js")
sw = open(swp).read()
sw = re.sub(r'const CACHE = "([a-z-]+)-[0-9a-f]+";', lambda m: f'const CACHE = "{m.group(1)}-{hashlib.md5(idx.encode()).hexdigest()[:8]}";', sw, count=1)
open(swp, "w").write(sw)
# Einzeldatei: ohne Manifest-/Icon-Zeilen und ohne Service-Worker
single = re.sub(r'<link rel="manifest"[^\n]*\n(<meta name="theme-color"[^\n]*\n)?(<meta name="apple-mobile-web-app-capable"[^\n]*\n)?(<meta name="mobile-web-app-capable"[^\n]*\n)?(<meta name="apple-mobile-web-app-title"[^\n]*\n)?(<link rel="apple-touch-icon"[^\n]*\n)?(<link rel="icon"[^\n]*\n)?', "", idx, count=1)
single = single.replace('<script>if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});</script>\n', "")
open(os.path.join(here, f"{folder}.html"), "w", encoding="utf-8").write(single)
# ZIP: alte Beilagen (Icons, Manifest, LIESMICH) übernehmen, index.html und sw.js neu
page_p = os.path.join(here, "download.html")
page = open(page_p, encoding="utf-8").read()
m = re.search(rf'"{key}": \{{ html: \{{ name: "[^"]+", b64: "[^"]+" \}}, zip: \{{ name: "[^"]+", b64: "([^"]+)" \}} \}}', page)
old = zipfile.ZipFile(io.BytesIO(base64.b64decode(m.group(1))))
buf = io.BytesIO(); z = zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED)
for i in old.infolist():
    data = old.read(i.filename)
    if i.filename.endswith("/index.html"): data = idx.encode()
    if i.filename.endswith("/sw.js"): data = sw.encode()
    for nm in ("icon-192.png", "icon-512.png", "manifest.webmanifest"):
        if i.filename.endswith("/" + nm): data = open(os.path.join(os.path.dirname(src), nm), "rb").read()
    z.writestr(i.filename, data)
z.close()
line = f'"{key}": {{ html: {{ name: "{names[0]}", b64: "{base64.b64encode(single.encode()).decode()}" }}, zip: {{ name: "{names[1]}", b64: "{base64.b64encode(buf.getvalue()).decode()}" }} }}'
page = page[:m.start()] + line + page[m.end():]
open(page_p, "w", encoding="utf-8").write(page)
print(part, "Einzeldatei", len(single), "ZIP", len(buf.getvalue()), "Cache", re.search(r'CACHE = "([^"]+)"', sw).group(1))
