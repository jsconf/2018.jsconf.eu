'use strict';

var ranOnce = false;
function executeEarlyish() {
  if (ranOnce) {
    return;
  }
  ranOnce = true;
  addLink('prefetch', '/news/schedule/');
  addLink('prefetch', '/schedule/');
  pingTypekit();
}

window.addEventListener('load', () => {
  executeEarlyish();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});
setTimeout(executeEarlyish, 500);

function addLink(rel, href) {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
}

function pingTypekit() {
  var url = document.getElementById('typekit')
      .getAttribute('data-tracking-url');
  if (url) {
    new Image().src = url
  }
}
