# Simple Calculator

 

## Features

- ✨ Grundrechenarten (Addition, Subtraktion, Multiplikation, Division)
- 🔢 Dezimalzahlen-Unterstützung
- ⌨️ Tastatur-Support
- ⚡ Sofortige Berechnung
- 🧪 Test-Suite inklusive

## Live Demo

Sie können den Taschenrechner hier ausprobieren: [Live Demo](https://tourmaline-twilight-68a5a8.netlify.app/)

## Installation

1. Klonen Sie das Repository:
```bash
git clone https://github.com/neslihko/calculator-js
cd calculator
```

2. Installieren Sie die Abhängigkeiten (für Tests):
```bash
npm install
```

## Nutzung

Öffnen Sie einfach die `index.html` in einem Browser oder nutzen Sie einen lokalen Server:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js
npx serve
```

### Tastatur-Shortcuts

- `0-9`: Zahlen eingeben
- `+ - * /`: Operatoren
- `.`: Dezimalpunkt
- `Enter`: Berechnen
- `Escape`: Alles löschen
- `Backspace`: Letzte Eingabe löschen

## Tests

Das Projekt verwendet Jest für Tests. Um die Tests auszuführen:

```bash
# Einmalig Tests ausführen
npm test

# Tests im Watch-Mode ausführen
npm run test:watch
```

## Projekt-Struktur

```
calculator/
├── index.html       # HTML-Struktur
├── style.css        # Styling
├── script.js        # Calculator-Logik
├── script.test.js   # Tests
├── package.json     # Projekt-Konfiguration
└── README.md        # Dokumentation
```

## Technologien

- Vanilla JavaScript
- HTML5
- CSS3
- Jest für Tests

## Entwicklungsaufgaben

Diese Anwendung wurde als 4-Stunden-Programmieraufgabe entwickelt mit Fokus auf:
- Sauberen, verständlichen Code
- Grundlegende Taschenrechner-Funktionalität
- Fehlerbehandlung
- Testabdeckung

