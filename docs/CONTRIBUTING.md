Contributing to Provenance OS
=============================

Thank you for contributing. This document contains minimal, pragmatic rules inspired by the Signal Mesh project structure.

Branching & PRs
---------------
- Work in feature branches: `feature/<short-description>`.
- Open Pull Requests targeting `main` and include a short description and screenshots if UI changes are involved.

Commits
-------
- Use concise, present-tense commit messages. Example: `Refactor: move timeline to temporal rail`.
- Group UI and behavior changes in a single PR when they are tightly coupled.

Code quality
------------
- Run a local static server and verify the console has no errors before opening a PR.
- Keep changes small and reviewable.

Testing & CI
------------
- A GitHub Action runs Lighthouse on push and uploads `lighthouse.json` as an artifact. Use it to verify performance and accessibility regressions.

Review checklist
----------------
- Preserve DOM IDs required by `main.js` or update `main.js` accordingly.
- Verify keyboard navigation on key interactive surfaces (topology nodes, drawer controls, timeline scrubber).
- Check small-label contrast and focus visibility for accessibility.
