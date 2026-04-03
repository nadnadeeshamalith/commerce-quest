import React, { useState, useEffect, useCallback, useRef } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  Trophy, Star, ArrowRight, RefreshCw, CircleCheck, 
  CircleX, BookOpen, Loader2, Award, 
  ChevronRight, Brain, ArrowLeft, X, LayoutGrid, ListCheck, History, UserCircle,
  ThumbsUp, ThumbsDown, Microscope, Atom, Calculator, Zap, Beaker, Heart, Flame, Skull, Sparkles, Lock, Unlock, Timer, GraduationCap, Pencil,
  Camera, Palette, Cpu, Music, MessageSquareHeart, Code2
} from 'lucide-react';
import { 
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken
} from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query } from 'firebase/firestore';

import { 
  subscribeToStats, 
  updateStatsVote,
  saveUserComment
} from './data/database/database';

const appId = typeof globalThis !== 'undefined' && globalThis.__app_id ? globalThis.__app_id : 'commerce-quest-pro-40';
const firebaseConfig = (() => {
  const cfg = globalThis?.__firebase_config;
  if (!cfg) return null;
  if (typeof cfg === 'string') {
    try {
      return JSON.parse(cfg);
    } catch {
      return null;
    }
  }
  return cfg;
})();
const firebaseApp = firebaseConfig ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;

