import { firestore } from 'firebase/app'

export type ErrorLog = {
  id?: string
  userId: string
  className: string
  functionName: string
  lineNumber: number
  message: string
  userAgent: string
  createdAt?: firestore.Timestamp | firestore.FieldValue | null
  updatedAt: firestore.Timestamp | firestore.FieldValue | null
}

export const blankErrorLog: ErrorLog = {
  userId: '',
  className: '',
  functionName: '',
  lineNumber: 0,
  message: '',
  userAgent: '',
  createdAt: null,
  updatedAt: null,
}
