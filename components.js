/* Global component: inject loader HTML sekali di semua halaman */
(function () {
  var loader = '<div class="page-loader" id="page-loader" aria-hidden="true">' +
    '<div class="page-loader-inner">' +
    '<img src="assets/others/logo-elfest-2026.svg" alt="" class="page-loader-logo" width="280" height="100" />' +
    '<div class="page-loader-shimmer"></div>' +
    '</div></div>';
  if (document.body) {
    document.body.insertAdjacentHTML('afterbegin', loader);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.insertAdjacentHTML('afterbegin', loader);
    });
  }
})();
