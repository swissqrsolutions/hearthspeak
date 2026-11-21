# Phone capabilities for speaking practice (Galaxy S26 Ultra, Chrome/Samsung Internet, static PWA)

Researched 2026-11-21 with WebSearch and WebFetch, about 15 calls. Confidence labels:
**[V]** = verified in a 2025–2026 primary source, **[P]** = probable (older source or well-known behaviour), **[U]** = unverified, so test it on the device.

## Capability table

| Capability | Works from our PWA? | Offline? | Cost | kn (Kannada) | Levantine Arabic | Swiss German |
|---|---|---|---|---|---|---|
| Web Speech `SpeechRecognition` (Chrome Android) | Yes [P]. caniuse lists Chrome Android 147 as "partial". | **No.** It uses Google cloud recognition. On-device (`processLocally`) is desktop-only: in May 2026 a Google engineer said "Android & ChromeOS currently do not support on-device Web Speech" [V] | Free (no key) | `kn-IN` likely [P/U] | `ar-JO`/`ar-LB`/`ar-SY` locale tags exist in Google STT [P]. The output leans toward MSA spelling, and dialect accuracy is mediocre [U] | `de-CH` = Swiss *Standard* German [P]. Dialect speech gets normalised or garbled, so it can't check dialect [U] |
| Web Speech on Samsung Internet | Unclear: support has historically been missing or flaky [U] | No | Free | ? | ? | ? |
| `speechSynthesis` (TTS) | Yes [P] | Yes, if the Google TTS voice pack is downloaded [P] | Free | Google TTS has a kn-IN voice [P] | MSA-ish Arabic voice only [P] | No Swiss voice, only de-DE [P] |
| Chrome built-in AI: Prompt API / Gemini Nano | **No on Android.** Docs say Chrome for Android isn't supported. The I2S (Apr 2026) answers "No" for all 6 platforms [V] | n/a | n/a | n/a | n/a | n/a |
| Translator / Language Detector APIs | Shipped on desktop Chrome 138. Google PM (Dec 2025): Android "decided per API, stay tuned in 2026". No Android launch found [V/U] | Would be on-device | Free | Desktop language list unverified | ar yes on desktop [P] | de only |
| Samsung Interpreter / Live Translate / Note Assist / Transcript Assist | Not callable from the web, but the learner can use them next to the course | Interpreter works offline with downloaded language packs [P] | Free (Samsung says Galaxy AI is free; core features have no paid tier announced [U]) | **Not supported** (24 languages as of Oct 2026, including Hindi and Gujarati but not Kannada) [V] | "Arabic", with no dialect listed [V]. Probably MSA-biased [U] | "German" only [V] |
| Gemini app / Gemini Live (free tier) | Separate app, which the course can deep-link to | No | Free with compute-based limits that refresh every 5 h plus a weekly cap (since I/O May 2026) [V]. The Live allowance isn't published | Kannada listed for Gemini Live (Indian-language expansion) [P] | Arabic listed in the app. A tester said Lebanese "needed me to morph my accent" [P] | Swiss German not officially supported. It understands it somewhat, but replies in Standard German [U] |
| Google Translate app conversation mode | Separate app | Text packs offline, voice mostly online [P] | Free | Yes (voice in/out) [P] | Arabic, not Levantine-specific [P] | No [P] |
| `MediaRecorder` + `getUserMedia` | Yes, Chrome Android records `audio/webm;codecs=opus` [P] | Yes | Free | any | any | any |
| Web Audio API (AnalyserNode, OfflineAudioContext decode) | Yes [P] | Yes | Free | any | any | any |
| PWA install + Service Worker/Cache API/IndexedDB/OPFS | Yes [P] | Yes | Free | – | – | – |
| Storage quota | Per origin up to **60% of disk** in Chrome. Best-effort storage gets evicted LRU-first under pressure. `navigator.storage.persist()` prevents eviction [V] | – | – | – | – | – |
| Background audio with screen off + Media Session lock-screen controls | Yes, when playing via an `<audio>` element. Media Session gives the notification and lock-screen controls (play/pause/seek/next/prev, artwork) [P] | Yes | Free | – | – | – |

