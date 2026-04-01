import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, 
  Calculator, Microscope, BookOpen, Heart, 
  Music, Palette, Monitor, Globe, Languages, Camera, Sparkles
} from 'lucide-react';

export default function Grade6StreamSelect({ 
  onBack = () => {}, 
  onStreamSelect = () => {},
  view = 'main',
  setView = () => {}
}) {

  const subjects = [
    { id: 'grade6_maths', name: 'ගණිතය', sub: 'Mathematics', Icon: Calculator, color: 'blue' },
    { id: 'grade6_science', name: 'විද්‍යාව', sub: 'Science', Icon: Microscope, color: 'emerald' },
    { id: 'grade6_sinhala', name: 'සිංහල', sub: 'Sinhala', Icon: BookOpen, color: 'orange' },
    { id: 'grade6_english', name: 'ඉංග්‍රීසි', sub: 'English', Icon: Languages, color: 'pink' },
    { id: 'grade6_history', name: 'ඉතිහාසය', sub: 'History', Icon: Globe, color: 'amber' },
    { id: 'grade6_religion', name: 'බුද්ධ ධර්මය', sub: 'Buddhism', Icon: Heart, color: 'rose' },
    { id: 'grade6_pts', name: 'ප්‍රායෝගික තාක්ෂණික කුසලතා', sub: 'PTS', Icon: Monitor, color: 'indigo' },
    { id: 'aesthetic_category', name: 'සෞන්දර්යය', sub: 'Aesthetic', Icon: Music, color: 'violet', isCategory: true }
  ];

  const aestheticSubjects = [
    { id: 'grade6_art', name: 'චිත්‍ර', sub: 'Art', Icon: Palette, color: 'fuchsia' },
    { id: 'grade6_oriental_music', name: 'පෙරදිග සංගීතය', sub: 'Oriental Music', Icon: Music, color: 'violet' },
    { id: 'grade6_western_music', name: 'අපරදිග සංගීතය', sub: 'Western Music', Icon: Music, color: 'blue' },
    { id: 'grade6_kandyan_dance', name: 'උඩරට නර්තනය', sub: 'Kandyan Dancing', Icon: Sparkles, color: 'orange' },
    { id: 'grade6_lowcountry_dance', name: 'පහතරට නර්තනය', sub: 'Low Country Dancing', Icon: Sparkles, color: 'emerald' },
    { id: 'grade6_sabaragamu_dance', name: 'සබරගමු නර්තනය', sub: 'Sabaragamu Dancing', Icon: Sparkles, color: 'rose' },
    { id: 'grade6_drama', name: 'නාට්‍ය හා රංග කලාව', sub: 'Drama & Theatre', Icon: Camera, color: 'red' }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500 min-h-[80vh] w-full max-w-6xl mx-auto px-4">
      
      {view === 'main' ? (
        <>
          <button onClick={onBack} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
            <ArrowLeft className="w-5 h-5" /> ආපසු
          </button>
          
          <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
             <BookOpen className="w-5 h-5" /> 6 ශ්‍රේණිය (Grade 6)
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 text-white drop-shadow-lg text-center tracking-tight">
            විෂය තෝරන්න
          </h1>
          <p className="text-slate-400 font-bold mb-16 text-center">ඔබට අවශ්‍ය විෂය තෝරා අභියෝගය ආරම්භ කරන්න</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                onClick={() => subject.isCategory ? setView('aesthetic') : onStreamSelect(subject.id)}
                className={`cursor-pointer group bg-slate-900/80 border-2 border-${subject.color}-500/20 p-8 rounded-[2.5rem] hover:border-${subject.color}-500 hover:bg-${subject.color}-900/10 transition-all flex flex-col items-center text-center shadow-xl hover:-translate-y-2`}
              >
                <div className={`p-5 rounded-3xl bg-${subject.color}-500/10 text-${subject.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <subject.Icon className="w-12 h-12" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">{subject.name}</h4>
                <p className={`text-${subject.color}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{subject.sub}</p>
                <span className={`text-${subject.color}-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {subject.isCategory ? 'විෂයන් බලන්න' : 'ආරම්භ කරන්න'} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col">
          <button onClick={() => setView('main')} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
            <ArrowLeft className="w-5 h-5" /> ආපසු විෂයන් වෙත
          </button>
          
          <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
             <Music className="w-5 h-5" /> සෞන්දර්යය විෂයන් (Aesthetic Subjects)
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aestheticSubjects.map((subject) => (
              <div 
                key={subject.id}
                onClick={() => onStreamSelect(subject.id)}
                className={`cursor-pointer group bg-slate-900/80 border-2 border-${subject.color}-500/20 p-8 rounded-[2.5rem] hover:border-${subject.color}-500 hover:bg-${subject.color}-900/10 transition-all flex flex-col items-center text-center shadow-xl hover:-translate-y-2`}
              >
                <div className={`p-5 rounded-3xl bg-${subject.color}-500/10 text-${subject.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <subject.Icon className="w-12 h-12" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">{subject.name}</h4>
                <p className={`text-${subject.color}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{subject.sub}</p>
                <span className={`text-${subject.color}-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  ආරම්භ කරන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
