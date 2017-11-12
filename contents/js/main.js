'use strict';

;(function () {

  const topbarNav = document.getElementById('topbar-nav');
  const topbarToggle = document.getElementById('topbar-toggle');

  topbarToggle.addEventListener('click', function () {
    topbarNav.classList.toggle('shown');
  });
  
})();
