// Cache-first service worker: everything you open (or "Save for offline") works without internet.
// Handles HTTP Range requests so audio seeking/scrubbing works from the offline cache.
const CACHE = 'lw-v1';
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
