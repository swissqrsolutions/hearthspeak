// Builds the static site: content/<lang>/<num>.yaml  ->  site/<lang>/<num>/index.html
// Usage: node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const CONTENT = path.join(ROOT, 'content');
const SITE = path.join(ROOT, 'site');

const LANGS = {
  kannada: { name: 'Kannada', native: 'ಕನ್ನಡ', dir: 'ltr', narrator: 'Ajji', narratorEn: 'Grandma' },
  'swiss-german': { name: 'Swiss German', native: 'Schwiizertüütsch', dir: 'ltr', narrator: 'Grosspapi', narratorEn: 'Grandpa' },
  arabic: { name: 'Levantine Arabic', native: 'شامي', dir: 'rtl', narrator: 'Jiddo', narratorEn: 'Grandpa' },
};

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = s => marked.parseInline(String(s || '').trim());
const pad = n => String(n).padStart(3, '0');

function audioIfExists(dir, name) {
  return fs.existsSync(path.join(dir, 'audio', name)) ? `audio/${name}` : null;
}

function buildLesson(langKey, file) {
  const L = yaml.load(fs.readFileSync(file, 'utf8'));
  const meta = LANGS[langKey];
  const outDir = path.join(SITE, langKey, pad(L.num));
  fs.mkdirSync(outDir, { recursive: true });
  const a = n => audioIfExists(outDir, n);
  const dir = meta.dir;

  const data = {
    lang: langKey, num: L.num, you: L.you,
    speakers: L.speakers,
    lines: L.lines.map((l, i) => ({ who: l.who, en: l.en, audio: a(`line-${i + 1}.mp3`) })),
  };

  const lines = L.lines.map((l, i) => `
    <div class="line ${l.who === L.you ? 'you' : ''}" data-i="${i}">
      <div class="num">${i + 1}</div>
      <div class="tgt" dir="${dir}">
        <span class="who">${esc(L.speakers[l.who].name)}</span>
        <div class="script">${esc(l.t)}</div>
        <div class="tr">${esc(l.tr)}</div>
      </div>
      <div class="en">
        <div class="natural">${esc(l.en)}</div>
        <div class="lit">lit. ${esc(l.lit || '')}</div>
      </div>
      <div class="btns">
        <button class="play" data-src="${a(`line-${i + 1}.mp3`) || ''}" title="Play">▶</button>
        <button class="loop" data-i="${i}" title="Repeat for shadowing">🔁</button>
        <button class="rec" data-i="${i}" title="Record yourself and compare">🎙</button>
      </div>
    </div>`).join('');

  const notes = (L.notes || []).map(n => `<li><span class="ref">${n.ref}</span> ${md(n.md)}</li>`).join('');

  const buildup = (L.buildup || []).map((chain, ci) => `
    <div class="chain">${chain.map((s, si) => `
      <button class="chip" data-src="${a(`build-${ci + 1}-${si + 1}.mp3`) || ''}" dir="${dir}">
        <span class="script">${esc(s.t)}</span><span class="tr">${esc(s.tr)}</span></button>`).join('<span class="arrow">→</span>')}
    </div>`).join('');

  const remix = (L.remix || []).map((r, ri) => `
    <div class="remix">
      <button class="play" data-src="${a(`remix-${ri + 1}.mp3`) || ''}">▶</button>
      <div dir="${dir}"><div class="script">${esc(r.t)}</div><div class="tr">${esc(r.tr)}</div></div>
      <div class="en natural reveal" title="Tap to reveal">${esc(r.en)}</div>
    </div>`).join('');

  const texting = (L.texting || []).map(m => `
    <div class="bubble ${m.from === L.you ? 'me' : ''}"><b>${esc(L.speakers[m.from].name)}</b>${esc(m.msg)}</div>`).join('');

  const narr = a('narrator.mp3');
  const walk = a('walk.mp3');
  const transcript = (L.ajji || []).filter(s => s.en || s.t).map(s =>
    s.en ? `<p>${esc(s.en)}</p>` : `<p class="kn" dir="${dir}">🔊 <span class="script">${esc(s.t)}</span></p>`).join('');

  const html = `<!doctype html>
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
  <div class="lessonno">${esc(meta.name)} · Lesson ${L.num}</div>
  <h1 dir="${dir}"><span class="script">${esc(L.title.t)}</span></h1>
  <div class="sub">${esc(L.title.tr)} — ${esc(L.title.en)}</div>
  <p class="scene">${md(L.scene)}</p>
</section>

<nav class="toolbar">
  <button id="playAll" class="main">▶ Play all</button>
  <button id="gap" title="Pause after each line so you can repeat it">⏸ Pause: off</button>
  <button id="speed" title="Playback speed">1.0×</button>
  <button id="tgEn" title="English: shown / tap to reveal / hidden">EN</button>
  <button id="tgTr" class="toggle on" title="Latin transliteration">Aa</button>
  <button id="tgLit" class="toggle" title="Literal word-for-word">lit.</button>
</nav>

<section class="card">
  <h2>1 · Listen <small>first time: listen only, eyes closed. Then read along.</small></h2>
  <div class="dialogue">${lines}</div>
</section>

<section class="card narrator">
  <h2>2 · ${esc(meta.narrator)} explains <small>(${esc(meta.narratorEn)}, slowly, in English)</small></h2>
  ${narr ? `<audio controls preload="none" src="${narr}"></audio>` : '<p class="todo">Audio coming soon.</p>'}
  <details><summary>Read along</summary><div class="transcript">${transcript}</div></details>
</section>

<section class="card">
  <h2>3 · Your turn <small>you are <b>${esc(L.speakers[L.you].name)}</b>. Speak in the pause, then hear the native line.</small></h2>
  <div class="roleplay">
    <button id="rpStart" class="big">🎭 Start role-play</button>
    <label><input type="checkbox" id="rpHints" checked> show English hint</label>
    <div id="rpStage" class="rpstage" hidden></div>
  </div>
</section>

<section class="card">
  <h2>4 · Build it up <small>tap left → right; repeat each aloud</small></h2>
  ${buildup}
</section>

<section class="card">
  <h2>5 · Remix <small>same pieces, new sentences. Say it, then tap the English to check.</small></h2>
  ${remix}
</section>

<section class="card">
  <h2>6 · Notes</h2>
  <ol class="notes">${notes}</ol>
  <div class="culture"><h3>🪔 Culture</h3>${marked.parse(L.culture || '')}</div>
</section>

<section class="card">
  <h2>7 · On WhatsApp</h2>
  <div class="chat">${texting}</div>
  <p class="small">${md(L.texting_note)}</p>
</section>

<section class="card">
  <h2>8 · Retell <small>tell the story in your own words, 3 times, faster each time (the 4/3/2 fluency drill). Simple sentences are fine.</small></h2>
  <div class="retell">
    <button class="big" id="retellBtn">⏱ Start retell (90 s)</button>
    <label><input type="checkbox" id="retellRec" checked> record it</label>
    <div id="retellClock" class="clock"></div>
    <div id="retellTakes"></div>
  </div>
</section>

<section class="card mission">
  <h2>🎯 Today's mission</h2>
  <p>${md(L.mission)}</p>
</section>

<section class="card">
  <h2>🚶 Walk mode</h2>
  <p class="small">The whole lesson as one track: dialogue → ${esc(meta.narrator)} → role-play with pauses. Works with the screen off.</p>
  ${walk ? `<audio controls preload="none" src="${walk}"></audio> <a href="${walk}" download>⬇ download MP3</a>` : '<p class="todo">Audio coming soon.</p>'}
</section>

<section class="done">
  <label><input type="checkbox" id="done"> I did this lesson today</label>
  <div id="streak" class="small"></div>
</section>
</main>
<script>window.LESSON = ${JSON.stringify(data)};</script>
<script src="../../assets/app.js"></script>
</body></html>`;
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
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
      : '<p class="todo">Lessons coming soon.</p>'}
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

// service-worker precache list
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (!/sw\.js$/.test(f)) files.push(path.relative(SITE, p).split(path.sep).join('/'));
  }
})(SITE);
fs.writeFileSync(path.join(SITE, 'files.json'), JSON.stringify(files));
console.log(`Built ${built.length} lesson(s), ${files.length} files.`);
