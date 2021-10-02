const cacheName = "webtech-pwa";
const precachedResources = [
  "/",
  "/favicon.ico",
  "/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js",
  "/_next/static/chunks/framework-895f067827ebe11ffe45.js",
  "/_next/static/chunks/main-c4f2541b93e4ae8b71f8.js",
  "/_next/static/chunks/pages/_app-6d31306c26ba5d775c7a.js",
  "/_next/static/chunks/pages/index-f2319ce09ae3306df5b3.js"
];

self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: event.data.text(),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://developers.google.com/web"));
});

self.addEventListener("install", (event) => {
  console.log("[Service Worker] installed.");

  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precachedResources))
  );
});

self.addEventListener("activate", () => {
  console.log("[Service Worker] activated.");
});

self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetch intercepted for:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request);
    })
  );
});
