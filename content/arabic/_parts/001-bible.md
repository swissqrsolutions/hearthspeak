# Arabic Lesson 1 — "بِدَايَةُ الرِّحْلَةِ" (The journey begins) — STORY BIBLE

Goal of the whole Arabic course: the learner (English-speaking South Asian Muslim, reads the Quran in IndoPak script, doesn't understand it, no writing needed) must (1) understand the Quran by ear and by reading, and (2) speak Fusha comfortably with Saudis. **Every lesson teaches spoken Fusha built from the Quran's own most frequent words.** Same principles as the Kannada course: one long, serious, realistic, continuous story of **at least 1 h 30 min (~720 spoken lines)**; real names and places; researched facts; each scene in depth (positives and frustrations); no silly lines; every new lesson builds on the previous one and is one step harder. Lesson 1 starts at A1 (very short, clear sentences) and climbs to about B1 by the end.

## Hard rules for writers
1. **YAML format** (like the Kannada lessons, see C:/code/language/content/kannada/001.yaml for item shapes): `chapter`, `section` + `learn`, `scene` (short English stage direction read by an English narrator), spoken items `{ who, t, tr, en, q }`, and Quran items `{ quran: { s, a }, by, en }`. All strings double-quoted.
   - `t`: Arabic (Fusha) with **complete, correct tashkeel** (every letter vowelled; shadda; tanwin). Use natural careful-speech Fusha; put a sukun on the last word of a sentence (pausal form) as people speak. **No Latin letters in `t`.**
   - `tr`: transliteration in **familiar IndoPak spellings** where a common one exists (Assalamu Alaikum, Bismillah, Alhamdulillah, Insha Allah, Masha Allah, Jazak Allahu khairan, Wuzu, Zuhr, Asr, Maghrib, Isha, Fajr, Ramzan, Hajj, Umrah, Ihram, Kaaba, Masjid, Quran, Surah, Ayat); otherwise a simple readable romanisation (long vowels doubled: aa, ee, oo; ʿ for ع; ' for ء; gh, kh, sh, th, dh). Keep it readable, not scholarly.
   - `en`: natural English (stage directions like "(smiling)" only here).
   - `q`: list of the target Quran lemmas (exactly as written in the `lemma` column of `research_notes/Arabic Quran/top_lemmas.tsv`) that this line uses, e.g. `q: ["اللَّه", "رَبّ", "قَالَ"]`. Tag honestly; only lemmas really present (any form/conjugation of the lemma counts).
   - Quran item: `- quran: { s: 1, a: 2 }` with `by: "abukhalid"` (who recites/quotes it) and `en:` a short meaning in your own plain words (do NOT copy any published translation). Do NOT type the ayah text — the build inserts the exact text and Mishary Alafasy's real recitation. Always have a character explain the ayah's words afterwards in Fusha.
2. **Vocabulary target for Lesson 1: the top 300 lemmas** in top_lemmas.tsv. Across the whole lesson every one of the top 300 should appear at least 3 times (the coordinator will check counts; your part should cover its share naturally: particles, pronouns, قال, كان, الله, رب, يوم, أرض, سماء, عمل, علم, آمن, كفر, قوم, ناس, شيء, حق, كتاب, رسول, قلب, عذاب, خير, نفس, جنة, نار, …). Use them in **natural modern sentences** (e.g. عِلْم in "I'm a student of knowledge", عَمِل in "I work as an engineer", نَفْس in "the same thing", يَوْم in "today/what day"). Where a Quranic word's modern meaning differs (سيارة, ساعة, قرية), point it out once.
3. **Pronunciation notes for IndoPak speakers** go in `learn` lines when a word first appears with ذ ض ظ ث ح ع ق ص ط (e.g. "ذ = 'dh' like 'this' — Urdu says 'z'; Saudis say dh").
4. **Register:** Saudis speak Fusha slowly and clearly to Imran (a guest learning Arabic). Occasionally a Saudi replies in Hijazi (taxi driver, Faisal the boy, market) — then another character restates it in Fusha, and the `learn` line notes the Hijazi form (إيش = ماذا, أبغى = أريد, كم = بكم, مرة = جدًا, يلا). Keep Hijazi to ~5% of lines.
5. **Religious content:** respectful, mainstream Sunni practice, no fatwas; on rulings characters say "ask a scholar" when details vary. Facts in research_notes/Arabic Quran/learning_path.md (phrases, Hijazi replies, bridge words) and data_sources.md.
6. Save after each chapter. Validate with the command at the end. Edit no other file.

## Timeline & setting (2026)
- Late Sept 2026: Zurich. Imran Shareef, 34, software engineer from Bengaluru living in Zurich, meets Khalid Al-Harbi (Saudi engineer from Jeddah, his new colleague) after Jumu'ah. Imran has always recited the Quran without understanding; he decides to learn Arabic and perform Umrah in December.
- Oct–Nov: lessons with Khalid, video call with Khalid's family, Nusuk / Umrah visa, preparations.
- Mid-Dec 2026: flight to Jeddah; Imran stays three nights with the Al-Harbi family before going to Makkah (Lesson 2).

## Characters (speaker keys — use exactly; voices are set by the coordinator)
| key | name | who |
|---|---|---|
| imran | Imran Shareef | 34, from Bengaluru, works in Zurich; the learner's anchor; starts with very simple Arabic and improves through the lesson |
| khalid | Khalid Al-Harbi | 36, Saudi engineer in Zurich; patient teacher, warm, precise |
| imam | Imam Abdullah | imam of the Zurich mosque (Omani background) |
| abukhalid | Abu Khalid (Saad Al-Harbi) | 68, Khalid's father, retired Arabic & Quran teacher in Jeddah; slow, deep, loves roots and meanings |
| ummkhalid | Umm Khalid (Noura) | 62, Khalid's mother; hospitality, food, family |
| sara | Sara Al-Harbi | 29, Khalid's sister, doctor at a Jeddah hospital; practical, modern |
| faisal | Faisal | 10, Khalid's nephew; speaks quickly, some Hijazi |
| crew | Flight attendant | |
| officer | Passport officer at Jeddah airport | formal |
| driver | Taxi driver / porter (Hijazi) | |
| seller | Shopkeeper in Al-Balad (Hijazi) | |

## Chapters, beats, line budgets (≈ 720 spoken lines)
**Writer A — ch 1–2 (~170)**
1. *After Jumu'ah* (~80, A1). Mosque entrance in Zurich: salam, names, where from, work, family, languages; Imran admits he recites but doesn't understand; Imam Abdullah joins; first Quranic words in daily speech (السلام، الله، الحمد، رب، يوم، كتاب، علم).
2. *The first lesson* (~90). Café near the lake: Khalid teaches Al-Fatiha word by word (quran items 1:1–1:7, each followed by explanation in simple Fusha: roots ح م د، ر ب ب، ر ح م، م ل ك، د ي ن، ع ب د، ع و ن، ه د ي، ص ر ط، ن ع م، غ ض ب، ض ل ل); Imran's emotion at understanding his prayer for the first time; plan: twice a week.

**Writer B — ch 3–4 (~160)**
3. *Preparations* (~80). Several short dated scenes Oct–Nov: Nusuk app, Umrah permit, visa, flights Zurich–Jeddah, vaccinations note, money, what ihram is, niyyah, miqat explained (flying in vs. staying in Jeddah first — "ask a scholar" nuance), packing; continuing lessons: pronouns, verbs قال/كان/جعل/آمن with everyday sentences.
4. *A call to Jeddah* (~80). Video call with the Al-Harbi family: Abu Khalid, Umm Khalid, Sara, Faisal; introductions, family words, Bengaluru vs Jeddah, weather, food, invitation to stay; Abu Khalid quotes a short ayah about hospitality or travel (choose a fitting one, e.g. 49:13) and explains it.

**Writer C — ch 5–6 (~180)**
5. *To Jeddah* (~90). Flight (crew), landing, immigration (formal Fusha: purpose of visit, address, duration), baggage, porter/taxi touts in Hijazi, Khalid's brother-in-law? — no: Khalid himself flew a week earlier and meets Imran at arrivals; the drive through Jeddah at night (sea, Corniche, numbers, directions).
6. *The Al-Harbi home* (~90). Welcome at the door, Arabic coffee and dates ritual (right hand, shaking the cup), kabsa dinner, prayer times (Isha together, Abu Khalid leads), family conversation about work, Bengaluru, Sara's hospital, Faisal's school; manners and hospitality vocabulary.

**Writer D — ch 7–9 (~210)**
7. *A night lesson* (~100). Abu Khalid and Imran on the roof after Isha: the words of salah in order (takbir, ruku', sujud, tashahhud, salam) and their meanings; roots and verb patterns introduced gently (فَعَلَ / يَفْعَلُ; أَفْعَلَ); Ayat al-Kursi (2:255) quoted and explained phrase by phrase; Imran's questions; emotional moment about understanding.
8. *Old Jeddah* (~60). Morning in Al-Balad with Sara and Faisal: buying ihram cloth, sandals, dates; numbers and prices, bargaining, Hijazi seller; history of the old houses (rawashin); Bab Makkah.
9. *Towards Makkah* (~50). Final evening: the plan for tomorrow, niyyah, the talbiyah (لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ…) explained word by word, du'a, Umm Khalid's farewell gifts, Abu Khalid's advice; ending as Imran puts on ihram — cliffhanger to Lesson 2.

## Validation
`cd C:/code/language && node -e "const y=require('js-yaml');const d=y.load(require('fs').readFileSync('content/arabic/_parts/001-pX.yaml','utf8'));const s=d.lines.filter(l=>l.who);console.log(d.lines.length,s.length,'quran',d.lines.filter(l=>l.quran).length,'bad',s.filter(l=>!(l.t&&l.tr&&l.en&&Array.isArray(l.q))||/[A-Za-z]/.test(l.t)).length)"`
