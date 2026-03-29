import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function StartView({
  themeColor,
  ThemeIcon,
  subjectTitle,
  isGrade5,
  userName,
  onBack,
  setGameState
}) {
  return (
    <div className="flex flex-col items-center text-center py-12 animate-in zoom-in duration-500">
      <button 
        onClick={onBack}
        className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
      >
        <ArrowLeft className="w-5 h-5" /> ආපසු
      </button>
      <div className="relative w-32 h-32 mx-auto mb-8 group">
        <div className={`absolute inset-0 bg-${themeColor}-500/20 blur-2xl rounded-full group-hover:bg-${themeColor}-500/40 transition-all duration-500`}></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 w-full h-full rounded-[2.5rem] flex items-center justify-center border border-slate-700 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-300">
          {React.createElement(ThemeIcon, {
            className: `w-16 h-16 text-${themeColor}-500 drop-shadow-[0_0_15px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300`
          })}
        </div>
      </div>

      <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-lg">
        {subjectTitle}<br/>
        {!isGrade5 && <span className={`text-${themeColor}-400 text-3xl`}>වෙන්න ඕනෙද?</span>}
      </h2>
      
      <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
        සුබ පැතුම් <b className="text-white">{userName}</b>! ප්‍රශ්න පත්‍රවල අභියෝගයට මුහුණ දී ලකුණු පුවරුවේ <span className={`text-white font-black bg-${themeColor}-500/20 px-2 py-1 rounded border border-${themeColor}-500/30`}>#1</span> ස්ථානය දිනාගන්න.
      </p>
      
      <button 
        onClick={() => setGameState('select_paper')}
        className={`group relative bg-gradient-to-r from-${themeColor}-600 to-slate-800 hover:from-${themeColor}-500 hover:to-slate-700 px-12 py-5 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] flex items-center gap-3 mx-auto transition-all hover:scale-105 text-white overflow-hidden border border-${themeColor}-500/50`}
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        <span className="relative drop-shadow-md">අභියෝගය භාරගන්න</span> <ArrowRight className="relative group-hover:translate-x-2 transition-transform drop-shadow-md" />
      </button>
      
      <button onClick={() => setGameState('home')} className="mt-8 text-slate-500 hover:text-slate-300 text-sm font-bold underline underline-offset-4">ප්‍රධාන මෙනුවට</button>
    </div>
  );
}