// Component Imports
import ALStreamSelect from './components/ALStreamSelect';
import { playSound } from './components/Helpers';
import HomeView from './components/HomeView';
import GrandLeaderboard from './components/GrandLeaderboard';
import StartView from './components/StartView';
import PaperSelectionView from './components/PaperSelectionView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import HistoryView from './components/HistoryView';
import LeaderboardView from './components/LeaderboardView';
import Grade6StreamSelect from './components/Grade6StreamSelect';
import FeedbackModal from './components/FeedbackModal';
import { grade6SinhalaBank } from './data/grade6/sinhala.js';
import { englishpaper1 } from './data/grade6/englishpaper1.js';
import { englishpaper2 } from './data/grade6/englishpaper2.js';
import { englishpaper3 } from './data/grade6/englishpaper3.js';
import { englishpaper4 } from './data/grade6/englishpaper4.js';
import { englishpaper5 } from './data/grade6/englishpaper5.js';
import { englishpaper6 } from './data/grade6/englishpaper6.js';
import { englishpaper7 } from './data/grade6/englishpaper7.js';
import { englishpaper8 } from './data/grade6/englishpaper8.js';
import { englishpaper9 } from './data/grade6/englishpaper9.js';
import { englishpaper10 } from './data/grade6/englishpaper10.js';
import { englishpaper11 } from './data/grade6/englishpaper11.js';
import { englishpaper12 } from './data/grade6/englishpaper12.js';
import { englishpaper13 } from './data/grade6/englishpaper13.js';
import { englishpaper14 } from './data/grade6/englishpaper14.js';
import { englishpaper15 } from './data/grade6/englishpaper15.js';
import { englishpaper16 } from './data/grade6/englishpaper16.js';
import { englishpaper17 } from './data/grade6/englishpaper17.js';
import { englishpaper18 } from './data/grade6/englishpaper18.js';
import { englishpaper19 } from './data/grade6/englishpaper19.js';
import { englishpaper20 } from './data/grade6/englishpaper20.js';
import { englishpaper21 } from './data/grade6/englishpaper21.js';
import { englishpaper22 } from './data/grade6/englishpaper22.js';
import { englishpaper23 } from './data/grade6/englishpaper23.js';
import { englishpaper24 } from './data/grade6/englishpaper24.js';
import { englishpaper25 } from './data/grade6/englishpaper25.js';
import { englishpaper26 } from './data/grade6/englishpaper26.js';
import { englishpaper27 } from './data/grade6/englishpaper27.js';
import { englishpaper28 } from './data/grade6/englishpaper28.js';
import { englishpaper29 } from './data/grade6/englishpaper29.js';
import { englishpaper30 } from './data/grade6/englishpaper30.js';
import { englishpaper31 } from './data/grade6/englishpaper31.js';
import { englishpaper32 } from './data/grade6/englishpaper32.js';
import { englishpaper33 } from './data/grade6/englishpaper33.js';
import { englishpaper34 } from './data/grade6/englishpaper34.js';
import { englishpaper35 } from './data/grade6/englishpaper35.js';
import { englishpaper36 } from './data/grade6/englishpaper36.js';
import { englishpaper37 } from './data/grade6/englishpaper37.js';
import { englishpaper38 } from './data/grade6/englishpaper38.js';
import { englishpaper39 } from './data/grade6/englishpaper39.js';
import { englishpaper40 } from './data/grade6/englishpaper40.js';
import { historypaper1 } from './data/grade6/historypaper1.js';
import { historypaper2 } from './data/grade6/historypaper2.js';
import { historypaper3 } from './data/grade6/historypaper3.js';
import { historypaper4 } from './data/grade6/historypaper4.js';
import { historypaper5 } from './data/grade6/historypaper5.js';
import { historypaper6 } from './data/grade6/historypaper6.js';
import { historypaper7 } from './data/grade6/historypaper7.js';
import { historypaper8 } from './data/grade6/historypaper8.js';
import { historypaper9 } from './data/grade6/historypaper9.js';
import { historypaper10 } from './data/grade6/historypaper10.js';
import { historypaper11 } from './data/grade6/historypaper11.js';
import { historypaper12 } from './data/grade6/historypaper12.js';
import { historypaper13 } from './data/grade6/historypaper13.js';
import { historypaper14 } from './data/grade6/historypaper14.js';
import { historypaper15 } from './data/grade6/historypaper15.js';
import { historypaper16 } from './data/grade6/historypaper16.js';
import { historypaper17 } from './data/grade6/historypaper17.js';
import { historypaper18 } from './data/grade6/historypaper18.js';
import { historypaper19 } from './data/grade6/historypaper19.js';
import { historypaper20 } from './data/grade6/historypaper20.js';
import { historypaper21 } from './data/grade6/historypaper21.js';
import { historypaper22 } from './data/grade6/historypaper22.js';
import { historypaper23 } from './data/grade6/historypaper23.js';
import { historypaper24 } from './data/grade6/historypaper24.js';
import { historypaper25 } from './data/grade6/historypaper25.js';
import { historypaper26 } from './data/grade6/historypaper26.js';
import { historypaper27 } from './data/grade6/historypaper27.js';
import { historypaper28 } from './data/grade6/historypaper28.js';
import { historypaper29 } from './data/grade6/historypaper29.js';
import { historypaper30 } from './data/grade6/historypaper30.js';
import { historypaper31 } from './data/grade6/historypaper31.js';
import { historypaper32 } from './data/grade6/historypaper32.js';
import { historypaper33 } from './data/grade6/historypaper33.js';
import { historypaper34 } from './data/grade6/historypaper34.js';
import { historypaper35 } from './data/grade6/historypaper35.js';
import { historypaper36 } from './data/grade6/historypaper36.js';
import { historypaper37 } from './data/grade6/historypaper37.js';
import { historypaper38 } from './data/grade6/historypaper38.js';
import { historypaper39 } from './data/grade6/historypaper39.js';
import { historypaper40 } from './data/grade6/historypaper40.js';
import { buddhismpaper1 } from './data/grade6/buddhismpaper1.js';
import { buddhismpaper2 } from './data/grade6/buddhismpaper2.js';
import { buddhismpaper3 } from './data/grade6/buddhismpaper3.js';
import { buddhismpaper4 } from './data/grade6/buddhismpaper4.js';
import { buddhismpaper5 } from './data/grade6/buddhismpaper5.js';
import { buddhismpaper6 } from './data/grade6/buddhismpaper6.js';
import { buddhismpaper7 } from './data/grade6/buddhismpaper7.js';
import { buddhismpaper8 } from './data/grade6/buddhismpaper8.js';
import { buddhismpaper9 } from './data/grade6/buddhismpaper9.js';
import { buddhismpaper10 } from './data/grade6/buddhismpaper10.js';
import { buddhismpaper11 } from './data/grade6/buddhismpaper11.js';
import { buddhismpaper12 } from './data/grade6/buddhismpaper12.js';
import { buddhismpaper13 } from './data/grade6/buddhismpaper13.js';
import { buddhismpaper14 } from './data/grade6/buddhismpaper14.js';
import { buddhismpaper15 } from './data/grade6/buddhismpaper15.js';
import { buddhismpaper16 } from './data/grade6/buddhismpaper16.js';
import { buddhismpaper17 } from './data/grade6/buddhismpaper17.js';
import { buddhismpaper18 } from './data/grade6/buddhismpaper18.js';
import { buddhismpaper19 } from './data/grade6/buddhismpaper19.js';
import { buddhismpaper20 } from './data/grade6/buddhismpaper20.js';
import { buddhismpaper21 } from './data/grade6/buddhismpaper21.js';
import { buddhismpaper22 } from './data/grade6/buddhismpaper22.js';
import { buddhismpaper23 } from './data/grade6/buddhismpaper23.js';
import { buddhismpaper24 } from './data/grade6/buddhismpaper24.js';
import { buddhismpaper25 } from './data/grade6/buddhismpaper25.js';
import { buddhismpaper26 } from './data/grade6/buddhismpaper26.js';
import { buddhismpaper27 } from './data/grade6/buddhismpaper27.js';
import { buddhismpaper28 } from './data/grade6/buddhismpaper28.js';
import { buddhismpaper29 } from './data/grade6/buddhismpaper29.js';
import { buddhismpaper30 } from './data/grade6/buddhismpaper30.js';
import { buddhismpaper31 } from './data/grade6/buddhismpaper31.js';
import { buddhismpaper32 } from './data/grade6/buddhismpaper32.js';
import { buddhismpaper33 } from './data/grade6/buddhismpaper33.js';
import { buddhismpaper34 } from './data/grade6/buddhismpaper34.js';
import { buddhismpaper35 } from './data/grade6/buddhismpaper35.js';
import { buddhismpaper36 } from './data/grade6/buddhismpaper36.js';
import { buddhismpaper37 } from './data/grade6/buddhismpaper37.js';
import { buddhismpaper38 } from './data/grade6/buddhismpaper38.js';
import { buddhismpaper39 } from './data/grade6/buddhismpaper39.js';
import { buddhismpaper40 } from './data/grade6/buddhismpaper40.js';
import { easternmusicpaper1 } from './data/grade6/easternmusicpaper1.js';
import { easternmusicpaper2 } from './data/grade6/easternmusicpaper2.js';
import { easternmusicpaper3 } from './data/grade6/easternmusicpaper3.js';
import { easternmusicpaper4 } from './data/grade6/easternmusicpaper4.js';
import { easternmusicpaper5 } from './data/grade6/easternmusicpaper5.js';
import { artpaper1 } from './data/grade6/artpaper1.js';
import { artpaper2 } from './data/grade6/artpaper2.js';
import { artpaper3 } from './data/grade6/artpaper3.js';
import { artpaper4 } from './data/grade6/artpaper4.js';
import { artpaper5 } from './data/grade6/artpaper5.js';
import { artpaper6 } from './data/grade6/artpaper6.js';
import { artpaper7 } from './data/grade6/artpaper7.js';
import { artpaper8 } from './data/grade6/artpaper8.js';
import { artpaper9 } from './data/grade6/artpaper9.js';
import { artpaper10 } from './data/grade6/artpaper10.js';
import { artpaper11 } from './data/grade6/artpaper11.js';
import { artpaper12 } from './data/grade6/artpaper12.js';
import { artpaper13 } from './data/grade6/artpaper13.js';
import { artpaper14 } from './data/grade6/artpaper14.js';
import { artpaper15 } from './data/grade6/artpaper15.js';
import { artpaper16 } from './data/grade6/artpaper16.js';
import { artpaper17 } from './data/grade6/artpaper17.js';
import { artpaper18 } from './data/grade6/artpaper18.js';
import { artpaper19 } from './data/grade6/artpaper19.js';
import { artpaper20 } from './data/grade6/artpaper20.js';
import { artpaper21 } from './data/grade6/artpaper21.js';
import { artpaper22 } from './data/grade6/artpaper22.js';
import { artpaper23 } from './data/grade6/artpaper23.js';
import { artpaper24 } from './data/grade6/artpaper24.js';
import { artpaper25 } from './data/grade6/artpaper25.js';
import { artpaper26 } from './data/grade6/artpaper26.js';
import { artpaper27 } from './data/grade6/artpaper27.js';
import { artpaper28 } from './data/grade6/artpaper28.js';
import { artpaper29 } from './data/grade6/artpaper29.js';
import { artpaper30 } from './data/grade6/artpaper30.js';
import { artpaper31 } from './data/grade6/artpaper31.js';
import { artpaper32 } from './data/grade6/artpaper32.js';
import { artpaper33 } from './data/grade6/artpaper33.js';
import { artpaper34 } from './data/grade6/artpaper34.js';
import { artpaper35 } from './data/grade6/artpaper35.js';
import { artpaper36 } from './data/grade6/artpaper36.js';
import { artpaper37 } from './data/grade6/artpaper37.js';
import { artpaper38 } from './data/grade6/artpaper38.js';
import { artpaper39 } from './data/grade6/artpaper39.js';
import { artpaper40 } from './data/grade6/artpaper40.js';
import { easternmusicpaper6 } from './data/grade6/easternmusicpaper6.js';
import { easternmusicpaper7 } from './data/grade6/easternmusicpaper7.js';
import { easternmusicpaper8 } from './data/grade6/easternmusicpaper8.js';
import { easternmusicpaper9 } from './data/grade6/easternmusicpaper9.js';
import { easternmusicpaper10 } from './data/grade6/easternmusicpaper10.js';
import { easternmusicpaper11 } from './data/grade6/easternmusicpaper11.js';
import { easternmusicpaper12 } from './data/grade6/easternmusicpaper12.js';
import { easternmusicpaper13 } from './data/grade6/easternmusicpaper13.js';
import { easternmusicpaper14 } from './data/grade6/easternmusicpaper14.js';
import { easternmusicpaper15 } from './data/grade6/easternmusicpaper15.js';
import { easternmusicpaper16 } from './data/grade6/easternmusicpaper16.js';
import { easternmusicpaper17 } from './data/grade6/easternmusicpaper17.js';
import { easternmusicpaper18 } from './data/grade6/easternmusicpaper18.js';
import { easternmusicpaper19 } from './data/grade6/easternmusicpaper19.js';
import { easternmusicpaper20 } from './data/grade6/easternmusicpaper20.js';
import { easternmusicpaper21 } from './data/grade6/easternmusicpaper21.js';
import { easternmusicpaper22 } from './data/grade6/easternmusicpaper22.js';
import { easternmusicpaper23 } from './data/grade6/easternmusicpaper23.js';
import { easternmusicpaper24 } from './data/grade6/easternmusicpaper24.js';
import { easternmusicpaper25 } from './data/grade6/easternmusicpaper25.js';
import { easternmusicpaper26 } from './data/grade6/easternmusicpaper26.js';
import { easternmusicpaper27 } from './data/grade6/easternmusicpaper27.js';
import { easternmusicpaper28 } from './data/grade6/easternmusicpaper28.js';
import { easternmusicpaper29 } from './data/grade6/easternmusicpaper29.js';
import { easternmusicpaper30 } from './data/grade6/easternmusicpaper30.js';
import { easternmusicpaper31 } from './data/grade6/easternmusicpaper31.js';
import { easternmusicpaper32 } from './data/grade6/easternmusicpaper32.js';
import { easternmusicpaper33 } from './data/grade6/easternmusicpaper33.js';
import { easternmusicpaper34 } from './data/grade6/easternmusicpaper34.js';
import { easternmusicpaper35 } from './data/grade6/easternmusicpaper35.js';
import { easternmusicpaper36 } from './data/grade6/easternmusicpaper36.js';
import { easternmusicpaper37 } from './data/grade6/easternmusicpaper37.js';
import { easternmusicpaper38 } from './data/grade6/easternmusicpaper38.js';
import { easternmusicpaper39 } from './data/grade6/easternmusicpaper39.js';
import { easternmusicpaper40 } from './data/grade6/easternmusicpaper40.js';
import { westernmusicpaper1 } from './data/grade6/westernmusicpaper1.js';
import { westernmusicpaper2 } from './data/grade6/westernmusicpaper2.js';
import { westernmusicpaper3 } from './data/grade6/westernmusicpaper3.js';
import { westernmusicpaper4 } from './data/grade6/westernmusicpaper4.js';
import { westernmusicpaper5 } from './data/grade6/westernmusicpaper5.js';
import { westernmusicpaper6 } from './data/grade6/westernmusicpaper6.js';
import { westernmusicpaper7 } from './data/grade6/westernmusicpaper7.js';
import { westernmusicpaper8 } from './data/grade6/westernmusicpaper8.js';
import { westernmusicpaper9 } from './data/grade6/westernmusicpaper9.js';
import { westernmusicpaper10 } from './data/grade6/westernmusicpaper10.js';
import { westernmusicpaper11 } from './data/grade6/westernmusicpaper11.js';
import { westernmusicpaper12 } from './data/grade6/westernmusicpaper12.js';
import { westernmusicpaper13 } from './data/grade6/westernmusicpaper13.js';
import { westernmusicpaper14 } from './data/grade6/westernmusicpaper14.js';
import { westernmusicpaper15 } from './data/grade6/westernmusicpaper15.js';
import { westernmusicpaper16 } from './data/grade6/westernmusicpaper16.js';
import { westernmusicpaper17 } from './data/grade6/westernmusicpaper17.js';
import { westernmusicpaper18 } from './data/grade6/westernmusicpaper18.js';
import { westernmusicpaper19 } from './data/grade6/westernmusicpaper19.js';
import { westernmusicpaper20 } from './data/grade6/westernmusicpaper20.js';
import { westernmusicpaper21 } from './data/grade6/westernmusicpaper21.js';
import { westernmusicpaper22 } from './data/grade6/westernmusicpaper22.js';
import { westernmusicpaper23 } from './data/grade6/westernmusicpaper23.js';
import { westernmusicpaper24 } from './data/grade6/westernmusicpaper24.js';
import { westernmusicpaper25 } from './data/grade6/westernmusicpaper25.js';
import { westernmusicpaper26 } from './data/grade6/westernmusicpaper26.js';
import { westernmusicpaper27 } from './data/grade6/westernmusicpaper27.js';
import { westernmusicpaper28 } from './data/grade6/westernmusicpaper28.js';
import { westernmusicpaper29 } from './data/grade6/westernmusicpaper29.js';
import { westernmusicpaper30 } from './data/grade6/westernmusicpaper30.js';
import { westernmusicpaper31 } from './data/grade6/westernmusicpaper31.js';
import { westernmusicpaper32 } from './data/grade6/westernmusicpaper32.js';
import { westernmusicpaper33 } from './data/grade6/westernmusicpaper33.js';
import { westernmusicpaper34 } from './data/grade6/westernmusicpaper34.js';
import { westernmusicpaper35 } from './data/grade6/westernmusicpaper35.js';
import { westernmusicpaper36 } from './data/grade6/westernmusicpaper36.js';
import { westernmusicpaper37 } from './data/grade6/westernmusicpaper37.js';
import { westernmusicpaper38 } from './data/grade6/westernmusicpaper38.js';
import { westernmusicpaper39 } from './data/grade6/westernmusicpaper39.js';
import { westernmusicpaper40 } from './data/grade6/westernmusicpaper40.js';
import { kandyandancepaper1 } from './data/grade6/kandyandancepaper1.js';
import { kandyandancepaper2 } from './data/grade6/kandyandancepaper2.js';
import { kandyandancepaper3 } from './data/grade6/kandyandancepaper3.js';
import { kandyandancepaper4 } from './data/grade6/kandyandancepaper4.js';
import { kandyandancepaper5 } from './data/grade6/kandyandancepaper5.js';
import { kandyandancepaper6 } from './data/grade6/kandyandancepaper6.js';
import { kandyandancepaper7 } from './data/grade6/kandyandancepaper7.js';
import { kandyandancepaper8 } from './data/grade6/kandyandancepaper8.js';
import { kandyandancepaper9 } from './data/grade6/kandyandancepaper9.js';
import { kandyandancepaper10 } from './data/grade6/kandyandancepaper10.js';
import { kandyandancepaper11 } from './data/grade6/kandyandancepaper11.js';
import { kandyandancepaper12 } from './data/grade6/kandyandancepaper12.js';
import { kandyandancepaper13 } from './data/grade6/kandyandancepaper13.js';
import { kandyandancepaper14 } from './data/grade6/kandyandancepaper14.js';
import { kandyandancepaper15 } from './data/grade6/kandyandancepaper15.js';
import { kandyandancepaper16 } from './data/grade6/kandyandancepaper16.js';
import { kandyandancepaper17 } from './data/grade6/kandyandancepaper17.js';
import { kandyandancepaper18 } from './data/grade6/kandyandancepaper18.js';
import { kandyandancepaper19 } from './data/grade6/kandyandancepaper19.js';
import { kandyandancepaper20 } from './data/grade6/kandyandancepaper20.js';
import { kandyandancepaper21 } from './data/grade6/kandyandancepaper21.js';
import { kandyandancepaper22 } from './data/grade6/kandyandancepaper22.js';
import { kandyandancepaper23 } from './data/grade6/kandyandancepaper23.js';
import { kandyandancepaper24 } from './data/grade6/kandyandancepaper24.js';
import { kandyandancepaper25 } from './data/grade6/kandyandancepaper25.js';
import { kandyandancepaper26 } from './data/grade6/kandyandancepaper26.js';
import { kandyandancepaper27 } from './data/grade6/kandyandancepaper27.js';
import { kandyandancepaper28 } from './data/grade6/kandyandancepaper28.js';
import { kandyandancepaper29 } from './data/grade6/kandyandancepaper29.js';
import { kandyandancepaper30 } from './data/grade6/kandyandancepaper30.js';
import { kandyandancepaper31 } from './data/grade6/kandyandancepaper31.js';
import { kandyandancepaper32 } from './data/grade6/kandyandancepaper32.js';
import { kandyandancepaper33 } from './data/grade6/kandyandancepaper33.js';
import { kandyandancepaper34 } from './data/grade6/kandyandancepaper34.js';
import { kandyandancepaper35 } from './data/grade6/kandyandancepaper35.js';
import { kandyandancepaper36 } from './data/grade6/kandyandancepaper36.js';
import { kandyandancepaper37 } from './data/grade6/kandyandancepaper37.js';
import { kandyandancepaper38 } from './data/grade6/kandyandancepaper38.js';
import { kandyandancepaper39 } from './data/grade6/kandyandancepaper39.js';
import { kandyandancepaper40 } from './data/grade6/kandyandancepaper40.js';
import { lowcountrydancepaper1 } from './data/grade6/lowcountrydancepaper1.js';
import { lowcountrydancepaper2 } from './data/grade6/lowcountrydancepaper2.js';
import { lowcountrydancepaper3 } from './data/grade6/lowcountrydancepaper3.js';
import { lowcountrydancepaper4 } from './data/grade6/lowcountrydancepaper4.js';
import { lowcountrydancepaper5 } from './data/grade6/lowcountrydancepaper5.js';
import { lowcountrydancepaper6 } from './data/grade6/lowcountrydancepaper6.js';
import { lowcountrydancepaper7 } from './data/grade6/lowcountrydancepaper7.js';
import { lowcountrydancepaper8 } from './data/grade6/lowcountrydancepaper8.js';
import { lowcountrydancepaper9 } from './data/grade6/lowcountrydancepaper9.js';
import { lowcountrydancepaper10 } from './data/grade6/lowcountrydancepaper10.js';
import { lowcountrydancepaper11 } from './data/grade6/lowcountrydancepaper11.js';
import { lowcountrydancepaper12 } from './data/grade6/lowcountrydancepaper12.js';
import { lowcountrydancepaper13 } from './data/grade6/lowcountrydancepaper13.js';
import { lowcountrydancepaper14 } from './data/grade6/lowcountrydancepaper14.js';
import { lowcountrydancepaper15 } from './data/grade6/lowcountrydancepaper15.js';
import { lowcountrydancepaper16 } from './data/grade6/lowcountrydancepaper16.js';
import { lowcountrydancepaper17 } from './data/grade6/lowcountrydancepaper17.js';
import { lowcountrydancepaper18 } from './data/grade6/lowcountrydancepaper18.js';
import { lowcountrydancepaper19 } from './data/grade6/lowcountrydancepaper19.js';
import { lowcountrydancepaper20 } from './data/grade6/lowcountrydancepaper20.js';
import { lowcountrydancepaper21 } from './data/grade6/lowcountrydancepaper21.js';
import { lowcountrydancepaper22 } from './data/grade6/lowcountrydancepaper22.js';
import { lowcountrydancepaper23 } from './data/grade6/lowcountrydancepaper23.js';
import { lowcountrydancepaper24 } from './data/grade6/lowcountrydancepaper24.js';
import { lowcountrydancepaper25 } from './data/grade6/lowcountrydancepaper25.js';
import { lowcountrydancepaper26 } from './data/grade6/lowcountrydancepaper26.js';
import { lowcountrydancepaper27 } from './data/grade6/lowcountrydancepaper27.js';
import { lowcountrydancepaper28 } from './data/grade6/lowcountrydancepaper28.js';
import { lowcountrydancepaper29 } from './data/grade6/lowcountrydancepaper29.js';
import { lowcountrydancepaper30 } from './data/grade6/lowcountrydancepaper30.js';
import { lowcountrydancepaper31 } from './data/grade6/lowcountrydancepaper31.js';
import { lowcountrydancepaper32 } from './data/grade6/lowcountrydancepaper32.js';
import { lowcountrydancepaper33 } from './data/grade6/lowcountrydancepaper33.js';
import { lowcountrydancepaper34 } from './data/grade6/lowcountrydancepaper34.js';
import { lowcountrydancepaper35 } from './data/grade6/lowcountrydancepaper35.js';
import { lowcountrydancepaper36 } from './data/grade6/lowcountrydancepaper36.js';
import { lowcountrydancepaper37 } from './data/grade6/lowcountrydancepaper37.js';
import { lowcountrydancepaper38 } from './data/grade6/lowcountrydancepaper38.js';
import { lowcountrydancepaper39 } from './data/grade6/lowcountrydancepaper39.js';
import { lowcountrydancepaper40 } from './data/grade6/lowcountrydancepaper40.js';
import { sabaragamudancepaper1 } from './data/grade6/sabaragamudancepaper1.js';
import { sabaragamudancepaper2 } from './data/grade6/sabaragamudancepaper2.js';
import { sabaragamudancepaper3 } from './data/grade6/sabaragamudancepaper3.js';
import { sabaragamudancepaper4 } from './data/grade6/sabaragamudancepaper4.js';
import { sabaragamudancepaper5 } from './data/grade6/sabaragamudancepaper5.js';
import { sabaragamudancepaper6 } from './data/grade6/sabaragamudancepaper6.js';
import { sabaragamudancepaper7 } from './data/grade6/sabaragamudancepaper7.js';
import { sabaragamudancepaper8 } from './data/grade6/sabaragamudancepaper8.js';
import { sabaragamudancepaper9 } from './data/grade6/sabaragamudancepaper9.js';
import { sabaragamudancepaper10 } from './data/grade6/sabaragamudancepaper10.js';
import { sabaragamudancepaper11 } from './data/grade6/sabaragamudancepaper11.js';
import { sabaragamudancepaper12 } from './data/grade6/sabaragamudancepaper12.js';
import { sabaragamudancepaper13 } from './data/grade6/sabaragamudancepaper13.js';
import { sabaragamudancepaper14 } from './data/grade6/sabaragamudancepaper14.js';
import { sabaragamudancepaper15 } from './data/grade6/sabaragamudancepaper15.js';
import { sabaragamudancepaper16 } from './data/grade6/sabaragamudancepaper16.js';
import { sabaragamudancepaper17 } from './data/grade6/sabaragamudancepaper17.js';
import { sabaragamudancepaper18 } from './data/grade6/sabaragamudancepaper18.js';
import { sabaragamudancepaper19 } from './data/grade6/sabaragamudancepaper19.js';
import { sabaragamudancepaper20 } from './data/grade6/sabaragamudancepaper20.js';
import { sabaragamudancepaper21 } from './data/grade6/sabaragamudancepaper21.js';
import { sabaragamudancepaper22 } from './data/grade6/sabaragamudancepaper22.js';
import { sabaragamudancepaper23 } from './data/grade6/sabaragamudancepaper23.js';
import { sabaragamudancepaper24 } from './data/grade6/sabaragamudancepaper24.js';
import { sabaragamudancepaper25 } from './data/grade6/sabaragamudancepaper25.js';
import { sabaragamudancepaper26 } from './data/grade6/sabaragamudancepaper26.js';
import { sabaragamudancepaper27 } from './data/grade6/sabaragamudancepaper27.js';
import { sabaragamudancepaper28 } from './data/grade6/sabaragamudancepaper28.js';
import { sabaragamudancepaper29 } from './data/grade6/sabaragamudancepaper29.js';
import { sabaragamudancepaper30 } from './data/grade6/sabaragamudancepaper30.js';
import { sabaragamudancepaper31 } from './data/grade6/sabaragamudancepaper31.js';
import { sabaragamudancepaper32 } from './data/grade6/sabaragamudancepaper32.js';
import { sabaragamudancepaper33 } from './data/grade6/sabaragamudancepaper33.js';
import { sabaragamudancepaper34 } from './data/grade6/sabaragamudancepaper34.js';
import { sabaragamudancepaper35 } from './data/grade6/sabaragamudancepaper35.js';
import { sabaragamudancepaper36 } from './data/grade6/sabaragamudancepaper36.js';
import { sabaragamudancepaper37 } from './data/grade6/sabaragamudancepaper37.js';
import { sabaragamudancepaper38 } from './data/grade6/sabaragamudancepaper38.js';
import { sabaragamudancepaper39 } from './data/grade6/sabaragamudancepaper39.js';
import { sabaragamudancepaper40 } from './data/grade6/sabaragamudancepaper40.js';
import { dramapaper1 } from './data/grade6/dramapaper1.js';
import { dramapaper2 } from './data/grade6/dramapaper2.js';
import { dramapaper3 } from './data/grade6/dramapaper3.js';
import { dramapaper4 } from './data/grade6/dramapaper4.js';
import { dramapaper5 } from './data/grade6/dramapaper5.js';
import { dramapaper6 } from './data/grade6/dramapaper6.js';
import { dramapaper7 } from './data/grade6/dramapaper7.js';
import { dramapaper8 } from './data/grade6/dramapaper8.js';
import { dramapaper9 } from './data/grade6/dramapaper9.js';
import { dramapaper10 } from './data/grade6/dramapaper10.js';
import { dramapaper11 } from './data/grade6/dramapaper11.js';
import { dramapaper12 } from './data/grade6/dramapaper12.js';
import { dramapaper13 } from './data/grade6/dramapaper13.js';
import { dramapaper14 } from './data/grade6/dramapaper14.js';
import { dramapaper15 } from './data/grade6/dramapaper15.js';
import { dramapaper16 } from './data/grade6/dramapaper16.js';
import { dramapaper17 } from './data/grade6/dramapaper17.js';
import { dramapaper18 } from './data/grade6/dramapaper18.js';
import { dramapaper19 } from './data/grade6/dramapaper19.js';
import { dramapaper20 } from './data/grade6/dramapaper20.js';
import { dramapaper21 } from './data/grade6/dramapaper21.js';
import { dramapaper22 } from './data/grade6/dramapaper22.js';
import { dramapaper23 } from './data/grade6/dramapaper23.js';
import { dramapaper24 } from './data/grade6/dramapaper24.js';
import { dramapaper25 } from './data/grade6/dramapaper25.js';
import { dramapaper26 } from './data/grade6/dramapaper26.js';
import { dramapaper27 } from './data/grade6/dramapaper27.js';
import { dramapaper28 } from './data/grade6/dramapaper28.js';
import { dramapaper29 } from './data/grade6/dramapaper29.js';
import { dramapaper30 } from './data/grade6/dramapaper30.js';
import { dramapaper31 } from './data/grade6/dramapaper31.js';
import { dramapaper32 } from './data/grade6/dramapaper32.js';
import { dramapaper33 } from './data/grade6/dramapaper33.js';
import { dramapaper34 } from './data/grade6/dramapaper34.js';
import { dramapaper35 } from './data/grade6/dramapaper35.js';
import { dramapaper36 } from './data/grade6/dramapaper36.js';
import { dramapaper37 } from './data/grade6/dramapaper37.js';
import { dramapaper38 } from './data/grade6/dramapaper38.js';
import { dramapaper39 } from './data/grade6/dramapaper39.js';
import { dramapaper40 } from './data/grade6/dramapaper40.js';
import { ptspaper1 } from './data/grade6/ptspaper1.js';
import { ptspaper2 } from './data/grade6/ptspaper2.js';
import { ptspaper3 } from './data/grade6/ptspaper3.js';
import { ptspaper4 } from './data/grade6/ptspaper4.js';
import { ptspaper5 } from './data/grade6/ptspaper5.js';
import { ptspaper6 } from './data/grade6/ptspaper6.js';
import { ptspaper7 } from './data/grade6/ptspaper7.js';
import { ptspaper8 } from './data/grade6/ptspaper8.js';
import { ptspaper9 } from './data/grade6/ptspaper9.js';
import { ptspaper10 } from './data/grade6/ptspaper10.js';
import { ptspaper11 } from './data/grade6/ptspaper11.js';
import { ptspaper12 } from './data/grade6/ptspaper12.js';
import { ptspaper13 } from './data/grade6/ptspaper13.js';
import { ptspaper14 } from './data/grade6/ptspaper14.js';
import { ptspaper15 } from './data/grade6/ptspaper15.js';
import { ptspaper16 } from './data/grade6/ptspaper16.js';
import { ptspaper17 } from './data/grade6/ptspaper17.js';
import { ptspaper18 } from './data/grade6/ptspaper18.js';
import { ptspaper19 } from './data/grade6/ptspaper19.js';
import { ptspaper20 } from './data/grade6/ptspaper20.js';
import { ptspaper21 } from './data/grade6/ptspaper21.js';
import { ptspaper22 } from './data/grade6/ptspaper22.js';
import { ptspaper23 } from './data/grade6/ptspaper23.js';
import { ptspaper24 } from './data/grade6/ptspaper24.js';
import { ptspaper25 } from './data/grade6/ptspaper25.js';
import { ptspaper26 } from './data/grade6/ptspaper26.js';
import { ptspaper27 } from './data/grade6/ptspaper27.js';
import { ptspaper28 } from './data/grade6/ptspaper28.js';
import { ptspaper29 } from './data/grade6/ptspaper29.js';
import { ptspaper30 } from './data/grade6/ptspaper30.js';
import { ptspaper31 } from './data/grade6/ptspaper31.js';
import { ptspaper32 } from './data/grade6/ptspaper32.js';
import { ptspaper33 } from './data/grade6/ptspaper33.js';
import { ptspaper34 } from './data/grade6/ptspaper34.js';
import { ptspaper35 } from './data/grade6/ptspaper35.js';
import { ptspaper36 } from './data/grade6/ptspaper36.js';
import { ptspaper37 } from './data/grade6/ptspaper37.js';
import { ptspaper38 } from './data/grade6/ptspaper38.js';
import { ptspaper39 } from './data/grade6/ptspaper39.js';
import { ptspaper40 } from './data/grade6/ptspaper40.js';
import { 
  grade5paper1, grade5paper2, grade5paper3, grade5paper4, grade5paper5, 
  grade5paper6, grade5paper7, grade5paper8, grade5paper9, grade5paper10, 
  grade5paper11, grade5paper12, grade5paper13, grade5paper14, grade5paper15, 
  grade5paper16, grade5paper17, grade5paper18, grade5paper19, grade5paper20, 
  grade5paper21, grade5paper22, grade5paper23, grade5paper24, grade5paper25, 
  grade5paper26, grade5paper27, grade5paper28, grade5paper29, grade5paper30, 
  grade5paper31, grade5paper32, grade5paper33, grade5paper34, grade5paper35, 
  grade5paper36, grade5paper37, grade5paper38, grade5paper39, grade5paper40 
} from './data/grade5/questions.js';

