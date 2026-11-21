# IndoPak Quran font + text for a free GitHub Pages PWA (researched 2026-11-21)

## Recommendation
1. **Font: DigitalKhatt IndoPak** (Amine Anane / Tarteel Inc.), **SIL OFL 1.1**.
   - Repo: https://github.com/DigitalKhatt/indopakfont (LICENSE = OFL-1.1, "Copyright 2024-2025 Amine Anane, Tarteel Inc."; no Reserved Font Name declared, so you may also subset/rename freely; keep OFL.txt + copyright alongside the font).
   - Download (release v1.0.0-beta.1, 2024-12-23):
     - https://github.com/DigitalKhatt/indopakfont/releases/download/v1.0.0-beta.1/indopak.woff2 (345 KB)  <- bundle this
     - https://github.com/DigitalKhatt/indopakfont/releases/download/v1.0.0-beta.1/indopak.otf (2.5 MB)
     - Same font is mirrored by QUL: https://static-cdn.tarteel.ai/qul/fonts/dk/DigitalKhattIndoPak.otf (QUL resource 568; QUL's licence tab says "We don't have copyright information" - rely on the GitHub OFL instead).
   - Based on the 13-line "Quraan Al Majeed" IndoPak mushaf. Sponsored by Tarteel.
   - Format: OpenType **CFF2 variable font** (tables: CFF2, fvar, HVAR, STAT, GSUB/GPOS). Variable axes are for DigitalKhatt's stretch-justification; default instance renders as a normal font. CFF2/variable fonts are supported by Chrome (incl. Android) since ~v62 via FreeType/HarfBuzz. (Not device-tested here - do a quick smoke test on a phone.)
   - cmap (Unicode coverage): U+0020, 0621-063A, 0640-0657 (all standard harakat incl. tanwin, shadda, sukun 0652), 0660-0669 (Arabic-Indic digits), 0670-0671, 0614-0615, 0617, 06D6, 06D8-06DF (incl. 06DD end-of-ayah), 06E2, 06E6, 06E8-06E9, 06ED, 089C, 08D5-08D7, 08D9, 08DB, 08DD-08DF, 08E2, 08F0-08F2, 034F, 200D. **No private-use glyphs.**
   - Ordinary fully-vowelled Arabic: uses standard Unicode letters + harakat (0652 sukun is drawn IndoPak-style), so dialogue text works. **Missing**: Arabic comma/semicolon/question mark (060C, 061B, 061F), Latin letters/digits/punctuation, Urdu/Persian letters (06CC, 06C1, 06A9, 06BE...), U+06E1 (small dotless khah sukun). Put a fallback in the font stack, e.g. `font-family: 'DK IndoPak', 'Lateef', 'Scheherazade New', serif;` so ، ؟ etc. fall back per glyph.
   - Caveat: v1.0.0-beta; IndoPak Quranic text must use the DigitalKhatt encoding (below), not Quran.com's `text_indopak`.

2. **Text: DigitalKhatt IndoPak 15-line text (MIT)**
   - https://raw.githubusercontent.com/DigitalKhatt/digitalkhatt-js/main/apps/site-angular/src/app/services/quran_text_indopak_15.ts (1.5 MB TS array: pages -> lines; repo licence MIT, "Copyright 2020-present DigitalKhatt contributors").
   - Lines contain verse ends like `۝١ۙ` (06DD + Arabic-Indic number + waqf mark); split into ayahs on 06DD+digits. Watch for oddities: some ayah-end markers use U+202E (RLO) + digits + U+08E2 (e.g. 1:6 line `عَلَيْهِمْ‮٦࣢ۙ`), madd mark U+089C (`الضَّا࢜لِّيْنَ`, `ال࢜مّ࢜`). Strip/normalise RLO when extracting.
   - Same text as ayah-by-ayah / word-by-word on QUL: "Digital Khatt Indopak Script" resources 566 (ayah) / 565 (word) at https://qul.tarteel.ai/resources/quran-script (download may need free login; QUL licence tab: "no copyright information"; QUL codebase TarteelAI/quranic-universal-library is MIT). QUL docs sample: `اَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْاٰنَ تَرْتِيْلًا ۝٤ؕ`.
   - The Quran text itself is not copyrightable; MIT on the file covers the digitisation.

