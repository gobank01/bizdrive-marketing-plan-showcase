# Step 2 — Competitive Landscape, Customer Voice และ Gap Analysis

## Executive decision

Exactly 10 brands form one fixed comparison set across price, claim, channel, Customer Voice and positioning maps: **DENTISTE', Marvis, APAGARD, CURAPROX Enzycal, VUSSEN, Sensodyne, Colgate Optic White, Oral-B/Crest 3D White, Sparkle, Twin Lotus**. The market is crowded at both “whitening/functional” and “premium design/technology.” The defensible gap is not another strong efficacy promise; it is a Thai-ready premium ritual with product-version proof that is easy to inspect

Observed prices are 2026-08-28 snapshots and may reflect seller/promotion differences. Brand claims below are reported as brand/retailer statements, not independently validated or automatically permissible in Thailand. Machine-readable detailsอยู่ใน `competitor_matrix.csv`

## 2.1 Ten-brand matrix

| Brand / representative product | Segment | Pack | Observed price | Unit price | Claim/technology signal | Positioning / channels | Whitespace vs 350 THB concept |
|---|---|---:|---:|---:|---|---|---|
| DENTISTE' Original | Thai direct premium/freshness | 100 g | 231 | 231/100 g | official page states 14 natural extracts and freshness/oral-hygiene claims [C1] | night/freshness ritual; official D2C + Thai retail | more transparent proof and less overclaim |
| Marvis Whitening Mint | lifestyle/imported premium | 85 ml | 435 | 511.76/100 ml | iconic whitening + intense freshness brand wording [C2] | design/flavor; specialty/import e-commerce | Thai-accessible sensorial premium + proof |
| APAGARD Premio | specialty technology | 105 g | 612 | 582.86/100 g | official Japan page: premium type, medicinal hydroxyapatite wording [C3] | Japanese mineral-tech; import/specialty | localized evidence/claim translation |
| CURAPROX Enzycal 1450 | specialist functional premium | 75 ml | 395 | 526.67/100 ml | official Thai page: 1450 ppm fluoride, mild positioning [C4] | specialist/dental, official Thai | pleasant daily ritual with version-specific evidence |
| VUSSEN 28 Floral Mint | K-beauty whitening specialty | 80 g | 360 | 450/100 g | official Korean page names whitening product; formula not inferred [C5] | numbered whitening system; import marketplace | avoid intensity race; proof/comfort |
| Sensodyne Clinical White | therapeutic mass-premium | 100 g | 149 | 149/100 g | retailer whitening/sensitivity wording; exact Thai official variant unavailable [C6] | pharmacy/mass/marketplace | do not compete with therapeutic authority |
| Colgate Optic White O2 | mass-premium whitening | 85 g | 189 | 222.35/100 g | O2 whitening listing; exact Thai formula not audited [C7] | mass reach + beauty whitening | selective premium and clearer versioning |
| Oral-B/Crest 3D White | mass-premium substitute | 90 g Thai listing | 135 | 150/100 g | official UK reference has stain/fluoride wording; not transferred to Thai variant [C8] | global tech/mass marketplace | product-country-claim transparency |
| Sparkle Triple White | Thai mass-premium | 100 g | 145 | 145/100 g | retailer Triple White/stain language; proof not audited [C9] | Thai beauty retail/marketplace | premium evidence page + sensorial story |
| Twin Lotus Herbaliste | herbal mass-premium | 150 g | 180 | 120/100 g | herbal/flavor-led line; no therapeutic inference [C10] | Thai local heritage/mass | modern ritual without natural-efficacy leap |

## 2.2 Price architecture

Clusters:
1. **Accessible mass/mass-premium:** 120–222 THB/100 g equivalent (Twin Lotus, Oral-B, Sparkle, Sensodyne, Colgate)
2. **Thai direct premium bridge:** DENTISTE' 231 THB/100 g
3. **Imported/specialty premium:** ~450–583 THB/100 g/ml equivalent (VUSSEN, CURAPROX, Marvis, APAGARD)

