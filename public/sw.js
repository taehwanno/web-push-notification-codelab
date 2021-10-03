const cacheName = "webtech-pwa";
const precachedResources = [
  // index page
  "/",
  "/favicon.ico",

  // blog page
  "/blog",
  "/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js",
  "/_next/static/chunks/framework-895f067827ebe11ffe45.js",
  "/_next/static/chunks/main-c4f2541b93e4ae8b71f8.js",
  "/_next/static/chunks/pages/_app-036880592104677f92ab.js",
  "/_next/static/chunks/pages/blog-f7dc72116cbfe00f3971.js",
  "https://miro.medium.com/fit/c/140/140/1*M355w-f84DHrZ6L0wxPGeA.jpeg",
  "https://miro.medium.com/fit/c/140/140/1*v9dNxym7pqhE3ifa3FPG3Q@2x.jpeg",
  "https://miro.medium.com/fit/c/140/140/1*M3gpFGW2mq1rHmhxB8VlJA.jpeg",
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
