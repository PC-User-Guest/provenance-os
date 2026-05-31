# Provenance OS — Production

Release: v1.0.0-prod

Provenance OS implements a "Computational Evidence Workspace" focused on evidence, time, causality, and trust. This `03 - Prod` folder contains the production-ready static site and short-form documentation for contributors and release engineers.

Quick start (local)
-------------------
Requirements:
- Node.js (LTS)
- `git`

Run a lightweight static server from this folder:

```powershell
# from D:\Workspace\Figma (2026)\Provenance OS\03 - Prod
npx http-server . -p 4173 --silent
# then open http://127.0.0.1:4173
```

Project structure (summary)
---------------------------
- `index.html` — production entry HTML. Preserve DOM IDs used by `main.js`.
- `styles.css` — design tokens, layout, and component styles.
- `main.js` — front-end runtime that wires data to the DOM.
- `keyboard-a11y.js` — small helper to make SVG nodes keyboard-focusable.
- `.github/workflows/lighthouse.yml` — CI job that runs Lighthouse and uploads `lighthouse.json`.
- `docs/` — project documentation (this folder).

Design & strategy links
-----------------------
The UI implements the principles from `01 - Planning/Web UX and UI Implementation plan - version 2.md` (three permanent navigation dimensions: Space, Time, Trust). Use that file as the canonical product strategy reference.

Development notes
-----------------
- Preserve the following DOM IDs (used by `main.js`) when adjusting layout or refactoring:
  - `pulseGrid`, `heroProjects`, `heroAccuracy`, `heroVerify`, `trustScore`, `trustSpark`, `incidentList`, `topologyGraph`, `topologyEdges`, `topologyNodes`, `topologyLabels`, `timeScrubber`, `timeLabel`, `drawerTitle`, `drawerSubtitle`, `drawerMetrics`, `drawerSchema`, `drawerLineage`, `drawerActions`, `drawerClose`, `replayRange`, `replayValue`, `replayRisk`, `resilienceGrid`.

Accessibility & audits
----------------------
- A GitHub Actions workflow runs Lighthouse on push and uploads `lighthouse.json` as a workflow artifact. Use that report as the canonical performance/accessibility snapshot.

Contributing
------------
See `docs/CONTRIBUTING.md` for guidelines on commits, PRs, and testing.

License
-------
No license file is included by default — add `LICENSE` if you intend to publish or open-source the project.
