# Lesson 3 — "ಮೂರು ತಲೆಮಾರು" (Three generations) — STORY BIBLE

The Rao family from Lesson 1, one year later. A serious, realistic, continuous story of **at least 1 h 30 min (~740 spoken lines)** that pushes B2 → B2+. Two arcs that meet: **Shwetha's pregnancy** (from confirmation to the naming ceremony) and **Ajji's sudden heart attack** (108 → emergency → Jayadeva → angioplasty → recovery). Ajji fights to live to hold her great-grandchild. No silly lines; warmth and humour only where real people would have it.

## Hard rules (same as Lesson 2 — read C:/code/language/content/kannada/_parts/002-bible.md "Hard rules" and follow them)
- YAML items exactly like the earlier lessons: `chapter`, `section` + `learn`, `scene` (short English, read by narrator), `{ who, t, tr, en }`; all strings double-quoted; Kannada script correct; `tr` with macrons; natural English. NO English stage directions inside `t`/`tr` (put "(quietly)" etc. only in `en`). Numbers like "2BHK" must be written in Kannada letters inside `t`.
- Realistic register: family = informal Bengaluru Kannada; doctors/nurses/insurance desk/108 operator = polite professional Kannada with the English medical terms people actually use (ECG, ICU, BP, sugar, scan, report, stent, consent, discharge, cashless, TPA).
- **Reuse vocabulary from Lessons 1–2** (`research_notes/known_vocab_after_L2.txt`) and introduce many new words in context (body, symptoms, emotions, medicine, pregnancy, rituals, insurance, law/leave).
- Facts: `research_notes/Lesson 3 hospital pregnancy/research.md` (dated, sourced; hedge anything marked uncertain).
- Each professional/office conversation is its own section with depth, positives and frustrations.
- Grammar to stress (new vs L1/L2): conditionals of risk ("ಬ್ಲಾಕೇಜ್ ಜಾಸ್ತಿ ಇದ್ರೆ…", "-ಬಹುದು"), instructions & prohibitions (ತಿನ್ನಬಾರದು, ತಗೋಬೇಕು), dative experiencer for illness/feelings (ನನಗೆ ಎದೆ ನೋವು ಆಗ್ತಿದೆ, ಅವಳಿಗೆ ವಾಂತಿ ಬರ್ತಿದೆ), reported speech (-ಅಂತ, -ಅಂತೆ), time clauses (-ಇದಾಗ, -ಅಷ್ಟರಲ್ಲಿ, -ಒಳಗೆ), blessings and condolence formulas, causatives (ಮಾಡಿಸು, ಹಾಕಿಸು), emotions with nuance.
- Validate your file with the command at the end. Edit no other file. Save after each chapter.

## Timeline
- Nov 2025: Shwetha married Pradeep (no dowry — Lesson 1 resolution: Pradeep apologised for his parents; they married simply). Pradeep moved back from Seattle and works remotely for his US company; the couple live in an apartment in JP Nagar. Sam still lives as PG with the Raos and now speaks good Kannada.
- Feb 2026: pregnancy confirmed. Apr: NT scan. Jun: anomaly scan. Jul: glucose test.
- Aug 2026 (5th month): Ajji's heart attack.
- Sep 2026 (7th month): seemantha; Shwetha moves to her mother's house (ತವರು ಮನೆ) for the delivery.
- Nov 2026: delivery; 11th day: naming ceremony.

## Characters (speaker keys — use exactly)
| key | name | who | voice / pitch / rate |
|---|---|---|---|
| sam | Sam | 29, Swiss PG, now fluent-ish; the learner's anchor | kn-IN-GaganNeural, +0Hz, -5% |
| ajji | Ajji · Saraswathamma | 79, the grandmother | kn-IN-SapnaNeural, -20Hz, -18% |
| appa | Appa · Ramesh | 57, bank officer near retirement | kn-IN-GaganNeural, -14Hz, -8% |
| amma | Amma · Lakshmi | 52 | kn-IN-SapnaNeural, -6Hz, -5% |
| shwe | Shwetha | 27, pregnant, data engineer, team lead | kn-IN-SapnaNeural, +4Hz, +0% |
| pradeep | Pradeep | 30, her husband | kn-IN-GaganNeural, +4Hz, +4% |
| kiran | Kiran | 20, final-year BCom; serious now | kn-IN-GaganNeural, +10Hz, +8% |
| sumitra | Sumitra | Pradeep's mother (Lesson 1's dowry visitor), changed and trying to make amends | kn-IN-SapnaNeural, -12Hz, +2% |
| shankar | Shankar | Pradeep's father, quieter, ashamed of the dowry episode | kn-IN-GaganNeural, -18Hz, -4% |
| vimala | Vimala Aunty | neighbour; gossip but first to help | kn-IN-SapnaNeural, -10Hz, +8% |
| gyn | Dr. Usha Rao | gynaecologist | kn-IN-SapnaNeural, -4Hz, +0% |
| operator | 108 call operator | kn-IN-SapnaNeural, +0Hz, +8% |
| emt | Manjunath (ambulance EMT) | kn-IN-GaganNeural, -4Hz, +8% |
| erdoc | Dr. Anand (emergency doctor) | kn-IN-GaganNeural, -6Hz, +4% |
| cardio | Dr. Meera Kulkarni (cardiologist, Jayadeva) | kn-IN-SapnaNeural, -8Hz, +0% |
| nurse | Rekha (ICU/ward nurse) | kn-IN-SapnaNeural, +2Hz, +6% |
| desk | Insurance / billing desk (Venkatesh) | kn-IN-GaganNeural, -2Hz, +6% |
| manager | Shwetha's manager (Nikhil) | kn-IN-GaganNeural, +2Hz, +4% |
| paed | Dr. Farhan (paediatrician) | kn-IN-GaganNeural, -6Hz, +0% |
| purohit | Purohit (priest at seemantha/naming) | kn-IN-GaganNeural, -18Hz, -6% |

