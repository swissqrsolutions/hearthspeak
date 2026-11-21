# Build three dialect courses, then leave the app

**A personal, zero-cost, offline Assimil-style course can realistically give an English-speaking adult a strong A2–B1 speaking base, with good pronunciation and automatic core phrases, in Zürich German, Bengaluru Kannada and urban Levantine Arabic. It cannot by itself produce B2–C1 fluency, and it will not produce native-level speech.** The design that gets the most speaking out of the fixed format is this:

- **Keep Assimil's two waves.** Run a passive phase for lessons 1–49, then an active phase from lesson 50 in which an old lesson is re-spoken from English each day.
- **Add speaking work as audio, not as exercises.** Turn every dialogue into shadowing tracks and pause-then-answer anticipation tracks, and add a weekly timed retelling.
- **Teach grammar through a slow, warm grandparent narrator** who builds sentences step by step, in the Michel Thomas style.

On varieties:

- **Swiss German:** teach Zürich German in a consistent, readable chat-style spelling.
- **Kannada:** teach educated Bengaluru–Mysuru colloquial, with Kanglish treated as real grammar.
- **Arabic:** teach urban Levantine as the speaking dialect, with Egyptian as a listening add-on. A growing Fuṣḥā and Quran strand can lean on the shared root system and the fact that a small core of high-frequency words makes up much of the Quranic text. Dialect alone does not open the Quran.

Audio is the hardest engineering problem, and it differs sharply by language:

- **Kannada:** has good free voices.
- **Levantine and Egyptian Arabic:** have new, unproven community voices.
- **Swiss German:** has no usable downloadable voice, so it needs human recordings.

Everything should be generated once on the Windows PC and copied to the phone as audio files. The parts no app can provide are real conversation, a listener's corrections, and the thousands of hours that official training data shows are needed. A good course plans for these from about lesson 30.

## Fixed design constraints

The user has already decided the following, and the rest of this report works inside them:

- **Base language:** English.
- **Lesson page layout:** each row has the target-language line on the left, the English translation in the middle, and a ▶ button on the right that plays that line's audio.
- **Delivery:**
  - a folder of static HTML pages plus MP3/Opus files, copied to the phone and opened offline in the browser;
  - an optional free GitHub Pages mirror;
  - a PDF export.
- **Cost:** zero in total. No paid APIs, hosting or app stores.
- **Teaching:** grammar and vocabulary live inside the lessons, as notes plus a slow, warm grandpa/grandma English voice. There are no separate exercises.
- **Building:** reuse existing open-source repos where possible.

These choices remove several options the underlying research considered:

- **No on-device speech models or app framework.** The technical research recommended a Vite/React progressive web app or a Flutter APK ([ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs), [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)). The static-folder decision is simpler and still sound, because pre-recorded audio needs nothing on the phone except a browser.
- **No paid LLM API for drafting.** Drafting has to use the free claude.ai chat or a local model.

## The honest ceiling: B2–C1 is reachable, native-like is not

The official US Foreign Service Institute (FSI) figures set the scale. They are hours of full-time classroom study, plus about 17 hours a week of self-study, to reach ILR level 3, which is roughly upper B2 to low C1:

| Language | FSI category | Class hours |
|---|---|---|
| German | II | **~828** |
| Hindi, Bengali, Urdu (closest to Kannada) | III, "hard" | **~1,012** |
| Arabic | IV, "super-hard" | **2,200** |

Source: [U.S. State Dept](https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training/).

A few points matter for this course:

