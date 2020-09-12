import admin from 'firebase-admin';
import { collectionName } from '../services/nuxt-typescript-firebase/constants';

export const addCounter = async (
  db: admin.firestore.Firestore,
  collName: string,
  count = 1,
) => {
  const doc = db.collection(collectionName.docCounters).doc(collName);
  await doc.set(
    {
      count: admin.firestore.FieldValue.increment(count),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
};
