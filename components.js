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
