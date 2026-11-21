// Hearthspeak player — plain JS, works offline.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };

  // Offline: register service worker when served over http(s)
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    const sw = document.body.dataset.lang ? new URL('../../sw.js', location.href) : new URL('sw.js', location.href);
    navigator.serviceWorker.register(sw, { updateViaCache: 'none' }).then(r => r.update()).catch(() => {});
    // when a new version takes over, reload once so you always see the latest lesson
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
    try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch {}
  }

  // ---------- Home page ----------
  const offBtn = $('#offline');
  if (offBtn) {
    $$('.lessons a').forEach(a => { if (store.get('done:' + a.dataset.key, false)) a.classList.add('done'); });
    const last = store.get('last', null);
    if (last) {
      const c = document.createElement('a');
      c.href = last.href; c.className = 'continue'; c.textContent = `▶ Continue: ${last.title}`;
      $('.hero').append(c);
    }
    offBtn.onclick = async () => {
      const msg = $('#offlineMsg');
      if (!('caches' in window)) { msg.textContent = 'Offline storage not supported here.'; return; }
      msg.textContent = 'Downloading…';
      try {
        const files = await (await fetch('files.json', { cache: 'no-store' })).json();
        const c = await caches.open('hs-v3');
        let n = 0;
        for (const f of files) { await c.add(f).catch(() => {}); msg.textContent = `Saved ${++n}/${files.length}`; }
        msg.textContent = `✓ Saved ${files.length} files. Works without internet now.`;
      } catch { msg.textContent = 'Could not download (are you offline?).'; }
    };
    return;
  }

  const L = window.LESSON;
  if (!L) return;
  store.set('last', { href: location.pathname.split('/').slice(-3).join('/'), title: `${document.title.replace('Hearthspeak · ', '')}` });

  // ---------- Audio engine ----------
  const player = new Audio();
  let rate = store.get('rate', 1);
  let stopFlag = 0;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let wake = null;
  const keepAwake = async on => { try { if (on && !wake) wake = await navigator.wakeLock.request('screen'); if (!on && wake) { wake.release(); wake = null; } } catch {} };

  // ---------- Karaoke: light up each word as the voice says it ----------
  const srcIdx = {};
  L.lines.forEach((l, i) => { if (l.audio) srcIdx[l.audio] = i; });
  let raf = 0;
  function clearWords() { cancelAnimationFrame(raf); document.querySelectorAll('.w.on').forEach(e => e.classList.remove('on')); }
  function karaoke(li) {
    clearWords();
    const line = L.lines[li];
    if (!line || !line.w || !line.w.length) return;
    const spans = document.querySelectorAll('.line[data-i="' + li + '"] .w');
    let lastK = -1;
    const tick = () => {
      const t = player.currentTime * 1000 + 60;           // small lead so the word lights as it starts
      let k = -1;
      for (let j = 0; j < line.w.length; j++) if (line.w[j] <= t) k = j; else break;
      if (k !== lastK) { if (spans[lastK]) spans[lastK].classList.remove('on'); if (spans[k]) spans[k].classList.add('on'); lastK = k; }
      if (!player.paused && !player.ended) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function play(src, startAt = 0) {
    return new Promise(res => {
      if (!src) return res(0);
      const epA = document.querySelector('.epaudio audio'); if (epA && !epA.paused) epA.pause();
      player.pause();
      const abs = new URL(src, location.href).href;
      if (player.src === abs && player.readyState > 0) player.currentTime = startAt;
      else {
        player.src = src; player.load();
        if (startAt) player.addEventListener('loadedmetadata', () => { player.currentTime = startAt; }, { once: true });
      }
      player.playbackRate = rate;
      player.preservesPitch = true;
      const done = () => { player.onended = player.onerror = null; clearWords(); res(player.duration || 1); };
      player.onplaying = () => { player.onplaying = null; if (srcIdx[src] !== undefined) karaoke(srcIdx[src]); };
      player.onended = done; player.onerror = done;
      player.play().catch(done);
    });
  }
  function stopAll() {
    stopFlag++; player.pause(); keepAwake(false); clearWords();
    $$('.playing').forEach(e => e.classList.remove('playing'));
    $$('button.active').forEach(b => b.classList.remove('active'));
    $$('button.loop').forEach(b => { b.textContent = '🔁'; });
    if (typeof playingAll !== 'undefined' && playingAll) { playingAll = false; setTimeout(setPlayLabel, 0); }
  }

  // ---------- Toolbar ----------
  const tg = (id, cls, invert, key) => {
    const b = $(id);
    let on = store.get(key, b.classList.contains('on'));
    const apply = () => { b.classList.toggle('on', on); document.body.classList.toggle(cls, invert ? !on : on); };
    apply();
    b.onclick = () => { on = !on; store.set(key, on); apply(); };
  };
  tg('#tgTr', 'no-tr', true, 'showTr');
  if ($('#tgLit')) tg('#tgLit', 'lit', false, 'showLit');

  // English: shown -> blur (tap line to reveal) -> hidden
  const EN = ['shown', 'blur', 'hidden'], ENL = { shown: 'EN', blur: 'EN 👁', hidden: 'EN ✕' };
  let en = store.get('enMode', 'shown');
  const applyEn = () => { EN.forEach(m => document.body.classList.toggle('en-' + m, m === en)); $('#tgEn').textContent = ENL[en]; $('#tgEn').classList.toggle('on', en === 'shown'); };
  applyEn();
  $('#tgEn').onclick = () => { en = EN[(EN.indexOf(en) + 1) % 3]; store.set('enMode', en); $$('.revealed').forEach(e => e.classList.remove('revealed')); applyEn(); };
  $$('.line .en').forEach(e => e.onclick = () => e.classList.toggle('revealed'));

  const SPEEDS = [0.6, 0.75, 0.9, 1.0, 1.15];
  const applySpeed = () => { $('#speed').textContent = (rate === 1 ? '1.0' : rate) + '×'; $('#speed').classList.toggle('on', rate < 1); };
  applySpeed();
  $('#speed').onclick = () => { rate = SPEEDS[(SPEEDS.indexOf(rate) + 1) % SPEEDS.length] || 1; store.set('rate', rate); player.playbackRate = rate; applySpeed(); };

  // how many times the 🔁 button repeats a line
  const REPS = [2, 3, 5];
  let reps = store.get('reps', 3); if (!REPS.includes(reps)) reps = 3;
  const repLabel = r => r ? r + '×' : '∞';
  const applyReps = () => { const b = $('#reps'); if (b) { b.textContent = '🔁 ' + repLabel(reps); b.classList.toggle('on', reps !== 1); } };
  applyReps();
  if ($('#reps')) $('#reps').onclick = () => { reps = REPS[(REPS.indexOf(reps) + 1) % REPS.length]; store.set('reps', reps); applyReps(); toast(reps ? `🔁 Each line will repeat ${reps}×` : '🔁 Lines repeat until you tap 🔁 again'); };

  const GAPS = [0, 1, 1.5, 2], GAPL = { 0: 'off', 1: '1×', 1.5: '1.5×', 2: '2×' };
  let gap = store.get('gap', 0);
  const applyGap = () => { if (!$('#gap')) return; $('#gap').textContent = `⏸ Pause: ${GAPL[gap]}`; $('#gap').classList.toggle('on', gap > 0); };
  if ($('#gap')) applyGap();
  if ($('#gap')) $('#gap').onclick = () => { gap = GAPS[(GAPS.indexOf(gap) + 1) % GAPS.length]; store.set('gap', gap); applyGap(); };

  // ---------- Per-line play / loop ----------
  let cur = store.get('pos:' + L.lang + L.num, 0);
  const lineEl = i => $(`.line[data-i="${i}"]`);
  // ■ Stop: one big button in the bottom bar whenever something is playing; ▶ on a playing line also stops it
  const stopBtn = $('#stop');
  function updateStop() {
    if (!stopBtn) return;
    const busy = !player.paused || $$('button.loop.active').length > 0;
    stopBtn.hidden = !busy;
    $$('.line button.play').forEach(p => { p.textContent = p.closest('.line').classList.contains('playing') && busy ? '■' : (p.classList.contains('resume') ? '⏯' : '▶'); });
  }
  player.addEventListener('play', updateStop);
  player.addEventListener('pause', () => setTimeout(updateStop, 60));
  player.addEventListener('ended', () => setTimeout(updateStop, 60));
  let resumeAt = null;   // { i: line index, t: seconds } — set when you stop a line part-way
  function markResume() {
    const row = document.querySelector('.line.playing');
    if (row && !player.paused && !player.ended && player.currentTime > 0.2 && player.duration - player.currentTime > 0.3) {
      resumeAt = { i: +row.dataset.i, t: Math.max(0, player.currentTime - 0.4) };   // back up a hair so the word isn't cut
    }
  }
  function showResume() {
    $$('.line button.play').forEach(p => p.classList.remove('resume'));
    if (resumeAt) { const p = lineEl(resumeAt.i)?.querySelector('button.play'); if (p) { p.classList.add('resume'); p.textContent = '⏯'; p.title = 'Continue from where you stopped'; } }
  }
  if (stopBtn) stopBtn.onclick = () => { markResume(); stopAll(); updateStop(); showResume(); };

  $$('button.play, button.chip').forEach(b => b.onclick = async () => {
    const row = b.closest('.line');
    if (row && row.classList.contains('playing')) { markResume(); stopAll(); updateStop(); showResume(); return; }
    stopAll();
    const i = row ? +row.dataset.i : -1;
    const from = resumeAt && resumeAt.i === i ? resumeAt.t : 0;   // continue the same line from where it stopped
    resumeAt = null; showResume();
    if (row) { row.classList.add('playing'); cur = i; store.set('pos:' + L.lang + L.num, cur); }
    updateStop();
    await play(b.dataset.src, from);
    if (row) row.classList.remove('playing');
    updateStop();
  });
  $$('button.loop').forEach(b => b.onclick = async () => {
    const was = b.classList.contains('active');
    stopAll(); if (was) return;
    b.classList.add('active'); keepAwake(true);
    const my = stopFlag, i = +b.dataset.i, row = lineEl(i);
    for (let k = 1; my === stopFlag && (reps === 0 || k <= reps); k++) {
      b.textContent = reps ? `${k}/${reps}` : k;
      row.classList.add('playing');
      const d = await play(L.lines[i].audio);
      row.classList.remove('playing');
      if (my !== stopFlag) break;
      buzz(25);
      if (reps && k >= reps) break;
      await sleep(Math.max(1500, d * 1000 * 1.3 / rate)); // your turn to shadow
    }
    b.textContent = '🔁';
    if (my === stopFlag) { b.classList.remove('active'); keepAwake(false); }
    updateStop();
  });

  // ---------- Play all (+ lock-screen controls) ----------
  
  // Play all: ⏸ Pause stops mid-conversation, ▶ Resume continues from that exact line (remembered across visits)
  const pbtn = $('#playAll') || document.createElement('button');
  let playingAll = false;
  function setPlayLabel() {
    if (playingAll) { pbtn.textContent = '⏸ Pause'; pbtn.classList.add('active'); return; }
    pbtn.classList.remove('active');
    pbtn.textContent = cur > 0 ? `▶ Resume · line ${cur + 1}` : '▶ Play all';
  }
  async function playFrom(start) {
    stopAll(); playingAll = true; setPlayLabel(); keepAwake(true);
    const my = stopFlag;
    for (cur = start; cur < L.lines.length && my === stopFlag; cur++) {
      store.set('pos:' + L.lang + L.num, cur);
      const row = lineEl(cur); row.classList.add('playing'); row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const d = await play(L.lines[cur].audio); row.classList.remove('playing');
      if (my !== stopFlag) return;                       // paused: cur stays on this line
      if (gap) { buzz(25); await sleep(d * 1000 * gap / rate + 600); } else await sleep(450);
    }
    if (my === stopFlag) { cur = 0; store.set('pos:' + L.lang + L.num, 0); playingAll = false; setPlayLabel(); keepAwake(false); }
  }
  function pauseAll() { if (!playingAll) return; playingAll = false; stopAll(); setPlayLabel(); toast(`⏸ Paused at line ${cur + 1}. Tap ▶ Resume to continue.`); }
  function resumeAll() { if (playingAll) return; playFrom(cur >= L.lines.length ? 0 : cur); }
  pbtn.onclick = () => (playingAll ? pauseAll() : resumeAll());
  setPlayLabel();

  // Whole-lesson player: pause anywhere, it resumes from the same spot next time
  const ep = document.querySelector('.epaudio audio');
  if (ep) {
    const k = 'ep:' + L.lang + L.num;
    const saved = store.get(k, 0);
    if (saved > 5) {
      const note = document.createElement('div'); note.className = 'small';
      note.textContent = '⏯ Continues from ' + Math.floor(saved / 60) + ':' + String(Math.floor(saved % 60)).padStart(2, '0');
      ep.after(note);
      ep.preload = 'metadata';
      ep.addEventListener('loadedmetadata', () => { if (ep.currentTime < 1) ep.currentTime = saved; }, { once: true });
    }
    let last = 0;
    ep.addEventListener('timeupdate', () => { if (Math.abs(ep.currentTime - last) > 3) { last = ep.currentTime; store.set(k, ep.currentTime); } });
    ep.addEventListener('pause', () => store.set(k, ep.currentTime));
    ep.addEventListener('ended', () => store.set(k, 0));
    ep.addEventListener('play', () => { stopAll(); });   // stop any single-line audio
  }

  // ---------- Pagination: 10 dialogue lines per page ----------
  (() => {
    const box = document.querySelector('.listen');
    if (!box) return;
    const PER = 10;
    const kids = [...box.children];
    let count = 0, pending = [];
    for (const el of kids) {
      if (el.classList.contains('line')) {
        const pg = Math.floor(count / PER); count++;
        for (const h of pending) h.dataset.page = pg;
        pending = []; el.dataset.page = pg;
      } else pending.push(el);
    }
    const pages = Math.max(1, Math.ceil(count / PER));
    for (const h of pending) h.dataset.page = pages - 1;
    // first scene title on each page, for the picker
    const label = pg => {
      const sec = kids.find(e => +e.dataset.page === pg && e.classList.contains('section'));
      const from = pg * PER + 1, to = Math.min(count, from + PER - 1);
      return `Page ${pg + 1} of ${pages} · lines ${from}–${to}` + (sec ? ' · ' + sec.querySelector('h3').textContent.replace(/^\d+/, '').trim() : '');
    };
    const mk = () => {
      const n = document.createElement('div'); n.className = 'pager';
      n.innerHTML = `<button class="pprev" aria-label="Previous page">◀</button>
        <select class="psel" aria-label="Choose page">${Array.from({ length: pages }, (_, i) => `<option value="${i}">${label(i)}</option>`).join('')}</select>
        <button class="pnext" aria-label="Next page">▶</button>`;
      return n;
    };
    const top = mk(), bottom = mk();
    box.before(top); box.after(bottom);
    const key = 'page:' + L.lang + L.num;
    let page = Math.min(store.get(key, 0), pages - 1);
    function show(p, scroll) {
      page = Math.max(0, Math.min(pages - 1, p)); store.set(key, page);
      for (const el of kids) el.hidden = +el.dataset.page !== page;
      for (const pg of [top, bottom]) {
        pg.querySelector('.psel').value = page;
        pg.querySelector('.pprev').disabled = page === 0;
        pg.querySelector('.pnext').disabled = page === pages - 1;
      }
      if (scroll) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    for (const pg of [top, bottom]) {
      pg.querySelector('.pprev').onclick = () => { stopAll(); show(page - 1, true); };
      pg.querySelector('.pnext').onclick = () => { stopAll(); show(page + 1, true); };
      pg.querySelector('.psel').onchange = e => { stopAll(); show(+e.target.value, true); };
    }
    // Contents links: open the right page, then jump to the scene
    document.querySelectorAll('.toclist a').forEach(a => a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault(); stopAll(); show(+target.dataset.page);
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }));
    // swipe left / right on the dialogue to change page
    let sx = 0, sy = 0;
    box.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    box.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { stopAll(); show(page + (dx < 0 ? 1 : -1), true); }
    }, { passive: true });
    const h = location.hash && document.querySelector(location.hash);
    show(h && h.dataset.page ? +h.dataset.page : page);
  })();

  // ---------- Recording helper ----------
  async function record(onStop) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [], rec = new MediaRecorder(stream);
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => { stream.getTracks().forEach(t => t.stop()); onStop(URL.createObjectURL(new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' }))); };
    rec.start(); return rec;
  }
  function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 4500); }

  // ---------- Record & compare (per line): native -> you ----------
  let rec = null;
  $$('button.rec').forEach(b => b.onclick = async () => {
    if (rec) { rec.stop(); return; }
    stopAll();
    const i = +b.dataset.i, row = lineEl(i);
    try {
      rec = await record(async url => {
        b.classList.remove('active'); rec = null;
        row.classList.add('playing');
        await play(L.lines[i].audio); await sleep(350); await play(url); // native, then you
        row.classList.remove('playing');
      });
      b.classList.add('active'); buzz(30);
      toast('🎙 Recording… say the line, then tap 🎙 again');
    } catch { toast('Microphone not available. Use the https link and allow the mic.'); }
  });

  // ---------- Role-play ----------
  if ($('#rpStart')) $('#rpStart').onclick = async () => {
    const btn = $('#rpStart'), stage = $('#rpStage');
    if (btn.classList.contains('active')) { stopAll(); stage.hidden = true; btn.textContent = '🎭 Start role-play'; return; }
    stopAll(); btn.classList.add('active'); btn.textContent = '■ Stop'; stage.hidden = false; keepAwake(true);
    const my = stopFlag;
    for (let i = 0; i < L.lines.length && my === stopFlag; i++) {
      const l = L.lines[i], mine = l.who === L.you, name = L.speakers[l.who].name;
      if (!mine) {
        stage.innerHTML = `<div class="speaker">${name}</div><div class="prompt">🔊 …</div>`;
        await play(l.audio);
      } else {
        const hint = $('#rpHints').checked ? l.en : '(say your line)';
        const dur = l.audio ? await getDuration(l.audio) : 3;
        const wait = Math.max(3, dur * 1.8 / rate + 1.5);
        stage.innerHTML = `<div class="speaker">Your turn (${name})</div><div class="prompt">${hint}</div><div class="bar"><i></i></div>`;
        buzz(40);
        const bar = $('.bar i', stage);
        bar.style.transition = `width ${wait}s linear`; requestAnimationFrame(() => requestAnimationFrame(() => bar.style.width = '100%'));
        await sleep(wait * 1000);
        if (my !== stopFlag) break;
        stage.innerHTML = `<div class="speaker">Native ${name}</div><div class="prompt">🔊 ${l.en}</div>`;
        await play(l.audio);
      }
      await sleep(450);
    }
    if (my === stopFlag) { stage.innerHTML = '<div class="prompt">🎉 Well done! Now try with the hints switched off.</div>'; btn.classList.remove('active'); btn.textContent = '🎭 Start role-play'; keepAwake(false); }
  };
  function getDuration(src) {
    return new Promise(r => { const a = new Audio(); a.preload = 'metadata'; a.onloadedmetadata = () => r(a.duration || 3); a.onerror = () => r(3); a.src = src; });
  }

  // ---------- Retell 4/3/2 (90 / 60 / 45 s) ----------
  const ROUNDS = [90, 60, 45];
  let round = 0, retellRec = null, timer = null;
  const rb = $('#retellBtn');
  if (rb) rb.onclick = async () => {
    if (timer) { clearInterval(timer); timer = null; if (retellRec) retellRec.stop(); return; }
    stopAll(); keepAwake(true);
    const secs = ROUNDS[round % 3]; let left = secs;
    const clock = $('#retellClock');
    const finish = () => {
      clearInterval(timer); timer = null; buzz([60, 80, 60]);
      round++; rb.textContent = `⏱ Start retell (${ROUNDS[round % 3]} s)`;
      clock.textContent = round % 3 ? `Done! Now again, faster: ${ROUNDS[round % 3]} s` : '🎉 All 3 rounds done. Notice how much smoother round 3 was.';
      if (retellRec) retellRec.stop();
    };
    if ($('#retellRec').checked) {
      try {
        const n = round % 3 + 1;
        retellRec = await record(url => {
          retellRec = null;
          const a = document.createElement('div');
          a.innerHTML = `<span class="small">Round ${n} (${secs}s)</span><audio controls src="${url}"></audio>`;
          $('#retellTakes').append(a);
        });
      } catch { toast('Mic not available, so the timer runs without recording.'); }
    }
    rb.textContent = '■ Finish early'; buzz(40);
    clock.textContent = `${left}s`;
    timer = setInterval(() => { left--; clock.textContent = `${left}s`; if (left <= 0) finish(); }, 1000);
  };

  // ---------- Remix reveal ----------
  $$('.reveal').forEach(e => e.onclick = () => e.classList.toggle('shown'));

  // ---------- Done / days ----------
  const key = `done:${L.lang}-${L.num}`;
  const done = $('#done');
  done.checked = store.get(key, false);
  const days = store.get('days', []);
  const streakTxt = () => { $('#streak').textContent = days.length ? `🔥 Study days so far: ${days.length}` : ''; };
  streakTxt();
  done.onchange = () => {
    store.set(key, done.checked);
    const today = new Date().toISOString().slice(0, 10);
    if (done.checked && !days.includes(today)) { days.push(today); store.set('days', days); buzz([30, 50, 30]); }
    streakTxt();
  };
})();