### Hosting caveat (important for 2–5 GB of audio)
GitHub Pages has a **1 GB published-site soft limit**, **100 MB per file**, and roughly 100 GB/month bandwidth [P]. 2–5 GB of audio won't fit in one Pages site. Options:
- one repo/Pages site per language (each under 1 GB, e.g. Opus at 24–32 kbps mono, which is about 11–14 MB/hour);
- GitHub Release assets (CORS on the redirect target is unverified [U]);
- a free object store (e.g. Cloudflare R2's free 10 GB with zero egress; this is a free tier, so check the terms) [U].

Encoding at Opus 24 kbps mono cuts the size about 4× compared with 96 kbps MP3, so this may solve itself.

### Service-worker audio gotcha
Responses from the Cache API don't answer `Range` requests by default. Seeking in cached audio can fail, so use Workbox `RangeRequestsPlugin` or a hand-rolled 206 response. Another option is to store the audio as Blobs in IndexedDB/OPFS and play it through `URL.createObjectURL`. Downloads should be explicit per-lesson "packs" with a progress UI, and call `navigator.storage.persist()` once after install.

## The 6 most valuable features to build

1. **Record-and-compare shadowing loop (fully offline; works for all 3 languages).**
   - `getUserMedia` → `MediaRecorder` (webm/opus).
   - The UI plays native, then learner, then native again, with A/B buttons and a loop on a sentence segment.
   - Store the learner's best take per sentence in IndexedDB so they can listen to progress over weeks.
   - This is the highest-value, lowest-risk feature and doesn't depend on any ASR quality.

2. **Visual waveform + pitch-contour overlay (offline).**
   - Decode both clips with `OfflineAudioContext`.
   - Compute an F0 contour in JS with YIN/autocorrelation (around 100 lines, or the `pitchy` lib).
   - Trim silence with an RMS threshold, align with DTW (or just time-normalise), and draw two curves on canvas.
   - Most useful for Swiss German melody/intonation, Arabic stress and emphatics (as rhythm), and Kannada vowel length (the duration bars make long/short vowels visible).
   - Show it as "shape similarity" rather than a pass/fail grade, since pitch tracking on phone mics is noisy.

3. **"Say it" check via `SpeechRecognition` + fuzzy match (online only; Kannada and Arabic only).**
   - Set `lang` to `kn-IN` or `ar-JO`/`ar-LB`, `interimResults=false`, `maxAlternatives=5`.
   - Normalise both strings:
     - Arabic: strip harakat, unify alef/yaa/taa-marbuta forms.
     - Kannada: NFC normalisation, then compare akshara (grapheme clusters via `Intl.Segmenter`).
   - Score with character-level Levenshtein or token overlap against the target and every alternative, and take the max.
   - Treat the score as an *intelligibility* check, not a pronunciation grade, because ASR auto-corrects toward real words.
   - Target sentences need a native-script form. The Arabic output will be in MSA-style spelling, so keep a looser threshold (around 0.6) and an accepted-variants list.
   - **Don't offer this for Swiss German.** The `de-CH` model expects Standard German, so we'd be grading the wrong language. At most, use it for an "it understood you as Standard German: …" curiosity mode.
   - Feature-detect it and hide it when offline. `processLocally` will throw or return unavailable on Android today.

4. **Gemini Live "conversation partner" hand-off (free, online).**
   - Each lesson gets a "Practice with Gemini" button that copies a role-play prompt to the clipboard, for example: "You are a shopkeeper in Beirut. Speak only Lebanese Arabic, short sentences, use these words: …; correct my mistakes after each turn."
   - The button then opens the Gemini app with an Android intent URL or a plain https link.
   - Kannada is likely good. For Levantine, instruct it explicitly "not MSA" and expect drift.
   - For Swiss German, use it as a *listening/understanding* partner (the learner speaks dialect, Gemini answers in Standard German) or as a dialect text tutor. Don't sell it as a dialect speaker.
   - Free-tier limits are compute-based and refresh every 5 hours.

5. **Samsung Interpreter "were you understood?" drill (offline-capable, Arabic only, plus German as a weak proxy).**
   - Course cards tell the learner: open Interpreter (conversation mode), set Arabic ↔ English, say the lesson sentence, and check whether the English translation matches the meaning.
   - It's an MSA-biased intelligibility check that works offline after the pack download.
   - Not usable for Kannada (unsupported), so send Kannada learners to Google Translate conversation mode (online) instead.
   - This is a usage guide, not code: we can't call Galaxy AI from the web.

6. **Offline audio course player with lock-screen controls.**
   - Installable PWA with per-lesson downloads (Cache API with range support, or OPFS blobs) and `storage.persist()`.
   - Playback through an `<audio>` element plays with the screen off.
   - `navigator.mediaSession.metadata` (lesson title, artwork) plus action handlers for play/pause, seekbackward/seekforward (repeat the last sentence), and nexttrack/previoustrack (sentence-level navigation).
   - Supports a "pause-and-repeat gap" mode: insert silence after each sentence for hands-free shadowing while walking.
   - Tell users to exclude Chrome from Samsung's "Put unused apps to sleep" / battery optimisation if playback stops [U].

## What not to rely on (late 2026)
- Prompt API / Gemini Nano from a web page on Android: not available [V].
- On-device Web Speech (`processLocally`) on Android: not available [V].
- Translator/Language Detector APIs on Android: no confirmed launch [U]. Feature-detect them (`'Translator' in self`) and use them only if present.
- Any free tool that *speaks or recognises Swiss German dialect*. None found among Google and Samsung built-ins. Third-party projects exist (e.g. github.com/studerus/swiss_german_gemini, which uses Azure) but aren't free or zero-setup. So the native recordings are the only reliable Swiss German model.

## To test on the device (one quick test page)
1. Does `new webkitSpeechRecognition()` with `lang` set to `kn-IN`, `ar-LB`, `ar-JO` and `de-CH` return results or `language-not-supported`? Run it in Chrome and in Samsung Internet.
2. `SpeechRecognition.available({langs:['kn-IN'], processLocally:true})`: expect unavailable or a throw.
3. `navigator.storage.estimate()` and `persist()` result after installing the PWA.
4. Screen-off playback for 30+ minutes with the battery optimisation default.
5. `'LanguageModel' in self`, `'Translator' in self`, `'LanguageDetector' in self`.

## Sources
- Intent to Ship, On-device Web Speech (desktop only): https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM
- On-device Recognition Quality thread, May 2026 ("Android & ChromeOS currently do not support on-device Web Speech"): https://groups.google.com/a/chromium.org/g/blink-dev/c/P8P-x7AnC6I
- MDN SpeechRecognition.available / install / processLocally: https://developer.mozilla.org/docs/Web/API/SpeechRecognition/available_static
- Prompt API docs (Android unsupported): https://developer.chrome.com/docs/ai/prompt-api
- Built-in AI on Android, PM answer: https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/c/HKIndTczlPM
- Samsung Galaxy AI language guide (Levant): https://www.samsung.com/levant/support/mobile-devices/galaxy-ai-languages-usage-guide/
- SamMobile, Oct 14 2026 (24 languages, Hungarian and Malay added): https://www.sammobile.com/news/bixby-galaxy-ai-features-support-more-languages/
- Gemini Live languages: https://blog.google/products/gemini/gemini-live-extensions-language-expansion/ and https://beebom.com/gemini-live-supports-indian-languages
- Gemini usage limits after I/O 2026: https://9to5google.com/2026/05/21/gemini-usage-limits-live-user-reactions/
- Android Authority, Gemini Live for a second language (Lebanese Arabic anecdote; page returned 403, quoted via search snippet): https://www.androidauthority.com/using-gemini-live-for-second-language-3596449
- Storage quotas: https://web.dev/articles/storage-for-the-web
- Swiss German + Gemini third-party: https://github.com/studerus/swiss_german_gemini
