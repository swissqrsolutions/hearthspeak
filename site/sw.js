// Service worker: pages/css/js are network-first (updates arrive), audio is cache-first; all work offline.
// Handles HTTP Range requests so audio seeking/scrubbing works from the offline cache.
const CACHE = 'lw-v1';
const isAudio = u => u.split('?')[0].endsWith('.mp3');
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

async function rangeResponse(res, range) {
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  const size = buf.byteLength;
  let start = m[1] ? +m[1] : size - +m[2];
  let end = m[1] && m[2] ? +m[2] : size - 1;
  if (!m[1]) end = size - 1;
  start = Math.max(0, start); end = Math.min(size - 1, end);
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const url = req.url.split('#')[0];
    let hit = await c.match(url, { ignoreSearch: true });
    if (!isAudio(url)) {            // pages, css, js: network first so updates arrive, cache as fallback
      try { const res = await fetch(url, { cache: 'no-cache' }); if (res.ok) { await c.put(url, res.clone()); return res; } } catch {}
      if (hit) return hit;
    }
    if (!hit) {
      try {
        const res = await fetch(url);            // full fetch (no Range) so the cache holds the whole file
        if (res.ok && res.status === 200) { await c.put(url, res.clone()); hit = res; }
        else return res;
      } catch { return Response.error(); }
    }
    const range = req.headers.get('range');
    return range ? rangeResponse(hit.clone(), range) : hit;
  })());
});