// Data Imports
import { 
  fullCommerceBank, 
  fullScienceBank, 
  fullGrade5Bank, 
  fullMediaBank, 
  fullChemistryBank, 
  fullPhysicsBank, 
  fullAgriBank, 
  fullGrade6MathsBank, 
  fullGrade6ScienceBank
} from './data/12and13/questions.js';

// Helper for subject titles
const getSubjectTitle = (stream) => {
  if (!stream) return 'COMMERCE වැඩ්ඩෙක්';
  if (stream === 'grade5') return '5 වසර අභියෝගය';
  
  if (String(stream).startsWith('grade6_')) {
    const g6NameMap = {
      'grade6_maths': '6 වසර ගණිතය',
      'grade6_science': '6 වසර විද්‍යාව',
      'grade6_sinhala': '6 වසර සිංහල',
      'grade6_english': '6 වසර ඉංග්‍රීසි',
      'grade6_history': '6 වසර ඉතිහාසය',
      'grade6_religion': '6 වසර බුද්ධ ධර්මය',
      'grade6_buddhism': '6 වසර බුද්ධ ධර්මය',
      'grade6_pts': '6 වසර PTS',
      'grade6_art': '6 වසර චිත්‍ර',
      'grade6_oriental_music': '6 වසර පෙරදිග සංගීතය',
      'grade6_western_music': '6 වසර අපරදිග සංගීතය',
      'grade6_kandyan_dance': '6 වසර උඩරට නර්තනය',
      'grade6_lowcountry_dance': '6 වසර පහතරට නර්තනය',
      'grade6_sabaragamu_dance': '6 වසර සබරගමු නර්තනය',
      'grade6_drama': '6 වසර නාට්‍ය'
    };
    return g6NameMap[stream] || '6 ශ්‍රේණිය';
  }

  const streamTitleMap = {
    biology: 'ජීව විද්‍යාව',
    chemistry: 'රසායන විද්‍යාව',
    physics: 'භෞතික විද්‍යාව',
    agri: 'කෘෂි විද්‍යාව',
    combined_maths: 'සංයුක්ත ගණිතය',
    physics_maths: 'භෞතික විද්‍යාව',
    chemistry_maths: 'රසායන විද්‍යාව',
    ict_maths: 'ICT',
    business_studies: 'ව්‍යාපාර අධ්‍යයනය',
    accounting: 'ගිණුම්කරණය',
    economics: 'ආර්ථික විද්‍යාව',
    ict_commerce: 'ICT',
    sft: 'SFT',
    et: 'ET',
    bst: 'BST',
    ict_tech: 'ICT',
    sinhala: 'සිංහල',
    tamil: 'දෙමළ',
    english: 'ඉංග්‍රීසි',
    japanese: 'ජපන්',
    french: 'ප්‍රංශ',
    hindi: 'හින්දි',
    pol_sci: 'දේශපාලන විද්‍යාව',
    geography_arts: 'භූගෝල විද්‍යාව',
    history: 'ඉතිහාසය',
    econ_arts: 'ආර්ථික විද්‍යාව',
    psychology: 'මනෝ විද්‍යාව',
    art: 'චිත්‍ර',
    music: 'සංගීතය',
    dance: 'නර්තනය',
    drama: 'නාට්‍ය හා රංග කලාව',
    logic: 'තර්ක ශාස්ත්‍රය',
    buddhist_civ: 'බෞද්ධ ශිෂ්ටාචාරය',
    christian_civ: 'ක්‍රිස්තියානි ශිෂ්ටාචාරය',
    media: 'මාධ්‍ය අධ්‍යයනය',
    ict_arts: 'ICT'
  };
  if (streamTitleMap[stream]) return streamTitleMap[stream];

  const scienceStreams = ['biology', 'chemistry', 'physics', 'agri'];
  const mathsStreams = ['combined_maths', 'physics_maths', 'chemistry_maths', 'ict_maths'];
  if (scienceStreams.includes(stream)) return 'SCIENCE වැඩ්ඩෙක්';
  if (mathsStreams.includes(stream)) return 'MATHS වැඩ්ඩෙක්';

  const mediaStreams = ['sinhala', 'tamil', 'english', 'japanese', 'french', 'hindi', 'pol_sci', 'geography_arts', 'history', 'econ_arts', 'psychology', 'art', 'music', 'dance', 'drama', 'logic', 'buddhist_civ', 'christian_civ', 'media', 'ict_arts'];
  if (mediaStreams.includes(stream)) return 'ARTS වැඩ්ඩෙක්';

  const techStreams = ['sft', 'et', 'bst', 'ict_tech'];
  if (techStreams.includes(stream)) return 'TECH වැඩ්ඩෙක්';

  return 'COMMERCE වැඩ්ඩෙක්';
};

