# Quran listening app: free data sources (researched 2026-11-21)

Goal: static GitHub Pages site (public repo, personal, non-commercial, offline-capable). Each ayah shows Arabic (Uthmani), English, and a play button, with word-by-word karaoke highlighting synced to a real reciter, and tap-a-word for root, lemma, grammar and gloss.

Legend: **[V]** = checked directly in this session (page fetch, API call or file download). **[S]** = secondary source or inference; check it before relying on it.

---

## 1. Quran text

### Tanzil.net (recommended base text) [V]
- Download page: https://tanzil.net/download/ . Pick "Uthmani" (or "Simple Clean" for search) and the format (txt with `sura|aya|text`, XML or SQL).
- Licence page: https://tanzil.net/docs/text_license . It says "Copyright (C) 2007-2021 Tanzil Project", under **Creative Commons Attribution 3.0**, plus Tanzil's own terms:
  - Verbatim copying and distribution are allowed. **"CHANGING IT IS NOT ALLOWED."** So the base is CC BY 3.0, but the extra clause works like ND. Don't edit the letters; reformatting into JSON is fine as long as the text stays verbatim.
  - The copyright notice must be kept in all verbatim copies.
  - Use in websites and apps is allowed if Tanzil is clearly credited as the source **and the site links to tanzil.net** so users can track updates (http://tanzil.net/updates/).
- Why this text: the quran-align word timings define a "word" by splitting Tanzil `quran-uthmani.txt` on spaces, so this text matches the timing indices exactly.

### Quran.com / QUL [V]
- QUL (Quranic Universal Library, https://qul.tarteel.ai, code MIT at github.com/TarteelAI/quranic-universal-library, very active, 1.1k stars) offers scripts (Uthmani, IndoPak, QPC) per word and per ayah as JSON or SQLite. Downloads need a free login. QUL says resources are "intended for you to download and package with your own project; no API is available".
- QUL lists no data licence on its resource pages. The footer only links tarteel.ai/terms (no relevant text found). The credits page (https://qul.tarteel.ai/credits) names the upstream sources: Tanzil (text), Kais Dukes / Mustafa Jibaly (morphology), QuranWBW.com (wbw translations), EveryAyah and QuranicAudio (audio), Collin Fair (word timestamps). It asks users to acknowledge contributors. **So the upstream licences are the ones that apply.**
- Quran.com API v4 (public, no key needed as of today):
  - `https://api.quran.com/api/v4/verses/by_key/1:2?words=true&word_fields=text_uthmani,location&translations=20`
  - Each word comes with `text_uthmani`, `location` ("1:2:1"), `translation.text` (English gloss, e.g. "All praises and thanks"), `transliteration.text`, and `audio_url` ("wbw/001_002_001.mp3", a single-word audio clip).
  - Quran Foundation is moving clients to an authenticated API (api.quran.foundation) **[S]**. Use the API only for a one-time build-time export, never at runtime.

## 2. Word-by-word glosses and morphology

### Quranic Arabic Corpus v0.4 (Kais Dukes) [V]
- https://corpus.quran.com/download/ . Free, but you must give an email to download. The file is `quranic-corpus-morphology-0.4.txt`, plain TSV with Buckwalter transliteration, one row per morphological segment (`LOCATION FORM TAG FEATURES`, with features such as `STEM|POS:N|LEM:...|ROOT:...|M|GEN`).
- Licence: **GNU GPL**. The file header also says verbatim copying is allowed but changing it is not. You must keep the copyright notice, state the source ("Quranic Arabic Corpus") clearly, and link to corpus.quran.com.
- The per-word English glosses on corpus.quran.com (wordbyword.jsp) are **not** in the download.

### mustafa0x/quran-morphology (recommended for root and lemma) [V]
- https://github.com/mustafa0x/quran-morphology , last pushed 2022-04-18, 69 stars. It has no SPDX licence, but as a fork of the corpus it carries GPL.
- `quran-morphology.txt` (6.3 MB, 130,030 lines). It is already in Arabic script, with many root and lemma fixes and singularized lemmas. Sample line: `1:1:1:2	سْمِ	N	ROOT:سمو|LEM:اسْم|M|GEN`. `morphology-terms.json` explains the tags in Arabic.
- Raw URL: https://raw.githubusercontent.com/mustafa0x/quran-morphology/master/quran-morphology.txt
- Location `s:a:w:segment` lines up with Tanzil/Quran.com word positions.

### English per-word gloss [V]/[S]
- Best practical source: the Quran.com API v4 `words[].translation.text` (above), or the QUL "word-by-word English" export. These glosses come from QuranWBW.com (per the QUL credits).
- **Licence status unclear.** No explicit licence was found for the wbw English glosses. For a non-commercial personal project the risk is low, but credit "Word-by-word English: Quran.com / QuranWBW.com via QUL". An alternative is to write your own glosses per lemma (about 4.7k lemmas) from public-domain dictionaries (Lane's Lexicon).

**Best combination for root + lemma + gloss per word:** take root, lemma, POS and features from mustafa0x quran-morphology (GPL), take the gloss from Quran.com/QUL wbw English, and join the two on `surah:ayah:word`.

## 3. Audio with word-level timestamps

### Word timings: quran-align (Collin Fair) [V]
- https://github.com/cpfair/quran-align (MIT code). The data is in the Releases tab: `quran-align-data-2016-11-24.zip` (5.8 MB, published 2016-11-24).
- **Data licence: CC BY 4.0** (attribution; the author asks for an email if you use it). This is the original source of the word timestamps in Quran.com/QUL, per the QUL credits.
- Format: JSON `[{surah, ayah, segments: [[word_start_idx, word_end_idx_exclusive, start_ms, end_ms], ...]}]`. Words are counted by splitting Tanzil `quran-uthmani.txt` on spaces. The timings are relative to **EveryAyah per-ayah MP3s**. Reported accuracy is about 73 ms mean deviation, with 98.5–99.9% of words segmented.

### Quran.com API v4 segments (easiest to fetch) [V]
- `https://api.quran.com/api/v4/recitations/{id}/by_chapter/{surah}?fields=segments&per_page=300`, or `/by_ayah/2:255?fields=segments`.
- Response: `{"verse_key":"1:1","segments":[[0,1,60,610],[1,2,620,1310],...],"url":"Alafasy/mp3/001001.mp3"}`. Each segment is [word index 0-based, word position 1-based (end-exclusive), start ms, end ms], the same as quran-align.
- Audio host: relative URL on `https://verses.quran.com/` **[S]**, i.e. EveryAyah-style per-ayah files.
- Recitation IDs (`/resources/recitations`): 1 AbdulBaset Mujawwad, 2 AbdulBaset Murattal, 3 Sudais, 4 Shatri, 5 Rifai, 6 Husary, **7 Mishari Alafasy**, 8 Minshawi Mujawwad, **9 Minshawi Murattal**, 10 Shuraym, 11 Tablawi, **12 Husary Muallim**.
- **Word segments were confirmed for IDs 2, 6, 7, 9 and 12** (spot-checked 2:255). Husary Muallim (12) has long gaps between phrases, because it is a teaching recitation with pauses, but it is still word-aligned.

### QUL recitation resources [V]
- https://qul.tarteel.ai/resources/recitation lists about 100 recitations, JSON or SQLite. Only Mishari al-Afasy "Surah by Surah" (gapless, resource 411) is tagged **"Word segments"**. It is useful if you want one MP3 per surah instead of per ayah (recent changelog: "Fixed the segments for surah 39"). Many others are tagged only "With segments", which means ayah-level.

### Audio files: EveryAyah.com [V]
- Per-ayah MP3s named `SSSAAA.mp3`, e.g. https://everyayah.com/data/Alafasy_64kbps/001001.mp3 . There is also one full ZIP per reciter (`000_versebyverse.zip`, last modified Jan 2023).

  | Folder | ZIP size |
  |---|---|
  | Alafasy_64kbps | 865 MB |
  | Alafasy_128kbps | 1.71 GB |
  | Husary_64kbps | 1.23 GB |
  | Husary_Muallim_128kbps | 2.75 GB |
  | Minshawy_Murattal_128kbps | 1.67 GB |

- Whole-Quran duration: Alafasy about 30 h, Husary about 43 h, Husary Muallim about 48 h. These are derived from the sizes above.
- **No terms of use or copyright statement** appears on everyayah.com pages. The recordings are distributed freely and are widely mirrored (Quran.com, QUL, many apps). Rights belong to the reciters/producers and are unclear. For a personal, non-commercial site, the common practice is free redistribution with attribution, but this is **not a formal licence**.
- mp3quran.net: not checked (out of budget). It provides only surah-level MP3s, and its timings are ayah-level at best.

### Size budget for GitHub Pages
- Limits (GitHub docs, from memory, not checked this session): published site ≤ 1 GB, repo recommended ≤ 1–5 GB, single file < 100 MB, soft bandwidth 100 GB/month.
- Re-encoded to **32 kbps mono MP3** (or 24–32 kbps Opus), Alafasy is about 430 MB for the whole Quran, about 14 MB per juz. At 64 kbps it is about 29 MB per juz (865 MB total).
- Recommendation: one reciter (Alafasy or Minshawi Murattal), re-encoded at 32–40 kbps mono. Start with juz 30 plus selected surahs. Or keep the MP3s off-repo and load them from everyayah or verses.quran.com, then cache them for offline use with a Service Worker.
- **Do not** re-encode with silence trimming, because that shifts the timestamps. A plain bitrate change keeps the timing (MP3 encoder delay is about 25–50 ms, which is negligible).

## 4. English translations

| Translation | Status | Usable? |
|---|---|---|
| Saheeh International (1997) | © Abul-Qasim Publishing House, "all rights reserved", written permission needed [V via search] | Risky. Widely used by Quran.com/Tanzil with permission, not under an open licence. |
| Abdel Haleem (OUP 2004) | © Oxford University Press | No |
| The Clear Quran (Mustafa Khattab, 2015/2019) | © Al-Furqaan Foundation, exclusive licence; reproduction needs written consent. Only a limited educational carve-out (≤10%) for 501(c)(3) organizations [V via search] | No (unless permission is obtained) |
| **Pickthall (1930)** | Author died 1936, so public domain in life+50 and life+70 countries. **US: 1930 works entered US public domain on 2026-01-01** (95-year term) | **Yes. Recommended.** |
| Yusuf Ali (1934 original) | Author died 1953, so public domain in life+70 countries (EU/UK) since 2024 and in Pakistan. US public domain from 2030 [S: sacred-texts] | Yes outside the US. Use the **original 1934 text**; the "revised" 1989 Amana/IIIT editions are copyrighted. |
| Tanzil translations page | https://tanzil.net/trans/ : "for non-commercial purposes only"; for other uses get permission from the translator or publisher; "Redistributing the following list in another website is not allowed" without Tanzil's permission; link back if you use more than 3 translations [V] | Use Tanzil only as the download source for Pickthall or Yusuf Ali, and credit it. |

The Pickthall public-domain text is also available at Project Gutenberg (#16955, https://www.gutenberg.org/ebooks/16955), with the archaic numbering verified by Tanzil.

## 5. Word frequency and coverage (computed here from mustafa0x quran-morphology.txt) [V]

Script: `scratchpad/stats.py`. Method: group segments by `s:a:w`, and take the lemma and root of the first non-PREF/SUFF segment (the stem).

- **Words (tokens): 77,429.** This matches published figures (77,429–77,430 depending on counting).
- Morphological segments: 130,030.
- **Unique surface word forms: 18,993** (QuranMorph 2025 paper: 19,009).
- **Lemmas (stem): 4,763** in the mustafa0x fork. corpus.quran.com's own lemma index lists **3,680** [V via search]; the counts differ because of lemma splitting and fixes. Lemmas occurring only once: see the script.
- **Roots: 1,651** (commonly cited as about 1,642–1,685). 50,268 tokens (65%) have a root. The rest are particles, pronouns and similar words without a root.

Coverage of the 77,429 tokens by the top-N items:

| Top N | Lemmas | Roots | Surface forms |
|---|---|---|---|
| 10 | 24.6% | 14.2% | 9.5% |
| 50 | 45.9% | 30.0% | 22.8% |
| 100 | **55.4%** | 39.5% | 30.2% |
| 200 | 64.9% | 49.3% | 38.2% |
| 300 | **70.7%** | 54.2% | 43.4% |
| 500 | **77.6%** | 59.6% | 49.8% |
| 1000 | **85.3%** | 63.7% (max 64.9%) | 58.6% |
| 2000 | 91.0% | 64.9% | 67.4% |

The root column is out of all tokens, so it tops out at 64.9%. Among rooted tokens only, the top 300 roots cover about 83%.

The often-quoted "learn 300 words and understand 70% of the Quran" (Abdulazeez Abdulraheem) roughly matches top-300 lemma coverage (70.7%) when particles and pronouns are counted.

## 6. Open-source apps to learn from [V]
- **quran/quran.com-frontend-next**: Next.js, **MIT** (README badge plus LICENSE.txt), 1.9k stars, active. It has word-by-word karaoke highlighting from segments and a word tooltip with translation and transliteration. Good reference for the highlight logic; it is a heavy app.
- **quran/quran_android**: **GPL-3.0**, 2.45k stars, active. It does ayah highlighting from timing DBs and is mushaf-page based.
- **TarteelAI/quranic-universal-library**: MIT. Data CMS and export formats.
- **cpfair/quran-align**: MIT code, CC BY 4.0 data. The timing source.
- **mustafa0x/quran-morphology**: GPL (inherited). Arabic-script morphology. The furqan.co site shows root pages built from it.

---

## Recommendation

| Layer | Source | Download | Obligation |
|---|---|---|---|
| Arabic text | Tanzil Uthmani | https://tanzil.net/download/ (quran-uthmani.txt) | Verbatim only; keep notice; credit plus link to tanzil.net |
| Morphology (root, lemma, POS, features) | mustafa0x/quran-morphology (QAC v0.4 fork) | raw URL above | GPL: ship the licence text; credit "Quranic Arabic Corpus (corpus.quran.com), Kais Dukes; fixes by mustafa0x" |
| English gloss per word | Quran.com API v4 words / QUL wbw English | `api.quran.com/api/v4/verses/by_chapter/{n}?words=true&per_page=300` (one-time export) | No licence found; credit Quran.com / QuranWBW.com |
| Word timings | quran-align (or the identical Quran.com segments) | GitHub release zip or `api.quran.com/api/v4/recitations/7/by_chapter/{n}?fields=segments` | CC BY 4.0: "Word timings © Collin Fair, quran-align, CC BY 4.0" |
| Audio | EveryAyah Alafasy (or Minshawi Murattal), per ayah | https://everyayah.com/data/Alafasy_64kbps/SSSAAA.mp3 | No formal licence: non-commercial, credit reciter plus everyayah.com |
| English translation | Pickthall 1930 (public domain) | tanzil.net/trans/ (en.pickthall) or Gutenberg #16955 | Public domain; credit Tanzil as the source per its terms |

Suggested attribution footer:
> Quran text: Tanzil Project (tanzil.net), CC BY 3.0, unmodified. Morphology: Quranic Arabic Corpus v0.4 (corpus.quran.com), GNU GPL, with corrections by mustafa0x. Word timings: Collin Fair, quran-align, CC BY 4.0. Word glosses: Quran.com / QuranWBW.com via QUL. Recitation: Mishary Rashid Alafasy, audio from everyayah.com. Translation: M. M. Pickthall (1930), public domain.

Licensing note: because the morphology is GPL, keep the derived morphology JSON under the GPL, or release the whole repo under GPL-3.0. That is the simplest option.
