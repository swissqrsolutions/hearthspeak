# Adherence: making a 150-lesson self-study course easy to follow daily for 12+ months

Context: free personal course (static HTML + MP3, offline on a Galaxy S26 Ultra, localStorage only), 150 lessons per language (Swiss German, Kannada, Levantine Arabic), warm grandparent narrator, recurring characters. Goal: one adult keeps going long enough to reach B2 speaking.

Evidence-strength key: **[S]** strong (meta-analysis or several RCTs) · **[M]** moderate (one solid experiment or a large field study) · **[W]** weak (vendor A/B blog, correlational data, practitioner consensus) · **[O]** my own reasoning or opinion.

---

## 1. Key findings

### Dropout is the default outcome
- MOOC completion averages about 7.6% (Jordan 2013), and reviews put it under 15%. Language-MOOC studies report the same pattern. Attendance falls week by week (Duru et al. 2019, *Sustainability*). Retention was highest in **blended** delivery, meaning some human contact (EUROCALL 2022, ERIC). In a 696-learner Mandarin MOOC survey, **content design** predicted persistence (Chen 2017, USC). **[M]**
- Duolingo's retention PM says the **first 7 days are the most fragile** (Lenny's Newsletter/podcast). **[W]**
- In the Duolingo efficacy study (Vesselinov & Grego 2012, funded by Duolingo), participants were advised to do 30 hours in 2 months. The researchers knew many would not, so they set the inclusion bar at **2 hours**. Even a paid study could not get people to do the recommended dose. **[M]**
- Implication: for a solo learner the realistic enemy is **quitting**, not a weak method. Each design choice should be judged by whether it keeps day 200 likely.

### The size of the job, stated honestly
- Rough FSI class-hour benchmarks for professional proficiency (about C1, more than B2), from memory, not re-verified here: German Category II about 900 h; Hindi-type Indian languages Category III about 1,100 h; Arabic Category IV about 2,200 h. **[M, from memory]**
- Dreaming Spanish community roadmap: Level 6 "comfortable with daily conversation" at about 1,000 h of input, Level 7 at about 1,500 h. Its sources disagree (600 vs 700 h for some levels), and it says almost nothing about speaking. **[W]**
- 150 lessons × about 30 min is about 75 h. That is a strong **A2/B1 foundation**, not B2. Reaching B2 speaking within 12 months means about 1–1.5 h/day in total: the lesson plus listening while doing other things, plus weekly speaking with a human. The design therefore has to (a) keep the daily lesson small and reliable, and (b) send the remaining time into **hands-free audio** and **human conversation**. **[O]**

### Habit formation
- Lally et al. 2010 (96 recruited, 82 analysed): a daily behaviour took a **median of 66 days** to reach peak automaticity, with a range of **18 to 254 days**. The 254-day figure was extrapolated beyond the study, and about half of participants did not reach habit level by day 84. **Missing one day did not materially affect habit formation.** **[M]**
  - Design consequence: plan for a **3-month habit-building phase**, and make missed days cheap rather than catastrophic.
- **Implementation intentions** ("When X happens, I will do Y at place Z"): meta-analysis of 94 tests, **d = 0.65** (Gollwitzer & Sheeran 2006). This is the best-supported tool here and costs nothing to build. **[S]**
- **Tiny Habits / habit stacking** (Fogg): the "After I [anchor], I will [tiny behaviour]" recipe is essentially an implementation intention with a tiny behaviour attached. Fogg's own evidence is self-report (91% felt more confident). There is no RCT of Tiny Habits itself. **[W]** for the brand, **[S]** for the underlying if-then mechanism.
- **Consistency of time slot**: Duolingo's 2018 data shows learners who practised at a **consistent time** (bedtime best) outperformed those who practised at **random** times (52.9th vs 47.8th percentile). Weeknight-only practice did worse. This is correlational. **[W]**
- **Fresh start effect** (Dai, Milkman & Riis 2014, *Management Science*): goal behaviour rises after temporal landmarks (Mondays, 1st of the month, birthdays, semester starts). The boost is short-lived but useful for **restarting after a lapse**. **[M]**
- **Soft commitments** beat plain reminders. In a German university field experiment, a non-binding study-plan agreement raised exam taking and passing, while a reminder alone did nothing (AEJ: Applied). In a Stanford MOOC, a pre-commitment tool raised completion by about 11 percentage points, and reminders had **no effect**. **[M]**

