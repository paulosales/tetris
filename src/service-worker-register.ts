import debug from "debug";

const log = debug("tetris:service-worker-register:log");
const error = debug("tetris:service-worker-register");

export const IS_LOCALHOST = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const register = (): void => {
  log("registering service worker");
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (IS_LOCALHOST) {
        checkValidServiceWorker(swUrl);

        navigator.serviceWorker.ready.then(() => {
          log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://goo.gl/SC7cgQ"
          );
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  } else {
    error("Your browser do not support service worker");
  }
};

function registerValidSW(swUrl: string) {
  log(`Registering service worker file ${swUrl}`);
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                log("New content is available; please refresh.");
              } else {
                log("Content is cached for offline use.");
              }
            }
          };
        }
      };
    })
    .catch((e) => {
      error("Error during service worker registration:", e);
    });
}

function checkValidServiceWorker(swUrl: string) {
  log("Checking if the service worker can be found.");
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      log("No internet connection found. App is running in offline mode.");
    });
}

export const unregister = (): void => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};

export default register;
