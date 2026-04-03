import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRHB0j1sfZ5WMlUHDcuj6OGIZI_AELwaU",
  authDomain: "mylocalfirebaseconfig.firebaseapp.com",
  projectId: "mylocalfirebaseconfig",
  storageBucket: "mylocalfirebaseconfig.firebasestorage.app",
  messagingSenderId: "253657541631",
  appId: "1:253657541631:web:b9d6c925b5af97ebc195ca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
