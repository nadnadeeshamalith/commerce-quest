import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, Star, ArrowRight, RefreshCw, CircleCheck, 
  CircleX, BookOpen, Loader2, Award, 
  ChevronRight, Brain, ArrowLeft, X, LayoutGrid, ListCheck, History, UserCircle,
  ThumbsUp, ThumbsDown, Microscope, Atom, Calculator, Zap, Beaker, Heart, Flame, Skull, Sparkles, Lock, Unlock, Timer, GraduationCap, Pencil,
  Camera, Palette, Cpu, Music, MessageSquareHeart
} from 'lucide-react';
import { 
  signInAnonymously 
} from 'firebase/auth';

import { auth } from './firebase';
import { 
  subscribeToLeaderboard, 
  saveUserScore, 
  subscribeToStats, 
  updateStatsVote,
  saveUserComment
} from './data/database/database';

const appId = typeof globalThis !== 'undefined' && globalThis.__app_id ? globalThis.__app_id : 'commerce-quest-pro-40';

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
import { ptspaper1 } from './data/grade6/ptspaper1.js';
import { ptspaper2 } from './data/grade6/ptspaper2.js';
import { ptspaper3 } from './data/grade6/ptspaper3.js';
import { ptspaper4 } from './data/grade6/ptspaper4.js';
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
  fullGrade6OrientalMusicBank,
  fullGrade6WesternMusicBank,
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
  const gameStateHistoryRef = useRef([]);

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
    else if (selectedStream === 'grade6_western_music') bank = fullGrade6WesternMusicBank || [];
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
    else if (selectedStream === 'grade6_pts') {
      bank = Array.from({ length: 4 }, (_, idx) => ({ paperId: idx + 1 }));
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

  // Auth & Sync
  useEffect(() => {
    try {
      signInAnonymously(auth).catch(err => console.error("Auth error:", err));
      
      const unsubLeaderboard = subscribeToLeaderboard(appId, (data) => {
        setLeaderboard(data);
      }, (error) => {
        console.warn("Leaderboard fetch error (possibly transient):", error);
      });

      const unsubStats = subscribeToStats(appId, (data) => {
        setTotalLikes(data.likes || 0);
        setTotalUnlikes(data.unlikes || 0);
      }, (error) => {
        console.warn("Stats fetch error (possibly transient):", error);
      });

      return () => { unsubLeaderboard(); unsubStats(); };
    } catch (e) {
      console.error("Firebase Sync Setup Error:", e);
    }
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
       
       const selectedPaperObj = grade5Papers[paperId];

       if (!selectedPaperObj || selectedPaperObj.length === 0) {
         alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS so they appear in a random order
       paperQuestions = [...selectedPaperObj].sort(() => 0.5 - Math.random());
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
    } else if (selectedStream === 'grade6_pts') {
       const grade6PTSPapers = {
         1: ptspaper1,
         2: ptspaper2,
         3: ptspaper3,
         4: ptspaper4,
       };
       
       const selectedPaper = grade6PTSPapers[paperId];

       if (!selectedPaper || selectedPaper.length === 0) {
         alert(`මෙම ප්‍රශ්න පත්‍රය තවමත් සකස් කර නොමැත.`);
         return;
       }

       // SHUFFLE THE QUESTIONS
       paperQuestions = [...selectedPaper].sort(() => 0.5 - Math.random());
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
      saveScore(false);
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
      saveScore(true);
    }
  };

  const saveScore = async (isLevelSuccess = true) => {
    if (!userName || !nameConfirmed) return;
    const isHardMode = String(selectedPaper).startsWith('H');
    if (isHardMode && !isLevelSuccess) return; 
    try {
      await saveUserScore(appId, {
        name: userName,
        score: score,
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

      <footer className="mt-12 text-center text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase pb-8">EDU QUEST PRO ⬢ 2024</footer>
    </div>
  );
}
