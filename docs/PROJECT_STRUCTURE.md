Project Structure — Provenance OS (Prod)
=========================================

Purpose
-------
This document explains the on-disk layout for the production site and where to find source artifacts.

Top-level layout (in `03 - Prod`):

- `index.html` — Entry point for production UI. Keep DOM hook IDs stable.
- `styles.css` — Tokens, component styles, layout rules.
- `main.js` — UI behavior: rendering the topology, incidents, timeline, and drawer interactions.
- `keyboard-a11y.js` — Focus helpers for SVG nodes.
- `data/` — (optional) JSON fixtures consumed by `main.js` during development.
- `.github/workflows/` — CI jobs (Lighthouse, optional deployment checks).
- `docs/` — Project documentation files.

Editing guidance
----------------
- When changing layout, verify `main.js` DOM expectations or update `main.js` in the same commit.
- Keep the `index.html` microcopy and action labels outcome-oriented (e.g., "Generate evidence").
- Avoid introducing large binary assets into this folder – prefer external asset hosting or `data/` fixtures.
