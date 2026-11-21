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
    navigator.serviceWorker.register(sw).catch(() => {});
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
        const c = await caches.open('lw-v1');
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

  function play(src) {
    return new Promise(res => {
      if (!src) return res(0);
      player.pause();
      player.src = src;
      player.playbackRate = rate;
      player.preservesPitch = true;
      const done = () => { player.onended = player.onerror = null; res(player.duration || 1); };
      player.onended = done; player.onerror = done;
      player.play().catch(done);
    });
  }
  function stopAll() {
    stopFlag++; player.pause(); keepAwake(false);
    $$('.playing').forEach(e => e.classList.remove('playing'));
    $$('button.active').forEach(b => b.classList.remove('active'));
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
  tg('#tgLit', 'lit', false, 'showLit');

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

  const GAPS = [0, 1, 1.5, 2], GAPL = { 0: 'off', 1: '1×', 1.5: '1.5×', 2: '2×' };
  let gap = store.get('gap', 0);
  const applyGap = () => { $('#gap').textContent = `⏸ Pause: ${GAPL[gap]}`; $('#gap').classList.toggle('on', gap > 0); };
  applyGap();
  $('#gap').onclick = () => { gap = GAPS[(GAPS.indexOf(gap) + 1) % GAPS.length]; store.set('gap', gap); applyGap(); };

  // ---------- Per-line play / loop ----------
  const lineEl = i => $(`.line[data-i="${i}"]`);
  $$('button.play, button.chip').forEach(b => b.onclick = async () => {
    stopAll();
    const row = b.closest('.line'); if (row) row.classList.add('playing');
    await play(b.dataset.src);
    if (row) row.classList.remove('playing');
  });
  $$('button.loop').forEach(b => b.onclick = async () => {
    const was = b.classList.contains('active');
    stopAll(); if (was) return;
    b.classList.add('active'); keepAwake(true);
    const my = stopFlag, i = +b.dataset.i, row = lineEl(i);
    while (my === stopFlag) {
      row.classList.add('playing');
      const d = await play(L.lines[i].audio);
      row.classList.remove('playing');
      if (my !== stopFlag) break;
      buzz(25);
      await sleep(Math.max(1500, d * 1000 * 1.3 / rate)); // your turn to shadow
    }
  });

  // ---------- Play all (+ lock-screen controls) ----------
  let cur = 0;
  async function playFrom(start) {
    stopAll(); const b = $('#playAll'); b.classList.add('active'); b.textContent = '■ Stop'; keepAwake(true);
    const my = stopFlag;
    for (cur = start; cur < L.lines.length && my === stopFlag; cur++) {
      const row = lineEl(cur); row.classList.add('playing'); row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const d = await play(L.lines[cur].audio); row.classList.remove('playing');
      if (my !== stopFlag) return;
      if (gap) { buzz(25); await sleep(d * 1000 * gap / rate + 600); } else await sleep(450);
    }
    if (my === stopFlag) { b.classList.remove('active'); b.textContent = '▶ Play all'; keepAwake(false); }
  }
  $('#playAll').onclick = () => {
    if ($('#playAll').classList.contains('active')) { stopAll(); $('#playAll').textContent = '▶ Play all'; return; }
    playFrom(0);
  };
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: document.title, artist: 'Hearthspeak' });
      navigator.mediaSession.setActionHandler('nexttrack', () => playFrom(Math.min(cur + 1, L.lines.length - 1)));
      navigator.mediaSession.setActionHandler('previoustrack', () => playFrom(Math.max(cur - 1, 0)));
      navigator.mediaSession.setActionHandler('seekbackward', () => { player.currentTime = Math.max(0, player.currentTime - 5); });
    } catch {}
  }

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
  $('#rpStart').onclick = async () => {
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
