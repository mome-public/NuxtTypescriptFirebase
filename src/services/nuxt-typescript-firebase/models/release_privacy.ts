import { firestore } from 'firebase/app'

export interface ReleasePrivacy {
  id?: string
  privateOwnerName: string
  privateEmail: string
  createUserId: string
  createdAt?: firestore.Timestamp | firestore.FieldValue | null
  updatedAt: firestore.Timestamp | firestore.FieldValue | null
}

export const blankReleasePrivacy: ReleasePrivacy = {
  privateOwnerName: '',
  privateEmail: '',
  createUserId: '',
  createdAt: null,
  updatedAt: null,
}
