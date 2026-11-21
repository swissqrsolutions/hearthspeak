# Tech, Models, Datasets & Repos for an Offline Assimil-style Speaking App (Swiss German, Kannada, Arabic dialect)

Research date: 2026-11-21. Repo stars and last-push dates come from the GitHub REST API (api.github.com/repos/...). HF license and last-modified values come from the Hugging Face API (huggingface.co/api/models/...), both queried on 2026-11-21.
**User constraint (coordinator):** total cost must be zero. No paid APIs, cloud TTS, hosting or app-store fees. Sideloaded APK or PWA is fine. Free local models on a Windows PC at build time are fine. Non-commercial (NC) licenses are acceptable for personal use but are flagged below.

---

## 1. Offline TTS per language (and pre-generate vs on-device)

### Takeaway
No language has a good, permissive, *on-device* dialect TTS voice. Swiss German has nothing usable off the shelf. Kannada has strong open models, but they are large (0.9B). Egyptian and Levantine Arabic have new MIT-licensed Chatterbox fine-tunes that are GPU-class. The clear best approach is to **pre-generate all lesson audio on the user's Windows PC at build time** with the best free model per language (ideally native-speaker recordings for Swiss German) and ship Opus/MP3 packs. The app then only plays files.

### Cited Findings
**Piper (rhasspy / OHF-Voice)**
- `rhasspy/piper` (MIT, 11.3k stars) is **archived**, last push 2025-08-26. Development moved to `OHF-Voice/piper1-gpl` (**GPL-3.0**, 6.3k stars, active 2026-11-20). — [rhasspy/piper](https://github.com/rhasspy/piper), [OHF-Voice/piper1-gpl](https://github.com/OHF-Voice/piper1-gpl)
- Piper's voice list covers 44 languages. Arabic has **ar_JO only**. German has **de_DE only, no de_CH or gsw**. Indian languages are hi_IN, ml_IN and te_IN, with **no kn_IN**. Each voice's MODEL_CARD carries its own license, and "some voices may have restrictive licenses." — [piper1-gpl VOICES.md](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md)
- Exact voices in voices.json:
  - Arabic: `ar_JO-kareem-low`, `ar_JO-kareem-medium`.
  - German: `de_DE-thorsten-{low,medium,high}`, `thorsten_emotional-medium`, `kerstin-{low,medium}`, `eva_k-x_low`, `karlsson-low`, `mls-medium`, `pavoque-low`, `ramona-low`.
  - Hindi: `pratham`, `priyamvada`, `rohan` (all medium). Malayalam: `arjun`, `meera`. Telugu: `maya`, `padmavathi`, `venkatesh`.
  - No kn_, de_CH or gsw entries anywhere. — [rhasspy/piper-voices voices.json](https://huggingface.co/rhasspy/piper-voices/raw/main/voices.json)

**sherpa-onnx (on-device runtime)**
- `k2-fsa/sherpa-onnx` is Apache-2.0, 16.1k stars, pushed 2026-11-21. It covers STT, TTS, VAD and diarization, and maintains a model catalog listed by language. — [repo](https://github.com/k2-fsa/sherpa-onnx), [TTS model list](https://k2-fsa.github.io/sherpa/onnx/tts/all/)

**Meta MMS-TTS**
- `facebook/mms-tts-kan` and `facebook/mms-tts-ara` are **CC-BY-NC-4.0**, last updated 2023. They are acceptable for personal use but flagged NC. — [mms-tts-kan](https://huggingface.co/facebook/mms-tts-kan), [mms-tts-ara](https://huggingface.co/facebook/mms-tts-ara)

**Kannada**
- **AI4Bharat Indic Parler-TTS** is Apache-2.0 and gated behind an HF click-through. It is about 0.9B params (F32) and covers kn among about 20 languages.
  - Kannada voices: **Suresh, Anu** (recommended), Chetan, Vidya.
  - Kannada Native Speaker Score is 77.97% pretrained and **88.17% finetuned**.
  - Card updated 2026-10-06.
  - — [HF card](https://huggingface.co/ai4bharat/indic-parler-tts), [AI4Bharat page](https://ai4bharat.iitm.ac.in/areas/model/TTS/Indic%20Parler%20TTS/)
- **IndicF5** is **MIT** and gated. It clones a voice from a reference clip plus transcript, covers 11 Indic languages including kn, and was updated 2026-10-06. An AI4Bharat member said it is "completely open for commercial usage." — [HF](https://huggingface.co/ai4bharat/IndicF5), [GitHub](https://github.com/AI4Bharat/IndicF5), [Sonexlabs summarizing discussion #34](https://www.sonexlabs.com/blog/best-open-source-hindi-tts)
- A community open-source Kannada TTS built on the indic-parler-tts architecture was announced in 2025. I did not verify its repo or license. — [LinkedIn post](https://www.linkedin.com/posts/sasank-chilamkurthy_were-releasing-opensource-kannada-tts-model-activity-7364228989936168962-QqOL)

**Swiss German**
- ZHAW / Stucki et al. (Interspeech 2025), "Voice Adaptation for Swiss German": they fine-tuned **XTTSv2** to produce Swiss German speech from *Standard German text prompts* while cloning a speaker. They used about 5,000 h of SRF podcast/broadcast data with weak labels. — [arXiv 2505.22054](https://arxiv.org/html/2505.22054v1), [ISCA](https://www.isca-archive.org/interspeech_2025/stucki25_interspeech.html), [ZHAW thesis PDF](https://www.zhaw.ch/storage/engineering/institute-zentren/cai/studentische_arbeiten/Fall_2024/MSE_MT_25_ciel_Stucki_TTS_for_Swiss_German.pdf), [Slator](https://slator.com/swiss-researchers-adapt-voice-cloning-to-swiss-german-dialects/)
- **I found no public weights release for the ZHAW model.**
- `coqui/XTTS-v2` declares license "other" (Coqui Public Model License). — [HF](https://huggingface.co/coqui/XTTS-v2)
- `swordi/SwissDial-TTS` is tagged gsw, has **no declared license**, was last modified 2022-12-02, had 55 downloads/month, and has an empty card. — [HF](https://huggingface.co/swordi/SwissDial-TTS)
- `studerus/swiss_german_gemini` is a real-time Swiss German voice chat with dialect voices (e.g., "Andrin / Basel") **on Google Gemini (cloud)**. It is not offline and not guaranteed free. — [GitHub](https://github.com/studerus/swiss_german_gemini)

**Arabic dialect**
- **NAMAA-Egyptian-TTS** is **MIT** and fine-tunes Chatterbox Multilingual for conversational Egyptian dialect (not MSA). It takes undiacritized Egyptian text as input and supports reference-audio voice transfer. Updated 2026-03-04. — [HF](https://huggingface.co/NAMAA-Space/NAMAA-Egyptian-TTS)
- **oddadmix/lahgtna-chatterbox-v1** ("لهجتنا") is an MIT Arabic multi-dialect TTS based on Chatterbox, updated 2026-04-17. — [HF](https://huggingface.co/oddadmix/lahgtna-chatterbox-v1)
- **Levantine**: the `mohammedaly22/leva-tts` model and the `lahgtna-levantine-tts` dataset (about 50k downloads) belong to one collection, alongside a Levantine/English code-switching zero-shot Space. An Egyptian collection also exists. — [Levantine collection](https://huggingface.co/collections/mohammedaly22/levantine-arabic-text-to-speech-tts), [Egyptian collection](https://huggingface.co/collections/mohammedaly22/egyptian-arabic-text-to-speech-tts)
- The base model **ResembleAI/chatterbox** is MIT, lists ar among its languages, has 28k stars, and was pushed 2026-11-04. — [HF](https://huggingface.co/ResembleAI/chatterbox), [GitHub](https://github.com/resemble-ai/chatterbox)
- `azeddinShr/Spark-TTS-Arabic-Complete` was fine-tuned on ClArTTS (Classical/MSA) and **requires diacritized input**, so it is a poor fit for dialect. — [HF](https://huggingface.co/azeddinShr/Spark-TTS-Arabic-Complete)
- `MBZUAI/ArTST` is CC-BY-NC-4.0. — [HF](https://huggingface.co/MBZUAI/ArTST)
- An Egyptian Arabic XTTS demo Space also exists. — [MohamedRashad/Egyptian-Arabic-TTS](https://huggingface.co/spaces/MohamedRashad/Egyptian-Arabic-TTS)

**Speed (relevant to build-time generation)**
- Chatterbox Turbo is claimed at up to about 6x faster than real time on a modern GPU (vendor claim).
- Chatterbox Nano (110M) is claimed at about 3x real time on an 8-thread CPU.
- A user report says the full model on CPU "pegs every core and still renders slower than real time."
- A community benchmark puts an A10G at about 1x real time.
- — [Resemble Chatterbox Turbo](https://www.resemble.ai/learn/models/chatterbox-turbo), [Chatterbox Nano](https://www.resemble.ai/learn/models/chatterbox-nano), [community benchmark gist](https://gist.github.com/danielrosehill/33575cb99efb05df801374ceb828731a)
- Kokoro-82M (Apache-2.0) is English-centric (lang: en), so it is not useful for these three languages. — [HF](https://huggingface.co/hexgrad/Kokoro-82M)

### Inferences
**Best fully-free pipeline per language** (all run locally on Windows; generation-time estimates are mine and unverified):

- **Swiss German**
  - Record audio, don't synthesize. No downloadable dialect TTS exists.
  - Best free path: the user or a native-speaker friend records lessons on a phone. Free Audacity plus silero-vad handle splitting.
  - Fallback: Standard German Piper `de_DE-thorsten-high` for teacher-voice English/German glosses only. **Never use it for dialect lines.** It would teach wrong pronunciation.
  - XTTSv2 voice-cloning can't produce Swiss German without the unreleased ZHAW fine-tune.
- **Kannada**
  - **Indic Parler-TTS** (Apache-2.0, voices Suresh/Anu) for clean, consistent voices. Use IndicF5 (MIT) if you want a cloned native voice.
  - Both are about 0.9B-class PyTorch models. A consumer NVIDIA GPU (≥8 GB) is strongly preferred.
  - Estimated time for 10 h of audio: a few hours on GPU, and very likely days on CPU only.
  - MMS-TTS-kan is the CPU-fast fallback: small VITS, minutes to about 1 h for 10 h of audio. It is **CC-BY-NC**, OK for personal use.
- **Egyptian Arabic**
  - **NAMAA-Egyptian-TTS** (MIT, Chatterbox).
  - Estimated time for 10 h of audio: about 2–10 h on a consumer GPU (using the ~1–6x real-time figures above). CPU-only could take days.
- **Levantine Arabic**
  - `mohammedaly22/leva-tts` or `lahgtna-chatterbox-v1`.
  - Check each license and quality by listening tests.
  - Same compute profile as the Egyptian model.
  - Piper `ar_JO-kareem` runs fast on CPU. My unverified estimate for 10 h is well under an hour. It is likely MSA-ish read speech, and its dialect authenticity is not verified.
- **Pre-generation beats on-device TTS on every axis here:**
  - quality, because you can use 0.9B GPU models;
  - correctness, because a native speaker can review the files;
  - app size, because Opus at about 24 kbps is roughly 10 MB/hour;
  - battery and low-end-phone performance.
- On-device TTS is only worth it for user-typed text, which an Assimil-style course doesn't need.
- **Dialect TTS is a high-risk area.** All dialect models above are new community fine-tunes with few downloads. Plan for native review of every generated line, with re-generation or human re-recording on failure.

### Gaps
- I did not verify that sherpa-onnx has ready-made Kannada, Levantine or Egyptian TTS exports. The TTS catalog page did not render language detail.
- I did not verify the recording source or dialect of `ar_JO-kareem`, or the exact license and quality of `mohammedaly22/leva-tts` (its card wasn't read).
- I found no published Indic Parler-TTS or Piper speed benchmarks (the speed search did not return them). The Windows generation times above are estimates.
- I did not check the exact terms of the XTTS-v2 CPML license text.

---

## 2. Offline ASR & pronunciation feedback

### Takeaway
ASR is feasible on a phone for Kannada (Whisper-tiny or IndicConformer ONNX via sherpa-onnx) and for Arabic (Vosk MGB-2, 318 MB, though MSA-oriented). Swiss German ASR effectively outputs **Standard German text**, so it can't verify dialect wording. The realistic MVP is "record and compare": the learner records, then plays back side by side with the native audio (shadowing). An optional rough score could come from a language-agnostic phoneme recognizer (wav2vec2-xlsr-espeak) aligned against the expected phoneme string. Treat any score as indicative only.

### Cited Findings
**Swiss German**
- **Flix-AI/flix-swissgerman-full** (Apache-2.0, updated 2026-06-12) is a full Whisper large-v3 fine-tune that "transcribes Swiss German dialect speech into grammatically correct Standard German text." Its paper reports an "honest baseline" of **25.6% WER (13.8% cWER)** on 1,367 h of subtitle-aligned data and discusses benchmark contamination. — [HF](https://huggingface.co/Flix-AI/flix-swissgerman-full), [arXiv 2606.07608](https://arxiv.org/html/2606.07608v1)
- `nizarmichaud/whisper-large-v3-turbo-swissgerman` is MIT, lang tag de, last updated 2025-03. — [HF](https://huggingface.co/nizarmichaud/whisper-large-v3-turbo-swissgerman)
- `jayr23/whisper-large-v3-turbo-swiss-german-ct2` is an Apache-2.0 CTranslate2 build (faster-whisper format) with a 2026-03-20 checkpoint. It outputs Standard German. — [HF](https://huggingface.co/jayr23/whisper-large-v3-turbo-swiss-german-ct2)
- A 2026 ZHAW thesis found that the fine-tuned Whisper "still produces transcripts that are too close to the Standard German reference rather than fully capturing dialect." — [ZHAW BA26 PDF](https://www.zhaw.ch/storage/engineering/institute-zentren/cai/studentische_arbeiten/Spring_2026/BA26_ciel_Mettler_Dialektanalyse.pdf)
- A secondary summary says Whisper is usable for Swiss German "so long as the Standard German output is desired." — [eurokommerz summary](https://eurokommerz.at/blog/german-speech-recognition-accuracy-dialects/), original study: [VarDial 2024](https://aclanthology.org/2024.vardial-1.3/)

**Kannada**
- **AI4Bharat IndicConformer kn** (`indicconformer_stt_kn_hybrid_*_rnnt_large`) is MIT and gated. It is a 120M-param Conformer-L (hybrid CTC/RNNT), shipped as a .nemo file of about 523 MB. — [HF](https://huggingface.co/ai4bharat/indicconformer_stt_kn_hybrid_rnnt_large), [GitHub](https://github.com/AI4Bharat/IndicConformerASR)
- Community sherpa-onnx ports:
  - `parismitaglobalsolutions/indicconformer-sherpa-onnx` is Apache-2.0 and includes a commit "Add Kannada model (int8, CTC-masked, sherpa-onnx compatible)", updated 2026-09-22.
  - `ippocode/indic-asr-onnx` has a Kannada **Whisper-tiny INT8** in sherpa-onnx format with an Android Kotlin example.
  - `nmukthap/vertexvoice-indic` notes that an upstream int8 ONNX failed on CPU ORT and was re-quantized.
  - — [parismita commit](https://huggingface.co/parismitaglobalsolutions/indicconformer-sherpa-onnx/commit/9c6cad1a1e5c13c7928e12c72e250e4bb1a1efc8), [ippocode](https://huggingface.co/ippocode/indic-asr-onnx), [vertexvoice](https://huggingface.co/nmukthap/vertexvoice-indic), [OpenVoiceOS exports](https://huggingface.co/OpenVoiceOS/ai4bharat-indicconformer-hi-onnx)
- UDGAM Labs Shruti-ONNX (about 32 MB per language) flags that its Kannada model "failed our written test." — [HF](https://huggingface.co/udgamlabs/Shruti-ONNX)
- **Vosk has no Kannada model.** — [Vosk models](https://alphacephei.com/vosk/models)

**Arabic**
- Vosk models:
  - `vosk-model-ar-mgb2-0.4`: 318 MB, Apache-2.0, 16.4% WER on MGB-2.
  - `vosk-model-ar-0.22-linto-1.1.0`: 1.3 GB, AGPL.
  - Tunisian-dialect models: 158 MB / 517 MB, Apache-2.0.
  - German: `vosk-model-small-de-0.15` is 45 MB, Apache-2.0.
  - — [Vosk models](https://alphacephei.com/vosk/models)
- **Meta Omnilingual ASR** (repo pushed 2025-12-30; e.g. `omniASR-CTC-300M` is Apache-2.0) covers 1,600+ languages, including **apc_Arab (Levantine), arz_Arab (Egyptian), kan_Knda (Kannada)**. I did not confirm Swiss German (gsw) — check `lang_ids.py`. — [arXiv 2511.09690](https://arxiv.org/html/2511.09690v1), [GitHub](https://github.com/facebookresearch/omnilingual-asr), [HF CTC-300M](https://huggingface.co/facebook/omniASR-CTC-300M), [supported languages](https://mintlify.com/facebookresearch/omnilingual-asr/supported-languages)
- `facebook/mms-1b-all` ASR is CC-BY-NC-4.0. — [HF](https://huggingface.co/facebook/mms-1b-all)

**Runtimes**
- whisper.cpp: MIT, 55k stars, active. — [GitHub](https://github.com/ggml-org/whisper.cpp)
- faster-whisper: MIT. — [GitHub](https://github.com/SYSTRAN/faster-whisper)
- moonshine: low-latency on-device STT, 11.6k stars, license NOASSERTION. — [GitHub](https://github.com/moonshine-ai/moonshine)
- silero-vad: MIT. — [GitHub](https://github.com/snakers4/silero-vad)

**Pronunciation scoring**
- `facebook/wav2vec2-xlsr-53-espeak-cv-ft` is an Apache-2.0 multilingual phoneme recognizer with about 750k downloads/month. — [HF](https://huggingface.co/facebook/wav2vec2-xlsr-53-espeak-cv-ft)
- **OpenPronounce** is AGPL-3.0, 242 stars, active 2026-11-19, Python and self-hosted. It does phoneme-level scoring (accuracy, fluency, prosody), lists mispronounced words, supports `--lang`, and has a "reliable" flag. — [GitHub](https://github.com/OpenPronounce/OpenPronounce)
- Allosaurus is a universal phone recognizer for 2,000+ languages, GPL-3.0, last push 2024-04. — [GitHub](https://github.com/xinjli/allosaurus)
- GOP (Goodness of Pronunciation) is "the earliest and most successful phoneme-level" method. wav2vec2-based phonological-feature MDD is the current research direction. — [Shahin 2025 (ar5iv)](https://ar5iv.labs.arxiv.org/html/2311.07037), [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0167639325000640)
- An Aalto mobile Finnish pronunciation app using wav2vec2 detected mispronunciation at the phoneme level only about **60% recall**, a realistic ceiling indicator. — [Aalto thesis](https://aaltodoc.aalto.fi/bitstreams/6f8cd8cb-70f4-4715-a864-3bc622d6327d/download)
- Shadowing tool: `Dthurow/SpeechShadowing` (MIT, Python, 2020). — [GitHub](https://github.com/Dthurow/SpeechShadowing)

### Inferences
- **Phone feasibility**
  - Kannada Whisper-tiny int8 or IndicConformer int8 via sherpa-onnx: yes, tens of MB to about 150 MB.
  - Arabic Vosk MGB-2 (318 MB): yes, but it is MSA/broadcast-trained and will mis-transcribe dialect.
  - Swiss German Whisper large-v3-turbo (~800M params): too heavy for real-time on most phones, and it outputs Standard German anyway.
- **Recommended speaking feedback tiers**
  1. **Record and playback A/B with the native audio.** Zero ML, works for all three languages. This is the core Assimil "shadowing" loop.
  2. An optional **phoneme-similarity score**: the wav2vec2-xlsr-espeak (~300M; quantized ONNX roughly 300–400 MB, my estimate) recognizes phones in both the native reference clip and the learner clip, then an edit distance is computed.
     - Comparing learner against reference audio, instead of against text, sidesteps the missing dialect G2P for Swiss German and dialect Arabic.
     - This is more robust than ASR-WER for dialects. It should run on a mid-range phone in a few seconds per sentence, though that is unverified.
  3. For Kannada, ASR-based "did you say the right words" checks via IndicConformer are workable.
- The OpenPronounce codebase (AGPL) is a good reference design. AGPL is fine for a personal non-commercial app.

### Gaps
- No benchmark numbers for on-phone latency of the xlsr-espeak model.
- No Swiss German ASR that outputs dialect orthography was found.
- I did not verify Omnilingual ASR's dialect WER or its mobile export path.

---

## 3. Datasets / corpora for vocab and sentences

### Takeaway
Usable free sentence and vocabulary sources exist. Most dialect corpora are research-only, which is OK for personal use (flag it). `hermitdave/FrequencyWords` covers ar and de but **not kn**. Swiss German frequency data must come from Swiss German Wikipedia, SwissCrawl or STT4SG transcripts (all research-licensed).

### Cited Findings
- **FrequencyWords** (MIT code, OpenSubtitles 2018) covers 62 languages including **ar, de, hi, ml, ta, te**, but **no kn and no gsw**. Last push 2022-02. — [repo](https://github.com/hermitdave/FrequencyWords), [2018 content dir](https://github.com/hermitdave/FrequencyWords/tree/master/content/2018)
- **STT4SG-350** is about 343 h from 316 speakers across all dialect regions. ZHAW says it is "available for research and commercial purposes." A 2025 paper says SDS-200 and STT4SG-350 are under the "SwissNLP license." — [ZHAW news](https://www.zhaw.ch/en/about-us/news/news-releases/news-detail/event-news/new-swiss-german-speech-to-text-corpus-launched-at-acl-2023/), [ACL 2023](https://aclanthology.org/2023.acl-short.150), [arXiv 2506.07726](https://arxiv.org/html/2506.07726v2)
- **SDS-200** is about 200 h from about 4,000 speakers, with Standard German translations. Repo: github.com/stt4sg/dialektsammlung-public. — [arXiv 2205.09501](https://arxiv.org/pdf/2205.09501.pdf)
- **SwissDial** is "exclusively for research purposes." — [arXiv 2506.07726](https://arxiv.org/html/2506.07726v2)
- **MADAR parallel corpus** covers 25 city dialects including Damascus, Aleppo, Beirut, Amman, Jerusalem and Cairo, in the travel domain (ideal for Assimil-style phrases).
  - It has a **research-only license** (CMU / NYUAD 2019): internal research and evaluation only, no modification rights.
  - The English side must come from the USTAR consortium.
  - MADAR CODA corpus: 10k sentences across 5 cities, including Beirut and Cairo.
  - — [MADAR download](https://camel.abudhabi.nyu.edu/madar-parallel-corpus), [CODA](https://camel.abudhabi.nyu.edu/madar-coda-corpus/), [LREC 2018](https://camel.abudhabi.nyu.edu/madar/static/pdfs/2018-LREC-MADAR-Resources.pdf)
- **Shami corpus**: about 21k Palestinian sentences, monolingual. I found no license page. Maknuune is an open Palestinian Arabic lexicon. — [survey arXiv 2009.12622](https://arxiv.org/pdf/2009.12622), [Maknuune arXiv 2210.12985](https://arxiv.org/pdf/2210.12985)
- **CAMeL Tools** (MIT, active 2026-10) provides Arabic morphology, dialect ID and transliteration. — [GitHub](https://github.com/CAMeL-Lab/camel_tools)
- **IndicTrans2** (MIT) translates between English and 22 Indic languages including Kannada, which is useful at build time for drafting translations. — [GitHub](https://github.com/AI4Bharat/IndicTrans2)
- The Dakshina dataset contains native and Latin script text for 12 South Asian languages (useful for romanization). — [GitHub](https://github.com/google-research-datasets/dakshina)
- Tatoeba platform code is AGPL-3.0 and active 2026-10. — [GitHub](https://github.com/Tatoeba/tatoeba2)
- Lingtrain Alignment Studio aligns parallel texts (useful to build bilingual lesson pairs). — [a-studio](https://github.com/averkij/a-studio)

### Inferences
- For personal non-commercial use, MADAR (Cairo + one Levantine city) is the single most useful Arabic source for dialogue-style sentences. STT4SG-350 / SDS-200 transcripts paired with audio are the most useful Swiss German source.
- For Kannada frequency lists, derive them from IndicCorp or Kannada Wikipedia yourself, since FrequencyWords lacks kn.
- None of the Swiss German or Arabic dialect corpora should be redistributed inside a public app.

### Gaps
- I did not verify current licenses or access for IndicCorp v2, Samanantar, Kathbath, the IndicTTS dataset, NOAH, SwissCrawl, ArzEn or QASR (not fetched in this session).
- I did not verify per-language Tatoeba sentence counts for gsw, kn, arz or apc, or the Tatoeba data license.
- I did not confirm the FrequencyWords *data* license (only the repo's MIT label).

---

## 4. Open-source apps to learn from / FORK CANDIDATES

### Takeaway
**No maintained open-source "Assimil player" exists.** GitHub searches for "assimil" return only unrelated data-assimilation repos. The nearest pieces are a reader (Lute v3), an SRS engine (FSRS libs, Anki), a sentence-media player (asbplayer) and small shadowing/loop tools. Verdict: **build a small custom player app** (it's a simple UI: lesson list, per-sentence rows, play/slow/loop, record) and **reuse libraries**, not a whole app.

### Cited Findings: Fork candidates
Stars and dates via the GitHub API, 2026-11-21.

| Repo | Stars | Last push | License | Stack | Verdict |
|---|---|---|---|---|---|
| [LuteOrg/lute-v3](https://github.com/LuteOrg/lute-v3) | 1,622 | 2026-09-05 | MIT | Python/Flask web | Reuse ideas (term status, reading view). Server-based desktop app, no per-sentence audio course. **Don't fork for mobile.** |
| [kantord/LibreLingo](https://github.com/kantord/LibreLingo) | 2,631 | 2026-06-19 | AGPL-3.0 | Python + Svelte | **Archived.** YAML course format worth studying. Duolingo-style, not Assimil. Don't fork. |
| [LibreLingoCommunity/LibreLingo](https://github.com/LibreLingoCommunity/LibreLingo) | 20 | 2025-09-05 | AGPL-3.0 | — | Archived community fork. Skip. |
| [ankidroid/Anki-Android](https://github.com/ankidroid/Anki-Android) | 12,301 | 2026-11-21 | GPL-3.0 | Kotlin | Zero-code alternative: ship lessons as **Anki decks with audio** (free on Android/desktop). Too heavy to fork. |
| [ankitects/anki](https://github.com/ankitects/anki) | 32,951 | 2026-11-20 | AGPL-3.0 (API reports NOASSERTION) | Rust/Python/TS | Same as above. Desktop Anki is free. |
| [asbplayer/asbplayer](https://github.com/asbplayer/asbplayer) | 1,533 | 2026-11-21 | AGPL-3.0 | TypeScript | Browser media + subtitle sentence player. Good UX reference for sentence-by-sentence playback. Fork only if going web. |
| [GabrielDrapor/ovid](https://github.com/GabrielDrapor/ovid) | 66 | 2026-11-09 | MIT | TypeScript | Bilingual reader ("two languages, one tap"). Closest to the Assimil two-column UI; small, permissive. **Candidate to fork/borrow for a PWA.** No audio verified. |
| [AsakiriLingo/asakiri-studio](https://github.com/AsakiriLingo/asakiri-studio) | 29 | 2026-08-25 | MPL-2.0 | TypeScript | Structured courses with rich media. Inspect, but small and likely server-oriented. |
| [hysysk/Audio-Loop-Player](https://github.com/hysysk/Audio-Loop-Player) | 1 | 2026-03-22 | MIT | Rust | A-B loop reference only. |
| [nishimotoy/looplingua-android](https://github.com/nishimotoy/looplingua-android) | 0 | 2026-10-07 | none | Kotlin | Listening-loop player. No license, so it cannot legally be forked. |
| [JayXT/PerfectSentenceShadowing](https://github.com/JayXT/PerfectSentenceShadowing) | 3 | 2026-07-24 | GPL-3.0 | Lua (mpv) | Shadowing workflow idea. Desktop-only. |
| [Dthurow/SpeechShadowing](https://github.com/Dthurow/SpeechShadowing) | 16 | 2020-06-25 | MIT | Python | Record/compare shadowing reference. Stale. |
| [FreeLanguageTools/vocabsieve](https://github.com/FreeLanguageTools/vocabsieve) | 551 | 2025-08-15 | GPL-3.0 | Python | Sentence-mining tool for build-time vocab extraction. Not a player. |
| [OpenPronounce/OpenPronounce](https://github.com/OpenPronounce/OpenPronounce) | 242 | 2026-11-19 | AGPL-3.0 | Python | Reuse the pronunciation-scoring logic (port to ONNX). |
| [averkij/a-studio](https://github.com/averkij/a-studio) (Lingtrain) | 296 | 2026-01-04 | NOASSERTION | HTML/Python | Build-time parallel-text alignment. |

**FSRS libraries per stack** (all from the open-spaced-repetition org):

| Lib | Stars | Last push | License | Notes |
|---|---|---|---|---|
| [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | 886 | 2026-11-19 | MIT | ESM/CJS. Best for PWA or React Native. |
| [fsrs-rs](https://github.com/open-spaced-repetition/fsrs-rs) | 463 | 2026-11-21 | BSD-3 | Scheduler plus optimizer (what Anki uses). Usable from Flutter via a Rust bridge. |
| [dart-fsrs](https://github.com/open-spaced-repetition/dart-fsrs) | 68 | **2025-06-20** | MIT | Flutter. Less active but small enough to vendor. |
| [py-fsrs](https://github.com/open-spaced-repetition/py-fsrs) | 532 | 2026-11-13 | MIT | Build-time scripts. |
| [swift-fsrs](https://github.com/open-spaced-repetition/swift-fsrs) | 108 | 2026-11-12 | MIT | Native iOS. |
| [fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) | 4,142 | 2026-08-14 | MIT | Anki scheduler / reference. |

### Inferences
- **Verdict: build, don't fork.** An Assimil player is about 5 screens. Forking a large app (Anki, Lute, LibreLingo) costs more than it saves, and AGPL/GPL obligations come with it (fine for personal use).
- Borrow:
  - ovid's bilingual layout (MIT);
  - asbplayer's sentence-playback UX;
  - ts-fsrs or dart-fsrs for review scheduling;
  - OpenPronounce's scoring approach.
- **Zero-code fallback for the MVP:** generate an Anki deck (.apkg) per lesson with sentence audio, fields for the target line, translation and transliteration, and use free AnkiDroid or desktop Anki. This loses the continuous-dialogue Assimil feel but costs zero engineering.

### Gaps
- I didn't find "assimil-player" or "Language Transfer"-clone repos. Searches returned nothing relevant, which is itself signal that none exist.
- GitHub search for "flutter language learning offline" hit the unauthenticated rate limit (403), so that query is unexplored.

---

## 5. Recommended tech stack (offline-first, zero cost)

### Takeaway
Two recommendations, depending on the platform:
- **Recommended default: a PWA** (Vite + React/Svelte + ts-fsrs + IndexedDB/OPFS for audio packs). It costs zero, installs on Android, iOS and Windows without app stores, and needs no on-device ML when audio is pre-generated.
- **Choose Flutter instead** if you want on-device ASR or pronunciation scoring via sherpa-onnx, or robust large offline storage on Android. Deliver it as a sideloaded APK plus a Windows desktop build.

React Native offers no advantage here.

### Cited Findings
**Flutter libraries**
- **drift** (SQLite ORM): MIT, 3.3k stars, active 2026-11-20. — [GitHub](https://github.com/simolus3/drift)
- **isar**: Apache-2.0, 4k stars, but last push **2025-06-14** (stagnating). — [GitHub](https://github.com/isar/isar)
- **just_audio**: 1.2k stars, pushed 2026-06-29. The API shows no SPDX license. **audio_service** (background playback) was pushed 2026-07-01. — [just_audio](https://github.com/ryanheise/just_audio), [audio_service](https://github.com/ryanheise/audio_service)

**Speech runtime**
- **sherpa-onnx** (Apache-2.0) is the on-device STT/TTS/VAD runtime with Android/iOS/desktop support. — [GitHub](https://github.com/k2-fsa/sherpa-onnx)

**Alignment tools for karaoke highlighting** (build-time)
- **aeneas**: AGPL-3.0, pushed 2026-11-16. Text-to-audio sync via TTS + DTW, works for any language with an espeak voice. — [GitHub](https://github.com/readbeyond/aeneas)
- **whisperX**: BSD-2, 25.6k stars. Word-level timestamps via wav2vec2 alignment. Alignment models are per-language. — [GitHub](https://github.com/m-bain/whisperX)
- **Montreal Forced Aligner**: MIT, active 2026-11-16. Kaldi-based, needs a pronunciation dictionary or G2P. — [GitHub](https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner)
- **silero-vad** (MIT) for sentence splitting. — [GitHub](https://github.com/snakers4/silero-vad)

### Inferences
- **Sentence-level timing is enough for Assimil.** Generate each sentence as its own audio file at build time, so timestamps are known by construction and you need no forced alignment. Use whisperX or aeneas only for word-level karaoke or for human-recorded long takes (e.g., Swiss German recordings).
- **Audio packs:** Opus at 24–32 kbps mono, one file per sentence plus a per-lesson concatenation. A JSON lesson manifest holds: id, target text, transliteration, English, audio path, and normal/slow variants. Pre-render the slow variant with a time-stretch (e.g., ffmpeg `atempo`) instead of runtime pitch-preserving slowdown. `audio.playbackRate` in browsers and `setSpeed` in just_audio also work at runtime.
- **Fonts:** Noto Sans Kannada and Noto Naskh Arabic, bundled locally (OFL, free).
  - Set `dir="rtl"` per Arabic line, not per page.
  - Kannada shaping works in all modern browsers and Flutter (HarfBuzz).
  - Offer a Latin transliteration toggle: Arabizi for Arabic, ISO 15919 for Kannada.
- **Zero-cost hosting:** serve the PWA from GitHub Pages or Cloudflare Pages free tier, or entirely locally. Language packs can be GitHub Releases assets (2 GB per file limit).
- **iOS caveats:**
  - A free Apple ID sideload of a native app expires every 7 days. This is from general knowledge, not verified this session.
  - iOS Safari can evict PWA storage. Request persistent storage via `navigator.storage.persist()` and keep the "download pack again" path cheap.
  - This is the main reason to prefer PWA for iOS and Flutter APK for Android if both are needed.

### Gaps
- I did not verify sherpa-onnx WASM/browser support for running ASR inside a PWA in 2026, or iOS PWA storage quotas in 2026.
- I did not verify the just_audio license (unlisted in the API; it was MIT historically, from my knowledge).

---

## 6. LLM at build time vs on-device

### Takeaway
Use an LLM **at build time only** to draft dialogues, glosses and transliterations, then have a **native speaker review** every line before audio generation. On-device LLMs add size and error risk with no benefit for a fixed course. Under the zero-cost constraint, use Claude via the free claude.ai chat or an existing subscription, not the paid API, or a local open model. Swiss German and dialect Arabic outputs need the heaviest review.

### Cited Findings
- Swiss German has no standard orthography, and even fine-tuned ASR drifts toward Standard German. This indicates how little dialect-written text models have seen. — [ZHAW BA26](https://www.zhaw.ch/storage/engineering/institute-zentren/cai/studentische_arbeiten/Spring_2026/BA26_ciel_Mettler_Dialektanalyse.pdf), [voivision blog](https://voivision.cn/en/blog/german-dialect-asr)
- The ZHAW Swiss German TTS work had to use Standard German text as input precisely because dialect text is non-standardized. — [arXiv 2505.22054](https://arxiv.org/html/2505.22054v1)
- Some Arabic TTS (Spark-TTS ClArTTS) require diacritized MSA input, while the dialect TTS models (NAMAA) take plain dialect text. So the LLM output format must match the chosen TTS. — [Spark-TTS-Arabic](https://huggingface.co/azeddinShr/Spark-TTS-Arabic-Complete), [NAMAA](https://huggingface.co/NAMAA-Space/NAMAA-Egyptian-TTS)
- IndicTrans2 (MIT) is a free local alternative for English-to-Kannada drafts. — [GitHub](https://github.com/AI4Bharat/IndicTrans2)

### Inferences
- **Expected LLM failure modes:**
  - Swiss German: Standard German words and grammar leaking in, and inconsistent Zürich/Bern/Basel spellings. Pick one dialect (e.g., Zürich) and a spelling convention such as Dieth.
  - Kannada: formal or literary register instead of spoken Bengaluru Kannada, plus errors in verb forms.
  - Arabic: MSA intrusions and mixed Egyptian/Levantine forms. Pin one variety per course.
- **Workflow:**
  1. LLM drafts dialogue JSON.
  2. Automatic checks: a dialect-ID pass via CAMeL Tools for Arabic, and a script/character check for Kannada.
  3. Native-speaker review in a spreadsheet.
  4. TTS generation.
  5. Native listen-through, flagging bad clips for regeneration or human re-recording.
- Paid Claude API usage would violate the zero-cost constraint. Copy-paste batches through the free chat UI, or run a local model (e.g., via Ollama), at quality cost for dialects.

### Gaps
- No quantitative benchmark was found for LLM accuracy in written Swiss German, colloquial Kannada or Levantine/Egyptian dialect generation.
- Whether the user's Claude access tier is free is not established.
