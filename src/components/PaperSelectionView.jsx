import React from 'react';
import { ArrowLeft, Sparkles, Unlock, Lock } from 'lucide-react';

export default function PaperSelectionView({
  themeColor,
  isGrade5,
  isGrade6,
  selectedStream,
  availablePaperIds,
  paperTitle,
  onBack,
  nextProLevelToPlay,
  quizBankReady = true,
  selectPaper
}) {
  const getDisplayTitle = () => {
    if (isGrade5) return '5 වසර අභියෝගය';
    if (selectedStream === 'grade6_oriental_music') return 'පෙරදිග සංගීතය';
    if (selectedStream === 'grade6_western_music') return 'අපරදිග සංගීතය';
    if (selectedStream === 'grade6_maths') return '6 වසර ගණිතය';
    if (selectedStream === 'grade6_science') return '6 වසර විද්‍යාව';
    if (selectedStream === 'grade6_sinhala') return '6 වසර සිංහල';
    if (selectedStream === 'grade6_english') return '6 වසර ඉංග්‍රීසි';
    return 'සාමාන්‍ය ප්‍රශ්න පත්‍ර';
  };
  const displayTitle = paperTitle || getDisplayTitle();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl flex items-center gap-2 text-slate-400 hover:text-white transition-colors shadow-lg font-bold"><ArrowLeft className="w-5 h-5" /> ආපසු</button>
        <div className="flex flex-col">
          <button
            type="button"
            className="inline-flex w-fit items-center px-5 py-2 rounded-full bg-slate-900/60 border border-slate-700 text-slate-200 text-sm font-black tracking-widest shadow-sm transition-all active:scale-95 hover:bg-slate-800 hover:border-slate-600 hover:shadow-md"
          >
            පෙපර් තෝරන්න
          </button>
          <h2 className="text-2xl font-black text-white">{displayTitle}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 md:gap-3">
        {Array.from({ length: 40 }, (_, i) => {
          const paperNumber = i + 1;
          const isPaperUnlocked = availablePaperIds instanceof Set
            ? availablePaperIds.has(paperNumber)
            : (isGrade6
              ? (selectedStream === 'grade6_oriental_music' ? i < 40 : (selectedStream === 'grade6_science' ? i < 40 : i < 40))
              : (isGrade5 ? i < 10 : i < 3));
          return (
          <button
            key={i}
            onClick={() => isPaperUnlocked && selectPaper(paperNumber)}
            className={`aspect-square border rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ease-out group ${isPaperUnlocked ? `cursor-pointer bg-${themeColor}-900/15 border-${themeColor}-800 hover:bg-${themeColor}-600 hover:border-${themeColor}-400 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-xl` : 'cursor-not-allowed bg-slate-900 border-slate-800 opacity-50'}`}
          >
            <span className={`w-full text-[8px] md:text-[9px] font-black text-center px-1 leading-[1.05] truncate ${isPaperUnlocked ? `text-${themeColor}-300 group-hover:text-white` : 'text-slate-500'}`}>{displayTitle}</span>
            <span className={`text-lg md:text-xl font-black ${isPaperUnlocked ? 'text-white' : 'text-slate-500'}`}>{paperNumber}</span>
            {!isPaperUnlocked && <span className="text-[7px] sm:text-[8px] text-slate-500 mt-0.5">ළඟදීම</span>}
          </button>
        )})}
      </div>
      
      {/* PRO MODE SECTION (Sequential Unlock) */}
      <div className="mt-12 border-t border-slate-800 pt-8 animate-in slide-in-from-bottom-4">
         <h3 className={`text-xl font-black uppercase text-purple-400 mb-6 flex items-center gap-2`}>
           <Sparkles className="w-6 h-6 animate-pulse" /> PRO MODE (Advanced Levels)
         </h3>
         <p className="text-slate-400 text-sm mb-6">තත්පර {isGrade5 ? '45' : '15'}යි! එක පාරින්ම හරි උත්තරය දුන්නොත් පමණක් ඊළඟ Level එක Unlock වේ!</p>
         <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 md:gap-3">
            {Array.from({ length: 40 }, (_, i) => {
               const lvlNum = i + 1;
               const isUnlocked = isGrade6
                 ? (quizBankReady && (lvlNum >= 31 && lvlNum <= 40 ? (lvlNum <= (nextProLevelToPlay > 30 ? nextProLevelToPlay : 31)) : false))
                 : (lvlNum <= nextProLevelToPlay);
               return (
                 <button 
                    key={lvlNum} 
                    onClick={() => isUnlocked && selectPaper(`H${lvlNum}`)} 
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ease-out group ${isUnlocked ? 'cursor-pointer bg-purple-900/15 border border-purple-500/30 hover:bg-purple-700/80 hover:border-purple-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-xl' : 'cursor-not-allowed bg-slate-950 border border-slate-800 opacity-60'}`}
                 >
                   {isUnlocked ? (
                     <>
                       <span className="text-purple-300 group-hover:text-white font-bold uppercase text-[9px] md:text-[10px] mb-1 tracking-widest flex items-center gap-1"><Unlock className="w-3 h-3"/> Level</span>
                       <span className="text-lg md:text-xl font-black text-white">{lvlNum}</span>
                     </>
                   ) : (
                     <>
                       <Lock className="w-5 h-5 text-slate-600 mb-1" />
                       <span className="text-[9px] md:text-[10px] font-bold text-slate-600">LOCKED</span>
                     </>
                   )}
                 </button>
               )
            })}
         </div>
      </div>
    </div>
  );
}
