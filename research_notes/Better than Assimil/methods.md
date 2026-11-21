# Methods research: what beats Assimil for B2 SPEAKING (adult self-learners)

Date: 2026-11-21. Scope: free, offline, audio-first static web app + MP3 on Android. Target langs: Swiss German, Kannada, Levantine Arabic (English base).

## 0. Headline honesty

- **No commercial product has credible independent evidence of getting adults to B2 speaking.** Every outcome number below is either (a) company-funded, (b) self-report, or (c) A1-A2 level. Nobody has measured B2 speaking from an app.
- The strongest evidence is for *mechanisms* from cognitive psych and SLA (spacing, retrieval, explicit instruction + practice, task repetition, interaction/feedback), not for branded methods.
- Time is the dominant variable. FSI class-hour estimates for English speakers to roughly B2/C1 ("Professional Working Proficiency"): German ~900 h (Cat II), Hindi/Kannada-type ~1100 h (Cat III), Arabic ~2200 h (Cat IV). Those are intensive, taught, with homework. A self-study course realistically gets a learner to B1 speaking and sets up the rest. Design for *time-on-task retention* (not dropping out) as a primary outcome.
- Evidence tiers used: **A** = multiple meta-analyses; **B** = some controlled studies/one meta-analysis; **C** = company-funded studies or theory; **D** = anecdote / learner reports only.

## 1. Method-by-method

### Pimsleur (graduated interval recall, anticipation)
- Mechanism: audio-only; English cue -> pause -> learner says L2 -> model answer. Recalls of items at expanding intervals within and across 30-min lessons. Strict ~500 lexeme budget per level, heavy on conversational frames.
- Evidence: **C/D.** Vesselinov & Grego 2019 "Pimsleur efficacy study" (company-commissioned; ACTFL-scaled oral gains over 12 weeks; claimed 83% gained >=1 sublevel after Level 1). Choe 2016 (Teachers College working paper) critical review: praises distributed/mixed recall, criticises narrow vocab and lack of real interaction. Kim & Webb 2022 meta-analysis (Language Learning 72(1)): spacing g ~0.58 immediate / 0.80 delayed vs massed, but **expanding = equal spacing** — the "graduated" part is not special; spacing itself is.
- Learner reports: good pronunciation and confident A2 talking; stalls by B1 (vocab ~2-3k needed for B1-B2 is never reached; too slow).
- STEAL: the **anticipation prompt** (cue -> silence -> answer) as the core audio format; built-in spaced callbacks inside MP3s; back-chaining of long words from the end. DON'T steal: tiny vocab budget, 30-min unit length, no reading.

### Language Transfer / Michel Thomas (thinking method)
- Mechanism: teacher + 1-2 "students" on tape; learner constructs sentences from rules just explained (not memorised), cognates leveraged, no memorisation demanded, errors shown as reasoning steps.
- Evidence: **D.** No independent controlled outcome study found for either. Publisher claims of school pilots without data. Theoretically consistent with explicit instruction meta-analyses (Norris & Ortega 2000; Spada & Tomita 2010: explicit > implicit for targeted structures) and generative retrieval.
- Learner reports: excellent for grasping grammar architecture and early sentence building; plateaus at ~A2; ear for natural speed is not trained.
- STEAL: **"build the sentence" generative prompts** where the learner must combine known parts into a NEW sentence (not repeat a memorised one); explain-the-why in short English asides; this is the biggest structural gap in Assimil.

### Glossika (mass sentence repetition)
- Mechanism: thousands of L1->L2 sentence pairs, listen-and-repeat, SRS scheduling, reps counter.
- Evidence: **D.** No outcome studies. Learner consensus: decent for listening/pronunciation exposure, boring, weak at grammar/generativity; "repetition counts" ≠ acquisition. Sentence quality was criticised in less-common languages.
- STEAL: the idea of a **large graded sentence bank with audio** and an offline "rep" mode (L1 prompt -> L2 audio), but make the sentences *variants of a frame* (substitution drills) rather than random sentences.

