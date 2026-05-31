Design tokens & guidelines
==========================

Color tokens (excerpt from `styles.css`):

- `--accent`: #0F6B73 (Deep Provenance Teal) — primary trust color
- `--accent-2`: #3347A9 (Scientific Indigo) — secondary
- `--ok`, `--warn`, `--crit` — status semantics (verified, warning, critical)

Typography
----------
- `Inter` for body and headings; `JetBrains Mono` for tabular figures and code-like numerics.
- Use tabular figures for numeric metrics to improve alignment and audit clarity.

Layout
------
- Three-column cockpit: left (structure/navigation), center (investigation canvas), right (temporal rail and replay controls).
- Timeline is a permanent spatial anchor — keep it visible and sticky where possible.

Microcopy
---------
- Prefer outcome-oriented labels: "Generate evidence", "Trace lineage", "Investigate change".
