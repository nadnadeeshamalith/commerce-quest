import React from 'react';
import { ThumbsUp, ThumbsDown, Star, UserCircle, ArrowRight, BookOpen, Lock, GraduationCap, Flame, ChevronRight } from 'lucide-react';
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
  setGrandLeaderboardTab,
  setStreamView,
  onOpenLeaderboard
}) {
  const nameGateBackdrop = !nameConfirmed;

  return (
    <div className="relative flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500 min-h-[80vh]">
      {/* Background: stats → welcome → rank → title → (grades when confirmed) → PRO — blurred while name gate open */}
      <div
        className={
          nameGateBackdrop
            ? 'w-full blur-md sm:blur-lg pointer-events-none select-none opacity-[0.42] scale-[0.99] transition-[filter,opacity,transform] duration-300 ease-out'
            : 'w-full transition-[filter,opacity,transform] duration-300 ease-out'
        }
      >
        <div className="flex flex-col items-center w-full">
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

          <button
            type="button"
            onClick={() => onOpenLeaderboard?.()}
            className="group relative mx-auto mb-5 w-full max-w-md overflow-hidden rounded-2xl border border-amber-400/50 bg-gradient-to-r from-amber-600/18 via-yellow-500/12 to-amber-600/18 px-3.5 py-2 shadow-[0_0_16px_rgba(251,191,36,0.22)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_26px_rgba(251,191,36,0.38)] hover:scale-[1.02] animate-pulse hover:animate-none"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-300/15 to-amber-400/0 opacity-60 blur-sm" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-base drop-shadow-[0_0_8px_rgba(251,191,36,0.65)] sm:text-lg">🏆</span>
              <span className="text-center text-xs font-black leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 sm:text-sm">
                ඔබ පන්තියේ කීවෙනියාද? 🏆
              </span>
              <ChevronRight className="hidden h-4 w-4 shrink-0 text-amber-300/90 transition-transform group-hover:translate-x-0.5 sm:block" />
            </div>
            <p className="relative mt-0.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-amber-200/75">Global leaderboard · Live ranks</p>
          </button>

          <h1 className="text-3xl md:text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-lg text-center leading-tight">
            ඔබේ ශ්‍රේණිය තෝරන්න
          </h1>

          {nameConfirmed ? (
            <div className="w-full animate-in zoom-in duration-300 flex flex-col items-center">
              <h2 className="text-xl font-bold text-slate-300 mb-6">සුබ පැතුම් <span className="text-indigo-400">{userName}</span>! දැන් ඔබගේ ශ්‍රේණිය තෝරාගන්න.</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">

                <div onClick={() => selectStream('grade5')} className="cursor-pointer group bg-amber-900/20 border border-amber-500/30 rounded-2xl p-6 hover:bg-amber-600 hover:border-amber-400 transition-all flex flex-col items-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-amber-400 group-hover:text-white mb-2" />
                  <span className="text-xl font-black text-white">5 වසර</span>
                </div>

                <div onClick={() => { setStreamView?.('main'); setGameState('grade6_select'); }} className="cursor-pointer group bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 hover:bg-emerald-600 hover:border-emerald-400 transition-all flex flex-col items-center shadow-lg">
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

                <div onClick={() => { setStreamView?.('main'); setGameState('stream_select'); }} className="cursor-pointer group bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 hover:bg-indigo-600 hover:border-indigo-400 transition-all flex flex-col items-center shadow-lg col-span-2 md:col-span-1">
                  <GraduationCap className="w-8 h-8 text-indigo-400 group-hover:text-white mb-2" />
                  <span className="text-lg font-black text-white">12 / 13 වසර</span>
                  <span className="text-[10px] text-indigo-300 mt-1 uppercase tracking-widest font-bold">A/L Streams</span>
                </div>

              </div>
              <button type="button" onClick={() => setNameConfirmed(false)} className="mt-8 text-slate-500 hover:text-slate-300 text-sm font-bold underline underline-offset-4">වෙනත් නමක් ඇතුළත් කරන්න</button>
            </div>
          ) : null}

          <div className="mt-16 animate-in slide-in-from-bottom-6 w-full max-w-md">
            <button
              type="button"
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
      </div>

      {nameGateBackdrop ? (
        <>
          <div
            className="absolute inset-0 z-10 bg-[#050505]/55 backdrop-blur-[2px] pointer-events-auto rounded-[inherit]"
            aria-hidden
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-sm animate-in slide-in-from-bottom-4 duration-300 bg-slate-900/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/80 shadow-[0_25px_80px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
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
                autoComplete="name"
              />
              <button
                type="button"
                onClick={handleNameConfirm}
                disabled={!userName.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                ඉදිරියට යන්න (Continue) <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
