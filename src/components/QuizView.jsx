import React from 'react';
import { X, Timer, CircleCheck, CircleX, ArrowRight, Flame, Skull, Loader2 } from 'lucide-react';

export default function QuizView({
  selectedPaper,
  currentIndex,
  currentQuestions,
  isHardMode,
  timeLeft,
  score,
  showFeedback,
  selectedOption,
  isCorrect,
  selectOption,
  checkAnswer,
  skipQuestion,
  nextStep,
  setGameState,
  funnyCorrectMessage,
  funnyWrongMessage
}) {
  const question = currentQuestions[currentIndex];

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">ප්‍රශ්න පූරණය වෙමින් පවතී...</h2>
        <button onClick={() => setGameState('select_paper')} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl font-bold transition-all">නැවත යන්න</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
       <div className={`flex justify-between items-center p-4 rounded-2xl border shadow-xl bg-slate-900 ${isHardMode ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-slate-800'}`}>
          <button 
            onClick={() => setGameState('select_paper')} 
            className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-white uppercase transition-colors"
          >
            <X className="w-4 h-4" /> {isHardMode && String(selectedPaper).startsWith('H') ? 'අපෝ බෑ අමාරුයි' : 'Stop'}
          </button>
          <div className="text-center">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isHardMode ? 'PRO LEVEL' : 'PAPER'} {String(selectedPaper).replace('H','')}</span>
            <span className={`text-sm font-black text-white`}>{currentIndex + 1} / {currentQuestions.length}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">Score</span>
            <span className="text-sm font-black text-blue-400">{score}</span>
          </div>
       </div>

       {isHardMode && (
         <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
           <div 
             className={`h-full transition-all duration-1000 ${timeLeft < 5 ? 'bg-rose-500 animate-pulse' : 'bg-purple-500'}`}
             style={{ width: `${(timeLeft / (String(selectedPaper).startsWith('H') ? (String(selectedPaper).startsWith('H') && timeLeft > 30 ? 45 : 30) : 15)) * 100}%` }}
           ></div>
         </div>
       )}

       <div className={`p-8 rounded-[2.5rem] border-2 transition-all shadow-2xl bg-slate-900 ${isHardMode ? 'border-purple-500/30' : 'border-slate-800'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border shadow-inner ${isHardMode ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' : 'bg-blue-500/20 border-blue-500/30 text-blue-400'}`}>
              {currentIndex + 1}
            </div>
            {isHardMode && (
              <div className={`flex items-center gap-1 px-4 py-2 rounded-xl border font-bold text-sm ${timeLeft < 5 ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 animate-bounce' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <Timer className="w-4 h-4"/> {timeLeft}s
              </div>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-snug">
            {currentQuestions[currentIndex].question}
          </h2>

          {currentQuestions[currentIndex].svg && (
            <div className="flex justify-center mb-8 bg-white/5 p-6 rounded-3xl border border-white/10" dangerouslySetInnerHTML={{ __html: currentQuestions[currentIndex].svg }} />
          )}

          <div className="grid gap-4">
            {currentQuestions[currentIndex].options.map((opt, idx) => {
              let btnClass = "p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group relative overflow-hidden ";
              let icon = null;

              if (showFeedback) {
                if (idx === Number(currentQuestions[currentIndex].answer)) {
                  btnClass += "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                  icon = <CircleCheck className="w-5 h-5 text-emerald-500 inline mr-2 shrink-0" />;
                } else if (idx === selectedOption) {
                  btnClass += "bg-rose-500/20 border-rose-500 text-rose-400";
                  icon = <CircleX className="w-5 h-5 text-rose-400 inline mr-2 shrink-0" />;
                } else {
                  btnClass += "bg-slate-950/50 border-slate-800 text-slate-600 opacity-50";
                }
              } else {
                if (idx === selectedOption) {
                  btnClass += isHardMode ? "bg-purple-600 border-purple-400 text-white shadow-lg scale-[1.02]" : "bg-blue-600 border-blue-400 text-white shadow-lg scale-[1.02]";
                } else {
                  btnClass += "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => selectOption(idx)}
                  className={btnClass}
                >
                  <span className="relative z-10 flex items-center">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 text-xs font-black border ${idx === selectedOption ? 'bg-white/20 border-white/30' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>{idx + 1}</span>
                    {opt}
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>
       </div>

       <div className="flex flex-col gap-4">
          {showFeedback ? (
            <div className="animate-in slide-in-from-bottom-4 space-y-4">
               <div className={`p-6 rounded-3xl border shadow-xl ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {isCorrect ? <CircleCheck /> : <CircleX />}
                    </div>
                    <div>
                        {isCorrect && <p className="text-yellow-400 font-black text-lg mb-2 flex items-center gap-2"><Flame className="text-yellow-500"/> {funnyCorrectMessage}</p>}
                        {!isCorrect && selectedOption !== -1 && <p className="text-rose-400 font-black text-lg mb-2 flex items-center gap-2"><Skull className="text-rose-500"/> {funnyWrongMessage}</p>}
                        <h4 className={`font-black uppercase tracking-tighter text-sm mb-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>{isCorrect ? 'නිවැරදියි! (Correct)' : (selectedOption === -1 ? 'කාලය අවසන්! (Time Out)' : 'වැරදියි! (Wrong)')}</h4>
                        <p className="text-slate-200 font-medium leading-relaxed">{currentQuestions[currentIndex].explanation}</p>
                    </div>
                  </div>
               </div>
               <button 
                  onClick={nextStep}
                  className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl ${isHardMode && !isCorrect ? 'bg-rose-600 hover:bg-rose-500 text-white' : (isHardMode ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white')}`}
                >
                  {isHardMode && !isCorrect ? 'අවසන් කරන්න (Game Over)' : 
                   (currentIndex + 1 === currentQuestions.length ? 
                    (isHardMode && isCorrect ? 'ඊළඟ ලෙවෙල් එකට යන්න' : 'අවසන් කරන්න (Finish)') : 
                    'ඊළඟ ප්‍රශ්නය (Next)')} <ArrowRight />
                </button>
            </div>
          ) : (
            <div className="flex gap-3">
              {!isHardMode && (
                <button 
                  onClick={skipQuestion}
                  className="flex-1 py-5 rounded-2xl font-black text-slate-400 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
                >
                  මඟහරින්න (Skip)
                </button>
              )}
              <button 
                onClick={checkAnswer}
                disabled={selectedOption === null}
                className={`flex-[2] py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl ${selectedOption === null ? 'bg-slate-800 text-slate-500' : (isHardMode ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]')}`}
              >
                පරීක්ෂා කරන්න (Check) <CircleCheck className="w-5 h-5" />
              </button>
            </div>
          )}
       </div>
    </div>
  );
}
