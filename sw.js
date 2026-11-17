const CACHE = "kyvorix-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./games/detetive/index.html",
  "./games/kyvorix-town/index.html",
  "./games/quinta/index.html",
  "./games/car-screw/index.html",
  "./games/screw-guru/index.html",
  "./games/bingo/index.html",
  "./games/happy-color/index.html",
  "./games/cake-sort/index.html",
  "./games/girl-rescue/index.html",
  "./games/uno/index.html"
];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      let copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