### Dreaming Spanish / ALG / comprehensible input
- Mechanism: huge volumes of graded, visually supported input; delay or de-emphasise speaking. DS roadmap: L6 = 1000 h (daily conversation comfortable), L7 = 1500 h; speaking advised from ~1000 h.
- Evidence: **C/D for the method; A for "input matters".** Hours->level table is self-defined, not validated against CEFR testing. Learner reports (r/dreamingspanish): people at 1000-1500 h start speaking with good comprehension and accent but many errors and halting output; a few hours of conversation practice before then. ALG at AUA Thai: anecdotal; the program shrank; "damage from early speaking" claim is unproven.
- For our languages: there is **no DS-scale CI library** for Swiss German, Kannada or Levantine. Input supply is the binding constraint — we must *produce* it.
- STEAL: **narrow, graded, high-volume listening** (stories/dialogues reusing the same 1-2k words); an hours tracker; "listen-only" sessions alongside the speaking drills. DON'T adopt the "no speaking for 1000 h" doctrine: speaking at B2 requires speaking practice (fluency is proceduralised through production; see 4/3/2 below).

### Refold roadmap
- Mechanism: CI-centric DIY: phonetics basics -> frequency deck in Anki -> sentence mining from native content -> "shadowing/output after ~ level". Community method.
- Evidence: **D.** Synthesis of CI + SRS; no outcome data.
- STEAL: **sentence mining as an explicit user action** (tap "save" on a sentence -> it enters the SRS speaking deck).

### LingQ
- Mechanism: reading+listening to imported/graded texts; tap unknown words; word-count/known-words stats.
- Evidence: **D.** No studies. Known-word metric is motivating.
- STEAL: **known-words / lexical coverage meter** and tap-to-gloss text under every audio. Coverage research (Nation; van Zeeland & Schmitt) suggests ~95-98% known words for comfortable listening — use that to grade material.

### Speechling
- Mechanism: record sentence -> human coach gives pronunciation feedback.
- Evidence: **D.** Human feedback itself is well supported (corrective feedback meta-analyses, e.g. Li 2010, Lyster & Saito 2010 d~0.6-0.7) but not offline-possible.
- STEAL: **record-and-compare**: MediaRecorder captures learner, plays it back A/B against native audio. Free, offline, works in Android Chrome.

### Praktika / Duolingo Max Video Call / AI speaking tutors
- Mechanism: open conversation with an LLM persona; ASR + feedback.
- Evidence: **B for dialogue systems generally, C for GenAI apps.** Hou & Min 2025 (ReCALL) 3-level meta: dialogue-based CALL on speaking g = .61 (16 studies) — but mostly rule-based pre-GenAI systems. Bibauw et al. 2022 (LLT): d = .58 on proficiency. Duolingo speaking study (Jiang et al. 2021, DRR-21-02, company): 66%/53% of Spanish/French learners at A2+ speaking on Versant after the course — i.e. a full gamified course ≈ A2.
- Offline static app can't run an LLM tutor for these languages realistically (and ASR for Kannada/Swiss German/Levantine is poor). 
- STEAL: **scripted "role-play with branching"**: the app plays the other person's line, learner answers in a gap, model answers after; optional "take this prompt to a chatbot/tutor" export card for online moments. Offline we can simulate the *turn-taking pressure*, not the open conversation.

### Babbel Speak / Babbel
- Mechanism: dialogue-based lessons with ASR; spaced review.
- Evidence: **C.** Company-funded: Vesselinov & Grego 2016 (WebCAPE, written); Yale OPIc study 2019 (n=117, median ~46 h to Novice High); MSU Loewen et al.: 59% gained >=1 ACTFL sublevel. Everything at Novice level.
- STEAL: nothing unique — dialogue-centred review is already covered.

### Shadowing (Arguelles)
- Mechanism: speak simultaneously with native audio, walking, often with text; repeat same track many times.
- Evidence: **B-/C.** No pooled meta-analysis. Oxford systematic review: helps comprehensibility, prosody, fluency; segmental gains inconclusive; mostly controlled tasks. Shao & Saito (TESOL Q 2022): choral repetition gains tied to auditory processing. Japanese studies (Hamada, Kadota) mostly show *listening* gains.
- STEAL: **shadowing mode** per dialogue: normal-speed and slowed track, with/without text, loop button. Cheap, strong for prosody (critical for Swiss German melody and Arabic emphatics/stress).

