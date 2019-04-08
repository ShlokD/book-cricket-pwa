self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('cricket-pwa').then(cache => {
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css'
      ]);
    })
      .catch(error => {
        console.log('error while opening cache', error);
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
