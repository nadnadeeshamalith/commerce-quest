import React from 'react';
import { Trophy, Sparkles, BookOpen, Atom, Calculator, Camera, Star, Flame, ArrowLeft } from 'lucide-react';
import { CrownIcon } from './Icons';

export default function GrandLeaderboard({ 
  leaderboard, 
  grandLeaderboardTab, 
  setGrandLeaderboardTab, 
  onBack 
}) {
  // තෝරාගත් විෂය කාණ්ඩයට අදාළ ලකුණු ලැයිස්තුව පෙරා ගැනීම
  const getCategoryFilter = (cat) => {
    if (cat === 'pro') return (e) => e.type === 'pro';
    if (cat === 'grade5') return (e) => e.stream === 'grade5';
    if (['grade6', 'grade7', 'grade8', 'grade9', 'grade10', 'grade11'].includes(cat)) return (e) => e.stream === cat;
    if (cat === 'al_combined') return (e) => ['biology', 'chemistry', 'physics', 'agri', 'combined_maths', 'accounting', 'business_studies', 'economics', 'sinhala', 'media', 'ict_commerce', 'ict_tech', 'ict_arts'].includes(e.stream);
    return () => false;
  };

  const currentStreamTop = leaderboard
    .filter(getCategoryFilter(grandLeaderboardTab))
    .filter(e => e.score > 0 || (grandLeaderboardTab === 'pro' && e.paperId))
    .sort((a,b) => {
      if (grandLeaderboardTab === 'pro') {
        const lvlA = parseInt(String(a.paperId).replace('H','')) || 0;
        const lvlB = parseInt(String(b.paperId).replace('H','')) || 0;
        return lvlB - lvlA;
      }
      return b.score - a.score;
    })
    .reduce((acc, current) => {
      // Duplicate removal logic for PRO mode
      if (grandLeaderboardTab === 'pro') {
        const existing = acc.find(item => item.name === current.name);
        if (!existing) return acc.concat([current]);
        const curLvl = parseInt(String(current.paperId).replace('H','')) || 0;
        const exLvl = parseInt(String(existing.paperId).replace('H','')) || 0;
        if (curLvl > exLvl) {
          existing.paperId = current.paperId;
        }
        return acc;
      }
      return acc.concat([current]);
    }, [])
    .slice(0, 10);
  
  return (
    <div className="flex flex-col items-center justify-start py-4 animate-in zoom-in duration-500 min-h-[80vh] w-full max-w-5xl mx-auto relative">
      
      {/* Clean Back Button */}
      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 md:left-0 p-3 bg-slate-900/50 border border-slate-800 hover:bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-lg group z-20"
        title="ආපසු මෙනුවට"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
            ලංකාවේ ප්‍රථමයන්
          </h3>
        </div>
        
        {/* HIGHLIGHTED MOTIVATIONAL BANNER - Smaller */}
        <div className="mt-4 inline-flex flex-col items-center gap-3 animate-in slide-in-from-top-4">
          <div 
            onClick={onBack}
            className="cursor-pointer group inline-flex flex-col items-center gap-1.5 bg-gradient-to-br from-emerald-600/15 to-blue-600/15 border border-emerald-500/40 px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all hover:border-emerald-400"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-emerald-100 font-black text-sm md:text-base tracking-tight">
                ඔබත් අභියෝගය භාරගන්න සූදානම්ද?
              </span>
            </div>
            <p className="text-emerald-200/80 font-bold text-[10px] md:text-xs text-center leading-tight">
              ඔබ තවමත් මෙහි නැතිනම්, අභියෝගය භාරගෙන ඔබේ නමත් එක් කර ගැනීමට <span className="text-white underline underline-offset-2 decoration-emerald-500">මෙතැන ක්ලික් කරන්න!</span>
            </p>
          </div>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">
            ඔබව පන්ති තේරීමේ පිටුවට යොමු කෙරේ...
          </p>
        </div>

        {/* --- All Grades Top Performers Summary --- */}
        <div className="mt-12 w-full max-w-4xl mx-auto">
          <h4 className="text-xl font-black text-white mb-6 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> එක් කරන්න ශ්‍රේණිවල විශිෂ්ටයින්
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[5, 6, 7, 8, 9, 10, 11].map(grade => {
              const top = leaderboard
                .filter(e => e.stream === `grade${grade === 5 ? '5' : grade}`)
                .sort((a,b) => b.score - a.score)[0];
              
              return (
                <div key={grade} className="bg-slate-900/50 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1 hover:border-blue-500/50 transition-colors group">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{grade} වසර</span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Star className={`w-4 h-4 ${top ? 'text-yellow-500 fill-yellow-500' : 'text-slate-600'}`} />
                  </div>
                  <span className="text-[11px] font-bold text-white truncate w-full text-center">
                    {top ? top.name : '---'}
                  </span>
                  <span className="text-[10px] font-black text-blue-400">
                    {top ? `${top.score} pts` : 'No data'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grade/Stream Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-900/50 p-4 rounded-[2.5rem] border border-slate-800 shadow-xl max-w-5xl">
         <button onClick={() => setGrandLeaderboardTab('pro')} className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-2 ${grandLeaderboardTab === 'pro' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-800'}`}>
           <Flame className="w-4 h-4 text-orange-400" /> PRO Mode
         </button>
         <button onClick={() => setGrandLeaderboardTab('grade5')} className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all ${grandLeaderboardTab === 'grade5' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>5 වසර</button>
         {[6, 7, 8, 9, 10, 11].map(g => (
           <button key={g} onClick={() => setGrandLeaderboardTab(`grade${g}`)} className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all ${grandLeaderboardTab === `grade${g}` ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>{g} වසර</button>
         ))}
         <button onClick={() => setGrandLeaderboardTab('al_combined')} className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all ${grandLeaderboardTab === 'al_combined' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}>12 / 13 (A/L)</button>
      </div>

      {currentStreamTop.length > 0 ? (
        <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-8">
          {/* Podium for Top 3 (පළමු තුන්දෙනාට හිමි වේදිකාව) */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-6 mb-12 w-full px-4">
            
            {/* 2nd Place (Silver) */}
            {currentStreamTop[1] && (
              <div className="order-2 md:order-1 flex-1 w-full bg-gradient-to-t from-slate-800 to-slate-900 border-t-4 border-slate-300 rounded-t-3xl rounded-b-xl p-6 flex flex-col items-center text-center shadow-[0_-10px_30px_rgba(148,163,184,0.15)] hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 flex items-center justify-center text-slate-900 font-black text-2xl mb-4 shadow-[0_0_15px_rgba(148,163,184,0.5)]">2</div>
                <p className="font-black text-slate-200 text-xl truncate w-full mb-2">{String(currentStreamTop[1].name)}</p>
                <p className="text-3xl font-black text-slate-300 drop-shadow-md">
                  {grandLeaderboardTab === 'pro' ? `Level ${String(currentStreamTop[1].paperId).replace('H','')}` : `${currentStreamTop[1].score} pts`}
                </p>
              </div>
            )}

            {/* 1st Place (Gold) */}
            {currentStreamTop[0] && (
              <div className="order-1 md:order-2 flex-[1.2] w-full bg-gradient-to-t from-yellow-900/60 via-slate-900 to-slate-900 border-t-4 border-x border-yellow-400 rounded-t-[3rem] rounded-b-2xl p-8 flex flex-col items-center text-center shadow-[0_-15px_40px_rgba(250,204,21,0.25)] z-10 hover:-translate-y-2 transition-transform md:-mt-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent pointer-events-none"></div>
                <CrownIcon className="w-12 h-12 text-yellow-400 mb-3 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] relative z-10" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 flex items-center justify-center text-yellow-950 font-black text-4xl mb-4 shadow-[0_0_25px_rgba(250,204,21,0.6)] relative z-10">1</div>
                <p className="font-black text-white text-3xl truncate w-full drop-shadow-lg relative z-10 mb-2">{String(currentStreamTop[0].name)}</p>
                <p className="text-5xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)] relative z-10">
                  {grandLeaderboardTab === 'pro' ? `Level ${String(currentStreamTop[0].paperId).replace('H','')}` : `${currentStreamTop[0].score} pts`}
                </p>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {currentStreamTop[2] && (
              <div className="order-3 md:order-3 flex-1 w-full bg-gradient-to-t from-amber-950/80 to-slate-900 border-t-4 border-amber-600 rounded-t-3xl rounded-b-xl p-6 flex flex-col items-center text-center shadow-[0_-10px_30px_rgba(217,119,6,0.15)] hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black text-2xl mb-4 shadow-[0_0_15px_rgba(217,119,6,0.5)]">3</div>
                <p className="font-black text-slate-200 text-xl truncate w-full mb-2">{String(currentStreamTop[2].name)}</p>
                <p className="text-3xl font-black text-amber-500 drop-shadow-md">
                  {grandLeaderboardTab === 'pro' ? `Level ${String(currentStreamTop[2].paperId).replace('H','')}` : `${currentStreamTop[2].score} pts`}
                </p>
              </div>
            )}

          </div>

          {/* List for 4th to 10th (අනෙකුත් ස්ථාන 4 සිට 10 දක්වා) */}
          {currentStreamTop.length > 3 && (
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl space-y-3 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold px-6 py-2 rounded-full shadow-lg">Top 10 Players</div>
              {currentStreamTop.slice(3, 10).map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950/80 hover:bg-slate-800 transition-colors p-5 rounded-2xl border border-slate-800/50 group">
                  <div className="flex items-center gap-5">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center font-black bg-slate-900 text-slate-400 border border-slate-800 shadow-inner group-hover:text-white transition-colors text-lg">{idx + 4}</span>
                    <span className="font-bold text-slate-200 text-base md:text-lg tracking-wide">{String(entry.name)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-300">
                      {grandLeaderboardTab === 'pro' ? `Level ${String(entry.paperId).replace('H','')}` : `${entry.score} pts`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl w-full max-w-2xl mx-auto shadow-inner">
           <Trophy className="w-20 h-20 text-slate-700 mx-auto mb-6 opacity-50" />
           <p className="text-slate-400 font-bold text-xl mb-2">තවමත් දත්ත නොමැත.</p>
           <p className="text-slate-500">මෙම විෂය සඳහා ප්‍රථමයා වීමට අභියෝගය භාරගන්න!</p>
        </div>
      )}

      {/* --- All Grades Top Performers Summary (Moved to Bottom) --- */}
      <div className="mt-20 w-full max-w-4xl mx-auto border-t border-slate-800 pt-12">
        <h4 className="text-xl font-black text-slate-400 mb-8 flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> එක් එක් ශ්‍රේණිවල විශිෂ්ටයින් (Summary)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[5, 6, 7, 8, 9, 10, 11].map(grade => {
            const top = leaderboard
              .filter(e => e.stream === `grade${grade === 5 ? '5' : grade}`)
              .sort((a,b) => b.score - a.score)[0];
            
            return (
              <div key={grade} className="bg-slate-900/30 border border-slate-800/50 p-3 rounded-2xl flex flex-col items-center gap-1 hover:border-blue-500/30 transition-colors group">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{grade} වසර</span>
                <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Star className={`w-3 h-3 ${top ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700'}`} />
                </div>
                <span className="text-[10px] font-bold text-slate-300 truncate w-full text-center">
                  {top ? top.name : '---'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