### Fluent Forever (Wyner)
- Mechanism: pronunciation and sound system first (minimal pairs), picture-based SRS cards (no translation), personal connection, 625 base words.
- Evidence: **B for parts.** Pronunciation instruction meta (Lee, Jang & Plonsky 2015, Applied Linguistics) d ~0.89; high-variability phonetic training meta (SSLA 2025) supports minimal-pair perception training. Picture-over-translation advantage is weak/mixed in research; mnemonics/imagery modest.
- STEAL: **front-loaded sound unit with minimal-pair listening drills** (Arabic ح/ه, ع/ء, emphatics; Kannada retroflex vs dental, long vs short vowels; Swiss German vowel length, ch/kch). Pictures optional, not core.

### Nation's 4/3/2
- Mechanism: give same talk 3 times with shrinking time (4,3,2 min) to new listeners.
- Evidence: **B.** Nation 1989 (speech rate up, hesitation down); de Jong & Perfetti 2011 (Language Learning 61:2): fluency gains, some transfer to new topics via proceduralisation, vs 3/3/3 control; transfer only for some learners. Broader task-repetition literature (Bygate) supportive.
- STEAL: **timed retell**: after each story, a "Tell it" mode with a 90 s -> 60 s -> 45 s countdown, keyword prompts, record each round, show words-per-minute / pause estimate (or self-rate). Probably the single highest-leverage cheap fluency feature.

### Task-based language teaching
- Mechanism: meaning-focused tasks with an outcome (plan, persuade, solve), language focus after.
- Evidence: **B, contested.** Bryfonski & McKay 2019 meta d = 0.93; reanalysis (Xuan, Cheung & Liu 2025) g ≈ 0.61; Boers & Faez 2023: field not ripe for meaningful meta-analysis. Classroom-centric; requires interlocutors.
- STEAL: **solo speaking tasks** with an outcome: "Leave a voicemail cancelling the appointment and proposing Tuesday", "Explain to the taxi driver...", with pre-task model, task, post-task model + language focus. Info-gap cards for a learning partner.

### Chunking / lexical approach
- Mechanism: teach multi-word units (formulaic sequences) as wholes.
- Evidence: **B- (correlational strong, interventional thin).** Boers et al. 2006: chunk use correlates with oral proficiency ratings (r ~0.43); Wood 2006/2009 fluency case studies; Boers & Lindstromberg 2012: association real, best teaching method unproven.
- STEAL: tag every sentence with its **reusable frames** ("baddi ___" = I want ___; "kann i ___?"), drill the frames with substitution; build a "phrasebook of frames" index. For Levantine/Swiss German (no standard grammar teaching tradition) chunks are especially efficient.

### Interleaving
- Evidence: **B, mixed for language.** Brunmair & Richter 2019 meta (Psych Bull): interleaving helps category learning (g ~0.42), smaller/negative for words. In L2 grammar, some positive studies (Nakata & Suzuki 2019, Pan et al. 2019 on Spanish verb conjugation).
- STEAL: review sessions that **mix** structures from different lessons (not lesson-by-lesson review); cheap.

### Retrieval practice
- Evidence: **A.** Roediger & Karpicke 2006; Adesope et al. 2017 meta g ~0.61; robust in L2 vocab (Barcroft; Nakata). Productive retrieval (L1 -> L2) produces productive knowledge; receptive (L2 -> L1, as in Assimil reading) mostly doesn't.
- STEAL: **every item is retrieved productively out loud before the answer is revealed.** This is the core difference from Assimil.

### Desirable difficulties
- Evidence: **A (concept), B for L2 specifics.** Bjork. Spacing, retrieval, interleaving, generation, variability. Over-difficulty kills motivation: keep success ~80-85%.
- STEAL: adaptive pause length (shorten gap as items mature), varied speakers/speeds.

### Output hypothesis (Swain)
- Evidence: **B.** Output forces noticing gaps and syntactic processing; studies on pushed output show grammar gains; not alone sufficient. Combined with input it's the standard SLA position (input + interaction + output; Long, Swain, Gass).
- STEAL: "pushed output" prompts where the learner must say something just beyond their model sentences, then hear a model.

### Sentence mining
- Evidence: **D** (community practice), but it's just retrieval + spacing on self-selected i+1 sentences — mechanisms are A-tier.
- STEAL: "Save sentence" button in every transcript -> personal speaking deck.

