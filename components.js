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
