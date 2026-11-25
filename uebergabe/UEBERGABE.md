# Übergabe: Sokoban-Spiele der Familie

Diese Datei fasst alles zusammen, was ein neuer Chat braucht, um an den Spielen weiterzuarbeiten.
Erste Nachricht im neuen Chat zum Beispiel: **„Lies `uebergabe/UEBERGABE.md` und arbeite danach weiter.“**

## Die Spiele

| Spiel | Ordner | Web-App | Vorschau in Claude |
|---|---|---|---|
| Lasses Welt (Teil 1) | `index.html` | https://adler78hh.github.io/lasses-welt/ | https://claude.ai/artifact/934pBrSNoQyKhwSwPCREDt |
| Lasses große Welt (Teil 2) | `grosse-welt/` | https://adler78hh.github.io/lasses-welt/grosse-welt/ | https://claude.ai/artifact/YbHsF1cWwRdrx9WGTuHp1h |
| Schristians Welt | `christians-welt/` | https://adler78hh.github.io/lasses-welt/christians-welt/ | https://claude.ai/artifact/N1f811HDJbVsYRGJp22efM |
| Schristians große Welt | `christians-grosse-welt/` | https://adler78hh.github.io/lasses-welt/christians-grosse-welt/ | https://claude.ai/artifact/WXKb9weUcaR3rnLW8dC28b |
| Idas Welt | `idas-welt/` | https://adler78hh.github.io/lasses-welt/idas-welt/ | https://claude.ai/artifact/1nvrSSJ4nBxGxAmVbQ8wCf |

Weitere Seiten: Übersicht aller Welten der Christian-Spiele https://claude.ai/artifact/5ywBJtudkXU6J8BDZZa9mz ·
Download-Seite https://claude.ai/artifact/Rx4FyxmazweiSnHAvez2Se (alle fünf Spiele) ·
Lösungsbuch https://claude.ai/artifact/7YRP6eXCUmSYjsqSM67Txq

Repository: GitHub `Adler78hh/lasses-welt`, Branch `main`, veröffentlicht über GitHub Pages.
Commits als `Adler78hh` mit der E-Mail des Kontoinhabers.

## Wichtige Absprachen

- **Lasses Welt und Lasses große Welt nicht verändern.** Ausdrücklicher Wunsch.
- Antworten auf Deutsch, am Ende Screenshots und Links.
- Wenn um Besprechen oder Warten gebeten wird: erst fragen, dann bauen.
- Jede Person höchstens einmal pro Level an der Wand (geprüft mit `werkzeug/check2.js`).
- Alle geschobenen Gegenstände in einem Level haben verschiedene Farben.
- Keine Schrift auf Wandkacheln, außer wo ein Schauplatz es erlaubt (`allowText`).
- Keine echten Markenlogos selbst zeichnen. Logos, die der Nutzer schickt, dürfen als Bild eingesetzt werden
  (z. B. Nacht des Wissens, PriMa).
- Lösungsbuch nur im Cheat-Profil. In Christians Spielen und Idas Welt kommen die Lösungen beim Bauen aus `t3-`, `t4-` bzw. `t5-levels.json` (über den Levelnamen zugeordnet).

## So werden die Spiele gebaut

Alle Werkzeuge liegen in `werkzeug/` (siehe auch `werkzeug/LIESMICH.md`).

1. `python3 werkzeug/build3.py` – baut **Schristians Welt** aus `grosse-welt/index.html` + `t3.js` + `t3.css`.
2. `python3 werkzeug/build4.py` – baut **Schristians große Welt** aus Schristians Welt + `t4.js` + `t4.css`.
3. `python3 werkzeug/build5.py` – baut **Idas Welt** aus Schristians Welt + `t5.js` + `t5.css` (Level: `t5-levels.json`).

`build3.py` ersetzt dabei den übernommenen Figuren-Code durch eigene Fantasie-Monster.
Änderungen an Christians Spielen also immer in `t3.js` (gilt für beide Christian-Teile) bzw. `t4.js`,
danach beide Bauschritte der Reihe nach ausführen.

Level: `t3-levels.json` (Schristians Welt), `t4-levels.json` (große Welt), jeweils
mit Bestwert und Lösung. Sammlungen: `microban1.json`, `microban2.json`, `microban3.json`. Löser: `solve.cpp`
(`g++ -O2 -o solve solve.cpp`, Level über stdin, Ende mit Leerzeile).

## Prüfen

Playwright ist nötig (`require('playwright')`).

```
node werkzeug/durchspiel3.js $PWD/christians-welt/index.html werkzeug/t3-levels.json
node werkzeug/durchspiel3.js $PWD/christians-grosse-welt/index.html werkzeug/t4-levels.json
node werkzeug/durchspiel3.js $PWD/idas-welt/index.html werkzeug/t5-levels.json
node werkzeug/check2.js $PWD/<ordner>/index.html
```

`durchspiel3.js` spielt jedes Level mit seiner Lösung durch (alle müssen „gewonnen“ melden).
`check2.js` prüft die Personen-Regeln (`"out": []` heißt in Ordnung).

