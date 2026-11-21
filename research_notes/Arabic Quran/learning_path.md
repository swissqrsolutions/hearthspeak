# Learning path: understanding the Quran by ear, then speaking simple Fusha

**Learner profile:** an English-speaking adult Muslim who can recite from Arabic script, does not understand what they recite, and does not want to learn to write.
**Course format:** listening-first lessons. Each ayah is recited with word-by-word highlighting, then the English, then a teacher's audio explanation. Spoken Fusha story dialogues follow and reuse the Quran words just learned.
**Researched:** 2026-11-21. I used WebSearch and WebFetch, and also ran my own frequency analysis over the Quranic Arabic Corpus morphology data (method in section 4).
**Companion files in this folder:** `top_lemmas.tsv` (the 400 most frequent lemmas, with root, count and cumulative %) and `top_roots.tsv` (the 300 most frequent roots).

Confidence labels used below:
- **[verified]**: checked against a source or computed from the data.
- **[source claim]**: the provider says so; I have not checked it independently.
- **[estimate]**: my reasoning. The assumptions are stated.

---

## 0. Key numbers (computed from the Quranic Arabic Corpus data) [verified]

**Size of the text**

| Measure | Value |
|---|---|
| Words (space-separated) | 77,429 (77,430 in the Corpus documentation) |
| Unique surface forms | about 19,000 |
| Stems | about 12,200 |
| Roots | about 1,650–1,685 |
| Lemmas | about 4,800 (stem-based count in my analysis; the Corpus lists 3,680 non-verb lemmas) |
| Lemmas that occur once | 1,971 |
| Lemmas that occur 3 times or fewer | 3,111 |

**Coverage by lemma.** This is the % of all word-tokens whose core word is known. It assumes the learner already knows the attached prefixes (wa-, fa-, bi-, li-, al-, sa-) and the attached pronouns.

| Top N lemmas | 10 | 25 | 50 | 100 | 150 | 200 | 250 | 300 | 400 | 500 | 750 | 1000 | 1500 | 2000 | 3000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| % of tokens covered | 23.6 | 36.2 | 46.3 | 56.9 | 62.8 | 67.2 | 70.7 | **73.5** | 77.8 | **80.9** | 86.0 | **89.1** | 92.9 | **95.1** | 97.6 |

**Coverage by root.** Words with no root (particles, pronouns, most proper names) are counted as known.

| Top N roots | 50 | 100 | 200 | 300 | 500 | 700 | 1000 |
|---|---|---|---|---|---|---|---|
| % of tokens covered | 65.0 | 74.6 | 84.4 | 89.3 | 94.6 | 97.1 | 98.8 |

Knowing a root does **not** mean you know every word built from it. Root coverage overstates what you will actually understand.

**Grammar-relevant counts**
- **Attached pieces:** there are 28,982 prefix segments (wa/fa/bi/li/ka/al/sa/la) and 21,380 attached pronoun suffixes. In practice, most words carry a prefix or a suffix.
- **Verbs:** 19,353 verb tokens (25% of all words).
  - By tense or mood: 9,151 perfect (past), 8,330 imperfect (present/future), 1,872 imperative, and 1,151 passive.
  - By verb form: I = 12,323 (64%), IV = 3,499 (18%), II = 1,300 (6.7%), VIII = 963 (5%), V = 414 (2.1%), X = 369 (1.9%), III = 338 (1.7%), VI = 91, VII = 51, IX = 5.
- **Participles and verbal nouns:** 2,974 active participles, 551 passive participles, and 674 tagged verbal nouns (masdar). Many more masdars are untagged.

**What this means for the course**
1. The attached pronouns and prefixes come first. They appear in almost every ayah.
2. Form I and Form IV together are 82% of verbs. Forms II, VIII, V, X and III cover nearly all of the rest. Forms VI, VII and IX can wait.
3. About 300 lemmas give about 74% token coverage. About 1,000 give about 89%. About 2,000 give about 95%.
   - Listening research puts "adequate comprehension" at about 95% coverage. Van Zeeland & Schmitt (2013), *Applied Linguistics* 34(4), found that 90–95% coverage gave adequate comprehension of informal spoken narratives and recommended 95% as the criterion. Stæhr (2009) found 98% was needed for academic listening.
   - So understanding the Quran "like English" realistically needs **about 2,000–3,000 lemmas** plus solid morphology. The "80% with a few hundred words" figure is real, but it counts tokens. It is not comprehension.

---

## 1. Existing programmes: what they cover and their weaknesses

