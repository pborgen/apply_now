# apply_now

Automated job search + apply (LinkedIn + Workday) using OpenClaw browser plugin.

## Setup

```bash
npm i
cp config.example.json config.json
npm run dev
```

Run API + UI:

```bash
npm run dev         # API server (http://localhost:5179)
npm run ui:dev      # Vite UI (http://localhost:5173)
```

## Config
- `criteria`: keywords, titles, locations, levels, salary ranges
- `sources`: enable LinkedIn/Workday + max results
- `automation`: fully-automated | review | search-only

## LinkedIn import
- For now, the app loads a cached profile from `.data/linkedin_profile.json`.
- I’ll add the OpenClaw live-scrape step next (code-first approach, run later).

## LinkedIn job scraping (Programming / IT jobs)
- Added a LinkedIn job scraping module with a search URL builder.
- Needs a browser driver (OpenClaw plugin) to execute in a logged-in session.

## Notes
- Uses the OpenClaw browser plugin with your saved sessions (no stored creds).
- Full automation may trigger anti-bot protections; use responsibly.
