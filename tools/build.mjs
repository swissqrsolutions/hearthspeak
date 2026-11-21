// Builds the static site: content/<lang>/<num>.yaml  ->  site/<lang>/<num>/index.html
// Listening-first design: one long story per episode, scene dividers, per-line audio.
// Usage: node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const CONTENT = path.join(ROOT, 'content');
const SITE = path.join(ROOT, 'site');

const LANGS = {
  kannada: { name: 'Kannada', native: 'ಕನ್ನಡ', dir: 'ltr' },
  arabic: { name: 'Arabic (Quran & Fusha)', native: 'العربية', dir: 'rtl' },
};

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = s => marked.parseInline(String(s || '').trim());
const pad = n => String(n).padStart(3, '0');

// word meanings: content/<lang>/gloss/*.tsv  (form<TAB>gloss)
const glossCache = {};
function glossFor(langKey) {
  if (glossCache[langKey]) return glossCache[langKey];
  const m = new Map(), dir = path.join(CONTENT, langKey, 'gloss');
  if (fs.existsSync(dir))
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.tsv')))
      for (const row of fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/)) {
        const [form, g] = row.split('\t');
        if (form && g) m.set(form.trim(), g.trim());
      }
  return (glossCache[langKey] = m);
}
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
};
const noEmoji = t => String(t || '').replace(/^[\p{Extended_Pictographic}\u{FE0F}\u{200D}\s]+/u, '').trim();
const normWord = w => w.replace(/[!?.,…‘’“”—:;()"'\[\]–-]/g, '').trim();

function buildLesson(langKey, file) {
  const L = yaml.load(fs.readFileSync(file, 'utf8'));
  const gloss = glossFor(langKey);
  const meta = LANGS[langKey];
  const outDir = path.join(SITE, langKey, pad(L.num));
  fs.mkdirSync(outDir, { recursive: true });
  const a = n => { const p = path.join(outDir, 'audio', n); return fs.existsSync(p) ? `audio/${n}?v=${Math.round(fs.statSync(p).mtimeMs / 1000).toString(36)}` : null; };
  const dir = meta.dir;

  const spoken = [];
  const wjson = path.join(outDir, 'audio', 'words.json');
  const wordTimes = fs.existsSync(wjson) ? JSON.parse(fs.readFileSync(wjson, 'utf8')) : {};
  let html = '';
  const toc = [];
  let secNo = 0;
  for (const item of L.lines) {
    if (item.part) { html += `<h2 class="part">${md(item.part)}</h2>`; continue; }
    if (item.chapter) {
      const id = `ch-${toc.filter(t => t.chapter).length + 1}`;
      toc.push({ chapter: item.chapter, id });
      html += `<h2 class="chapter" id="${id}">${esc(item.chapter)}</h2>`; continue;
    }
    if (item.section) {
      secNo++;
      const id = `s-${secNo}`;
      toc.push({ section: item.section, id, n: secNo, line: spoken.length + 1 });
      html += `<div class="section" id="${id}"><h3>${esc(noEmoji(item.section))}</h3>${item.learn ? `<p class="learn">${esc(item.learn)}</p>` : ''}</div>`;
      continue;
    }
    if (item.scene) { html += `<p class="scenecap">${md(item.scene)}</p>`; continue; }
    const i = spoken.length;
    const src = a(`line-${i + 1}.mp3`);
    // word-by-word karaoke: wrap each spoken word (from the TTS word timings) in a span
    const wb = (wordTimes[i + 1] || []);
    let scriptHtml = '', cursor = 0, times = [];
    for (const [s, e, w] of wb) {
      const at = item.t.indexOf(w, cursor);
      if (at < 0) continue;
      const g = gloss.get(normWord(w));
      scriptHtml += esc(item.t.slice(cursor, at)) + `<span class="w" data-k="${times.length}"${g ? ` data-g="${esc(g)}"` : ''}>${esc(w)}</span>`;
      times.push(s);
      cursor = at + w.length;
    }
    scriptHtml += esc(item.t.slice(cursor));
    spoken.push({ who: item.who, en: item.en, audio: src, w: times });
    const sp = L.speakers[item.who];
    html += `
    <div class="line" data-i="${i}" data-who="${esc(item.who)}">
      <div class="tgt" dir="${dir}">
        <span class="who c-${esc(item.who)}">${esc(sp.name)}</span>
        <div class="script">${scriptHtml}</div>
        <div class="tr">${esc(item.tr)}</div>
      </div>
      <div class="en"><div class="natural">${esc(item.en)}</div>${item.lit ? `<div class="lit">lit. ${esc(item.lit)}</div>` : ''}</div>
      <div class="ctl">
        <button class="play" data-src="${src || ''}" aria-label="Play">${ICON.play}${ICON.stop}<span class="lbl">Play</span></button>
        <button class="rep" data-n="2" aria-label="Play 2 times">2×</button>
        <button class="rep" data-n="3" aria-label="Play 3 times">3×</button>
        <button class="rep" data-n="5" aria-label="Play 5 times">5×</button>
      </div>
    </div>`;
  }

  const cast = Object.entries(L.speakers).map(([k, s]) => `<span class="castm c-${k}">${esc(s.name)}</span>`).join('');
  const ep = a('episode.mp3');

  const page = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hearthspeak · ${esc(meta.name)} ${L.num} · ${esc(L.title.en)}</title>
<link rel="stylesheet" href="../../assets/style.css">
<link rel="manifest" href="../../manifest.webmanifest">
<link rel="icon" href="../../assets/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="../../assets/icon-192.png"><meta name="theme-color" content="#a8461f">
</head><body data-lang="${langKey}">
<header class="top">
  <button id="navbtn" class="navbtn" aria-label="Lessons and scenes">${ICON.menu}</button>
  <div class="ctrl">
    <select id="speed" aria-label="Playback speed">
      <option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="0.75">0.75×</option>
      <option value="1">Normal</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option>
      <option value="1.75">1.75×</option><option value="2">2×</option>
    </select>
    <button id="tgEn" title="English: shown / tap to reveal / hidden">EN</button>
    <button id="tgTr" title="Show/hide Latin letters">Aa</button>
  </div>
</header>
<!--NAV-->
<main>
<section class="hero">
  <h1 dir="${dir}"><span class="script">${esc(L.title.t)}</span></h1>
  <div class="sub">${esc(L.title.tr)} — ${esc(L.title.en)}</div>
  <details class="about"><summary>About this lesson and its characters</summary><p class="scene">${md(L.intro)}</p><div class="cast">${cast}</div></details>
  ${ep ? `<div class="epaudio"><span class="small">Whole lesson · keeps playing with the screen off</span><audio controls preload="none" src="${ep}"></audio></div>` : ''}
</section>



<section class="card listen">
  ${html}
</section>
${L.next ? `<section class="card next">${md(L.next)}</section>` : ''}

<section class="done">
  <label><input type="checkbox" id="done"> I listened to this lesson today</label>
  <div id="streak" class="small"></div>
</section>
</main>


<script>window.LESSON = ${JSON.stringify({ lang: langKey, num: L.num, speakers: L.speakers, lines: spoken })};</script>
<script src="../../assets/app.js"></script>
</body></html>`;
  return { langKey, num: L.num, title: L.title, level: L.level, toc, page, out: path.join(outDir, 'index.html') };
}

// ---- build all
const built = [];
for (const langKey of Object.keys(LANGS)) {
  const dir = path.join(CONTENT, langKey);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.yaml')).sort())
    built.push(buildLesson(langKey, path.join(dir, f)));
}

// ---- left sidebar: every course + lesson; the open lesson shows its chapters and scenes
function navFor(cur) {
  const courses = Object.entries(LANGS).map(([k, m]) => {
    const ls = built.filter(x => x.langKey === k);
    const items = ls.map(x => {
      const here = x === cur;
      const toc = here ? `<ol class="navtoc">${x.toc.map(t => t.chapter
        ? `<li class="navch"><a href="#${t.id}">${esc(t.chapter.replace(/^Chapter d+ — /, ''))}</a></li>`
        : `<li><a href="#${t.id}"><span class="secno">${t.n}</span>${esc(noEmoji(t.section))}</a></li>`).join('')}</ol>` : '';
      return `<li class="${here ? 'here' : ''}"><a class="navlesson" data-key="${k}-${x.num}" href="../../${k}/${pad(x.num)}/index.html"><b>${x.num}</b> <span>${esc(x.title.en)}</span></a>${toc}</li>`;
    }).join('');
    return `<div class="navcourse">${esc(m.name)} <span class="script" dir="${m.dir}">${esc(m.native)}</span></div>
      ${ls.length ? `<ol class="navlessons">${items}</ol>` : '<div class="navsoon">Coming soon</div>'}`;
  }).join('');
  return `<aside id="nav" class="nav"><div class="navhead">Hearthspeak</div>${courses}
    <div class="navfoot"><button id="offline">Save all lessons for offline use</button><div id="offlineMsg" class="small"></div></div></aside>
  <div id="scrim" class="scrim"></div>`;
}
for (const x of built) fs.writeFileSync(x.out, x.page.replace('<!--NAV-->', navFor(x)));

// ---- the start page just opens where you left off (or the first lesson)
const first = built[0];
fs.writeFileSync(path.join(SITE, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hearthspeak</title><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="assets/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/icon-192.png">
<script>
  var t = '${first ? `${first.langKey}/${pad(first.num)}/index.html` : ''}';
  try { var l = JSON.parse(localStorage.getItem('last')); if (l && l.href) t = l.href; } catch (e) {}
  location.replace(t);
</script></head><body></body></html>`);

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (!/sw\.js$/.test(f)) {
      const rel = path.relative(SITE, p).split(path.sep).join('/');
      files.push(f.endsWith('.mp3') ? `${rel}?v=${Math.round(fs.statSync(p).mtimeMs / 1000).toString(36)}` : rel);
    }
  }
})(SITE);
fs.writeFileSync(path.join(SITE, 'files.json'), JSON.stringify(files));
console.log(`Built ${built.length} episode(s), ${files.length} files.`);
