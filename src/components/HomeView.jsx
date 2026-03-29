import React from 'react';
import { ThumbsUp, ThumbsDown, Star, Trophy, UserCircle, ArrowRight, BookOpen, Lock, GraduationCap, Flame } from 'lucide-react';
import { CrownIcon } from './Icons';

export default function HomeView({
  totalLikes,
  totalUnlikes,
  hardModeChamp,
  userName,
  nameConfirmed,
  setUserName,
  handleNameConfirm,
  selectStream,
  setGameState,
  setNameConfirmed,
  leaderboard = [],
  setGrandLeaderboardTab
}) {
  // Find user's best rank
  const userRank = (() => {
    if (!userName || !leaderboard.length) return null;
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    const index = sorted.findIndex(e => e.name === userName);
    return index !== -1 ? index + 1 : null;
  })();

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500 min-h-[80vh]">
      
      {/* Top Stats */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
         <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900 px-4 py-2 rounded-full text-emerald-400 text-xs font-bold">
           <ThumbsUp className="w-4 h-4" /> {totalLikes} Likes
         </div>
         <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900 px-4 py-2 rounded-full text-rose-400 text-xs font-bold">
           <ThumbsDown className="w-4 h-4" /> {totalUnlikes} Unlikes
         </div>
         {hardModeChamp && (
           <div className="flex items-center gap-2 bg-purple-900/30 border border-purple-500/50 px-4 py-2 rounded-full text-purple-300 text-xs font-bold animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.3)]">
             <CrownIcon className="w-4 h-4" /> PRO Mode King: {String(hardModeChamp.name)}
           </div>
         )}
      </div>

      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" /> Edu Quest වෙත සාදරයෙන් පිළිගනිමු!
      </div>

      {/* Rank Check Section - Now with real rank data */}
      <div 
        onClick={() => setGameState('grand_leaderboard')}
        className="cursor-pointer w-full max-w-md mb-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-blue-600/20 border border-indigo-500/20 hover:border-indigo-400 hover:bg-indigo-600/20 transition-all group shadow-xl flex items-center text-left gap-4 animate-in fade-in slide-in-from-top-4"
      >
        <div className="bg-indigo-500/20 p-2.5 rounded-xl border border-indigo-500/30 group-hover:scale-110 transition-transform shrink-0">
          <Trophy className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-black text-white leading-tight">
            {userRank ? `ඔබ දැනට ${userRank} වෙනියා!` : 'ඔබ පන්තියේ කීවෙනියාද?'}
          </h3>
          <p className="text-indigo-300/80 font-bold text-xs">
            {userRank ? 'ඔබේ සම්පූර්ණ විස්තර බැලීමට මෙතැන ක්ලික් කරන්න' : 'දක්ෂයින් අතර ඔබේ ස්ථානය බලන්න ක්ලික් කරන්න'}
          </p>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-lg text-center leading-tight">
        ඔබේ ශ්‍රේණිය තෝරන්න
      </h1>
      
      {/* NAME CONFIRMATION SECTION */}
      {!nameConfirmed ? (
        <div className="w-full max-w-sm mb-12 animate-in slide-in-from-bottom-4 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 mb-4">
            <UserCircle className="w-5 h-5" /> ආරම්භ කිරීමට පෙර නම ඇතුළත් කරන්න
          </label>
          <input 
            type="text" 
            placeholder="ඔබේ නම (Your Name)..." 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNameConfirm()}
            className="w-full p-4 mb-4 bg-slate-950 border-2 border-slate-700 rounded-2xl focus:border-indigo-500 outline-none text-center font-bold text-white text-lg transition-all"
          />
          <button 
            onClick={handleNameConfirm}
            disabled={!userName.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            ඉදිරියට යන්න (Continue) <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* GRADE SELECTION GRID */
        <div className="w-full animate-in zoom-in duration-300 flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-300 mb-6">සුබ පැතුම් <span className="text-indigo-400">{userName}</span>! දැන් ඔබගේ ශ්‍රේණිය තෝරාගන්න.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            
            <div onClick={() => selectStream('grade5')} className="cursor-pointer group bg-amber-900/20 border border-amber-500/30 rounded-2xl p-6 hover:bg-amber-600 hover:border-amber-400 transition-all flex flex-col items-center shadow-lg">
              <BookOpen className="w-8 h-8 text-amber-400 group-hover:text-white mb-2" />
              <span className="text-xl font-black text-white">5 වසර</span>
            </div>

            <div onClick={() => setGameState('grade6_select')} className="cursor-pointer group bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 hover:bg-emerald-600 hover:border-emerald-400 transition-all flex flex-col items-center shadow-lg">
              <BookOpen className="w-8 h-8 text-emerald-400 group-hover:text-white mb-2" />
              <span className="text-xl font-black text-white">6 වසර</span>
            </div>
            
            {[7, 8, 9, 10, 11].map(grade => (
              <div key={grade} onClick={() => alert(`${grade} වසර සඳහා ප්‍රශ්න පත්‍ර ළඟදීම බලාපොරොත්තු වන්න!`)} className="cursor-pointer group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all flex flex-col items-center opacity-80">
                <Lock className="w-6 h-6 text-slate-500 mb-2" />
                <span className="text-lg font-bold text-slate-300">{grade} වසර</span>
                <span className="text-[10px] text-slate-500 mt-1 italic font-bold text-yellow-500/80">Coming Soon</span>
              </div>
            ))}

            <div onClick={() => setGameState('stream_select')} className="cursor-pointer group bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 hover:bg-indigo-600 hover:border-indigo-400 transition-all flex flex-col items-center shadow-lg col-span-2 md:col-span-1">
              <GraduationCap className="w-8 h-8 text-indigo-400 group-hover:text-white mb-2" />
              <span className="text-lg font-black text-white">12 / 13 වසර</span>
              <span className="text-[10px] text-indigo-300 mt-1 uppercase tracking-widest font-bold">A/L Streams</span>
            </div>

          </div>
          <button onClick={() => setNameConfirmed(false)} className="mt-8 text-slate-500 hover:text-slate-300 text-sm font-bold underline underline-offset-4">වෙනත් නමක් ඇතුළත් කරන්න</button>
        </div>
      )}

      {/* BUTTON TO OPEN PRO MODE CHAMPIONS */}
      <div className="mt-16 animate-in slide-in-from-bottom-6 w-full max-w-md">
         <button 
           onClick={() => { 
             setGrandLeaderboardTab('pro');
             setGameState('grand_leaderboard'); 
           }} 
           className="w-full group relative bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 hover:from-purple-600 hover:via-indigo-500 hover:to-purple-600 px-8 py-5 rounded-3xl font-black text-lg md:text-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] flex flex-col items-center justify-center gap-1 mx-auto transition-all hover:-translate-y-2 text-white border-2 border-purple-400/30 overflow-hidden"
         >
           <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
           <div className="flex items-center gap-3 relative z-10">
             <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
             <span className="drop-shadow-md">PRO MODE වැඩ්ඩෝ</span>
             <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
           </div>
           <span className="text-[10px] font-bold text-purple-200/80 uppercase tracking-[0.2em] relative z-10">The Ultimate Champions</span>
         </button>
      </div>

    </div>
  );
}