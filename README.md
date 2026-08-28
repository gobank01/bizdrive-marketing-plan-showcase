# BizDrive Marketing Plan Showcase

Data-driven Next.js site for publishing evidence-led marketing-plan simulations. The first plan is available at `/toothpaste`, and the architecture supports additional plan routes.

## Current plan

- Premium toothpaste trial for Thailand
- 10-brand competitive set
- 100 privacy-reduced/pseudonymized Customer Voice records (not fully anonymous)
- 41 evidence-ledger entries
- 30 short-video scripts
- 14 purposeful editorial/data visuals
- THB 1,000,000 monthly budget / three-month plan

## Local development

```bash
npm install
npm test
npm run lint
npm run dev
```

Open `http://localhost:3000/toothpaste`.

## Production validation

```bash
npm run build
npm start -- -p 3100
npm run qa:browser
```

Browser QA looks for Chrome in common macOS/Linux locations. Override the executable with `CHROME_EXECUTABLE_PATH` and the target server with `QA_BASE_URL`.

## Content architecture

- `content/toothpaste/` — plan config, 14 Markdown reports and machine-readable datasets
- `app/toothpaste/` — current canonical plan route
- `components/toothpaste-plan.tsx` — current category presentation
- `public/images/toothpaste/` — original editorial/data visuals
- `public/downloads/toothpaste/` — report and source-data downloads
- `scripts/generate-content.py` — reproducible public content and visual generator; accepts `--source` or `BIZDRIVE_PLAN_SOURCE`

## Evidence and licensing

The page labels verified facts, observations, calculated values and planning hypotheses. Public Customer Voice is privacy-reduced/pseudonymized, not fully anonymous: verbatim quotes and comment/review-level identifiers remain only in the private source, while generalized source URLs and coded analytical fields remain public. Convenience-sample bias is disclosed. Custom SVGs are original project assets. Product names are used for comparative editorial analysis; no partnership or endorsement is implied.

This repository is private. Upstream BizDrive/Manus skill licensing was not explicit, so this repository does not claim to be an official Manus port or runtime.
