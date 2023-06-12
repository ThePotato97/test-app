import firebase_app from '../config';
import { getFirestore } from 'firebase/firestore';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
  let cred = null,
    error = null;
  try {
    cred = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result: cred, error };
}
