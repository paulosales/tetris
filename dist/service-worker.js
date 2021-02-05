const cacheName = "tetris-cache-v1";
const initialCachedFiles = [];

self.addEventListener("install", (event) => {
  console.log(`Service worker installed.`);
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(initialCachedFiles);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log(`Service worker activated.`);
  event.waitUntil(
    caches.keys().then((storedCachesNames) => {
      return Promise.all(
        storedCachesNames.map((storedCacheName) => {
          if (storedCacheName !== cacheName) {
            return caches.delete(storedCacheName);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  console.log("fetching " + event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          console.log("fetching from network");
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const cacheableResponse = networkResponse.clone();

          caches.open(cacheName).then((cache) => {
            cache.put(event.request, cacheableResponse);
          });

          return networkResponse;
        });
      })
      .catch((e) => {
        console.error(`fetch for ${event.request} failed.`);
        console.error(e);
      })
  );
});
