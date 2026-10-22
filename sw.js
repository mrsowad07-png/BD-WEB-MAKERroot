// Web Maker – notification service worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) {
        try { await c.focus(); if ('navigate' in c) await c.navigate(url); } catch (err) {}
        return;
      }
    }
    if (self.clients.openWindow) await self.clients.openWindow(url);
  })());
});
