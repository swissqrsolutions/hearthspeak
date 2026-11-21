// Hearthspeak self-test: run on a lesson page (it is NOT loaded by the app). Mutes audio while testing.
// usage from devtools/automation: await (await import('../../assets/selftest.js')).run()
export async function run() {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const res = [], ok = (name, pass, info = '') => res.push(`${pass ? 'PASS' : 'FAIL'} ${name}${info ? ' — ' + info : ''}`);
  const errors = []; const onErr = e => errors.push(e.message || String(e.reason)); addEventListener('error', onErr); addEventListener('unhandledrejection', onErr);
  const P = HTMLMediaElement.prototype, op = P.play; let plays = 0, el = null;
  P.play = function () { plays++; el = this; this.muted = true; return op.call(this); };
  const visible = () => $$('.listen .line').filter(e => !e.hidden);
  const L = window.LESSON, total = L.lines.length, pages = Math.ceil(total / 10);
  try {
    // pagination
    const sel = $('.psel');
    ok('pager exists (top+bottom)', $$('.pager').length === 2);
    ok('page count', sel && sel.options.length === pages, `${sel && sel.options.length} vs ${pages}`);
    sel.value = 0; sel.dispatchEvent(new Event('change')); await sleep(100);
    ok('page 1 shows lines 1-10', visible().map(e => +e.dataset.i).join() === [...Array(Math.min(10, total)).keys()].join());
    $('.pnext').click(); await sleep(100);
    ok('next → lines 11-20', +visible()[0].dataset.i === 10 && $('.psel').value === '1');
    $('.pprev').click(); await sleep(100);
    ok('prev → page 1', $('.psel').value === '0' && $('.pprev').disabled);
    sel.value = pages - 1; sel.dispatchEvent(new Event('change')); await sleep(100);
    ok('last page', visible().length === total - (pages - 1) * 10 && $('.pnext').disabled);
    ok('both pagers in sync', $$('.psel').every(s => s.value === String(pages - 1)));
    // sidebar
    $('#navbtn').click(); await sleep(50);
    ok('☰ opens drawer', document.body.classList.contains('nav-open') || innerWidth >= 1100);
    const links = $$('.navtoc a'), mid = links.filter(a => a.getAttribute('href').startsWith('#s-'))[Math.floor(links.length / 2)];
    mid.click(); await sleep(150);
    const target = $(mid.getAttribute('href'));
    ok('scene link opens its page', !target.hidden && $('.psel').value === target.dataset.page, mid.textContent.trim());
    ok('drawer closes after jump', !document.body.classList.contains('nav-open'));
    const lessons = $$('.navlesson');
    let reach = 0; for (const a of lessons) { const r = await fetch(a.href, { cache: 'no-store' }); if (r.ok) reach++; }
    ok('every lesson link opens', reach === lessons.length, `${reach}/${lessons.length}`);
    ok('current lesson marked', $$('.nav li.here').length === 1);
    // play / stop / continue
    sel.value = 0; sel.dispatchEvent(new Event('change')); await sleep(100);
    const row = visible().find(r => (L.lines[+r.dataset.i].w || []).length > 3) || visible()[0];
    const pb = row.querySelector('button.play');
    plays = 0; pb.click(); await sleep(1200);
    ok('▶ plays the sentence', plays === 1 && row.classList.contains('playing') && el && !el.paused);
    ok('karaoke highlights a word', !!row.querySelector('.w.on') || !(L.lines[+row.dataset.i].w || []).length);
    const tStop = el.currentTime; pb.click(); await sleep(150);
    ok('tap again stops', el.paused && !row.classList.contains('playing'));
    ok('shows Continue', pb.classList.contains('resume') && pb.textContent.includes('Continue'));
    pb.click(); await sleep(400);
    ok('Continue resumes near the stop point', Math.abs(el.currentTime - tStop) < 1.2, `${tStop.toFixed(2)} → ${el.currentTime.toFixed(2)}`);
    pb.click(); await sleep(100);
    // 2× repeats
    const rb = row.querySelector('button.rep[data-n="2"]');
    plays = 0; rb.click();
    const dur = el.duration && isFinite(el.duration) ? el.duration : 4;
    await sleep((dur * 3.3 + 3) * 1000);
    ok('2× plays twice then stops', plays === 2 && !rb.classList.contains('active') && rb.textContent === '2×', `plays=${plays}`);
    // speed, EN, Aa
    const sp = $('#speed'); sp.value = '1.5'; sp.dispatchEvent(new Event('change'));
    ok('speed saved', JSON.parse(localStorage.getItem('rate2')) === 1.5);
    sp.value = '1'; sp.dispatchEvent(new Event('change'));
    const en = $('#tgEn'); en.click(); ok('EN → blur', document.body.classList.contains('en-blur')); en.click(); ok('EN → hidden', document.body.classList.contains('en-hidden')); en.click(); ok('EN → shown', document.body.classList.contains('en-shown'));
    const tr = $('#tgTr'); tr.click(); const off = document.body.classList.contains('no-tr'); tr.click(); ok('Aa toggles Latin line', off && !document.body.classList.contains('no-tr'));
    // data
    ok('every line has audio', L.lines.every(l => l.audio), `${L.lines.filter(l => !l.audio).length} missing`);
    ok('every line has word timings', L.lines.every(l => (l.w || []).length), `${L.lines.filter(l => !(l.w || []).length).length} missing`);
    // word meanings
    const words = $$('.w'), glossed = $$('.w[data-g]');
    const pct = words.length ? Math.round(100 * glossed.length / words.length) : 0;
    ok('word meanings present', pct >= 95 || location.pathname.includes('/arabic/'), `${glossed.length}/${words.length} (${pct}%)`);
    if (glossed.length) {
      const w = glossed.find(x => !x.closest('.line').hidden) || glossed[0];
      w.dispatchEvent(new MouseEvent('mouseenter')); await sleep(50);
      const tip = $('.gloss');
      ok('hover shows the meaning', !!tip && tip.textContent === w.dataset.g, tip ? tip.textContent : 'no bubble');
      w.dispatchEvent(new MouseEvent('mouseleave')); await sleep(30);
      ok('meaning hides on leave', !$('.gloss'));
      w.click(); await sleep(50);
      ok('tap shows the meaning (phone)', !!$('.gloss'));
      document.body.click(); await sleep(30);
    }
    ok('no element wider than the screen', document.documentElement.scrollWidth <= innerWidth + 1);
    const small = $$('.line:not([hidden]) .ctl button').filter(b => b.getBoundingClientRect().height < 44);
    ok('tap targets ≥ 44px', small.length === 0, `${small.length} small`);
  } catch (e) { ok('test crashed', false, e.message); }
  P.play = op; removeEventListener('error', onErr); removeEventListener('unhandledrejection', onErr);
  ok('no JavaScript errors', errors.length === 0, errors.join(' | '));
  return { lesson: document.title, passed: res.filter(r => r.startsWith('PASS')).length, failed: res.filter(r => r.startsWith('FAIL')), all: res };
}
