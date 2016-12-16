// наименование для нашего хранилища кэша
const CACHE_NAME = 'app_serviceworker_v_1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',
    '/js/collections/RoomCollection.js',
    '/js/collections/UserCollection.js',
    '/js/models/DroneModel.js',
    '/js/models/GameModel.js',
    '/js/models/RoomModel.js',
    '/js/models/UserModel.js',
    '/js/modules/pathToRegex.js',
    '/js/modules/route.js',
    '/js/modules/router.js',
    '/js/modules/view.js',
    '/js/views/gameView.js',
    '/js/views/loginView.js',
    '/js/views/roomsView.js',
    '/js/views/scoreboardView.js',
    '/js/airdrone.js',
    '/js/canvas.js',

    '/dist/styles.css',
];

this.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME)
			.then(function (cache) {
				// загружаем в наш cache необходимые файлы
				return cache.addAll(cacheUrls);
			})
	);
});

this.addEventListener('fetch', function (event) {
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {

			// выдаём кэш, если он есть
			if (cachedResponse) {
				return cachedResponse;
			}

			// иначе запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
