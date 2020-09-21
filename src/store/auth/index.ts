import axios from 'axios'
import firebase from '~/plugins/firebase'

export default function useAuth() {
  // logics
  const getUID = () => {
    return firebase.auth().currentUser
  }
  const isAuthenticated = () => {
    return !!firebase.auth().currentUser
  }
  const login = async (uid: string) => {
    const currentUser = firebase.auth().currentUser
    if (currentUser == null) {
      return
    }
    await axios.post('/api/login', {
      uid,
    })
  }
  const logout = async () => {
    await firebase.auth().signOut()
    await axios.post('/api/logout')
  }

  return {
    getUID,
    isAuthenticated,
    login,
    logout,
  }
}

export type AuthStore = ReturnType<typeof useAuth>
