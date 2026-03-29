import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, Star, ArrowRight, RefreshCw, CircleCheck, 
  CircleX, BookOpen, Loader2, Award, 
  ChevronRight, Brain, ArrowLeft, X, LayoutGrid, ListCheck, History, UserCircle,
  ThumbsUp, ThumbsDown, Microscope, Atom, Calculator, Zap, Beaker, Heart, Flame, Skull, Sparkles, Lock, Unlock, Timer, GraduationCap, Pencil,
  Camera, Palette, Cpu, Music
} from 'lucide-react';
import { 
  signInAnonymously 
} from 'firebase/auth';

// Firebase Service Import
import { auth } from './firebase';
import { 
  subscribeToLeaderboard, 
  saveUserScore, 
  subscribeToStats, 
  updateStatsVote 
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
} from './data/12and13/questions';

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
      'grade6_religion': '6 වසර ආගම',
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
      while (history.length > 0) {
        const candidate = history.pop();
        if (!candidate) continue;
        if (candidate === 'playing' || candidate === 'result') continue;
        return candidate;
      }
      return prev;
    });
  }, []);

  const getCurrentBank = useCallback(() => {
    if (selectedStream === 'grade5') return fullGrade5Bank || [];
    
    let bank = [];
    if (selectedStream === 'grade6_maths') bank = fullGrade6MathsBank || [];
    else if (selectedStream === 'grade6_science') bank = fullGrade6ScienceBank || [];
    else if (selectedStream === 'grade6_oriental_music') bank = fullGrade6OrientalMusicBank || [];
    else if (selectedStream === 'grade6_western_music') bank = fullGrade6WesternMusicBank || [];
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
    setSelectedPaper(paperId);
    
    const bank = getCurrentBank();
    let sessionPool = [];

    // Simplified Paper Selection Logic
    const isHardMode = String(paperId).startsWith('H');
    if (!isHardMode) {
      const pool = bank.filter(q => String(q.paperId) === String(paperId));
      sessionPool = shuffleArray(pool);
    } else {
      // PRO Mode logic
      const shuffled = shuffleArray(bank);
      const lvlNum = parseInt(String(paperId).replace('H', ''));
      let qCount = 3;
      if (lvlNum === 2) qCount = 5;
      else if (lvlNum === 3) qCount = 7;
      else if (lvlNum >= 4) qCount = 5 + (lvlNum - 4) * 2;
      sessionPool = shuffled.slice(0, qCount);
    }

    setCurrentQuestions(sessionPool);
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

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
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
            selectPaper={selectPaper} 
            onBack={() => setGameStateNoHistory('start')}
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
          />
        )}
      </div>
      <footer className="mt-12 text-center text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase pb-8">EDU QUEST PRO ⬢ 2024</footer>
    </div>
  );
}
