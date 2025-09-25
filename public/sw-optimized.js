const CACHE_NAME = 'fuji-fd-v1.2.0';
const STATIC_CACHE = 'fuji-static-v1.2.0';
const DYNAMIC_CACHE = 'fuji-dynamic-v1.2.0';
const IMAGE_CACHE = 'fuji-images-v1.2.0';

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

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('FUJI FD: Caching critical resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('FUJI FD: Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('FUJI FD: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('FUJI FD: Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Advanced fetch strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(handleStaticRequest(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else if (url.pathname.includes('/api/') || url.pathname.includes('/locales/')) {
    event.respondWith(handleDynamicRequest(request));
  } else {
    event.respondWith(handleDefaultRequest(request));
  }
});

// Image caching strategy - Cache First with WebP support
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Clone and cache the response
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
      
      // Cleanup old entries
      await cleanupCache(IMAGE_CACHE, CACHE_STRATEGIES.images.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    console.log('FUJI FD: Image fetch failed:', error);
    
    // Return a placeholder image for failed requests
    return new Response(
      '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Image not available</text></svg>',
      { 
        headers: { 'Content-Type': 'image/svg+xml' },
        status: 200
      }
    );
  }
}

// Static resources strategy - Stale While Revalidate
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Start network request in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('FUJI FD: Static resource fetch failed:', error);
    return cachedResponse;
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Navigation strategy - Network First with offline fallback
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('FUJI FD: Navigation request failed, serving from cache:', error);
    
    // Try to serve from cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match('/');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Offline fallback page
    return new Response(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FUJI FD - غير متصل</title>
        <style>
          body { 
            font-family: 'Cairo', Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: linear-gradient(135deg, #146FB6 0%, #1e40af 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .offline-icon { font-size: 64px; margin-bottom: 20px; }
          h1 { margin-bottom: 20px; }
          p { margin-bottom: 30px; opacity: 0.9; }
          button { 
            background: #E21E26; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 6px; 
            cursor: pointer; 
            font-size: 16px;
          }
          button:hover { background: #c41e3a; }
        </style>
      </head>
      <body>
        <div class="offline-icon">📡</div>
        <h1>FUJI FD</h1>
        <p>عذراً، لا يمكن الوصول إلى الإنترنت حالياً</p>
        <p>يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى</p>
        <button onclick="window.location.reload()">إعادة المحاولة</button>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 200
    });
  }
}

// Dynamic content strategy - Network First with cache fallback
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      await cleanupCache(DYNAMIC_CACHE, CACHE_STRATEGIES.dynamic.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('FUJI FD: Dynamic request failed, trying cache:', error);
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(JSON.stringify({
      error: 'Content not available offline',
      message: 'المحتوى غير متاح في وضع عدم الاتصال'
    }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      status: 503
    });
  }
}

// Default request handler
async function handleDefaultRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request) || new Response('Service Unavailable', { status: 503 });
  }
}

// Cache cleanup utility
async function cleanupCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
    console.log(`FUJI FD: Cleaned up ${keysToDelete.length} entries from ${cacheName}`);
  }
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('FUJI FD: Performing background sync');
  // Add background sync logic here
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'إشعار جديد من FUJI FD',
    icon: '/fuji-logo.jpg',
    badge: '/fuji-logo.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'عرض التفاصيل',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('FUJI FD', options)
  );
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('FUJI FD: Service Worker loaded successfully');