### Streaks and loss aversion
- Duolingo (correlational): learners who reach a 7-day streak are **2.4×** more likely to come back the next day and **3.6×** more likely to complete the course. **[W]**
- Duolingo A/B tests (vendor-reported): streak milestone animation **+1.7%** day-7 retention for new learners; allowing **2 equipped Streak Freezes** **+0.38%** DAU; Streak Wager **+14%** day-7 retention; "commit to my goal" button copy and a user-chosen streak goal both "significantly" increased retention; Weekend Amulet was built to protect Monday returns. Busuu reported **+15% sessions** after adding streaks (Sensor Tower). **[W, but large-N A/B]**
- Silverman & Barasch 2023 (*J. Consumer Research*, 7 studies): seeing an **intact** streak raises later engagement compared with seeing a **broken** one (for example 66% vs 58% continued an exercise). The drop is **larger when people blame themselves** and **smaller when the streak can be repaired**. People whose streak broke tended to **switch to a different activity, or even a different language**, instead of starting over. **[M]**
  - Design consequence: use streaks, but **never show a big "0"**. Include freezes/repair, and count "**X of the last 7 days**" or total days rather than a fragile consecutive count. The language-switch finding matters here because this learner has three languages to switch between.

### Narrative and characters
- Destinos (WGBH/VanPatten telenovela, 52 episodes) is Annenberg's best-selling course ever. That is popularity evidence, not learning or retention evidence. I found no controlled study of narrative effects on adherence. **[W]**
- Duolingo: Lily is its most popular character after Duo. Users said "Duolingo Stories are my favorite TV show." The team says known characters let **100-word stories carry more meaning**, because relationships need no explaining. They also admit only a "small core" of learners know the characters' names. **[W]**
- Takeaway: serialized story with recurring characters plausibly helps with **"I want to know what happens"** pull and with comprehension, since there is less new context per lesson. The evidence is anecdotal. Treat it as a cheap, probably positive bet, not a proven driver. **[W/O]**

### Spaced review load
- Anki manual: **20 new cards/day leads to about 200 reviews/day** at steady state (roughly 10:1). It explicitly warns that new users who add hundreds of cards early get **overwhelmed by reviews**, and recommends a daily review cap. FSRS: higher desired retention means more workload; 0.90 is the suggested default. **[M, practitioner consensus with documentation]**
- Design consequence: for a 5-minute review slot (about 8–10 s per card, so 30–40 cards), new items should be about **3–5 per day**, not 20. Hard-cap reviews per day and **spread overdue backlog** over the following days.

### Self-assessment and progress
- CEFR can-do self-assessment agreement with tests is **mixed**: Alderson/DIALANG found considerable agreement, while a Dutch study (n = 293) found very low correlations with systematic overestimation. **[M]**
- Design consequence: can-do checklists are good for **motivation and making progress visible**, but pair them with a **concrete performance check** (record yourself retelling the episode, then compare with checkpoint recordings from months ago) and with real conversations.

### Gaps (not found or not verified in this pass)
- No solid data on the best session length specifically for language-app adherence. Duolingo lessons are about 3–5 min; Pimsleur lessons are about 30 min audio-only. The guidance below is **[O]**.
- No study found on audio-only/commute modes and adherence. The argument is time budget (you need 1 h+/day) and stacking onto existing routines. **[O]**
- No direct study on tutors or exchange partners and persistence for app learners. Blended delivery doing best in LMOOCs and soft commitments beating reminders are indirect support. **[W]**

---

## 2. Recommended daily session (the "standard day", about 25 min)

One button on the home screen: **"Today"**. It opens the next step automatically. The learner never chooses.

| # | Step | Min | Notes |
|---|------|-----|-------|
| 1 | **Warm-up review** (spaced queue, capped) | 4–5 | Audio-first cards: hear a line from earlier episodes and say the meaning, or hear the prompt and say the line. Hard cap 40 cards. |
| 2 | **"Previously on..."** recap by grandparent narrator | 1 | 30–60 s audio. Pulls the story thread back into memory. |
| 3 | **New episode, first listen** (no text) | 3 | Story dialogue with recurring characters. |
| 4 | **Listen + read** (target script + gloss/translation toggle) | 5 | Tap a line to replay it. |
| 5 | **Shadow / chorus** key lines | 5 | 6–10 lines, repeated aloud. This is the speaking engine. |
| 6 | **Speak it**: answer 3 narrator questions aloud, or retell in 3 sentences | 3 | Optional record button (MediaRecorder; keep the recording or delete). |
| 7 | **Cliffhanger + tomorrow's hook** | 0.5 | Narrator: "Tomorrow we'll find out what Auntie said to the shopkeeper..." Marks the day done. |
| 8 | (Optional) **Add 3–5 new items** to the review queue | 1 | Automatic from the episode. Learner can veto. |

