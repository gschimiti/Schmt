var cacheName = 'overrun-drawer-cache';
var filesToCache = [
  '/',
  '/portfolio/overrun-drawer/',
  '/portfolio/overrun-drawer/index.html',
  '/assets/css/overrun-drawer.css',
  '/assets/js/overrun-drawer.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
})
