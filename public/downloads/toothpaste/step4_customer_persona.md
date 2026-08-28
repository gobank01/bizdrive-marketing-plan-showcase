# Step 4 — Customer Voice, Segmentation, Personas และ Journey

## Research basis and warning

Persona ทั้งหมดเป็น **marketing hypotheses** จาก 100 public Customer Voice records + market/channel evidence ไม่ใช่ demographic survey ไม่อ้างว่าช่วงอายุ รายได้ หรือสัดส่วนเป็นตัวแทนประเทศไทย. Focus 60/30/10 เป็นการจัดสรรความสนใจทดลอง ไม่ใช่ market size

Voice sample composition:
- 60 records: public review pages, Colgate Optic White
- 40 records: public video comments across 8 brands
- 66/100 recordsเป็น Colgate Optic White; DENTISTE'/Sparkleไม่มี retained record; VUSSENมี 2
- all records de-identified; verified-purchase status not exposed; source URL/date preserved in `customer_voice.json`

Therefore theme rates describe **this corpus only** and are directional

## 4.1 Overall Voice coding

| Theme | Count / 100 | Positive/useful tension | Negative/unmet need |
|---|---:|---|---|
| Trust/proof | 74 | people seek ingredients, method and real result | doubt, variant mismatch, untraceable claims |
| Whitening expectations | 63 | strong appearance interest | result variability and overpromising |
| Price/value | 46 | willing to test if value clear | expensive, small pack, promotion/availability friction |
| Adverse experience | 33 | demand for clearer usage/support | burning/soreness/irritation reports; no causal inference |
| Sensitivity | 27 | comfort is part of experience | whitening/strong sensation trade-off |
| Packaging | 21 | premium pack can aid ritual | flaking tube, size/value, legibility/usability |
| Taste | 18 | mint/flavor is meaningful | too strong, aftertaste, preference conflict |
| Ingredients | 16 | transparency builds trust | SLS/fluoride/peroxide/hydroxyapatite questions |
| Repurchase | 14 | repeat/use-over-time matters | first result does not guarantee loyalty |
| Availability | 9 | official/accessible supply reduces friction | import/store/fake concern |
| Foam/texture | 7 | mild/low-foam can differentiate for some | others equate foam with legitimacy/cleaning |
| Freshness duration | 6 | daily ritual language | duration claim needs proof |

Sentiment labels: negative 45, positive 28, neutral 21, mixed 6. Because adverse reviews are concentrated in one source/brand, this is not market sentiment and does not establish product causation

## 4.2 Brand-level denominators

| Brand | n | Dominant coded signals | Limitation |
|---|---:|---|---|
| DENTISTE' | 0 | no retained voice | inaccessible ≠ no demand |
| Marvis | 8 | whitening 7, value 6, taste 4 | small video-comment sample |
| APAGARD | 6 | proof 5, ingredient/value 3 each | mixed questions/anecdotes |
| CURAPROX Enzycal | 4 | product/formula questions, low-foam/mild taste excerpts | multilingual tiny sample |
| VUSSEN | 2 | price/purchase interest | Japanese comments; no post-use review |
| Sensodyne | 5 | whitening 3, proof 3 | tiny sample |
| Colgate Optic White | 66 | proof 53, whitening 51, value 34, adverse 31 | dominates corpus; variant/country mix |
| Oral-B/Crest 3D White | 7 | proof 4, whitening/taste 2 each | small video sample |
| Sparkle | 0 | no retained voice | inaccessible ≠ no demand |
| Twin Lotus | 2 | ingredient/packaging | tiny and partly pre-purchase |

## 4.3 Privacy-reduced customer language themes

- Price/value objection
- Proof and ingredient-transparency need
- Foam, texture and mild-taste preference
- Mixed benefit and comfort tension
- Flavor and variant confusion
- Packaging and local-access signal

Do not convert these themes into testimonial copy. Use them to write research questions, FAQ and concept language. Public Customer Voice records are privacy-reduced/pseudonymized, not fully anonymous. Verbatim quotes and comment/review-level identifiers remain only in the private source.

## 4.4 Segmentation / STP hypotheses

### Need states
1. **Ritual upgrader:** wants pleasant, premium daily use and is willing to pay more if repeated use feels worth it
2. **Appearance seeker with caution:** interested in brighter-looking teeth but worries about sensitivity, overclaim and proof
3. **Ingredient/proof controller:** wants formula/label/variant clarity and dislikes marketing ambiguity
4. **Therapeutic substitute seeker:** has specific concerns and compares specialist brands; high compliance risk for a new brand

Targeting: 1 primary, 2 secondary, 3 tertiary. Segment 4 is not targeted with treatment language; route specific health concerns to qualified dental advice

## Persona 1 — “เมย์: Ritual & Proof Upgrader” (Primary, 60% focus)

> Hypothesis only: 28–44, urban working adult, middle-to-upper discretionary spend. Age/income must be validated; no claim this is the largest Thai demographic

- Visual direction (not evidence): morning/evening bathroom routine, minimal pack, ingredient/evidence page on phone
- Geography hypothesis: Bangkok/major city + e-commerce access
- Psychographics: design-aware, convenience-oriented, pays more when quality is visible, skeptical of empty luxury
- Pain points: strong/odd taste, messy pack, unclear difference, seller/variant confusion, “premium” without proof
- Functional JTBD: make a twice-daily routine easy and pleasant
- Emotional JTBD: feel the 350 THB purchase is rational and self-respecting
- Social JTBD: recommend a transparent brand without sharing exaggerated claims
- Triggers: blind sensorial preference, clear full formula/pack, verified official store, evidence hierarchy, trial size/low-risk offer
- Objections: pack too small, taste unknown, no real proof, imported alternatives have more heritage
- Media: TikTok/IG for discovery; Google/YouTube/SEO for proof; marketplace for price/availability; LINE for repeat — hypothesis to test [M1][M2]
- Key message: **“ทุกวันน่าใช้ขึ้น และทุกคำสำคัญตรวจต่อได้”**

