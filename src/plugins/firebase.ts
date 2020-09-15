import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/remote-config'
import 'firebase/functions'

if (!firebase.apps.length) {
  // Initialize firebase App
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  })
}

// For debug
// console.log(`apiKey: ${process.env.apiKey}`)
// console.log(`authDomain: ${process.env.authDomain}`)
// console.log(`databaseURL: ${process.env.databaseURL}`)
// console.log(`projectId: ${process.env.projectId}`)
// console.log(`storageBucket: ${process.env.storageBucket}`)
// console.log(`messagingSenderId: ${process.env.messagingSenderId}`)
// console.log(`appId: ${process.env.appId}`)

export default firebase