| Programme | What it is | Coverage and time to results | Weaknesses for our learner |
|---|---|---|---|
| **Understand Quran Academy** (Dr Abdulazeez Abdulraheem, Hyderabad) | Course 1 "Understand Al-Qur'an & Salah" teaches word-by-word Fatiha, the salah texts, short surahs and basic grammar, using total physical response (TPR) gestures. Courses 2–5 go word by word through Al-Baqarah 1–141 (1–37, 38–76, 77–105, 106–141). There are also grammar units 1–5, a duas course, and a "Learn Quran" app. | The FAQ says recorded courses are about 20 hours each [source claim]. Course 1 "helps you understand 50% of Qur'anic words". The "125 words occurring 40,000 times out of 78,000" claim is a token count [source claim]. | The 50% figure is accurate as a token count: my data gives 100 lemmas ≈ 57% and 125 ≈ 60%. But those tokens are mostly particles, pronouns, *Allah*, *qāla* and *kāna*. Ayah-level comprehension is much lower. It is reading- and worksheet-oriented, with little extended listening and no speaking. |
| **UQA "80% of Qur'anic Words" booklet** | Classified word lists. Editions cite "82.6% (64,282 of ~77,800 words)" or "41.5% (32,263)" depending on which words are counted. | My data: 500 lemmas ≈ 81% of tokens. So "80%" ≈ the top ~500 lemmas, assuming you already know the clitics [verified]. | Lists only. Memorising lists without hearing them in context transfers poorly to listening. |
| **Bayyinah Dream** (Nouman Ali Khan) | Formerly a 10-month full-time on-campus Quranic Arabic grammar immersion in Dallas. Online it continues as the "Dream BIG" 10-day intensive on Bayyinah TV. | 10 months full time ≈ 1,000+ contact hours (historical). Graduates could parse Quranic grammar well. | Heavily *naḥw/ṣarf* (formal grammar), with traditional terminology. It does not teach MSA speaking. Bayyinah itself points speaking learners to ARÖMER (Istanbul, 100 h, modern spoken Arabic). |
| **Arabic with Husna** (Bayyinah) | Book and video series that grew from NAK teaching his daughter (videos from 2011, 10–15 min each). Book 1 is a thorough study of the *ism* (noun). | Gentle and kid-friendly, but slow. | Long grammar runway before real text. Not listening-centred. No conversation. |
| **Madinah Arabic Books** (Dr V. Abdur Rahim, *Durus al-Lugha al-ʿArabiyya*, 3 vols, ~176/312/440 pp) | Used at the Islamic University of Madinah for non-Arabs. Graded grammar with simple MSA sentences mixing modern and Quranic/Sunnah vocabulary. Free videos and sites exist (e.g. LQToronto, madinaharabic.com). | Typically 1 academic year in a class [source claim]. Self-study is about 200–400 h. | Grammar-translation with written exercises. Little authentic listening. But it is the best existing bridge between Quranic and spoken MSA vocabulary. |
| **Al-Kitaab fii Taʿallum al-ʿArabiyya** (Brustad, Al-Batal, Al-Tonsi; Georgetown UP) | The standard US university MSA series. The 3rd edition integrates Egyptian or Levantine colloquial. | Parts 1–3 take about 3–4 university years (~500–700 class hours) to reach Intermediate-High/Advanced. | Secular, university vocabulary. Little Quran transfer. Its colloquial strand is not Hijazi. Heavy writing load. A poor fit except as an MSA speaking supplement. |
| **Quranic Arabic Corpus** (corpus.quran.com, Kais Dukes, Leeds) | Word-by-word morphology, grammar treebank, root dictionary, concordance and frequency lists for every word. | Not a course. It is the reference dataset and **the source for our frequency lists**. | No pedagogy. |
| **Learn/Access to Quranic Arabic** (Abdul Wahid Hamid, MELS, London) | Textbook, workbook and "selections" with audio tapes. Grammar through Quranic passages. | Course length unclear. | Dated format. Reading-based. Little independent review found. |
| **"Lughatul Quran"** | No established programme by this name could be verified. Only a sparse unverified site and many generic Udemy/Preply "Quranic Arabic" courses turned up. | – | Treat as unverified. |
| Others worth knowing | Al-Madina Institute's Quranic Arabic course focuses on "80% words". SOAS Qur'anic Arabic beginners course. Quran.com/Tarteel word-by-word audio. | | |

**Gap our course fills.** Every proven programme is reading- and grammar-first, and none of them links Quranic vocabulary to spoken MSA. A listening-first, ayah-by-ayah course with recycled vocabulary in dialogues is unusual. It is consistent with research on comprehensible input, spaced repetition and lexical coverage. Our ordering choice is an inference, not something tested.

---

## 2. Recommended order of Quran material

Cumulative figures are computed [verified]. Lemma counts are approximate.

| Step | Material | Word tokens | New lemmas | Cumulative lemmas | Whole-Quran token coverage |
|---|---|---|---|---|---|
| 1 | Al-Fatiha + salah texts (thanāʾ, rukūʿ/sujūd tasbīḥ, tashahhud, ṣalawāt, common duʿāʾ) | 29 (+~150 for the salah texts) | 23 | 23 | 12.6% |
| 2 | Juz ʿAmma (78–114) | 2,308 | 836 | 859 | 72.5% |
| 3 | Ayat al-Kursi + Al-Baqarah 284–286 | 154 | 34 | 893 | 74.0% |
| 4 | Al-Mulk (67) | 333 | 67 | 960 | 75.8% |
| 5 | Rest of Juz Tabārak (68–77) – optional | 2,328 | 498 | 1,458 | 83.1% |
| 6 | Yā-Sīn (36) | 725 | 93 | 1,551 | 84.7% |
| 7 | Al-Kahf (18) | 1,579 | 226 | 1,777 | 86.8% |
| 8 | Hajj ayat: 2:196–203, 22:26–37, 3:96–97, 5:1–2 and 5:94–97 | 646 | 111 | 1,888 | 88.0% |
| 9 | Rest of Al-Baqarah | 5,751 | 489 | 2,377 | 92.6% |
| 10 | Remainder | 63,576 | 2,443 | 4,820 | 100% |

**Honest caveat: Juz ʿAmma is lexically dense.** It introduces about 836 lemmas in only 2,308 words, and many of them are rare: oaths, eschatological imagery, hapaxes. Only the high-frequency subset of those lemmas drives the 72.5% coverage.

The course should:
- teach Juz ʿAmma mainly for meaning and devotion;
- tag each word as **core** (frequency ≥ ~20; learn it actively, recycle it in dialogues) or **gloss-only** (rare; understand it in place, no drilling);
- keep Juz ʿAmma first anyway, because learners recite it in salah daily and that gives free spaced repetition.

**Alternative.** For pure comprehension speed, interleave Juz ʿAmma with Al-Baqarah and the narrative surahs: Yusuf (12), Maryam (19), Taha (20), Al-Qasas (28). These are story-driven and repetitive, and recycle *qāla/kāna/jāʾa/raʾā*. Stories also suit our dialogue format.

**After step 9, continue in this order:**
1. Family and life guidance: Al-ʿImrān 1–20 and 190–200, An-Nisāʾ 1–36, Luqmān (31), Al-Ḥujurāt (49).
2. The other narrative surahs: Yusuf, Maryam, Taha, Al-Qasas.
3. The Friday and evening surahs: Al-Wāqiʿa, Ar-Raḥmān, As-Sajda, Al-Jumuʿa, Al-Kahf (done).
4. Then mushaf order, juz by juz. By then about 2,400 lemmas are known, so each new juz adds only about 80–120 new lemmas.

### How many ~1.5 h lessons for the whole Quran? [estimate]

**Recitation length.**
- A full murattal recitation by Mishary Alafasy runs about **29 h 54 min** (Storytel audiobook listing). That is about 43 words per minute.
- Faster imams' recitations (e.g. Sudais/Shuraim) are roughly 20–25 h, and slower murattal recitations (e.g. Husary) run longer.
- I could not find a verified total for these other reciters. The "~30 h" figure is correct for Alafasy.

