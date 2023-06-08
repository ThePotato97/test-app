import firebase_app from '../config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
  const db = getFirestore(firebase_app);
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, 'users'), {
      email: email,
      uid: result.user.uid,
      role: 'user'
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
