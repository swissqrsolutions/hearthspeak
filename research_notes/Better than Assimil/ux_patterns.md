# UX patterns for a mobile-first offline lesson player

Researched 2026-11-21. Target: one static HTML/CSS/JS page per lesson on a Samsung Galaxy S26 Ultra (Chrome, about 6.9" screen, one-handed use). Sections covered: dialogue (TL | EN | per-line play button), grandparent narrator, role-play with pauses, record-and-compare, remix, notes, texting, and walk-mode MP3.

## Sources read
- asbplayer (README): auto-pause at the start or end of each subtitle, repeat N times or forever, a navigable subtitle list, condensed playback, and word status coloring. https://github.com/killergerbah/asbplayer
- Lidashi1025/shadowing-player (README): each sentence is one practice unit. Play each sentence 1–3 times, then pause for duration × a gap multiplier. Single-sentence loop. Speed 0.5–1.0 with pitch kept. Bilingual display cycles English / bilingual / hidden. Resume per video, starred sentences, and record → play mine / play original. https://github.com/Lidashi1025/shadowing-player
- hedon954/shadowing (README, macOS): every recording is kept as a new "take" and never overwritten. Optional countdown before recording. Three compare modes: original only, mine only, original then mine. Subtitles are hidden by default ("listen first"). Back/forward 5 s, replay the current sentence with Return, speed 0.5–1.5, theme follows the system, and position, selection and loop restore on reopen. https://github.com/hedon954/shadowing
- TideSparrow/shadowing-english (48 stars, Flutter, Android): tap a subtitle to seek, loop hard sentences, and a separate speed setting for the explanation audio. https://github.com/TideSparrow/shadowing-english
- Joynnncode/chouette-french-shadowing: transcript synced to playback, record + playback compare, tap a word to save it. https://github.com/Joynnncode/chouette-french-shadowing
- GabrielDrapor/ovid ("Two languages, one tap"): tap a paragraph to switch between original and translation. Picks up reading where you left off. Installable PWA. https://github.com/GabrielDrapor/ovid
- AntennaPod (strings.xml): rewind and fast-forward skip times are configurable. Speed presets. Sleep timer with an "+N min" extend button. Pause when headphones or Bluetooth disconnect and resume on reconnect. Transcript "Follow audio" toggle. Default speed per feed. https://github.com/AntennaPod/AntennaPod
- LuteOrg/lute-v3: reader with per-word status. Tap a word to get its gloss and status. https://github.com/LuteOrg/lute-v3
- ZuodaoTech/everyone-can-use-english (Enjoy): shadowing with recordings compared against the original. https://github.com/ZuodaoTech/everyone-can-use-english
- Pimsleur reviews: a hands-free driving mode; prompt → pause → native answer; "if you don't speak, the lesson just waits". https://storylearning.com/blog/pimsleur-review , https://www.vice.com/en/article/pimsleur-review , https://lingopie.com/blog/pimsleur-review/
- Speechling reviews: listen → record → compare side by side, which reviewers say appears "pretty much everywhere in the app". Dictation mode. https://ling-app.com/tips/speechling-review/ , https://apps.apple.com/app/id1239983313
- Language Transfer app: download in advance, save progress, listen with the phone locked. A user review asked for an automatic pause after each question. https://apps.apple.com/app/id1519599004 , https://copycatcafe.com/blog/language-transfer-review
- Duolingo backlash: the forced linear path, hearts replaced by "energy", and streak loss-aversion. https://piunikaweb.com/2022/12/16/duolingo-app-update-with-path-ui-faces-backlash-from-users/ , https://www.androidauthority.com/duolingo-course-upgrade-complaints-3685447

## Ranked features (value ÷ code cost)

1. **Resume where you left off.** Seen in: Ovid, shadowing-player, hedon954/shadowing, Language Transfer, AntennaPod. Why: phone sessions get interrupted constantly, so reopening the page should land you back where you were. JS: on `timeupdate` (throttled to about 2 s), and on line change or `visibilitychange`, save `{lesson, section, line, t}` to `localStorage` inside try/catch. On load, `scrollIntoView` the saved line and set `audio.currentTime`.

2. **Auto-pause after each line, with a gap scaled to the line's length (role-play / shadow mode).** Seen in: asbplayer auto-pause, shadowing-player "duration × gap multiplier", Pimsleur prompt→pause. Language Transfer users ask for it. Why: it gives you a slot to speak without reaching for the pause button. JS: store each line's start/end or a per-line file. On `ended` (or when `currentTime >= end`), `setTimeout(next, (end-start)*gapFactor*1000)`. Gap factor chips: 0, 1×, 1.5×, 2×.

3. **Big, thumb-reachable bottom control bar.** Seen in: AntennaPod player, every podcast app, Pimsleur driving mode. Why: on a 6.9" phone held one-handed, top-of-screen controls are out of reach. JS/CSS: a `position:fixed; bottom:0` bar with buttons at least 56px tall: ⟲5s, ◀ line, ▶/❚❚, line ▶, ⟳ repeat. Add `padding-bottom: env(safe-area-inset-bottom)`.

4. **Lock-screen and headset controls (Media Session API).** Seen in: AntennaPod, Language Transfer ("listen with your phone locked"), Pimsleur. Why: walk mode works with the screen off, and Bluetooth buttons or earbud taps can drive the lesson. JS: set `navigator.mediaSession.metadata = new MediaMetadata({title, artist:'Lesson 12', artwork})`. Then `setActionHandler('play'|'pause'|'previoustrack'|'nexttrack'|'seekbackward'|'seekforward', ...)`, mapping previous/next to line navigation. About 15 lines.

5. **Replay the current line, and skip back 5 s.** Seen in: hedon954/shadowing (Return replays the sentence; ←/→ 5 s), AntennaPod's configurable rewind, asbplayer repeat. Why: "what did she say?" is the most common action. JS: `audio.currentTime = Math.max(0, audio.currentTime - 5)`. For replay line, seek to `line.start` and play. Double-tap the line text to replay it.

6. **Hide / peek / show translation (3 states, global plus per line).** Seen in: shadowing-player (English / bilingual / hidden), hedon954 (hidden by default), Ovid (tap to toggle). Why: comprehension recall needs the English hidden, but a stuck learner needs it one tap away. JS: a class on `<body>` (`.en-hidden`, `.tl-hidden`). Tapping a line's English toggles `.revealed` on that line. CSS: `.en-hidden .en:not(.revealed){filter:blur(6px)}`. Blur keeps the layout stable.

7. **Speed chips 0.6 / 0.75 / 0.9 / 1.0 / 1.2, pitch preserved.** Seen in: AntennaPod presets, shadowing-player 0.5–1.0, hedon954 0.5–1.5, TideSparrow (separate speed for explanation audio). Why: slow speed is for decoding, normal for shadowing, faster to stretch the ear. JS: `audio.playbackRate = r; audio.preservesPitch = true` (true is Chrome's default). Persist the rate in localStorage. Keep **separate rates for dialogue and narrator**, since the grandparent explanation can run at 1.2 while dialogue runs at 0.75.

8. **Karaoke / follow-along highlight of the current line, with auto-scroll.** Seen in: AntennaPod transcript "Follow audio", Chouette synced transcript, asbplayer subtitle list. Why: you always know where you are, which also helps with eyes-off use. JS: on `timeupdate`, find the line whose `start <= t < end`, toggle `.current`, and `scrollIntoView({block:'center', behavior:'smooth'})`. Turn off auto-scroll for 5 s after a manual scroll (a "follow" toggle). Word-level karaoke is optional and needs word timings, so skip it unless you have them.

9. **Record-and-compare with "original → mine" chained playback, keeping takes.** Seen in: hedon954 (three compare modes, takes never overwritten, countdown), Speechling, shadowing-player, Enjoy. Why: hearing your take right after the model is what makes the difference audible. JS: `getUserMedia({audio:true})` → `MediaRecorder` → Blob → `URL.createObjectURL`. On "Compare", play the original, then on `ended` play the take. Keep the last 3 takes per line in memory, or in IndexedDB if they should persist. The mic button is hold-to-record, or tap with a visible red timer.

10. **Repeat-N per line (1×/2×/3×/∞).** Seen in: asbplayer "repeat N times or indefinitely", shadowing-player "1–3 times", hedon954 loop. Why: drilling a hard line without tapping. JS: a counter in the `ended` handler. If `rep < N`, replay; otherwise advance (or apply the gap from #2).

11. **Swipe left/right between lines (or cards in role-play/remix).** Seen in: AnkiDroid gesture navigation, card-based shadowing apps. Why: a large target with no precise tap needed. JS: on `touchstart`/`touchend`, if `|dx| > 60 && |dx| > |dy|*1.5`, call next/prev. Use `touch-action: pan-y` on the container so vertical scroll still works. Keep buttons as well, because swipes are invisible.

12. **Tap a word for its gloss.** Seen in: Lute v3, asbplayer/Yomitan, Chouette (tap to save). Why: you don't need to reach for a dictionary, and the narrator's notes become clickable. JS: pre-wrap glossable words at build time as `<span data-g="gloss">`. One delegated `click` listener shows a small fixed popover near the word. No runtime parsing is needed. A long-press could "star" the word into notes.

13. **Sleep timer / "stop after N lines/minutes" for walk mode.** Seen in: AntennaPod (sleep timer, "+N min" extend, by episodes). Why: bedtime or end-of-walk listening, and it stops the session drifting on. JS: `setTimeout(()=>{fadeOut(); audio.pause()}, mins*60e3)`, where the fade lowers `volume` over 5 s. Chips: 10 / 20 / end of section. Shaking the phone to extend is optional and costs more code.

14. **One-tap "Today" / Continue button (a single primary action).** Seen in: Pimsleur ("next lesson"), Language Transfer progress, Duolingo's one strength. Why: removes the "what should I do now?" decision. JS: an index page reads localStorage `{lastLesson, lastSection, done[]}` and renders one big "Continue: Lesson 7 · Role-play" button plus a small list of the rest. No forced linear path (see the anti-patterns).

15. **Pause when headphones disconnect.** Seen in: AntennaPod (pause on disconnect). Why: audio shouldn't blast from the speaker in public when your earbuds drop out. JS: the browser already pauses media on output-device change in most Android Chrome cases. Also listen for `navigator.mediaDevices.ondevicechange` and pause. Cheap insurance.

16. **Dark mode following the system, with large readable type.** Seen in: hedon954 (follows system appearance), Ovid (CJK typography tuned). Why: night study and OLED screens. CSS: color tokens on `:root` plus `@media (prefers-color-scheme: dark)`. Target-language text at least 20px, `line-height:1.6`.

17. **Haptic tick on key events.** Seen in: native Android apps. Why: lets you confirm without looking during role-play: your turn, recording started, recording stopped. JS: `navigator.vibrate?.(15)` for your turn, `[30,50,30]` for recording start. Works in Android Chrome, so it's free on the S26.

18. **Screen Wake Lock during active practice.** Why: stops the screen dimming mid role-play, while walk mode lets it sleep. JS: `await navigator.wakeLock.request('screen')`. Re-request on `visibilitychange`. Release it in walk mode.

## Anti-patterns to avoid

1. **Loss-aversion gamification (streak shaming, hearts/energy that block practice).** This drew the heaviest Duolingo backlash. For a self-study tool it adds anxiety and pushes people toward low-value "streak-saver" exercises. At most, show a quiet "days practiced" count.
2. **Forced linear path / locked sections.** The 2022 Duolingo path backlash was about lost choice. Every section (dialogue, narrator, role-play, texting) should be reachable from a visible tab bar. Suggest, don't gate.
3. **Translation always visible, or impossible to see.** Always-on English kills listening effort. Hidden with no peek frustrates. Use the 3-state toggle (#6), defaulting to hidden for review and shown for first exposure.
4. **Overwriting the learner's previous recording, or requiring many taps to compare.** hedon954 keeps every take for this reason. Make compare one tap that chains original → mine.
5. **Tiny top-of-screen icon controls and hidden gestures with no button fallback.** These fail one-handed on a 6.9" phone and are invisible to new users. Also avoid autoplaying sound on page load. Chrome blocks it anyway, and it surprises users in public.

Also worth avoiding: auto-scroll that fights the user's manual scroll (pause follow on touch); losing state on reload (use localStorage); and modal dialogs for glosses (use a lightweight popover that closes when you tap outside it).