## Persona 2 — “นัท: Appearance Seeker, Evidence First” (Secondary, 30%)

> Hypothesis only: 22–38, beauty/personal-care shopper; gender and income intentionally not fixed

- Visual direction: coffee/social/photo context + side-by-side evidence checklist, not before-after claim
- Pain points: whitening expectation vs sensitivity/comfort, too many variants, distrust of edited results, price/promotion confusion
- JTBD Functional: explore appearance benefit without hidden trade-off
- Emotional: confidence without fear/FOMO
- Social: look prepared/polished without making medical claims
- Triggers: relevant test method, honest limitation, controlled concept trial, clear complaint/support
- Objections: “Will it work for me?”, “Will it feel harsh?”, “Why only this result?”, “Which variant is real?”
- Media: TikTok/creator for discovery, YouTube/search for mechanism, review pages/marketplace for validation
- Key message: **“สนใจความสว่างได้ แต่อย่าแลกกับคำสัญญาที่หลักฐานไม่ถึง”**
- Compliance: no whitening efficacy message until formula/product-specific evidence/Thai review pass [R1]

## Persona 3 — “อาร์ม: Ingredient & Comfort Controller” (Tertiary, 10%)

> Hypothesis only: 30–50, highly involved oral-care comparer; may have self-reported comfort concerns but is not diagnosed by this plan

- Visual direction: label/ingredient table, variant ID, mild taste/foam preference selector
- Pain points: SLS/fluoride/peroxide/hydroxyapatite questions, discomfort reports, low-foam legitimacy doubt, cross-country variant mismatch
- JTBD Functional: choose exact product version with understandable formula/usage
- Emotional: reduce uncertainty/control risk
- Social: share verifiable information rather than anecdotal certainty
- Triggers: full INCI/ingredients, exact pack/version, test scope, usage/warning, customer support/adverse pathway
- Objections: vague “gentle/safe/natural,” missing concentration, expert halo without source
- Media: Google/YouTube long-form, official product/evidence page, clinic/pharmacy context
- Key message: **“แยกความรู้สึกขณะใช้จากคำอ้างบรรเทาอาการ และเลือกจากข้อมูลจริง”**
- Compliance: do not diagnose or claim sensitivity relief/medical prevention without evidence [R1][R2]

## 4.5 Customer Journey and experiments

| Stage | Customer question | Evidence/content | Experiment | KPI |
|---|---|---|---|---|
| Trigger | “ทำไมต้องจ่าย 350?” | unit value + product truth | price/pack framing | qualified interest/WTP |
| Explore | “ต่างจาก 10 แบรนด์อย่างไร?” | rubric, not unsupported superiority | ritual vs proof landing | evidence-page visit |
| Validate | “ส่วนผสม/ผล/รีวิวจริงไหม?” | formula/version/test/source | proof-page order | FAQ depth/save |
| Trial | “รส/โฟม/ความรู้สึกเหมาะไหม?” | blind protocol + usage/warnings | sampling cells | feedback/complaint |
| Purchase | “ราคา/ส่ง/คืน/ของแท้?” | terms, official channel | marketplace/D2C | CVR/contribution |
| Use | “ใช้แล้วเป็นอย่างไร?” | D0/D7/D30 diary | cohort survey | comfort/theme mix |
| Repeat | “คุ้มพอซื้อซ้ำไหม?” | replenishment only when pack known | reminder/bundle | repeat contribution |
| Advocate/support | “แชร์/ร้องเรียนอย่างไร?” | consented exact review + escalation | referral/support flow | verified review/closure |

## 4.6 Product brief implications

Before positioning commitment, product team must validate:
- blind taste/texture/foam/after-feel
- packaging dispensing/legibility/flaking/storage
- formula and ingredients that answer observed questions without halo claims
- appropriate usage/warning/complaint/adverse escalation
- pack size and WTP at 350 THB
- relevant whitening/comfort evidence only if these territories remain

## 4.7 Research next step

Conduct owner-approved Thai primary research: 15–20 qualitative interviews across need states, blind sensorial test, and a concept/WTP survey with declared sampling method. Avoid forcing age/gender stereotypes; recruit by behavior/need. Keep marketing consent separate from research consent

## References

- [M1] https://www.kantar.com/inspiration/fmcg/every-shopping-trip-counts-for-fmcg-in-thailand
- [M2] https://newsroom.tiktok.com/th-th/shoppertainment-2-0-insights-for-brands
- [R1] https://cosmetic.fda.moph.go.th/media.php?id=932880783562121216&name=คู่มือแนวทางการโฆษณา%20(update%2025-09-2567).pdf
- [R2] https://cosmetic.fda.moph.go.th/media.php?id=478079913589612544&name=(1)%20พระราชบัญญัติเครื่องสำอาง%20พ.ศ.%202558.pdf
- [V1] https://www.productreview.com.au/listings/colgate-optic-white
- [V2] https://www.youtube.com/watch?v=mQKjdn6VkGI
- [V3] https://www.youtube.com/watch?v=legMfEBYD5g
- [V4] https://www.youtube.com/watch?v=BWFhmU4DFMA

Full record-level provenanceอยู่ใน `customer_voice.json`; theme arithmeticอยู่ใน `voice_analysis.json`
