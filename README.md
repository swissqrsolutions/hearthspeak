# 🔥 Hearthspeak — *speak like family*

A free, offline, audio-first speaking course for **Kannada**, **Swiss German (Zürich)** and **Levantine Arabic** (with a Quran Bridge), taught from English.

Each lesson is a short story scene. A grandparent narrator (Ajji, Grosspapi or Jiddo) explains the grammar and vocabulary slowly, and you **speak from day one**.

| Step | What you do |
|---|---|
| 1 · Listen | Dialogue: target language · English · ▶ per line, 🔁 shadow loop, 🎙 record & compare |
| 2 · Grandparent explains | Warm English audio explanation with the native words spliced in |
| 3 · Your turn | Role-play: English prompt → pause → you speak → native line |
| 4 · Build it up | Hard phrases built up step by step |
| 5 · Remix | Same pieces, new sentences |
| 6 · Notes + culture | |
| 7 · WhatsApp | How people actually text it |
| 8 · Retell | The 4/3/2 fluency drill (90 / 60 / 45 seconds), recorded |
| 🚶 Walk mode | The whole lesson as one MP3, works with the screen off |

**Use it on your phone:** open the GitHub Pages link → browser menu → *Add to Home screen* → tap **Save everything for offline use**.

## Build
```
npm install
tools/audio/.venv/Scripts/python tools/audio/gen.py content/kannada/001.yaml   # audio (free, local, CPU)
node tools/build.mjs                                                         # HTML
```
Voices: Kokoro-82M (Apache-2.0) for the English narrator. Meta MMS-TTS (CC-BY-NC-4.0, used here for personal non-commercial purposes) for the prototype Kannada voice.

Research behind the design: `reports/` and `research_notes/`.