## Veröffentlichen

1. In `<ordner>/sw.js` die erste Zeile auf einen neuen Cache-Namen setzen (z. B. `christians-welt-<md5 der index.html>`),
   damit Handys die neue Fassung laden.
2. Commit und `git push origin main`. GitHub Pages ist nach ein bis zwei Minuten aktuell.
3. Vorschau in Claude (und Download-Seite): Einzeldatei ohne Manifest-, Icon- und Service-Worker-Zeilen erzeugen
   (`grep -v 'rel="manifest"\|rel="apple-touch-icon"\|rel="icon"\|serviceWorker' <ordner>/index.html > datei.html`)
   und mit dem Artifact-Werkzeug unter der jeweiligen URL oben neu veröffentlichen.
4. Übersicht der Christian-Welten neu erzeugen: `werkzeug/overview.js` (Screenshots und `data.json`), danach
   `werkzeug/uebersicht-gen.py` mit `uebersicht-vorlage.html`. Im Skript den Ausgabeordner anpassen.

## Stand der Welten

**Schristians Welt / große Welt** (je 10 Welten × 6 Level):
1. Fußball & HSV: Schulhof-Kicker · Bolzplatz · Volksparkstadion · Bengalo Fankurve · Superbowl · Deutscher Meister 2037
2. Musikalische Hunde: Who Let The Dogs Out · Chihuahua · Claudia hat 'nen Schäferhund · Hundi · Young, Wild & Free · Time of Our Lives
3. Reihenendhaus: Renovieren · Einzug in Langenhorn · Garten anlegen · Gartenhaus · Grillabend · Hanf-Ecke
4. Bauernhof (nur 4-Kisten-Level, Scrabble HANF, HAND, HALS, HERZ, HAUT, NASE – Startbuchstaben so gesetzt, dass das Wort am Ende lesbar liegt)
5. Lego: Schiffe · Markt · City · Football · Farm-Simulator · Piepmatz
6. Pinguine: Kuschelecke · Zoo · Traum von der Antarktis
7. Urlaub: Kreta (Schilder „Doppelpups und Hitze“, „Daddy Package“) · Klong! auf Kreta · Schrein oder Grill · Fuerteventura · Gran Canaria? · Showabend mit Cats (Darsteller in Katzenkostümen)
8. Atschibella: Der letzte Lude · Biedermannplatz · Nacht des Wissens · Englischlehrerin · Hochzeit im Hafen · Party im weißen Zelt
9. Atributschi: Spieleabend · Gemeinsam kochen · Prost-Runde · Absacker · Jungle Party · Silvester in Dänemark
10. Enni: Duplo-Turm · Duplo-Bauernhof · Tanzparty · Spielplatz · Planschen · Gute Nacht

Teil 1 im Y2K-Look, Teil 2 im ruhigen Stil 2026 (Hemd und Chino, Strich-Symbole, Atelier, dunkler Modus).

**Idas Welt** (10 Welten × 6 Level aus Microban I, II, III, nach Bestwert sortiert, leichteste zuerst): Ida (8 J., blonder
Bauernzopf, Grau und blasses Pink), Arne und Matze als Onkel (je einmal pro Level an der Wand).
Welten 1–6 und 10 im gleichen schlichten Design (Grundwand, ruhiger Boden, Bildkacheln wie Herz, Stern, Blume, Regenbogen), je Welt
ein eigener Gegenstand: Rosa Ziegel (Kisten) · Holzhaus (Geschenke) · Wolkenzimmer (Ballons) · Heckengarten (Bälle) · Steinburg (Truhen) ·
Fliesenbad (Eimer) · Sternenschloss (Laternen).
Welten 7–9 im Design von Lasses Welt (Teil 1), Code in `werkzeug/t5-lasse.js`:
7. Duplo: Duplo-Zoo (aus Lasses Welt, ohne ZOO-Schild) · Duplo-Bauernhof · Duplo-Traumhaus (beide neu im gleichen Duplo-Stil), je 2 Level, Duplo-Steine in 8 Farben
8. Monster: Wasser · Pflanzen · Blitz · Kampf · Psycho · Feuer (ein Schauplatz pro Level, wie Lasses Taschenmonster-Welten, aber mit eigenen
   Fantasie-Monstern und Fangkugeln), Ida als Trainerin
9. Idas Kinderzimmer (aus Lasses Familien-Welt): Teddy, Puppen, Bett, Puppenhaus, Einhorn, Buch, Mobile; Papa Sören, Mama Anna, Arne und Matze
   je einmal als Bild; geschoben werden die Buchstaben-Klötze I, D, A
`build5.py` sichert dafür Lasses Themen (`IDA_T1`) im Code, bevor Teil 2 sie ersetzt.

## Offene Punkte

- Idas Welt: weitere Welten (1–6, 10) mit Themen versehen, wenn gewünscht.
- Download-Seite enthält noch die alte Fassung von Idas Welt (vor Duplo, Monster, Kinderzimmer).