Trial price 350 บาท/หน่วย cannot be placed precisely until pack size exists. If 75–100 g/ml, it sits above DENTISTE' and mass-premium but below many imported specialty SKUs; if smaller, it may equal/exceed imported unit price. **Pack size is therefore a positioning variable, not packaging detail**

## 2.3 Claim/proof ladder

| Ladder | Competitor signal | Evidence risk | Trial decision |
|---|---|---|---|
| Lifestyle/design/flavor | Marvis, Twin Lotus flavor line | low efficacy risk but weak defendability | usable before product claims if truthful |
| Freshness/night ritual | DENTISTE' | duration/bacterial wording needs substantiation | test ritual language; avoid duration claim |
| Whitening/stain | VUSSEN, Colgate, Oral-B, Sparkle, Sensodyne | dense competition + Thai claim scope | secondary territory only after formula/test review |
| Ingredient/technology | APAGARD mHAP, CURAPROX fluoride/enzyme, O2/3D naming | cross-market/variant mismatch | show exact formula/version/test, not technology halo |
| Therapeutic authority | Sensodyne/specialist brands | highest credibility and compliance bar | no-go without product-specific dossier |

Proof strength in `positioning_map.csv` scores **traceability/specificity visible in this audit**, not clinical quality. A brand name such as “Clinical” is not itself proof

## 2.4 Channel map

| Cluster | Brands | Primary channel logic | Implication |
|---|---|---|---|
| Thai broad access | DENTISTE', Sparkle, Twin Lotus | official/local e-commerce + retail | local story alone is not whitespace |
| Imported lifestyle/specialty | Marvis, APAGARD, VUSSEN | import/specialty marketplaces | availability/price friction creates selective-premium opportunity |
| Specialist/dental | CURAPROX, Sensodyne | dental/pharmacy/specialist + mass | trust context strong; endorsement claims risky |
| Mass-global whitening | Colgate, Oral-B/Crest | mass retail, pharmacy, marketplaces | lower price and promotion pressure |

Trial channel role: D2C/marketplace as conversion lab, creator/short video as message lab, retail/clinic as measured trust/sensory pilot. Do not enter national shelf competition before economics/stock/claim gates

## 2.5 Positioning maps

Files:
- `positioning_map.csv` — ten rows with price, proof, functional, lifestyle, accessibility, exclusivity scores and rationale
- `positioning_maps.svg` — three readable maps

### Map interpretations

1. **Price vs proof:** APAGARD/CURAPROX sit high-price/high-specificity; Marvis high-price/lifestyle; mass brands lower-price with established claim systems. Gap = premium price + proof that ordinary shoppers can inspect, not “most clinical”
2. **Functional vs lifestyle:** Sensodyne/APAGARD/CURAPROX skew functional; Marvis skews lifestyle; DENTISTE'/Sparkle bridge. Desired zone = lifestyle/sensorial with transparent proof bridge
3. **Accessibility vs exclusivity:** mass brands dominate access; imported brands signal exclusivity with friction. Trial can test “selective premium but easy to verify/buy” if contribution and distribution support it

Scores 1–5 are analytical judgments from sources, not measured consumer perceptions

## 2.6 Customer Voice — directional, not representative

`customer_voice.json` contains exactly **100** de-identified public records:
- 60 public review-page records for Colgate Optic White
- 40 public video comments across Marvis, APAGARD, CURAPROX, VUSSEN, Sensodyne, Colgate, Oral-B/Crest and Twin Lotus
- DENTISTE' and Sparkle have 0 retained records because sufficiently specific public comments were not accessible; zero is not “no demand/complaints”
- verified-purchase status was not exposed; variants/countries differ

### Overall themes (multi-label; denominator 100)

