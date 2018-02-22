'use strict';

;(function () {

  const topbarNav = document.getElementById('topbar-nav');
  const topbarToggle = document.getElementById('topbar-toggle');

  topbarToggle.addEventListener('click', function () {
    topbarNav.classList.toggle('topbar-nav--is-visible');
  });

})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
