'use strict';

;(function () {

  const topbarNav = document.getElementById('topbar-nav');
  const topbarToggle = document.getElementById('topbar-toggle');

  topbarToggle.addEventListener('click', function () {
    topbarNav.classList.toggle('topbar-nav--is-visible');
  });

  Array.from(document.querySelectorAll('.buy-ticket')).forEach(function(buy) {
    buy.addEventListener('touchstart', preconnectTito, {
      passive: true,
      capture: true,
    });
    buy.onmouseover = preconnectTito;
  });
})();


window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  track();
  prefetchTito();
});

function preconnectTito() {
  addLink('preconnect', 'https://ti.to');
  addLink('preconnect', 'https://use.typekit.com');
  addLink('preconnect', 'https://d2z6c3c3r6k4bx.cloudfront.net');
  addLink('preconnect', 'https://titoproduction.global.ssl.fastly.net');
  addLink('preconnect', 'https://maps.googleapis.com');
}

function prefetchTito() {
  // Only do this before the event
  if (Date.now() > new Date('2018-07-01').getTime()) {
    return;
  }
  addLink('prefetch', 'https://ti.to/jsconfeu/jsconf-eu-2018');
  addLink('prefetch', 'https://js.stripe.com/v2/');
  addLink('prefetch', 'https://use.typekit.com/zjo8qhc.js');
}

function addLink(rel, href) {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
}

var _gauges = _gauges || [];
function track() {
  var t   = document.createElement('script');
  t.id    = 'gauges-tracker';
  t.setAttribute('data-site-id', '50570251f5a1f57282000003');
  t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
  t.src = 'https://d36ee2fcip1434.cloudfront.net/track.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);
}
