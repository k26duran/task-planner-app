const doCache = true;

const CACHE_NAME = "taskplannerapp-v1";

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log("Deleting cache: " + key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

self.addEventListener("install", function(event) {
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                fetch("manifest.json")
                    .then(response => {
                        response.json();
                    })
                    .then(assets => {
                        const urlsToCache = ["/", "/index.html", "/manifest.json", "/App.js"];
                        cache.addAll(urlsToCache);
                        console.log("cached");
                    });
            })
        );
    }
});

self.addEventListener("fetch", function(event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});

/*const cacheName = "taskplannerapp-v1";
const staticAssets = [
    "/",
    "/index.html",
    "/manifest.json",
    "/App.js"
];

self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener("activate", e => {
    self.clients.claim();
});

self.addEventListener("fetch", async e => {
    const req = e.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || await fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}*/