| Theme | Count | % | Decision implication |
|---|---:|---:|---|
| Trust/proof | 74 | 74% | evidence/ingredient/variant page is core, not appendix |
| Whitening expectations | 63 | 63% | high demand-language but crowded/high-risk territory |
| Price/value | 46 | 46% | 350 THB needs unit value/WTP and no hidden terms |
| Adverse experience | 33 | 33% | complaint/adverse protocol and gentle-experience testing essential |
| Sensitivity | 27 | 27% | separate comfort report from relief claim |
| Packaging | 21 | 21% | tube/label/dispensing usability can destroy repurchase |
| Taste | 18 | 18% | sensorial blind test is a right-to-win gate |
| Ingredients | 16 | 16% | full formula/claim transparency reduces objection |
| Repurchase | 14 | 14% | build D7/D30 cohort, not first-purchase ROAS only |
| Availability | 9 | 9% | import friction suggests accessible selective premium |
| Foam/texture | 7 | 7% | preference varies; avoid “more foam = better” |
| Freshness duration | 6 | 6% | duration claim requires proof; experience wording safer |

Sentiment coding: negative 45, positive 28, neutral 21, mixed 6. This distribution is **not category sentiment**: 66/100 records belong to Colgate Optic White and the public review site overrepresents adverse/whitening experiences

### Voice examples (privacy-reduced themes; not efficacy evidence)

- Marvis: price/value objection
- CURAPROX: low-foam and mild-taste preference
- VUSSEN: Japanese commenter says Korean toothpaste seems expensive and expresses whitening interest → price + purchase trigger
- Oral-B/Crest: mixed outcome and comfort concern
- ProductReview records include both whitening satisfaction and reports of burning/soreness → never infer causality; create escalation and warning review

Public Customer Voice records are privacy-reduced/pseudonymized, not fully anonymous. Verbatim quotes and comment/review-level identifiers remain only in the private source. The public dataset retains coded analytical fields and generalized source URLs.

## 2.7 Jobs, triggers and objections from competition + Voice

- Functional JTBD: clean routine, desired appearance, manageable taste/foam/comfort, easy replenishment
- Emotional JTBD: confidence that paying more has inspectable reasons
- Social JTBD: use/share a premium brand without feeling misled
- Triggers: clear product truth, attractive sensorial proposition, credible proof, trial/official availability, transparent price
- Objections: “Does it work?”, ingredient/fluoride/SLS questions, sensitivity/adverse concern, price/pack value, fake/variant confusion, packaging failure

## 2.8 Gap analysis / Winning Zone input

### Competitive whitespace
- not another generic whitening promise
- not herbal/natural halo without formula/proof
- not dentist/clinical authority without dossier
- **yes:** pleasant daily sensorial ritual + explicit product/version truth + evidence hierarchy + easy Thai access + honest correction/complaint process

### Brand right-to-win
Currently **unknown**. It must be earned through formula, blind sensorial preference, claim dossier, QC/lot traceability, price/WTP and unit economics. Marketing cannot manufacture this right-to-win

### Primary/secondary/no-go
- Primary provisional: Premium daily ritual × proof transparency
- Secondary experiment: Gentle-brightening comfort concept, claim-safe until evidence
- No-go: disease treatment/prevention, instant/guaranteed whitening, unsupported sensitivity/antibacterial/natural/clinical/dentist claims, fake before-after/quotes/scarcity

## References

- [C1] https://dentiste-oralcare.com/th/products/dentiste-original-toothpaste-tube
- [C2] https://www.marvis.com/en/toothpastes/whitening/
- [C3] https://www.apagard.com/product/detail/premio.html
- [C4] https://www.curaprox.co.th/product/curaprox-enzycal-1450/
- [C5] https://vussen.co.kr/product/뷰센-28-치아미백제-80g플로랄민트향/14/
- [C6] https://www.priceza.com/s/ราคา/Sensodyne-Clinical-White
- [C7] https://www.priceza.com/s/ราคา/Colgate-Optic-White-O2
- [C8] https://www.oralb.co.uk/en-gb/products/toothpaste/oral-b-3d-white-luxe-perfection-twin-pack-2x75ml
- [C9] https://www.priceza.com/s/ราคา/Sparkle-Triple-White
- [C10] https://www.dokbuaku.com/th/products

Full 20-source competitor ledgerอยู่ใน `evidence_ledger.json`; price snapshots and gradesอยู่ใน `competitor_matrix.csv`