3. **Fallback (no IndoPak font)**: **Lateef** (SIL International, OFL 1.1, on Google Fonts; Regular TTF 241 KB, ~100 KB as woff2) - Naskh in the Sindhi/Urdu (South Asian) style, closest OFL look to IndoPak, full tashkeel + Quranic marks. Second choice: **Scheherazade New** (SIL, OFL, Regular 332 KB TTF) - classic Naskh, excellent mark support. Both from https://github.com/google/fonts/tree/main/ofl/{lateef,scheherazadenew} or https://software.sil.org/. Noto Naskh Arabic (OFL) = generic Naskh, fine but Arab-style; Noto Nastaliq Urdu (OFL) = true Nastaliq, poor/cramped with full Quranic tashkeel - not recommended.

## Rejected / unclear candidates
- **Quran.com "IndoPak Nastaleeq" (indopak-nastaleeq-waqf-lazim-v4.2.1)** - shipped in quran/quran.com-frontend-next at public/fonts/quran/hafs/nastaleeq/indopak/ (TTF 336 KB, WOFF2 84 KB). Font name "AlQuran IndoPak by QuranWBW" v4.2.1; name-table copyright: "© Al Qalam © Ghandhara © KFGQPC © Ayman Siddiqui"; description says derived from Al Qalam Quran Majeed + KFGQPC Nastaleeq glyphs and: **"NOT FOR SALE, NOT FOR MODIFICATION, NOT FOR DISTRIBUTION OR NOT FOR DEVELOPMENT WITHOUT WRITTEN NOTICE BY QURANWBW.COM"**. -> do NOT bundle without written permission (quranwbw[at]gmail.com). Also uses PUA (E000-E82D, F500-F73C) and many presentation forms; matches Quran.com `text_indopak_nastaleeq`. quran.com-frontend-next repo has **no licence** (GitHub licence: null).
- **Quran.com API v4 IndoPak text**: `api.quran.com/api/v4/quran/verses/indopak` (`text_indopak`, uses U+06E1 for sukun, trailing U+200F) and `/verses/indopak_nastaleeq` (`text_indopak_nastaleeq`, uses 0652, Farsi yeh 06CC, 065F/06DF waqf marks). Works without auth today, but Quran Foundation API terms/OAuth apply for apps; no explicit redistribution licence for bulk text. Neither encoding matches the DigitalKhatt font (06E1, 06CC not in its cmap).
- **KFGQPC fonts (Uthmanic Hafs, KFGQPC Nastaleeq = QUL 462)**: King Fahd Complex EULA (from memory, not re-verified): free to use, no modification, no sale; redistribution ambiguity; not OFL. QUL shows "no copyright information".
- **Al Qalam Quran Majeed** (Ghandhara/Al Qalam) - proprietary/freeware, redistribution not granted. **PDMS Saleem QuranFont**, **Noorehuda**, **Me Quran** (me_quran-2.woff2 46 KB shipped by quran.com) - freeware of unclear licence; no explicit redistribution terms found. Avoid for a public repo.
- GitHub search "indopak font": other repos (imranpollob/quran-indopak, quran8vs/IndoPak, kmhaider/MyGuide, QManzoor19/indopak) have no licence and just rehost the above fonts.

## CSS snippet
```css
@font-face { font-family: 'DK IndoPak'; src: url('fonts/indopak.woff2') format('woff2'); font-display: swap; }
@font-face { font-family: 'Lateef'; src: url('fonts/Lateef-Regular.woff2') format('woff2'); font-display: swap; }
.ar { font-family: 'DK IndoPak', 'Lateef', serif; direction: rtl; line-height: 2.2; }
```
Ship OFL.txt (DigitalKhatt LICENSE) and MIT notice (digitalkhatt-js) in the repo.
