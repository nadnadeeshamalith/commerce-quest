import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, 
  Dna, Atom, Briefcase, Cpu, Palette, GraduationCap,
  Beaker, Zap, Leaf, Calculator, Monitor, LineChart, BarChart, Shapes,
  Microscope, Wrench, Globe, BookText, Landmark, Brain, Activity, Film, Lightbulb, BookOpen, Camera, Music, Languages
} from 'lucide-react';

export default function ALStreamSelect({ 
  onBack = () => console.log("ප්‍රධාන මෙනුවට (Main Menu) යාමට බොත්තම එබුවා!"), 
  onStreamSelect = (stream) => console.log(`ඔබ තෝරාගත්තේ: ${stream} අංශයයි.`) 
}) {
  
  const [view, setView] = useState('main'); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* ========================================= */}
        {/* 1. ප්‍රධාන අංශ තෝරාගැනීමේ තිරය (Main Menu) */}
        {/* ========================================= */}
        {view === 'main' && (
          <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500 w-full">
            
            <button 
              onClick={onBack} 
              className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> ආපසු ප්‍රධාන මෙනුවට
            </button>
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
               <GraduationCap className="w-5 h-5" /> 12/13 වසර
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-center uppercase tracking-tighter drop-shadow-xl">
              උසස් පෙළ අංශය තෝරන්න
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
              
              {/* 1. Bio Science Stream */}
              <div 
                onClick={() => setView('bio_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-emerald-500/20 rounded-[2.5rem] p-10 hover:border-emerald-500 hover:bg-emerald-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
                  <div className="bg-emerald-500/20 p-5 rounded-3xl mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Dna className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">ජීව විද්‍යා විෂය ධාරාව</h3>
                  <p className="text-emerald-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Bio Science Stream</p>
                  <span className="text-emerald-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 2. Physical Science / Maths Stream */}
              <div 
                onClick={() => setView('maths_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-blue-500/20 rounded-[2.5rem] p-10 hover:border-blue-500 hover:bg-blue-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                  <div className="bg-blue-500/20 p-5 rounded-3xl mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Atom className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">භෞතික විද්‍යා විෂය ධාරාව</h3>
                  <p className="text-blue-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Physical Science</p>
                  <span className="text-blue-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>
              
              {/* 3. Commerce Stream */}
              <div 
                onClick={() => setView('commerce_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-violet-500/20 rounded-[2.5rem] p-10 hover:border-violet-500 hover:bg-violet-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all"></div>
                  <div className="bg-violet-500/20 p-5 rounded-3xl mb-6 text-violet-400 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">වාණිජ විෂය ධාරාව</h3>
                  <p className="text-violet-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Commerce Stream</p>
                  <span className="text-violet-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 4. Technology Stream */}
              <div 
                onClick={() => setView('tech_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-orange-500/20 rounded-[2.5rem] p-10 hover:border-orange-500 hover:bg-orange-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2 lg:col-start-2"
              >
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                  <div className="bg-orange-500/20 p-5 rounded-3xl mb-6 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">තාක්ෂණවේදය විෂය ධාරාව</h3>
                  <p className="text-orange-300/50 text-sm font-bold mt-2 uppercase tracking-widest">SFT | ET | BST | ICT</p>
                  <span className="text-orange-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>
              
              {/* 5. Arts Stream */}
              <div 
                onClick={() => setView('arts_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-pink-500/20 rounded-[2.5rem] p-10 hover:border-pink-500 hover:bg-pink-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
                  <div className="bg-pink-500/20 p-5 rounded-3xl mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">කලා විෂය ධාරාව</h3>
                  <p className="text-pink-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Arts Stream</p>
                  <span className="text-pink-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* 2. ජීව විද්‍යා විෂය ධාරාව (Bio Science)    */}
        {/* ========================================= */}
        {view === 'bio_category' && (
          <div className="py-12 animate-in zoom-in slide-in-from-right-8 duration-500 min-h-[60vh] flex flex-col justify-center w-full">
            <button onClick={() => setView('main')} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
              <ArrowLeft className="w-5 h-5" /> ආපසු අංශ වෙත
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
               <Dna className="w-5 h-5" /> ජීව විද්‍යා විෂය ධාරාව (Bio Science Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'biology', n:'ජීව විද්‍යාව', sub:'Biology', i:<Dna/>, c:'emerald'},
                {id:'chemistry', n:'රසායන විද්‍යාව', sub:'Chemistry', i:<Beaker/>, c:'cyan'},
                {id:'physics', n:'භෞතික විද්‍යාව', sub:'Physics', i:<Zap/>, c:'orange'},
                {id:'agri', n:'කෘෂි විද්‍යාව', sub:'Agricultural Science', i:<Leaf/>, c:'green'}
              ].map(cat => (
                <div key={cat.id} onClick={() => onStreamSelect(cat.id)} className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/30 rounded-[2.5rem] p-8 hover:border-${cat.c}-500 hover:bg-${cat.c}-900/20 transition-all duration-300 flex flex-col items-center text-center shadow-xl hover:-translate-y-2`}>
                  <div className={`bg-${cat.c}-500/20 p-5 rounded-3xl mb-6 text-${cat.c}-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    {cat.i}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{cat.n}</h3>
                  <p className={`text-${cat.c}-400/80 font-bold uppercase text-[10px] tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* 3. භෞතික විද්‍යා විෂය ධාරාව (Physical Science) */}
        {/* ========================================= */}
        {view === 'maths_category' && (
          <div className="py-12 animate-in zoom-in slide-in-from-right-8 duration-500 min-h-[60vh] flex flex-col justify-center w-full">
            <button onClick={() => setView('main')} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
              <ArrowLeft className="w-5 h-5" /> ආපසු අංශ වෙත
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
               <Atom className="w-5 h-5" /> භෞතික විද්‍යා විෂය ධාරාව (Maths Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'combined_maths', n:'සංයුක්ත ගණිතය', sub:'Combined Mathematics', i:<Shapes/>, c:'violet'},
                {id:'physics_maths', n:'භෞතික විද්‍යාව', sub:'Physics', i:<Zap/>, c:'orange'},
                {id:'chemistry_maths', n:'රසායන විද්‍යාව', sub:'Chemistry', i:<Beaker/>, c:'cyan'},
                {id:'ict_maths', n:'තොරතුරු හා සන්නිවේදන තාක්ෂණය', sub:'ICT', i:<Monitor/>, c:'slate'}
              ].map(cat => (
                <div key={cat.id} onClick={() => onStreamSelect(cat.id)} className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/30 rounded-[2.5rem] p-8 hover:border-${cat.c}-500 hover:bg-${cat.c}-900/20 transition-all duration-300 flex flex-col items-center text-center shadow-xl hover:-translate-y-2`}>
                  <div className={`bg-${cat.c}-500/20 p-5 rounded-3xl mb-6 text-${cat.c}-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    {cat.i}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{cat.n}</h3>
                  <p className={`text-${cat.c}-400/80 font-bold uppercase text-[10px] tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* 6. කලා විෂය ධාරාව (Arts Stream) */}
        {/* ========================================= */}
        {view === 'arts_category' && (
          <div className="py-12 animate-in zoom-in slide-in-from-right-8 duration-500 min-h-[60vh] flex flex-col justify-center w-full">
            <button onClick={() => setView('main')} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
              <ArrowLeft className="w-5 h-5" /> ආපසු අංශ වෙත
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
               <Palette className="w-5 h-5" /> කලා විෂය ධාරාව (Arts Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {[
                {id:'sinhala', n:'සිංහල', sub:'Sinhala', i:<Languages/>, c:'pink'},
                {id:'tamil', n:'දෙමළ', sub:'Tamil', i:<Languages/>, c:'pink'},
                {id:'english', n:'ඉංග්‍රීසි', sub:'English', i:<Languages/>, c:'pink'},
                {id:'japanese', n:'ජපන්', sub:'Japanese', i:<Languages/>, c:'pink'},
                {id:'french', n:'ප්‍රංශ', sub:'French', i:<Languages/>, c:'pink'},
                {id:'hindi', n:'හින්දි', sub:'Hindi', i:<Languages/>, c:'pink'},
                {id:'pol_sci', n:'දේශපාලන විද්‍යාව', sub:'Political Science', i:<Landmark/>, c:'rose'},
                {id:'geography_arts', n:'භූගෝල විද්‍යාව', sub:'Geography', i:<Globe/>, c:'blue'},
                {id:'history', n:'ඉතිහාසය', sub:'History', i:<BookText/>, c:'amber'},
                {id:'econ_arts', n:'ආර්ථික විද්‍යාව', sub:'Economics', i:<LineChart/>, c:'sky'},
                {id:'psychology', n:'මනෝ විද්‍යාව', sub:'Psychology', i:<Brain/>, c:'purple'},
                {id:'art', n:'චිත්‍ර', sub:'Art', i:<Palette/>, c:'fuchsia'},
                {id:'music', n:'සංගීතය', sub:'Music', i:<Music/>, c:'violet'},
                {id:'dance', n:'නර්තනය', sub:'Dancing', i:<Activity/>, c:'rose'},
                {id:'drama', n:'නාට්‍ය හා රංග කලාව', sub:'Drama', i:<Film/>, c:'red'},
                {id:'logic', n:'තර්ක ශාස්ත්‍රය', sub:'Logic', i:<Lightbulb/>, c:'yellow'},
                {id:'buddhist_civ', n:'බෞද්ධ ශිෂ්ටාචාරය', sub:'Buddhist Civ.', i:<BookOpen/>, c:'orange'},
                {id:'christian_civ', n:'ක්‍රිස්තියානි ශිෂ්ටාචාරය', sub:'Christian Civ.', i:<BookOpen/>, c:'teal'},
                {id:'media', n:'මාධ්‍ය අධ්‍යයනය', sub:'Media Studies', i:<Camera/>, c:'emerald'},
                {id:'ict_arts', n:'ICT', sub:'ICT', i:<Monitor/>, c:'slate'}
              ].map(cat => (
                <div key={cat.id} onClick={() => onStreamSelect(cat.id)} className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/30 rounded-[2rem] p-6 hover:border-${cat.c}-500 hover:bg-${cat.c}-900/20 transition-all duration-300 flex flex-col items-center text-center shadow-xl hover:-translate-y-2`}>
                  <div className={`bg-${cat.c}-500/20 p-4 rounded-2xl mb-4 text-${cat.c}-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    {cat.i}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-white mb-1 leading-tight">{cat.n}</h3>
                  <p className={`text-${cat.c}-400/80 font-bold uppercase text-[9px] tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}