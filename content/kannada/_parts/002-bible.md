# Lesson 2 — "ರವಿಯ ಮನೆ" (Ravi's house) — STORY BIBLE

Audience: an English-speaking adult who finished Lesson 1 (Rao family / dowry story). Goal: one serious, realistic, continuous ~90-minute story that pushes from B1 to B2+ and makes the learner confident speaking about money, property, government offices, construction and renting. **No jokes for their own sake, no silly lines.** Warmth and humour only where real people would have it.

## Hard rules for writers
1. Format: YAML list items exactly like `content/kannada/001.yaml`: `{ who, t, tr, en }` (all strings double-quoted) and `scene:` captions (short English stage directions, read aloud by a narrator). Also use `section:` + `learn:` items at the start of each scene, like Lesson 1 (see 001.yaml) — `section` = emoji + short title, `learn` = the language points taught there.
2. Language: natural 2026 Bengaluru spoken Kannada for family and private talk; **a clearly more formal register in government offices and with professionals** — but REALISTIC: officials speak colloquial verb endings in person ("ನಾಳೆ ಬನ್ನಿ ಸಾರ್", "ಅರ್ಜಿ ಹಾಕಿ") mixed with formal Sanskrit-derived nouns (ಅರ್ಜಿ, ಶುಲ್ಕ, ಪ್ರಮಾಣಪತ್ರ, ಅನುಮತಿ, ಸಲ್ಲಿಸಬೇಕು) and plenty of English terms; politeness comes from ನೀವು, -ಅವರು, ಸಾರ್/ಮೇಡಂ, and the request ladder ಸ್ವಲ್ಪ… / ಕೊಡ್ತೀರಾ? / ಕೊಡ್ಬೋದಾ? / ಮಾಡ್ಕೊಡಿ / ಬೇಕಾಗಿತ್ತು / ಅಂತ ಇದ್ದೆ (see kannada_language.md §1). Use ತಾವು and ದಯವಿಟ್ಟು rarely (very deferential/stiff). Bookish -ತ್ತೇನೆ endings only when someone reads a notice or document aloud. English loans exactly where Bengaluru people use them (khata, EC, sale deed, plan approval, meter, loan, EMI, site, cement, slab). Kannada script must be correct; `tr` simplified ISO with macrons (ā ī ū ē ō ṭ ḍ ṇ ḷ ṣ ś); `en` natural English conveying tone.
3. **Reuse Lesson 1 vocabulary heavily** (see `research_notes/Lesson 2 property/lesson1_vocab.txt`) and introduce new words steadily. Every scene should contain several new domain words, introduced in context so they are understandable (someone explains or the context makes it obvious).
4. Difficulty ladder: chapter 1 ≈ B1 (still clear, medium sentences); offices and negotiations B2 (long turns up to ~40 words, conditionals, concessives, reported speech, passive-like -ಲಾಗುತ್ತದೆ/-ಆಗುತ್ತೆ, causatives, relative clauses, formal requests, numbers in lakhs/crores, dates, percentages).
5. Each office/department conversation is its own section with **depth: documents, fees, timelines, rules, positives AND frustrations** (queues, missing papers, delays, a hinted request for "speed money" that Ravi politely refuses — never instructional).
6. Facts: use `research_notes/Lesson 2 property/process_facts.md` (dated, sourced). Don't state anything marked uncertain as certain; characters can express uncertainty naturally ("ಇನ್ನೂ ಸ್ಪಷ್ಟ ಆಗಿಲ್ಲ ಅಂತೆ").
7. Kannada language notes: `research_notes/Lesson 2 property/kannada_language.md` (register, domain vocabulary, North-Karnataka dialect for the mestri, proverbs, grammar checklist).
8. Validate your YAML with js-yaml before finishing (command below). Do not edit any other file.

## Timeline (fits real events)
- 2019–2024: Ravi and Deepa save.
- Jan–Mar 2025: plot search, purchase (e-khata already mandatory for registration; registration fee still 1% until Aug 2025 → they register in March 2025 at 5% stamp + 1% reg + cess).
- Apr–Jun 2025: plan approval (BBMP still exists until Sep 2025 — the office is BBMP; later scenes mention GBA taking over). BESCOM freezes permanent connections from April 2025 (OC issue) — worry.
- Jul 2025: bhoomi puja, construction starts with a TEMPORARY smart prepaid meter.
- Sep 2025: govt exempts plots ≤1,200 sq ft with approved plan up to G+2 / stilt+3 from OC for connections → relief. BBMP dissolved, GBA (West corporation) takes over.
- Monsoon/Dasara delays; steel price rise; overrun ~15%.
- Jun–Jul 2026: completion, BESCOM inspection with geo-tagged photos, permanent meters (one per unit), BWSSB connection, gruhapravesha, tenants.

