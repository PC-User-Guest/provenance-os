Development notes
=================

Local workflow
--------------
1. Start a static server from `03 - Prod`:

```powershell
npx http-server . -p 4173 --silent
```

2. Open `http://127.0.0.1:4173` and use the browser devtools console to watch for errors.

Editing UI
---------
- Primary files: `index.html`, `styles.css`, `main.js`.
- If you move or rename DOM elements that `main.js` expects, update `main.js` in the same PR.

Keyboard accessibility
----------------------
- `keyboard-a11y.js` provides lightweight keyboard focus support for dynamically rendered SVG circles.
- Ensure elements you intend to be interactive have `tabindex="0"` and accessible labels/aria attributes.

Data fixtures
-------------
- Use `data/provenance.json` (or equivalent) during development to seed the UI. Keep fixtures small and representative.
