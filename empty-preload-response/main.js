if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(_ => {
            console.log('service worker registered');
        });
}