## Characters (speaker keys and voices — use these keys exactly)
| key | name | who | voice |
|---|---|---|---|
| ravi | Ravi Kumar | 34, operations manager at a pharma company in Peenya; careful, honest, slightly anxious | kn-IN-GaganNeural, pitch +0Hz, rate -3% |
| deepa | Deepa | 31, his wife, CBSE school teacher; sharp with numbers, practical | kn-IN-SapnaNeural, +2Hz, -2% |
| ananya | Ananya | 7, their daughter (very few lines) | kn-IN-SapnaNeural, +22Hz, +4% |
| appa | Nagaraj | 66, Ravi's father, retired KSRTC bus conductor; proverbs, cautious with debt | kn-IN-GaganNeural, -16Hz, -10% |
| amma | Sharada | 60, Ravi's mother; Vastu, tradition, worries | kn-IN-SapnaNeural, -12Hz, -8% |
| bank | Vandana | home-loan officer, Canara Bank; formal | kn-IN-SapnaNeural, -4Hz, +2% |
| broker | Lokesh | real-estate broker in Kengeri; smooth talker | kn-IN-GaganNeural, +6Hz, +10% |
| seller | Chandrashekar | 68, seller of the Kengeri site | kn-IN-GaganNeural, -20Hz, -6% |
| lawyer | Raghavendra Rao | advocate who checks the title | kn-IN-GaganNeural, -10Hz, -4% |
| clerk | Sub-Registrar office staff / document writer (one voice) | kn-IN-GaganNeural, -4Hz, +6% |
| subreg | Sub-Registrar (Ms. Latha) | kn-IN-SapnaNeural, -8Hz, -2% |
| architect | Pallavi Hegde | architect | kn-IN-SapnaNeural, +0Hz, +3% |
| aee | Sathish | Assistant Executive Engineer (BBMP, later GBA West) | kn-IN-GaganNeural, -12Hz, -2% |
| bescom | Prakash | BESCOM Assistant Engineer | kn-IN-GaganNeural, -8Hz, +0% |
| lineman | Ramu | BESCOM lineman | kn-IN-GaganNeural, +2Hz, +12% |
| bwssb | Kavitha | BWSSB Assistant Executive Engineer | kn-IN-SapnaNeural, -6Hz, +0% |
| contractor | Shivakumar Gowda | labour contractor | kn-IN-GaganNeural, -6Hz, +6% |
| mestri | Basavaraj | mestri from Bagalkot; North-Karnataka speech (ಐತಿ, -ರಿ, ಸಾಹೇಬ್ರ), respectful, proud of his craft | kn-IN-GaganNeural, -14Hz, +4% |
| neighbour | Krishnappa | elderly neighbour at the plot | kn-IN-GaganNeural, -22Hz, -8% |
| arjun | Arjun | tenant, 29, software engineer from Hubballi | kn-IN-GaganNeural, +8Hz, +4% |
| sneha | Sneha | Arjun's wife, 27, nurse at a hospital | kn-IN-SapnaNeural, +6Hz, +2% |
| farooq | Farooq | tenant applicant, 40, runs a mobile-repair shop; wife and son | kn-IN-GaganNeural, -6Hz, +2% |

## Chapters, beats and line budgets (spoken lines; total ≈ 700)
**Writer A — chapters 1–3 (~190 lines)**
1. *Saving* (~60, B1). Kitchen-table budgeting: salaries, rent they pay now (₹22,000 in Vijayanagar), school fees, the dream since 2019; RD, chit fund (ಚೀಟಿ) — risky, Deepa's gold; ₹18 lakh saved. Appa: debt fear, proverb ಹನಿ ಹನಿ ಗೂಡಿದರೆ ಹಳ್ಳ, ತೆನೆ ತೆನೆ ಗೂಡಿದರೆ ಬಳ್ಳ. Use the causative ಕಟ್ಟಿಸು (getting a house built) throughout the lesson. Bank: Vandana explains plot loan only in approved layouts, ~70–75% of value, CIBIL score, EMI, composite loan (construction within ~3 years), documents; Ravi's eligibility in numbers.
2. *Broker and site visits* (~80, B1→B2). Lokesh shows (a) a cheap B-khata/panchayat (e-Swathu) site near Hoskote — pros (price ~₹2,800/sq ft) and cons (no bank loan, conversion 5% of guidance value, unclear title, layout not approved); (b) a 30×40 east-facing A-khata site in a BMRDA-approved layout near Kengeri at ~₹4,500/sq ft (asking ₹56 lakh): 30-ft road, drainage, a high-tension line 200 m away, a lake buffer question, metro distance. Negotiation: price, broker commission 1%. Ravi asks the hard questions.
3. *Family site visit* (~50, B1). Appa, Amma, Deepa, Ananya visit on Sunday morning; Vastu (east-facing, northeast corner for water/sump), Amma's comfort vs Deepa's numbers; meeting neighbour Krishnappa who warns about water shortage and a past boundary dispute; decision to go ahead if the lawyer clears it; final negotiated price ₹53.5 lakh.

