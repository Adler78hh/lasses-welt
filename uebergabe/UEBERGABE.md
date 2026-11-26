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
- Idas Welt ist auf Lasses Welt aufgebaut (nicht auf Christians Spiel) und übernimmt Lasses Taschenmonster unverändert. Ausdrücklicher Wunsch.
- Lösungsbuch nur im Cheat-Profil. In Christians Spielen und Idas Welt kommen die Lösungen beim Bauen aus `t3-`, `t4-` bzw. `t5-levels.json` (über den Levelnamen zugeordnet).

## So werden die Spiele gebaut

Alle Werkzeuge liegen in `werkzeug/` (siehe auch `werkzeug/LIESMICH.md`).

1. `python3 werkzeug/build3.py` – baut **Schristians Welt** aus `grosse-welt/index.html` + `t3.js` + `t3.css`.
2. `python3 werkzeug/build4.py` – baut **Schristians große Welt** aus Schristians Welt + `t4.js` + `t4.css`.
3. `python3 werkzeug/build5.py` – baut **Idas Welt** aus **Lasses Welt** (`index.html`) + `t5.js` + `t5-w12.js` + `t5-w3.js` + `t5-lasse.js` + `t5-ende.js` (Level: `t5-levels.json`).
   Rahmen, Weltkarte, Knöpfe und Schauplätze 7–9 kommen direkt von Lasse; Lasses Datei selbst wird dabei nicht verändert.

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

**Idas Welt** (10 Welten × 6 Level aus Microban I, II, III, nach Bestwert sortiert, leichteste zuerst), gebaut auf **Lasses Welt (Teil 1)**:
gleicher Rahmen, gleiche Weltkarte und Knöpfe wie bei Lasse. Ida (8 J., blonder Bauernzopf, Grau und blasses Pink) im Zeichenstil von Lasse
(Lasses Körper, eigener Kopf; in Lasses Schauplätzen trägt sie Lasses Outfits). Arne und Matze als Onkel (je einmal pro Level an der Wand).
Welten mit eigenem Thema (Zeichenstil von Lasses Welt, Kacheln mit `pad`):
1. Warnowblick (`t5-w12.js`): An der Warnow · Im Park · Garten mit Rehen (je 2 Level), Blumentöpfe auf Beete
2. Bützow (`t5-w12.js`): Stiftskirche · Rathaus am Markt · Krummes Haus (Backsteine), dann Schulkind in Bützow: Klassenzimmer · Schulhof · Schulweg (Schulranzen)
3. Dinosaurier (`t5-w3.js`): Pflanzenfresser · Flugsaurier · Fleischfresser (je 2 Level), Dino-Eier in Nester; Idas Lieblingsdino
   Triceratops ist überall (Wände, Begleiter, groß am Rand, Emblem), Ida als Dino-Forscherin
Welten 4–6 und 10 noch schlicht (Grundwand, Bildkacheln): Heckengarten (Bälle) · Steinburg (Truhen) · Fliesenbad (Eimer) · Sternenschloss (Laternen).
Welten 7–9 direkt aus Lasses Welt (Themen `lego`, `pokemon`, `familie` werden in `t5-lasse.js` angepasst):
7. Duplo: Duplo-Zoo (wie bei Lasse) · Duplo-Bauernhof · Duplo-Traumhaus (beide neu im gleichen Duplo-Stil), je 2 Level
8. Taschenmonster: Lasses Welt mit allen sechs Schauplätzen und Lasses Monstern (Panzerli, Apfelbrumm, Blitzi, Kiesel, Gedankling, Glutdrache), ein Schauplatz pro Level
9. Idas Kinderzimmer (aus Lasses Familien-Welt): Teddy, Puppen und Lasses Zusatzbilder; Papa Sören, Mama Anna, Arne und Matze je einmal als Bild;
   geschoben werden die Buchstaben-Klötze I, D, A

## Offene Punkte

- Idas Welt: geplant Welt 4 Helden (Hunde in deutschen Uniformen, angelehnt an Paw Patrol; drei Level mit blauen Hunden, angelehnt an Bluey) und Welt 5 Brettspiele (Klassiker, UNO, „Wer war es?“, Meeple im Zirkus).
- Download-Seite enthält noch die alte Fassung von Idas Welt (vor Duplo, Monster, Kinderzimmer).