**Minimum viable day (about 2 min, "Tiny day")**: one big secondary button, "Only 2 minutes". It plays the recap plus 5 review cards, or re-listens to yesterday's episode. It **counts fully** toward streak/consistency. Lally's finding that one missed day is harmless, plus the broken-streak research, says this matters most on bad days.

**Hands-free mode (passive time, 20–60 min)**: an auto-generated "Today's audio" playlist (yesterday's episode, a review of the last 7 episodes' dialogues, then the narrator's slow re-tellings) for commute, gym or chores. It counts toward an **hours counter**, logged separately from "active minutes".

**Weekly (Sunday or a chosen day)**: 30–60 min with a **real human** (tutor, exchange partner or family speaker) using a printed/phone "conversation card" built from that week's 5–7 episodes. Plus a 1-minute can-do self-check.

**Every 25 lessons (6 checkpoints)**: record a 2-minute retell of the story so far. Play it back next to the previous checkpoint recording. Tick the CEFR can-do statements. Narrator "graduation" scene.

Cadence: 150 lessons at about 6 per week is about 25 weeks of new material. Then plan a **second pass** (an "advanced re-listen" with no gloss and longer speaking tasks) and extended listening for months 7–12. **Do not** schedule 150 lessons over 365 days at 1 per day if the speaking target is B2; the lesson is the anchor, not the whole dose.

---

## 3. Ten adherence features, ranked by expected impact

Ranking weighs evidence strength × effect size × how much it matters for one adult over 12 months. **[O]** for the ranking itself.

### 1. Implementation-intention setup ("my learning moment") **[S]**
- *Evidence*: d = 0.65 across 94 tests. Consistent time slot correlates with better Duolingo outcomes.
- *Implement*: first-run screen with fill-in-the-blanks: "After I ___ (anchor: pour morning coffee / sit on the tram), I will press **Today** at ___ (place)." Plus a backup plan: "If I miss that, I'll do the 2-minute version before ___." Store in `localStorage.plan`. Show it as the home-screen subtitle every day. Re-prompt after any 2-day gap.

### 2. One-tap "Today" button with zero decisions **[M/O]**
- *Evidence*: friction and choice reduction is behavioural-design consensus. Duolingo's single path. Reminders alone don't work, but removing steps does. No direct RCT.
- *Implement*: `state.next = {lesson, step}` in localStorage. The home page is one large button that resumes at the exact step. Add the page to the home screen as a PWA (manifest + service worker caching all HTML/MP3 for offline). Open straight into audio playback.

### 3. Forgiving consistency tracking (streak with freezes and repair, never a big zero) **[M]**
- *Evidence*: intact streaks raise engagement (Silverman & Barasch). Repairability blunts the drop. Duolingo freezes +0.38% DAU and milestones +1.7% D7. Broken streaks push people to switch activities or languages.
- *Implement*: `days: {"2026-11-21": {active: 24, passive: 40, tiny: false}}`. Show "**Days practised: 87**" (cumulative, never resets) plus "**This week: ●●●○●●○**". Streak = consecutive days, with automatic **2 freezes/month** and **repair**: doing a double session within 48 h restores the streak. A missed day shows "Rest day used" rather than a red 0. Show one streak **per learner, across languages**, so switching languages doesn't "break" anything.

### 4. Minimum viable day (2-minute mode) **[M]**
- *Evidence*: Lally (a missed day is harmless, but repeated misses are not); Fogg (tiny behaviours); streak protection keeps the habit going.
- *Implement*: secondary button "Just 2 minutes" plays recap.mp3 plus 5 review cards and marks `tiny:true`, which counts for the streak. Show a gentle cap of 3 tiny days in a row before the narrator kindly nudges for a full day.

### 5. Capped, self-levelling review queue **[M]**
- *Evidence*: Anki's 10:1 rule and its documented "overwhelmed by reviews" failure mode. Review debt is a classic reason people quit SRS.
- *Implement*: simple SM-2/Leitner in JS over `localStorage.cards` (about 1,500 cards × 150 bytes, well under 5 MB). Rules: max 40 reviews/day; new cards 3–5/day; **new cards pause automatically** if yesterday's reviews hit the cap; after a gap, the backlog is spread at most 40/day, oldest-overdue first, and the UI **never shows the total overdue count**.

### 6. Serialized story with cliffhanger and "Previously on..." **[W]**
- *Evidence*: Destinos's popularity, Duolingo Stories anecdotes, and the "known characters let short stories carry more" argument. No adherence RCT.
- *Implement*: content work. Every lesson ends on an open question, and every lesson starts with a 30 s recap. Grandparent narrator directly addresses the learner ("I'm glad you came back, little one"). Use a character relationship map page that fills in as the learner meets people. Episodes 25/50/75... are big story beats aligned with checkpoints.

### 7. Hands-free audio mode plus hours counter **[W/O]**
- *Evidence*: the volume needed for B2 (about 1,000+ h of input/practice) cannot fit in a 25-min session. Dreaming Spanish's hours counter is a widely loved progress metric (anecdotal). Stacking audio onto existing routines (commute, gym) means no new time slot.
- *Implement*: generate `playlist-today` from the last N lessons' MP3s. Use HTML `<audio>` with the Media Session API so lock-screen controls work and audio keeps playing with the screen off. Track `timeupdate` deltas into `days[date].passive`. Show "**Total hours: 112 / milestone 150**" with milestones at 50/150/300/600/1000 h and narrator praise at each.

### 8. Weekly human milestone **[W/M]**
- *Evidence*: blended LMOOC delivery had the best retention, and soft commitments to a person or plan outperform reminders. Speaking at B2 also needs live interaction the app can't provide.
- *Implement*: a weekly "conversation card" page auto-built from the week's episodes (5 questions, 10 key phrases, 1 role-play). A checkbox "Spoke with a human this week (min __)" logged to `weeks[isoWeek]`. Optional: write the tutor's name and fixed time into the plan, since a pre-booked recurring slot acts as a commitment device.

### 9. Visible progress: CEFR can-do statements plus recording comparisons **[M for mixed accuracy, W for motivation]**
- *Evidence*: self-assessment accuracy is mixed, so pair it with actual recordings. Seeing progress is a widely used motivation tool.
- *Implement*: a progress page with a 150-dot lesson map, hours, days practised, and per-checkpoint can-do lists ("I can tell my grandmother what I did yesterday"). Store recordings via MediaRecorder in IndexedDB (localStorage is too small for audio). "Then vs now" playback at each checkpoint.

### 10. Fresh-start re-entry flow **[M]**
- *Evidence*: fresh start effect (Dai et al. 2014). The broken-streak finding that self-blame worsens dropout.
- *Implement*: if the last active date is 3 or more days ago, the home screen does **not** show missed days. It shows the narrator: "Welcome back. Monday is a good day to start again. Let's just listen to where we left off." Offer a **reset to a re-entry lesson** (recap of the last 3 episodes), cap reviews at 20 for 3 days, and suggest re-making the plan on the next Monday or 1st of the month.

Honourable mentions: a "commit to my goal" framing at onboarding (Duolingo copy test, **[W]**); a learner-chosen streak target of 7/30/100 days (Duolingo, **[W]**); a local daily notification. Note that a static offline page can't schedule reliable push notifications. Use the phone's own alarm or Samsung Routines tied to the implementation-intention time instead, which is evidence-neutral but practical.

---

## 4. Anti-patterns to avoid

1. **Unbounded new-card intake / showing total overdue reviews.** This is the documented SRS quit trigger. **[M]**
2. **Hard streak reset to 0 with guilt messaging.** Broken streaks reduce engagement, especially with self-blame, and push people to switch to another language. **[M]**
3. **Making the learner choose** which lesson, which mode or which language each day. Decision friction at the exact moment willpower is lowest. **[O]**
4. **Sessions that can only be done at 30+ min or only with screen and quiet.** No fallback means every busy day becomes a missed day. **[O]**
5. **Over-gamification**: XP leagues, gems, punishment, owl-style guilt. These target engagement for its own sake rather than learning. Duolingo's own team acknowledges heavy experimentation for DAU. For a single private learner, keep warmth and story, and drop the competition. **[O]**
6. **Relying on reminders alone.** Two field experiments found reminders had no effect while commitments did. **[M]**
7. **Promising B2 from 150 lessons alone.** Mismatched expectations cause disillusionment around month 4–6. State the hours honestly and make passive listening and human speaking first-class parts of the course. **[O]**
8. **Rotating three languages daily** at the start. It triples the habits to form and the review queues. Better: one primary language through the 66-day phase, then add a second one in a fixed slot. **[O]**
9. **Self-assessment as the only progress measure.** Learners over- or underestimate. **[M]**
10. **Storing progress only in a way that can be wiped** (cleared browser data). Losing a 200-day record is a streak break you didn't cause. Add JSON export/import of localStorage and a weekly auto-download prompt. **[O]**

---

## 5. Implementation notes (static, offline, localStorage)

- PWA: `manifest.json` + service worker precaching lesson HTML/JS and **range-request-capable** MP3 caching. Note that Chrome on Android needs the service worker to handle `Range` headers for cached audio seeking. Alternatively, store MP3s locally via file:// or a sideloaded folder.
- Suggested state schema:
  ```json
  {
    "plan": {"anchor": "after coffee", "time": "07:15", "backup": "before bed, 2-min"},
    "lang": "gsw",
    "next": {"lesson": 37, "step": 4},
    "days": {"2026-11-21": {"active": 24, "passive": 41, "tiny": false, "lang": "gsw"}},
    "streak": {"current": 18, "freezesLeft": 2, "repairUntil": null},
    "cards": {"gsw-37-04": {"due": "2026-11-24", "ivl": 3, "ease": 2.5, "reps": 2}},
    "weeks": {"2026-W47": {"human": 45, "canDo": ["A2.3", "A2.5"]}},
    "checkpoints": {"25": {"date": "...", "recId": "idb:rec25"}}
  }
  ```
- Media Session API for lock-screen and earbud controls in hands-free mode. Wake Lock is not needed for audio.
- Export button: `JSON.stringify(localStorage)` to a downloaded .json file. Import: a file input.

---

## Sources
- Duolingo, "How the Duolingo streak builds habit": https://blog.duolingo.com/how-duolingo-streak-builds-habit
- Duolingo, "Improving the streak": https://blog.duolingo.com/improving-the-streak
- Duolingo, "How streaks keep learners committed": https://making.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals
- Lenny's Newsletter, Duolingo streaks (Jackson Shuttleworth): https://www.lennysnewsletter.com/p/duolingo-streaks
- Sensor Tower on streaks (Busuu +15%): https://sensortower.com/blog/duolingo-streak-feature-app-engagement-growth
- Silverman & Barasch 2023, JCR (summaries): https://knowledge.insead.edu/marketing/consumer-streaks-are-motivating-the-key-is-keeping-them-alive-19011 ; https://www.colorado.edu/business/faculty-research/2023/04/19/or-track-how-broken-streaks-affect-consumer-decisions
- Lally et al. 2010 summaries: https://jamesclear.com/new-habit ; https://bps.org.uk/research-digest/how-form-habit ; https://blogs.ucl.ac.uk/bsh/2012/06/29
- Gollwitzer & Sheeran 2006 meta-analysis: https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes
- Duolingo time-of-day data (2018): https://www.weforum.org/stories/education-and-skills/the-best-time-of-day-to-learn-a-new-language-according-duolingo-data/
- Dai, Milkman & Riis 2014: https://faculty.wharton.upenn.edu/wp-content/uploads/2014/06/Dai_Fresh_Start_2014_Mgmt_Sci.pdf
- Soft commitments / MOOC commitment experiments: https://www.aeaweb.org/doi/10.1257/app.20170288 ; https://cesifo.org/en/publications/2024/working-paper/helping-students-succeed-long-term-effects-soft-commitments-and ; https://archive.ilr.cornell.edu/sites/default/files/cheri_wp165_1.pdf
- Anki deck options (review load): https://docs.ankiweb.net/deck-options.html ; FSRS optimal retention: https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention
- LMOOC dropout: https://rossier.usc.edu/documents/chen-estella-2017 ; https://www.mdpi.com/2071-1050/11/10/2808/review_report ; https://openaccess.library.uitm.edu.my/find/Record/doaj-art-975130355ba848719ef3df09ba85ceac
- Vesselinov & Grego 2012 (Duolingo study): https://www.scribd.com/doc/295554832/DuolingoReport-Final
- Destinos: https://en.wikipedia.com/wiki/Destinos ; https://learner.org/?p=1405
- Duolingo characters: https://www.fastcompany.com/90664438/duolingo-wants-to-be-the-sesame-street-for-adults ; https://blog.duolingo.com/duolingo-female-character-origin-stories
- Dreaming Spanish roadmap: https://www.dreaming.com/blog-posts/the-og-immersion-method ; https://lingtuitive.com/blog/1000-hours-of-spanish-listening
- CEFR self-assessment accuracy: https://bulletin.vals-asla.ch/article/download/10553/9852/29036 ; https://theses.ubn.ru.nl/server/api/core/bitstreams/35ee0319-c6c3-4df5-b21d-c32d8dbaa05c/content
- Tiny Habits (Fogg): https://www.coglode.com/nuggets/tiny-habits ; https://www.npr.org/2026/01/13/nx-s1-5675362/a-proven-method-to-make-a-habit-stick
