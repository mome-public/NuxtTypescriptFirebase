import admin from 'firebase-admin';
import { COLLECTION_NAMES } from '../services/nuxt-typescript-firebase/invariables';

export const addCounter = async (
  db: admin.firestore.Firestore,
  collName: string,
  count = 1,
) => {
  const doc = db.collection(COLLECTION_NAMES.DOC_COUNTERS).doc(collName);
  await doc.set(
    {
      count: admin.firestore.FieldValue.increment(count),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
};