**Per-word cost of a lesson.** Each word costs roughly:
- about 3 s of recitation, played twice;
- about 3 s of word-by-word gloss;
- about 1.5 s of the ayah in English;
- teacher explanation: about 8–12 s per word early on, falling to about 2–4 s per word later.

**Lesson capacity.**
- Early lessons: about 15–20 s per word, so about **270–360 words per 90 min**.
- Later lessons: about 8–10 s per word, so about **540–675 words per 90 min**.

**Totals.**
- Juz ʿAmma ≈ **7–9 lessons**.
- Steps 1–8 ≈ **25–30 lessons**.
- Whole Quran ≈ **150–250 lessons** (≈ 225–375 h of audio), with about 180 as a planning figure.
- Spoken-Fusha dialogue lessons come on top of this.

---

## 3. Grammar sequence for listeners (no writing)

The order is by comprehension gain per hour, informed by the counts in section 0. Teach every item by ear: pattern melody, minimal pairs, and "hear it, then say it" shadowing.

1. **Attached pronouns** (-hu/-hā/-hum/-hunna/-ka/-ki/-kum/-ī/-nī/-nā). They mark a possessor on nouns, an object on verbs, and the object of a preposition (*lahu, ʿalayhim, minkum*). There are 21k occurrences, so this is the single biggest gain.
2. **Prefixed particles:**
   - *wa-* (and; also the oath "by"), *fa-* (so, then), *bi-* (with, by, in), *li-* (for, to), *ka-* (like);
   - the article *al-*, including sun-letter assimilation heard as *ash-shams*;
   - *sa-/sawfa* (will), *la-* (emphatic: *la-qad*, *la-*…).