## Chapters, beats, line budgets (≈ 740 spoken lines)
**Writer A — ch 1–2 (~165)**
1. *Good news* (~75). Shwetha's positive test at home in JP Nagar, Pradeep's reaction; telling both families (Amma's tears, Ajji's blessing and her list of food rules — papaya, eclipse, "eat for two"; Sumitra's careful phone call); first visit to Dr. Usha Rao: dates, due date, folic acid & iron, BP, blood tests, Thayi card/ANC registration, NT scan timing, warning signs; Shwetha's fear about working while pregnant.
2. *The night of the attack* (~90, Aug 2026). Late evening at the Rao house: Ajji's chest pain, sweating, left arm, breathlessness; Amma panics; Sam notices; 108 call (address, landmark, age, symptoms, operator's instructions: aspirin? keep her seated, don't give food); waiting; Vimala Aunty arrives; EMT Manjunath (oxygen, ECG on the way); nearest hospital ER: Dr. Anand reads ECG (heart attack — STEMI), clot-dissolving injection under the Hrudaya Jyothi scheme, referral to Jayadeva by ambulance; Appa's fear; Shwetha (pregnant) told by phone and told not to rush.

**Writer B — ch 3 (~110)**
3. *Jayadeva* (~110). Arrival at Jayadeva Institute; queue, registration, ID; Dr. Meera explains angiogram findings (blocked artery), options (angioplasty with stent vs bypass), risks at 79, consent form (who signs, what it says), costs at Jayadeva vs private, Ayushman Vay Vandana card for 70+ (and Karnataka's scheme) — what's covered; the cath-lab waiting; procedure successful; ICU rules (visiting hours, one person, hygiene), nurse Rekha; family waiting-room conversations at night (Appa and Kiran, Amma praying, Sam bringing food); Sumitra arrives with food and an apology — a real reconciliation scene with Amma.

**Writer C — ch 4–5 (~140)**
4. *Discharge and a new routine* (~85). Discharge summary explained (medicines: blood thinners, statin, BP; follow-up; warning signs); billing desk Venkatesh: what the scheme paid, what the family paid, receipts for reimbursement; home recovery: diet (salt, oil), walking, cardiac rehab; Ajji refusing to rest and wanting to go to the temple; Shwetha's anomaly scan (Level 2) at 20 weeks and the glucose test result (borderline → diet), stress between the two worries.
5. *Work and leave* (~55). Shwetha with manager Nikhil: maternity leave (26 weeks, now under the Code on Social Security — hedge), handover, WFH before delivery, appraisal fear; Pradeep asks his US company for paternity leave; the couple discuss money, insurance maternity cover and the hospital choice (private vs government hospital, costs).

**Writer D — ch 6–7 (~175)**
6. *Seemantha* (~70, 7th month). Preparation at the Rao house; purohit; rituals (bangles, flowers, five types of rice, blessings), relatives' advice vs doctor's advice; Vimala; Ajji, recovered, insists on being part of it; Sumitra and Amma together; Shwetha moves to her mother's home for the delivery.
7. *Delivery* (~105, Nov 2026). Late night labour signs; timing contractions; call to Dr. Usha; admission; monitoring; long labour; doctor explains the need for a C-section (foetal distress) — consent, risks, anaesthesia; Pradeep and Appa outside; Sam drives and waits; the baby girl is born; paediatrician Dr. Farhan: weight, APGAR, first feed, newborn vaccines (BCG, OPV-0, Hep B) and the schedule; insurance/billing at discharge.

**Writer E — ch 8–9 (~120)**
8. *The first weeks* (~70). Confinement customs (ಬಾಣಂತನ: rest, hot water bath, diet), Amma and Ajji vs Dr. Usha's advice (respectful compromise), breastfeeding troubles and support, sleepless nights, Pradeep learning; Ajji holds her great-granddaughter for the first time — the emotional centre; Shwetha's low mood (baby blues) talked about honestly.
9. *Namakarana* (~50, 11th day). Choosing the name (Ajji wants a traditional name, Shwetha a modern one — compromise), cradle ceremony, purohit, the whole family including Sumitra, Shankar; Ajji's closing words about three generations.

## Validation
`cd C:/code/language && node -e "const y=require('js-yaml');const d=y.load(require('fs').readFileSync('content/kannada/_parts/003-pX.yaml','utf8'));const s=d.lines.filter(l=>l.who);console.log(d.lines.length,s.length,'bad',s.filter(l=>!(l.t&&l.tr&&l.en)||/[A-Za-z]/.test(l.t)).length)"`
