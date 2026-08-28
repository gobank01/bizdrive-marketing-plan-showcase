# Step 10 — KPI, Measurement และ Decision Rules

## Principle

Trial นี้ต้องวัด **product–message–channel fit** ก่อน vanity scale ตัวเลข Best/Base/Worst ด้านยอดขายเป็น arithmetic illustration จาก Step 9 ไม่ใช่ forecast และไม่ใช่ target ที่อนุมัติ

## Tier 1 — Business outcomes

| KPI | Best illustration | Base illustration | Worst illustration | Source/formula |
|---|---:|---:|---:|---|
| Units | 12,450 | 4,980 | 1,476 | tracked spend/CPC×CVR |
| Revenue | 4,357,500 | 1,743,000 | 516,600 | units×350 |
| Total-plan ROAS | 1.452x | 0.581x | 0.172x | revenue/3,000,000 |
| CAC (trackable envelope) | 200.00 | 500.00 | 1,686.99 | 2,490,000/units |
| Contribution/order | ไม่ทราบ | ไม่ทราบ | ไม่ทราบ | needs COGS/fees/returns |
| Repeat purchase | establish cohort baseline | establish cohort baseline | establish cohort baseline | CRM/order cohort |

## Tier 2 — Funnel and marketing KPI

| Stage | Primary KPI | Diagnostic | Guardrail |
|---|---|---|---|
| Awareness | qualified reach, 3/6-sec hold | frequency, completed view, branded search | claim incident = 0 |
| Interest | qualified CTR, engaged session | save/share, theme-coded comments | negative/adverse theme trend |
| Consideration | PDP/proof-page visit, add-to-cart, sample request | FAQ depth, comparison view | evidence mismatch = 0 |
| Conversion | CVR, CAC, contribution/order | checkout abandonment, fee/discount leakage | stop if conservative contribution negative |
| Loyalty | complaint rate, repeat intent/purchase | D7/D30 response, referral | consent/block/adverse escalation |

No fixed CPM/CPC/CTR is treated as fact. Week 1 establishes same-channel controls; Week 2 onward evaluates relative lift and confidence/volume

## Tier 3 — Content KPI

- 3-sec hook retention and 6-sec hold by hook family
- 25/50/75/100% view-through by duration
- saves/shares and qualified comment themes per 1,000 views
- evidence-page click, sample request and assisted purchase per asset
- creator code sales plus post-purchase “how heard” response
- correction/claim incident and moderation escalation
- asset reuse yield: number of compliant variants per master shoot

## Customer Voice dashboard

Report overall and by brand/source/theme: taste, freshness duration, whitening expectations, sensitivity, foam/texture, ingredients, packaging, price/value, trust/proof, repurchase, availability and adverse experience. Show record count/denominator every time; missing brand data must not be shown as zero demand. Convenience sample is directional and source/platform bias is explicit

## Attribution design

1. Platform view: optimization signal only
2. Web/order view: UTM, click ID, session, order, fee/discount/return
3. Offline view: location/cell QR and follow-up cohort
4. Creator view: unique link/code + post-purchase survey
5. Incrementality: holdout/geo/time split when volume permits
6. Finance reconciliation: order revenue ≠ cash contribution; reconcile VAT/fees/returns

## Reporting cadence

| Cadence | Audience | Contents | Decision |
|---|---|---|---|
| Daily | media/ops | spend, delivery, tracking, stock, claim/complaint alerts | pause anomalies |
| Twice weekly | creative/product | hook, themes, evidence questions, moderation | next creative batch |
| Weekly | owner + leads | funnel, cohort, contribution proxy, experiment results | stop/iterate/scale/reserve |
| Monthly | owner/finance | reconciled orders, fees, returns, repeat, inventory | budget reforecast proposal |
| End trial | owner | causal limitations, winning/losing hypotheses, evidence gaps | no-go / second pilot / scale request |

## Data quality checks

- UTM completeness ≥95% for trackable paid/creator links (planning threshold)
- no duplicated order IDs; refunds/returns backfilled
- denominator and date window attached to every rate
- brand/source/theme counts reconcile to Customer Voice record total
- dashboard version, timezone and currency documented
- PII minimized; survey/CRM consent purpose-limited

## Stop/scale decision rules

### Stop immediately
- claim/evidence/version mismatch
- adverse experience pattern or unsafe-use signal requiring review
- broken consent/tracking that invalidates the experiment
- stock/lot/fulfillment uncertainty

### Iterate
- creative signal weak after two comparable cycles
- high engagement but low qualified PDP/sample behavior
- conversion exists but contribution input incomplete
- one cohort wins but replication absent

### Limited scale proposal
- winner replicates across ≥2 cohorts/creatives
- product/claim gate passed
- conservative contribution/order positive
- complaint/adverse rate acceptable to owner/product/regulatory
- stock/SLA ready
- owner gives separate spend approval

## Missing inputs required before targets become commitments

COGS, gross margin, fees, discount, VAT, return rate, pack/dosage/replenishment, production capacity, distribution SLA, baseline traffic/brand awareness, registration/claim dossier and adverse-event protocol