// Helper to shuffle array
const shuffleArray = (array) => {
  if (!array || !Array.isArray(array)) return [];
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Funny messages for all modes (Kid-friendly)
const funnyCorrect = [ 
  "🎉 නියමයි! ඔයා නම් මාර වැඩකාරයෙක්!", 
  "🌟 සුපිරි! දිගටම යමු!", 
  "🧠 මොළේ තමයි ඉතින්!", 
  "🚀 නියමටම හරි!", 
  "🎯 අන්න හරි! ඔයා ගින්දර!", 
  "🏆 පට්ට! ඔයා දිනුම්!", 
  "😎 ඔයාට නම් කවුරුත් නෑ හැප්පෙන්න!", 
  "✨ ඒක නම් පංකාදු පහයි!", 
  "💪 එළකිරි! ඔහොම යං!",
  "🐥 පුංචි පැටියා අද දිනුම්!",
  "🦁 ඔයා නම් සිංහ පැටියෙක් වගේ!"
]; 
const funnyWrong = [ 
  "🙈 අපොයි! පොඩ්ඩක් වැරදුනා නේද?", 
  "🤪 කමක් නෑ, ඊළඟ එක හරියටම කරමු!", 
  "🐢 කල්පනාවෙන් හිතලා කරමු!", 
  "😅 අහ්! ඒක නම් වැරදුනා!", 
  "🤦‍♂️ අයියෝ සල්ලි! ආයෙත් බලමුද?", 
  "👀 ඊළඟ එකෙන් ගේමක් ගහමු!", 
  "🙃 හප්පා! පොඩ්ඩයි වැරදුනේ!", 
  "😬 ටිකක් කල්පනා කරමු නේද?", 
  "🧠 හැප්පුනා නේද? කමක් නෑ, ආයෙ කරමු!", 
  "🎈 වැරදුනාට කමක් නෑ, බැලුමක් පිපිරුණා වගේ!",
  "🐌 ඉබ්බා වගේ හිමීට හිතලා බලමුද?"
]; 

export default function App() {
  const [isAppLoaded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameStateRaw] = useState('home'); 
  const [selectedStream, setSelectedStream] = useState(null); 
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userName, setUserName] = useState(() => localStorage.getItem('edu_quest_user_name') || '');
  const [nameConfirmed, setNameConfirmed] = useState(() => !!localStorage.getItem('edu_quest_user_name'));
  const [timeLeft, setTimeLeft] = useState(15);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalUnlikes, setTotalUnlikes] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [grandLeaderboardTab, setGrandLeaderboardTab] = useState('grade5');
  const [leaderboardTab, setLeaderboardTab] = useState('normal');
  const [showAllLeaderboard, setShowAllLeaderboard] = useState(false);
  const [funnyCorrectMessage, setFunnyCorrectMessage] = useState('');
  const [funnyWrongMessage, setFunnyWrongMessage] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [streamView, setStreamView] = useState('main');
  const [authReady, setAuthReady] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [isCloudBoardOpen, setIsCloudBoardOpen] = useState(false);
  const [cloudTopScores, setCloudTopScores] = useState([]);
  const gameStateHistoryRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const setGameState = useCallback((nextState) => {
    setGameStateRaw((prev) => {
      const resolved = typeof nextState === 'function' ? nextState(prev) : nextState;
      if (prev !== resolved) gameStateHistoryRef.current.push(prev);
      return resolved;
    });
  }, []);

  const setGameStateNoHistory = useCallback((nextState) => {
    setGameStateRaw((prev) => (typeof nextState === 'function' ? nextState(prev) : nextState));
  }, []);

  const goBack = useCallback(() => {
    setGameStateRaw((prev) => {
      const history = gameStateHistoryRef.current;
      // Pop states until we find a valid one (skip transient states like 'playing' and 'result')
      while (history.length > 0) {
        const candidate = history.pop();
        if (!candidate) continue;
        if (candidate === 'playing' || candidate === 'result') continue;
        return candidate;
      }
      // If no history, go to home
      return 'home';
    });
  }, []);

  const getCurrentBank = useCallback(() => {
    if (selectedStream === 'grade5') {
      return Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    
    let bank = [];
    if (selectedStream === 'grade6_maths') bank = fullGrade6MathsBank || [];
    else if (selectedStream === 'grade6_science') bank = fullGrade6ScienceBank || [];
    else if (selectedStream === 'grade6_western_music') {
      // Grade 6 Western Music uses per-paper files westernmusicpaper1–40.
      // We expose only lightweight placeholders here for paper selection.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_sinhala') bank = grade6SinhalaBank || [];
    else if (selectedStream === 'grade6_english') {
      // Lightweight placeholders only (prevents lag from concatenating 40 papers).
      // availablePaperIds is derived from q.paperId, and selectPaper uses direct mapping.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_history') {
      // History has papers 1-40.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_buddhism' || selectedStream === 'grade6_religion') {
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_eastern_music' || selectedStream === 'grade6_oriental_music') {
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_kandyan_dance') {
      // Kandyan Dance uses per-paper files kandyandancepaper1–40.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_lowcountry_dance') {
      // Low Country Dance uses per-paper files lowcountrydancepaper1–40.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_sabaragamu_dance') {
      // Sabaragamu Dance uses per-paper files sabaragamudancepaper1–40.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_drama') {
      // Drama uses per-paper files dramapaper1–40.
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_pts') {
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'grade6_art') {
      bank = Array.from({ length: 40 }, (_, idx) => ({ paperId: idx + 1 }));
    }
    else if (selectedStream === 'chemistry' || selectedStream === 'chemistry_maths') bank = fullChemistryBank || [];
    else if (selectedStream === 'physics' || selectedStream === 'physics_maths') bank = fullPhysicsBank || [];
    else if (selectedStream === 'agri') bank = fullAgriBank || [];
    else if (['biology', 'combined_maths', 'ict_maths'].includes(selectedStream)) bank = fullScienceBank || [];
    else if (['sinhala', 'tamil', 'english', 'japanese', 'french', 'hindi', 'pol_sci', 'geography_arts', 'history', 'econ_arts', 'psychology', 'art', 'music', 'dance', 'drama', 'logic', 'buddhist_civ', 'christian_civ', 'media', 'ict_arts'].includes(selectedStream)) bank = fullMediaBank || [];
    else bank = fullCommerceBank || [];

    return bank;
  }, [selectedStream]);

  const availablePaperIds = (() => {
    const bank = getCurrentBank() || [];
    const ids = new Set();
    for (const q of bank) {
      const pidRaw = q?.paperId;
      if (pidRaw === undefined || pidRaw === null) continue;
      const pidStr = String(pidRaw);
      if (pidStr.startsWith('H')) continue;
      const pidNum = Number(pidStr);
      if (!Number.isFinite(pidNum)) continue;
      ids.add(pidNum);
    }
    return ids;
  })();

  const checkAnswer = useCallback((isTimeout = false) => {
    if (showFeedback) return;
    
    const question = currentQuestions[currentIndex];
    if (!question) return;

    const correct = Number(selectedOption) === Number(question.answer);
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 10);
      playSound('correct');
      const msg = funnyCorrect[Math.floor(Math.random() * funnyCorrect.length)];
      setFunnyCorrectMessage(msg);
    } else {
      playSound('wrong');
      const msg = funnyWrong[Math.floor(Math.random() * funnyWrong.length)];
      setFunnyWrongMessage(msg);
    }

    setUserAnswers(prev => [...prev, {
      questionIndex: currentIndex,
      selectedIdx: isTimeout ? -1 : selectedOption,
      isCorrect: correct
    }]);
  }, [showFeedback, currentQuestions, currentIndex, selectedOption]);

  // Auth first, then Firestore operations (strict order).
  useEffect(() => {
    if (!auth || !db) return undefined;

    let unsubscribeLeaderboard = () => {};
    let unsubscribeStats = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user?.uid || '');
    });

    const init = async () => {
      try {
        const customToken = globalThis?.__initial_auth_token;
        if (customToken) await signInWithCustomToken(auth, customToken);
        else await signInAnonymously(auth);
        setAuthReady(true);

        const leaderboardRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
        unsubscribeLeaderboard = onSnapshot(query(leaderboardRef), (snap) => {
          const rawData = snap.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
          const normalizedData = rawData.map((entry) => ({
            ...entry,
            name: entry.name ?? entry.userName ?? 'Guest',
            stream: entry.stream ?? entry.subject ?? 'general',
            type: entry.type ?? 'normal'
          }));

          setLeaderboard(normalizedData);
          const sortedCloud = [...normalizedData]
            .filter((entry) => Number.isFinite(Number(entry.score)))
            .sort((a, b) => Number(b.score) - Number(a.score))
            .slice(0, 20);
          setCloudTopScores(sortedCloud);
        }, (error) => {
          console.warn("Leaderboard fetch error (possibly transient):", error);
        });

        unsubscribeStats = subscribeToStats(appId, (data) => {
          setTotalLikes(data.likes || 0);
          setTotalUnlikes(data.unlikes || 0);
        }, (error) => {
          console.warn("Stats fetch error (possibly transient):", error);
        });
      } catch (e) {
        console.error("Firebase Sync Setup Error:", e);
      }
    };

    init();
    return () => {
      unsubscribeLeaderboard();
      unsubscribeStats();
      unsubscribeAuth();
    };
  }, []);

  // Timer for PRO Mode
  useEffect(() => {
    if (gameState !== 'playing' || !String(selectedPaper).startsWith('H') || showFeedback || timeLeft <= 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          checkAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameState, showFeedback, selectedPaper, timeLeft, checkAnswer]);

  const handleNameConfirm = () => {
    if (userName.trim()) {
      setNameConfirmed(true);
      localStorage.setItem('edu_quest_user_name', userName.trim());
    }
  };

  const selectStream = (stream) => {
    setSelectedStream(stream);
    setGameState('start');
    const isG6 = String(stream).startsWith('grade6_');
    setGrandLeaderboardTab(stream === 'grade5' ? 'grade5' : (isG6 ? 'grade6' : (['biology', 'chemistry', 'physics', 'agri'].includes(stream) ? 'science' : 'commerce')));
  };

  const selectPaper = (paperId) => {
    const activeBank = getCurrentBank();
    const isPro = String(paperId).startsWith('H');
    let paperQuestions;

    if (selectedStream === 'grade5') {
       const grade5Papers = {
         1: grade5paper1,
         2: grade5paper2,
         3: grade5paper3,
         4: grade5paper4,
         5: grade5paper5,
         6: grade5paper6,
         7: grade5paper7,
         8: grade5paper8,
         9: grade5paper9,
         10: grade5paper10,
         11: grade5paper11,
         12: grade5paper12,
         13: grade5paper13,
         14: grade5paper14,
         15: grade5paper15,
         16: grade5paper16,
         17: grade5paper17,
         18: grade5paper18,
         19: grade5paper19,
         20: grade5paper20,
         21: grade5paper21,
         22: grade5paper22,
         23: grade5paper23,
         24: grade5paper24,
         25: grade5paper25,
         26: grade5paper26,
         27: grade5paper27,
         28: grade5paper28,
         29: grade5paper29,
         30: grade5paper30,
         31: grade5paper31,
         32: grade5paper32,
         33: grade5paper33,
         34: grade5paper34,
         35: grade5paper35,
         36: grade5paper36,
         37: grade5paper37,
         38: grade5paper38,
         39: grade5paper39,
         40: grade5paper40,
       };
       
       const selectedPaper = grade5Papers[paperId];

       if (!selectedPaper || selectedPaper.length === 0) {
         alert(`මෙම ප්රශ්න පත්රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
       paperQuestions = [...selectedPaper].sort(() => 0.5 - Math.random());
    } else if (selectedStream === 'grade6_english') {
      const grade6EnglishPapers = {
        1: englishpaper1,
        2: englishpaper2,
        3: englishpaper3,
        4: englishpaper4,
        5: englishpaper5,
        6: englishpaper6,
        7: englishpaper7,
        8: englishpaper8,
        9: englishpaper9,
        10: englishpaper10,
        11: englishpaper11,
        12: englishpaper12,
        13: englishpaper13,
        14: englishpaper14,
        15: englishpaper15,
        16: englishpaper16,
        17: englishpaper17,
        18: englishpaper18,
        19: englishpaper19,
        20: englishpaper20,
        21: englishpaper21,
        22: englishpaper22,
        23: englishpaper23,
        24: englishpaper24,
        25: englishpaper25,
        26: englishpaper26,
        27: englishpaper27,
        28: englishpaper28,
        29: englishpaper29,
        30: englishpaper30,
        31: englishpaper31,
        32: englishpaper32,
        33: englishpaper33,
        34: englishpaper34,
        35: englishpaper35,
        36: englishpaper36,
        37: englishpaper37,
        38: englishpaper38,
        39: englishpaper39,
        40: englishpaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      paperQuestions = grade6EnglishPapers[paperNum];

      if (!paperQuestions || paperQuestions.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      // Grade 6 English: randomize order each time.
      const shuffled = [...paperQuestions];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      paperQuestions = shuffled.slice(0, isPro ? 10 : 40);
    } else if (selectedStream === 'grade6_history') {
      const grade6HistoryPapers = {
        1: historypaper1,
        2: historypaper2,
        3: historypaper3,
        4: historypaper4,
        5: historypaper5,
        6: historypaper6,
        7: historypaper7,
        8: historypaper8,
        9: historypaper9,
        10: historypaper10,
        11: historypaper11,
        12: historypaper12,
        13: historypaper13,
        14: historypaper14,
        15: historypaper15,
        16: historypaper16,
        17: historypaper17,
        18: historypaper18,
        19: historypaper19,
        20: historypaper20,
        21: historypaper21,
        22: historypaper22,
        23: historypaper23,
        24: historypaper24,
        25: historypaper25,
        26: historypaper26,
        27: historypaper27,
        28: historypaper28,
        29: historypaper29,
        30: historypaper30,
        31: historypaper31,
        32: historypaper32,
        33: historypaper33,
        34: historypaper34,
        35: historypaper35,
        36: historypaper36,
        37: historypaper37,
        38: historypaper38,
        39: historypaper39,
        40: historypaper40
      };

      const selectedHistoryPaper = grade6HistoryPapers[paperId];

      if (!selectedHistoryPaper || selectedHistoryPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      // Shuffle so order changes every open.
      paperQuestions = [...selectedHistoryPaper].sort(() => 0.5 - Math.random());
    } else if (selectedStream === 'grade6_buddhism' || selectedStream === 'grade6_religion') {
      const grade6BuddhismPapers = {
        1: buddhismpaper1,
        2: buddhismpaper2,
        3: buddhismpaper3,
        4: buddhismpaper4,
        5: buddhismpaper5,
        6: buddhismpaper6,
        7: buddhismpaper7,
        8: buddhismpaper8,
        9: buddhismpaper9,
        10: buddhismpaper10,
        11: buddhismpaper11,
        12: buddhismpaper12,
        13: buddhismpaper13,
        14: buddhismpaper14,
        15: buddhismpaper15,
        16: buddhismpaper16,
        17: buddhismpaper17,
        18: buddhismpaper18,
        19: buddhismpaper19,
        20: buddhismpaper20,
        21: buddhismpaper21,
        22: buddhismpaper22,
        23: buddhismpaper23,
        24: buddhismpaper24,
        25: buddhismpaper25,
        26: buddhismpaper26,
        27: buddhismpaper27,
        28: buddhismpaper28,
        29: buddhismpaper29,
        30: buddhismpaper30,
        31: buddhismpaper31,
        32: buddhismpaper32,
        33: buddhismpaper33,
        34: buddhismpaper34,
        35: buddhismpaper35,
        36: buddhismpaper36,
        37: buddhismpaper37,
        38: buddhismpaper38,
        39: buddhismpaper39,
        40: buddhismpaper40
      };

      const selectedBuddhismPaper = grade6BuddhismPapers[paperId];

      if (!selectedBuddhismPaper || selectedBuddhismPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
      paperQuestions = [...selectedBuddhismPaper].sort(() => 0.5 - Math.random());
    } else if (selectedStream === 'grade6_eastern_music' || selectedStream === 'grade6_oriental_music') {
       const grade6EasternMusicPapers = {
         1: easternmusicpaper1,
         2: easternmusicpaper2,
         3: easternmusicpaper3,
         4: easternmusicpaper4,
         5: easternmusicpaper5,
         6: easternmusicpaper6,
         7: easternmusicpaper7,
         8: easternmusicpaper8,
         9: easternmusicpaper9,
         10: easternmusicpaper10,
         11: easternmusicpaper11,
         12: easternmusicpaper12,
         13: easternmusicpaper13,
         14: easternmusicpaper14,
         15: easternmusicpaper15,
         16: easternmusicpaper16,
         17: easternmusicpaper17,
         18: easternmusicpaper18,
         19: easternmusicpaper19,
         20: easternmusicpaper20,
         21: easternmusicpaper21,
         22: easternmusicpaper22,
         23: easternmusicpaper23,
         24: easternmusicpaper24,
         25: easternmusicpaper25,
         26: easternmusicpaper26,
         27: easternmusicpaper27,
         28: easternmusicpaper28,
         29: easternmusicpaper29,
         30: easternmusicpaper30,
         31: easternmusicpaper31,
         32: easternmusicpaper32,
         33: easternmusicpaper33,
         34: easternmusicpaper34,
         35: easternmusicpaper35,
         36: easternmusicpaper36,
         37: easternmusicpaper37,
         38: easternmusicpaper38,
         39: easternmusicpaper39,
         40: easternmusicpaper40,
       };
       
       const selectedPaper = grade6EasternMusicPapers[paperId];

       if (!selectedPaper || selectedPaper.length === 0) {
         alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
       paperQuestions = [...selectedPaper].sort(() => 0.5 - Math.random());

    } else if (selectedStream === 'grade6_western_music') {
      const grade6WesternMusicPapers = {
        1: westernmusicpaper1,
        2: westernmusicpaper2,
        3: westernmusicpaper3,
        4: westernmusicpaper4,
        5: westernmusicpaper5,
        6: westernmusicpaper6,
        7: westernmusicpaper7,
        8: westernmusicpaper8,
        9: westernmusicpaper9,
        10: westernmusicpaper10,
        11: westernmusicpaper11,
        12: westernmusicpaper12,
        13: westernmusicpaper13,
        14: westernmusicpaper14,
        15: westernmusicpaper15,
        16: westernmusicpaper16,
        17: westernmusicpaper17,
        18: westernmusicpaper18,
        19: westernmusicpaper19,
        20: westernmusicpaper20,
        21: westernmusicpaper21,
        22: westernmusicpaper22,
        23: westernmusicpaper23,
        24: westernmusicpaper24,
        25: westernmusicpaper25,
        26: westernmusicpaper26,
        27: westernmusicpaper27,
        28: westernmusicpaper28,
        29: westernmusicpaper29,
        30: westernmusicpaper30,
        31: westernmusicpaper31,
        32: westernmusicpaper32,
        33: westernmusicpaper33,
        34: westernmusicpaper34,
        35: westernmusicpaper35,
        36: westernmusicpaper36,
        37: westernmusicpaper37,
        38: westernmusicpaper38,
        39: westernmusicpaper39,
        40: westernmusicpaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      const selectedWesternPaper = grade6WesternMusicPapers[paperNum];

      if (!selectedWesternPaper || selectedWesternPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      paperQuestions = selectedWesternPaper;

    } else if (selectedStream === 'grade6_kandyan_dance') {
      const grade6KandyanDancePapers = {
        1: kandyandancepaper1,
        2: kandyandancepaper2,
        3: kandyandancepaper3,
        4: kandyandancepaper4,
        5: kandyandancepaper5,
        6: kandyandancepaper6,
        7: kandyandancepaper7,
        8: kandyandancepaper8,
        9: kandyandancepaper9,
        10: kandyandancepaper10,
        11: kandyandancepaper11,
        12: kandyandancepaper12,
        13: kandyandancepaper13,
        14: kandyandancepaper14,
        15: kandyandancepaper15,
        16: kandyandancepaper16,
        17: kandyandancepaper17,
        18: kandyandancepaper18,
        19: kandyandancepaper19,
        20: kandyandancepaper20,
        21: kandyandancepaper21,
        22: kandyandancepaper22,
        23: kandyandancepaper23,
        24: kandyandancepaper24,
        25: kandyandancepaper25,
        26: kandyandancepaper26,
        27: kandyandancepaper27,
        28: kandyandancepaper28,
        29: kandyandancepaper29,
        30: kandyandancepaper30,
        31: kandyandancepaper31,
        32: kandyandancepaper32,
        33: kandyandancepaper33,
        34: kandyandancepaper34,
        35: kandyandancepaper35,
        36: kandyandancepaper36,
        37: kandyandancepaper37,
        38: kandyandancepaper38,
        39: kandyandancepaper39,
        40: kandyandancepaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      const selectedKandyanPaper = grade6KandyanDancePapers[paperNum];

      if (!selectedKandyanPaper || selectedKandyanPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      paperQuestions = selectedKandyanPaper;

    } else if (selectedStream === 'grade6_lowcountry_dance') {
      const grade6LowCountryDancePapers = {
        1: lowcountrydancepaper1,
        2: lowcountrydancepaper2,
        3: lowcountrydancepaper3,
        4: lowcountrydancepaper4,
        5: lowcountrydancepaper5,
        6: lowcountrydancepaper6,
        7: lowcountrydancepaper7,
        8: lowcountrydancepaper8,
        9: lowcountrydancepaper9,
        10: lowcountrydancepaper10,
        11: lowcountrydancepaper11,
        12: lowcountrydancepaper12,
        13: lowcountrydancepaper13,
        14: lowcountrydancepaper14,
        15: lowcountrydancepaper15,
        16: lowcountrydancepaper16,
        17: lowcountrydancepaper17,
        18: lowcountrydancepaper18,
        19: lowcountrydancepaper19,
        20: lowcountrydancepaper20,
        21: lowcountrydancepaper21,
        22: lowcountrydancepaper22,
        23: lowcountrydancepaper23,
        24: lowcountrydancepaper24,
        25: lowcountrydancepaper25,
        26: lowcountrydancepaper26,
        27: lowcountrydancepaper27,
        28: lowcountrydancepaper28,
        29: lowcountrydancepaper29,
        30: lowcountrydancepaper30,
        31: lowcountrydancepaper31,
        32: lowcountrydancepaper32,
        33: lowcountrydancepaper33,
        34: lowcountrydancepaper34,
        35: lowcountrydancepaper35,
        36: lowcountrydancepaper36,
        37: lowcountrydancepaper37,
        38: lowcountrydancepaper38,
        39: lowcountrydancepaper39,
        40: lowcountrydancepaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      const selectedLowCountryPaper = grade6LowCountryDancePapers[paperNum];

      if (!selectedLowCountryPaper || selectedLowCountryPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
      paperQuestions = [...selectedLowCountryPaper].sort(() => 0.5 - Math.random());

    } else if (selectedStream === 'grade6_sabaragamu_dance') {
      const grade6SabaragamuDancePapers = {
        1: sabaragamudancepaper1,
        2: sabaragamudancepaper2,
        3: sabaragamudancepaper3,
        4: sabaragamudancepaper4,
        5: sabaragamudancepaper5,
        6: sabaragamudancepaper6,
        7: sabaragamudancepaper7,
        8: sabaragamudancepaper8,
        9: sabaragamudancepaper9,
        10: sabaragamudancepaper10,
        11: sabaragamudancepaper11,
        12: sabaragamudancepaper12,
        13: sabaragamudancepaper13,
        14: sabaragamudancepaper14,
        15: sabaragamudancepaper15,
        16: sabaragamudancepaper16,
        17: sabaragamudancepaper17,
        18: sabaragamudancepaper18,
        19: sabaragamudancepaper19,
        20: sabaragamudancepaper20,
        21: sabaragamudancepaper21,
        22: sabaragamudancepaper22,
        23: sabaragamudancepaper23,
        24: sabaragamudancepaper24,
        25: sabaragamudancepaper25,
        26: sabaragamudancepaper26,
        27: sabaragamudancepaper27,
        28: sabaragamudancepaper28,
        29: sabaragamudancepaper29,
        30: sabaragamudancepaper30,
        31: sabaragamudancepaper31,
        32: sabaragamudancepaper32,
        33: sabaragamudancepaper33,
        34: sabaragamudancepaper34,
        35: sabaragamudancepaper35,
        36: sabaragamudancepaper36,
        37: sabaragamudancepaper37,
        38: sabaragamudancepaper38,
        39: sabaragamudancepaper39,
        40: sabaragamudancepaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      const selectedSabaragamuPaper = grade6SabaragamuDancePapers[paperNum];

      if (!selectedSabaragamuPaper || selectedSabaragamuPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      paperQuestions = [...selectedSabaragamuPaper].sort(() => 0.5 - Math.random());

    } else if (selectedStream === 'grade6_drama') {
      const grade6DramaPapers = {
        1: dramapaper1,
        2: dramapaper2,
        3: dramapaper3,
        4: dramapaper4,
        5: dramapaper5,
        6: dramapaper6,
        7: dramapaper7,
        8: dramapaper8,
        9: dramapaper9,
        10: dramapaper10,
        11: dramapaper11,
        12: dramapaper12,
        13: dramapaper13,
        14: dramapaper14,
        15: dramapaper15,
        16: dramapaper16,
        17: dramapaper17,
        18: dramapaper18,
        19: dramapaper19,
        20: dramapaper20,
        21: dramapaper21,
        22: dramapaper22,
        23: dramapaper23,
        24: dramapaper24,
        25: dramapaper25,
        26: dramapaper26,
        27: dramapaper27,
        28: dramapaper28,
        29: dramapaper29,
        30: dramapaper30,
        31: dramapaper31,
        32: dramapaper32,
        33: dramapaper33,
        34: dramapaper34,
        35: dramapaper35,
        36: dramapaper36,
        37: dramapaper37,
        38: dramapaper38,
        39: dramapaper39,
        40: dramapaper40
      };

      const paperNum = isPro ? Number(String(paperId).replace('H', '')) : Number(paperId);
      const selectedDramaPaper = grade6DramaPapers[paperNum];

      if (!selectedDramaPaper || selectedDramaPaper.length === 0) {
        alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
        return;
      }

      paperQuestions = [...selectedDramaPaper].sort(() => 0.5 - Math.random());

    } else if (selectedStream === 'grade6_art') {
       const grade6ArtPapers = {
         1: artpaper1,
         2: artpaper2,
         3: artpaper3,
         4: artpaper4,
         5: artpaper5,
         6: artpaper6,
         7: artpaper7,
         8: artpaper8,
         9: artpaper9,
         10: artpaper10,
         11: artpaper11,
         12: artpaper12,
         13: artpaper13,
         14: artpaper14,
         15: artpaper15,
         16: artpaper16,
         17: artpaper17,
         18: artpaper18,
         19: artpaper19,
         20: artpaper20,
         21: artpaper21,
         22: artpaper22,
         23: artpaper23,
         24: artpaper24,
         25: artpaper25,
         26: artpaper26,
         27: artpaper27,
         28: artpaper28,
         29: artpaper29,
         30: artpaper30,
         31: artpaper31,
         32: artpaper32,
         33: artpaper33,
         34: artpaper34,
         35: artpaper35,
         36: artpaper36,
         37: artpaper37,
         38: artpaper38,
         39: artpaper39,
         40: artpaper40,
       };
       
       const selectedPaper = grade6ArtPapers[paperId];

       if (!selectedPaper || selectedPaper.length === 0) {
         alert(`මෙම ප්රශ්න පත්රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
       paperQuestions = [...selectedPaper].sort(() => 0.5 - Math.random());
    } else if (selectedStream === 'grade6_pts') {
       const grade6PTSPapers = {
         1: ptspaper1,
         2: ptspaper2,
         3: ptspaper3,
         4: ptspaper4,
         5: ptspaper5,
         6: ptspaper6,
         7: ptspaper7,
         8: ptspaper8,
         9: ptspaper9,
         10: ptspaper10,
         11: ptspaper11,
         12: ptspaper12,
         13: ptspaper13,
         14: ptspaper14,
         15: ptspaper15,
         16: ptspaper16,
         17: ptspaper17,
         18: ptspaper18,
         19: ptspaper19,
         20: ptspaper20,
         21: ptspaper21,
         22: ptspaper22,
         23: ptspaper23,
         24: ptspaper24,
         25: ptspaper25,
         26: ptspaper26,
         27: ptspaper27,
         28: ptspaper28,
         29: ptspaper29,
         30: ptspaper30,
         31: ptspaper31,
         32: ptspaper32,
         33: ptspaper33,
         34: ptspaper34,
         35: ptspaper35,
         36: ptspaper36,
         37: ptspaper37,
         38: ptspaper38,
         39: ptspaper39,
         40: ptspaper40,
       };
       
       const selectedPaper = grade6PTSPapers[paperId];

       if (!selectedPaper || selectedPaper.length === 0) {
         alert(`මෙම ප්රශ්න පත්රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS so they appear in a random order every time the paper is opened!
       paperQuestions = [...selectedPaper].sort(() => 0.5 - Math.random());
    } else if (selectedStream === 'grade6_sinhala') {
      paperQuestions = (activeBank || []).filter((q) => String(q?.paperId) === String(paperId));
    } else {
      // Keep existing logic for other streams.
      paperQuestions = (activeBank || []).filter((q) => String(q?.paperId) === String(paperId));
    }

    if (!paperQuestions || paperQuestions.length === 0) {
      alert(`මෙම විෂය සඳහා තවමත් ප්‍රශ්න ඇතුළත් කර නැත. ළඟදීම බලාපොරොත්තු වන්න!`);
      return;
    }

    setSelectedPaper(paperId);

    if (selectedStream !== 'grade6_english') {
      // STRICT RANDOMIZATION & NO DUPLICATES: Fisher–Yates shuffle full pool, then slice
      // (`.sort(() => Math.random() - 0.5)` is biased; Fisher–Yates is uniform.)
      const shuffled = [...paperQuestions];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      paperQuestions = shuffled.slice(0, isPro ? 10 : 40);
    }

    setCurrentQuestions(paperQuestions);
     setCurrentIndex(0);
     setScore(0);
     setGameState('playing');
     setShowFeedback(false);
     setSelectedOption(null);
     setUserAnswers([]);
     setShowReview(false);
     setUserVote(null);
     
     let initialTime = 15;
     if (String(paperId).startsWith('H')) {
       initialTime = selectedStream === 'grade5' ? 45 : 30;
     }
     setTimeLeft(initialTime);
   };

  const skipQuestion = () => {
    if (showFeedback) return;
    nextStep();
  };

  const nextStep = () => {
    const isHardMode = String(selectedPaper).startsWith('H');
    if (isHardMode && !isCorrect) {
      setGameState('result');
      persistResultScore(false);
      return;
    }
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
      let nextTime = 15;
      if (String(selectedPaper).startsWith('H')) nextTime = selectedStream === 'grade5' ? 45 : 30;
      setTimeLeft(nextTime);
    } else {
      setGameState('result');
      persistResultScore(true);
    }
  };

  const saveScore = useCallback(async (name, marks, subject, extra = {}) => {
    if (!authReady || !db) return;
    const cleanName = String(name || '').trim();
    if (!cleanName) return;
    const leaderboardRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
    await addDoc(leaderboardRef, {
      userName: cleanName,
      score: Number(marks) || 0,
      subject: subject || 'general',
      timestamp: Date.now(),
      userId: auth?.currentUser?.uid || currentUserId || 'anonymous',
      ...extra
    });
  }, [authReady, currentUserId]);

  const persistResultScore = async (isLevelSuccess = true) => {
    const isHardMode = String(selectedPaper).startsWith('H');
    if (isHardMode && !isLevelSuccess) return; 
    try {
      let finalName = String(userName || '').trim();
      if (!finalName) {
        const prompted = window.prompt('ඔබගේ නම ඇතුළත් කරන්න (Leaderboard සඳහා):', '');
        finalName = String(prompted || '').trim();
        if (!finalName) return;
        setUserName(finalName);
        setNameConfirmed(true);
        localStorage.setItem('edu_quest_user_name', finalName);
      }

      await saveScore(finalName, score, selectedStream, {
        name: finalName,
        paperId: selectedPaper,
        stream: selectedStream,
        type: isHardMode ? 'pro' : 'normal'
      });
    } catch (e) { console.error("Save error:", e); }
  };

  const finishAndSaveVote = async (type) => {
    if (userVote) return;
    setUserVote(type);
    try {
      await updateStatsVote(appId, type);
    } catch (e) { console.error("Vote error:", e); }
  };

  const isScience = ['biology', 'chemistry', 'physics', 'agri', 'combined_maths', 'physics_maths', 'chemistry_maths', 'ict_maths'].includes(selectedStream);
  const isGrade5 = selectedStream === 'grade5';
  const isGrade6 = String(selectedStream).startsWith('grade6_');
  const isCommerce = ['accounting', 'business_studies', 'economics', 'ict_commerce'].includes(selectedStream);
  const isTech = ['sft', 'et', 'bst', 'ict_tech'].includes(selectedStream);
  const isMedia = ['sinhala', 'tamil', 'english', 'japanese', 'french', 'hindi', 'pol_sci', 'geography_arts', 'history', 'econ_arts', 'psychology', 'art', 'music', 'dance', 'drama', 'logic', 'buddhist_civ', 'christian_civ', 'media', 'ict_arts'].includes(selectedStream);
  
  let themeColor = 'blue';
  let ThemeIcon = Brain;
  let subjectTitle = getSubjectTitle(selectedStream);

  if (isScience) { themeColor = 'emerald'; ThemeIcon = Microscope; }
  else if (isGrade5) { themeColor = 'amber'; ThemeIcon = BookOpen; }
  else if (isGrade6) { 
    themeColor = 'emerald'; 
    ThemeIcon = BookOpen; 
    if (selectedStream && (selectedStream.includes('art') || selectedStream.includes('music') || selectedStream.includes('dance') || selectedStream.includes('drama'))) {
      themeColor = 'violet';
      ThemeIcon = Music;
    }
  }
  else if (isMedia) { themeColor = 'pink'; ThemeIcon = Palette; }
  else if (isTech) { themeColor = 'orange'; ThemeIcon = Cpu; }
  else if (isCommerce) { themeColor = 'blue'; ThemeIcon = Calculator; }

  const nextProLevelToPlay = (() => {
    const userInLeaderboard = leaderboard.filter(e => e.name === userName && e.type === 'pro' && e.stream === selectedStream);
    if (userInLeaderboard.length === 0) return 1;
    const maxLvl = Math.max(...userInLeaderboard.map(e => parseInt(String(e.paperId).replace('H',''))));
    return maxLvl + 1;
  })();

  const hardModeChamp = [...leaderboard]
    .filter(e => e.type === 'pro')
    .sort((a,b) => {
       const lvlA = parseInt(String(a.paperId).replace('H',''));
       const lvlB = parseInt(String(b.paperId).replace('H',''));
       return lvlB - lvlA;
    })[0];

  const filteredLeaderboard = leaderboard
    .filter(e => e.type === leaderboardTab)
    .filter(e => !selectedStream || e.stream === selectedStream)
    .reduce((acc, current) => {
       const x = acc.find(item => item.name === current.name && item.stream === current.stream);
       if (!x) return acc.concat([current]);
       if (leaderboardTab === 'pro') {
         const curLvl = parseInt(String(current.paperId).replace('H',''));
         const xLvl = parseInt(String(x.paperId).replace('H',''));
         if (curLvl > xLvl) {
           x.paperId = current.paperId;
           x.proLevel = curLvl;
         }
       } else {
         if (current.score > x.score) x.score = current.score;
       }
       return acc;
    }, [])
    .sort((a,b) => {
      if (leaderboardTab === 'pro') {
        const lvlA = parseInt(String(a.paperId).replace('H',''));
        const lvlB = parseInt(String(b.paperId).replace('H',''));
        return lvlB - lvlA;
      }
      return b.score - a.score;
    });

  const displayedLeaderboard = showAllLeaderboard ? filteredLeaderboard : filteredLeaderboard.slice(0, 5);

  if (!isAppLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <div className="text-blue-500 animate-pulse font-black text-3xl tracking-tighter">EDU QUEST PRO</div>
        <div className="text-slate-500 font-bold text-sm uppercase tracking-widest">Loading Experience...</div>
      </div>
    );
  }

  const nameGateActive = gameState === 'home' && !nameConfirmed;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center z-50 overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="relative group mt-[-40px]">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl p-7 rounded-3xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.3)] transform transition-transform duration-1000 hover:scale-105">
            <Brain className="w-24 h-24 text-blue-400 animate-bounce" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="mt-10 text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          EDU QUEST <span className="text-white">PRO</span>
        </h1>

        <div className="mt-8 flex items-center gap-3 text-cyan-400/90 bg-blue-900/20 px-7 py-3 rounded-full border border-blue-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
          <span className="tracking-[0.2em] text-xs uppercase font-bold">Initializing Knowledge Core...</span>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-semibold flex items-center gap-1">
            Crafted With <Sparkles className="w-3 h-3 text-yellow-500"/> By
          </span>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 font-black tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              Nadeesha Malith
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header
          className={
            nameGateActive
              ? 'flex justify-between items-center mb-12 border-b border-white/5 pb-8 blur-md sm:blur-lg opacity-[0.42] pointer-events-none select-none scale-[0.99] transition-[filter,opacity,transform] duration-300 ease-out'
              : 'flex justify-between items-center mb-12 border-b border-white/5 pb-8 transition-[filter,opacity,transform] duration-300 ease-out'
          }
        >
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setGameState('home')}>
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-2xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
               <Brain className="w-8 h-8 text-white" />
             </div>
             <div>
               <h1 className="text-2xl font-black tracking-tighter text-white">EDU QUEST <span className="text-blue-500">PRO</span></h1>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">The Ultimate Knowledge Hub</p>
             </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGameState('history')} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-slate-400 hover:text-white border border-transparent hover:border-white/10"><History className="w-6 h-6" /></button>
            <button onClick={() => setGameState('leaderboard_full')} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-slate-400 hover:text-white border border-transparent hover:border-white/10"><Trophy className="w-6 h-6" /></button>
            <button onClick={() => setIsCloudBoardOpen(true)} className="p-3 hover:bg-blue-500/10 rounded-2xl transition-colors text-blue-300 hover:text-white border border-blue-500/20 hover:border-blue-400/40"><Award className="w-6 h-6" /></button>
          </div>
        </header>

        {gameState === 'home' && (
          <HomeView 
            totalLikes={totalLikes} 
            totalUnlikes={totalUnlikes} 
            hardModeChamp={hardModeChamp} 
            userName={userName} 
            nameConfirmed={nameConfirmed} 
            setUserName={setUserName} 
            handleNameConfirm={handleNameConfirm} 
            selectStream={selectStream} 
            setGameState={setGameState} 
            setNameConfirmed={setNameConfirmed}
            leaderboard={leaderboard}
            setGrandLeaderboardTab={setGrandLeaderboardTab}
            setStreamView={setStreamView}
          />
        )}

        {gameState === 'stream_select' && (
           <ALStreamSelect 
             onBack={goBack} 
             onStreamSelect={selectStream} 
             view={streamView}
             setView={setStreamView}
           />
        )}

        {gameState === 'grade6_select' && (
          <Grade6StreamSelect 
            onBack={goBack}
            onStreamSelect={selectStream}
            view={streamView}
            setView={setStreamView}
          />
        )}

        {gameState === 'grand_leaderboard' && (
          <GrandLeaderboard 
            leaderboard={leaderboard} 
            grandLeaderboardTab={grandLeaderboardTab} 
            setGrandLeaderboardTab={setGrandLeaderboardTab} 
            onBack={goBack} 
            userName={userName}
          />
        )}

        {gameState === 'start' && (
          <StartView 
            themeColor={themeColor} 
            ThemeIcon={ThemeIcon} 
            subjectTitle={subjectTitle} 
            isGrade5={isGrade5} 
            userName={userName} 
            onBack={goBack}
            setGameState={setGameState} 
          />
        )}

        {gameState === 'select_paper' && (
          <PaperSelectionView 
            themeColor={themeColor} 
            isGrade5={isGrade5} 
            isGrade6={isGrade6}
            selectedStream={selectedStream}
            availablePaperIds={availablePaperIds}
            paperTitle={subjectTitle}
            nextProLevelToPlay={nextProLevelToPlay}
            quizBankReady={(getCurrentBank() || []).length > 0}
            selectPaper={selectPaper} 
            onBack={goBack}
          />
        )}

        {gameState === 'playing' && currentQuestions.length > 0 && (
          <QuizView 
            selectedPaper={selectedPaper} 
            currentIndex={currentIndex} 
            currentQuestions={currentQuestions} 
            isHardMode={String(selectedPaper).startsWith('H')} 
            timeLeft={timeLeft} 
            score={score} 
            showFeedback={showFeedback} 
            selectedOption={selectedOption} 
            isCorrect={isCorrect} 
            selectOption={(idx) => { if (!showFeedback) setSelectedOption(Number(idx)); }} 
            checkAnswer={checkAnswer} 
            skipQuestion={skipQuestion} 
            nextStep={nextStep} 
            setGameState={setGameState} 
            funnyCorrectMessage={funnyCorrectMessage} 
            funnyWrongMessage={funnyWrongMessage} 
          />
        )}

        {gameState === 'playing' && currentQuestions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">ප්‍රශ්න පත්‍රය සූදානම් වෙමින් පවතී...</h2>
            <p className="text-slate-400 text-sm mb-6">ප්‍රශ්න පත්‍රය ලෝඩ් වීමට මඳ වේලාවක් ගත විය හැක. කරුණාකර රැඳී සිටින්න.</p>
            <button onClick={() => setGameState('select_paper')} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl font-bold transition-all">නැවත යන්න</button>
          </div>
        )}

        {gameState === 'result' && (
          <ResultView 
            score={score}
            currentQuestions={currentQuestions}
            isHardMode={String(selectedPaper).startsWith('H')}
            isCorrect={isCorrect}
            userVote={userVote}
            finishAndSaveVote={finishAndSaveVote}
            setGameState={setGameState}
            showReview={showReview}
            setShowReview={setShowReview}
            userAnswers={userAnswers}
            selectedPaper={selectedPaper}
            selectPaper={selectPaper}
          />
        )}

        {gameState === 'history' && (
          <HistoryView 
            userHistory={leaderboard.filter(e => e.name === userName).sort((a, b) => b.timestamp - a.timestamp)} 
            setGameState={setGameState}
            onBack={goBack}
          />
        )}

        {gameState === 'leaderboard_full' && (
          <LeaderboardView 
            leaderboardTab={leaderboardTab} 
            setLeaderboardTab={setLeaderboardTab} 
            setShowAllLeaderboard={setShowAllLeaderboard} 
            selectedStream={selectedStream} 
            setSelectedStream={setSelectedStream} 
            displayedLeaderboard={displayedLeaderboard} 
            filteredLeaderboard={filteredLeaderboard} 
            showAllLeaderboard={showAllLeaderboard} 
            setGameState={setGameState}
            onBack={goBack}
          />
        )}
      </div>
      
      {/* Floating Feedback Button */}
      {nameConfirmed && (
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-[0_10px_40px_rgba(79,70,229,0.5)] hover:-translate-y-2 transition-all hover:scale-110 group border-2 border-indigo-400/30 flex items-center justify-center animate-in slide-in-from-bottom-8 duration-500"
          title="අදහස් දැක්වීම"
        >
          <MessageSquareHeart className="w-6 h-6 animate-pulse group-hover:animate-none" />
        </button>
      )}

      {/* Actual Feedback Modal */}
      {isFeedbackOpen && (
        <FeedbackModal 
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          userName={userName}
          onSubmit={async (data) => await saveUserComment(appId, data)}
        />
      )}

      {isCloudBoardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-blue-500/30 bg-[#0a0f18] shadow-[0_0_50px_rgba(59,130,246,0.35)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-indigo-600/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/40">
                  <Trophy className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-white font-black tracking-wide">ලකුණු පුවරුව</h3>
                  <p className="text-xs text-blue-200/80">Live Cloud Leaderboard</p>
                </div>
              </div>
              <button onClick={() => setIsCloudBoardOpen(false)} className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-2">
              {cloudTopScores.length === 0 ? (
                <div className="text-center py-12 text-slate-400">තවම ලකුණු නොමැත. පළමුව තරඟ කරමු!</div>
              ) : cloudTopScores.map((entry, idx) => (
                <div key={entry.id || `${entry.userId || 'u'}-${idx}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-200 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{entry.userName || entry.name || 'Guest'}</p>
                      <p className="text-xs text-slate-400">{getSubjectTitle(entry.subject || entry.stream)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-300 font-black text-lg">{Number(entry.score) || 0}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">marks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase pb-8">EDU QUEST PRO ⬢ 2024</footer>
    </div>
  );
}
