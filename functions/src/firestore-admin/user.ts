/* eslint-disable no-loop-func */
import admin from 'firebase-admin';

import { collectionName } from '../services/nuxt-typescript-firebase/constants';
import { User } from '../services/nuxt-typescript-firebase/models/user';

export const findPublisher = async (
  db: admin.firestore.Firestore,
  id: string,
) => {
  const doc = await db
    .collection(collectionName.users)
    .doc(id)
    .get();
  const user = doc.data() as User;

  return { ...user, id: doc.id };
};
