/* Service Worker: cache assets & partials agar repeat visit ringan & smooth */
const CACHE_NAME = 'elfest-v1';

const STATIC_URLS = [
  '/navbar.html',
  '/footer.html',
  '/script.js',
  '/flip.min.css',
  '/flip.min.js',
  '/style.css'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_URLS.map(u => new Request(u, { cache: 'reload' }))).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function (e) {
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;

  const path = u.pathname;
  const isNav = e.request.mode === 'navigate';

  if (isNav) {
    e.respondWith(
      fetch(e.request).then(r => r).catch(() => caches.match(e.request).then(m => m || caches.match('/index.html')))
    );
    return;
  }

  if (/\.(png|jpg|jpeg|webp|gif|svg|ico|css|js|woff2?|ttf)$/i.test(path) || path.endsWith('navbar.html') || path.endsWith('footer.html')) {
    e.respondWith(
      caches.match(e.request).then(function (cached) {
        if (cached) return cached;
        return fetch(e.request).then(function (res) {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
          }
          return res;
        });
      })
    );
  }
});
