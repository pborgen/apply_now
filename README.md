# apply_now

Automated job search + apply (LinkedIn + Workday) using OpenClaw browser plugin.

## Setup

```bash
npm i
cp config.example.json config.json
npm run dev
```

Open UI at: http://localhost:5179

## Config
- `criteria`: keywords, titles, locations, levels, salary ranges
- `sources`: enable LinkedIn/Workday + max results
- `automation`: fully-automated | review | search-only

## Notes
- Uses the OpenClaw browser plugin with your saved sessions (no stored creds).
- Full automation may trigger anti-bot protections; use responsibly.
