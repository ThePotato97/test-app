import firebase_app from '../config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore';

const auth = getAuth(firebase_app);

const provider = new GoogleAuthProvider();

export const authWithGoogle = async () => {
  const db = getFirestore(firebase_app);
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const { user } = result;
  const docRef = doc(db, 'users', user.uid);
  const currentData = await getDoc(docRef);
  const data = currentData.data();
  if (data === undefined) {
    await setDoc(docRef, {
      uid: user.uid,
      role: 'user',
      userdata: []
    });
  }
  return { result };
};
