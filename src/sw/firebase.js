import firebase from '../plugins/firebase'

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        user.getIdToken().then(
          (idToken) => {
            resolve(idToken)
          },
          () => {
            resolve(null)
          }
        )
      } else {
        resolve(null)
      }
    })
  })
}

const getOriginFromUrl = (url) => {
  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('firebasestorage.googleapis.com')) {
    return
  }

  const requestProcessor = (idToken) => {
    let req = event.request
    // For same origin https requests, append idToken to header.
    if (
      self.location.origin === getOriginFromUrl(event.request.url) &&
      (self.location.protocol === 'https:' ||
        self.location.hostname === 'localhost') &&
      idToken
    ) {
      // Clone headers as request headers are immutable.
      const headers = new Headers()
      for (const entry of req.headers.entries()) {
        headers.append(entry[0], entry[1])
      }
      // Add ID token to header.
      headers.append('authorization', 'Bearer ' + idToken)
      try {
        req = new Request(req.url, {
          method: req.method,
          headers,
          mode: 'same-origin',
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          body: req.body,
          bodyUsed: req.bodyUsed,
          context: req.context,
        })
      } catch (e) {
        // This will fail for CORS requests. We just continue with the
        // fetch caching logic below and do not pass the ID token.
      }
    }
    return fetch(req)
  }
  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(getIdToken().then(requestProcessor, requestProcessor))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})