- **Kannada and Swiss German are not on the list.** Kannada is placed in Category III here only by analogy. The German figure is for Standard German and does not include extra listening time for the dialect.
- **Arabic's figure is for one variety.** FSI students usually study a single dialect ([fsi-language-courses.org](https://www.fsi-language-courses.org/blog/fsi-language-difficulty/)).
- **Counting self-study, Arabic comes to about 3,500 hours of total effort** ([langtrack](https://blog.langtrack.app/posts/fsi-language-difficulty-categories/)).
- **An Assimil course plus its second wave is roughly 60–150 hours.** That is about 5–15% of what German needs, and much less of what Arabic needs.

Native-level speech is ruled out for practical purposes. Hartshorne, Tenenbaum and Pinker studied about 670,000 English speakers and found that **learners must start by about age 10–12 to reach native-level grammar**. Later starters "literally run out of time" before a sharp drop in learning rate at about 17–18, and full attainment took about 30 years of exposure ([PMC6559801](https://pmc.ncbi.nlm.nih.gov/articles/PMC6559801/)). The critical-period debate is still open ([Frontiers 2023](https://www.frontiersin.org/journals/physics/articles/10.3389/fphy.2023.1142584/full)), but none of the evidence supports a late learner who sounds undetectably native.

The goals that are honest to promise are:

- **The long-term goal:** fluent, highly intelligible speech with an accent, at B2–C1. This is achievable, but most of those hours happen outside the app, with people.
- **The app's own goal:** a solid A2–B1 foundation, unusually clean pronunciation, and a few thousand phrases that come out automatically.

Assimil's own claims also need adjusting:

- **Assimil's claim:** its "With Ease" courses reach B2 in 4–5 months of 30–40 minutes a day ([Reddit thread quoting the claim](https://www.reddit.com/r/languagelearning/comments/1fhdh0g/can_you_really_get_to_b2_from_zero_with_only/)).
- **What reviewers report:**
  - One reviewer who finished a course put herself at "**A2**" and said she could not yet give a full self-introduction ([Fluent in 3 Months](https://www.fluentin3months.com/reviews/assimil-review/)).
  - Forum users estimate **A2/B1**, with grammar closer to B1/B2 but vocabulary lagging ([LingQ forum](https://forum.lingq.com/t/assimil/19152)).
  - Another reviewer calls the B2 cover claims "extremely unrealistic" ([Learn to Language](https://learntolanguage.com/assimil-french-2020-edition-review/)).

The texts reach B2-level grammar, but the learner usually does not. The gap is in speaking output and in vocabulary, so those are the two things this course has to add.

**Vocabulary targets:**

- **About 2,000–3,000 word families give about 95% coverage of everyday speech.** Adolphs and Schmitt found 3,000 families give 95.9% coverage and called that "a better goal" than 2,000 ([Adolphs & Schmitt 2003](https://www.lextutor.ca/cover/papers/adolphs_schmitt_2003.pdf)).
- **6,000–7,000 families are needed for comfortable listening (98% coverage).**
- **Educated native speakers know about 20,000 families** ([Nation 2006](https://www.lextutor.ca/cover/papers/nation_2006.pdf)).

These figures come from English corpora. For Kannada and Arabic, which build words by adding many endings and patterns, count dictionary words plus common inflected phrases. A course of about 110 lessons should aim at the **top ~2,500–3,000 spoken items in phrase form**.

## Assimil's two waves, rebuilt for speaking

### What Assimil does, and what it lacks

Assimil's own structure, according to the publisher ([Assimil](https://www.assimil.com/en/articles/5-the-assimil-method)):

- **Passive phase, lessons 1–49:** daily 30–40-minute lessons in which learners "read, listen, repeat." Every 7th lesson is a review lesson.
- **Active phase, from lesson 50:** learners "reproduce the statements… in the foreign language, concealing the answers." This is the **second wave**: lesson 50 brings back lesson 1, lesson 51 brings back lesson 2, and so on. It continues past lesson 100 until every lesson has been revisited ([Learn to Language](https://learntolanguage.com/how-to-use-assimil/)).
- **Grammar:** taught in notes, not drills.
- **Literal translation:** printed next to the natural translation, so word order becomes intuitive ([FI3M](https://www.fluentin3months.com/reviews/assimil-review/)).

The structure fits the user's format almost exactly. The gap is that **Assimil's only speaking steps are "repeat after the audio" and the second-wave reverse translation.** Neither is timed, gives feedback, or asks for spontaneous speech.

### Speaking techniques that fit the no-exercises rule

The added techniques with the best evidence all fit the "no separate exercises" rule. Each one can be delivered as an extra audio track or as a note.

**Shadowing.** The learner speaks along with the native audio, either simultaneously or a moment behind it.
- **Evidence:**
  - It improved both speaking and listening in a British Council study ([Pwint Yee Win](https://www.teachingenglish.org.uk/sites/teacheng/files/Pwint%20Yee%20Win_DOI_v3.pdf)).
  - It is especially good for **prosody**, the rhythm and melody of speech ([JKLST review of Hamada](https://jklst.org/index.php/home/article/download/327/297/1056)).
  - A 2025 systematic review grounds it in attention to phonemes and stress ([Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/29984475.2025.2546827)).
- **Why it matters here:** prosody is where Zürich intonation and Arabic emphatic consonants go wrong.
- **Implementation:** for each lesson, export a "shadow" MP3 in which every line plays slowly, then at natural speed, with a gap after each.

**Anticipation, which replaces the second wave's silent reverse translation.** This follows Pimsleur: the English prompt plays, then a 3–5-second pause in which the learner says the line aloud, then the native answer plays. Pimsleur's original 1967 spacing schedule (5 s, 25 s, 2 min, 10 min, 1 h, 5 h, 1 day, 5 days…) is a historical proposal, not an optimized result ([Art of Memory](https://artofmemory.com/blog/the-pimsleur-language-method/)). The technique still fits Assimil's activation phase well.
- **Implementation:** each lesson gets a second "active wave" MP3 that runs English, then silence, then the target-language line. The day-50 page links to lesson 1's active-wave file.

**Timed repetition of the same talk (Nation's 4/3/2).** The learner gives the same talk three times, in 4, then 3, then 2 minutes.
- **Evidence:**
  - Speech rate rose from 86 to 127 words per minute. For every speaker, "a reduction in the number of false starts, repetitions and spoken hesitations" ([Nation 1989](https://www.wgtn.ac.nz/lals/resources/paul-nations-resources/paul-nations-publications/publications/documents/1989-Fluency.pdf)).
  - A recent study found large effects on repetitions (d = 0.92) and self-corrections (d = 0.78) ([ResearchGate](https://www.researchgate.net/publication/362697362_Improving_Speaking_Fluency_Through_432_Technique_and_Self-Assessment)).
  - The gains come from producing longer **phrases** automatically ([Conti](https://gianfrancoconti.com/2017/03/04/en-route-to-spoken-fluency-via-task-repetition-the-4-3-2-technique-and-market-place/)).
- **Implementation:** the weekly review lesson (every 7th) ends with a narrator prompt: "Now tell the story of this week's lessons, out loud, three times, faster each time."
- **Feedback:** the phone's built-in voice recorder stands in for the listener.

**Spaced repetition with FSRS (optional).** FSRS is a modern review-scheduling algorithm.
- **Evidence:** in a benchmark of about 727 million reviews it predicted recall better than the older SM-2 algorithm. Its developers estimate **about 20–30% fewer reviews for the same retention** ([studyglen](https://studyglen.com/guides/best-spaced-repetition-apps)).
- **How it fits:** scheduled flashcard reviews would add a separate exercise, which the user ruled out. The cleanest zero-code option is to also export each lesson's lines as an **Anki deck with audio**, for free AnkiDroid, which includes FSRS. That deck is an optional extra, not part of the course itself.

**The grandparent narrator in Michel Thomas style.** Michel Thomas's principles are "no memorisation, no tests, no worrying about mistakes" and "build, don't memorise" ([Michel Thomas](https://michelthomas.com/landing-page/mt-method/)).
- **How it fits:** this is close to the warm grandpa/grandma voice the user wants. The narrator rebuilds each new structure from known parts: "So if *I go* is *ich gang*… how would you say *I'm going shopping*?" Then it pauses before the answer.
- **Caveat:** no controlled studies of the Michel Thomas method were found. It is chosen because it fits the format, not because it has proof.

### Daily routine per lesson page

| Step | What the learner does | Audio file |
|---|---|---|
| 1 | Listen with the screen off | `L023_dialogue.opus` |
| 2 | Read along; tap ▶ on any line | per-line files `L023_07.opus` |
| 3 | Grandparent explains the notes | `L023_notes_en.opus` |
| 4 | Shadow slow → natural | `L023_shadow.opus` |
| 5 (from L50) | Active wave: English → pause → answer for lesson N−49 | `L001_active.opus` |
| Every 7th | Review lesson + 4/3/2 retelling, self-recorded | `L028_review.opus` |

## Choosing each variety, and the grammar order that follows from it

### Swiss German: Zürich dialect, chat-style spelling, audio first

"Swiss German" is a group of Alemannic dialects, not one language.

**Background:**
- **Swiss German is everyday speech for all social classes, and Standard German is the written language.** Swiss German has about 4.9 million native speakers ([Wikipedia](https://en.wikipedia.org/wiki/Swiss_German)).
- **Zürich German is the dialect of the largest city and canton** ([Preply](https://preply.com/en/blog/swiss-german-vs-german)).
- **Zürich uses one plural verb ending for all three persons** (*mir/ihr/si mached*), whereas Bernese has two ([de.Wikipedia](https://de.wikipedia.org/wiki/Alemannische_Grammatik)).
- **Bernese is the best-liked dialect** in reader polls ([SRF](https://www.srf.ch/radio-srf-1/mundart/beliebtester-dialekt-baerenstarkes-berndeutsch-warum-eigentlich)). It works better as an occasional "dialect spotlight" than as the main track.

**Spelling.** There is no official spelling. The traditional Dieth system "is rarely followed" for Zürich German ([Wikipedia](https://en.wikipedia.org/wiki/Zurich_German)). WhatsApp research shows chat partners adjust to each other's spellings, for example switching from *ned* to *nöd* ([Horizons](https://horizons-mag.ch/?p=6352)). The course should therefore use one moderate convention, shown in a sidebar with one or two common variants:
- double vowels for long vowels (*Ziit, Huus*);
- *ch* everywhere;
- *sch* before t and p (*Fescht*).

Because Swiss German is mostly spoken rather than written, **audio carries even more of the teaching than in a normal Assimil course.**

**Grammar order.** The grammar is simpler than Standard German in two big ways: **there is no simple past and no genitive case** ([Wikipedia](https://en.wikipedia.org/wiki/Swiss_German)). It has its own features instead:
- relative clauses with *wo*;
- compulsory doubling of *gaa* and *choo* ("go", "come"), as in *i gang go poschte*, "I'm going shopping";
- the progressive *am … sii*;
- possession through the dative (*em Vater sin Hund*);
- frequent Konjunktiv II politeness forms (*Ich hett gern…*).

A workable order:

| Lessons | Grammar |
|---|---|
| 1–10 | *sii/haa* ("be/have"), articles *de/d/s*, *nöd*, Sie vs. du, *Ich hett gern* |
| 11–20 | regular present tense, the short irregular verbs, *gaa*-doubling, the progressive, *-li* diminutives |
| 21–35 | the perfect (*gsi, gha, gange*), dative, *wo*-relatives |
| 36–50 | genitive substitutes, Konjunktiv II, word order in subordinate clauses |
| 51–70 | doubling with *laa/aafaa*, the double perfect, reported speech |
| 71+ | particles (*halt, äbe, gäll*), irony, recognising other dialects |

**The Zürich verb tables and article forms in the research notes come from researcher knowledge.** A native speaker must check them before any audio is made.

**Vocabulary.** **No ranked Swiss German frequency list exists.** A list can be derived from free research corpora:
- the "What's up, Switzerland?" WhatsApp corpus, with 763,650 messages ([UZH](https://whatsup.linguistik.uzh.ch/_export/raw/01_corpus/start));
- the Swiss SMS Corpus ([UZH](https://sms.linguistik.uzh.ch/));
- SwissCrawl ([arXiv](https://ar5iv.labs.arxiv.org/html/1912.00159)).

Take a Standard German core vocabulary, map it to Zürich forms, and add Swiss-specific words such as *Velo, Billet, Glace, äxgüsi, Zmorge* ([The Local](https://thelocal.ch/20180919/seven-ways-swiss-german-is-different-from-standard-german)).

**Slang.** Current youth slang can be anchored in the first Swiss Youth Word of the Year (2026): **"Würd mi", "Nöd so deep", "Peak"** ([ZHAW](https://www.zhaw.ch/de/ueber-uns/aktuell/news/detailansicht-news/event-news/jugendwort-des-jahres-schweiz-2026)). Teach it for recognition only, in a sidebar refreshed yearly.

**Pronunciation drills:**
- *ch* in every position;
- lenis vs. fortis consonants, distinguished by length rather than voicing ([Wikipedia: Zurich German](https://en.wikipedia.org/wiki/Zurich_German));
- the *ie/ue/üe* diphthongs;
- *Huus/Ziit* single vowels where Standard German has diphthongs.

**Never teach Standard German [ç] in *ich*.** It is the clearest marker of a foreigner.

**No Assimil Swiss German course exists.** The market is phrasebooks, Pimsleur, and teacher-led apps that are mostly paywalled ([App Store](https://apps.apple.com/us/app/swiss-german/id1544245498)). A speaking-first course of 100+ lessons fills a real gap.

### Kannada: Bengaluru–Mysuru colloquial, with Kanglish as legitimate grammar

**Which Kannada.** The spoken standard is the speech of "educated urban middle class speakers in the area of Bangalore" ([Schiffman via WALS](https://wals.info/refdb/record/Schiffman-1983)). It is the Mysore–Bangalore variety heard in films and on radio ([Wikipedia](https://en.wikipedia.org/wiki/Kannada); [Wikipedia: Bengaluru Kannada](https://en.wikipedia.org/wiki/Bengaluru_Kannada)).

**Write dialogues in colloquial forms from lesson 1, and footnote the formal written form.** Typical contrasts ([sharmaeklavya2 notes](https://sharmaeklavya2.github.io/notes/kannada/grammar/04-verbs.html)):
- formal *-ēne* becomes spoken *-īni*;
- *nāvu hōgidvi*, "we went";
- spoken conditionals in *-dre*.

The finite negative is mostly literary. Speech uses *-alla* and *-lilla* ([Wikipedia: Kannada grammar](https://en.wikipedia.org/wiki/Kannada_grammar)).

**Grammar order.** Kannada is verb-final, builds words by adding suffixes, and has about seven cases. Constructions with the dative ("to me") are very common and grammatically easy, so they belong in week one, as in Penn's spoken-Kannada lessons ([Penn PLC](https://ccat.sas.upenn.edu/plc/kannada/)): *nange … bēku/gottu/iṣṭa*, "I need / know / like". A workable order:

| Lessons | Grammar |
|---|---|
| 1–10 | sentences with no verb "to be", *ide/illa*, the question marker *-ā*, polite *nīvu* ("you") |
| 11–25 | non-past tense (*hōgtīni*), dative/locative/accusative cases, polite commands (*banni*) |
| 26–45 | past tense, progressive *-tidīni*, obligation (*-bēku*) and ability (*āgatte/āgalla*) |
| 46–65 | conditional *-dre*, chained verbs, helper verbs (*biḍu, koḷḷu*), quoting with *anta* |
| 66–85 | relative participles, causatives, honorific shifts |
| 86+ | formal register, proverbs, regional dialects |

**The colloquial verb forms in the notes are marked as needing a native speaker's check.** The authoritative grammars (Schiffman, the Heidelberg manual) could not be accessed.

**Kanglish.** Kanglish is rule-governed, so teach it as grammar:
- English nouns take Kannada case endings (*companyge*) ([ICON 2020](https://preview.aclanthology.org/fix_video/2020.icon-main.13.pdf));
- English verbs pair with *māḍu* ("do"), as in *swalpa adjust māḍi* ([Wikipedia](https://en.wikipedia.org/wiki/Bengaluru_Kannada)).

Slang such as *maga, sakkath, bombāṭ, kirik* is casual and for close friends only ([Preply](https://preply.com/en/blog/kannada-slang-words/)).

**Script.**
- Teach in ISO 15919-lite transliteration first, with marks for long vowels and dots for retroflex consonants.
- Add Kannada-script micro-notes from about lesson 10. The script is "almost entirely phonetic" ([Wikipedia](https://en.wikipedia.org/wiki/Kannada)).
- Show the script first by B1.

**Vocabulary.**
- **No spoken frequency list exists.** Leipzig's Kannada Wikipedia corpora are written text ([Leipzig](https://cls.corpora.uni-leipzig.de/en/kan_wikipedia_2014_10K/5.1.18_Words%20nearly%20always%20as%20next%20neighbors.html)).
- The free FrequencyWords lists do not include Kannada ([repo](https://github.com/hermitdave/FrequencyWords)).
- Build the core from the high-frequency structures above and the scenarios, then check it against Leipzig.

**Existing resources stop at survival phrases.** They are flashcard apps with 1M+ downloads, plus YouTube channels ([The South First](https://thesouthfirst.com/karnataka/bridging-the-language-divide-how-non-locals-in-bengaluru-are-learning-kannada/)). Long natural dialogues reaching B2 do not exist.

### Arabic: Levantine to speak, Egyptian to hear, Fuṣḥā and Quran as a growing strand

**Why a dialect.** Nobody acquires Modern Standard Arabic (MSA) natively, so speaking has to mean a dialect.

**Why Levantine.** The recommended main dialect is **urban Levantine (Damascus/Beirut "madani" style, with the glottal stop for qāf)**:
- Middlebury calls it "the next most commonly spoken dialect after Egyptian" ([Middlebury](https://www.middlebury.edu/language-schools/blog/which-arabic-dialect-to-learn)).
- Egyptian and Levantine TV is what makes these dialects understood across the region ([Wikipedia](https://en.wikipedia.org/wiki/Varieties_of_Arabic)).

**Why a single dialect transfers.** In Trentman and Shiri's listening study, learners understood unfamiliar dialects best when they could **identify their own dialect and MSA**. Learners scored 91% on their familiar dialect, 96% on MSA and 83% on unfamiliar dialects ([Trentman & Shiri 2020](https://journals.librarypublishing.arizona.edu/cms/article/6549/galley/6052/download/)). One solid dialect plus awareness of MSA transfers to the others.

**The alternatives:**
- **Egyptian** is the strongest alternative, with the most speakers and the widest media reach. Use it as a listening mirror track on the same scenarios.
- **Gulf** only makes sense for someone moving there.
- **Moroccan Darija** is locally relevant in French-speaking Switzerland but transfers least to other dialects.

**Assimil's own Arabic is MSA "L'arabe" (77 lessons, A1–A2).** Its dialect titles are only phrasebooks ([Assimil](https://www.assimil.com/fr/9755-apprendre-larabe)).

**Grammar order.** Spoken dialects drop case endings and most verb-mood endings. Speaking therefore depends on pronoun suffixes, the present and future particles, and negation:

| Lessons | Grammar |
|---|---|
| 1–10 | pronouns and sentences without "to be" |
| 5–15 | possessive suffixes; "have", "want" and "there is" (*ʕandi, biddi, fī*) |
| 10–25 | *b-* present, *raḥ* future, progressive *ʕam*, *ma/mish* negation |
| 20–35 | the perfect, focusing on the common irregular verb types |
| 25–40 | imperatives, the possessive construction, the dual |
| From 30 | *illi* relatives, participles |
| B1 onward | conditionals |
| B1–B2 | verb Forms I–X and broken plurals, taught by discovery from known verbs |

This sequence is a design proposal from dialect-teaching knowledge, not a published syllabus. Lingualism's free verb tables support putting verb tables at the centre ([Lingualism](https://lingualism.com/posts/posts-category-egyptian-arabic-or-levantine-arabic)).

**Social formulae.** Fixed social phrases are frequent and **obligatory**, so teach them from lesson 1 as call-and-response pairs:
- *ṣabāḥ il-khēr → ṣabāḥ in-nūr* (good morning → reply);
- *yaʕṭīk il-ʕāfye*, said to someone working;
- *ḥamdilla ʕas-salāme*, after a trip or illness;
- condolence formulae.

**Vocabulary sources:**
- The Buckwalter and Parkinson frequency dictionary covers the top 5,000 MSA words, with notes on how each is used across dialects, from a 30-million-word corpus ([Routledge](https://www.routledge.com/A-Frequency-Dictionary-of-Arabic-Core-Vocabulary-for-Learners/Buckwalter-Parkinson/p/book/9780415444347)).
- The MADAR corpus has 2,000 travel sentences in 25 city dialects and a lexicon of 1,045 concepts. Its licence is research-only, which is acceptable for private use but rules out redistribution ([MADAR](https://camel.abudhabi.nyu.edu/madar/static/pdfs/2018-LREC-MADAR-Resources.pdf)).

**Spelling and script.**
- **Spell dialect Arabic etymologically.** Keep ق and ث even when they are pronounced ʔ and t/s, so that reading MSA and the Quran later costs nothing.
- **Introduce the script gradually:**
  - lessons 1–10: transliteration only;
  - lessons 11–30: script and transliteration side by side;
  - lesson 31 onward: script first.
- **Teach Arabizi (Latin letters plus numerals, e.g. 3 = ع, 7 = ح) as a reading skill for chats** ([Wikipedia](https://en.wikipedia.org/wiki/Arabic_chat_alphabet)).

**How the dialect course helps with the Quran, and where it stops.**

What it gives:
- **The root-and-pattern system is shared.** Once Forms I–X are taught by discovery, a learner who knows *ʕallam/tʕallam/istaʕmal* in dialect can break down Quranic words built on the same roots.
- **The religious formulae from lesson 1** (*inshallah, mashallah, il-ḥamdilla, allāh yirḥamo*) give a running start on Quranic phrasing.
- **The Quran's vocabulary is concentrated.** The Quranic Arabic Corpus lists about **3,680 lemmas** ([corpus.quran.com](https://corpus.quran.com/lemmas.jsp?page=20)). One analysis found that **227 words repeated at least 50 times make up more than half of the Quran's running text** ([UIN Malang study](https://ejournal.uin-malang.ac.id/index.php/ijazarabi/article/download/32441/12900)). A targeted list of a few hundred items therefore pays off well, and many of them overlap with the dialect core.

Where it stops:
- **Classical Arabic keeps the case and mood endings, the verb system and the literary vocabulary that dialects dropped.** Spoken fluency does not turn into Quran comprehension without dedicated study.

Recommended "Fuṣḥā and Quran corner":
- **About every 6th lesson:** a short Fuṣḥā corner, such as a sign, a headline or a dialect-vs-MSA contrast (*shu → mādhā*; *mish → laysa/lā/lam/lan*).
- **From about lesson 70:** expand it into a Quran strand. Each piece is a short, frequently recited passage with a word-by-word gloss, its roots linked back to dialect words the learner already knows, and the grandparent narrator explaining the case endings.
- **Free data:**
  - The Leeds Quranic Arabic Corpus is open source and built on the verified Tanzil text ([corpus.quran.com](https://corpus.quran.com/contact.jsp)); Wikipedia lists it under the GPL licence ([Wikipedia](https://en.wikipedia.org/wiki/Quranic_Arabic_Corpus)).
  - The MASAQ syntax dataset is CC-BY 3.0 ([ACL 2025](https://aclanthology.org/2025.clrel-1.7.pdf)).
- **Audio:** use real recitation recordings, not TTS. Recitation follows formal rules that synthetic voices are not built for.

## Graded daily-life scenarios: the same ladder in three settings

All three languages share one scenario ladder. The settings change, the levels do not. In every language, **lessons 1–20 cover first contact and transactions, lessons 21–40 cover daily administration, lessons 41–60 cover social integration, lessons 61–80 cover opinions and culture, and lessons 81 onward cover humour, register-switching and long storytelling.** Every 7th lesson is a review that ends with the 4/3/2 retelling.

| Level | Zürich | Bengaluru | Levant |
|---|---|---|---|
| **A1** | Grüezi vs. Hoi; bakery "Ich hett gern zwei Gipfeli"; SBB ticket; Migros "Wo häts…?"; Twint payment | *Ūṭa āytā?*; darshini *masāle dōse, by-two kāphi*; auto "*Indiranagar-ge bartīrā? mīṭar hāki*"; vegetable market | greetings marathon; coffee hospitality and refusing; bakery (manʔūshe); taxi "ʕal-yamīn, dughri" |
| **A2** | Gemeinde registration; Züri-Sack recycling; Waschküche note; doctor and Krankenkasse; "Gömmer go wandere?" | BMTC/Namma Metro; landlord and water problem; food-delivery calls; WhatsApp voice notes | souq bargaining; neighbours; visiting and fighting over the bill; Ramadan iftar; "mashallah" and evil-eye etiquette |
| **B1** | Apéro small talk; first day at work; Verein; Samichlaus; "Du söttsch…" advice | tech office stand-up in Kanglish; doctor (*nange jvara ide*); visiting elders (honorifics); Ugadi, Sankranti | landlord and boiler; job interview; Eid visits; weddings (*ʕuʔbālak*); bureaucracy |
| **B2** | Abstimmigssunntig debate; Stammtisch; Röstigraben; rent negotiation | traffic arguments; gossip with *ante*; Rajyotsava and language pride | condolences at a ʕaza; cross-dialect listening day; Fuṣḥā headline → dialect discussion |
| **C1+** | Jugendwort slang; code-switching in startups; Mundart lyrics; recognising other dialects | language politics; news Kannada; proverbs; Dharwad/Mangaluru listening | irony and nukta; proverbs; white-dialect talk shows; Quran and sermon register |

These lists are design proposals. They draw on phrasebook needs such as asking prices, locations and card payment ([Wikivoyage](https://en.wikivoyage.org/wiki/Swiss_German_phrasebook)), on Penn's food-first ordering ([Penn PLC](https://ccat.sas.upenn.edu/plc/kannada/)), and on MADAR's travel sentences. Cultural details such as Züri-Sack rules and festival phrases still need checking against current sources.

**Two design rules come out of the research:**
- **Keep the main dialogues in a neutral, informal register.** Slang and Arabizi go in a dated, refreshable sidebar, because they age quickly.
- **Use recurring characters.** For example, a Swiss expat with a Syrian family in Geneva gives the Arabic course its own humour and relevance.

## Free tools: pre-render everything, record what no model can say

**Generate all audio once, on the Windows PC.** Each sentence becomes its own Opus file, so its timing is known without any alignment step. At about 24 kbps mono, Opus takes roughly 10 MB per hour of audio. Copy the files to the phone; the static HTML pages only play them. Running TTS on the phone gains nothing for a fixed course. It is only useful for text the user types in, which an Assimil course does not need.

### TTS by language

| Need | Best free option | License | Verdict |
|---|---|---|---|
| Swiss German dialect lines | **Human recordings** (native friend + Audacity + [silero-vad](https://github.com/snakers4/silero-vad) to split sentences) | — | No usable model. The ZHAW Swiss German voice-adaptation model has no public weights ([arXiv](https://arxiv.org/html/2505.22054v1)). [SwissDial-TTS](https://huggingface.co/swordi/SwissDial-TTS) has no licence and an empty model card. Piper has `de_DE` voices only, not Swiss German ([Piper voices](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md)). **Never use Standard German TTS for dialect lines.** |
| Kannada | **[Indic Parler-TTS](https://huggingface.co/ai4bharat/indic-parler-tts)** (voices Suresh, Anu; native-speaker score 88% fine-tuned) or **[IndicF5](https://github.com/AI4Bharat/IndicF5)** to clone a native voice | Apache-2.0 / MIT | Strong. About 0.9B parameters, so a GPU helps; CPU runs could take days (an estimate). Fallback: [MMS-TTS-kan](https://huggingface.co/facebook/mms-tts-kan) (non-commercial licence, fine for personal use) |
| Levantine Arabic | [leva-tts / lahgtna](https://huggingface.co/collections/mohammedaly22/levantine-arabic-text-to-speech-tts), [lahgtna-chatterbox-v1](https://huggingface.co/oddadmix/lahgtna-chatterbox-v1) | MIT (check each) | New community models with few downloads; test by ear |
| Egyptian mirror | **[NAMAA-Egyptian-TTS](https://huggingface.co/NAMAA-Space/NAMAA-Egyptian-TTS)** (Chatterbox-based, takes plain unvowelled text) | MIT | Best dialect option; GPU-class |
| Grandparent English narrator | Piper English voices, run fast on CPU ([piper1-gpl](https://github.com/OHF-Voice/piper1-gpl)), with a slowed rendering | GPL-3.0 runtime, each voice has its own licence | Fine |
| Quran passages | Real recitation recordings | — | Do not synthesize |

Every dialect line generated by TTS needs a native speaker to listen through it, with failures regenerated or re-recorded by a person. Slow versions should be rendered ahead of time with ffmpeg's `atempo` filter, which slows speech without changing pitch.

### Speech feedback: record and compare

What exists:
- **Swiss German speech recognition outputs Standard German.** For example, [Flix-AI's Whisper fine-tune](https://huggingface.co/Flix-AI/flix-swissgerman-full) reports a 25.6% word error rate. A 2026 ZHAW thesis found that output stays "too close to the Standard German reference" ([ZHAW](https://www.zhaw.ch/storage/engineering/institute-zentren/cai/studentische_arbeiten/Spring_2026/BA26_ciel_Mettler_Dialektanalyse.pdf)). It cannot check whether dialect wording is correct.
- **Kannada:** [IndicConformer](https://github.com/AI4Bharat/IndicConformerASR) (MIT) and community ports for the [sherpa-onnx](https://huggingface.co/parismitaglobalsolutions/indicconformer-sherpa-onnx) runtime can check whether the learner said the right words.
- **Arabic:** [Vosk's MGB-2 model](https://alphacephei.com/vosk/models) is MSA-oriented. [Meta's Omnilingual ASR](https://github.com/facebookresearch/omnilingual-asr) lists Levantine, Egyptian and Kannada.
- **Pronunciation scoring has a modest ceiling.** A wav2vec2 phoneme app caught only about **60%** of mispronunciations ([Aalto](https://aaltodoc.aalto.fi/bitstreams/6f8cd8cb-70f4-4715-a864-3bc622d6327d/download)).

What to do:
- **The core feedback loop is record-and-compare.** The learner records a line in the phone's voice recorder, then plays it alongside the native ▶ file. This needs no machine learning and works in all three languages.
- **Optional, desktop only:** compare the learner's clip with the reference clip at the level of individual sounds, using [wav2vec2-xlsr-espeak](https://huggingface.co/facebook/wav2vec2-xlsr-53-espeak-cv-ft). Comparing audio with audio avoids the problem that dialects have no standard spelling to compare against. [OpenPronounce](https://github.com/OpenPronounce/OpenPronounce) (AGPL) is a usable reference design.
- **Treat any score as a rough indication only.**

### Repos to reuse

**No open-source "Assimil player" exists. Searches return only unrelated data-assimilation projects.** The static-HTML decision makes that unimportant. Useful pieces:
- **[ovid](https://github.com/GabrielDrapor/ovid)** (MIT): a bilingual layout to borrow.
- **[asbplayer](https://github.com/asbplayer/asbplayer):** sentence-by-sentence playback design to borrow.
- **[genanki](https://github.com/kerrickstaley/genanki)-style deck export** for an optional Anki companion. This link is offered as a suggestion, not something verified in the research notes. [AnkiDroid](https://github.com/ankidroid/Anki-Android) is free.
- **[CAMeL Tools](https://github.com/CAMeL-Lab/camel_tools)** (MIT): Arabic dialect identification, to catch MSA creeping into dialogues.
- **[IndicTrans2](https://github.com/AI4Bharat/IndicTrans2)** (MIT): draft English→Kannada translations locally.
- **[py-fsrs](https://github.com/open-spaced-repetition/py-fsrs):** review scheduling at build time, if wanted.
- **Fonts:** bundle Noto Sans Kannada and Noto Naskh Arabic, and set `dir="rtl"` on each Arabic line rather than on the whole page.
- **Hosting:** GitHub Pages, free.
- **PDF export:** the browser's print-to-PDF of the same HTML.

### Build pipeline

1. Draft dialogue JSON through the free claude.ai chat, or a local model.
2. Run automatic checks:
   - dialect identification for Arabic;
   - a script check for Kannada;
   - a spelling-variant table for Zürich.
3. Have a native speaker review the text in a spreadsheet.
4. Render TTS, or record the lines.
5. Have a native speaker listen through the audio.
6. Render the HTML pages, the shadow and active-wave MP3s, and the PDF.

**Expected LLM failure modes:**
- **Swiss German:** Standard German creeping in, and mixed spellings from different cantons.
- **Kannada:** a literary register instead of spoken forms.
- **Arabic:** MSA creeping in, and Egyptian and Levantine forms mixed together.

**The native reviewer is the one cost that cannot be cut.** It can still be free: a friend, a tandem partner, or someone met in a language exchange.

## Conclusion: what the app cannot provide

The most important finding is that the user's format works well for input and rehearsal, and the speaking limit lies outside it. FSI's own model assumes trained native instructors, 23 classroom hours a week and 17 hours of self-study ([state.gov](https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training/)). The best ultimate attainment comes from immersion ([PMC6559801](https://pmc.ncbi.nlm.nih.gov/articles/PMC6559801/)).

No static page can provide:
- unpredictable conversation;
- working out meaning with another person;
- a listener's correction;
- the social signals that tell you whether *nīnu* or *nīvu*, *Hoi* or *Grüezi* fits;
- the volume of hours.

The course should therefore build in its own exit. From about lesson 30, each weekly review page should say: "Take this week's 4/3/2 story to a person." Free routes are tandem partners, Bengaluru colleagues, Zürich neighbours and Syrian or Lebanese community events. SRF dialect radio, Kannada film and Levantine drama provide the listening volume no course can.

The less obvious insight is that the three languages need three different engineering strategies, not one pipeline:
- **Kannada** can be almost fully synthesized.
- **Arabic** is synthesized, then checked line by line by a native speaker.
- **Swiss German** has to be recorded by a person.

That asymmetry, more than grammar difficulty, should decide which course to build first.

The Arabic course can serve two goals because Levantine and the Quran share a root system and a dense core of high-frequency vocabulary. But it serves them in sequence: speak the dialect first, then add Classical grammar deliberately, without expecting fluency to carry the learner into the Quran on its own.
