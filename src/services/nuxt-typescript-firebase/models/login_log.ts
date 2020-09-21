import { firestore } from 'firebase/app'

export type LoginLog = {
  id?: string
  userId: string
  userAgent: string
  createdAt: firestore.Timestamp | null
  updatedAt: firestore.Timestamp | null
}

export const blankLoginLog: LoginLog = {
  userId: '',
  userAgent: '',
  createdAt: null,
  updatedAt: null,
}
