import json, base64, html
D = json.load(open('data.json'))
PEOPLE = {
 'Einzug in Langenhorn': 'Alex, Enni', 'Renovieren': 'Alex, Enni', 'Garten anlegen': 'Alex, Enni', 'Gartenhaus': 'Alex, Enni',
 'Grillabend': 'Alex, Enni, Anna, Lasse, Sören, Ida, Arne, Matze', 'Hanf-Ecke': 'Alex, Arne, Matze',
 'Kreta': 'Arne, Matze', 'Klong! auf Kreta': 'Arne, Matze', 'Fuerteventura': 'Arne, Matze', 'Showabend mit Cats': 'Arne, Matze',
 'Silvester in Dänemark': 'Alex, Enni, Anna, Lasse, Sören, Ida, Arne, Matze', 'Jungle Party': 'Alex, Enni, Anna, Lasse, Sören, Ida, Arne, Matze',
 'Der letzte Lude': 'Alex', 'Biedermannplatz': 'Alex', 'Nacht des Wissens': 'Alex', 'Englischlehrerin': 'Alex', 'Hochzeit im Hafen': 'Alex als Braut', 'Party im weißen Zelt': 'Alex als Braut',
 'Spieleabend': 'Anna, Sören, Matze, Arne, Alex', 'Brettspiel-Duell': 'Anna, Sören, Matze, Arne, Alex', 'Gemeinsam kochen': 'Anna, Sören, Matze, Arne, Alex',
 'Großes Essen': 'Anna, Sören, Matze, Arne, Alex', 'Prost-Runde': 'Anna, Sören, Matze, Arne, Alex', 'Absacker': 'Anna, Sören, Matze, Arne, Alex',
 'Duplo-Turm': 'Enni', 'Duplo-Bauernhof': 'Enni', 'Tanzparty': 'Enni, Alex', 'Spielplatz': 'Enni', 'Planschen': 'Enni', 'Gute Nacht': 'Enni, Alex'}
SCRABBLE = ["HANF", "HAND", "HALS", "HERZ", "HAUT", "NASE"]
GAMES = {'t3': ('Schristians Welt', 'Teil 1 · Y2K-Look der 2000er · Microban II', 'teil-1'),
         't4': ('Schristians große Welt', 'Teil 2 · Stil 2026 in Sand, Salbei und Mokka · Microban II und III', 'teil-2')}
def img(f): return 'data:image/jpeg;base64,' + base64.b64encode(open(f, 'rb').read()).decode()
def e(s): return html.escape(str(s))
sections = []
for t, worlds in D.items():
    name, sub, hid = GAMES[t]
    allm = [l['opt'] for w in worlds for l in w['levels']]
    nav = ''.join(f'<a href="#{hid}-w{i+1}"><span class="num">{i+1}</span>{e(w["name"])}</a>' for i, w in enumerate(worlds))
    body = []
    for i, w in enumerate(worlds):
        scenes = []
        for l in w['levels']:
            if l['scene'] not in scenes: scenes.append(l['scene'])
        cards = []
        for k, l in enumerate(w['levels']):
            ppl = PEOPLE.get(l['scene'])
            extra = f'<div class="word">Wort: <b>{SCRABBLE[k]}</b></div>' if w['name'] == 'Bauernhof' else ''
            cards.append(f'''<article class="lv">
  <div class="shot"><img loading="lazy" src="{img(l["img"])}" alt="Spielfeld {e(l["scene"])}, Welt {i+1} Level {k+1}"></div>
  <div class="meta"><div class="lvno">Level {k+1}{' · Finale' if k == 5 else ''}</div><h4>{e(l["scene"])}</h4>{extra}
  <p class="hint">{e(l["hint"])}</p>
  <dl><div><dt>Bestwert</dt><dd>{l["opt"]} Schritte</dd></div><div><dt>Gegenstände</dt><dd>{l["boxes"]}</dd></div><div><dt>Vorlage</dt><dd>{e(l["n"])}</dd></div>{f'<div class="wide"><dt>Personen</dt><dd>{e(ppl)}</dd></div>' if ppl else ''}</dl></div>
</article>''')
        body.append(f'''<section class="world" id="{hid}-w{i+1}">
 <header><span class="wno">Welt {i+1}</span><h3>{e(w["name"])}</h3><p class="scenes">{" · ".join(e(s) for s in scenes)}</p></header>
 <div class="grid">{"".join(cards)}</div></section>''')
    sections.append(f'''<section class="game" id="{hid}" data-game="{hid}">
 <div class="gamehead"><h2>{e(name)}</h2><p>{e(sub)} · 10 Welten · 60 Level · Bestwerte von {min(allm)} bis {max(allm)} Schritten</p></div>
 <nav class="worldnav" aria-label="Welten in {e(name)}">{nav}</nav>
 {"".join(body)}</section>''')
page = open('tpl.html').read().replace('<!--SECTIONS-->', '\n'.join(sections))
open('christian-welten.html', 'w').write(page); print(len(page))
