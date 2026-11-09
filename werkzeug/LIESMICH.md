# Werkzeug für Lasses Welt (Teil 1–3)

Die Spiele selbst sind die fertigen Dateien `index.html`, `grosse-welt/index.html` und `christians-welt/index.html`.

- `solve.cpp` – Sokoban-Löser (kürzeste Lösung in Schritten). Bauen: `g++ -O2 -o solve solve.cpp`, Level über stdin, Ende mit Leerzeile.
- `microban2.json` – alle 135 Level von Microban II (David W. Skinner, frei weitergegeben mit Nennung des Autors).
- `runall.py` – löst alle Microban-II-Level; `t3-levels.json` – die 60 ausgewählten Level für Teil 3 mit Bestwert und Lösung.
- `build3.py`, `t3.js`, `t3.css` – baut Teil 3 aus Teil 2 (Probe: Welt 1).
- `durchspiel3.js` – spielt jedes Level mit seiner Lösung im echten Spiel durch (Playwright).
- `pack.py` – erzeugt Einzeldatei, Web-App-ZIP und die Download-Seite.

## Teil 4 – Schristians große Welt (`christians-grosse-welt/`)
- `build4.py` baut Teil 4 aus der fertigen Datei von Teil 3: neues Design (`t4.css`, Beige und Pastell, Schriften Fraunces und DM Sans), alle Farben werden beim Bauen pastellig und warm umgerechnet.
- `t4-levels.json` – 60 weitere Level aus Microban II und III (`microban3.json`), mit Bestwert und Lösung. Welt 4 hat nur Level mit 4 Kisten (Scrabble-Wörter).
- Ablauf: erst `build3.py`, dann `build4.py`. Prüfen mit `durchspiel3.js <datei> t4-levels.json`.
