/* Service Worker: cache assets & partials agar repeat visit ringan & smooth */
const CACHE_NAME = "elfest-v3";

const STATIC_URLS = [
  "/",
  "/index.html",
  "/line-up.html",
  "/gallery.html",
  "/about.html",
  "/history.html",
  "/contact.html",
  "/navbar.html",
  "/footer.html",
  "/script.js",
  "/flip.min.css",
  "/flip.min.js",
  "/style.css",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache
          .addAll(STATIC_URLS.map((u) => new Request(u, { cache: "reload" })))
          .catch(() => {});
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", function (e) {
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;

  const path = u.pathname;
  const isNav = e.request.mode === "navigate";
  const isHtml = path === "/" || path.endsWith(".html");

  // HTML navigations: stale-while-revalidate
  if (isNav || isHtml) {
    e.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(e.request, { ignoreSearch: true });

        const fetchPromise = fetch(e.request)
          .then((res) => {
            if (res && res.ok && res.type === "basic") {
              cache.put(e.request, res.clone());
            }
            return res;
          })
          .catch(() => null);

        // If we have cached HTML, serve it immediately and refresh in background.
        if (cached) {
          fetchPromise.catch(() => {});
          return cached;
        }

        // First visit: go network, otherwise fallback.
        const net = await fetchPromise;
        return (
          net ||
          (await cache.match("/index.html")) ||
          (await caches.match("/index.html"))
        );
      })(),
    );
    return;
  }

  if (
    /\.(png|jpg|jpeg|webp|gif|svg|ico|css|js|woff2?|ttf)$/i.test(path) ||
    path.endsWith("navbar.html") ||
    path.endsWith("footer.html")
  ) {
    e.respondWith(
      caches.match(e.request).then(function (cached) {
        if (cached) return cached;
        return fetch(e.request).then(function (res) {
          if (res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
          }
          return res;
        });
      }),
    );
  }
});
