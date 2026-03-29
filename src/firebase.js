import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRHB0j1sfZ5WMlUHDcuj60GIZI_AELwaU",
  authDomain: "commerce-quest-pro-40.firebaseapp.com",
  projectId: "commerce-quest-pro-40",
  appId: "1:253657541631:web:65818987019798083a938c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use standard Firestore without complex settings to minimize aborted requests
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
