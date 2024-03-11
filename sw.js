const STATIC_CACHE_NAME = "site-static";
const staticAssetsArr = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v141/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

//when service worker installs (if it has been opened before it doesn't need to install)
self.addEventListener("install", (e) => {
  console.log("service worker has been installed!", e);
  //basically there is a chance the browser will close our service worker once the install has completed and might do this before everything is cached.
  e.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("caching assets started");
      cache
        .addAll(staticAssetsArr)
        .then(console.log("caching complete"))
        .catch((err) => console.error(err));
    })
  );
});

//activate service worker listener
self.addEventListener("activate", (evt) => {
  // console.log(evt, "service worker has been activated");
});

//intercept fetch events
self.addEventListener("fetch", (evt) => {
  // console.log("fetch event", evt);
  //this will go to our cache and see if anything matches, cacheResponse will either be our cache response or if that cacheRes is null then we continue on with our fetch event.
  evt.respondWith(
    caches.match(evt.request, staticAssetsArr).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
