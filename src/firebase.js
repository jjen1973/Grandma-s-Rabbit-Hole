import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Both apps use Grandma's backend after the original accounts and progress were copied.
// The Android application ID and Firebase Hosting project can differ from this backend.
const firebaseConfig = {
  apiKey: 'AIzaSyCwMSlX_65PucPyH_KHdTQss95_GDKipl4',
  authDomain: 'grandmas-rabbit-hole.firebaseapp.com',
  projectId: 'grandmas-rabbit-hole',
  storageBucket: 'grandmas-rabbit-hole.firebasestorage.app',
  messagingSenderId: '407680624515',
  appId: '1:407680624515:web:f2ecef8f2b7c02344778b6',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
