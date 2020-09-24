import { firestore } from 'firebase/app'

export interface UserPrivacy {
  id?: string
  gender: number | null
  websiteUrl: string
  createdAt?: firestore.Timestamp | firestore.FieldValue | null
  updatedAt: firestore.Timestamp | firestore.FieldValue | null
}

export const blankUserPrivacy: UserPrivacy = {
  gender: 0,
  websiteUrl: '',
  createdAt: null,
  updatedAt: null,
}
