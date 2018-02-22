importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');

// Uncomment for debugging
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.routing.registerRoute(
  // Cache typekit bootstrap and font files
  /^https:\/\/use.typekit\.net\/.+$/,
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'typekit-cache',
    plugins: [
      // Allow opaque responses
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200] // YOLO
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // Cache immutable files forever
  /\/immutable\//,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    cacheName: 'immutable-file-cache',
  })
);
