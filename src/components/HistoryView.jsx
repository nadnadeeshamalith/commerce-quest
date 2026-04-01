import React from 'react';
import { History, X, Trophy } from 'lucide-react';

export default function HistoryView({
  userHistory,
  setGameState,
  onBack
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden animate-in fade-in">
       <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
         <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
           <History className="text-blue-400" /> මගේ දත්ත
         </h2>
         <button onClick={onBack || (() => setGameState('home'))} className="p-2 bg-slate-950 border border-slate-800 rounded-lg hover:text-rose-400 transition-colors text-white"><X /></button>
       </div>
       <div className="p-4 max-h-[500px] overflow-y-auto">
          {userHistory.length === 0 ? <p className="p-16 text-center text-slate-500 font-bold">තවමත් දත්ත නැත...</p> : 
            userHistory.map((e, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-800/50 rounded-2xl mb-1 border-b border-slate-800/50 last:border-0 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-5">
                  <span className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center font-black text-slate-500">{idx + 1}</span>
                  <div>
                    <p className="font-bold text-slate-200">Paper {String(e.paperId).replace('H', 'PRO ')}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{new Date(e.timestamp).toLocaleDateString()} • {new Date(e.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-blue-500">{Number(e.score)} <span className="text-xs text-slate-500">ලකුණු</span></span>
              </div>
            ))
          }
       </div>
       <div className="p-8 border-t border-slate-800 bg-slate-950/30">
         <button onClick={onBack || (() => setGameState('home'))} className="w-full bg-slate-800 py-4 rounded-xl font-black hover:bg-slate-700 transition-all text-white">මුල් මෙනුවට</button>
       </div>
    </div>
  );
}
