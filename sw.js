/* CityPulse Service Worker — App Shell Cache */
const CACHE_NAME = 'citypulse-v3';

// Files to cache for offline app shell
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
];

// External CDN assets to cache on first fetch
const CDN_PATTERNS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'unpkg.com/leaflet',
];

/* ---- Install: cache app shell ---- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

/* ---- Activate: clean old caches ---- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ---- Fetch: cache-first for shell + CDN, network-first for API ---- */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Network-only for Nominatim (geocoding) and any /api/ calls
  if (url.hostname.includes('nominatim') || url.pathname.startsWith('/api/')) {
    return; // fall through to network
  }

  // Cache-first for app shell and CDN assets
  const isCDN = CDN_PATTERNS.some(p => request.url.includes(p));
  const isShell = url.origin === self.location.origin;

  if (isShell || isCDN) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          // Cache successful responses (not opaque)
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // Offline fallback: return cached index.html for navigation
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});
