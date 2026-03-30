import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRHB0j1sfZ5WMlUHDcuj60GIZI_AELwaU",
  authDomain: "commerce-quest-pro-40.firebaseapp.com",
  projectId: "commerce-quest-pro-40",
  appId: "1:253657541631:web:65818987019798083a938c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/**
 * Initialize Firestore with persistence and optimized connectivity settings
 * - experimentalAutoDetectLongPolling: true helps avoid net::ERR_ABORTED on unstable networks
 * - localCache: enables offline persistence for a smoother user experience
 */
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

const auth = getAuth(app);

export { db, auth };
