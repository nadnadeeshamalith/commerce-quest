import React from 'react';
import { Trophy, X, Sparkles, BookOpen, Calculator, Atom, Camera } from 'lucide-react';

export default function LeaderboardView({
  leaderboardTab,
  setLeaderboardTab,
  setShowAllLeaderboard,
  selectedStream,
  setSelectedStream,
  displayedLeaderboard,
  filteredLeaderboard,
  showAllLeaderboard,
  setGameState,
  onBack
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden animate-in fade-in">
       <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
         <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
           <Trophy className="text-yellow-500" /> සම්පූර්ණ ලකුණු පුවරුව
         </h2>
         <button onClick={onBack || (() => setGameState('home'))} className="p-2 bg-slate-950 border border-slate-800 rounded-lg hover:text-rose-400 transition-colors text-white"><X /></button>
       </div>
       
       {/* Type Filter */}
       <div className="flex gap-2 p-4 bg-slate-950 border-b border-slate-800 justify-center">
          <button onClick={() => {setLeaderboardTab('normal'); setShowAllLeaderboard(false);}} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${leaderboardTab === 'normal' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Normal Papers</button>
          <button onClick={() => {setLeaderboardTab('pro'); setShowAllLeaderboard(false);}} className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${leaderboardTab === 'pro' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-white'}`}><Sparkles className="w-4 h-4"/> PRO Mode</button>
       </div>

       {/* Stream Filter */}
       <div className="flex flex-wrap gap-2 p-4 bg-slate-950 border-b border-slate-800">
          <button onClick={() => {setSelectedStream(null); setShowAllLeaderboard(false);}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!selectedStream ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>සියල්ල</button>
          <button onClick={() => {setSelectedStream('grade5'); setShowAllLeaderboard(false);}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${selectedStream === 'grade5' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'}`}><BookOpen className="w-4 h-4"/> 5 වසර</button>
          <button onClick={() => {setSelectedStream('commerce'); setShowAllLeaderboard(false);}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${selectedStream === 'commerce' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-500 hover:text-slate-300'}`}><Calculator className="w-4 h-4"/> Commerce</button>
          <button onClick={() => {setSelectedStream('science'); setShowAllLeaderboard(false);}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${selectedStream === 'science' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}><Atom className="w-4 h-4"/> Science</button>
          <button onClick={() => {setSelectedStream('media'); setShowAllLeaderboard(false);}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${selectedStream === 'media' ? 'bg-pink-600/20 text-pink-400 border border-pink-500/30' : 'text-slate-500 hover:text-slate-300'}`}><Camera className="w-4 h-4"/> Media (Arts)</button>
       </div>

       <div className="p-4 max-h-[500px] overflow-y-auto">
          {displayedLeaderboard.length === 0 ? <p className="p-16 text-center text-slate-500 font-bold">තවමත් දත්ත නැත...</p> : 
            displayedLeaderboard.map((e, idx) => (
              <div key={e.name+e.stream} className="flex items-center justify-between p-5 hover:bg-slate-800/50 rounded-2xl mb-1 border-b border-slate-800/50 last:border-0 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-5">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${idx < 3 ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/40' : 'bg-slate-950 text-slate-500'}`}>{idx + 1}</span>
                  <div>
                    <p className="font-bold text-slate-200">{String(e.name)}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{leaderboardTab === 'pro' ? 'Max Level Reached' : 'Total Score'} <span className={`text-[9px] px-1.5 py-0.5 rounded ml-1 border ${e.stream === 'science' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : (e.stream === 'grade5' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : (e.stream === 'media' ? 'text-pink-400 border-pink-500/30 bg-pink-500/10' : 'text-blue-400 border-blue-500/30 bg-blue-500/10'))}`}>{e.stream === 'science' ? 'SCI' : (e.stream === 'grade5' ? 'G5' : (e.stream === 'media' ? 'MED' : 'COM'))}</span></p>
                  </div>
                </div>
                <span className={`text-2xl font-black ${leaderboardTab === 'pro' ? 'text-purple-400' : 'text-blue-500'}`}>{leaderboardTab === 'pro' ? `Lvl ${Number(e.proLevel)}` : Number(e.score)} <span className="text-xs text-slate-500">{leaderboardTab === 'pro' ? '' : 'ලකුණු'}</span></span>
              </div>
            ))
          }
          
          {/* Show All Button */}
          {!showAllLeaderboard && filteredLeaderboard.length > 5 && (
            <div className="text-center mt-4">
               <button onClick={() => setShowAllLeaderboard(true)} className="text-slate-400 hover:text-white text-sm font-bold bg-slate-950 px-6 py-3 rounded-full border border-slate-800 transition-all">
                 සම්පූර්ණ ලැයිස්තුවම බලන්න (View All)
               </button>
            </div>
          )}
       </div>
       <div className="p-8 border-t border-slate-800 bg-slate-950/30">
         <button onClick={onBack || (() => setGameState('home'))} className="w-full bg-slate-800 py-4 rounded-xl font-black hover:bg-slate-700 transition-all text-white">මුල් මෙනුවට</button>
       </div>
    </div>
  );
}
