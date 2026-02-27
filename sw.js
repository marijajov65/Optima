const CACHE = 'optima-v2';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/plan/', '/plan/index.html', '/plan.js', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});