### Story-based: TPRS / Olly Richards Story Learning
- Mechanism: highly repetitive graded stories; TPRS adds circling questions (yes/no, either/or, who/what) that force short answers.
- Evidence: **C.** Lichtman 2019 review of ~40+ TPRS studies: TPRS ≥ traditional, most consistent advantage in vocab, speaking, reading; many studies small, unpublished theses, teacher-researchers. Story Learning: no data (marketing).
- STEAL: **graded serial story with circling-question audio** ("Did Ravi go to the market? ... No, he went to the bus stop.") — answerable aloud, generates hundreds of easy productive retrievals per story. Story arcs also drive retention (motivation).

### Assimil (baseline)
- Mechanism: daily dialogue lesson with L1 translation and notes; "passive wave" (listen/read/repeat) for ~50 lessons, then "active wave" (translate L1 -> L2 back) starting ~lesson 50.
- Evidence: **D.** No outcome studies found. Strong reputation for reading/listening to ~B1-B2 receptive; widely reported weak speaking.

## 2. Ranked top-12 design mechanisms for B2 speaking

| # | Mechanism | Why (evidence) | Static offline implementation | Effort |
|---|---|---|---|---|
| 1 | **Productive retrieval with anticipation pause** (English cue -> gap -> L2 model -> repeat) for every sentence | Retrieval practice A-tier (Roediger & Karpicke 2006; Adesope 2017 g~.6); productive direction needed for productive skill | Per-lesson "Speak" MP3 built by TTS/recordings pipeline: cue, 3-5 s silence (scaled to sentence length), model, model again. Same in-page player with "reveal" button | M (audio pipeline already exists) |
| 2 | **Spaced callbacks, cross-lesson** | Kim & Webb 2022 spacing g .58/.80; expanding = equal so keep it simple | Generator inserts items from lessons n-1, n-3, n-7, n-15 into each "Speak" track; in-page SRS (localStorage) for saved items with simple 1/3/7/21-day scheduler | M |
| 3 | **Generative sentence-building** (Language Transfer style) | Explicit instruction > implicit for structures (Norris & Ortega 2000; Spada & Tomita 2010); generation effect | Each lesson has 10-20 "build it" prompts recombining known pieces into NEW sentences, with 1-line "why" note; audio: "How would you say: 'I don't want to go today'?" pause, answer | M-H (content authoring) |
| 4 | **High-volume graded listening (narrow input)** | Input as basis of acquisition (A-tier general); 95-98% coverage threshold (Nation; van Zeeland & Schmitt) | Graded serial stories + dialogues recycling 1-2k words; "listen" MP3 playlist; hours tracker in localStorage; aim 200-400 h of course audio by end | H (biggest content cost) |
| 5 | **Timed retell / 4-3-2** | Nation 1989; de Jong & Perfetti 2011 fluency + partial transfer | After each story: keyword card + countdown 90->60->45 s, MediaRecorder captures each attempt; playback; self-rating | L |
| 6 | **Frame/chunk drills (substitution)** | Formulaic sequences ↔ fluency (Boers 2006; Wood; Boers & Lindstromberg 2012) — B- | Tag sentences with frames; generator produces substitution audio ("baddi... ahwe / mayy / rūḥ"); frames index page | M |
| 7 | **Sound-system unit + minimal-pair perception drills** | Pronunciation instruction d~.89 (Lee, Jang & Plonsky 2015); HVPT meta 2025 | Lesson 0 + recurring 2-min drills: play pair, tap which one; multiple voices if available | M (needs recorded/clean contrasts) |
| 8 | **Shadowing mode** | Systematic review: comprehensibility, prosody, fluency gains (B-/C) | Each dialogue: normal + 0.8x track (pre-rendered or playbackRate), text toggle, A-B loop | L |
| 9 | **Record-and-compare** | Self-monitoring + feedback (feedback meta d~.6-.7 is for human feedback; self-compare weaker) | MediaRecorder -> blob -> play mine / play native back-to-back; keep last N in IndexedDB | L |
| 10 | **Circling-question audio on stories** (TPRS) | Lichtman 2019 review (C) — gives massive cheap productive reps at i+1 | Generator writes yes/no, either/or, wh-questions per story with pauses; "Answer" MP3 per story | M |
| 11 | **Scripted role-play / solo speaking tasks** (TBLT-lite + output hypothesis) | TBLT g~.6-.9 (contested); dialogue CALL g~.61 (Hou & Min 2025); pushed output (Swain) | App plays partner line, gap for learner, then model; branch by choosing response; task cards with outcome ("cancel and propose Tuesday"); exportable prompts for a human/AI partner when online | M-H |
| 12 | **Interleaved mixed review + mined-sentence deck** | Interleaving B/mixed; retrieval+spacing A | Weekly "mix" track drawing from all past lessons; "save" button on transcript lines feeds personal deck | L-M |

