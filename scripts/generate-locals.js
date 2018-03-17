const fetch = require('node-fetch');
const fs = require('fs');

async function work() {
  const response = await fetch('https://use.typekit.net/gug4wmv.css');
  const text = await response.text();
  if (!response.ok) {
    throw new Error('Request failed: ' + text);
  }
  let match;
  const preloadMatches = [];
  // Super hack alert. Extracting the first URL (which modern browsers pick)
  // from TypeScript's CSS.
  text.replace(/src:url\("([^"]+)"/g, (ignore, url) => {
    preloadMatches.push(url);
  });
  const locals = {
    "typekitPreload": preloadMatches,
  };
  console.log(locals);
  fs.writeFileSync('./locals-generated.json', JSON.stringify(locals, null, '  '));
}

work();
