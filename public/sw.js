const CACHE_NAME = 'fuji-fd-v1.1.0';
const STATIC_CACHE = 'fuji-static-v1.1.0';
const DYNAMIC_CACHE = 'fuji-dynamic-v1.1.0';
const IMAGE_CACHE = 'fuji-images-v1.1.0';

const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/fuji-logo.jpg',
  '/locales/ar/translation.json',
  '/locales/en/translation.json',
  '/manifest.json',
  '/favicon.ico'
];

const CACHE_STRATEGIES = {
  images: {
    cacheName: IMAGE_CACHE,
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  static: {
    cacheName: STATIC_CACHE,
    maxEntries: 100,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  },
  dynamic: {
    cacheName: DYNAMIC_CACHE,
    maxEntries: 30,
    maxAgeSeconds: 24 * 60 * 60 // 1 day
  }
};

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
