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

/* lozad.js – safe mode (does NOT replace src) */
(function () {
  function supportsWebp(cb) {
    try {
      var img = new Image();
      img.onload = function () { cb(img.width === 1); };
      img.onerror = function () { cb(false); };
      img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA='; // 1px
    } catch (e) { cb(false); }
  }

  function trySwapToWebp() {
    supportsWebp(function (ok) {
      if (!ok) return;
      try {
        var imgs = document.querySelectorAll('img[src$=\".svg\"]');
        for (var i = 0; i < imgs.length; i++) {
          var el = imgs[i];
          if (el.hasAttribute('data-no-webp')) continue;
          var src = el.getAttribute('src');
          if (!src) continue;
          var webp = src.replace(/\\.svg(\\?.*)?$/, '.webp$1');
          if (webp === src) continue;
          // Swap optimistically; revert if webp doesn't exist
          (function (imgEl, orig, next) {
            var test = new Image();
            test.onload = function () { imgEl.setAttribute('src', next); };
            test.onerror = function () { /* keep svg */ };
            test.src = next;
          })(el, src, webp);
        }
      } catch (e) {}
    });
  }

  function safeEnhanceImages() {
    try {
      var imgs = document.querySelectorAll('img[src]');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var src = img.getAttribute('src');
        if (!src || src.indexOf('data:') === 0) continue;

        // Keep above-the-fold/critical images as-is
        var isEager = img.hasAttribute('data-eager') || img.getAttribute('fetchpriority') === 'high';
        if (!isEager) {
          if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
          if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
          if (!img.getAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'low');
        }

        // Lozad expects data-src. We set it but DO NOT remove src.
        if (!img.classList.contains('lozad')) img.classList.add('lozad');
        if (!img.getAttribute('data-src')) img.setAttribute('data-src', src);
      }
    } catch (e) {}
  }

  function initLozad() {
    trySwapToWebp();
    safeEnhanceImages();
    if (typeof window.lozad !== 'function') return;
    var observer = window.lozad('.lozad', { rootMargin: '200px 0px', threshold: 0.1 });
    observer.observe();

    // Re-observe when navbar/footer/components are injected later.
    try {
      var mo = new MutationObserver(function () {
        trySwapToWebp();
        safeEnhanceImages();
        try { observer.observe(); } catch (e) {}
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLozad);
  } else {
    initLozad();
  }
})();
