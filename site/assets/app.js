// Hearthspeak player — simple: ▶ once, 2× 3× 5× repeats, YouTube speeds, karaoke words, word meanings, pages of 10.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---------- offline + auto-update ----------
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    const sw = document.body.dataset.lang ? new URL('../../sw.js', location.href) : new URL('sw.js', location.href);
    navigator.serviceWorker.register(sw, { updateViaCache: 'none' }).then(r => r.update()).catch(() => {});
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
    try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch {}
  }

  // ---------- sidebar (☰ on phones) + offline button ----------
  const closeNav = () => document.body.classList.remove('nav-open');
  if ($('#navbtn')) $('#navbtn').onclick = () => document.body.classList.toggle('nav-open');
  if ($('#scrim')) $('#scrim').onclick = closeNav;
  $$('.navlesson').forEach(a => { if (store.get('done:' + a.dataset.key, false)) a.classList.add('done'); });
  const here = $('.nav li.here'); if (here) here.scrollIntoView({ block: 'nearest' });
  if ($('#offline')) $('#offline').onclick = async () => {
    const msg = $('#offlineMsg');
    if (!('caches' in window)) { msg.textContent = 'Offline storage not supported here.'; return; }
    msg.textContent = 'Downloading…';
    try {
      const files = await (await fetch('../../files.json', { cache: 'no-store' })).json();
      const c = await caches.open('hs-v3');
      let n = 0;
      for (const f of files) { await c.add('../../' + f).catch(() => {}); msg.textContent = `Saved ${++n}/${files.length}`; }
      msg.textContent = '✓ Saved. Works without internet now.';
    } catch { msg.textContent = 'Could not download (are you offline?).'; }
  };

  const L = window.LESSON;
  if (!L) return;
  store.set('last', { href: location.pathname.split('/').slice(-3).join('/'), title: document.title.replace('Hearthspeak · ', '') });

  // ---------- settings at the top: speed, EN, Aa ----------
  const player = new Audio();
  let rate = store.get('rate2', 1);
  const speed = $('#speed');
  if (speed) {
    speed.value = String(rate);
    speed.onchange = () => { rate = +speed.value; store.set('rate2', rate); player.playbackRate = rate; const ep = $('.epaudio audio'); if (ep) ep.playbackRate = rate; };
  }
  const EN = ['shown', 'blur', 'hidden'], ENL = { shown: 'EN', blur: 'EN 👁', hidden: 'EN ✕' };
  let en = store.get('enMode', 'shown');
  const applyEn = () => { EN.forEach(m => document.body.classList.toggle('en-' + m, m === en)); if ($('#tgEn')) { $('#tgEn').textContent = ENL[en]; $('#tgEn').classList.toggle('on', en === 'shown'); } };
  applyEn();
  if ($('#tgEn')) $('#tgEn').onclick = () => { en = EN[(EN.indexOf(en) + 1) % 3]; store.set('enMode', en); $$('.revealed').forEach(e => e.classList.remove('revealed')); applyEn(); };
  $$('.line .en').forEach(e => e.onclick = () => e.classList.toggle('revealed'));
  let showTr = store.get('showTr', true);
  const applyTr = () => { document.body.classList.toggle('no-tr', !showTr); if ($('#tgTr')) $('#tgTr').classList.toggle('on', showTr); };
  applyTr();
  if ($('#tgTr')) $('#tgTr').onclick = () => { showTr = !showTr; store.set('showTr', showTr); applyTr(); };

  // ---------- karaoke ----------
  const srcIdx = {};
  L.lines.forEach((l, i) => { if (l.audio) srcIdx[l.audio] = i; });
  let raf = 0;
  const clearWords = () => { cancelAnimationFrame(raf); $$('.w.on').forEach(e => e.classList.remove('on')); };
  function karaoke(li) {
    clearWords();
    const line = L.lines[li];
    if (!line || !line.w || !line.w.length) return;
    const spans = $$(`.line[data-i="${li}"] .w`);
    let last = -1;
    const tick = () => {
      const t = player.currentTime * 1000 + 60;
      let k = -1;
      for (let j = 0; j < line.w.length; j++) if (line.w[j] <= t) k = j; else break;
      if (k !== last) { if (spans[last]) spans[last].classList.remove('on'); if (spans[k]) spans[k].classList.add('on'); last = k; }
      if (!player.paused && !player.ended) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  // ---------- audio ----------
  let token = 0;                                   // each new action cancels the previous one
  function play(src, startAt = 0) {
    return new Promise(res => {
      if (!src) return res(0);
      const ep = $('.epaudio audio'); if (ep && !ep.paused) ep.pause();
      player.pause();
      const abs = new URL(src, location.href).href;
      if (player.src === abs && player.readyState > 0) player.currentTime = startAt;
      else { player.src = src; player.load(); if (startAt) player.addEventListener('loadedmetadata', () => { player.currentTime = startAt; }, { once: true }); }
      player.playbackRate = rate;
      player.preservesPitch = true;
      const done = () => { player.onended = player.onerror = null; clearWords(); res(player.duration || 1); };
      player.onended = done; player.onerror = done;
      player.onplaying = () => { player.onplaying = null; if (srcIdx[src] !== undefined) karaoke(srcIdx[src]); };
      player.play().catch(done);
    });
  }
  function stopAll() {
    token++; player.pause(); clearWords();
    $$('.line.playing').forEach(e => e.classList.remove('playing'));
    $$('.line button.rep').forEach(b => { b.textContent = b.dataset.n + '×'; b.classList.remove('active'); });
  }

  // ▶ = play once. Tap again = stop. ⏯ = continue that sentence from where it stopped.
  let resumeAt = null;
  $$('.line button.play').forEach(b => b.onclick = async () => {
    const row = b.closest('.line'), i = +row.dataset.i;
    if (row.classList.contains('playing')) {
      if (!player.paused && player.duration - player.currentTime > 0.3) { resumeAt = { i, t: Math.max(0, player.currentTime - 0.4) }; b.classList.add('resume'); b.querySelector('.lbl').textContent = 'Continue'; }
      stopAll(); return;
    }
    stopAll();
    const from = resumeAt && resumeAt.i === i ? resumeAt.t : 0;
    resumeAt = null; $$('.line button.play.resume').forEach(x => { x.classList.remove('resume'); x.querySelector('.lbl').textContent = 'Play'; });
    const my = token;
    row.classList.add('playing');
    await play(L.lines[i].audio, from);
    if (my === token) row.classList.remove('playing');
  });

  // 2× 3× 5× = play the sentence that many times, with a pause after each to repeat it. Tap again = stop.
  $$('.line button.rep').forEach(b => b.onclick = async () => {
    const row = b.closest('.line'), i = +row.dataset.i, n = +b.dataset.n;
    const was = b.classList.contains('active');
    stopAll(); if (was) return;
    const my = token;
    b.classList.add('active'); row.classList.add('playing');
    for (let k = 1; k <= n && my === token; k++) {
      b.textContent = `${k}/${n}`;
      const d = await play(L.lines[i].audio);
      if (my !== token) return;
      if (k < n) await sleep(Math.max(1200, (d * 1000 / rate) * 1.1));
    }
    if (my === token) { b.classList.remove('active'); b.textContent = n + '×'; row.classList.remove('playing'); }
  });

  // ---------- pages of 10 lines ----------
  (() => {
    const box = $('.listen');
    if (!box) return;
    const PER = 10, kids = [...box.children];
    let count = 0, pending = [];
    for (const el of kids) {
      if (el.classList.contains('line')) { const pg = Math.floor(count / PER); count++; for (const h of pending) h.dataset.page = pg; pending = []; el.dataset.page = pg; }
      else pending.push(el);
    }
    const pages = Math.max(1, Math.ceil(count / PER));
    for (const h of pending) h.dataset.page = pages - 1;
    const label = pg => {
      const sec = kids.find(e => +e.dataset.page === pg && e.classList.contains('section'));
      return `Page ${pg + 1} of ${pages}` + (sec ? ' · ' + sec.querySelector('h3').textContent.replace(/^\d+/, '').trim() : '');
    };
    const mk = () => {
      const n = document.createElement('div'); n.className = 'pager';
      n.innerHTML = `<button class="pprev" aria-label="Previous page">◀</button><select class="psel" aria-label="Choose page">${Array.from({ length: pages }, (_, i) => `<option value="${i}">${label(i)}</option>`).join('')}</select><button class="pnext" aria-label="Next page">▶</button>`;
      return n;
    };
    const top = mk(), bottom = mk();
    box.before(top); box.after(bottom);
    const key = 'page:' + L.lang + L.num;
    let page = Math.min(store.get(key, 0), pages - 1);
    function show(p, scroll) {
      page = Math.max(0, Math.min(pages - 1, p)); store.set(key, page);
      for (const el of kids) el.hidden = +el.dataset.page !== page;
      for (const pg of [top, bottom]) { pg.querySelector('.psel').value = page; pg.querySelector('.pprev').disabled = page === 0; pg.querySelector('.pnext').disabled = page === pages - 1; }
      if (scroll) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    for (const pg of [top, bottom]) {
      pg.querySelector('.pprev').onclick = () => { stopAll(); show(page - 1, true); };
      pg.querySelector('.pnext').onclick = () => { stopAll(); show(page + 1, true); };
      pg.querySelector('.psel').onchange = e => { stopAll(); show(+e.target.value, true); };
    }
    $$('.navtoc a').forEach(a => a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault(); stopAll(); closeNav(); show(+target.dataset.page);
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }));
    let sx = 0, sy = 0;
    box.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    box.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { stopAll(); show(page + (dx < 0 ? 1 : -1), true); }
    }, { passive: true });
    const h = location.hash && $(location.hash);
    show(h && h.dataset.page ? +h.dataset.page : page);
  })();

  // ---------- word meaning: hover (computer) or tap (phone) ----------
  let tip = null;
  const hideTip = () => { if (tip) { tip.remove(); tip = null; } };
  const showTip = w => {
    hideTip();
    tip = document.createElement('div'); tip.className = 'gloss';
    tip.textContent = w.dataset.g;
    document.body.append(tip);
    const r = w.getBoundingClientRect();
    tip.style.left = Math.max(8, Math.min(innerWidth - tip.offsetWidth - 8, r.left + r.width / 2 - tip.offsetWidth / 2)) + 'px';
    tip.style.top = (r.top + scrollY - tip.offsetHeight - 8) + 'px';
  };
  $$('.w[data-g]').forEach(w => {
    w.addEventListener('mouseenter', () => showTip(w));
    w.addEventListener('mouseleave', hideTip);
    w.addEventListener('click', e => { e.stopPropagation(); showTip(w); const t = tip; setTimeout(() => { if (tip === t) hideTip(); }, 4000); });
  });
  document.addEventListener('click', hideTip);
  addEventListener('scroll', hideTip, { passive: true });

  // ---------- whole-lesson player remembers its position ----------
  const ep = $('.epaudio audio');
  if (ep) {
    const k = 'ep:' + L.lang + L.num, saved = store.get(k, 0);
    if (saved > 5) {
      const note = document.createElement('div'); note.className = 'small';
      note.textContent = '⏯ Continues from ' + Math.floor(saved / 60) + ':' + String(Math.floor(saved % 60)).padStart(2, '0');
      ep.after(note); ep.preload = 'metadata';
      ep.addEventListener('loadedmetadata', () => { if (ep.currentTime < 1) ep.currentTime = saved; }, { once: true });
    }
    let last = 0;
    ep.addEventListener('timeupdate', () => { if (Math.abs(ep.currentTime - last) > 3) { last = ep.currentTime; store.set(k, ep.currentTime); } });
    ep.addEventListener('pause', () => store.set(k, ep.currentTime));
    ep.addEventListener('ended', () => store.set(k, 0));
    ep.addEventListener('play', () => stopAll());
    ep.playbackRate = rate;
  }

  // ---------- done ----------
  const key = `done:${L.lang}-${L.num}`, done = $('#done');
  if (done) {
    done.checked = store.get(key, false);
    const days = store.get('days', []);
    const txt = () => { $('#streak').textContent = days.length ? `🔥 Study days so far: ${days.length}` : ''; };
    txt();
    done.onchange = () => {
      store.set(key, done.checked);
      const today = new Date().toISOString().slice(0, 10);
      if (done.checked && !days.includes(today)) { days.push(today); store.set('days', days); }
      txt();
    };
  }
})();
