import firebase from '~/plugins/firebase'

export default function BaseMounted(saveUID: (uid: string) => void) {
  // Set Auth Observer
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      saveUID(user.uid)
    } else {
      saveUID('')
    }
  })
}
