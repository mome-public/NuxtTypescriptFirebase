import { firestore } from 'firebase/app'

export interface Release {
  id?: string
  title: string
  contents: string
  publicOwnerName: string
  tags: string[]
  publishDate: firestore.Timestamp | firestore.FieldValue | null
  createdAt?: firestore.Timestamp | firestore.FieldValue | null
  updatedAt: firestore.Timestamp | firestore.FieldValue | null
}

export const blankRelease: Release = {
  title: '',
  contents: '',
  publicOwnerName: '',
  tags: [],
  publishDate: null,
  createdAt: null,
  updatedAt: null,
}