**Writer B — chapters 4–5 (~160 lines)**
4. *Lawyer and purchase* (~85, B2, formal). Advocate Raghavendra Rao checks: 30-year title chain, mother deed, EC (Form 15), e-khata & tax receipts, layout approval, conversion order, seller's family members' consent (sons sign). Sale agreement, ₹5 lakh advance by bank transfer (no cash), loan sanction and disbursement directly to seller. Sub-Registrar office (Kaveri 2.0 slot, guidance value vs sale price, stamp duty 5% + 1% registration + cess ≈ 6.6% in March 2025, photos & fingerprints, two witnesses, document writer). Someone hints at "extra for faster" — Ravi refuses politely; it still works, just slower. Seller Chandrashekar's emotional moment (selling for his daughter's medical bills). Khata transfer to Ravi's name afterwards.
5. *Architect and plan approval* (~75, B2, formal). Pallavi: setbacks, FAR ~1.75, stilt parking + ground + 2 floors design (ground: Ravi's family, 1st & 2nd: 2BHK rentals), sump, rainwater harvesting, Vastu compromise, structural engineer, soil test; the online plan approval (Nambike Nakshe was announced for small plots — Pallavi is careful about status); fees; then the BBMP office with AEE Sathish: documents, inspection, betterment fee, timelines; positives (online tracking) and frustrations (a missing tax receipt, a second visit).

**Writer C — chapters 6–8 (~170 lines)**
6. *BESCOM — electricity* (~60, B2, formal). Ravi at the BESCOM sub-division office with AE Prakash: temporary connection for construction (smart prepaid meter, three-phase cost, minimum recharge), the April 2025 OC freeze explained (Supreme Court order Dec 2024, KERC direction) — permanent connections uncertain; meter board / "dry box" placement (dry, weather-proof, accessible at ground level, one meter per unit, load in kW per unit ~3–5 kW, earthing, RCCB); timeline charter (7 days sanction, 30 days connection) vs reality; lineman Ramu hints for "tea money" — Ravi declines; later scene: September 2025 government exemption news (≤1,200 sq ft plots with approved plan, up to G+2) — relief.
7. *BWSSB — water and sewerage* (~50, B2, formal). AEE Kavitha: water + UGD (sanitary) connection application, pro-rata charge (~₹400 per sq m built-up), rainwater harvesting compulsory for 1,200 sq ft sites (penalty 50% then 100% on bill), borewell needs Ground Water Authority permission, Cauvery water supply schedule in the area, tanker reality meanwhile; positives and negatives.
8. *Choosing the team* (~60). Comparing a turnkey quote (₹2,250/sq ft) vs labour contract (₹650/sq ft, Ravi buys materials); contractor Shivakumar Gowda: agreement, payment milestones, timeline 11 months; mestri Basavaraj (North-Karnataka speech): his experience, his team, cement/steel quality, curing, his conditions (advance, labour shed, water); bhoomi puja on an auspicious day with the family; Amma and Appa bless; contract signed.

**Writer D — chapters 9–11 (~180 lines)**
9. *One year of building* (~85, B2). Short dated scenes: soil test & excavation; foundation and columns; first slab casting day (crowd of labourers, ready-mix vs site mix, curing 21 days); monsoon stops work; steel price jumps (₹62 → ₹71/kg), cement bags; a worker hurt (cut hand) — first aid, Ravi pays treatment, insurance/ESI discussion; neighbour Krishnappa complains about debris and noise — resolved respectfully; the September 2025 BBMP→GBA change and exemption relief; Dasara break; brickwork, plastering, plumbing, electrical, tiles; cost overrun 15%, extra top-up loan; Deepa's spreadsheet; tension in the family; finishing; gruhapravesha.
10. *Final connections* (~25, B2). BESCOM inspection with geo-tagged photos, three permanent meters; BWSSB connection; the moment the lights come on.
11. *Tenants* (~70, B2). To-let board + online listing; phone calls; Amma wants "vegetarians only" — Ravi and Deepa disagree respectfully and decide on fairness; interviews with Arjun & Sneha (2BHK, ₹18,000) and Farooq's family (other 2BHK); deposit negotiation (Ravi asks 6 months, settles at 5), 11-month agreement on e-stamp paper, police tenant verification, rules on water, parking, maintenance, rent date; handing over keys. Closing: Ravi and Appa on the terrace at night: the loan, the years, what a house means. End seriously and warmly.

## Validation command
`cd C:/code/language && node -e "const y=require('js-yaml');const d=y.load(require('fs').readFileSync('content/kannada/_parts/002-pX.yaml','utf8'));console.log(d.lines.length, d.lines.filter(l=>l.who).length)"`
(replace pX). Every spoken item must have who, t, tr, en and use only the speaker keys above.