Honourable mentions: hours/known-words progress meter (motivation; D), cognate/loanword bridges (Arabic/Kannada English loans, Swiss German <-> Standard German mapping), explicit "Hochdeutsch -> Schwiizerdütsch" transformation rules as a Language-Transfer-style unit.

## 3. Five Assimil habits to DROP or change

1. **Passive first half (receptive-only until ~lesson 50).** Recognising a translation is not producing. Change: productive retrieval from lesson 1 (#1).
2. **Translation shown alongside every line / L2->L1 direction.** Encourages reading the English, not retrieving the L2. Change: hide translation by default; L1 -> L2 prompts; reveal on tap.
3. **Every sentence new, no systematic recycling.** Assimil relies on the learner re-reading; recycling is incidental. Change: generated spaced callbacks and frame substitution.
4. **Short, one-shot dialogues with written notes.** ~1-3 min audio per lesson = too little input to reach B2. Change: 15-30 min of graded listening per lesson unit + stories; notes become short audio asides.
5. **No fluency/time-pressure or open speaking task.** Assimil never asks you to say something you haven't seen. Change: timed retells, role-plays, build-it prompts, record-and-compare.
(Also: Assimil's register is often literary/standard; for Swiss German and Levantine, use real colloquial speech, multiple speakers and regional variants.)

## 4. Evidence caveats for our languages
- Almost all studies are English/Spanish/French; transfer to Kannada (agglutinative, retroflexes, script) or diglossic Arabic is assumed, not tested.
- ASR-based features are unreliable for all three target languages → rely on self-comparison, not automatic scoring.
- No method reliably delivers B2 speaking without real human interaction at the end. The app should explicitly hand off: "from lesson X, book 1 conversation/week" (italki/tandem/local), with printable task cards.

## Sources consulted
- Dreaming Spanish roadmap & learner reports: dreaming.com/faq; reddit r/dreamingspanish 1000-1200 h updates; lingtuitive.com/blog/1000-hours-of-spanish-listening; fluentu.com DS review.
- Hou & Min 2025, ReCALL, dialogue-based CALL for L2 speaking (3-level meta) — cambridge.org/core/product/31847710516602398819C5E594038E7B
- Bibauw et al. 2022, LLT, dialogue systems meta — lltjournal.org/item-detail/1035
- Shadowing systematic review (Oxford) — ora.ox.ac.uk uuid:3104cae1-3a6b-400a-b173-de44384238d2; Shao & Saito TESOL Q 2022 (discovery.ucl.ac.uk/10143786)
- Duolingo speaking report DRR-21-02 (Jiang et al. 2021) — blog.duolingo.com/how-well-does-duolingo-teach-speaking-skills
- de Jong & Perfetti 2011, Language Learning 61:2 — lrdc.pitt.edu/perfettilab; learnlab.org fluency wiki
- Bryfonski & McKay 2019 LTR; Xuan, Cheung & Liu 2025 reanalysis; Boers & Faez 2023
- Kim & Webb 2022, Language Learning 72(1) 269-319 spacing meta
- Pimsleur efficacy study (Vesselinov & Grego 2019, comparelanguageapps.com); Choe 2016 (hpu.edu TESOL working papers)
- Michel Thomas: no outcome data found (tes.com, lesswrong review)
- Babbel: press.babbel.com 2016 efficacy; Yale OPIc 2019; MSU Loewen et al.
- Boers et al. 2006; Wood 2009/2010; Boers & Lindstromberg 2012
- Lichtman 2019 TPRS research appendix
- AUA/ALG: dreaming.com AUA posts; beyondlanguagelearning.com
- From prior knowledge (not re-verified this session): Roediger & Karpicke 2006; Adesope et al. 2017; Norris & Ortega 2000; Spada & Tomita 2010; Lee, Jang & Plonsky 2015; Brunmair & Richter 2019; Li 2010; Lyster & Saito 2010; FSI category hours.
