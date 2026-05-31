Workflow Process — Provenance OS
===============================

High level process used by the team when delivering changes.

1. Plan
- Capture design intent in `01 - Planning` (use Web UX plan v2).

2. Implement
- Make small, reviewable commits in a feature branch.
- Preserve runtime IDs consumed by `main.js` or update `main.js` together.

3. Validate
- Run Lighthouse via CI and review `lighthouse.json` artifact.
- Run keyboard-only navigation and screen reader spot-checks.

4. Release
- Merge to `main` and deploy to Vercel using `vercel --prod --yes`.
- Attach CI artifacts to release notes.

5. Post-release
- Update `DocumentedChanges.md` and `activity_tracking.md`.
