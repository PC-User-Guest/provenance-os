Deployment
==========

This project is deployed to Vercel as a static site. Deploy steps and tips below.

Using Vercel CLI
----------------
1. Install Vercel CLI: `npm i -g vercel` (optional)
2. From `03 - Prod` run:

```powershell
vercel --prod --yes
```

CI
--
- GitHub Actions contains a Lighthouse job (`.github/workflows/lighthouse.yml`) that runs the site on a local static server and executes Lighthouse. It uploads `lighthouse.json` as an artifact for release records.

Best practices
--------------
- Keep the production `03 - Prod` folder small and static – avoid large runtime build steps here.
- Commit `lighthouse.json` artifacts if you want a permanent snapshot for a release (CI will upload them as workflow artifacts).
