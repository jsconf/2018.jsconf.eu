'use strict';

Array.from(document.querySelectorAll('.buy-ticket')).forEach(function(buy) {
  buy.addEventListener('touchstart', preconnectTito, {
    passive: true,
    capture: true,
  });
  buy.onmouseover = preconnectTito;
});

var ranOnce = false;
function executeEarlyish() {
  if (ranOnce) {
    return;
  }
  ranOnce = true;
  track();
  prefetchTito();
  pingTypekit();
}

window.addEventListener('load', () => {
  executeEarlyish();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});
setTimeout(executeEarlyish, 500);

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
  addLink('prefetch', 'https://d2z6c3c3r6k4bx.cloudfront.net/uploads/event/banner/1054103/a33a41ce71c1fe41b39a88c1e37ad6e1.png');
  addLink('prefetch', 'https://d2z6c3c3r6k4bx.cloudfront.net/uploads/event/logo/1054103/46794018cff5e643871986714e1f1676.png');
  preconnectTito();
}

function addLink(rel, href) {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
}

function pingTypekit() {
  new Image().src = document.getElementById('typekit')
      .getAttribute('data-tracking-url');
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
