## Provenance OS — Production (Executive Summary)

Release: v1.0.0-prod

Provenance OS is a lightweight, production-ready frontend showcasing a "Computational Evidence Workspace" that highlights evidence, time, and trust relationships. This repository contains the static site used for stakeholder demos and executive review.

**Demo:** https://provenance-os.vercel.app

**Key outcomes:**
- Product-ready three-column cockpit UI emphasizing evidence discovery and temporal tracing.
- Outcome-oriented microcopy (e.g., "Generate evidence", "Trace lineage") tailored for non-technical stakeholders.
- Accessibility improvements: keyboard navigation for interactive SVGs, visible focus states, and CI-run Lighthouse audits.

**What stakeholders should know:**
- Audience: senior marketing managers and UI/UX strategy leads — this build is intended for product demos and strategy review.
- Where to view: open the live demo above or [index.html](index.html) locally for offline review.
- Executive takeaway: the interface demonstrates provenance workflows (identify → verify → trace) and supports concise storytelling for buyer conversations.

**Next steps (recommended):**
- Approve the demo copy and hero outcomes for marketing assets.
- Request a short product demo recording (30–60s) that highlights the three-column cockpit and temporal rail.
- Sign off on accessibility checklist items (CI Lighthouse artifact is available in the workflow run).

Developer notes (condensed)
- Production entry: [index.html](index.html) — preserve DOM hook IDs used by `main.js` when changing layout.
- Styles: [styles.css](styles.css) — design tokens and layout.
- Runtime: [main.js](main.js) — rendering logic for topology, timeline, incidents, and drawer.
- Accessibility helper: [keyboard-a11y.js](keyboard-a11y.js).

Internal engineering and archival documents have been moved to `.internal/docs/` to keep the public surface focused on stakeholder-facing content.

For development setup and contribution guidelines, see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
