/* Google Analytics 4 – ganti dengan Measurement ID Anda (G-XXXXXXXXXX) */
var GA_MEASUREMENT_ID = 'G-ZTZ70H3129';

(function ga4() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('G-') !== 0) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname || '/',
    page_title: document.title || ''
  });
})();

/* Global component: inject loader HTML sekali di semua halaman */
(function () {
  var bubbles = '';
  for (var i = 0; i < 10; i++) {
    bubbles += '<span class="page-loader-bubble" aria-hidden="true"></span>';
  }
  var loader = '<div class="page-loader" id="page-loader" aria-hidden="true">' +
    '<div class="page-loader-bubbles">' + bubbles + '</div>' +
    '<div class="page-loader-inner">' +
    '<div class="page-loader-logo-wrap">' +
    '<img src="assets/others/logo-elfest-2026.svg" alt="" class="page-loader-logo" width="280" height="100" />' +
    '</div></div></div>';
  if (document.body) {
    document.body.insertAdjacentHTML('afterbegin', loader);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.insertAdjacentHTML('afterbegin', loader);
    });
  }
})();

/* lozad.js – observe images near viewport */
(function () {
  function initLozad() {
    // If lozad isn't available, fallback: reveal images that were moved to data-src.
    if (typeof window.lozad !== 'function') {
      try {
        var fallbackImgs = document.querySelectorAll('img[data-src]');
        for (var i = 0; i < fallbackImgs.length; i++) {
          var im = fallbackImgs[i];
          if (im.getAttribute('src') && im.getAttribute('src').indexOf('data:image/svg+xml') === 0) {
            im.setAttribute('src', im.getAttribute('data-src'));
          }
        }
      } catch (e) {}
      return;
    }

    var observer = window.lozad('.lozad', { rootMargin: '200px 0px', threshold: 0.1 });
    window.__elfestLozadObserver = observer;

    var raf = 0;
    function refresh() {
      if (!observer) return;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        try { observer.observe(); } catch (e) {}
      });
    }
    window.elfestLozadRefresh = refresh;

    // Observe current + future nodes (navbar/footer injected later, etc.)
    refresh();
    try {
      var mo = new MutationObserver(function () { refresh(); });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}

    // Safety net: if anything is still placeholder after a bit, reveal it.
    // Prevents "all images blank" when CDN/observer fails in production.
    setTimeout(function () {
      try {
        var stuck = document.querySelectorAll('img[data-src]');
        for (var i = 0; i < stuck.length; i++) {
          var im2 = stuck[i];
          var s2 = im2.getAttribute('src') || '';
          if (s2.indexOf('data:image/svg+xml') === 0) {
            im2.setAttribute('src', im2.getAttribute('data-src'));
          }
        }
      } catch (e) {}
    }, 2500);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLozad);
  } else {
    initLozad();
  }
})();
