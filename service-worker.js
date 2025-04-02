// service-worker.js

// Install step (fires when app is first loaded or updated)
self.addEventListener('install', event => {
  console.log('✅ Service Worker: Installed');
  self.skipWaiting(); // Optional: activate immediately
});

// Activate step (usually follows install)
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activated');
});

// Fetch handling (optional, for offline later)
self.addEventListener('fetch', event => {
  // For now, just let network handle all requests
  return;
});
