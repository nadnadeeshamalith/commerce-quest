import React from 'react';
import { Skull, Award, CircleCheck, ThumbsUp, ThumbsDown, Sparkles, RefreshCw, LayoutGrid, ListCheck, CircleX } from 'lucide-react';

const stripQuestionLabel = (text) => {
  return String(text ?? '').replace(/\s*\(\d+\)\s*:\s*/, ' ').trim();
};

export default function ResultView({
  score,
  currentQuestions,
  isHardMode,
  isCorrect,
  userVote,
  finishAndSaveVote,
  setGameState,
  showReview,
  setShowReview,
  userAnswers,
  selectedPaper,
  selectPaper
}) {
  // #region agent log
  if (typeof window !== 'undefined' && !window.__eduQuestResultStripLogged) {
    const firstLabeled = (currentQuestions || []).find((q) => /\(\d+\)\s*:/.test(String(q?.question || '')));
    if (firstLabeled) {
      window.__eduQuestResultStripLogged = true;
      fetch('http://127.0.0.1:7863/ingest/dc30585a-40ae-491f-8315-b1eef3f05f0a', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '2e40c9' }, body: JSON.stringify({ sessionId: '2e40c9', location: 'ResultView.jsx:stripQuestionLabel', message: 'Result view has labeled question and strip helper active', data: { before: String(firstLabeled.question).slice(0, 120), after: String(stripQuestionLabel(firstLabeled.question)).slice(0, 120) }, timestamp: Date.now(), hypothesisId: 'H2', runId: 'strip-ui-result' }) }).catch(() => { });
    }
  }
  // #endregion

  return (
    <div className="text-center py-12 animate-in zoom-in duration-500 min-h-[80vh]">
       {isHardMode && !isCorrect ? (
         <Skull className="w-20 h-20 text-rose-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(225,29,72,0.3)] animate-bounce" />
       ) : (
         <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
       )}
       <h2 className="text-4xl font-black mb-4 text-white drop-shadow-lg">
         {isHardMode && !isCorrect ? 'අයියෝ! ක්‍රීඩාව අවසන්!' : 'විශිෂ්ටයි! ඔබ අවසන් කළා!'}
       </h2>
       <p className="text-slate-400 mb-10 text-lg">ඔබේ අවසාන ලකුණු සංඛ්‍යාව (Final Score)</p>
       
       <div className={`text-7xl font-black mb-12 p-10 rounded-[3rem] inline-block border shadow-2xl ${isHardMode && !isCorrect ? 'bg-rose-900/30 border-rose-500 text-rose-400 shadow-[0_0_40px_rgba(225,29,72,0.2)]' : 'bg-emerald-900/30 border-emerald-500 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]'}`}>
         {score} <span className="text-2xl font-bold block mt-2 opacity-60">pts</span>
       </div>
       
       {!isHardMode && (
         <div className="flex items-center justify-center gap-2 mb-10 text-emerald-400 font-bold bg-emerald-500/10 py-3 px-6 rounded-2xl border border-emerald-500/30 animate-pulse">
           <CircleCheck className="w-4 h-4" /> ඔබේ ලකුණු Leaderboard එකට ස්වයංක්‍රීයව එකතු විය!
         </div>
       )}

       {/* Voting Section */}
       <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] mb-12 max-w-md mx-auto shadow-xl">
          <p className="text-slate-400 font-bold mb-6 text-sm uppercase tracking-widest">මෙම ප්‍රශ්න පත්‍රය ගැන ඔබේ අදහස?</p>
          <div className="flex justify-center gap-6">
             <button 
                onClick={() => finishAndSaveVote('like')}
                className={`flex flex-col items-center gap-3 transition-all ${userVote === 'like' ? 'text-emerald-500 scale-110' : 'text-slate-500 hover:text-emerald-400'}`}
              >
                <div className={`p-5 rounded-2xl border-2 transition-all ${userVote === 'like' ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-950 border-slate-800'}`}>
                  <ThumbsUp className={`w-8 h-8 ${userVote === 'like' ? 'fill-emerald-500' : ''}`} />
                </div>
                <span className="font-black text-xs uppercase tracking-widest">Like</span>
             </button>
             <button 
                onClick={() => finishAndSaveVote('dislike')}
                className={`flex flex-col items-center gap-3 transition-all ${userVote === 'dislike' ? 'text-rose-500 scale-110' : 'text-slate-500 hover:text-rose-400'}`}
              >
                <div className={`p-5 rounded-2xl border-2 transition-all ${userVote === 'dislike' ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'bg-slate-950 border-slate-800'}`}>
                  <ThumbsDown className={`w-8 h-8 ${userVote === 'dislike' ? 'fill-rose-500' : ''}`} />
                </div>
                <span className="font-black text-xs uppercase tracking-widest">Dislike</span>
             </button>
          </div>
       </div>

       <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {isHardMode && isCorrect && score === currentQuestions.length * 10 && (
            <button 
              onClick={() => {
                const currentLvl = parseInt(String(selectedPaper).replace('H', ''));
                const nextLvl = currentLvl + 1;
                if (nextLvl <= 40) {
                  selectPaper(`H${nextLvl}`);
                } else {
                  setGameState('select_paper');
                }
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] text-white flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5"/> ඊළඟ ලෙවෙල් එකට යන්න
            </button>
          )}
          <button 
            onClick={() => {
              if (isHardMode) {
                selectPaper(selectedPaper);
              } else {
                setGameState('select_paper');
              }
            }}
            className="w-full bg-slate-900 border border-slate-800 py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-white"
          >
            <RefreshCw className="w-5 h-5"/> {isHardMode && !isCorrect ? 'නැවත උත්සාහ කරන්න (Retry)' : 'නැවත උත්සාහ කරන්න (Retry)'}
          </button>
          <button 
            onClick={() => setGameState('select_paper')}
            className="w-full bg-slate-950 border border-slate-800 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 text-slate-400"
          >
            <LayoutGrid className="w-5 h-5"/> {isHardMode ? 'අනෙකුත් Levels බලන්න' : 'ප්‍රශ්න පත්‍ර තේරීමට'}
          </button>
          <button 
            onClick={() => setGameState('home')}
            className="w-full py-3 text-slate-600 hover:text-slate-400 font-bold transition-all text-sm uppercase tracking-widest"
          >
            මුල් මෙනුවට (Home)
          </button>
          
          <div className="mt-8 border-t border-slate-800 pt-8 w-full">
            <button 
              onClick={() => setShowReview(!showReview)}
              className="w-full text-slate-500 hover:text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-widest"
            >
              <ListCheck /> {showReview ? 'විවරණ පත්‍රිකාව වසන්න' : 'පිළිතුරු සහ විවරණ පත්‍රිකාව බලන්න'}
            </button>
          </div>
       </div>

       {showReview && (
          <div className="mt-12 text-left max-w-3xl mx-auto space-y-6 animate-in slide-in-from-top-6 bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 shadow-2xl">
             <h3 className="text-2xl font-black text-white mb-8 border-b border-slate-800 pb-4 uppercase tracking-tighter">විවරණ පත්‍රිකාව (Review Sheet)</h3>
             {currentQuestions.map((q, idx) => {
                const answer = userAnswers.find(a => a.questionIndex === idx);
                const isUserCorrect = answer && Number(answer.selectedIdx) === Number(q.answer);
                let icon = null;
                if (answer) {
                  if (isUserCorrect) {
                    icon = <CircleCheck className="w-5 h-5 text-emerald-500 inline mr-2 shrink-0" />;
                  } else {
                    icon = <CircleX className="w-5 h-5 text-rose-500 inline mr-2 shrink-0" />;
                  }
                }

                return (
                  <div key={idx} className={`p-6 rounded-2xl border ${isUserCorrect ? 'bg-emerald-900/10 border-emerald-900/30' : (answer ? 'bg-rose-900/10 border-rose-900/30' : 'bg-slate-950 border-slate-900')}`}>
                    <h4 className="font-bold text-slate-100 mb-4 flex items-start gap-3">
                      <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded flex items-center justify-center text-[10px] shrink-0 mt-1">{idx + 1}</span>
                      {stripQuestionLabel(q.question)}
                    </h4>
                    <div className="grid gap-2 mb-4">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className={`text-sm p-3 rounded-xl border ${Number(oIdx) === Number(q.answer) ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 font-bold' : (answer && Number(oIdx) === Number(answer.selectedIdx) ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500')}`}>
                          {oIdx + 1}. {opt} {Number(oIdx) === Number(q.answer) && '✓'}
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        {icon} විවරණය (Explanation)
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">{q.explanation}</p>
                    </div>
                  </div>
                );
             })}
          </div>
       )}
    </div>
  );
}
