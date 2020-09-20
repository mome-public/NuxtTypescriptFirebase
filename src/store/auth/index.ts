import axios from 'axios'
import { reactive } from '@nuxtjs/composition-api'
import firebase from '~/plugins/firebase'

export default function useAuth() {
  // state
  const state = reactive<{
    uid: string
  }>({
    uid: '',
  })

  // logics
  const isAuthenticated = () => state.uid
  const saveUID = (uid: string) => {
    state.uid = uid
  }
  const login = async (uid: string) => {
    const currentUser = firebase.auth().currentUser
    if (currentUser == null) {
      return
    }
    await axios.post('/api/login', {
      uid,
    })

    state.uid = uid
  }
  const logout = async () => {
    await firebase.auth().signOut()
    await axios.post('/api/logout')
    state.uid = ''
  }

  return {
    state,
    saveUID,
    isAuthenticated,
    login,
    logout,
  }
}

export type AuthStore = ReturnType<typeof useAuth>
