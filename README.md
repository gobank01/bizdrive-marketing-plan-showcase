# BizDrive Marketing Plan Showcase

Data-driven Next.js site for publishing evidence-led marketing-plan simulations. The first plan is available at `/toothpaste`, and the architecture supports additional plan routes.

The independently reviewed BizDrive Strategic Marketing Plan Skill student beta is available at `/skill`, with its deterministic ZIP and SHA-256 sidecar under `public/downloads/skill/`.

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
- `app/skill/` — student skill release page
- `public/downloads/skill/` — independently reviewed skill ZIP and checksum sidecar
- `scripts/generate-content.py` — reproducible public content and visual generator; accepts `--source` or `BIZDRIVE_PLAN_SOURCE`

## Evidence and licensing

The page labels verified facts, observations, calculated values and planning hypotheses. Public Customer Voice is privacy-reduced/pseudonymized, not fully anonymous: verbatim quotes and comment/review-level identifiers remain only in the private source, while generalized source URLs and coded analytical fields remain public. Convenience-sample bias is disclosed. Custom SVGs are original project assets. Product names are used for comparative editorial analysis; no partnership or endorsement is implied.

This repository is private. The student package is owner-authorized for distribution with CC BY-NC 4.0 applying to content/examples and MIT applying to scripts/tests. It does not claim to be an official Manus port or runtime.
