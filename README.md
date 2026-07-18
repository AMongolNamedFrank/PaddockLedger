# GridLedger

GridLedger is a lightweight Formula 1 card checklist MVP for:

- 2025 Topps Chrome Formula 1
- 2025 Topps Chrome Sapphire Formula 1

The first build is local-first: checklist seed data lives in JSON, card images are static files under `public/card-images`, and collection status plus quantity are persisted in browser local storage.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/checklist`.

## Useful Scripts

```bash
npm run typecheck
npm run build
```
