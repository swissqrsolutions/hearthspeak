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
  'swiss-german': { name: 'Swiss German', native: 'Schwiizertüütsch', dir: 'ltr' },
  arabic: { name: 'Levantine Arabic', native: 'شامي', dir: 'rtl' },
};

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = s => marked.parseInline(String(s || '').trim());
const pad = n => String(n).padStart(3, '0');

function buildLesson(langKey, file) {
  const L = yaml.load(fs.readFileSync(file, 'utf8'));
  const meta = LANGS[langKey];
  const outDir = path.join(SITE, langKey, pad(L.num));
  fs.mkdirSync(outDir, { recursive: true });
  const a = n => (fs.existsSync(path.join(outDir, 'audio', n)) ? `audio/${n}` : null);
  const dir = meta.dir;

  const spoken = [];
  let html = '';
  for (const item of L.lines) {
    if (item.part) { html += `<h2 class="part">${md(item.part)}</h2>`; continue; }
    if (item.scene) { html += `<div class="scenecap">🎬 ${md(item.scene)}</div>`; continue; }
    const i = spoken.length;
    const src = a(`line-${i + 1}.mp3`);
    spoken.push({ who: item.who, en: item.en, audio: src });
    const sp = L.speakers[item.who];
    html += `
    <div class="line" data-i="${i}" data-who="${esc(item.who)}">
      <div class="tgt" dir="${dir}">
        <span class="who c-${esc(item.who)}">${esc(sp.name)}</span>
        <div class="script">${esc(item.t)}</div>
        <div class="tr">${esc(item.tr)}</div>
      </div>
      <div class="en"><div class="natural">${esc(item.en)}</div>${item.lit ? `<div class="lit">lit. ${esc(item.lit)}</div>` : ''}</div>
      <div class="btns">
        <button class="play" data-src="${src || ''}" title="Play">▶</button>
        <button class="loop" data-i="${i}" title="Repeat for shadowing">🔁</button>
        <button class="rec" data-i="${i}" title="Record yourself and compare">🎙</button>
      </div>
    </div>`;
  }

  const cast = Object.entries(L.speakers).map(([k, s]) => `<span class="castm c-${k}">${esc(s.name)}</span>`).join('');
  const ep = a('episode.mp3');

  fs.writeFileSync(path.join(outDir, 'index.html'), `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hearthspeak · ${esc(meta.name)} ${L.num} · ${esc(L.title.en)}</title>
<link rel="stylesheet" href="../../assets/style.css">
<link rel="manifest" href="../../manifest.webmanifest">
</head><body data-lang="${langKey}">
<header class="top">
  <a href="../../index.html" class="back">← Courses</a>
  <div class="lvl">${esc(L.level)}</div>
</header>
<main>
<section class="hero">
  <div class="lessonno">${esc(meta.name)} · Episode ${L.num}</div>
  <h1 dir="${dir}"><span class="script">${esc(L.title.t)}</span></h1>
  <div class="sub">${esc(L.title.tr)} — ${esc(L.title.en)}</div>
  <p class="scene">${md(L.intro)}</p>
  <div class="cast">${cast}</div>
  ${ep ? `<div class="epaudio"><span class="small">🎧 Whole episode (screen-off listening)</span><audio controls preload="none" src="${ep}"></audio></div>` : ''}
</section>

<section class="card listen">
  ${html}
</section>
${L.next ? `<section class="card next">${md(L.next)}</section>` : ''}

<section class="done">
  <label><input type="checkbox" id="done"> I listened to this episode today</label>
  <div id="streak" class="small"></div>
</section>
</main>

<nav class="toolbar">
  <button id="playAll" class="main">▶ Play all</button>
  <button id="gap" title="Pause after each line so you can repeat it">⏸ Pause: off</button>
  <button id="speed" title="Playback speed">1.0×</button>
  <button id="tgEn" title="English: shown / tap to reveal / hidden">EN</button>
  <button id="tgTr" class="toggle on" title="Latin transliteration">Aa</button>
</nav>
<script>window.LESSON = ${JSON.stringify({ lang: langKey, num: L.num, speakers: L.speakers, lines: spoken })};</script>
<script src="../../assets/app.js"></script>
</body></html>`);
  return { langKey, num: L.num, title: L.title, level: L.level };
}

// ---- build all
const built = [];
for (const langKey of Object.keys(LANGS)) {
  const dir = path.join(CONTENT, langKey);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.yaml')).sort())
    built.push(buildLesson(langKey, path.join(dir, f)));
}

const courseList = Object.entries(LANGS).map(([k, m]) => {
  const ls = built.filter(b => b.langKey === k);
  return `<section class="card course" data-lang="${k}">
    <h2>${esc(m.name)} <span class="script" dir="${m.dir}">${esc(m.native)}</span></h2>
    ${ls.length ? `<ol class="lessons">${ls.map(b => `<li><a href="${k}/${pad(b.num)}/index.html" data-key="${k}-${b.num}">
      <b>${b.num}.</b> <span class="script" dir="${m.dir}">${esc(b.title.t)}</span> — ${esc(b.title.en)}</a></li>`).join('')}</ol>`
      : '<p class="todo">Episodes coming soon.</p>'}
  </section>`;
}).join('');

fs.writeFileSync(path.join(SITE, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hearthspeak</title><link rel="stylesheet" href="assets/style.css"><link rel="manifest" href="manifest.webmanifest">
</head><body><main>
<section class="hero"><h1>🔥 Hearthspeak</h1><div class="sub">Speak like family. One story a day.</div></section>
${courseList}
<section class="card small"><button id="offline">⬇ Save everything for offline use</button> <span id="offlineMsg"></span></section>
</main><script src="assets/app.js"></script></body></html>`);

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (!/sw\.js$/.test(f)) files.push(path.relative(SITE, p).split(path.sep).join('/'));
  }
})(SITE);
fs.writeFileSync(path.join(SITE, 'files.json'), JSON.stringify(files));
console.log(`Built ${built.length} episode(s), ${files.length} files.`);
