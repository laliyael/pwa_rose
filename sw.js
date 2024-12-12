//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_LaliYaelPWA';

//ficheros a cachear en la aplicacion
var urlsToCache=[
    './',
    './styles.css',
	'./img/1.png',
    './img/2.png',
    './img/3.png',
    './img/instagram.png',
    './img/facebook.png',
	'./img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];

//Evento install
// Instalacion del service worker y guarda en cache los recursos 
self.addEventListener('install',e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(()=> {
                self.skipWaiting();
            });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});


//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});
