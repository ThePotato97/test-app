import firebase_app from '../config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc
} from 'firebase/firestore';

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
  const db = getFirestore(firebase_app);
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, 'users', result.user.uid);
    await setDoc(docRef, {
      email: email,
      uid: result.user.uid,
      role: 'user',
      userdata: []
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