3. **Independent pronouns and demonstratives:** *huwa, hiya, hum, anta, antum, anā, naḥnu*; *hādhā, hādhihi, dhālika, tilka, ulāʾika*.
4. **Past verb conjugation by ear.** Teach the endings *-tu, -ta, -ti, -a, -at, -ū, -nā, -tum*. Start with *qāla* (1,618), *kāna* (1,358), *āmana*, *jaʿala*, *jāʾa*, *ʿalima*.
5. **Present/future verbs.** Teach the prefixes *a-, na-, ta-, ya-* and the endings *-ūna, -īna, -ān*. The moods (*-u* / *-a* after *an, lan* / jussive after *lam, lā* of prohibition, *li-*) can be recognised later.
6. **Negation and the core particle set:**
   - *lā* (no, not; don't), *mā* (not / what / that which), *lam* (did not), *lan* (will never), *laysa* (is not);
   - *inna/anna* (indeed, that), *qad* (certainly, already), *illā* (except), *innamā* (only);
   - *in* (if / not), *idhā* (when), *idh* (when, past), *law* (if, counterfactual), *lawlā* (if not for), *hal/a-* (question), *bal* (rather), *thumma*, *aw/am*, *ḥattā*, *kallā*.
7. **Relative and interrogative words:** *alladhī/allatī/alladhīna*, *man* (who), *mā* (what), *ayy*, *kayfa*, *ayna*, *matā*.
8. **Nominal vs verbal sentences.** "X is Y" has no verb *is*. Also *kāna* and its sisters, and *inna* and its sisters (the subject is heard with *-a*).
9. **Iḍāfa** (possessive chains: *rabbu l-ʿālamīn*, *yawmi d-dīn*) and **noun–adjective agreement** (*aṣ-ṣirāṭa l-mustaqīm*).
10. **Imperative.** Teach *qul* (said 332 times), *ihdinā*, *uʿbudū*, *ittaqū*. Also prohibition with *lā taf'al*.
11. **The verb forms (awzān) as sound shapes.** Form I is 64% of verbs and Form IV 18%, so teach I → IV → II → VIII → V → X → III, and leave VI/VII/IX.
    - IV: *a-fʿala* / *yu-fʿilu*, e.g. *anzala/yunzilu*, *aslama*.
    - II: doubled middle, e.g. *nazzala*, *ʿallama*.
    - VIII: *-ta-* infix, e.g. *ittaqā*, *ittabaʿa*.
    - V: *ta-faʿʿala*, e.g. *tadhakkara*.
    - X: *ista-*, e.g. *istaghfara*, *istaṭāʿa*.
    - III: long *ā* after the first root letter, e.g. *qātala*, *jāhada*.
    - Teach each form with a meaning tendency: IV/II = make/cause, V/VI = reflexive/mutual, X = seek, VIII = do for oneself.
    - Learners already chant these melodies in recitation, so they recognise them quickly.
12. **Participles.**
    - Active: *fāʿil* and *mu-…-i-* (*muʾmin, muslim, mustaqīm*); 2,974 occurrences.
    - Passive: *mafʿūl* and *mu-…-a-* (*maghḍūb, munzal*); 551 occurrences.
    - These give "the one who does / the thing done", and so a huge vocabulary multiplier from known roots.
13. **Masdar** (verbal noun: *ʿilm, raḥma, ṣalāh, īmān, istighfār*) and **intensive adjectives** (*raḥīm, ʿalīm, ghafūr, ʿazīz*): the divine-name patterns *faʿīl, faʿūl, faʿʿāl*.
14. **Case endings, enough to recognise.**
    - -u / -a / -i and -ūna/-īna, -āni/-ayni.
    - The goal is to hear who did what to whom (*innamā yakhshā llāha min ʿibādihi l-ʿulamāʾu*, 35:28). Do not teach full *iʿrāb* analysis.
15. **Passive verbs** (*qīla, ukhrija, yuqālu*; 1,151 occurrences), **conditionals** (*in…fa-*, *man…fa-*, *idhā…*, *law…la-*), **oaths** (*wa-sh-shamsi*, *lā uqsimu*, *la-* + *-anna*), **exceptions** (*illā*), and **emphasis** (*inna…la-*, *-anna* energetic).
16. **Later:** dual and plural patterns (broken plurals by ear), *ḥāl* clauses, *tamyīz*, and *mafʿūl muṭlaq* (*dhikran kathīran*).

**Grammar that gives the largest early gains:** items 1, 2, 4, 6 and 12. With those, the top 300 lemmas plus these patterns let a learner follow the gist of most ayat that have been pre-glossed.

---

## 4. Frequency lists: method and top items

**Method [verified].**
1. Downloaded the Quranic Arabic Corpus morphology data (v0.4 format) from a public mirror: github.com/mustafa0x/quran-morphology.
2. Grouped segments into words.
3. Took each word's stem segment, i.e. ignored the PREF/SUFF segments, and counted its LEM tag.

Full results are in `top_lemmas.tsv` (top 400) and `top_roots.tsv` (top 300). The official reference is corpus.quran.com/lemmas.jsp, which lists lemmas sorted by frequency (3,680 lemmas, verbs listed separately). Wardini's *Key Words of the Qur'an* (Gorgias Press/De Gruyter) gives weighted coverage tiers.

**Top 120 lemmas** (rank. lemma, gloss, count)

1. min (from) 3226
2. Allāh 2699
3. fī (in) 1701
4. lā (no, not) 1691
5. inna (indeed) 1682
6. qāla (said) 1618
7. alladhī (who, which) 1468
8. ʿalā (on) 1444
9. mā (what, that which) 1379
10. kāna (was) 1358
11. dhā/dhālika (that) 1058
12. rabb (Lord) 975
13. man (who) 824
14. mā (not) 798
15. ilā (to) 742
16. in (if / not) 703
17. illā (except) 659
18. an (that, to) 616
19. hum (they) 585
20. āmana (believed) 537
21. huwa (he) 481
22. yawm (day) 475
23. ʿan (from, about) 465
24. arḍ (earth) 461
25. qad (certainly) 406
26. idhā (when) 383
27. qawm (people) 383
28. ʿalima (knew) 382
29. āya (sign, verse) 382
30. anna (that) 362
31. kull (every, all) 359
32. lam (did not) 347
33. jaʿala (made) 340
34. thumma (then) 338
35. rasūl (messenger) 332
36. ʿadhāb (punishment) 322
37. samāʾ (sky) 310
38. nafs (soul, self) 295
39. kafara (disbelieved) 289
40. shayʾ (thing) 283
41. aw (or) 280
42. jāʾa (came) 278
43. ʿamila (did) 276
44. ātā (gave) 271
45. raʾā (saw) 271
46. bayn (between) 266
47. atā (came) 264
48. -kum (you, pl.) 262
49. -hi (him) 261
50. kitāb (book) 260
51. ḥaqq (truth) 247
52. qabl (before) 242
53. nās (people) 241
54. idh (when) 239
55. shāʾa (willed) 236
56. -hu (him) 232
57. ayy (which) 215
58. muʾmin (believer) 202
59. law (if) 200
60. baʿd (after) 199
61. ʿinda (with, at) 197
62. khalaqa (created) 184
63. anzala (sent down) 183
64. khayr (good, better) 178
65. kadhdhaba (denied) 176
66. sabīl (way) 176
67. daʿā (called) 170
68. ittaqā (feared, was mindful) 166
69. amr (command, matter) 166
70. maʿa (with) 164
71. ʿalīm (all-knowing) 163
72. baʿḍ (some) 157
73. kāfir (disbeliever) 156
74. dhū (possessor of) 156
75. ākhir (last) 155
76. lammā (when) 154
77. hum 148
78. ghayr (other than) 147
79. janna (garden) 147
80. ilāh (god) 147
81. nār (fire) 145
82. hadā (guided) 144
83. dūn (besides) 144
84. ḥattā (until) 142
85. arāda (wanted) 139
86. am (or) 137
87. Mūsā 136
88. ittabaʿa (followed) 136
89. hum 132
90. qalb (heart) 132
91. ʿabd (servant) 131
92. arsala (sent) 130
93. laʿalla (perhaps, so that) 129
94. ẓālim (wrongdoer) 129
95. akhadha (took) 127
96. bal (rather) 127
97. ahl (people of) 127
98. ittakhadha (took as) 124
99. ʿabada (worshipped) 122
100. yad (hand) 120
101. mubīn (clear) 119
102. raḥīm (merciful) 116
103. dunyā (world) 115
104. raḥma (mercy) 114
105. ẓalama (wronged) 110
106. -hā (her) 110
107. ʿaẓīm (great) 107
108. saʾala (asked) 106
109. wajada (found) 106
110. ʿilm (knowledge) 105
111. ajr (reward) 105
112. lan (will not) 104
113. antum (you, pl.) 102
114. ʿazīz (mighty) 101
115. akhraja (brought out) 99
116. ḥakīm (wise) 97
117. akala (ate) 93
118. hal (is it?) 93
119. dīn (religion, judgement) 92
120. qawl (saying) 92

Ranks 121–300 are in the TSV. They include: *ghafūr, laysa, shayṭān, mathal, faʿala, malak, naẓara, waliyy, māl, hudā, dhakara, faḍl, layl, ṣalāh, kayfa, qatala, khāfa, awwal, akthar, rajaʿa, aṣḥāb, tawallā, samiʿa, amara, Jahannam, naḥnu, zawj, dakhala, ḥayāh, dhikr, nabiyy, akh, khālid, ṣāliḥ, aḥad, ʿālam, jazā, alīm, wajh, aṭāʿa, awḥā, insān, bayyina, ashraka, qalīl, qiyāma, Qurʾān, waʿada, Ibrāhīm, anfaqa, ghafara, bayt, umma, māʾ, kathīr, tāba, ibn, rizq, ṣabara, nahār, qarya, ʿayn, shadīd, aqāma, khalq, ajal, mawt, ʿaduww, niʿma, ghayb, kataba, dār, mulk, sāʿa, ẓanna, samīʿ, shakara, ṣirāṭ, qadīr, īmān, khabīr, ṣadr, ḥamd, nūr, sabbaḥa, kalima, salām, fawq, subḥān, baḥr, taraka, istakbara, ihtadā, bilagha, istaghfara, kabīr*.

**Coverage summary:**
- 100 lemmas ≈ 57%
- 300 lemmas ≈ 73.5%
- 500 lemmas ≈ 81%
- 1,000 lemmas ≈ 89%
- 2,000 lemmas ≈ 95%

Comparable outside claims:
- earabiclearning (a blog): "top 100 forms ≈ 50%".
- UQA: "125 words = 50%".
- UQA booklet: "80% words".

These are all consistent with the data once you see that they count **tokens, not understanding**.

---

## 5. Spoken Fusha for pilgrims and everyday conversation

### What actually happens in Makkah and Madinah

- **Who speaks what:**
  - Locals speak **Hijazi (urban: Makkah, Madinah, Jeddah)** among themselves.
  - Most service workers (hotels, shops, taxis) are **not Saudi**. They are South Asian, Egyptian, Yemeni, Indonesian and others, and they speak "Gulf pidgin" Arabic, Urdu or English.
  - About 80% of pilgrims to Makkah are not Arabic speakers (Arab News 2018).
- **How Fusha is received:**
  - Saudis, and educated Arabs generally, **understand simple Fusha fully**. They hear it daily in Quran, khutbas, news and children's cartoons.
  - They usually reply in a "white" or semi-Fusha register, or in dialect. They often show warm appreciation that a non-Arab speaks the Quran's language.
  - The main problem is not being understood. It is **understanding their reply**, which comes in dialect, fast.
- **Course implication:** teach speaking in Fusha, but train *listening* to about 30–50 high-frequency Hijazi and Gulf replies. Use slightly simplified Fusha:
  - drop case endings in speech (pausal forms: *fī l-funduq*, not *fī l-funduqi*);
  - use *hādhā*, *ayna*, *kam*, *mādhā/mā*.
  Sounding "bookish" is fine and is socially positive in a religious setting.
- **Officials** (Haram guards, *muṭawwifīn*) give instructions in Arabic, often Fusha-tinged. Learn the crowd-control words: *ṭarīq* (way), *mamnūʿ* (forbidden), *imshi/yallā* (move), *ʿalā jamb* (to the side), *wāqif* (stop), *rūḥ* (go), *min hinā* (from here).
- **Hijazi pronunciation:**
  - *q* is often heard as *g* (*gāl*), especially in Bedouin-influenced speech; urban speech often uses a glottal stop or *q*.
  - *th* is often heard as *t* or *s*.
  - *dh* is often heard as *d* or *z*.
  - Forms V/VI take a prefixed *a-/i-* (*itkassar*).
  - Distinctive words: *daḥḥīn* (now), *gīd* (already), *baghā* (want).

### 150 high-value phrases

Fusha is given first, then the Hijazi or Gulf form where it differs (H:). Arabic script is omitted because the learner works by ear; add it in course materials if needed.

**A. Greetings and politeness (1–25)**
1. as-salāmu ʿalaykum / wa ʿalaykumu s-salām wa raḥmatu llāh
2. ahlan wa sahlan / marḥaban (H: hala, ḥayyāk allāh, ya hala)
3. kayfa ḥāluk? (H: kēf ḥālak / kēfak? Reply: al-ḥamdu lillāh, bikhayr)
4. anā bikhayr, al-ḥamdu lillāh. wa anta? (to a woman: anti)
5. ṣabāḥa l-khayr / ṣabāḥa n-nūr
6. masāʾa l-khayr / masāʾa n-nūr
7. shukran jazīlan / jazāka llāhu khayran (to a woman: jazāki; plural: jazākum). Reply: wa iyyāk(um)
8. ʿafwan / lā shukra ʿalā wājib
9. min faḍlik / law samaḥt (H: law samaḥt / allāh yikhallīk)
10. ʿafwan / āsif (sorry) (H: ma ʿalēsh / ʿafwan)
11. naʿam / lā (H: aywa / ēh; no = lā)
12. ṭayyib / ḥasanan (OK) (H: māshī, ṭayyib, ṭab, ḥāḍir, tamām)
13. ismī … wa mā smuk? (H: ēsh ismak?)
14. anā min Barīṭāniyā / Amrīkā … (Where are you from? H: inta min fēn?)
15. anā muslim/muslima, aḥjuju / aʿtamiru (I am doing Hajj/Umrah)
16. ʿumra maqbūla / ḥajj mabrūr wa dhanb maghfūr (blessing to pilgrims; reply: minnā wa minkum)
17. taqabbala llāhu minnā wa minkum
18. bāraka llāhu fīk
19. fī amāni llāh / maʿa s-salāma (H: maʿa s-salāma; reply: allāh yisallimak)
20. tafaḍḍal (please, go ahead, take it; very common in H as well)
21. inshāʾa llāh / māshāʾa llāh / subḥāna llāh
22. lā baʾs (no problem) (H: mā fī mushkila, ʿādī, mā ʿalēh)
23. yā akhī / yā ukhtī (H: yā ʿammī = to an older man ("uncle"); yā khāla = to an older woman; yā shēkh, yā ḥajj/ḥajja, yā walad (to a boy, informal))
24. anā ataʿallamu l-ʿarabiyya li-afhama l-qurʾān
25. takallam bibuṭʾ min faḍlik (speak slowly) / aʿid min faḍlik (repeat) (H: shwayya shwayya)

**B. Understanding and communication (26–40)**
26. hal tatakallamu l-inglīziyya? (H: titkallam inglīzī?)
27. lā afham / fahimtu (H: mā fhimt / fhimt)
28. mā maʿnā …? (What does … mean?) (H: ēsh yaʿnī …?)
29. kayfa taqūlu … bil-ʿarabiyya?
30. hal hādhā ṣaḥīḥ? (H: kida ṣaḥ?)
31. uktubhā lī min faḍlik (write it for me)
32. qalīlan / kathīran (H: shwayya / kitīr, wājid)
33. mādhā? / mā hādhā? (H: ēsh? ēsh hādhā/dā?)
34. limādhā? (H: lēsh?)
35. matā? (H: mitā? / emta?)
36. ayna? (H: fēn? wēn?)
37. kayfa? (H: kēf?)
38. man? (H: mīn?)
39. kam? (how many / how much)
40. al-āna / baʿda qalīl / ghadan (H: daḥḥīn / baʿdēn / bukra)

**C. In the Haram: directions and worship (41–70)**
41. ayna l-ḥammām / dawrāt al-miyāh? (H: fēn al-ḥammām?)
42. ayna makān al-wuḍūʾ?
43. ayna muṣallā n-nisāʾ?
44. ayna bāb al-Malik Fahd / Bāb as-Salām / Bāb al-ʿUmra?
45. min ayna aṭ-ṭarīq ilā l-maṭāf?
46. ayna yabdaʾu s-saʿy? (aṣ-Ṣafā / al-Marwa, al-masʿā)
47. kam shawṭan baqiya? (H: kam shōṭ bāgī?)
48. hal hādhā ṭ-ṭābiq al-awwal? (H: ad-dōr al-awwal; floor = dōr)
49. ayna zamzam? / māʾ zamzam bārid?
50. matā l-adhān? / matā tuqāmu ṣ-ṣalāh? (H: mitā l-iqāma?)
51. hal hādhihi ṣalātu l-janāza?
52. ayna l-qibla?
53. hal yajūzu an uṣallī hunā?
54. al-makān mumtaliʾ / zaḥma (crowded) (H: zaḥma marra)
55. hal yumkinunī an ajlisa hunā? (H: mumkin ajlis hina?)
56. afsiḥ lī min faḍlik (make room) (Quranic: tafassaḥū fī l-majālis, 58:11)
57. ḍiʿtu / ana tāʾih (I am lost) (H: ana ḍāyiʿ)
58. ḍāʿa minnī ibnī / jawwālī (I lost my son/phone)
59. ayna maktab al-mafqūdāt?
60. ayna l-Rawḍa ash-Sharīfa? / matā waqt az-ziyāra li-n-nisāʾ? (Madinah)
61. kayfa aḥjizu mawʿid ar-Rawḍa fī taṭbīq Nusuk?
62. ayna maqbarat al-Baqīʿ? / Masjid Qubāʾ? / Jabal Uḥud?
63. hal hādhā ṭ-ṭarīq ilā Minā / ʿArafāt / Muzdalifa?
64. ayna l-jamarāt? / mā hādhā l-jisr?
65. matā nanfiru ilā ʿArafāt? (Quranic: nafar 9:122, afāḍa 2:198)
66. ayna l-ḥamla / al-mukhayyam raqm …? (camp number)
67. hal ar-ramy al-yawm baʿda ẓ-ẓuhr?
68. ayna aḥliqu shaʿrī / al-ḥallāq? (H: al-mizayyin, al-ḥallāq)
69. ṭawāf al-ifāḍa / ṭawāf al-wadāʿ: matā?
70. ʿafwan, hādhā makān li-n-nisāʾ faqaṭ (Sorry, this place is for women only)

**D. Asking about Islamic matters (71–85)**
71. yā shaykh, ʿindī suʾāl (O shaykh, I have a question)
72. mā ḥukmu …? (What is the ruling on …?)
73. hal yajūzu …? (Is it permissible to …?) / hal ʿalayya fidya / dam?
74. nasītu … fa-mādhā afʿal?
75. hal ṭawāfī ṣaḥīḥ?
76. ayna aqrab masjid? / ayna l-ḥalaqa / ad-dars?
77. mā maʿnā hādhihi l-āya? (What does this ayah mean?)
78. man al-imām al-yawm? (H: mīn al-imām?)
79. qirāʾatuhu jamīla jiddan, māshāʾa llāh
80. ud'u lī (pray for me) / lā tansanā min duʿāʾik
81. ayna maktab al-iftāʾ / al-fatwā?
82. anā musāfir; hal aqṣuru ṣ-ṣalāh?
83. hal hādhā ḥalāl?
84. kam ṣalla ar-rakaʿāt? (How many rakʿas did he pray?)
85. hal yūjad tarjama bil-inglīziyya li-l-khuṭba?

**E. Hotel and lodging (86–100)**
86. ʿindī ḥajz bismi … (I have a booking under the name …)
87. ayna l-funduq … ? (H: fundug)
88. kam raqm al-ghurfa? / ghurfatī raqm …
89. al-miftāḥ / al-biṭāqa lā taʿmal (H: al-kart mā yishtaghil)
90. al-mukayyif lā yaʿmal (the AC) (H: al-mukayyif kharbān)
91. urīdu manāshif / māʾ / ṣābūn (H: abgha / abghā fuwaṭ, mōya)
92. matā l-fuṭūr? (breakfast) / ayna l-maṭʿam?
93. hal yūjad wāy fāy? kalimat as-sirr?
94. ayna l-miṣʿad? (lift) (H: al-asansēr)
95. naẓẓif al-ghurfa min faḍlik
96. urīdu an ughādira ghadan (H: bukra bamshī)
97. matā mawʿid al-khurūj? (checkout)
98. hal yumkin an atruka l-ḥaqāʾib hunā?
99. aḥtāju sarīran iḍāfiyyan / baṭṭāniyya
100. al-ḥāfila matā taʾtī? (bus) (H: al-bāṣ mitā yijī?)

**F. Transport (101–115)**
101. ilā l-Ḥaram min faḍlik (H: al-Ḥaram, law samaḥt)
102. kam al-ujra ilā …? (H: bikam ilā …? / kam tākhudh?)
103. hādhā ghālin; (H: ghālī marra; how about 30? b-thalāthīn?)
104. qif hunā (stop here) (H: nazzilnī hina / waggif hina)
105. ʿalā l-yamīn / ʿalā l-yasār / ilā l-amām (H: yamīn / yasār or shimāl / sīda, ʿala ṭūl)
106. qarīb am baʿīd? (H: garīb walla baʿīd?)
107. kam daqīqa? (H: kam dagīga?)
108. ayna maḥaṭṭat al-qiṭār? (Ḥaramain train)
109. ayna mawqif al-ḥāfilāt / at-taksi?
110. urīdu an adhhaba ilā l-maṭār (H: abgha arūḥ al-maṭār)
111. asriʿ / tamahhal min faḍlik (H: shwayya shwayya / bisurʿa)
112. hal taʿrifu hādhā l-ʿunwān? (H: tiʿrif dā l-makān?)
113. hādhā l-mawqiʿ ʿalā l-khāriṭa (location on the map)
114. udfuʿ naqdan am bil-biṭāqa? (H: kāsh walla shabaka?; mada = card network)
115. intaẓir hunā min faḍlik (H: istannā hina)

**G. Shopping and money (116–130)**
116. bikam hādhā? / kam thamanu hādhā? (H: bikam dā? / bikam hādhī?)
117. urīdu … (H: abgha / abī …)
118. hal ʿindaka …? (H: ʿindak …? / fī …?)
119. ʿindaka maqās akbar / aṣghar? (bigger / smaller size)
120. ghālin jiddan; hal yūjad khaṣm? (H: fī takhfīḍ? ākhir siʿr?)
121. ākhudhu hādhā / lā urīdu (H: bākhudh dā / mā abgha)
122. ʿindī faqaṭ …riyāl (H: mā maʿī illa …)
123. ayna aqrab ṣarrāf / ṣarrāf ālī (ATM)?
124. urīdu tamran / sajjāda / misbaḥa / ʿiṭran (dates / prayer mat / tasbih / perfume)
125. min ayna hādhā? hal huwa min al-Madīna? (ʿajwa)
126. aʿṭinī kīlo min faḍlik (H: ʿaṭnī kīlo)
127. hal yumkin at-tawṣīl? (delivery)
128. al-fātūra / al-īṣāl min faḍlik (receipt)
129. hādhā khaṭaʾ fī l-ḥisāb (H: fī ghalaṭ)
130. jamīl! / mumtāz! (H: ḥilu! marra ḥilu!, zēn)

**H. Food (131–138)**
131. urīdu mā lan / qāʾimat aṭ-ṭaʿām (menu)
132. bidūn filfil / ḥārr? (H: ḥārr walla lā?)
133. māʾ bārid / shāy bi-l-naʿnāʿ / qahwa ʿarabiyya
134. al-ḥisāb min faḍlik (H: al-ḥisāb law samaḥt)
135. hal hādhā li-l-ʿāʾilāt? (family section)
136. lazīdh / ṭayyib (H: lazīz / marra ḥilu)
137. sufra / ṭaʿām li-ithnayn
138. hal yūjad aklun nabātī / bidūn laḥm?

**I. Health and emergencies (139–146)**
139. anā marīḍ/marīḍa (H: ana taʿbān)
140. ʿindī ṣudāʿ / ḥumma / suʿāl / ishāl (headache / fever / cough / diarrhoea)
141. ayna ṣ-ṣaydaliyya / al-mustashfā / al-markaz aṣ-ṣiḥḥī?
142. ʿindī ḥasāsiyya min …
143. urīdu dawāʾ li-… (H: abgha dawā li-…)
144. sāʿidnī! (Help me!) / ittaṣil bi-l-isʿāf (997)
145. qadamī tuʾlimunī (H: rijlī tiʿawwirnī)
146. anā aṣābanī ḍarbatu shams / ʿaṭash (heatstroke / thirst)

**J. Small talk (147–150)**
147. hādhihi awwal ʿumra lī / ḥajjatī al-ūlā
148. al-jaww ḥārr jiddan al-yawm (H: al-jaww ḥarr marra)
149. Makka / al-Madīna jamīla, al-ahl kuramāʾ
150. allāh yaʿṭīk al-ʿāfiya (said to a worker) / yaʿṭīka l-ʿāfiya (H: allāh yiʿṭīk al-ʿāfiya; reply: allāh yiʿāfīk)

**Hijazi and Gulf replies to train by ear:** *ēsh tabgha?* (What do you want?), *fēn rāyiḥ?* (Where are you going?), *mā fī* (there isn't any), *khalāṣ* (done, enough), *bass* (only, enough), *yallā* (come on), *mū kida* (not like that), *kida* (like this), *ḥagg-ī/ḥaggak* (mine/yours), *ʿashān* (because), *marra* (very), *waddīnī* (take me), *ʿalā rāsī* (with pleasure), *ḥāḍir* (OK, at your service), *istannā* (wait), *dōr* (floor or turn), *mōya* (water), *zēn* (good).

### Bridging Quranic vocabulary to modern speech

**Same root, shifted meaning**

| Word | In the Quran | Modern meaning |
|---|---|---|
| *sayyāra* | caravan (12:10, 12:19) | car |
| *ṣaḥīfa* / *ṣuḥuf* | scroll | newspaper |
| *hātif* | (root *h-t-f*: a voice calling) | telephone |
| *jāmiʿa* | (root *j-m-ʿ*: gathering) | university |
| *maktab* | (root *k-t-b*) | office, desk |
| *qarya* | town or city | village |
| *sāʿa* | the Hour (of Judgement) | hour, watch, clock |
| *sulṭān* | authority or proof | ruler, authority |
| *dawla* | circulation, alternation (59:7) | state |
| *ḥizb* | faction or party | political party |
| *umma* | community | nation |
| *kitāb* | decree, scripture | book |
| *ḥadīth* | talk or story | conversation; also "modern" |
| *aṣḥāb* | companions | owners, friends |
| *rizq* | divine provision | livelihood, income |
| *maṭār* | (from *ṭāra*, to fly; *ṭāʾir*, bird) | airport |
| *ṭayyāra* | (root *ṭ-y-r*, same as *ṭāʾir*) | aeroplane |

**Same meaning, with a Quranic anchor.** These words carry the same sense in the Quran and in modern speech. Point the learner to the ayah they already know.
- *yamīn/shimāl*: right and left, as in *aṣḥāb al-yamīn/ash-shimāl* (Al-Wāqiʿa). Hijazi uses *shimāl* for "left" in daily speech.
- *ṭaʿām, māʾ, bayt, bāb, ṭarīq, sabīl, sūq* (25:7, "walks in the markets"), *thaman* (price), *dirham*, *ḥisāb* (bill), *nafaqa*.
- *ajr*: reward → wage or fee.
- *funduq* is **not** Quranic. Teach it as new.

**Particles, Quranic vs spoken**
- The Quranic forms *inna, lan, qad, sawfa, idhā, ladun, laʿalla, ayyāna* are understood in conversation but are bookish.
- Spoken MSA prefers *sa-*, *lan*, *ʿinda*, *rubbamā*, *ʿindamā*, *matā*, *ayna*.
- Hijazi uses *b-/ḥa-* for the future (*bamshī*), *mū* (not), *mā… (sh)* in negation, and *ḥagg* for possession.

**Verbs that are frequent in speech but rare or with a different nuance in the Quran**
- *urīdu* (Quranic *arāda* = will, intend) is fine in Fusha. Hijazi uses *abgha*, from Quranic *baghā*/*ibtighāʾ* (to seek) — a great bridge word.
- *dhahaba* (go; Hijazi *rāḥ*), *jāʾa/atā* (Hijazi *jā/yijī*), *raʾā* (Hijazi *shāf*), *ʿamila/faʿala* (Hijazi *sawwā*: compare Quranic *sawwā* = to fashion), *ʿarafa* (know), *akala/shariba*, *ishtarā* (buy, as in "they sold it for a small price") (Hijazi *shtarā*), *bāʿa* (sell).

**How to bridge in dialogues.** Each story dialogue should reuse 5–10 Quran lemmas from the lesson in a modern setting. For example, after Al-Fatiha: *ihdinā* → *ihdinī ilā ṭ-ṭarīq* ("guide me to the road"); *ṣirāṭ mustaqīm* → *imshi mustaqīman* ("go straight"). After Quraysh: *ṭaʿām, khawf, bayt, riḥla* → *riḥla* = trip, *riḥlatunā ilā Makka* ("our trip to Makkah").

---

## 6. Realistic timelines [estimate]

These assume an adult using our audio course plus spaced review, at about 1 h per day.

| Goal | Hours | Calendar at ~1 h/day |
|---|---|---|
| (a) Follow salah texts word by word | 5–15 h | 1–2 weeks |
| (a) Follow Juz ʿAmma with a general grasp of each ayah | 60–120 h | 2–4 months |
| (b) Understand most of the Quran by ear (1,000–1,500 core lemmas known, ~89–93% coverage, plus grammar items 1–15) | 500–900 h | 1.5–2.5 years |
| (b) Understand the Quran by ear "like English": ~2,000–3,000 lemmas, ≥95% coverage, automatic morphology, most ayat followed in real-time recitation | 1,200–2,000+ h | 3–5 years |
| (c) Survival Fusha for Hajj/Umrah (the 150 phrases, numbers, prices, directions, plus understanding common Hijazi replies) | 40–80 h | 1–3 months |
| (c) Simple-to-intermediate comfortable conversation (ACTFL Intermediate-Mid: talk about self, travel, worship, family; follow slowed replies) | 400–700 h, at least 25% of it speaking practice with a live partner | 1.5–2 years |
| (c) Professional-level MSA | FSI estimate: 2,200 classroom hours, Arabic in Category IV, ~88 weeks full-time | – |

**Caveats**
- **Token coverage is not comprehension.** The Quran uses ellipsis, rhetorical shifts (*iltifāt*), oaths, idioms, and context from *asbāb al-nuzūl*. Even native Arabic speakers rely on tafsir for many passages. "Like English" is an ideal you approach gradually, not a fixed endpoint.
- **Listening speed.** Recognising words while reading is much faster than recognising them in murattal recitation. Hearing the same ayah many times (salah, repeat-listening) is the biggest accelerator. The learner's existing recitation fluency helps a lot with sound recognition.
- **Speaking needs speaking.** Listening-first input builds comprehension. Spoken output needs dialogue practice: shadowing, role-play, and a tutor or partner. Expect a "silent period" where understanding runs far ahead of speaking.
- **Fusha vs dialect.** Fusha speakers are understood everywhere, but they will hear replies in dialect. Budget 15–30 h of Hijazi/Gulf listening.
- **Hours vary widely** with prior exposure to Arabic sounds (an advantage here), consistency, review discipline, and age. The ranges are planning estimates from FSI scales, coverage research, and programme lengths. No controlled study of this exact learner profile exists.

---

## Sources
- Quranic Arabic Corpus, lemma frequency list: https://corpus.quran.com/lemmas.jsp?page=1 (3,680 non-verb lemmas; top lemmas *min* 3226, *Allāh* 2699…)
- Morphology data used for my calculations (mirror of Quranic Arabic Corpus v0.4): https://github.com/mustafa0x/quran-morphology
- Kais Dukes's statistics (77,430 words; 18,994 surface forms; 12,183 stems; 1,685 roots): https://quickestwaytoquran.blogspot.com/2013/08/
- Understand Quran Academy courses and claims: https://understandquran.com/ ; 125 words / 50% claim: https://www.scribd.com/document/481289978/1-pdf ; Learn Quran app: https://apps.apple.com/us/app/learn-quran/id584350014 ; 80% booklet: https://alkitab.com/44700.html , https://ibtbooks.com/shop/80-of-quranic-words-10-pcs-pack/
- Bayyinah Dream (10-month program): https://muslimmatters.org/2010/04/14/bayyinah-institute-first-full-time-classical-arabic-on-campus-program-in-the-us/ , https://muslimmatters.org/2011/12/01/bayyinah-dream-so-how-was-it/ ; Bayyinah FAQ on ARÖMER: https://bayyinah.com/faq/program-overview
- Arabic with Husna: https://literal.club/book/arabic-with-husna-dczy9 ; independent critique: https://kalimah-center.com/does-bayyinah-tv-teach-arabic/
- Madinah books: https://dar-us-salam.com/quran/learn-the-quran/236-arabic-course-3-volume-set.html , https://abdurrahman.org/arabic-learning/madina-arabic
- Abdul Wahid Hamid, Access to Qur'anic Arabic: https://soundvision.com/node/1842
- Wardini, Key Words of the Qur'an (weighted coverage): https://gorgiaspress.com/images/uploaded/978-1-4632-4549-8_QAOK.pdf
- Popular coverage claims: https://earabiclearning.com/blog/?p=16295
- Listening lexical coverage: van Zeeland & Schmitt (2013), via https://www.cambridge.org/core/journals/language-teaching/article/how-much-vocabulary-is-needed-to-use-english-replication-of-van-zeeland-schmitt-2012-nation-2006-and-cobb-2007/1D217A56A2E0056E67802A6A8360FDDE
- FSI Arabic 2,200 hours: https://webarchive.library.unt.edu/web/20210105072258/https://www.state.gov/foreign-language-training
- Hejazi Arabic features: https://en.wikipedia.org/wiki/Hejazi_Arabic
- Hajj language realities (80% of pilgrims are non-Arabic speakers, Nusuk translation): https://www.arabnews.pk/node/1358756 , https://www.arabnews.pk/node/2533551
- Alafasy full Quran audio, 29 h 54 min: https://storytel.com/tv/books/the-holy-quran-sheikh-mishary-rashid-alafasy-10375284
- Al-Madina Institute Quranic Arabic: https://www.almadina.org/quranic-arabic/program
