import { 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Database Service for Edu Quest Pro
 * Handles all Firestore operations
 */

// Leaderboard Operations
export const subscribeToLeaderboard = (appId, callback, errorCallback) => {
  const leaderboardRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
  return onSnapshot(leaderboardRef, (snap) => {
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  }, errorCallback);
};

export const saveUserScore = async (appId, scoreData) => {
  try {
    const leaderboardRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
    return await addDoc(leaderboardRef, {
      ...scoreData,
      timestamp: Date.now()
    });
  } catch (e) {
    console.error("Error saving score:", e);
    throw e;
  }
};

// Stats Operations (Likes/Unlikes)
export const subscribeToStats = (appId, callback, errorCallback) => {
  const statsRef = doc(db, 'artifacts', appId, 'public', 'stats');
  return onSnapshot(statsRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  }, errorCallback);
};

export const updateStatsVote = async (appId, type) => {
  const statsRef = doc(db, 'artifacts', appId, 'public', 'stats');
  try {
    const statsDoc = await getDoc(statsRef);
    const data = statsDoc.exists() ? statsDoc.data() : { likes: 0, unlikes: 0 };
    
    await setDoc(statsRef, { 
      likes: (data.likes || 0) + (type === 'like' ? 1 : 0),
      unlikes: (data.unlikes || 0) + (type === 'dislike' ? 1 : 0)
    }, { merge: true });
  } catch (e) {
    console.error("Error updating stats:", e);
    throw e;
  }
};

// Feedback / Comments Operations
export const saveUserComment = async (appId, commentData) => {
  try {
    const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'comments');
    return await addDoc(commentsRef, {
      ...commentData,
      timestamp: Date.now()
    });
  } catch (e) {
    console.error("Error saving comment:", e);
    throw e;
  }
};

// Question Bank Operations (Future Expansion)
export const fetchQuestionsFromDB = async (stream, paperId) => {
  // Placeholder for fetching from Firestore instead of local files
  console.log(`Fetching questions for ${stream} - Paper ${paperId} from DB...`);
  return null; 
};
