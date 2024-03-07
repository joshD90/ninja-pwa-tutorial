//when service worker installs (if it has been opened before it doesn't need to install)
self.addEventListener("install", (e) => {
  console.log("service worker has been installed!", e);
});

//activate service worker listener
self.addEventListener("activate", (evt) => {
  console.log(evt, "service worker has been activated");
});
