// Hearthspeak player — simple: ▶ once, 2× 3× 5× repeats, YouTube speeds, karaoke words, word meanings, pages of 10.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---------- install as an app (Android/Chrome shows a real Install button; iPhone gets a hint) ----------
  (() => {
    const installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (installed || store.get('installDismissed', false)) return;
    const bar = document.createElement('div');
    bar.className = 'installbar';
    bar.innerHTML = '<span><b>Install Hearthspeak</b><br><small>Open it from your home screen, works offline.</small></span><button class="go" type="button">Install</button><button class="x" type="button" aria-label="Not now">✕</button>';
    const show = how => { if (how === 'hint') bar.querySelector('.go').textContent = /iphone|ipad/i.test(navigator.userAgent) ? 'Share → Add to Home Screen' : 'Menu ⋮ → Add to Home screen'; document.body.append(bar); };
    let evt = null;
    addEventListener('beforeinstallprompt', e => { e.preventDefault(); evt = e; if (!bar.isConnected) show('prompt'); });
    setTimeout(() => { if (!evt && !bar.isConnected && /android|iphone|ipad/i.test(navigator.userAgent)) show('hint'); }, 3000);
    bar.querySelector('.go').onclick = async () => { if (!evt) return; evt.prompt(); await evt.userChoice; evt = null; bar.remove(); };
    bar.querySelector('.x').onclick = () => { store.set('installDismissed', true); bar.remove(); };
    addEventListener('appinstalled', () => bar.remove());
  })();

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
  const openNav = expandCurrent => {
    $$('.nav li.open').forEach(li => li.classList.toggle('open', false));
    const here = $('.nav li.here');
    if (expandCurrent && here) {
      here.classList.add('open');
      $$('.navgroup.open').forEach(g => g.classList.toggle('open', false));
      const curLi = $('.navtoc li.cur'), g = curLi ? curLi.closest('.navgroup') : $('.navgroup');
      if (g) g.classList.add('open');
    }
    document.body.classList.add('nav-open');
    document.body.classList.toggle('nav-lesson', !!expandCurrent);
    syncDrill();
    const cur = expandCurrent && $('.navtoc li.cur');
    requestAnimationFrame(() => (cur || $('.navhead')).scrollIntoView({ block: expandCurrent ? 'center' : 'start' }));
  };
  if ($('#navbtn')) $('#navbtn').onclick = () => document.body.classList.contains('nav-open') ? closeNav() : openNav(true);
  // under every lesson in the menu: the scene you last used there
  $$('.navlesson').forEach(a => { const last = store.get('lastsec:' + a.dataset.key, ''); if (last) { const d = document.createElement('small'); d.className = 'navlast'; d.textContent = 'Last: ' + last; a.querySelector('span').append(d); } });
  // drill-down: an open chapter hides the other chapters; tapping its title goes back to all chapters
  function syncDrill() { const t = $('.navtoc'); if (t) t.classList.toggle('drill', !!$('.navgroup.open')); }
  $$('.navch').forEach(b => b.addEventListener('click', () => {
    const g = b.closest('.navgroup'), was = g.classList.contains('open');
    $$('.navgroup.open').forEach(x => x.classList.toggle('open', false));
    if (!was) g.classList.add('open');
    syncDrill();
  }));
  // tapping the lesson you are in just expands/collapses its scenes
  $$('.nav li.here > .navlesson').forEach(a => a.addEventListener('click', e => { e.preventDefault(); a.parentElement.classList.toggle('open'); }));
  // logo = home: phone opens the lesson menu; big screens (menu always visible) go to the top
  if ($('#brand')) $('#brand').onclick = () => openNav(false);
  if ($('#scrim')) $('#scrim').onclick = closeNav;
  // dark / light: follows the phone until you choose; your choice is remembered
  const isDark = () => (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  if ($('#theme')) $('#theme').onclick = () => { const t = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = t; store.set('theme', t); };
  const here = $('.nav li.here'); if (here) here.scrollIntoView({ block: 'nearest' });
  // Save for offline: only downloads what is new or changed; removes outdated audio
  if ($('#offline')) $('#offline').onclick = async () => {
    const msg = $('#offlineMsg'), btn = $('#offline');
    if (!('caches' in window)) { msg.textContent = 'Offline storage not supported here.'; return; }
    btn.disabled = true; msg.textContent = 'Checking…';
    try {
      const base = new URL('../../', location.href).href;
      const files = await (await fetch(base + 'files.json', { cache: 'no-store' })).json();
      const c = await caches.open('hs-v3');
      const wanted = new Set(files.map(f => base + f));
      let added = 0, kept = 0, failed = 0, i = 0;
      for (const f of files) {
        const url = base + f, isAudio = f.split('?')[0].endsWith('.mp3');
        i++;
        if (isAudio && await c.match(url)) { kept++; }
        else {
          try { const r = await fetch(url, { cache: 'no-store' }); if (r.ok) { await c.put(url, r); added++; } else failed++; } catch { failed++; }
        }
        if (i % 20 === 0 || i === files.length) msg.textContent = `Checking ${i}/${files.length} · ${added} downloaded`;
      }
      let removed = 0;   // drop audio from older versions that the app no longer uses
      for (const req of await c.keys()) if (req.url.split('?')[0].endsWith('.mp3') && !wanted.has(req.url)) { await c.delete(req); removed++; }
      msg.textContent = `✓ Done: ${added} downloaded, ${kept} already saved${removed ? ', ' + removed + ' old removed' : ''}${failed ? ', ' + failed + ' failed (try again)' : ''}. Works offline.`;
    } catch { msg.textContent = 'Could not check (are you offline?).'; }
    btn.disabled = false;
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

  // ---------- one scene per page (long scenes split into balanced parts of at most 20 sentences) ----------
  (() => {
    const box = $('.listen');
    if (!box) return;
    const MAX = 20, kids = [...box.children];
    // group: [headings…, lines…] per scene; a chapter title belongs to the scene that follows it
    const scenes = []; let cur = null, pending = [];
    for (const el of kids) {
      if (el.classList.contains('section')) { cur = { head: [...pending, el], lines: [], title: el.querySelector('h3').textContent.trim(), n: scenes.length + 1 }; scenes.push(cur); pending = []; }
      else if (el.classList.contains('line')) { if (!cur) { cur = { head: pending, lines: [], title: '', n: 1 }; scenes.push(cur); pending = []; } cur.lines.push(el); }
      else if (cur && !cur.lines.length && !el.classList.contains('chapter')) cur.head.push(el);   // scene caption under its title
      else if (cur && el.classList.contains('scenecap')) cur.lines.push(el);                       // later captions stay in place
      else pending.push(el);
    }
    if (pending.length && scenes.length) scenes[scenes.length - 1].lines.push(...pending);
    const pagesArr = [];
    for (const sc of scenes) {
      const spoken = sc.lines.filter(e => e.classList.contains('line')).length;
      const parts = Math.max(1, Math.ceil(spoken / MAX)), per = Math.ceil(spoken / parts);
      let part = 0, count = 0, bucket = [...sc.head];
      for (const el of sc.lines) {
        if (el.classList.contains('line')) { if (count === per && part < parts - 1) { pagesArr.push({ sc, part, parts, els: bucket }); part++; count = 0; bucket = []; } count++; }
        bucket.push(el);
      }
      pagesArr.push({ sc, part, parts, els: bucket });
    }
    pagesArr.forEach((p, i) => p.els.forEach(el => { el.dataset.page = i; }));
    const pages = pagesArr.length;
    const label = i => { const p = pagesArr[i]; return `Scene ${p.sc.n} · ${p.sc.title}` + (p.parts > 1 ? ` (${p.part + 1}/${p.parts})` : ''); };
    const mk = () => {
      const n = document.createElement('div'); n.className = 'pager';
      n.innerHTML = `<button class="pprev" aria-label="Previous scene">◀</button><select class="psel" aria-label="Choose scene">${pagesArr.map((_, i) => `<option value="${i}">${label(i)}</option>`).join('')}</select><button class="pnext" aria-label="Next scene">▶</button>`;
      return n;
    };
    const top = mk(), bottom = mk();
    top.classList.add('ptop'); bottom.classList.add('pbottom');
    box.before(top); box.after(bottom);
    const key = 'scenepage:' + L.lang + L.num;
    let page = Math.min(store.get(key, 0), pages - 1);
    function show(p, scroll) {
      page = Math.max(0, Math.min(pages - 1, p)); store.set(key, page);
      for (const el of kids) el.hidden = +el.dataset.page !== page;
      for (const pg of [top, bottom]) { pg.querySelector('.psel').value = page; pg.querySelector('.pprev').disabled = page === 0; pg.querySelector('.pnext').disabled = page === pages - 1; }
      const nb = bottom.querySelector('.pnext');
      nb.textContent = page < pages - 1 ? 'Next: ' + label(page + 1).replace(/^Scene \d+ · /, '') + ' ›' : 'End of the lesson';
      if (scroll) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const sec = pagesArr[page].sc.head.find(e => e.classList.contains('section'));
      $$('.navtoc li.cur').forEach(li => li.classList.toggle('cur', false));
      if (sec) {
        store.set('lastsec:' + L.lang + '-' + L.num, pagesArr[page].sc.title);
        const link = $('.navtoc a[href="#' + sec.id + '"]'); if (link) link.parentElement.classList.add('cur');
      }
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
      requestAnimationFrame(() => top.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }));
    let sx = 0, sy = 0;
    box.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    box.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { stopAll(); show(page + (dx < 0 ? 1 : -1), true); }
    }, { passive: true });
    window.__pages = pagesArr.map(p => p.els.filter(e => e.classList.contains('line')).length);
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

  // ---------- progress per scene ----------
  // migrate the old lesson-wide tick (done:<lesson> = true) into "all scenes of that lesson done"
  $$('.navlesson').forEach(a => {
    const k = a.dataset.key, t = +a.dataset.total || 0;
    if (t && store.get('done:' + k, false) === true && !store.get('migrated:' + k, false)) {
      const set = new Set(store.get('scenes:' + k, []));
      for (let n = 1; n <= t; n++) set.add('s-' + n);
      store.set('scenes:' + k, [...set]);
      store.set('migrated:' + k, true);
    }
  });
  // scene ids are the section anchors (#s-1, #s-2 …); progress is kept per lesson
  const pkey = k => 'scenes:' + k;
  const myKey = L.lang + '-' + L.num;
  const doneSet = () => new Set(store.get(pkey(myKey), []));
  const sceneOfPage = () => { const v = $$('.section').find(x => x.offsetParent !== null) || $$('.section').filter(x => +x.dataset.page <= +($('.psel') || {}).value).pop(); return v ? v.id : null; };
  function paintProgress() {
    const set = doneSet();
    $$('.navtoc a').forEach(a => a.parentElement.classList.toggle('donesc', set.has(a.getAttribute('href').slice(1))));
    $$('.navlesson').forEach(a => {
      const n = new Set(store.get(pkey(a.dataset.key), [])).size, t = +a.dataset.total || 0;
      a.classList.toggle('done', t > 0 && n >= t);
      let p = a.querySelector('.navprog');
      if (!p) { p = document.createElement('small'); p.className = 'navprog'; a.querySelector('span').append(p); }
      p.textContent = n ? `${n}/${t} scenes done` : '';
    });
    const btn = $('#scenedone'), id = sceneOfPage();
    if (btn && id) { const d = set.has(id); btn.classList.toggle('on', d); btn.textContent = d ? '✓ Scene done (tap to undo)' : 'Mark scene as done'; }
    const days = store.get('days', []);
    if ($('#streak')) $('#streak').textContent = days.length ? `Study days so far: ${days.length}` : '';
  }
  if ($('#scenedone')) $('#scenedone').onclick = () => {
    const id = sceneOfPage(); if (!id) return;
    const set = doneSet();
    if (set.has(id)) set.delete(id); else {
      set.add(id);
      const today = new Date().toISOString().slice(0, 10), days = store.get('days', []);
      if (!days.includes(today)) { days.push(today); store.set('days', days); }
    }
    store.set(pkey(myKey), [...set]);
    paintProgress();
  };
  // repaint whenever the scene changes
  $$('.psel').forEach(sl => sl.addEventListener('change', () => setTimeout(paintProgress, 0)));
  $$('.pnext,.pprev').forEach(bt => bt.addEventListener('click', () => setTimeout(paintProgress, 0)));
  $$('.navtoc a').forEach(a => a.addEventListener('click', () => setTimeout(paintProgress, 0)));
  paintProgress();
})();
