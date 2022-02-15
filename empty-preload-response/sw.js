self.addEventListener('activate', event => {
    console.log('sw activated');
    event.waitUntil(
        self.registration.navigationPreload.enable().then(() => {
            console.log('navigation preload enabled');
        }),
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate' || event.preloadResponse === undefined) {
        return;
    }

    console.log('using preload response:', event.request.url);
    event.respondWith(async function () {
        const response = await event.preloadResponse;
        console.log(`preload response status=${response.status}, bodyByteLength=${(await response.clone().arrayBuffer()).byteLength}`);
        return response;
    }());
});